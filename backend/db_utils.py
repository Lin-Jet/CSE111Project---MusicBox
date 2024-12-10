import sqlite3
from contextlib import contextmanager

class DatabaseManager:
    def __init__(self):
        self.checkpoint_db = '../Checkpoint2-dbase.sqlite3'
        self.identifier_db = '../identifier.sqlite'

    @contextmanager
    def get_checkpoint_db(self):
        conn = sqlite3.connect(self.checkpoint_db)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()

    @contextmanager
    def get_identifier_db(self):
        conn = sqlite3.connect(self.identifier_db)
        conn.row_factory = sqlite3.Row
        try:
            yield conn
        finally:
            conn.close()


db_manager = DatabaseManager()
