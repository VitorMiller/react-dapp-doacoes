import sqlite3
from typing import Optional
from models.responsavel_model import Responsavel
from sql.responsavel_sql import SQL_CRIAR_TABELA, SQL_INSERIR
from util.database import obter_conexao


class ResponsavelRepo:
    @classmethod
    def criar_tabela(cls):
        with obter_conexao() as conexao:
            cursor = conexao.cursor()
            cursor.execute(SQL_CRIAR_TABELA)

    @classmethod
    def inserir(cls, responsavel: Responsavel) -> Optional[Responsavel]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                cursor.execute(
                    SQL_INSERIR,
                    (
                        responsavel.nome,
                        responsavel.sobrenome,
                        responsavel.email,
                        responsavel.endereco,
                        responsavel.cidade,
                        responsavel.estado,
                    ),
                )
                if cursor.rowcount > 0:
                    responsavel.id = cursor.lastrowid
                    return responsavel
        except sqlite3.Error as ex:
            print(ex)
            return None