import pygame

# Define constants that don't depend on the Pygame display being initialized
LIGHT_SQUARE_COLOR = (238, 238, 210)
DARK_SQUARE_COLOR = (118, 150, 86)
BOARD_SIZE = 8
SQUARE_SIZE = 64

# Define a function to get screen settings that depend on the display
def get_screen_settings():
    infoObject = pygame.display.Info()
    SCREEN_WIDTH = infoObject.current_w // 2
    SCREEN_HEIGHT = infoObject.current_h // 2
    return SCREEN_WIDTH, SCREEN_HEIGHT
