import pygame
from settings.config import *

class Menu:
    # Simplified Menu class with essential functionality
    def __init__(self, options, font_manager):
        self.options = options
        self.font_manager = font_manager
        self.active = False
        self.position = (0, 0)
    
    def draw(self, screen):
        font = self.font_manager.get_font(FONT_PATH, FONT_SIZE)
        if self.active:
            for i, option in enumerate(self.options):
                text_surf = font.render(option, True, (255, 255, 255))
                text_rect = text_surf.get_rect(topleft=(self.position[0], self.position[1] + i * 20))
                screen.blit(text_surf, text_rect)
    
    def check_click(self, mouse_pos):
        if not self.active: return None
        for i, option in enumerate(self.options):
            option_rect = pygame.Rect(self.position[0], self.position[1] + i * 20, 200, 20)  # Assuming a fixed width and height for the option
            if option_rect.collidepoint(mouse_pos):
                return i
        return None

    def show(self, pos, options=None):
        if options is not None:
            self.options = options  # Update menu options if provided
        self.position = pos
        self.active = True
    
    def hide(self):
        self.active = False