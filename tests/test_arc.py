import pygame
import cairo
import math

# Initialize Pygame
pygame.init()

# Constants for the window size
WIDTH, HEIGHT = 600, 600

# Set up the Pygame screen
screen = pygame.display.set_mode((WIDTH, HEIGHT))
pygame.display.set_caption('Cairo Circle in Pygame')

# Set up Cairo surface
cairo_surface = cairo.ImageSurface(cairo.FORMAT_ARGB32, WIDTH, HEIGHT)
cairo_context = cairo.Context(cairo_surface)

# Clear the surface with white (or any other color)
cairo_context.set_source_rgba(0.7, 0.7, 0.7, 1)  # White background
cairo_context.paint()

class Piece:
    def __init__(self, info):
        self.ptype = info['ptype']
        self.arcX = info['arcX']
        self.arcY = info['arcY']
        self.arcRad = info['arcRad']
        self.angleStart = info['angleStart'] * math.pi  # Converting to radians
        self.angleEnd = info['angleEnd'] * math.pi  # Converting to radians
        self.stBot = info['stBot']
        self.stTop = info['stTop']
        self.rgbaBot = info['rgbaBot']
        self.rgbaTop = info['rgbaTop']

    def draw(self):
        for (line_width, color) in [(self.stBot, self.rgbaBot), (self.stTop, self.rgbaTop)]:
            cairo_context.set_line_width(line_width)
            cairo_context.set_source_rgba(*color)
            cairo_context.arc(self.arcX, self.arcY, self.arcRad, self.angleStart, self.angleEnd)
            cairo_context.stroke()
    
    def flip_colors(self):
        # Invert the rgbaBot and rgbaTop colors
        self.rgbaBot = tuple(1 - c if i < 3 else c for i, c in enumerate(self.rgbaBot))  # Invert RGB, keep alpha
        self.rgbaTop = tuple(1 - c if i < 3 else c for i, c in enumerate(self.rgbaTop))


towerInfo = {
    'ptype': 'tower',
    'arcX': 300, 
    'arcY': 300, 
    'arcRad': 12, 
    'stBot': 12, 
    'stTop': 10, 
    'angleStart': 0, 
    'angleEnd': 2, 
    'rgbaBot': (1, 1, 1, 1), 
    'rgbaTop': (0, 0, 0, 1)
}
fortInfo = {
    'ptype': 'fort',
    'arcX': 300, 
    'arcY': 300, 
    'arcRad': 22, 
    'stBot': 10, 
    'stTop': 8, 
    'angleStart': 0, 
    'angleEnd': 2, 
    'rgbaBot': (1, 1, 1, 1), 
    'rgbaTop': (0, 0, 0, 1)
}
wallInfo = {
    'ptype': 'wall',
    'arcX': 300, 
    'arcY': 300, 
    'arcRad': 30, 
    'stBot': 8, 
    'stTop': 6, 
    'angleStart': 0, 
    'angleEnd': 2, 
    'rgbaBot': (1, 1, 1, 1), 
    'rgbaTop': (0, 0, 0, 1)
}
pWall = Piece(towerInfo)
pWall.draw()

pFort = Piece(fortInfo)
pFort.draw()

pWall = Piece(wallInfo)
pWall.draw()

# Get the image data from Cairo surface
buffer = cairo_surface.get_data()

# Create Pygame surface from the Cairo surface data
image = pygame.image.frombuffer(buffer, (WIDTH, HEIGHT), "ARGB")

# Game loop
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
    
    # Blit the image onto the screen
    screen.blit(image, (0, 0))
    pygame.display.flip()

    # Cap the frame rate to 30 frames per second
    pygame.time.Clock().tick(30)

# Quit Pygame
pygame.quit()
