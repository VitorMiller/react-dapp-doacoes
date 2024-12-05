from fastapi import APIRouter, HTTPException, Request

from dtos.cadastrar_doacao_dto import CadastrarDoacaoDTO
from dtos.cadastrar_retirada_dto import CadastrarRetiradaDTO
from dtos.cadastrar_ong_dto import CadastrarOngDTO
from models.doacao_model import Doacao
from models.ong_model import Ong
from models.responsavel_model import Responsavel
from repositories.doacao_repo import DoacaoRepo
from repositories.ong_repo import OngRepo
from repositories.responsavel_repo import ResponsavelRepo
from models.retirada_model import Retirada
from repositories.retirada_repo import RetiradaRepo

from fastapi.middleware.cors import CORSMiddleware

from util.auth_jwt import obter_hash_senha


router = APIRouter(prefix="/perfilOng")



@router.post("/post_cadastro_ong")
async def post_cadastro_ong(cadastrar_ong_dto: CadastrarOngDTO):
    cadastrar_ong_dto = cadastrar_ong_dto.model_dump(exclude={"confirmacao_senha"})
    cadastrar_ong_dto["senha"] = obter_hash_senha(cadastrar_ong_dto.senha)

    try:
        responsavel = Responsavel(
            id=0,
            nome=cadastrar_ong_dto.nome_responsavel,
            sobrenome=cadastrar_ong_dto.sobrenome_responsavel,
            email=cadastrar_ong_dto.email_responsavel,
            endereco=cadastrar_ong_dto.endereco_responsavel,
            cidade=cadastrar_ong_dto.cidade_responsavel,
            estado=cadastrar_ong_dto.estado_responsavel,
        )

        responsavel_cadastrado = ResponsavelRepo.inserir(responsavel)

        ong = Ong(
            id=0,
            nome=cadastrar_ong_dto.nome_ong,
            causa=cadastrar_ong_dto.causa_ong,
            email=cadastrar_ong_dto.email_ong,
            endereco=cadastrar_ong_dto.endereco_ong,
            cidade=cadastrar_ong_dto.cidade_ong,
            estado=cadastrar_ong_dto.estado_ong,
            carteira=cadastrar_ong_dto.carteira_ong,
            id_responsavel=responsavel_cadastrado.id,
        )
        ong_cadastrada = OngRepo.inserir(ong)
        return {"success": True, "data": ong_cadastrada}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao cadastrar responsável: {str(e)}"
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
                valor=cadastrar_retirada_dto.valor,
                finalidade=cadastrar_retirada_dto.finalidade,
            )
        )

        return {"success": True, "data": retirada}
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Erro ao cadastrar retirada: {str(e)}"
        )