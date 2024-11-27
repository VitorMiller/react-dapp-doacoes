from datetime import date
from pydantic import BaseModel

class CadastrarDoacaoDTO(BaseModel):
    nome_doador: str
    nascimento_doador: date
    email_doador: str
    telefone_doador: str
    carteira_doador: str
    valor: float
    hash_transacao: str
    id_ong: int