# Create a chess board using list comprehension
chess_board = [[f'{letter}{num}' for num in range(1, 9)] for letter in 'ABCDEFGH']

# Print each row of the chess board
for row in chess_board:
    print(row)
