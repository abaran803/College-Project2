import React, {useEffect, useState } from 'react'
import Board from '../Board'
import ratImageLogo from '../../assets/rat.png';
import poster from '../../assets/posters/sudoku.png';



import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";




import '../UiPanel.css';
import { getCodes } from '../../services/api';

const Ritm = ({name}) => {



  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);



  const [started, setStarted] = useState();
  const [rowCnt, setRowCnt] = useState();
  const [colCnt, setColCnt] = useState();
  const [showBoard, setShowBoard] = useState();
  const [editable, setEditable] = useState();
  const [ratSpeed, setRatSpeed] = useState(200);
  const [selectedCode, setSelectedCode] = useState();
  const [selectedLang, setSelectedLang] = useState();

  let ratImage = document.createElement('img');
  ratImage.src = ratImageLogo;
  ratImage.className = 'logo';

  const [maze, setMaze] = useState([]);

  

  

  async function sleep(timer) {
    const promise = new Promise((resolve, reject) => setTimeout(() => {
      resolve();
    }, timer))
    return promise;
  }















  let grid = [ 
    [ 3, 0, 6, 5, 0, 8, 4, 0, 0 ],
    [ 5, 2, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 8, 7, 0, 0, 0, 0, 3, 1 ],
    [ 0, 0, 3, 0, 1, 0, 0, 8, 0 ],
    [ 9, 0, 0, 8, 6, 3, 0, 0, 5 ],
    [ 0, 5, 0, 0, 9, 0, 6, 0, 0 ],
    [ 1, 3, 0, 0, 0, 0, 2, 5, 0 ],
    [ 0, 0, 0, 0, 0, 0, 0, 7, 4 ],
    [ 0, 0, 5, 2, 0, 6, 3, 0, 0 ] 
  ]

  const [board, setBoard] = useState([]);
  const [speed, setSpeed] = useState();

  async function sleep(timer) {
    const promise = new Promise((resolve, reject) => setTimeout(() => {
      resolve();
    }, timer))
    return promise;
  }

  // Javascript program for above approach
 
// N is the size of the 2D matrix   N*N
let N = 9;
 
/* Takes a partially filled-in grid and attempts
    to assign values to all unassigned locations in
    such a way to meet the requirements for
    Sudoku solution (non-duplication across rows,
    columns, and boxes) */
async function solveSudoku(row, col)
{
     
    /* If we have reached the 8th
       row and 9th column (0
       indexed matrix) ,
       we are returning true to avoid further
       backtracking       */
    if (row === N - 1 && col === N)
        return true;
 
    // Check if column value  becomes 9 ,
    // we move to next row
    // and column start from 0
    if (col === N)
    {
        row++;
        col = 0;
    }
 
    // Check if the current position
    // of the grid already
    // contains value >0, we iterate
    // for next column
    if (board[row][col] != 0)
        return await solveSudoku(row, col + 1);
 
    for(let num = 1; num < 10; num++)
    {
         
        // Check if it is safe to place
        // the num (1-9)  in the given
        // row ,col ->we move to next column
        const defaultColor = document.querySelector('#colR' + row + col).style.background;
        if (await isSafe(row, col, num))
        {
             
            /*  assigning the num in the current
            (row,col)  position of the grid and
            assuming our assigned num in the position
            is correct */
            board[row][col] = num;
            await sleep(speed);
            document.querySelector('#colR' + row + col).style.background = 'lightgreen';
            document.querySelector('#colR' + row + col).value = board[row][col];
 
            // Checking for next
            // possibility with next column
            if (await solveSudoku(row, col + 1)) {
                return true;
            }
        }
         
        /* removing the assigned num , since our
           assumption was wrong , and we go for next
           assumption with diff num value   */
        board[row][col] = 0;
        document.querySelector('#colR' + row + col).style.background = defaultColor;
        await sleep(speed);
        document.querySelector('#colR' + row + col).value = board[row][col];
    }
    return false;
}
 
