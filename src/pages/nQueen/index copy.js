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
  const [boardSize, setBoardSize] = useState();
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

  const toggleBlock = (i, j) => {
    if (editable) {
      document.querySelector('#colR' + i + j).style.background = document.querySelector('#colR' + i + j).style.background === "black" ? ((i + j) % 2 === 0 ? "grey" : "white") : "black";
        maze[i][j] = maze[i][j] ? 0 : 1;
    }
  }

  function isSafeR(x, y) {
      return (x >= 0 && x < rowCnt && y >= 0
          && y < colCnt && maze[x][y] === 1);
  }

  async function sleep(timer) {
    const promise = new Promise((resolve, reject) => setTimeout(() => {
      resolve();
    }, timer))
    return promise;
  }

  async function solveMaze() {
      let sol = new Array(rowCnt);
      for (let i = 0; i < rowCnt; i++) {
          sol[i] = new Array(rowCnt);
          for (let j = 0; j < colCnt; j++) {
              sol[i][j] = 0;
          }
      }

      if (await solveMazeUtil(0, 0, sol) === false) {
          // document.write("Solution doesn't exist");
          return false;
      }

      return true;
  }
  async function solveMazeUtil(x, y, sol) {
      if (x === rowCnt - 1 && y === colCnt - 1 && maze[x][y] === 1) {
        await sleep(ratSpeed);
        document.querySelector('#colR' + x + y).style.background = "green";
        document.querySelector('#colR' + x + y).innerHTML = '';
        document.querySelector('#colR' + x + y).append(ratImage);
        sol[x][y] = 1;
        return true;
      }
      if (isSafeR(x, y) === true) {
          if (sol[x][y] === 1)
              return false;

          await sleep(ratSpeed);
              if(!(x === 0 && y === 0)) {
                document.querySelector('#colR' + x + y).style.background = "lightgreen";
              }
              document.querySelector('#colR' + x + y).append(ratImage);

          sol[x][y] = 1;

          if (await solveMazeUtil(x + 1, y, sol))
              return true;

          if (await solveMazeUtil(x, y + 1, sol))
              return true;

          if (await solveMazeUtil(x - 1, y, sol))
              return true;

          if (await solveMazeUtil(x, y - 1, sol))
              return true;

          await sleep(ratSpeed);
          document.querySelector('#colR' + x + y).style.background = 'red';
          await sleep(ratSpeed);
          document.querySelector('#colR' + x + y).style.background = ((x + y) % 2 === 0) ? "grey" : "white";
          sol[x][y] = 0;
          return false;
      }

      return false;
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

  const startAlgoHandler = () => {
    setStarted(true);
    solveMaze(maze);
  }

  const clearAll = () => {
    setMaze([]);
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



    {/* <Box
        display={smScreen ? "flex" : "block"}
        flexDirection={smScreen ? "row" : "column"}
        justifyContent={smScreen ? "space-between" : "start"}
        alignItems={smScreen ? "center" : "start"}
        m="10px 0"
      >
        <Header title="Rat in the Maze" subtitle="Welcome to backtracking algorithms" />

      </Box> */}





<Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>

        <Grid
          xs={12}
          sm={12}
          md={8}
          lg={8}
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
                {!showBoard ? <Card>
                  <CardMedia
                    sx={{ height: 400 }}
                    image={poster}
                    title="green iguana"
                  />
                </Card> : <Board toggleBlock={toggleBlock} showBoard={showBoard} rowCnt={rowCnt} colCnt={colCnt} />}
                {/* <LineChart isDashboard={true} /> */}
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
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
                <div className='code mt-2'>
                  <pre>
                    {selectedCode}
                  </pre>
              </div>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
        <Button variant="contained" style={{ width: '100%', backgroundColor: colors.primary[400] }} onClick={() => {setRatSpeed(prompt("Enter Speed( in ms )"))}}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={ratSpeed || 0}
              subtitle="Speed"
            />
          </Box>
          </Button>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} xl={6}>
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
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
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
          <Button variant="contained" style={{ width: '100%', height: 70, fontSize: '1.2rem', fontWeight: '800', backgroundColor: colors.primary[400] }} onClick={() => !showBoard ? showBoardHandler() : !started ? startAlgoHandler() : clearAll() }>
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