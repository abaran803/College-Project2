export const algo1 = () => {
    const txt = `
/* Java program to solve Rat in
a Maze problem using backtracking */

public class RatMaze {

    // Size of the maze
    static int N;

    /* A utility function to print 
    solution matrix sol[N][N] */
    void printSolution(int sol[][])
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(
                    " " + sol[i][j] + " ");
            System.out.println();
        }
    }

    /* A utility function to check 
        if x, y is valid index for N*N maze */
    boolean isSafe(
        int maze[][], int x, int y)
    {
        // if (x, y outside maze) return false
        return (x >= 0 && x < N && y >= 0
                && y < N && maze[x][y] == 1);
    }

    /* This function solves the Maze problem using 
    Backtracking. It mainly uses solveMazeUtil() 
    to solve the problem. It returns false if no 
    path is possible, otherwise return true and 
    prints the path in the form of 1s. Please note 
    that there may be more than one solutions, this 
    function prints one of the feasible solutions.*/
    boolean solveMaze(int maze[][])
    {
        int sol[][] = new int[N][N];

        if (solveMazeUtil(maze, 0, 0, sol) == false) {
            System.out.print("Solution doesn't exist");
            return false;
        }

        printSolution(sol);
        return true;
    }

    /* A recursive utility function to solve Maze 
    problem */
    boolean solveMazeUtil(int maze[][], int x, int y,
                        int sol[][])
    {
        // if (x, y is goal) return true
        if (x == N - 1 && y == N - 1
            && maze[x][y] == 1) {
            sol[x][y] = 1;
            return true;
        }

        // Check if maze[x][y] is valid
        if (isSafe(maze, x, y) == true) {
            // Check if the current block is already part of solution path.    
            if (sol[x][y] == 1)
                return false;
            
            // mark x, y as part of solution path
            sol[x][y] = 1;

            /* Move forward in x direction */
            if (solveMazeUtil(maze, x + 1, y, sol))
                return true;

            /* If moving in x direction doesn't give 
            solution then Move down in y direction */
            if (solveMazeUtil(maze, x, y + 1, sol))
                return true;

            /* If none of the above movements works then 
            BACKTRACK: unmark x, y as part of solution 
            path */
            sol[x][y] = 0;
            return false;
        }

        return false;
    }

    public static void main(String args[])
    {
        RatMaze rat = new RatMaze();
        int maze[][] = { { 1, 0, 0, 0 },
                        { 1, 1, 0, 1 },
                        { 0, 1, 0, 0 },
                        { 1, 1, 1, 1 } };

        N = maze.length;
        rat.solveMaze(maze);
    }
}
// This code is contributed by Abhishek Shankhadhar
    `
    return txt;
}

export const algo2 = () => {
  const txt = `
// Java program to solve N Queen Problem using backtracking

public class NQueenProblem {
    final int N = 4;

    // A utility function to print solution
    void printSolution(int board[][])
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (board[i][j] == 1)
                    System.out.print("Q ");
                else
                    System.out.print(". ");
            }
            System.out.println();
        }
    }

    // A utility function to check if a queen can
    // be placed on board[row][col]. Note that this
    // function is called when "col" queens are already
    // placeed in columns from 0 to col -1. So we need
    // to check only left side for attacking queens
    boolean isSafe(int board[][], int row, int col)
    {
        int i, j;

        // Check this row on left side
        for (i = 0; i < col; i++)
            if (board[row][i] == 1)
                return false;

        // Check upper diagonal on left side
        for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
            if (board[i][j] == 1)
                return false;

        // Check lower diagonal on left side
        for (i = row, j = col; j >= 0 && i < N; i++, j--)
            if (board[i][j] == 1)
                return false;

        return true;
    }

    // A recursive utility function to solve N
    // Queen problem
    boolean solveNQUtil(int board[][], int col)
    {
        // Base case: If all queens are placed
        // then return true
        if (col >= N)
            return true;

        // Consider this column and try placing
        // this queen in all rows one by one
        for (int i = 0; i < N; i++) {
            
            // Check if the queen can be placed on
            // board[i][col]
            if (isSafe(board, i, col)) {
                
                // Place this queen in board[i][col]
                board[i][col] = 1;

                // Recur to place rest of the queens
                if (solveNQUtil(board, col + 1) == true)
                    return true;

                // If placing queen in board[i][col]
                // doesn't lead to a solution then
                // remove queen from board[i][col]
                board[i][col] = 0; // BACKTRACK
            }
        }

        // If the queen can not be placed in any row in
        // this column col, then return false
        return false;
    }

    // This function solves the N Queen problem using
    // Backtracking. It mainly uses solveNQUtil () to
    // solve the problem. It returns false if queens
    // cannot be placed, otherwise, return true and
    // prints placement of queens in the form of 1s.
    // Please note that there may be more than one
    // solutions, this function prints one of the
    // feasible solutions.
    boolean solveNQ()
    {
        int board[][] = { { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 } };

        if (solveNQUtil(board, 0) == false) {
            System.out.print("Solution does not exist");
            return false;
        }

        printSolution(board);
        return true;
    }

    // Driver program to test above function
    public static void main(String args[])
    {
        NQueenProblem Queen = new NQueenProblem();
        Queen.solveNQ();
    }
}
// This code is contributed by Abhishek Shankhadhar  
  `
  return txt;
}

