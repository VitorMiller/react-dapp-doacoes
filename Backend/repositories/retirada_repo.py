import sqlite3
from typing import Optional
from models.retirada_modael import Retirada
from sql.retirada_sql import SQL_CRIAR_TABELA, SQL_INSERIR, SQL_OBTER_POR_ONG
from util.database import obter_conexao


class RetiradaRepo:
    @classmethod
    def criar_tabela(cls):
        with obter_conexao() as conexao:
            cursor = conexao.cursor()
            cursor.execute(SQL_CRIAR_TABELA)


    
    @classmethod
    def inserir(cls, retirada: Retirada) -> Optional[Retirada]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                cursor.execute(
                    SQL_INSERIR,
                    (
                        retirada.valor,
                        retirada.finalidade,
                        retirada.id_ong,
                    ),
                )
                if cursor.rowcount > 0:
                    retirada.id = cursor.lastrowid
                    return retirada
        except sqlite3.Error as ex:
            print(ex)
            return None
        
    @classmethod
    def obter_por_ong(cls, id_ong: int, limit: int, offset: int) -> Optional[Retirada]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                cursor.execute(SQL_OBTER_POR_ONG, (id_ong, limit, offset))
                dados = cursor.fetchone()
                if dados:
                    return Retirada(*dados)
        except sqlite3.Error as ex:
            print(ex)
            return None
        return None