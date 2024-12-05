from pydantic import BaseModel

class CadastrarRetiradaDTO(BaseModel):
    valor: float
    finalidade: str
    id_ong: int