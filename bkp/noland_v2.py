import pygame
import sys

clock = pygame.time.Clock()

class Popup:
    # Simplified Popup class initialization with direct attribute assignments
    def __init__(self, title, size, position, font):
        self.title = title
        self.size = size
        self.position = position
        self.dragging = False
        self.header_height = 20
        self.font = font
        self.close_button_rect = pygame.Rect(position[0] + size[0] - 20, position[1], 20, self.header_height)
    
    def draw(self, screen):
        # Consolidated drawing logic for body, header, title, and close button
        # Popup body with stroke
        stroke_width = 1  # Adjust the stroke width as needed
        body_color = (7, 7, 7)  # Color of the popup body
        header_color = (22, 22, 22)
        stroke_color = (0, 100, 0)  # Color of the stroke

        pygame.draw.rect(screen, body_color, pygame.Rect(self.position, self.size))  # Popup body
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, self.size), stroke_width)

        pygame.draw.rect(screen, header_color, pygame.Rect(self.position, (self.size[0], self.header_height)))  # Popup header
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, (self.size[0], self.header_height)), stroke_width)

        title_surf = self.font.render(self.title, True, (255, 255, 255))
        screen.blit(title_surf, (self.position[0] + 5, self.position[1] - 1))  # Title
        close_surf = self.font.render("X", True, (255, 255, 255)) # X
        screen.blit(close_surf, (self.close_button_rect.x + 5, self.close_button_rect.y -1))  # Close button
    
    def check_interaction(self, mouse_pos):
        # Unified interaction check for close button and draggable area
        if self.close_button_rect.collidepoint(mouse_pos):
            return "close"
        elif pygame.Rect(self.position[0], self.position[1], self.size[0], self.header_height).collidepoint(mouse_pos):
            return "drag"
        return None

    def move(self, dx, dy):
        # Synchronized movement of popup and its close button
        self.position = (self.position[0] + dx, self.position[1] + dy)
        self.close_button_rect.move_ip(dx, dy)

class Menu:
    # Simplified Menu class with essential functionality
    def __init__(self, options, font):
        self.options = options
        self.font = font
        self.active = False
        self.position = (0, 0)
    
    def draw(self, screen):
        if self.active:
            for i, option in enumerate(self.options):
                text_surf = self.font.render(option, True, (255, 255, 255))
                text_rect = text_surf.get_rect(topleft=(self.position[0], self.position[1] + i * 20))
                screen.blit(text_surf, text_rect)
    
    def check_click(self, mouse_pos):
        if not self.active: return None
        for i, option in enumerate(self.options):
            option_rect = pygame.Rect(self.position[0], self.position[1] + i * 20, 200, 20)  # Assuming a fixed width and height for the option
            if option_rect.collidepoint(mouse_pos):
                return i
        return None

    def show(self, pos):
        self.position = pos
        self.active = True

    def hide(self):
        self.active = False

