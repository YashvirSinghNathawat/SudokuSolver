import { useEffect } from 'react';
import { useState } from 'react';
import './App.css'
import Board from './Board'


let sudokuPuzzle = [
  ["5", "3", "", "", "7", "", "", "", ""],
  ["6", "", "", "1", "9", "5", "", "", ""],
  ["", "9", "8", "", "", "", "", "6", ""],
  ["8", "", "", "", "6", "", "", "", "3"],
  ["4", "", "", "8", "", "3", "", "", "1"],
  ["7", "", "", "", "2", "", "", "", "6"],
  ["", "6", "", "", "", "", "2", "8", ""],
  ["", "", "", "4", "1", "9", "", "", "5"],
  ["", "", "", "", "8", "", "", "7", "9"]
];




function transformGrid(grid){
  let transformed_grid = [];
  for(let i=0;i<9;i++){
    let grid_row = [];
    for(let j=0;j<9;j++){
      if(grid[i][j]==0)   grid_row.push('');
      else  grid_row.push(grid[i][j].toString());
    }
    transformed_grid.push(grid_row);
  }
  return transformed_grid;
}


function App() {
  const [board,setBoard] = useState([]);
  function isValid(grid, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[i][col] === num) return false; // Check column
  
        if (grid[row][i] === num) return false; // Check row
  
        const boxRowStart = 3 * Math.floor(row / 3);
        const boxColStart = 3 * Math.floor(col / 3);
        if (grid[boxRowStart + Math.floor(i / 3)][boxColStart + (i % 3)] === num) return false; // Check box
    }
    return true;
  }
  function solve(grid) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j] === '') {
                for (let k = 1; k <= 9; k++) {
                    if (isValid(grid, i, j, k.toString())) {
                        grid[i][j] = k.toString();
                        if (solve(grid)) return true;
                        grid[i][j] = ''; // Backtrack
                    }
                }
                return false; // No valid number found for this cell
            }
        }
    }
    return true; // Puzzle solved
  }
  const solveSudoku = ()=>{
    const grid = [];
    for(let i=0;i<9;i++){
      grid.push(Array.from(board[i]));
    }
    console.log(grid);
    solve(grid);
    setBoard(grid);
  }
  // Fisher Yates Shuffle Algorithm
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  const generateSudoku = () => {
    const grid = Array.from({ length : 9}, ()=> Array(9).fill(''));
    let array = [1,2,3,4,5,6,7,8,9];
    
    shuffleArray(array);
    for(let i=0;i<9;i++)  grid[0][i] = array[i].toString();
    solve(grid);
    
    let emptyCells = Math.floor(Math.random()*14) + 51;
    let cellPositions = [];

    for(let i=0;i<9;i++){
      for(let j = 0;j<9;j++){
        cellPositions.push([i,j]);
      }
    }
    shuffleArray(cellPositions);
    for(let i = 0 ;i<emptyCells;i++){
      grid[cellPositions[i][0]][cellPositions[i][1]] = '';
    }
    setBoard(grid);
  }
  const reset = async () => {
    const data = await fetch('https://sudoku-api.vercel.app/api/dosuku');
    const data_json = await data.json();
    const grid = data_json.newboard.grids[0].value
    const transform_grid = transformGrid(grid);
    setBoard(transform_grid);
  }
  useEffect(()=>{
    setBoard(sudokuPuzzle);
  },[]);
  return (
    <>
      <div style={{
            width: "100%",
            marginLeft: "auto",
            textAlign: "center",
            fontFamily: '"Raleway", sans-serif',
            height: "20vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "24px",
            textDecoration: "underline"
          }}>Sudoku Solver</div>
        
          <div style={{
      height: "80vh",
      width: "100vw",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#fff5d7"
    }}>
      <div>

      <div style={{
    width: "50vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "30px"
}}>
    <div style={{
        padding: "20px",
        fontFamily: '"Raleway", sans-serif',
        textAlign: "justify",
        width: "30vw"
    }}>
        <h2>How Backtracking Algorithm Works for Solving Sudoku:</h2>
        <p>
            Here's how it works:
        </p>
        <ol>
            <li>Start with an empty cell in the Sudoku grid.</li>
            <li>Try filling the cell with a number from 1 to 9.</li>
            <li>If the number doesn't violate any Sudoku rules (no repetition in row, column, or subgrid), move to the next empty cell and repeat steps 2-3.</li>
            <li>If there are no numbers that can be placed in the current cell without violating Sudoku rules, backtrack to the previous cell and try a different number.</li>
            <li>Repeat this process until all cells are filled and Sudoku rules are satisfied, or until there are no more options left to try.</li>
        </ol>
        <p>
            By backtracking to previous cells and trying different numbers, the algorithm systematically explores all possible solutions until it finds one that satisfies all Sudoku constraints.
        </p>
    </div>
</div>


      </div>
      <div style={{
        marginRight: "10vw"
      }}>
          {board?<Board board={board}/>:<></>}
          <div style={{
            display: "flex",
            justifyContent: "space-between"
          }}>
          <button style={{
            marginTop: "10px"
          }} onClick={generateSudoku}>Reset Sudoku</button>
          <button style={{
            marginTop: "10px"
          }} onClick={solveSudoku}>Solve Sudoku</button>
          </div>
          
        </div>
          
      </div>
      
    </>
    
  )
}

export default App



