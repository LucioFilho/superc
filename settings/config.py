import pygame

# Game settings
GAME_NAME = "Turnover Chess"
GAME_VERSION =  " v0.0.0.1"
GAME_TITLE = GAME_NAME + GAME_VERSION

# Screen sizes
infoObject = pygame.display.Info()
SCREEN_WIDTH = infoObject.current_w // 2  # Default screen width
SCREEN_HEIGHT = infoObject.current_h // 2  # Default screen height
FPS = 30  # Frames per second

# Color settings
BACKGROUND_COLOR = (0, 0, 0)
GRID_SPACING = 100
GRID_WIDTH =  1  # Stroke width
GRID_COLOR = (7, 7, 7)
POPUP_BACKGROUND_COLOR = (7, 7, 7)
POPUP_STROKE_COLOR = (22, 22, 22)
HIGHLIGHT_COLOR = (55, 55, 55)

# Define constants that don't depend on the Pygame display being initialized
LIGHT_SQUARE_COLOR = (238, 238, 210)
DARK_SQUARE_COLOR = (118, 150, 86)
BOARD_SIZE = 8
SQUARE_SIZE = 64

# Asset paths
ASSET_PATH = "assets/"

# Main assets. 
ITEM_BG_IMAGE = ASSET_PATH + "main/item_bg.jpg"

ICON_PATHS = [
    ASSET_PATH + "icon/B2/B2_item0_icon_100x100.png",
    ASSET_PATH + "icon/B2/B2_item1_icon_100x100.png",
    ASSET_PATH + "icon/B2/B2_item2_icon_100x100.png",
]

BOARD_PATHS = {
    'wall_white': {'type': 'wall', 'color': 'white'},
    'wall': ASSET_PATH + "board/wall_black.png",
    ASSET_PATH + "board/wall_white.png",
    ASSET_PATH + "board/fort_black.png",
    ASSET_PATH + "board/fort_white.png",
    ASSET_PATH + "board/tower_black.png",
    ASSET_PATH + "board/tower_white.png",
}

# Font settings
FONT_PATH = "fonts/LucidaSansUnicode.ttf"
FONT_SIZE = 14

# Other configurations
GRID_SPACING = 100
POPUP_DEFAULT_SIZE = (300, 200)

INITIAL_POSITIONS = {
            # white pieces
            'a1': {'type': 'castle', 'color': 'white'},
            'c1': {'type': 'castle', 'color': 'white'},
            'e1': {'type': 'castle', 'color': 'white'},
            'g1': {'type': 'castle', 'color': 'white'},
            'b2': {'type': 'castle', 'color': 'white'},
            'd2': {'type': 'castle', 'color': 'white'},
            'f2': {'type': 'castle', 'color': 'white'},
            'h2': {'type': 'castle', 'color': 'white'},
            # black pieces
            'a8': {'type': 'castle', 'color': 'black'},
            'c8': {'type': 'castle', 'color': 'black'},
            'e8': {'type': 'castle', 'color': 'black'},
            'g8': {'type': 'castle', 'color': 'black'},
            'b7': {'type': 'castle', 'color': 'black'},
            'd7': {'type': 'castle', 'color': 'black'},
            'f7': {'type': 'castle', 'color': 'black'},
            'h7': {'type': 'castle', 'color': 'black'},
}