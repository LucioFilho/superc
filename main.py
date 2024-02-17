import pygame
# import db.noland_db as sqldb

pygame.init()

# DataBase = sqldb.DataBaseNoland(**sqldb.db_access)

from game.game import Game

if __name__ == '__main__':
    game = Game()
    game.run()
