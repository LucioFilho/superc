from config import *

# Initialize Pygame
pygame.init()

SCREEN_WIDTH, SCREEN_HEIGHT = get_screen_settings()

def draw_chessboard(screen):
    # Starting position of the chessboard
    start_x, start_y = 0, 0  # Example starting coordinates

    for row in range(BOARD_SIZE):
        for col in range(BOARD_SIZE):
            # Determine the color of the square
            if (row + col) % 2 == 0:
                color = LIGHT_SQUARE_COLOR
            else:
                color = DARK_SQUARE_COLOR
            
            # Calculate the rectangle for the current square
            rect = pygame.Rect(start_x + col * SQUARE_SIZE, start_y + row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE)
            
            # Draw the square
            pygame.draw.rect(screen, color, rect)

def draw_piece(screen, piece_image, position):
    # position should be a tuple (row, col) indicating the chessboard square
    row, col = position
    start_x, start_y = 0, 0  # These should match the starting coordinates used in draw_chessboard()
    x = start_x + col * SQUARE_SIZE
    y = start_y + row * SQUARE_SIZE
    print(SQUARE_SIZE)

    # Resize the piece image using smoothscale for better quality
    resized_piece_image = pygame.transform.smoothscale(piece_image, (SQUARE_SIZE, SQUARE_SIZE))
    screen.blit(resized_piece_image, (x, y))

# Create a screen/window
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
 
# Load the chess piece image
piece_image = pygame.image.load("tests/chess_piece.png")

# Fill the background
screen.fill((0, 0, 0))

# Draw the chessboard
draw_chessboard(screen)

# Draw a chess piece on a specific square (e.g., on the second square of the first row)
draw_piece(screen, piece_image, (0, 0))

# Update the display
pygame.display.flip()

# Keep the window open until closed by the user
running = True
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

pygame.quit()
