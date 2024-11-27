from dataclasses import dataclass
from datetime import date
from typing import Optional


@dataclass
class Ong:
    id: Optional[int] = None
    nome: Optional[str] = None
    causa: Optional[str] = None
    email: Optional[str] = None
    endereco: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
    carteira: Optional[str] = None
    id_responsavel: Optional[int] = None
