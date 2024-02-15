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
    def __init__(self, title, size, position, font_manager):
        self.title = title
        self.size = size
        self.position = position
        self.dragging = False
        self.resizing = False
        self.resizing_edge = None
        self.header_height = 20
        self.font_manager = font_manager
        self.close_button_rect = pygame.Rect(position[0] + size[0] - 20, position[1], 20, self.header_height)
        self.edge_threshold = 8  # Sensitivity area for edge detection
        self.corner_threshold = 26  # Sensitivity area for corner detection, adjust as needed
        self.highlight_edge = None  # Track which edge is being highlighted
        
        # Adding edges for resizing detection
        self.resize_edges = {
            'left': False,
            'right': False,
            'top': False,
            'bottom': False,
        }
    
    def draw(self, screen):
        # Consolidated drawing logic for body, header, title, and close button
        # Popup body with stroke
        stroke_width = 1  # Adjust the stroke width as needed
        body_color = (7, 7, 7)  # Popup body's color
        header_color = (12, 12, 12)
        stroke_color = (22, 22, 22)  # Stroke's color
        highlight_color = (255, 255, 255)  # Color for highlighting
        font = self.font_manager.get_font('fonts/LucidaSansUnicode.ttf', 14)

        # Draw the popup body and header
        pygame.draw.rect(screen, body_color, pygame.Rect(self.position, self.size))  # Popup body
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, self.size), stroke_width)

        pygame.draw.rect(screen, header_color, pygame.Rect(self.position, (self.size[0], self.header_height)))  # Popup header
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, (self.size[0], self.header_height)), stroke_width)

        title_surf = font.render(self.title, True, (255, 255, 255))
        screen.blit(title_surf, (self.position[0] + 5, self.position[1] - 1))  # Title
        close_surf = font.render("X", True, (255, 255, 255)) # X
        screen.blit(close_surf, (self.close_button_rect.x + 5, self.close_button_rect.y -1))  # Close button

        # Highlight edges if necessary
        if self.highlight_edge == 'right':
            pygame.draw.line(screen, highlight_color, (self.position[0] + self.size[0], self.position[1]), (self.position[0] + self.size[0], self.position[1] + self.size[1]), 2)
        elif self.highlight_edge == 'left':
            pygame.draw.line(screen, highlight_color, (self.position[0], self.position[1]), (self.position[0], self.position[1] + self.size[1]), 2)
        elif self.highlight_edge == 'top':
            pygame.draw.line(screen, highlight_color, (self.position[0], self.position[1]), (self.position[0] + self.size[0], self.position[1]), 2)
        elif self.highlight_edge == 'bottom':
            pygame.draw.line(screen, highlight_color, (self.position[0], self.position[1] + self.size[1]), (self.position[0] + self.size[0], self.position[1] + self.size[1]), 2)
        elif self.highlight_edge == 'corner':
            # Highlight both the right and bottom edges for the corner
            pygame.draw.line(screen, highlight_color, (self.position[0] + self.size[0] - self.corner_threshold, self.position[1] + self.size[1]), (self.position[0] + self.size[0], self.position[1] + self.size[1]), 2)  # Bottom edge near corner
            pygame.draw.line(screen, highlight_color, (self.position[0] + self.size[0], self.position[1] + self.size[1] - self.corner_threshold), (self.position[0] + self.size[0], self.position[1] + self.size[1]), 2)  # Right edge near corner
        
        # Redraw the border for the entire popup to maintain the border integrity
        pygame.draw.rect(screen, stroke_color, pygame.Rect(self.position, self.size), stroke_width)
    
    def check_interaction(self, mouse_pos):
        # Reset highlight edge at the beginning of each check
        self.highlight_edge = None

        # Check if the mouse is over the close button
        if self.close_button_rect.collidepoint(mouse_pos):
            return "close", None
        
        # Check for mouse over edges for resizing and update highlight_edge
        left_edge = pygame.Rect(self.position[0], self.position[1], self.edge_threshold, self.size[1])
        right_edge = pygame.Rect(self.position[0] + self.size[0] - self.edge_threshold, self.position[1], self.edge_threshold, self.size[1])
        top_edge = pygame.Rect(self.position[0], self.position[1], self.size[0], self.edge_threshold)
        bottom_edge = pygame.Rect(self.position[0], self.position[1] + self.size[1] - self.edge_threshold, self.size[0], self.edge_threshold)
        bottom_right_corner = (self.position[0] + self.size[0] - self.corner_threshold, self.position[1] + self.size[1] - self.corner_threshold)

        # Check for corner resize first
        if mouse_pos[0] >= bottom_right_corner[0] and mouse_pos[1] >= bottom_right_corner[1]:
            self.highlight_edge = 'corner'
            return "resize_corner", None
        
        # Check and highlight edges
        if left_edge.collidepoint(mouse_pos):
            self.highlight_edge = 'left'
            return "resize", 'left'
        elif right_edge.collidepoint(mouse_pos):
            self.highlight_edge = 'right'
            return "resize", 'right'
        elif top_edge.collidepoint(mouse_pos):
            self.highlight_edge = 'top'
            return "resize", 'top'
        elif bottom_edge.collidepoint(mouse_pos):
            self.highlight_edge = 'bottom'
            return "resize", 'bottom'

        # Check if the mouse is over the draggable header area
        if pygame.Rect(self.position[0], self.position[1], self.size[0], self.header_height).collidepoint(mouse_pos):
            return "drag", None

        # Check for mouse over edges for resizing
        resize_edge = self.detect_resize_edge(mouse_pos)
        if resize_edge:
            return "resize", resize_edge

        # Check if the mouse is over the draggable header area
        if pygame.Rect(self.position[0], self.position[1], self.size[0], self.header_height).collidepoint(mouse_pos):
            return "drag", None
        
        # Check for bottom right corner resize interaction
        bottom_right_corner = (self.position[0] + self.size[0] - self.corner_threshold, self.position[1] + self.size[1] - self.corner_threshold)
        
        if (mouse_pos[0] >= bottom_right_corner[0] and mouse_pos[1] >= bottom_right_corner[1]):
            return "resize_corner", None  # Indicate a corner resize interaction

        # Default case, no specific interaction detected
        return None, None
    
    def is_edge(self, mouse_pos):
        # Determine if mouse is over an edge for resizing
        edges = {
            "left": pygame.Rect(self.position[0], self.position[1], self.edge_threshold, self.size[1]),
            "right": pygame.Rect(self.position[0] + self.size[0] - self.edge_threshold, self.position[1], self.edge_threshold, self.size[1]),
            "top": pygame.Rect(self.position[0], self.position[1], self.size[0], self.edge_threshold),
            "bottom": pygame.Rect(self.position[0], self.position[1] + self.size[1] - self.edge_threshold, self.size[0], self.edge_threshold),
        }
        for edge, rect in edges.items():
            if rect.collidepoint(mouse_pos):
                self.resizing_edge = edge  # Track which edge is being resized
                return True
        return False
    
    def detect_resize_edge(self, mouse_pos):
        # Simplified logic to detect if mouse is near any edge
        left_edge = pygame.Rect(self.position[0], self.position[1], self.edge_threshold, self.size[1])
        right_edge = pygame.Rect(self.position[0] + self.size[0] - self.edge_threshold, self.position[1], self.edge_threshold, self.size[1])
        top_edge = pygame.Rect(self.position[0], self.position[1], self.size[0], self.edge_threshold)
        bottom_edge = pygame.Rect(self.position[0], self.position[1] + self.size[1] - self.edge_threshold, self.size[0], self.edge_threshold)

        if left_edge.collidepoint(mouse_pos):
            return 'left'
        elif right_edge.collidepoint(mouse_pos):
            return 'right'
        elif top_edge.collidepoint(mouse_pos):
            return 'top'
        elif bottom_edge.collidepoint(mouse_pos):
            return 'bottom'

        return None

    def resize(self, dx, dy, interaction_type):
        # Handle resizing based on which edge is selected
        if self.resizing_edge == "right":
            self.size = (max(100, self.size[0] + dx), self.size[1])
        elif self.resizing_edge == "bottom":
            self.size = (self.size[0], max(50, self.size[1] + dy))
        elif self.resizing_edge == "left":
            new_width = max(100, self.size[0] - dx)
            self.position = (self.position[0] + self.size[0] - new_width, self.position[1])
            self.size = (new_width, self.size[1])
        elif self.resizing_edge == "top":
            new_height = max(50, self.size[1] - dy)
            self.position = (self.position[0], self.position[1] + self.size[1] - new_height)
            self.size = (self.size[0], new_height)
        elif interaction_type == "resize_corner":
            new_width = max(220, self.size[0] + dx)  # Ensure minimum size
            new_height = max(140, self.size[1] + dy)  # Ensure minimum size
            self.size = (new_width, new_height)

        # Update close button position
        self.close_button_rect = pygame.Rect(self.position[0] + self.size[0] - 20, self.position[1], 20, self.header_height)

    def move(self, dx, dy):
        if not self.resizing:
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

        self.current_resizing_popup = None
        self.dragging_popup = None  # Add this line to initialize the dragging_popup attribute
        
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
                if event.type == pygame.QUIT:
                    running = False
                else:
                    self.handle_event(event)

            # After handling events, draw everything
            self.screen.fill((0, 0, 0))  # Clear screen with black or your background color

            # Redraw background or any static elements first
            self.render_background()

            # Draw popups which will include checking for interactions and highlighting if necessary
            for popup in self.popups:
                popup.draw(self.screen)  # Popup's draw method will handle highlighting based on the current state

            # Draw other UI elements or game objects here

            pygame.display.flip()  # Update the full display Surface to the screen

        pygame.quit()


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
            action = None  # Initialize action to None or a default value
            edge = None  # Initialize edge to None or a default value

            for popup in reversed(self.popups):
                action, edge = popup.check_interaction(event.pos)  # Retrieve both action and edge
                if action == "drag":
                    self.dragging_popup = popup
                    popup.dragging = True
                    clicked_on_popup = True
                    break
                elif action == "resize_corner":  # Handle corner resizing start
                    popup.resizing = True
                    popup.resizing_edge = 'corner'  # Assign a generic 'corner' value or handle specifically
                    self.current_resizing_popup = popup
                    clicked_on_popup = True
                elif action == "resize" and edge:  # Ensure edge information is present for resizing
                    popup.resizing = True
                    popup.resizing_edge = edge
                    self.current_resizing_popup = popup  # Track the current resizing popup
                    clicked_on_popup = True
                    break
                elif action == "close":
                    self.popups.remove(popup)
                    clicked_on_popup = True
                    break

            if clicked_on_popup:
                return  # Early return if a popup was clicked or interacted with
            
            # Handle dragging the background or other global interactions
            if not clicked_on_popup and not self.right_click_menu.active:
                self.dragging = True
            
            self.last_mouse_position = event.pos

            if self.right_click_menu.active:
                option_index = self.right_click_menu.check_click(event.pos)
                if option_index is not None:
                    self.handle_menu_option_selection(option_index, event.pos)
                self.right_click_menu.active = False  # Hide menu after selection or if click was outside
            else:
                self.dragging = True
                self.last_mouse_position = event.pos
        
            # Handling right-clicks, dragging, and initialization of resizing as before...
            if clicked_on_popup and action == 'resize':
                self.current_resizing_popup = popup  # Assume popup is the currently interacted popup object

    def process_mouse_up(self, event):
        if event.button == 1:  # Left mouse button
            if self.current_resizing_popup:
                self.current_resizing_popup.resizing = False
                self.current_resizing_popup = None
            if self.dragging_popup:
                self.dragging_popup.dragging = False
                self.dragging_popup = None
            self.dragging = False

    def process_mouse_motion(self, event):
        dx, dy = event.pos[0] - self.last_mouse_position[0], event.pos[1] - self.last_mouse_position[1]

        if self.current_resizing_popup and self.current_resizing_popup.resizing:
            # Determine the type of resizing interaction
            if hasattr(self.current_resizing_popup, 'resizing_edge') and self.current_resizing_popup.resizing_edge == 'corner':
                interaction_type = 'resize_corner'
            else:
                interaction_type = self.current_resizing_popup.resizing_edge  # Or any default value if necessary
            # Existing resizing logic for other edges
            self.current_resizing_popup.resize(dx, dy, interaction_type)
        else:
            # Handle dragging
            if self.dragging:
                # Background dragging logic here
                self.offset_x -= dx
                self.offset_y -= dy
                self.draw_grid_on_background()
                for popup in self.popups:
                    popup.position = (popup.position[0] + dx, popup.position[1] + dy)
                    popup.close_button_rect.move_ip(dx, dy)

            elif self.dragging_popup:
                # Popup dragging logic here
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
