from fastapi import FastAPI
from repositories.doacao_repo import DoacaoRepo
from repositories.ong_repo import OngRepo
from repositories.responsavel_repo import ResponsavelRepo

from routes import main_routes



ResponsavelRepo.criar_tabela()
OngRepo.criar_tabela()
DoacaoRepo.criar_tabela()
app = FastAPI()
app.include_router(main_routes.router)
