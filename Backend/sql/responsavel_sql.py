SQL_CRIAR_TABELA = """
    CREATE TABLE IF NOT EXISTS responsavel (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        sobrenome TEXT NOT NULL ,
        email TEXT NOT NULL UNIQUE,
        endereco TEXT NOT NULL,
        cidade TEXT NOT NULL,
        estado TEXT NOT NULL
        )
"""


SQL_INSERIR = """
    INSERT INTO responsavel(nome, sobrenome, email, endereco, cidade, estado)
    VALUES (?, ?, ?, ?, ?, ?)
"""