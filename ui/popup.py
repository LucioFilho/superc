import pygame
from settings.config import *

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
        body_color = POPUP_BACKGROUND_COLOR  # Popup body's color
        header_color = (12, 12, 12)
        stroke_color = POPUP_STROKE_COLOR  # Stroke's color
        highlight_color = HIGHLIGHT_COLOR  # Color for highlighting
        font = self.font_manager.get_font(FONT_PATH, FONT_SIZE)

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

class AssetPopup(Popup):
    def __init__(self, title, size, position, font_manager, item_images):
        super().__init__(title, size, position, font_manager)
        self.item_images = item_images  # List of item images
        self.bg_image = pygame.image.load(str(ITEM_BG_IMAGE))

        # Load item icons
        self.icons = [pygame.image.load(icon_path) for icon_path in item_images]
        self.items = []  # To store item rects for positioning
        self.vertical_scroll_offset = 0  # Initialize vertical scroll offset
        
    def draw(self, screen):
        super().draw(screen)  # Draw the popup itself
        item_size = (100, 100)  # Size of each item, including the background
        padding = 10  # Space between items
        # Calculate initial position for the first item
        start_x, start_y = self.position[0] + 10, self.position[1] + self.header_height + 10 - self.vertical_scroll_offset
        current_x, current_y = start_x, start_y

        # Set the clipping area to the popup's content area
        content_rect = pygame.Rect(self.position[0], self.position[1] + self.header_height, self.size[0], self.size[1] - self.header_height)
        original_clip = screen.get_clip()  # Store the original clipping area
        screen.set_clip(content_rect)  # Set new clipping area

        for icon in self.icons:
            # Draw background image
            screen.blit(self.bg_image, (current_x, current_y))
            # Draw icon on top of the background
            screen.blit(icon, (current_x, current_y))
            # Update positions for the next item
            current_x += item_size[0] + padding
            # Check if the next item exceeds the popup width
            if current_x + item_size[0] > self.position[0] + self.size[0]:
                current_x = start_x  # Reset to the first column
                current_y += item_size[1] + padding  # Move to the next row

        # Reset the clipping area to its original state
        screen.set_clip(original_clip)

    def update_scroll(self, direction):
        # Adjust these values based on your needs
        scroll_step = 50  # How many pixels to scroll with each wheel move
        
        # Update self.vertical_scroll_offset based on direction ('up' or 'down')
        if direction == 'up':
            self.vertical_scroll_offset = max(0, self.vertical_scroll_offset - scroll_step)
        elif direction == 'down':
            # Example logic, replace with actual content height calculation
            max_offset = max(0, len(self.icons) * 110 - (self.size[1] - self.header_height))
            self.vertical_scroll_offset = min(max_offset, self.vertical_scroll_offset + scroll_step)
        
    def resize(self, dx, dy, interaction_type):
        super().resize(dx, dy, interaction_type)
        # No additional actions needed for resize, but you could adjust item layout here
