import pygame
# import db.turnover_db as sqldb

pygame.init()

# DataBase = sqldb.DataBaseTurnover(**sqldb.db_access)

from game.game import Game

if __name__ == '__main__':
    game = Game()
    game.run()