class Game:
    def __init__(self):
        pygame.init()
        self.setup_screen()
        self.font = pygame.font.Font('fonts/LucidaSansUnicode.ttf', 14)
        self.setup_game()
    
    def setup_screen(self):
        # Extracts screen setup to its method for clarity
        infoObject = pygame.display.Info()
        self.screen_width = infoObject.current_w // 2
        self.screen_height = infoObject.current_h // 2
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
        pygame.display.set_caption('Noland v0.0.0.1')

    def setup_game(self):
        # Initializes game state variables
        self.background_color = (0, 0, 0)
        self.grid_color = (7, 7, 7)
        self.grid_width = 1  # Stroke width
        self.offset_x, self.offset_y = 0, 0
        self.dragging = False
        self.last_mouse_position = (0, 0)
        self.right_click_menu = Menu(['Create Popup', 'Quit Game'], self.font)
        self.popups = []

    def run(self):
        running = True
        while running:
            for event in pygame.event.get():
                self.handle_event(event)
            self.render()
        pygame.quit()
        sys.exit()

    def handle_resize(self, event):
        """Handle window resize events."""
        self.screen_width, self.screen_height = event.size
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)


    def handle_event(self, event):
        clock.tick(30)  # limits FPS to 30
        # Centralized event handling
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.VIDEORESIZE:
            self.handle_resize(event)
        elif event.type == pygame.MOUSEBUTTONDOWN:
            self.process_mouse_down(event)
        elif event.type == pygame.MOUSEBUTTONUP:
            self.process_mouse_up(event)
        elif event.type == pygame.MOUSEMOTION:
            self.process_mouse_motion(event)

    def handle_menu_option_selection(self, option_index, mouse_pos):
        """Handle actions based on the selected menu option."""
        adjust = 100
        adjusted_pos = (max(mouse_pos[0] - adjust, 0), max(mouse_pos[1] - adjust, 0))

        if option_index == 0:
            # Action for the first option
            self.popups.append(Popup("Popup Window", (300, 200), adjusted_pos, self.font))
        elif option_index == 1:
            # Action for quitting the game
            pygame.quit()
            sys.exit()


    def process_mouse_down(self, event):
        if event.button == 3:  # Right-click
            self.right_click_menu.show(event.pos)
            self.dragging = False  # Ensure the game background is not dragged when showing the menu
        elif event.button == 1:  # Left-click
            clicked_on_popup = False
            for popup in reversed(self.popups):
                interaction = popup.check_interaction(event.pos)
                if interaction == "drag":
                    popup.dragging = True
                    clicked_on_popup = True
                    break
                elif interaction == "close":
                    self.popups.remove(popup)
                    clicked_on_popup = True
                    break

            if not clicked_on_popup and self.right_click_menu.active:
                option_index = self.right_click_menu.check_click(event.pos)
                if option_index is not None:
                    self.handle_menu_option_selection(option_index, event.pos)
                    self.right_click_menu.active = False  # Hide menu after selection or if click was outside
            elif not clicked_on_popup:
                self.dragging = True
                self.last_mouse_position = event.pos

    def process_mouse_up(self, event):
        if event.button == 1:  # Left-click release
            self.dragging = False
            for popup in self.popups:
                popup.dragging = False


    def process_mouse_motion(self, event):
        dx, dy = event.pos[0] - self.last_mouse_position[0], event.pos[1] - self.last_mouse_position[1]
        
        if self.dragging:
            # Move the background and all popups with it
            self.offset_x += dx
            self.offset_y += dy
            for popup in self.popups:
                popup.position = (popup.position[0] + dx, popup.position[1] + dy)
                popup.close_button_rect.move_ip(dx, dy)
        else:
            # Handle individual popup dragging
            for i, popup in enumerate(self.popups):
                if popup.dragging:
                    # Move the dragged popup
                    popup.move(dx, dy)
                    # Bring the dragged popup to the front if not already
                    if i < len(self.popups) - 1:  # Check if popup is not already the last one
                        self.popups.append(self.popups.pop(i))
                    break  # Since one popup is dragged, no need to check others

        self.last_mouse_position = event.pos

    def render(self):
        self.screen.fill(self.background_color)
        # Draw the grid
        grid_spacing = 100
        for x in range(0, self.screen_width, grid_spacing):
            pygame.draw.line(self.screen, self.grid_color, (x + self.offset_x % grid_spacing, 0), (x + self.offset_x % grid_spacing, self.screen_height))
        for y in range(0, self.screen_height, grid_spacing):
            pygame.draw.line(self.screen, self.grid_color, (0, y + self.offset_y % grid_spacing), (self.screen_width, y + self.offset_y % grid_spacing))
        # Draw popups
        for popup in self.popups:
            popup.draw(self.screen)
        # Draw the right-click menu if active
        if self.right_click_menu.active:
            self.right_click_menu.draw(self.screen)
        pygame.display.flip()

if __name__ == '__main__':
    game = Game()
    game.run()
