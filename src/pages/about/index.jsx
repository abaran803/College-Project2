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
        <p style={{textAlign: 'justify', padding: '15px 2.5rem', fontSize: '1rem'}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero distinctio corrupti cupiditate, impedit perspiciatis cumque voluptatum. Incidunt vel fugiat perferendis! Quae excepturi at optio dignissimos enim aliquam asperiores corporis ipsa corrupti alias assumenda provident sit velit temporibus cumque blanditiis rem itaque, accusantium tempora consequatur quos amet consectetur iusto. Praesentium ab temporibus dicta voluptatem corrupti molestias neque id debitis aliquam. Nesciunt ratione modi, atque et inventore dolor ducimus unde culpa, corporis possimus dolorum eos, recusandae consequatur perspiciatis cum exercitationem quis temporibus distinctio totam? Vel voluptas consequatur deserunt suscipit eos expedita illum earum corrupti facere eligendi, esse nemo aut quam similique eius, beatae nam reprehenderit ullam ab perspiciatis voluptates. Officiis molestias quae amet omnis magni minus placeat blanditiis obcaecati dolorum modi. Nobis magni aliquid doloribus nostrum autem perferendis suscipit, hic, cumque error culpa repellat quidem veniam. Eveniet adipisci repudiandae, unde exercitationem sint dicta accusantium. Voluptas, delectus. Perspiciatis ea et similique culpa ipsum! Saepe doloribus, commodi, inventore magni temporibus eos ad quod perferendis omnis excepturi beatae repellat dolorum? Tempora debitis quisquam fugiat ab atque quia quas iusto illo eum nostrum modi numquam repellendus, unde, rem, ex pariatur. Laudantium voluptas nulla quia recusandae sed corrupti, incidunt labore cupiditate quos facilis. Laboriosam temporibus nemo natus a maiores vel? Excepturi corrupti repudiandae debitis magnam quibusdam earum illo voluptatum a asperiores quae ipsam architecto hic, non nihil quos laboriosam libero! Est, nobis? Laborum nihil et animi modi veniam dolores perferendis dolorum debitis, dolore asperiores, esse beatae impedit quibusdam, quo ut totam. Asperiores, perferendis, unde accusamus cumque libero itaque qui quo dicta assumenda, velit quidem eum ullam. Facere ipsum eius, aliquid, beatae dolor exercitationem eaque vero cupiditate praesentium soluta, dolorum optio culpa similique cumque accusantium provident. Soluta rem autem accusantium sequi laborum reprehenderit officiis quasi suscipit deserunt delectus, maxime fugiat esse consectetur omnis velit modi architecto ut repellat ducimus recusandae nobis odio at? Eligendi necessitatibus sint sunt unde exercitationem autem saepe deserunt accusantium atque nulla accusamus, aspernatur ratione enim, modi quod nesciunt officia possimus dignissimos distinctio optio laborum sequi. Cumque sed dolore totam impedit ducimus consequuntur repudiandae inventore praesentium recusandae neque! Repellendus nisi nostrum similique obcaecati porro ex dolorem voluptatum voluptatibus omnis optio quos iure, minus alias eius nesciunt doloribus nam veritatis harum at reprehenderit atque deserunt repudiandae quo necessitatibus? Consectetur dolor incidunt soluta corporis obcaecati id ea! Voluptate, sapiente earum quo laborum voluptatem cumque rem veritatis iste fugiat labore nihil quam fuga esse laudantium amet voluptates atque illo eligendi odit iusto dolorem dolorum quod eveniet veniam. Laboriosam quaerat, aliquam voluptates animi non laborum nihil tenetur corrupti ipsam odit rerum voluptas facilis quod veritatis blanditiis mollitia? Illum ipsum quidem incidunt minus, modi quod explicabo! Dolorem similique qui labore officiis officia sunt atque molestias, impedit laudantium nam dolores, itaque, ut saepe neque facilis quos ipsum ipsam distinctio debitis. Aut, ad inventore repudiandae facere sint laborum impedit. Corporis consectetur laudantium optio sunt vel blanditiis corrupti nam, et odit quo quod. Quo, laudantium vel facilis voluptatibus itaque officia eligendi esse. Magnam incidunt molestias nemo iste omnis nesciunt soluta accusantium odit dolorum!</p>
    </Box>
  );
};

export default Ritm;