// Check whether it will be legal
// to assign num to the
// given row, col
async function isSafe(row, col, num)
{
     
    // Check if we find the same num
    // in the similar row , we
    // return false
    for(let x = 0; x <= 8; x++)
        if (board[row][x] == num)
            return false;
 
    // Check if we find the same num
    // in the similar column ,
    // we return false
    for(let x = 0; x <= 8; x++)
        if (board[x][col] == num)
            return false;
 
    // Check if we find the same num
    // in the particular 3*3
    // matrix, we return false
    let startRow = row - row % 3,
        startCol = col - col % 3;
         
    for(let i = 0; i < 3; i++)
        for(let j = 0; j < 3; j++)
            if (board[i + startRow][j + startCol] == num)
                return false;
 
    return true;
}












  
  
  const showBoardHandler = () => {
    for(let i=0; i<rowCnt; i++) {
      const tmp = [];
      for(let j=0; j<colCnt; j++) {
        tmp.push(1);
      }
      maze.push(tmp);
    }
    setShowBoard(true);
    // document.querySelector('#colR' + 0 + 0).append(ratImage);
  }

  const fillBoardHandler = (board) => {
    setBoard(grid);
    setShowBoard(true);
    for(let x = 0; x <= 8; x++)
      for(let y = 0; y <= 8; y++)
        document.querySelector('#colR' + x + y).value = grid[x][y];
  }

  const startAlgoHandler = () => {
    for(let x = 0; x <= 8; x++)
      for(let y = 0; y <= 8; y++)
        board[x][y] = document.querySelector('#colR' + x + y).value;
    setStarted(true);
    if(!speed) setSpeed(10);
    solveSudoku(0, 0);
  }

  const clearAll = () => {
    setBoard([]);
    setStarted(false);
    setShowBoard(false);
  }

  const availableLanguage = ['Java', 'C++', 'Python'];

  useEffect(() => {
    setSelectedLang('C++');
  }, [name])

  useEffect(() => {
    const selectedCode = async () => {
      const code = await getCodes(selectedLang || 'C++', name);
      setSelectedCode(code);
    }
    selectedCode();
  }, [selectedLang, name])

  const setSelectedLangHandler = (e) => {
    setSelectedLang(e.target.value);
  }

  return (
    <Box m="20px">
    <div className='ui-panel'>



    <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Sudoku Solver" subtitle="Welcome to backtracking algorithms" />

      </Box>





<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid
          xs={12}
          sm={12}
          md={7}
          lg={7}
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid xs={12}>
            <Box backgroundColor={colors.primary[400]}>
              <Box
                mt="25px"
                p="0 30px"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
              </Box>
              <Box height='400px'>
                {!showBoard && <Card>
                  <CardMedia
                    sx={{ height: 400 }}
                    image={poster}
                    title="green iguana"
                    style={{backgroundColor: 'black', opacity: '0.1'}}
                  />
                </Card>}
                <Board showBoard={showBoard} rowCnt={9} colCnt={9} isSudoku={true} />
                {/* <LineChart isDashboard={true} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={5} lg={5} xl={5}>
          <Box
            backgroundColor={colors.primary[400]}
            maxHeight="100vh"
            overflow="auto"
            m="25px 0 0 0"
            style={{overflowX: 'hidden'}}
          >
            <Box backgroundColor={colors.primary[400]} height="400px">
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
              <select onChange={setSelectedLangHandler} >
                  {availableLanguage.map((language, ind) => <option selected={language === selectedLang} value={language} key={ind}>{language}</option>)}
              </select>
              </Typography>
              <Box height="250px" mt="-20px">
                {/* <BarChart isDashboard={true} /> */}
                <div className='code'>
                  <pre>
                    {selectedCode}
                  </pre>
              </div>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
        <Button variant="contained" style={{ width: '100%', backgroundColor: colors.primary[400] }} onClick={() => {setSpeed(prompt("Enter Speed"))}}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={speed || 0}
              subtitle="Speed"
            />
          </Box>
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
        <Button variant="contained" style={{ width: '100%', backgroundColor: colors.primary[400] }} onClick={() => {setRowCnt(prompt("Enter Row Count"))}}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={rowCnt || 0}
              subtitle="Row Count"
            />
          </Box>
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
        <Button variant="contained" style={{ width: '100%', backgroundColor: colors.primary[400] }} onClick={() => {setColCnt(prompt("Enter Column Count"))}}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={colCnt || 0}
              subtitle="Column Count"
            />
          </Box>
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
        <Button variant="contained" style={{ width: '100%', backgroundColor: colors.primary[400] }} onClick={() => {setRatSpeed(prompt("Enter Speed"))}}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="12,361"
              subtitle="Rat Speed"
            />
          </Box>
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
          <Button variant="contained" style={{ width: '100%', height: 70, fontSize: '1.2rem', fontWeight: '800', backgroundColor: colors.primary[400] }} onClick={() => !showBoard ? fillBoardHandler() : !started ? startAlgoHandler() : clearAll() } disabled={(!rowCnt || !colCnt || !speed) ? true : false}>
            {!showBoard ? 'Show Board' : !started ? 'Start' : 'Exit' }
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
          <Button variant="contained" style={{ width: '100%', height: 70, fontSize: '1.2rem', fontWeight: '800', backgroundColor: colors.primary[400]  }}>
            Success
          </Button>
        </Grid>
      </Grid>












        {/* <div className='ui-panel__header'>Header</div>
        <div className='ui-panel__board text-center'>
            { (showBoard && rowCnt && colCnt) ? <Board toggleBlock={toggleBlock} showBoard={showBoard} rowCnt={rowCnt} colCnt={colCnt} /> : <img className='img-fluid' src={'#'} alt="poster" />}
        </div>
        { !showBoard && (
          <div className='ui-panel__action'>
            <input type="number" onChange={(e) => setRatSpeed(e.target.value)} placeholder='Set Speed' />
            <input type="number" onChange={(e) => setRowCnt(e.target.value)} placeholder='Enter Row Count'/>
            <input type="number" onChange={(e) => setColCnt((e.target.value))} placeholder='Enter Col Count'/>
            <button onClick={showBoardHandler} className='bg bg-success px-2 py-1 rounded'>
              Create Board
            </button>
          </div>
        ) }
        {showBoard && 
          <div className='d-flex justify-content-center'>
            <button onClick={clearAll}>Back</button>
            {!started && <button className='mx-2' onClick={() => setEditable(item => !item)}>
              {editable ? 'Stop' : 'Start'} Editing
            </button>}
            {!started && <button onClick={startAlgoHandler}>start</button>}
          </div>
        } */}
    </div>
    </Box>
  )
}

export default Ritm