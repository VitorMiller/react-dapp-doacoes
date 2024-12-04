from pydantic import BaseModel, field_validator
from util.validators import *

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
    senha: str
    confirmacao_senha: str

    @field_validator("senha")
    def validar_senha(cls, v):
        msg = is_not_empty(v, "Senha")
        if not msg:
            msg = is_password(v, "Senha")
        if msg:
            raise ValueError(msg.strip())
        return v

    @field_validator("confirmacao_senha")
    def validar_confirmacao_senha(cls, v, values):
        msg = is_not_empty(v, "Confirmação de Senha")
        if "senha" in values.data:
            msg = is_matching_fields(
                v, "Confirmação de Senha", values.data["senha"], "Senha"
            )
        else:
            msg = "Senha não informada."
        if msg:
            raise ValueError(msg)
        return v
    