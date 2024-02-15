import pygame
# Ensure pygame is initialized before importing other modules that depend on it
pygame.init()

from game.game import Game

if __name__ == '__main__':
    game = Game()
    game.run()
