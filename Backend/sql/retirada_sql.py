SQL_CRIAR_TABELA = """
    CREATE TABLE IF NOT EXISTS retirada (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        data_hora_retirada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        valor FLOAT NOT NULL,
        finalidade TEXT NOT NULL,
        id_ong INTEGER NOT NULL,
        FOREIGN KEY (id_ong) REFERENCES ong(id))
"""



SQL_INSERIR = """
    INSERT INTO retirada(valor, finalidade, id_ong)
    VALUES (?, ?, ?)
"""

SQL_OBTER_POR_ONG = """
    SELECT id, data_hora_retirada, valor, finalidade, id_ong
    FROM retirada
    WHERE id_ong = ?
    ORDER BY data_hora_retirada DESC
    LIMIT ? OFFSET ?
"""

