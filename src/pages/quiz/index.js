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
  CardActions,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import "../UiPanel.css";
import { getCodes } from "../../services/api";
import { MenuItem } from "react-pro-sidebar";

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
      <Box>
        <Header title="Quizzes" />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={12} m="25px 0 0 0">
            <Card
              sx={{
                backgroundColor: colors.primary[400],
                padding: "10px 20px",
              }}
            >
              <CardContent>
                <Typography gutterBottom variant="h2" component="div">
                  Question 1
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  SX={{ textAlign: "left" }}
                  pt={1}
                >
                  Lizards are a widespread group of squamate reptiles, with over
                  6,000 species, ranging across all continents except Antarctica
                  jidfovv erdsg fwt egdft y hrtd yfdt hgd f vrefds hy t ergfdfh
                  dg fr easdS D
                </Typography>
              </CardContent>
            </Card>

            <Grid xs={12} sm={12} md={4} lg={4} xl={4} mt={2}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: colors.primary[400],
                }}
              >
                Option 2
              </Button>
            </Grid>

            <Grid xs={12} sm={12} md={4} lg={4} xl={4} mt={2}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: 'royalblue',
                }}
              >
                Option 2
              </Button>
            </Grid>

            <Grid xs={12} sm={12} md={4} lg={4} xl={4} mt={2}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: colors.primary[400],
                }}
              >
                Option 2
              </Button>
            </Grid>

            <Grid xs={12} sm={12} md={4} lg={4} xl={4} mt={2}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: colors.primary[400],
                }}
              >
                Option 2
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Ritm;