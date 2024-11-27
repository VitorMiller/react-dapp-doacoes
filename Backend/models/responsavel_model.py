from dataclasses import dataclass
from datetime import date
from typing import Optional


@dataclass
class Responsavel:
    id: Optional[int] = None
    nome: Optional[str] = None
    sobrenome: Optional[str] = None
    email: Optional[str] = None
    endereco: Optional[str] = None
    cidade: Optional[str] = None
    estado: Optional[str] = None
