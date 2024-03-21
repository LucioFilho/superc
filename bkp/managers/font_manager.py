import pygame

class FontManager:
    def __init__(self):
        self.fonts = {}  # Store fonts in a dictionary

    def get_font(self, font_name, size):
        # Unique key for each font and size combination
        key = (font_name, size)
        if key not in self.fonts:
            # Load the font if not already loaded
            self.fonts[key] = pygame.font.Font(font_name, size)
        return self.fonts[key]