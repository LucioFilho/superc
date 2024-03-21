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

# Asset paths
ASSET_PATH = "assets/"

# Main assets. 
ITEM_BG_IMAGE = ASSET_PATH + "img/main/item_bg.jpg"

ICON_PATHS = [
    ASSET_PATH + "icon/B2/B2_item0_icon_100x100.png",
    ASSET_PATH + "icon/B2/B2_item1_icon_100x100.png",
    ASSET_PATH + "icon/B2/B2_item2_icon_100x100.png",
]

# Font settings
FONT_PATH = "fonts/LucidaSansUnicode.ttf"
FONT_SIZE = 14

# Other configurations
GRID_SPACING = 100
POPUP_DEFAULT_SIZE = (300, 200)
