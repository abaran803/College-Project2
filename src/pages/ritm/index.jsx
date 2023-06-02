import React, { useEffect, useState } from "react";
import Board from "../Board";
import ratImageLogo from "../../assets/rat.png";
import poster from "../../assets/posters/rithm.png";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import "../UiPanel.css";
import { getCodes } from "../../services/api";
import { NavLink } from "react-router-dom";
import Loading from '../../components/Loading';

const Ritm = ({ name }) => {
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const [started, setStarted] = useState();
  const [rowCnt, setRowCnt] = useState();
  const [colCnt, setColCnt] = useState();
  const [showBoard, setShowBoard] = useState();
  const [editable, setEditable] = useState();
  const [ratSpeed, setRatSpeed] = useState(0);
  const [selectedCode, setSelectedCode] = useState();
  const [selectedLang, setSelectedLang] = useState();
  const [loading, setLoading] = useState();

  const repoName = process.env.REACT_APP_REPO_NAME;

  let ratImage = document.createElement("img");
  ratImage.src = ratImageLogo;
  ratImage.className = "logo";

  const [maze, setMaze] = useState([]);

  const toggleBlock = (i, j) => {
    if (editable) {
      document.querySelector("#colR" + i + j).style.background =
        document.querySelector("#colR" + i + j).style.background === "black"
          ? (i + j) % 2 === 0
            ? "grey"
            : "white"
          : "black";
      maze[i][j] = maze[i][j] ? 0 : 1;
    }
  };

  function isSafeR(x, y) {
    return x >= 0 && x < rowCnt && y >= 0 && y < colCnt && maze[x][y] === 1;
  }

  async function sleep(timer) {
    const promise = new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve();
      }, timer)
    );
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

    if ((await solveMazeUtil(0, 0, sol)) === false) {
      // document.write("Solution doesn't exist");
      return false;
    }

    return true;
  }
  async function solveMazeUtil(x, y, sol) {
    if (x === rowCnt - 1 && y === colCnt - 1 && maze[x][y] === 1) {
      await sleep(ratSpeed);
      document.querySelector("#colR" + x + y).style.background = "green";
      document.querySelector("#colR" + x + y).innerHTML = "";
      document.querySelector("#colR" + x + y).append(ratImage);
      sol[x][y] = 1;
      return true;
    }
    if (isSafeR(x, y) === true) {
      if (sol[x][y] === 1) return false;

      await sleep(ratSpeed);
      if (!(x === 0 && y === 0)) {
        document.querySelector("#colR" + x + y).style.background = "lightgreen";
      }
      document.querySelector("#colR" + x + y).append(ratImage);

      sol[x][y] = 1;

      if (await solveMazeUtil(x + 1, y, sol)) return true;

      if (await solveMazeUtil(x, y + 1, sol)) return true;

      if (await solveMazeUtil(x - 1, y, sol)) return true;

      if (await solveMazeUtil(x, y - 1, sol)) return true;

      await sleep(ratSpeed);
      document.querySelector("#colR" + x + y).style.background = "red";
      await sleep(ratSpeed);
      document.querySelector("#colR" + x + y).style.background =
        (x + y) % 2 === 0 ? "grey" : "white";
      sol[x][y] = 0;
      return false;
    }

    return false;
  }

  const showBoardHandler = () => {
    for (let i = 0; i < rowCnt; i++) {
      const tmp = [];
      for (let j = 0; j < colCnt; j++) {
        tmp.push(1);
      }
      maze.push(tmp);
    }
    setShowBoard(true);
    // document.querySelector('#colR' + 0 + 0).append(ratImage);
  };

  const startAlgoHandler = () => {
    setStarted(true);
    solveMaze(maze);
  };

  const clearAll = () => {
    setMaze([]);
    setStarted(false);
    setShowBoard(false);
  };

  const availableLanguage = ["Java", "C++", "Python"];

  useEffect(() => {
    setSelectedLang("C++");
  }, [name]);

  useEffect(() => {
    const selectedCode = async () => {
      setLoading(true);
      const code = await getCodes(selectedLang || "C++", name);
      setSelectedCode(code);
      setLoading(false);
    };
    selectedCode();
  }, [selectedLang, name]);

  const setSelectedLangHandler = (e) => {
    setSelectedLang(e.target.value);
  };

  if(loading) {
    return <Loading />
  }

  return (
    <Box m="20px">
      <div className="ui-panel">
        <Box
          display={smScreen ? "flex" : "block"}
          flexDirection={smScreen ? "row" : "column"}
          justifyContent={smScreen ? "space-between" : "start"}
          alignItems={smScreen ? "center" : "start"}
          m="10px 0"
        >
          <Header
            title="Rat in the Maze"
            subtitle="Welcome to backtracking algorithms"
          />
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
                ></Box>
                <Box height="400px">
                  {!showBoard ? (
                    <Card>
                      <CardMedia
                        sx={{ height: 400 }}
                        image={poster}
                        title="green iguana"
                        style={{ backgroundColor: "black", opacity: "0.07" }}
                      />
                      <CardContent sx={{position: 'absolute', top: '40%', left: '32%'}}>
                        <Typography variant="h1" sx={{fontWeight: '800'}}>Rat in the Maze</Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    <Board
                      toggleBlock={toggleBlock}
                      showBoard={showBoard}
                      rowCnt={rowCnt}
                      colCnt={colCnt}
                    />
                  )}
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
              style={{ overflowX: "hidden" }}
            >
              <Box backgroundColor={colors.primary[400]} height="400px">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "10px 30px 0 30px" }}
                >
                  <select onChange={setSelectedLangHandler}>
                    {availableLanguage.map((language, ind) => (
                      <option
                        selected={language === selectedLang}
                        value={language}
                        key={ind}
                      >
                        {language}
                      </option>
                    ))}
                  </select>
                </Typography>
                <Box height="250px" mt="-20px">
                  {/* <BarChart isDashboard={true} /> */}
                  <div className="code mt-2">
                    <pre>{selectedCode}</pre>
                  </div>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: colors.primary[400] }}
              onClick={() => {
                setRatSpeed(prompt("Enter Speed ( in ms )"));
              }}
            >
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox title={ratSpeed || 0} subtitle="Speed" />
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: colors.primary[400] }}
              onClick={() => {
                setRowCnt(prompt("Enter Row Count"));
              }}
            >
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox title={rowCnt || 0} subtitle="Row Count" />
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: colors.primary[400] }}
              onClick={() => {
                setColCnt(prompt("Enter Column Count"));
              }}
            >
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox title={colCnt || 0} subtitle="Column Count" />
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
            <NavLink to={`/${repoName}/quiz/ritm`}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: colors.primary[400] }}
            >
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox title="Assessment" subtitle="Go to Quiz" />
              </Box>
            </Button>
            </NavLink>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: 70,
                fontSize: "1.2rem",
                fontWeight: "800",
                backgroundColor: colors.primary[400],
              }}
              onClick={() =>
                !showBoard
                  ? showBoardHandler()
                  : !started
                  ? startAlgoHandler()
                  : clearAll()
              }
              disabled={!(rowCnt && colCnt && ratSpeed) ? true : false}
            >
              {!showBoard ? "Show Board" : !started ? "Start" : "Exit"}
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
            <Button
              variant="contained"
              style={{
                width: "100%",
                height: 70,
                fontSize: "1.2rem",
                fontWeight: "800",
                backgroundColor: colors.primary[400],
              }}
              onClick={() => setEditable(item => !item)}
              disabled={!showBoard || started}
            >
              {!editable ? 'Block Cell' : 'Stop Blocking'}
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Ritm;
