import React, { useEffect, useState } from "react";
import ratImageLogo from "../../assets/rat.png";

import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import "../UiPanel.css";
import { getCodes, getQuiz } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const Ritm = ({ name }) => {

  const { algoName } = useParams();
  const navigate = useNavigate();
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
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState();
  const [selectedQuiz, setSelectedQuiz] = useState();
  const repoName = process.env.REACT_APP_REPO_NAME;

  useEffect(() => {
    const getQuizFromBackend = async (algoName) => {
      const quizList = await getQuiz(algoName);
      setSelectedOptions(new Array(quizList.length));
      setSelectedQuiz(quizList);
    }
    getQuizFromBackend(algoName);
    console.log(algoName);
  }, [algoName]);

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

  const handleSubmit = () => {
    let score = 0;
    for(let i = 0; i<selectedOptions.length; i++) {
      if(selectedQuiz[i].correctAnsInd === selectedOptions[i]) {
        score += 10;
      }
    }
    console.log(score);
    alert(`Submitted Successfully. Score: ${score}` );
    navigate(`/${repoName}/`);
  }

  return (
    <Box m="20px">
      <Box>
        <Header title="Quizzes" />
        {(selectedQuiz && selectedQuiz.length) && <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={12} md={12} m="25px 0 0 0">
            {selectedQuestionIndex !== undefined && (
              <Card
                sx={{
                  backgroundColor: colors.primary[400],
                  padding: "10px 20px",
                }}
              >
                <CardContent>
                  <Typography gutterBottom variant="h2" component="div">
                    Question{" "}
                    {selectedQuiz[selectedQuestionIndex].questionNumber}
                  </Typography>
                  <Typography
                    variant="h4"
                    color="text.secondary"
                    sx={{ textAlign: "left" }}
                    pt={1}
                  >
                    {selectedQuiz[selectedQuestionIndex].question}
                  </Typography>
                </CardContent>
              </Card>
            )}

            <Grid xs={8} sx={{display: 'flex', flexWrap: 'wrap'}}>
              {selectedQuestionIndex !== undefined &&
                selectedQuiz[selectedQuestionIndex].options.map((option, index) => (
                  <Grid xs={12} sm={12} md={6} lg={6} xl={6} mt={2}>
                    <Button
                      variant="contained"
                      key={option}
                      style={{
                        width: "100%",
                        height: 70,
                        fontSize: "1.2rem",
                        fontWeight: "800",
                        backgroundColor: colors.primary[selectedOptions[selectedQuestionIndex] === index ? 300 : 400],
                      }}
                      onClick={() => {
                        const newSelectedOptions = [...selectedOptions];
                        newSelectedOptions[selectedQuestionIndex] = index
                        setSelectedOptions(newSelectedOptions);
                      }}
                    >
                      {option}
                    </Button>
                  </Grid>
                ))}
              </Grid>
          </Grid>
          <Grid xs={7} m="25px auto 0 auto" sx={{ display: "flex", position: 'absolute', bottom: '2%', right: '15%' }}>
            <Grid xs={2}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: colors.primary[400],
                }}
                onClick={() => setSelectedQuestionIndex((item) => item - 1)}
                disabled={selectedQuestionIndex === 0}
              >
                &#x3c;
              </Button>
            </Grid>
            <Grid xs={8}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: colors.primary[400],
                }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Grid>
            <Grid xs={2}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: 70,
                  fontSize: "1.2rem",
                  fontWeight: "800",
                  backgroundColor: colors.primary[400],
                }}
                onClick={() => setSelectedQuestionIndex((item) => item + 1)}
                disabled={selectedQuestionIndex === selectedQuiz.length - 1}
              >
                >
              </Button>
            </Grid>
          </Grid>
        </Grid>}
      </Box>
    </Box>
  );
};

export default Ritm;
