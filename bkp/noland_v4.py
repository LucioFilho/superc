import pygame
import sys

clock = pygame.time.Clock()

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

class Popup:
    # Simplified Popup class initialization with direct attribute assignments
    def __init__(self, title, size, position, font_manager):
        self.title = title
        self.size = size
        self.position = position
        self.dragging = False
        
        self.header_height = 20
        self.font_manager = font_manager
        self.close_button_rect = pygame.Rect(position[0] + size[0] - 20, position[1], 20, self.header_height)
    
    def draw(self, screen):
        # Consolidated drawing logic for body, header, title, and close button
        # Popup body with stroke
        stroke_width = 1  # Adjust the stroke width as needed
        body_color = (7, 7, 7)  # Popup body's color
        header_color = (12, 12, 12)
        stroke_color = (22, 22, 22)  # Stroke's color
        font = self.font_manager.get_font('fonts/LucidaSansUnicode.ttf', 14)

        pygame.draw.rect(screen, body_color, pygame.Rect(self.position, self.size))  # Popup body
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, self.size), stroke_width)

        pygame.draw.rect(screen, header_color, pygame.Rect(self.position, (self.size[0], self.header_height)))  # Popup header
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, (self.size[0], self.header_height)), stroke_width)

        title_surf = font.render(self.title, True, (255, 255, 255))
        screen.blit(title_surf, (self.position[0] + 5, self.position[1] - 1))  # Title
        close_surf = font.render("X", True, (255, 255, 255)) # X
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
    def __init__(self, options, font_manager):
        self.options = options
        self.font_manager = font_manager
        self.active = False
        self.position = (0, 0)
    
    def draw(self, screen):
        font = self.font_manager.get_font('fonts/LucidaSansUnicode.ttf', 14)
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

class Game:
    def __init__(self):
        pygame.init()
        self.setup_screen()

        #Font Manager
        self.font_manager = FontManager()  # Initialize the font manager
        self.setup_game()
        
    def setup_screen(self):
        # Extracts screen setup to its method for clarity
        infoObject = pygame.display.Info()
        self.screen_width = infoObject.current_w // 2
        self.screen_height = infoObject.current_h // 2
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
        pygame.display.set_caption('Noland v0.0.0.1')

    def draw_grid_on_background(self):
        self.background_surface.fill(self.background_color)  # Clear previous drawings
        grid_spacing = 100
        
        # Adjust starting points based on offsets
        start_x = self.offset_x % grid_spacing
        start_y = self.offset_y % grid_spacing
        
        for x in range(-start_x, self.screen_width, grid_spacing):
            pygame.draw.line(self.background_surface, self.grid_color, (x, 0), (x, self.screen_height))
        for y in range(-start_y, self.screen_height, grid_spacing):
            pygame.draw.line(self.background_surface, self.grid_color, (0, y), (self.screen_width, y))

    def setup_game(self):
        # Initializes game state variables
        self.background_color = (0, 0, 0)
        self.grid_color = (7, 7, 7)
        self.grid_width = 1  # Stroke width
        self.offset_x, self.offset_y = 0, 0
        self.dragging = False
        self.last_mouse_position = (0, 0)
        self.right_click_menu = Menu(['Create Popup', 'Quit Game'], self.font_manager)

        # Initializes background grid
        self.background_surface = pygame.Surface((self.screen_width, self.screen_height))
        self.background_surface.fill(self.background_color)
        self.draw_grid_on_background()

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
        # Update screen size
        self.screen_width, self.screen_height = event.size
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
        # Recreate the background surface
        self.background_surface = pygame.Surface((self.screen_width, self.screen_height))
        self.background_surface.fill(self.background_color)
        self.draw_grid_on_background()

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
            self.popups.append(Popup("Popup Window", (300, 200), adjusted_pos, self.font_manager))
        elif option_index == 1:
            # Action for quitting the game
            pygame.quit()
            sys.exit()
    
    def determine_menu_context(self, mouse_pos):
        # Example: Check if right-click is over a popup
        for popup in self.popups:
            popup_rect = pygame.Rect(popup.position[0], popup.position[1], popup.size[0], popup.size[1])
            if popup_rect.collidepoint(mouse_pos):
                return "popup"  # Identifies the popup context

        # Here, add more checks for other elements (e.g., NPCs, items) as your game develops

        return "general"  # Default context

    def process_mouse_down(self, event):
        if event.button == 3:  # Right-click
            # Determine the context for the right-click menu
            menu_context = self.determine_menu_context(event.pos)

            # Show the context-appropriate menu
            if menu_context == "popup":
                # Example: Specific options for right-clicking on a popup
                self.right_click_menu.show(event.pos, options=['Option 1', 'Option 2', 'Close Popup'])
            elif menu_context == "general":
                # The general menu for areas without specific context
                self.right_click_menu.show(event.pos, options=['Create Popup', 'Quit Game'])
            # Prevent dragging if showing the menu
            self.dragging = False

        elif event.button == 1:  # Left-click
            # Handling left-click interactions as before
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

            if clicked_on_popup:
                return  # Early return if a popup was clicked or interacted with

            if self.right_click_menu.active:
                option_index = self.right_click_menu.check_click(event.pos)
                if option_index is not None:
                    self.handle_menu_option_selection(option_index, event.pos)
                self.right_click_menu.active = False  # Hide menu after selection or if click was outside
            else:
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
            # Invert direction for cohesive movement
            self.offset_x -= dx
            self.offset_y -= dy
            # Redraw the grid to reflect updated position
            self.draw_grid_on_background()
            # Ensure popups also move with the background in a cohesive manner
            for popup in self.popups:
                popup.position = (popup.position[0] + dx, popup.position[1] + dy)
                popup.close_button_rect.move_ip(dx, dy)

        else:
            # Handle individual popup dragging
            for i, popup in enumerate(self.popups):
                if popup.dragging:
                    # Directly move the dragged popup
                    popup.move(dx, dy)
                    
                    # Bring the dragged popup to the front
                    if i < len(self.popups) - 1:  # Check if popup is not already the last one
                        self.popups.append(self.popups.pop(i))  # Move the dragged popup to the end of the list
                    
                    break  # Since one popup is dragged, no need to check others

        self.last_mouse_position = event.pos

    def render(self):
        # Blit the pre-drawn background surface onto the screen
        self.screen.blit(self.background_surface, (0, 0))
        
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
