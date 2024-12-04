from fastapi import FastAPI
from repositories.doacao_repo import DoacaoRepo
from repositories.ong_repo import OngRepo
from repositories.responsavel_repo import ResponsavelRepo
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes, main_routes



ResponsavelRepo.criar_tabela()
OngRepo.criar_tabela()
DoacaoRepo.criar_tabela()
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(main_routes.router)
app.include_router(auth_routes.router)