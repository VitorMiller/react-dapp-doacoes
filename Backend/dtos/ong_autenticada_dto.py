from dataclasses import dataclass
from typing import Optional


@dataclass
class OngAutenticadaDto: 
    id: Optional[int] = None   
    nome: Optional[str] = None
    email: Optional[str] = None