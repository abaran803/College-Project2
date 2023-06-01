export const algo1 = () => {
    const txt = `
// C++ program to solve Rat in a Maze problem using
// backtracking
#include <bits/stdc++.h>
using namespace std;
// Maze size
#define N 4

bool solveMazeUtil(int maze[N][N], int x, int y,int sol[N][N]);

// A utility function to print solution matrix sol[N][N] 
void printSolution(int sol[N][N])
{
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            cout<<" "<<sol[i][j]<<" ";
        cout<<endl;
    }
}

// A utility function to check if x, y is valid index for
// N*N maze
bool isSafe(int maze[N][N], int x, int y)
{
    // if (x, y outside maze) return false
    if (x >= 0 && x < N && y >= 0 && y < N && maze[x][y] == 1)
        return true;
    return false;
}

bool solveMaze(int maze[N][N])
{
    int sol[N][N] = { { 0, 0, 0, 0 },
                    { 0, 0, 0, 0 },
                    { 0, 0, 0, 0 },
                    { 0, 0, 0, 0 } };
    if (solveMazeUtil(maze, 0, 0, sol) == false) {
        cout<<"Solution doesn't exist";
        return false;
    }
    printSolution(sol);
    return true;
}

// A recursive utility function to solve Maze problem
bool solveMazeUtil(int maze[N][N], int x, int y, int sol[N][N])
{
    // if (x, y is goal) return true
    if (x == N - 1 && y == N - 1 && maze[x][y] == 1) {
        sol[x][y] = 1;
        return true;
    }
    // Check if maze[x][y] is valid
    if (isSafe(maze, x, y) == true) {
        if (sol[x][y] == 1)
            return false;
        sol[x][y] = 1;
        if (solveMazeUtil(maze, x + 1, y, sol) == true)
            return true;
        // move left
        if (solveMazeUtil(maze, x - 1, y, sol) == true)
            return true;
        // then Move down in y direction
        if (solveMazeUtil(maze, x, y + 1, sol) == true)
            return true;
        // move up
        if (solveMazeUtil(maze, x, y - 1, sol) == true)
            return true;
        sol[x][y] = 0;
        return false;
    }
    return false;
}

// driver program to test above function
int main()
{
    int maze[N][N] = { { 1, 0, 0, 0 },
                    { 1, 1, 0, 1 },
                    { 0, 1, 0, 0 },
                    { 1, 1, 1, 1 } };
    solveMaze(maze);
    return 0;
}

    `
    return txt;
}

export const algo2 = () => {
  const txt = `
// C++ program to solve N Queen Problem using backtracking

#include <bits/stdc++.h>
#define N 4
using namespace std;

// A utility function to print solution
void printSolution(int board[N][N])
{
    for (int i = 0; i < N; i++) {
        for (int j = 0; j < N; j++)
            if(board[i][j])
            cout << "Q ";
            else cout<<". ";
        printf("\n");
    }
}

// attacking queens
bool isSafe(int board[N][N], int row, int col)
{
    int i, j;

    // Check this row on left side
    for (i = 0; i < col; i++)
        if (board[row][i])
            return false;

    // Check upper diagonal on left side
    for (i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (board[i][j])
            return false;

    // Check lower diagonal on left side
    for (i = row, j = col; j >= 0 && i < N; i++, j--)
        if (board[i][j])
            return false;

    return true;
}

// A recursive utility function to solve N
// Queen problem
bool solveNQUtil(int board[N][N], int col)
{
    // base case: If all queens are placed
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

            // recur to place rest of the queens
            if (solveNQUtil(board, col + 1))
                return true;

            board[i][col] = 0; // BACKTRACK
        }
    }

    // this column col  then return false
    return false;
}

bool solveNQ()
{
    int board[N][N] = { { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 },
                        { 0, 0, 0, 0 } };

    if (solveNQUtil(board, 0) == false) {
        cout << "Solution does not exist";
        return false;
    }

    printSolution(board);
    return true;
}

// Driver program to test above function
int main()
{
    solveNQ();
    return 0;
}

  `
  return txt;
}

export const algo3 = () => {
  const txt = `
#include <iostream>

using namespace std;

// N is the size of the 2D matrix N*N
#define N 9

/* A utility function to print grid */
void print(int arr[N][N])
{
    for (int i = 0; i < N; i++)
    {
        for (int j = 0; j < N; j++)
            cout << arr[i][j] << " ";
        cout << endl;
    }
}

bool isSafe(int grid[N][N], int row,
                    int col, int num)
{
    
    // return false
    for (int x = 0; x <= 8; x++)
        if (grid[row][x] == num)
            return false;

    // return false
    for (int x = 0; x <= 8; x++)
        if (grid[x][col] == num)
            return false;

    // Check if we find the same num in
    // the particular 3*3 matrix,
    // we return false
    int startRow = row - row % 3,
            startCol = col - col % 3;

    for (int i = 0; i < 3; i++)
        for (int j = 0; j < 3; j++)
            if (grid[i + startRow][j +
                            startCol] == num)
                return false;

    return true;
}

bool solveSudoku(int grid[N][N], int row, int col)
{
    if (row == N - 1 && col == N)
        return true;

    if (col == N) {
        row++;
        col = 0;
    }

    if (grid[row][col] > 0)
        return solveSudoku(grid, row, col + 1);

    for (int num = 1; num <= N; num++)
    {

        if (isSafe(grid, row, col, num))
        {
            
            grid[row][col] = num;
        
            // column
            if (solveSudoku(grid, row, col + 1))
                return true;
        }
    
        grid[row][col] = 0;
    }
    return false;
}

// Driver Code
int main()
{
    // 0 means unassigned cells
    int grid[N][N] = { { 3, 0, 6, 5, 0, 8, 4, 0, 0 },
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
        cout << "no solution exists " << endl;

    return 0;
}  
  `
  return txt;
}