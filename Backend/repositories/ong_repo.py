import sqlite3
from typing import Optional
from models.ong_model import Ong
from sql.ong_sql import SQL_CRIAR_TABELA, SQL_INSERIR, SQL_OBTER_POR_EMAIL, SQL_OBTER_POR_ID, SQL_OBTER_TODAS
from util.database import obter_conexao


class OngRepo:
    @classmethod
    def criar_tabela(cls):
        with obter_conexao() as conexao:
            cursor = conexao.cursor()
            cursor.execute(SQL_CRIAR_TABELA)



    @classmethod
    def inserir(cls, ong: Ong) -> Optional[Ong]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                cursor.execute(
                    SQL_INSERIR,
                    (
                        ong.nome,
                        ong.causa,
                        ong.email,
                        ong.endereco,
                        ong.cidade,
                        ong.estado,
                        ong.carteira,
                        ong.id_responsavel,
                        ong.senha,
                    ),
                )
                if cursor.rowcount > 0:
                    ong.id = cursor.lastrowid
                    return ong
        except sqlite3.Error as ex:
            print(ex)
            return None
        

    @classmethod
    def buscar_por_id(cls, id: int) -> Optional[Ong]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                tupla = cursor.execute(SQL_OBTER_POR_ID, (id,)).fetchone()
                if tupla:  
                    return Ong(*tupla)
                return None  
        except sqlite3.Error as ex:
            print(f"Erro ao buscar ONG por ID: {ex}")
            return None

    @classmethod
    def obter_por_email(cls, email: str) -> Optional[Ong]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                tupla = cursor.execute(SQL_OBTER_POR_EMAIL, (email,)).fetchone()
                if tupla:
                    ong = Ong(*tupla)
                    return ong
                else:
                    return None
        except sqlite3.Error as ex:
            print(ex)
            return None
        
    @classmethod
    def obter_todas(cls) -> list[Ong]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                cursor.execute(SQL_OBTER_TODAS)
                return [Ong(*tupla) for tupla in cursor.fetchall()]
        except sqlite3.Error as ex:
            print(ex)
            return []