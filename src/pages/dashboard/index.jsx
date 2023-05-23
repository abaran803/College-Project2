import React from 'react';
import {
  Box,
  Button,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
  Card,
  Backdrop,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import CardMedia from "@mui/material/CardMedia";
import { NavLink } from "react-router-dom";

const Dashboard = () => {

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.up("sm"));
  const colors = tokens(theme.palette.mode);
  const [open, setOpen] = React.useState(false);

  const repoName = process.env.REACT_APP_REPO_NAME;

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <Box m="20px">
      <Header title="Backtracking Visualizer" subtitle="Welcome to backtracking visualizer" />

      <Grid
        container
        rowSpacing={1}
        columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        mt={2}
      >
        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="User Count" subtitle={78} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="Algo Count" subtitle={3} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="High Score" subtitle={99} />
          </Box>
        </Grid>

        <Grid xs={12} sm={12} md={6} lg={3} xl={3}>
          <Box
            width="100%"
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox title="Value Here" subtitle={0} />
          </Box>
        </Grid>
      </Grid>

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid xs={12} sm={12} md={8} m="25px 0 0 0">
          <Card>
            <CardMedia
              sx={{ height: 400 }}
              image="https://www.simplilearn.com/ice9/free_resources_article_thumb/BackTracking%20Algorithm%20-%20Soni/state-space-tree-in-backtracking-algorithm.png"
              title="green iguana"
            />
          </Card>
        </Grid>

        <Grid xs={12} sm={12} md={4} lg={4} xl={4}>
          <Box maxHeight="100vh" overflow="auto" m="25px 0 0 0">
            <Grid xs={12}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  color: colors.grey[100],
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "20px 30px",
                  backgroundColor: colors.primary[400],
                }}
                onClick={handleOpen}
              >
                Algorithms
              </Button>
                <Backdrop
                  sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                  open={open}
                  onClick={handleClose}
                >
                  <Grid>
                    <TableContainer component={Paper}>
                      <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{backgroundColor: '#90caf9'}}>
                          <TableRow>
                            <TableCell sx={{fontSize: '0.9rem', color: 'black'}}>SR No.</TableCell>
                            <TableCell sx={{fontSize: '0.9rem', color: 'black'}} align="center">Name</TableCell>
                            <TableCell sx={{fontSize: '0.9rem', color: 'black'}} align="right">Go to Algo</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody sx={{backgroundColor: colors.primary[500]}}>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              1
                            </TableCell>
                            <TableCell align="center">N-Queen</TableCell>
                            <TableCell align="right">
                              <NavLink to={`/${repoName}/algo/nQueen`}>
                                <Button size="small" variant='contained' color="info">
                                  Click to Go
                                </Button>
                              </NavLink>
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              2
                            </TableCell>
                            <TableCell align="center">Sudoku Solver</TableCell>
                            <TableCell align="right">
                              <NavLink to={`/${repoName}/algo/sudoku`}>
                                <Button size="small" variant='contained' color="info">
                                  Click to Go
                                </Button>
                              </NavLink>
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="row">
                              3
                            </TableCell>
                            <TableCell align="center">Rat in the Maze</TableCell>
                            <TableCell align="right">
                              <NavLink to={`/${repoName}/algo/ritm`}>
                                <Button size="small" variant='contained' color="info">
                                  Click to Go
                                </Button>
                              </NavLink>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                </Backdrop>
            </Grid>

            <Grid xs={12}>
              <NavLink to={`/${repoName}/quizzes`}>
              <Button
                variant="contained"
                sx={{
                  width: "100%",
                  color: colors.grey[100],
                  fontSize: "20px",
                  fontWeight: "bold",
                  padding: "20px 30px",
                  backgroundColor: colors.primary[400],
                }}
              >
                Start Quiz
              </Button>
              </NavLink>
            </Grid>

            <Grid xs={12}>
              <NavLink to={`/${repoName}/leaderboard`}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: colors.grey[100],
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "20px 30px",
                    backgroundColor: colors.primary[400],
                  }}
                >
                  Show Toppers
                </Button>
              </NavLink>
            </Grid>

            <Grid xs={12}>
              <NavLink to={`/${repoName}/about`}>
                <Button
                  variant="contained"
                  sx={{
                    width: "100%",
                    color: colors.grey[100],
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "20px 30px",
                    backgroundColor: colors.primary[400],
                  }}
                >
                  About Us
                </Button>
              </NavLink>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
