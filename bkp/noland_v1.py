import pygame
import sys

class Popup:
    def __init__(self, title, size, position, font):
        self.title = title
        self.size = size
        self.position = position
        self.dragging = False
        self.header_height = 20
        self.font = font
        # Define the close button area within the popup header
        self.close_button_rect = pygame.Rect(position[0] + size[0] - 20, position[1], 20, self.header_height)
    
    def draw(self, screen):
        # Draw the popup body
        pygame.draw.rect(screen, (100, 100, 100), pygame.Rect(self.position, self.size))
        # Draw the popup header
        pygame.draw.rect(screen, (70, 70, 70), pygame.Rect(self.position, (self.size[0], self.header_height)))
        # Render and draw the popup title
        title_surf = self.font.render(self.title, True, (255, 255, 255))
        screen.blit(title_surf, (self.position[0] + 5, self.position[1] + 5))
        # Draw the close button ("X")
        close_surf = self.font.render("X", True, (255, 0, 0))  # Consider using red color for visibility
        screen.blit(close_surf, (self.close_button_rect.x + 2, self.close_button_rect.y))
    
    def check_interaction(self, mouse_pos):
        # Check if the close button ("X") was clicked
        if self.close_button_rect.collidepoint(mouse_pos):
            return "close"
        # Check if the header area was clicked for dragging
        elif pygame.Rect(self.position[0], self.position[1], self.size[0], self.header_height).collidepoint(mouse_pos):
            return "drag"
        return None  # Return None if the click was outside the interactive areas

    def move(self, dx, dy):
        # Move the popup and its close button according to the drag distance
        self.position = (self.position[0] + dx, self.position[1] + dy)
        self.close_button_rect.move_ip(dx, dy)  # Ensure the close button moves with the popup


class Menu:
    def __init__(self, options, font):
        self.options = options
        self.font = font
        self.active = False
        self.rects = []
        self.position = (0, 0)
    
    def draw(self, screen, pos):
        if self.active:
            for i, option in enumerate(self.options):
                text_surf = self.font.render(option, True, (255, 255, 255))
                text_rect = text_surf.get_rect(topleft=(pos[0], pos[1] + i * 20))
                screen.blit(text_surf, text_rect)
                self.rects.append(text_rect)
    
    def check_click(self, mouse_pos):
        for i, rect in enumerate(self.rects):
            if rect.collidepoint(mouse_pos):
                return i
        return None

    def show(self, pos):
        self.position = pos
        self.active = True
        self.rects = []  # Reset rectangles each time the menu is shown

    def hide(self):
        self.active = False

class Game:
    def __init__(self):
        pygame.init()
        infoObject = pygame.display.Info()
        self.screen_width = infoObject.current_w // 2
        self.screen_height = infoObject.current_h // 2
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
        pygame.display.set_caption('Noland v0.0.0.1')
        
        self.font = pygame.font.SysFont('fonts/lucidasansunicode.ttf', 16)
        self.background_color = (0, 0, 0)
        self.grid_color = (50, 50, 50)
        self.offset_x, self.offset_y = 0, 0
        self.dragging = False
        self.last_mouse_position = (0, 0)
        self.right_click_menu = Menu(['Create Popup', 'Quit Game'], self.font)
        self.popups = []

    def run(self):
        running = True
        while running:
            for event in pygame.event.get():
                if event.type == pygame.QUIT:
                    running = False
                elif event.type == pygame.VIDEORESIZE:
                    self.handle_resize(event)
                elif event.type == pygame.MOUSEBUTTONDOWN:
                    if event.button == 3:  # Right-click
                        self.right_click_menu.show(event.pos)
                    elif event.button == 1:  # Left-click
                        self.process_click(event.pos)
                elif event.type == pygame.MOUSEBUTTONUP:
                    if event.button == 1:  # Left-click release
                        self.dragging = False
                        for popup in self.popups:
                            popup.dragging = False
                elif event.type == pygame.MOUSEMOTION:
                    self.process_motion(event.pos)

            self.render()

        pygame.quit()
        sys.exit()

    def handle_resize(self, event):
        self.screen_width, self.screen_height = event.w, event.h
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
    
    def process_click(self, pos):
        if self.right_click_menu.active:
            selection = self.right_click_menu.check_click(pos)
            if selection is not None:
                self.menu_action(selection)
            self.right_click_menu.hide()
        else:
            popup_interacted = False
            for popup in reversed(self.popups):  # Check from the topmost popup
                interaction = popup.check_interaction(pos)
                if interaction == "drag":
                    popup.dragging = True
                    # Move the popup to the front if it's not already
                    self.popups.append(self.popups.pop(self.popups.index(popup)))
                    popup_interacted = True
                    self.dragging = False  # Ensure grid is not dragged when dragging popup
                    break  # Found the popup to interact with, exit loop
                elif interaction == "close":
                    self.popups.remove(popup)
                    popup_interacted = True
                    break  # Popup is closed, exit loop
            if not popup_interacted:
                self.dragging = True
                self.last_mouse_position = pos

    def process_mouse_down(self, event):
        if event.button == 3:  # Right-click
            self.right_click_menu.show(event.pos)
            self.dragging = False  # Ensure the game background is not dragged when showing the menu

        elif event.button == 1:  # Left-click
            popup_interacted = False  # Flag to track if any popup was interacted with

            for popup in reversed(self.popups):  # Prioritize topmost popups
                interaction = popup.check_interaction(event.pos)

                if interaction == "drag":
                    popup.dragging = True
                    # Bring the interacted popup to the front for rendering
                    self.popups.append(self.popups.pop(self.popups.index(popup)))
                    popup_interacted = True
                    break  # Stop checking once interaction is handled

                elif interaction == "close":
                    self.popups.remove(popup)
                    popup_interacted = True
                    break  # Stop checking once the popup is closed

            if not popup_interacted:
                self.dragging = True
                self.last_mouse_position = event.pos
            elif self.right_click_menu.active and not popup_interacted:
                # Hide the menu if the click was outside popups but the menu is active
                self.right_click_menu.hide()

    def process_motion(self, pos):
        dx, dy = pos[0] - self.last_mouse_position[0], pos[1] - self.last_mouse_position[1]
        if self.dragging:
            self.offset_x += dx
            self.offset_y += dy
        else:
            for popup in self.popups:
                if popup.dragging:
                    popup.move(dx, dy)
        self.last_mouse_position = pos

    def menu_action(self, selection):
        if selection == 0:  # Create Popup
            new_popup = Popup("Popup", (200, 150), self.last_mouse_position, self.font)
            self.popups.append(new_popup)
        elif selection == 1:  # Quit Game
            pygame.quit()
            sys.exit()

    def render(self):
        self.screen.fill(self.background_color)     
        # Draw grid
        for x in range(self.offset_x % 20, self.screen_width, 20):
            pygame.draw.line(self.screen, self.grid_color, (x, 0), (x, self.screen_height))
        for y in range(self.offset_y % 20, self.screen_height, 20):
            pygame.draw.line(self.screen, self.grid_color, (0, y), (self.screen_width, y))
        # Draw popups
        for popup in self.popups:
            popup.draw(self.screen)
        # Draw menu
        if self.right_click_menu.active:
            self.right_click_menu.draw(self.screen, self.right_click_menu.position)
        pygame.display.flip()

if __name__ == '__main__':
    game = Game()
    game.run()
