import React, {useEffect, useState } from 'react'
import Board from '../Board'
import ratImageLogo from '../../assets/rat.png';
import poster from '../../assets/posters/nQueen.png';



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
  Backdrop,
  CircularProgress,
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

  
  const [boardSize, setBoardSize] = useState();
  const [showBoard, setShowBoard] = useState();
  const [queenBoard, setQueenBoard] = useState([]);
  const [speed, setSpeed] = useState();
  const [started, setStarted] = useState();
  const [selectedCode, setSelectedCode] = useState();
  const [selectedLang, setSelectedLang] = useState();

    


let queenImage = document.createElement('img');
let queenWrapper = document.createElement('div');
queenImage.src = ratImageLogo;
queenImage.className = 'logo';
queenWrapper.innerHTML = queenImage;

async function sleep(timer) {
  const promise = new Promise((resolve, reject) => setTimeout(() => {
    resolve();
  }, timer))
  return promise;
}

let notPossible = async (row, col) => {
    await sleep(speed || 100);
        // document.querySelector('.status').innerHTML = `Checking Row ${row} and Column ${col}`;
        document.getElementById(`colR${row}${col}`).appendChild(queenImage);
        // document.getElementById(`colR${row}${col}`).innerHTML = '1';
    await sleep(speed || 100);
        document.getElementById(`colR${row}${col}`).innerHTML = '';
}

async function isSafeQ(row, col) {
    await notPossible(row, col);
    for (let i = 0; i < col; i++) {
        if (queenBoard[row][i] === 1) {
            return false
        }
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
        if (queenBoard[i][j]) {
            return false
        }
    for (let i = row, j = col; j >= 0 && i < boardSize; i++, j--)
        if (queenBoard[i][j]) {
            return false
        }

    return true
}

async function solveNQUtil(col) {
    if (col >= boardSize)
        return true
    for (let i = 0; i < boardSize; i++) {
        let safeStatus = await isSafeQ(i, col)
        if (safeStatus === true) {
          await sleep(speed || 100);
                document.getElementById(`colR${i}${col}`).innerHTML = '1';
            queenBoard[i][col] = 1
            if (await solveNQUtil(col + 1) === true) {
                return true
            }
            await sleep(speed || 100);
                document.getElementById(`colR${i}${col}`).innerHTML = '';
            queenBoard[i][col] = 0
        } else {
          await sleep(speed || 100);
                // document.querySelector('.status').innerHTML = `Not valid for Row ${i} and Column ${col}`;
        }
    }
    return false
}
async function solveNQ() {
    if (await solveNQUtil(0) === false) {
        alert("Solution does not exist")
        document.querySelector('table').innerHTML = "";
        return false
    }
    return true
}

  const showBoardHandler = () => {
    for(let i=0; i<boardSize; i++) {
      const tmp = [];
      for(let j=0; j<boardSize; j++) {
        tmp.push(0);
      }
      queenBoard.push(tmp);
    }
    setShowBoard(true);
    // document.querySelector('#colR' + 0 + 0).append(ratImage);
  }

  const startAlgoHandler = () => {
    console.log(speed);
    setStarted(true);
    solveNQ();
  }

  const clearAll = () => {
    setStarted(false);
    setQueenBoard([]);
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
        <Header title="N-Queen" subtitle="Welcome to backtracking algorithms" />

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
                {(!showBoard || !boardSize) ? <Card>
                  <CardMedia
                    sx={{ height: 400 }}
                    image={poster}
                    title="green iguana"
                    style={{backgroundColor: 'black', opacity: '0.1'}}
                  />
                </Card> : <Board showBoard={showBoard} rowCnt={boardSize} colCnt={boardSize} />}
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
          >
            <Box backgroundColor={colors.primary[400]} height="400px">
              <Typography
                variant="h5"
                fontWeight="600"
                sx={{ padding: "30px 30px 0 30px" }}
              >
              <select onChange={setSelectedLangHandler}>
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
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
        <Button variant="contained" style={{ width: '100%', backgroundColor: colors.primary[400] }} onClick={() => {setBoardSize(prompt("Enter Row Count"))}}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={boardSize || 0}
              subtitle="Row Count"
            />
          </Box>
          </Button>
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
              title="12,361"
              subtitle="Speed"
            />
          </Box>
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
          <Button variant="contained" style={{ width: '100%', height: 70, fontSize: '1.2rem', fontWeight: '800', backgroundColor: colors.primary[400] }} onClick={() => !showBoard ? showBoardHandler() : !started ? startAlgoHandler() : clearAll() } disabled={!boardSize}>
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