from dataclasses import dataclass
from typing import Optional



@dataclass
class Retirada:
    id: Optional[int] = None
    data_hora_retirada: Optional[str] = None
    valor: Optional[float] = None
    finalidade: Optional[str] = None
    id_ong : Optional[int] = None
