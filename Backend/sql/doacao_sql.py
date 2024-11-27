SQL_CRIAR_TABELA = """
    CREATE TABLE IF NOT EXISTS doacao (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_doador TEXT NOT NULL,
        nascimento_doador DATE NOT NULL,
        email_doador TEXT NOT NULL,
        telefone_doador TEXT NOT NULL,
        carteira_doador TEXT NOT NULL,
        valor FLOAT NOT NULL,
        hash_transacao TEXT NOT NULL,
        id_ong INTEGER NOT NULL,
        FOREIGN KEY (id_ong) REFERENCES ong(id))
"""



SQL_INSERIR = """
    INSERT INTO doacao(nome_doador, nascimento_doador, email_doador, telefone_doador, carteira_doador, valor, hash_transacao, id_ong)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
"""

