import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, Navigate } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";

import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard";
import Team from "./pages/team";
import Invoices from "./pages/invoices";
import Leaderboard from "./pages/leaderboard";
import Form from "./pages/form";
import Calendar from "./pages/calendar";
import Bar from "./pages/bar";
import Line from "./pages/line";
import Pie from "./pages/pie";
import FAQ from "./pages/faq";
import Geography from "./pages/geography";
import SudokuSolver from "./pages/sudoku";
import NQueen from "./pages/nQueen";
import RatInTheMaze from "./pages/ritm";
import Login from './pages/login';
import SignUp from "./pages/signup";
import About from "./pages/about";
import Quizzes from "./pages/quizzes";
import Quiz from "./pages/quiz";

const App = () => {
  const [theme, colorMode] = useMode();
  const repoName = process.env.REACT_APP_REPO_NAME;
  const isLoggedIn = JSON.parse(localStorage.getItem('auth'));
  return (
    <ColorModeContext.Provider value={colorMode}>
      {!isLoggedIn ? <Routes>
        <Route path={`/${repoName}/login`} element={<Login />} />
        <Route path={`/${repoName}/signup`} element={<SignUp />} />
        <Route path='*' element={<Navigate replace to={`/${repoName}/login`} />} />
      </Routes> : <ThemeProvider theme={theme}>
        <CssBaseline />
        <MyProSidebarProvider>
          <div style={{ height: "100%", width: "100%" }}>
            <main>
              {/* <Topbar /> */}
              <Routes>
                <Route path={`/${repoName}/`} element={<Dashboard />} />
                <Route path="/team" element={<Team />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/form" element={<Form />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/line" element={<Line />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path={`/${repoName}/algo/nQueen`} element={<NQueen name='nQueen' />} />
                <Route path={`/${repoName}/algo/ritm`} element={<RatInTheMaze name='ritm' />} />
                <Route path={`/${repoName}/algo/sudoku`} element={<SudokuSolver name='sudoku' />} />
                <Route path={`/${repoName}/leaderboard`} element={<Leaderboard />} />
                <Route path={`/${repoName}/about`} element={<About />} />
                <Route path={`/${repoName}/quiz/:algoName`} element={<Quiz />} />
                <Route path={`/${repoName}/quizzes`} element={<Quizzes />} />
                <Route path='*' element={<Navigate replace to={`/${repoName}/`} />} />
              </Routes>
            </main>
          </div>
        </MyProSidebarProvider>
      </ThemeProvider>}
    </ColorModeContext.Provider>
  );
};

export default App;
