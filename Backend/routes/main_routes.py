from io import BytesIO
from typing import Annotated, Optional
from fastapi import APIRouter, Depends, File, Form, HTTPException, Request, UploadFile
from PIL import Image
from fastapi.responses import JSONResponse

from dtos.cadastrar_doacao_dto import CadastrarDoacaoDTO
from dtos.cadastrar_retirada_dto import CadastrarRetiradaDTO
from dtos.cadastrar_ong_dto import CadastrarOngDTO
from dtos.problem_details_dto import ProblemDetailsDto
from models.doacao_model import Doacao
from models.ong_model import Ong
from models.responsavel_model import Responsavel
from models.retirada_modael import Retirada
from repositories.doacao_repo import DoacaoRepo
from repositories.retirada_repo import RetiradaRepo
from repositories.ong_repo import OngRepo
from repositories.responsavel_repo import ResponsavelRepo

from fastapi.middleware.cors import CORSMiddleware

from util.auth_jwt import obter_hash_senha


router = APIRouter()

def parse_form(
    nome_responsavel: str = Form(...),
    sobrenome_responsavel: str = Form(...),
    email_responsavel: str = Form(...),
    endereco_responsavel: str = Form(...),
    cidade_responsavel: str = Form(...),
    estado_responsavel: str = Form(...),
    nome_ong: str = Form(...),
    causa_ong: str = Form(...),
    email_ong: str = Form(...),
    endereco_ong: str = Form(...),
    cidade_ong: str = Form(...),
    estado_ong: str = Form(...),
    carteira_ong: str = Form(...),
    senha: str = Form(...),
    confirmacao_senha: str = Form(...),
) -> CadastrarOngDTO:
    return CadastrarOngDTO(
        nome_responsavel=nome_responsavel,
        sobrenome_responsavel=sobrenome_responsavel,
        email_responsavel=email_responsavel,
        endereco_responsavel=endereco_responsavel,
        cidade_responsavel=cidade_responsavel,
        estado_responsavel=estado_responsavel,
        nome_ong=nome_ong,
        causa_ong=causa_ong,
        email_ong=email_ong,
        endereco_ong=endereco_ong,
        cidade_ong=cidade_ong,
        estado_ong=estado_ong,
        carteira_ong=carteira_ong,
        senha=senha,
        confirmacao_senha=confirmacao_senha,
    )

@router.post("/post_cadastro_ong")
async def post_cadastro_ong(cadastrar_ong_dto: CadastrarOngDTO = Depends(parse_form), imagem: Optional[UploadFile] = File(None),):
    conteudo_arquivo = await imagem.read()
    imagem = Image.open(BytesIO(conteudo_arquivo))
    if not imagem:
        pd = ProblemDetailsDto(
            "file",
            "O arquivo enviado não é uma imagem válida.",
            "invalid_image",
            ["body", "imagem"],
        )
        return JSONResponse(pd.to_dict(), status_code=422)
    
    cadastrar_ong_dto = cadastrar_ong_dto.model_dump(exclude={"confirmacao_senha"})
    cadastrar_ong_dto["senha"] = obter_hash_senha(cadastrar_ong_dto["senha"])

    try:
        responsavel = Responsavel(
            id=0,
            nome=cadastrar_ong_dto["nome_responsavel"],
            sobrenome=cadastrar_ong_dto["sobrenome_responsavel"],
            email=cadastrar_ong_dto["email_responsavel"],
            endereco=cadastrar_ong_dto["endereco_responsavel"],
            cidade=cadastrar_ong_dto["cidade_responsavel"],
            estado=cadastrar_ong_dto["estado_responsavel"],
        )

        responsavel_cadastrado = ResponsavelRepo.inserir(responsavel)
        ong = Ong(
            id=0,
            nome=cadastrar_ong_dto["nome_ong"],
            causa=cadastrar_ong_dto["causa_ong"],
            email=cadastrar_ong_dto["email_ong"],
            endereco=cadastrar_ong_dto["endereco_ong"],
            cidade=cadastrar_ong_dto["cidade_ong"],
            estado=cadastrar_ong_dto["estado_ong"],
            carteira=cadastrar_ong_dto["carteira_ong"],
            id_responsavel=responsavel_cadastrado.id,
            senha=cadastrar_ong_dto["senha"],
        )
        ong_cadastrada = OngRepo.inserir(ong)
        if ong_cadastrada:
            imagem.save(f"static/img/fotos/{ong_cadastrada.id:04d}.jpg", "JPEG")
        return {"success": True, "data": ong_cadastrada}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao cadastrar a ong: {str(e)}"
        )


@router.post("/post_cadastro_doacao")
async def post_cadastro_doacao(cadastrar_doacao_dto: CadastrarDoacaoDTO):
    try:

        ong_existe = OngRepo.buscar_por_id(cadastrar_doacao_dto.id_ong)
        if not ong_existe:
            raise HTTPException(
                status_code=404,
                detail=f"ONG com ID {cadastrar_doacao_dto.id_ong} não encontrada.",
            )

        doacao = Doacao(
            id=0,
            nome_doador=cadastrar_doacao_dto.nome_doador,
            nascimento_doador=cadastrar_doacao_dto.nascimento_doador,
            email_doador=cadastrar_doacao_dto.email_doador,
            telefone_doador=cadastrar_doacao_dto.telefone_doador,
            carteira_doador=cadastrar_doacao_dto.carteira_doador,
            valor=cadastrar_doacao_dto.valor,
            hash_transacao=cadastrar_doacao_dto.hash_transacao,
            id_ong=cadastrar_doacao_dto.id_ong,
        )

        doacao_cadastrada = DoacaoRepo.inserir(doacao)

        return {"success": True, "data": doacao_cadastrada}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao cadastrar responsável: {str(e)}"
        )


@router.get("/get_doacoes/{id_ong}")
async def obter_doacoes(id_ong: int):
    doacoes = DoacaoRepo.obter_por_ong(id_ong, limit=5, offset=0)
    return doacoes

@router.post("/post_cadastro_retirada")
async def post_cadastro_retirada(request: Request, cadastrar_retirada_dto: CadastrarRetiradaDTO):
    id_ong = request.state.usuario.id
    try:
        ong_existe = OngRepo.buscar_por_id(id_ong)
        if not ong_existe:
            raise HTTPException(
                status_code=404, detail=f"ONG com ID {id_ong} não encontrada."
            )

        retirada = RetiradaRepo.inserir(
            Retirada(
                id=0,
                id_ong=id_ong,
                data=cadastrar_retirada_dto.data,
                valor=cadastrar_retirada_dto.valor,
                finalidade=cadastrar_retirada_dto.finalidade,
            )
        )

        return {"success": True, "data": retirada}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao cadastrar retirada: {str(e)}"
        )

@router.get("/get_retiradas/{id_ong}")
async def obter_retiradas(id_ong: int):
    retiradas = RetiradaRepo.obter_por_ong(id_ong, limit=5, offset=0)
    return retiradas

@router.get("/get_ongs")
async def obter_ongs():
    ongs = OngRepo.obter_todas()
    return ongs

@router.get("/get_ongs/{id}")
async def obter_ong_por_id(id: int):
    ong = OngRepo.buscar_por_id(id)
    if not ong:
        raise HTTPException(status_code=404, detail=f"ONG com ID {id} não encontrada.")
    return ong