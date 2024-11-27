from pydantic import BaseModel

class CadastrarOngDTO(BaseModel):
    nome_responsavel: str
    sobrenome_responsavel: str
    email_responsavel: str
    endereco_responsavel: str
    cidade_responsavel: str
    estado_responsavel: str
    nome_ong: str
    causa_ong: str
    email_ong: str
    endereco_ong: str
    cidade_ong: str
    estado_ong: str
    carteira_ong: str
    