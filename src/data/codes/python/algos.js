export const algo1 = () => {
    const txt = `
      # Python3 program to solve Rat in a Maze
      # problem using backtracking
        
      # Maze size
      n = 4
        
      # A utility function to check if x, y is valid
      # index for N * N Maze
        
        
      def isValid(n, maze, x, y, res):
          if x >= 0 and y >= 0 and x < n and y < n and maze[x][y] == 1 and res[x][y] == 0:
              return True
          return False
        
      # A recursive utility function to solve Maze problem
        
        
      def RatMaze(n, maze, move_x, move_y, x, y, res):
          # if (x, y is goal) return True
          if x == n-1 and y == n-1:
              return True
          for i in range(4):
              # Generate new value of x
              x_new = x + move_x[i]
        
              # Generate new value of y
              y_new = y + move_y[i]
        
              # Check if maze[x][y] is valid
              if isValid(n, maze, x_new, y_new, res):
        
                  # mark x, y as part of solution path
                  res[x_new][y_new] = 1
                  if RatMaze(n, maze, move_x, move_y, x_new, y_new, res):
                      return True
                  res[x_new][y_new] = 0
          return False
        
        
      def solveMaze(maze):
          # Creating a 4 * 4 2-D list
          res = [[0 for i in range(n)] for i in range(n)]
          res[0][0] = 1
        
          # x matrix for each direction
          move_x = [-1, 1, 0, 0]
        
          # y matrix for each direction
          move_y = [0, 0, -1, 1]
        
          if RatMaze(n, maze, move_x, move_y, 0, 0, res):
              for i in range(n):
                  for j in range(n):
                      print(res[i][j], end=' ')
                  print()
          else:
              print('Solution does  not exist')
        
        
      # Driver program to test above function
      if __name__ == "__main__":
          # Initialising the maze
          maze = [[1, 0, 0, 0],
                  [1, 1, 0, 1],
                  [0, 1, 0, 0],
                  [1, 1, 1, 1]]
        
          solveMaze(maze)
        
      # This code is contributed by Anvesh Govind Saxena
    `
    return txt;
}

export const algo2 = () => {
  const txt = `
    # Python3 program to solve N Queen
    # Problem using backtracking
    
    global N
    N = 4
    
    
    def printSolution(board):
        for i in range(N):
            for j in range(N):
                if board[i][j] == 1:
                    print("Q",end=" ")
                else:
                    print(".",end=" ")
            print()
    
    
    # A utility function to check if a queen can
    # be placed on board[row][col]. Note that this
    # function is called when "col" queens are
    # already placed in columns from 0 to col -1.
    # So we need to check only left side for
    # attacking queens
    def isSafe(board, row, col):
    
        # Check this row on left side
        for i in range(col):
            if board[row][i] == 1:
                return False
    
        # Check upper diagonal on left side
        for i, j in zip(range(row, -1, -1),
                        range(col, -1, -1)):
            if board[i][j] == 1:
                return False
    
        # Check lower diagonal on left side
        for i, j in zip(range(row, N, 1),
                        range(col, -1, -1)):
            if board[i][j] == 1:
                return False
    
        return True
    
    
    def solveNQUtil(board, col):
    
        # Base case: If all queens are placed
        # then return true
        if col >= N:
            return True
    
        # Consider this column and try placing
        # this queen in all rows one by one
        for i in range(N):
    
            if isSafe(board, i, col):
    
                # Place this queen in board[i][col]
                board[i][col] = 1
    
                # Recur to place rest of the queens
                if solveNQUtil(board, col + 1) == True:
                    return True
    
                # If placing queen in board[i][col
                # doesn't lead to a solution, then
                # queen from board[i][col]
                board[i][col] = 0
    
        # If the queen can not be placed in any row in
        # this column col then return false
        return False
    
    
    # This function solves the N Queen problem using
    # Backtracking. It mainly uses solveNQUtil() to
    # solve the problem. It returns false if queens
    # cannot be placed, otherwise return true and
    # placement of queens in the form of 1s.
    # note that there may be more than one
    # solutions, this function prints one of the
    # feasible solutions.
    def solveNQ():
        board = [[0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0],
                [0, 0, 0, 0]]
    
        if solveNQUtil(board, 0) == False:
            print("Solution does not exist")
            return False
    
        printSolution(board)
        return True
    
    
    # Driver Code
    if __name__ == '__main__':
        solveNQ()
    
    # This code is contributed by Divyanshu Mehta  
  `
  return txt;
}

