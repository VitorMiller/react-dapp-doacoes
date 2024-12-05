from dataclasses import dataclass
from datetime import date
from typing import Optional



@dataclass
class Doacao:
    id: Optional[int] = None
    data_hora_doacao: Optional[date] = None
    nome_doador: Optional[str] = None
    nascimento_doador: Optional[date] = None
    email_doador: Optional[str] = None
    telefone_doador: Optional[str] = None
    carteira_doador: Optional[str] = None
    valor: Optional[float] = None
    hash_transacao : Optional[str] = None
    id_ong : Optional[int] = None
