import mysql.connector

# db connector
db_access = {
    'user': 'root',
    'password': input('Enter database password: '), # Prompt for password
    'host': 'localhost',
    'database': 'noland',
    'raise_on_warnings': True
}

class DataBaseNoland:
    def __init__(self, **kwargs):
        self.conector = mysql.connector.connect(**kwargs)
    
    def consult_db(self, sql):
        cursor = self.conector.cursor()
        cursor.execute(sql)
        return cursor
    
    def show_db(self):
        self.cursor.execute("SHOW DATABASES")
        for sqldb in self.cursor:
            print(sqldb)
            