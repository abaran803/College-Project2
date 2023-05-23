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
    <Box m="20px" sx={{textAlign: 'center'}}>
     
    <Header title="" />
        <h1 className="text text-center">About Us</h1>
        <p style={{textAlign: 'justify', padding: '5px 2.5rem', fontSize: '1rem'}}>
          <pre style={{whiteSpace: 'pre-wrap'}}>
          {`
Welcome to Backtracking Visualizer! At Backtracking Visualizer, we are passionate about promoting the understanding and application of backtracking algorithms. We believe that through interactive visualizations, students can grasp the concepts of backtracking more effectively and enhance their problem-solving skills.

Our team consists of dedicated individuals who are enthusiastic about computer science and algorithms. We have come together to develop this educational tool to aid students, researchers, and enthusiasts in exploring the power and intricacies of backtracking algorithms.

Our Mission:
Our mission is to simplify the learning process of backtracking algorithms by providing an intuitive and interactive visualizer. We aim to bridge the gap between theoretical knowledge and practical implementation, ensuring that users can witness the step-by-step execution of backtracking algorithms in real-time.

What We Offer:

Interactive Visualization: Our visualizer enables users to observe the backtracking process in real-time, allowing them to understand how decisions are made and paths are explored.
Multiple Algorithm Support: We offer support for various backtracking algorithms, including N-Queens, Sudoku Solver, and more. Users can select their desired algorithm and watch it in action.
Customizable Parameters: Users have the flexibility to customize parameters such as board size, input values, and constraints, enabling them to experiment with different scenarios and gain a deeper understanding of backtracking algorithms.
Step-by-Step Explanation: Alongside the visualization, we provide clear explanations of each step, helping users comprehend the algorithm's inner workings and key decision points.

Why Choose Backtracking Visualizer:

User-Friendly Interface: Our platform is designed with a user-friendly interface, making it accessible to users of all skill levels.
Practical Learning: By witnessing backtracking algorithms in action, users can acquire practical knowledge and develop problem-solving strategies that can be applied in real-world scenarios.
Hands-On Experience: Through interactive visualizations and customizable parameters, users can actively engage with the algorithms, gaining hands-on experience and reinforcing their understanding.
Community and Support: We foster a community of learners where users can connect, ask questions, and share insights. Our support team is also available to assist users and address any concerns.
Join us on this educational journey and unlock the power of backtracking algorithms. Whether you are a student, researcher, or algorithm enthusiast, Backtracking Visualizer is here to support your learning and help you master the art of backtracking.
          `}
          </pre>
        </p>
    </Box>
  );
};

export default Ritm;