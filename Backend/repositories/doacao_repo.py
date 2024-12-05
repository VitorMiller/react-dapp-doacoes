import sqlite3
from typing import Optional
from models.doacao_model import Doacao
from sql.doacao_sql import SQL_CRIAR_TABELA, SQL_INSERIR, SQL_OBTER_POR_ONG
from util.database import obter_conexao


class DoacaoRepo:
    @classmethod
    def criar_tabela(cls):
        with obter_conexao() as conexao:
            cursor = conexao.cursor()
            cursor.execute(SQL_CRIAR_TABELA)


    
    @classmethod
    def inserir(cls, doacao: Doacao) -> Optional[Doacao]:
        try:
            with obter_conexao() as conexao:
                cursor = conexao.cursor()
                cursor.execute(
                    SQL_INSERIR,
                    (
                        doacao.nome_doador,
                        doacao.nascimento_doador,
                        doacao.email_doador,
                        doacao.telefone_doador,
                        doacao.carteira_doador,
                        doacao.valor,
                        doacao.hash_transacao,
                        doacao.id_ong,
                    ),
                )
                if cursor.rowcount > 0:
                    doacao.id = cursor.lastrowid
                    return doacao
        except sqlite3.Error as ex:
            print(ex)
            return None
    
    @classmethod
    def obter_por_ong(cls, id_ong: int, limit: int, offset: int) -> list[Doacao]:
        with obter_conexao() as conexao:
            cursor = conexao.cursor()
            cursor.execute(SQL_OBTER_POR_ONG, (id_ong, limit, offset))
            doacoes = cursor.fetchall()
            return [Doacao(*doacao) for doacao in doacoes]