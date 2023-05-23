import React, { useEffect, useState } from "react";
import Board from "../Board";
import ratImageLogo from "../../assets/rat.png";
import poster from "../../assets/posters/nQueen.png";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardMedia,
  FormControl,
  InputLabel,
  Select,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import "../UiPanel.css";
import { getCodes } from "../../services/api";
import { MenuItem } from "react-pro-sidebar";
import { NavLink } from "react-router-dom";

const Ritm = ({ name }) => {

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

  const repoName = process.env.REACT_APP_REPO_NAME;

  let queenImage = document.createElement("img");
  let queenWrapper = document.createElement("div");
  queenImage.src = ratImageLogo;
  queenImage.className = "logo";
  queenWrapper.innerHTML = queenImage;

  async function sleep(timer) {
    const promise = new Promise((resolve, reject) =>
      setTimeout(() => {
        resolve();
      }, timer)
    );
    return promise;
  }

  let notPossible = async (row, col) => {
    await sleep(speed || 100);
    // document.querySelector('.status').innerHTML = `Checking Row ${row} and Column ${col}`;
    document.getElementById(`colR${row}${col}`).appendChild(queenImage);
    // document.getElementById(`colR${row}${col}`).innerHTML = '1';
    await sleep(speed || 100);
    document.getElementById(`colR${row}${col}`).innerHTML = "";
  };

  async function isSafeQ(row, col) {
    await notPossible(row, col);
    for (let i = 0; i < col; i++) {
      if (queenBoard[row][i] === 1) {
        return false;
      }
    }
    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--)
      if (queenBoard[i][j]) {
        return false;
      }
    for (let i = row, j = col; j >= 0 && i < boardSize; i++, j--)
      if (queenBoard[i][j]) {
        return false;
      }

    return true;
  }

  async function solveNQUtil(col) {
    if (col >= boardSize) return true;
    for (let i = 0; i < boardSize; i++) {
      let safeStatus = await isSafeQ(i, col);
      if (safeStatus === true) {
        await sleep(speed || 100);
        document.getElementById(`colR${i}${col}`).innerHTML = "1";
        queenBoard[i][col] = 1;
        if ((await solveNQUtil(col + 1)) === true) {
          return true;
        }
        await sleep(speed || 100);
        document.getElementById(`colR${i}${col}`).innerHTML = "";
        queenBoard[i][col] = 0;
      } else {
        await sleep(speed || 100);
        // document.querySelector('.status').innerHTML = `Not valid for Row ${i} and Column ${col}`;
      }
    }
    return false;
  }
  async function solveNQ() {
    if ((await solveNQUtil(0)) === false) {
      alert("Solution does not exist");
      document.querySelector("table").innerHTML = "";
      return false;
    }
    return true;
  }

  const showBoardHandler = () => {
    for (let i = 0; i < boardSize; i++) {
      const tmp = [];
      for (let j = 0; j < boardSize; j++) {
        tmp.push(0);
      }
      queenBoard.push(tmp);
    }
    setShowBoard(true);
    // document.querySelector('#colR' + 0 + 0).append(ratImage);
  };

  const startAlgoHandler = () => {
    console.log(speed);
    setStarted(true);
    solveNQ();
  };

  const clearAll = () => {
    setStarted(false);
    setQueenBoard([]);
    setShowBoard(false);
  };
  const availableLanguage = ["Java", "C++", "Python"];

  useEffect(() => {
    setSelectedLang("C++");
  }, [name]);

  useEffect(() => {
    const selectedCode = async () => {
      const code = await getCodes(selectedLang || "C++", name);
      setSelectedCode(code);
    };
    selectedCode();
  }, [selectedLang, name]);

  const setSelectedLangHandler = (e) => {
    setSelectedLang(e.target.value);
  };

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
            title="N-Queen"
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
                  {!showBoard || !boardSize ? (
                    <Card sx={{ position: "relative" }}>
                      <CardMedia
                        sx={{ height: 400 }}
                        image={poster}
                        title="green iguana"
                        style={{ backgroundColor: "black", opacity: "0.1" }}
                      />
                      <CardContent
                        sx={{ position: "absolute", top: "40%", left: "40%" }}
                      >
                        <Typography variant="h1" sx={{ fontWeight: "800" }}>
                          N-Queen
                        </Typography>
                      </CardContent>
                    </Card>
                  ) : (
                    <Board
                      showBoard={showBoard}
                      rowCnt={boardSize}
                      colCnt={boardSize}
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
            >
              <Box backgroundColor={colors.primary[400]} height="400px">
                <Typography
                  variant="h5"
                  fontWeight="600"
                  sx={{ padding: "15px 30px 0 30px" }}
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
                setSpeed(prompt("Enter Speed ( in ms )"));
              }}
            >
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox title={speed || 0} subtitle="Speed" />
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
            <Button
              variant="contained"
              style={{ width: "100%", backgroundColor: colors.primary[400] }}
              onClick={() => {
                setBoardSize(prompt("Enter Board Size"));
              }}
            >
              <Box
                width="100%"
                backgroundColor={colors.primary[400]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <StatBox title={boardSize || 0} subtitle="Board Size" />
              </Box>
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={3} xl={3} mt={2}>
            <NavLink to={`/${repoName}/quiz/nQueen`}>
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
              disabled={!boardSize}
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
              onClick={clearAll}
              disabled={!started}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </Box>
  );
};

export default Ritm;