export const algo3 = () => {
  const txt = `
// Java program for above approach
public class Sudoku {

    // N is the size of the 2D matrix N*N
    static int N = 9;

    /* Takes a partially filled-in grid and attempts
    to assign values to all unassigned locations in
    such a way to meet the requirements for
    Sudoku solution (non-duplication across rows,
    columns, and boxes) */
    static boolean solveSudoku(int grid[][], int row,
                            int col)
    {

        /*if we have reached the 8th
        row and 9th column (0
        indexed matrix) ,
        we are returning true to avoid further
        backtracking	 */
        if (row == N - 1 && col == N)
            return true;

        // Check if column value becomes 9 ,
        // we move to next row
        // and column start from 0
        if (col == N) {
            row++;
            col = 0;
        }

        // Check if the current position
        // of the grid already
        // contains value >0, we iterate
        // for next column
        if (grid[row][col] != 0)
            return solveSudoku(grid, row, col + 1);

        for (int num = 1; num < 10; num++) {

            // Check if it is safe to place
            // the num (1-9) in the
            // given row ,col ->we move to next column
            if (isSafe(grid, row, col, num)) {

                /* assigning the num in the current
                (row,col) position of the grid and
                assuming our assigned num in the position
                is correct */
                grid[row][col] = num;

                // Checking for next
                // possibility with next column
                if (solveSudoku(grid, row, col + 1))
                    return true;
            }
            /* removing the assigned num , since our
            assumption was wrong , and we go for next
            assumption with diff num value */
            grid[row][col] = 0;
        }
        return false;
    }

    /* A utility function to print grid */
    static void print(int[][] grid)
    {
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++)
                System.out.print(grid[i][j] + " ");
            System.out.println();
        }
    }

    // Check whether it will be legal
    // to assign num to the
    // given row, col
    static boolean isSafe(int[][] grid, int row, int col,
                        int num)
    {

        // Check if we find the same num
        // in the similar row , we
        // return false
        for (int x = 0; x <= 8; x++)
            if (grid[row][x] == num)
                return false;

        // Check if we find the same num
        // in the similar column ,
        // we return false
        for (int x = 0; x <= 8; x++)
            if (grid[x][col] == num)
                return false;

        // Check if we find the same num
        // in the particular 3*3
        // matrix, we return false
        int startRow = row - row % 3, startCol
                                    = col - col % 3;
        for (int i = 0; i < 3; i++)
            for (int j = 0; j < 3; j++)
                if (grid[i + startRow][j + startCol] == num)
                    return false;

        return true;
    }

    // Driver Code
    public static void main(String[] args)
    {
        int grid[][] = { { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
                        { 5, 2, 0, 0, 0, 0, 0, 0, 0 },
                        { 0, 8, 7, 0, 0, 0, 0, 3, 1 },
                        { 0, 0, 3, 0, 1, 0, 0, 8, 0 },
                        { 9, 0, 0, 8, 6, 3, 0, 0, 5 },
                        { 0, 5, 0, 0, 9, 0, 6, 0, 0 },
                        { 1, 3, 0, 0, 0, 0, 2, 5, 0 },
                        { 0, 0, 0, 0, 0, 0, 0, 7, 4 },
                        { 0, 0, 5, 2, 0, 6, 3, 0, 0 } };

        if (solveSudoku(grid, 0, 0))
            print(grid);
        else
            System.out.println("No Solution exists");
    }
    // This is code is contributed by Pradeep Mondal P
}
  `
  return txt;
}