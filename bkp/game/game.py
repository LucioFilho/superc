import pygame
import cairo
import sys
 
from settings.config import *
from managers.font_manager import FontManager
from ui.popup import *
from ui.menu import Menu

clock = pygame.time.Clock()

class Game:
    def __init__(self):
        pygame.init()
        self.setup_screen()

        #Font Manager
        self.font_manager = FontManager()  # Initialize the font manager
        self.setup_game()

        self.menu_context = None  # Track the context of the right-click menu
        self.current_right_clicked_popup = None
        self.current_resizing_popup = None
        self.dragging_popup = None  # Add this line to initialize the dragging_popup attribute
        
    def setup_screen(self):
        # Extracts screen setup to its method for clarity
        self.screen_width = SCREEN_WIDTH
        self.screen_height = SCREEN_HEIGHT
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
        pygame.display.set_caption(GAME_TITLE)
        cairo_surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, SCREEN_WIDTH, SCREEN_HEIGHT)
        cairo_context = cairo.Context(cairo_surface)

    def draw_grid_on_background(self):
        self.background_surface.fill(self.background_color)  # Clear previous drawings
        grid_spacing = GRID_SPACING
        
        # Adjust starting points based on offsets
        start_x = self.offset_x % grid_spacing
        start_y = self.offset_y % grid_spacing
        
        for x in range(-start_x, self.screen_width, grid_spacing):
            pygame.draw.line(self.background_surface, self.grid_color, (x, 0), (x, self.screen_height))
        for y in range(-start_y, self.screen_height, grid_spacing):
            pygame.draw.line(self.background_surface, self.grid_color, (0, y), (self.screen_width, y))

    def setup_game(self):
        # Initializes game state variables
        self.background_color = BACKGROUND_COLOR
        self.grid_color = GRID_COLOR
        self.grid_width = GRID_WIDTH  # Stroke width
        self.offset_x, self.offset_y = 0, 0
        self.dragging = False
        self.last_mouse_position = (0, 0)
        self.right_click_menu = Menu(['Assets', 'Quit Game'], self.font_manager)

        # Initializes background grid
        self.background_surface = pygame.Surface((self.screen_width, self.screen_height))
        self.background_surface.fill(self.background_color)
        self.draw_grid_on_background()

        self.popups = []

    def handle_resize(self, event):
        # Update screen size
        self.screen_width, self.screen_height = event.size
        self.screen = pygame.display.set_mode((self.screen_width, self.screen_height), pygame.RESIZABLE)
        # Recreate the background surface
        self.background_surface = pygame.Surface((self.screen_width, self.screen_height))
        self.background_surface.fill(self.background_color)
        self.draw_grid_on_background()

    def scroll_popup(self, mouse_pos, direction):
        for popup in self.popups:
            popup_rect = pygame.Rect(popup.position[0], popup.position[1], popup.size[0], popup.size[1])
            if popup_rect.collidepoint(mouse_pos):
                # Check if the popup is an instance of AssetPopup or has scrolling capability
                if isinstance(popup, AssetPopup):
                    popup.update_scroll(direction)
                break  # Once the popup under the mouse is found and handled, exit the loop

    def handle_event(self, event):
        clock.tick(FPS)
        # Centralized event handling
        if event.type == pygame.QUIT:
            sys.exit()
        elif event.type == pygame.VIDEORESIZE:
            self.handle_resize(event)
        elif event.type == pygame.MOUSEBUTTONDOWN:
            self.process_mouse_down(event)
            # Scroll events
            if event.button == 4:  # Scroll up
                self.scroll_popup(event.pos, 'up')
            elif event.button == 5:  # Scroll down
                self.scroll_popup(event.pos, 'down')
            elif event.button == 6:  # Scroll left (assuming your mouse has this button)
                self.scroll_popup(event.pos, 'left')
            elif event.button == 7:  # Scroll right (assuming your mouse has this button)
                self.scroll_popup(event.pos, 'right')
        elif event.type == pygame.MOUSEBUTTONUP:
            self.process_mouse_up(event)
        elif event.type == pygame.MOUSEMOTION:
            self.process_mouse_motion(event)
        
        
        # Add logic to handle chess-specific events, like piece selection and movement

    def open_assets(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        self.popups = [popup for popup in self.popups if not isinstance(popup, AssetPopup)]
        self.popups.append(AssetPopup("Assets", (600, 350), adjusted_pos, self.font_manager, ICON_PATHS))

    def open_play(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        play_popup = PlayPopup("Play", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(play_popup)

    def open_board(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        board_popup = BoardPopup("Board", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(board_popup)

    def open_puzzles(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        puzzles_popup = PuzzlesPopup("Puzzles", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(puzzles_popup)

    def open_learn(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        learn_popup = LearnPopup("Learn", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(learn_popup)

    def open_watch(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        watch_popup = WatchPopup("Watch", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(watch_popup)

    def open_community(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        community_popup = CommunityPopup("Community", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(community_popup)

    def open_tools(self, mouse_pos):
        adjusted_pos = (max(mouse_pos[0] - 100, 0), max(mouse_pos[1] - 100, 0))
        tools_popup = ToolsPopup("Tools", (600, 400), adjusted_pos, self.font_manager)
        self.popups.append(tools_popup)

    def quit_game(self, mouse_pos):
        pygame.quit()
        sys.exit()
    
    def get_general_menu_options(self):
        options = {
            "Assets": self.open_assets,
            "Board": self.open_board,
            "Play": self.open_play,
            "Puzzles": self.open_puzzles,
            "Learn": self.open_learn,
            "Watch": self.open_watch,
            "Community": self.open_community,
            "Tools": self.open_tools,
            "Quit Game": self.quit_game
        }
        return options
    
    def show_right_click_menu(self, position):
        options = self.get_general_menu_options()
        option_texts = list(options.keys())  # Get the option names to display in the menu
        self.right_click_menu.show(position, option_texts)

    def handle_menu_option_selection(self, option_index, mouse_pos):  
        options = self.get_general_menu_options()

        if self.menu_context == "popup" and option_index == 0:
            for i, popup in enumerate(self.popups):
                popup_rect = pygame.Rect(popup.position[0], popup.position[1], popup.size[0], popup.size[1])
                if popup_rect.collidepoint(mouse_pos):
                    self.popups.pop(i)  
                    break  
        elif self.menu_context == "general":
            selected_option_text = self.right_click_menu.options[option_index]
            action_func = options.get(selected_option_text)
            if action_func:
                action_func(mouse_pos)  

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
            self.menu_context = self.determine_menu_context(event.pos)

            if self.menu_context == "popup":
                for popup in self.popups:
                    # Find and track the right-clicked popup
                    popup_rect = pygame.Rect(popup.position[0], popup.position[1], popup.size[0], popup.size[1])
                    if popup_rect.collidepoint(event.pos):
                        self.current_right_clicked_popup = popup
                        break

                # Example: Specific options for right-clicking on a popup
                options = ['Close Popup']

            self.show_right_click_menu(event.pos)

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

        # Check for mouse-over popup edges or corners for highlighting
        for popup in self.popups:
            popup.check_interaction(event.pos)  # This will update highlight_edge as needed

        if self.current_resizing_popup and self.current_resizing_popup.resizing:
            interaction_type = 'resize_corner' if self.current_resizing_popup.resizing_edge == 'corner' else self.current_resizing_popup.resizing_edge
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
    
    def run(self):
        running = True
        while running:
            for event in pygame.event.get():
                self.handle_event(event)
            self.render()
        pygame.quit()
        sys.exit()

 