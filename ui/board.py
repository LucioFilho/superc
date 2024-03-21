import pygame
import math
from settings.config import *

class ChessPiece:
    def __init__(self, piece_type, color, image_path):
        self.piece_type = piece_type
        self.color = color
        self.image = pygame.image.load(image_path)  # Load the piece image

    def draw(self, screen, x, y):
        screen.blit(self.image, (x, y))

def pos_to_coords(pos, square_size, board_start):
    col = ord(pos[0]) - ord('a')
    row = int(pos[1]) - 1
    x = board_start[0] + col * square_size
    y = board_start[1] + row * square_size
    return x, y

class ChessBoard:
    def __init__(self, initial_positions):
        self.pieces = []
        for pos, info in initial_positions.items():
            # Assuming you have a function to generate the image path based on type and color
            image_path = f"assets/board/{info['type']}_{info['color']}.png"
            x, y = pos_to_coords(pos, SQUARE_SIZE, (0, 0))  # Convert position to coordinates
            self.pieces.append(ChessPiece(info['type'], info['color'], image_path, (x, y)))

    def draw(self, screen, square_size, board_start):
        # Draw chessboard squares
        for row in range(BOARD_SIZE):
            for col in range(BOARD_SIZE):
                if (row + col) % 2 == 0:
                    color = LIGHT_SQUARE_COLOR
                else:
                    color = DARK_SQUARE_COLOR
                rect = pygame.Rect(board_start[0] + col * square_size, board_start[1] + row * square_size, square_size, square_size)
                pygame.draw.rect(screen, color, rect)

        # Draw pieces
        for piece in self.pieces:
            x, y = pos_to_coords(piece.position, square_size, board_start)  # Convert piece position to screen coordinates
            piece.draw(screen, x, y)