export const algo3 = () => {
  const txt = `
    # N is the size of the 2D matrix N*N
    N = 9
    
    # A utility function to print grid
    def printing(arr):
        for i in range(N):
            for j in range(N):
                print(arr[i][j], end = " ")
            print()
    
    # Checks whether it will be
    # legal to assign num to the
    # given row, col
    def isSafe(grid, row, col, num):
    
        # Check if we find the same num
        # in the similar row , we
        # return false
        for x in range(9):
            if grid[row][x] == num:
                return False
    
        # Check if we find the same num in
        # the similar column , we
        # return false
        for x in range(9):
            if grid[x][col] == num:
                return False
    
        # Check if we find the same num in
        # the particular 3*3 matrix,
        # we return false
        startRow = row - row % 3
        startCol = col - col % 3
        for i in range(3):
            for j in range(3):
                if grid[i + startRow][j + startCol] == num:
                    return False
        return True
    
    # Takes a partially filled-in grid and attempts
    # to assign values to all unassigned locations in
    # such a way to meet the requirements for
    # Sudoku solution (non-duplication across rows,
    # columns, and boxes) */
    def solveSudoku(grid, row, col):
    
        # Check if we have reached the 8th
        # row and 9th column (0
        # indexed matrix) , we are
        # returning true to avoid
        # further backtracking
        if (row == N - 1 and col == N):
            return True
        
        # Check if column value becomes 9 ,
        # we move to next row and
        # column start from 0
        if col == N:
            row += 1
            col = 0
    
        # Check if the current position of
        # the grid already contains
        # value >0, we iterate for next column
        if grid[row][col] > 0:
            return solveSudoku(grid, row, col + 1)
        for num in range(1, N + 1, 1):
        
            # Check if it is safe to place
            # the num (1-9) in the
            # given row ,col ->we
            # move to next column
            if isSafe(grid, row, col, num):
            
                # Assigning the num in
                # the current (row,col)
                # position of the grid
                # and assuming our assigned
                # num in the position
                # is correct
                grid[row][col] = num
    
                # Checking for next possibility with next
                # column
                if solveSudoku(grid, row, col + 1):
                    return True
    
            # Removing the assigned num ,
            # since our assumption
            # was wrong , and we go for
            # next assumption with
            # diff num value
            grid[row][col] = 0
        return False
    
    # Driver Code
    
    # 0 means unassigned cells
    grid = [[3, 0, 6, 5, 0, 8, 4, 0, 0],
            [5, 2, 0, 0, 0, 0, 0, 0, 0],
            [0, 8, 7, 0, 0, 0, 0, 3, 1],
            [0, 0, 3, 0, 1, 0, 0, 8, 0],
            [9, 0, 0, 8, 6, 3, 0, 0, 5],
            [0, 5, 0, 0, 9, 0, 6, 0, 0],
            [1, 3, 0, 0, 0, 0, 2, 5, 0],
            [0, 0, 0, 0, 0, 0, 0, 7, 4],
            [0, 0, 5, 2, 0, 6, 3, 0, 0]]
    
    if (solveSudoku(grid, 0, 0)):
        printing(grid)
    else:
        print("no solution exists ")
    
        # This code is contributed by sudhanshgupta2019a  
  `
  return txt;
}