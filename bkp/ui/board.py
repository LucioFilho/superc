import cairo
import math

# Constants for window and board size
BOARD_SIZE = 600
SQUARE_SIZE = BOARD_SIZE // 8

# Define initial positions for castles
CASTLE_POSITIONS_WHITE = ['a1', 'c1', 'e1', 'g1', 'b2', 'd2', 'f2', 'h2']
CASTLE_POSITIONS_BLACK = ['a8', 'c8', 'e8', 'g8', 'b7', 'd7', 'f7', 'h7']

# Convert board positions to pixels
def pos_to_pixels(pos, left_margin, top_margin):
    col, row = ord(pos[0]) - ord('a'), int(pos[1]) - 1
    x = left_margin + col * SQUARE_SIZE + SQUARE_SIZE // 2
    y = top_margin + (7 - row) * SQUARE_SIZE + SQUARE_SIZE // 2
    return x, y

class Piece:
    def __init__(self, info):
        # Initialize piece attributes from the info dictionary
        for key, value in info.items():
            setattr(self, key, value)

    def draw(self, cairo_context):
        # Draw piece on the board
        for (line_width, color) in [(self.stBot, self.rgbaBot), (self.stTop, self.rgbaTop)]:
            cairo_context.set_line_width(line_width)
            cairo_context.set_source_rgba(*color)
            cairo_context.arc(self.arcX, self.arcY, self.arcRad, 0, 2 * math.pi)
            cairo_context.stroke()

class Board:
    def __init__(self, cairo_context, left_margin, top_margin):
        self.cairo_context = cairo_context
        self.pieces = []
        self.left_margin = left_margin
        self.top_margin = top_margin
        self.init_pieces()

    def init_pieces(self):
        # Initialize pieces on the board
        for pos in CASTLE_POSITIONS_WHITE + CASTLE_POSITIONS_BLACK:
            self.create_castle(pos, pos in CASTLE_POSITIONS_WHITE)

    def create_castle(self, pos, is_white):
        x, y = pos_to_pixels(pos, self.left_margin, self.top_margin)
        colors = [(1, 1, 1, 1), (0, 0, 0, 1)] if is_white else [(0, 0, 0, 1), (1, 1, 1, 1)]
        # Define and append pieces of the castle
        self.pieces += [
            Piece({'ptype': 'wall', 'arcX': x, 'arcY': y, 'arcRad': SQUARE_SIZE // 3, 'stBot': 12, 'stTop': 10, 'rgbaBot': colors[0], 'rgbaTop': colors[1]}),
            Piece({'ptype': 'fort', 'arcX': x, 'arcY': y, 'arcRad': SQUARE_SIZE // 4, 'stBot': 10, 'stTop': 8, 'rgbaBot': colors[0], 'rgbaTop': colors[1]}),
            Piece({'ptype': 'tower', 'arcX': x, 'arcY': y, 'arcRad': SQUARE_SIZE // 6, 'stBot': 8, 'stTop': 6, 'rgbaBot': colors[0], 'rgbaTop': colors[1]})
        ]

    def draw(self):
        # Draw all pieces on the board
        for piece in self.pieces:
            piece.draw(self.cairo_context)
