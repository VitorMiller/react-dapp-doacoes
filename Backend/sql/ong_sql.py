SQL_CRIAR_TABELA = """
    CREATE TABLE IF NOT EXISTS ong (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        causa TEXT NOT NULL ,
        email TEXT NOT NULL UNIQUE,
        endereco TEXT NOT NULL,
        cidade TEXT NOT NULL,
        estado TEXT NOT NULL,
        carteira TEXT NOT NULL,
        id_responsavel INTEGER NOT NULL,
        senha TEXT NOT NULL,
        FOREIGN KEY (id_responsavel) REFERENCES responsavel(id))
"""


SQL_INSERIR = """
    INSERT INTO ong(nome, causa, email, endereco, cidade, estado, carteira, id_responsavel, senha)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
"""



SQL_OBTER_POR_ID = """
    SELECT id, nome, causa, email, endereco, cidade, estado, carteira, id_responsavel
    FROM ong
    WHERE id=?
"""

SQL_OBTER_POR_EMAIL = """
    SELECT id, nome, causa, email, endereco, cidade, estado, carteira, id_responsavel, senha
    FROM ong
    WHERE email=?
"""

SQL_OBTER_TODAS = """
    SELECT id, nome, causa, email, endereco, cidade, estado, carteira, id_responsavel
    FROM ong
"""