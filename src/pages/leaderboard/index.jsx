import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Grid } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function createData(rank, name, quizCount, score) {
  return {rank, name, quizCount, score};
}

export default function BasicTable() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const defaultRow = [
    {rank: 1, name: 'person 1', quizCount: 7, score: 10},
    {rank: 1, name: 'person 1', quizCount: 7, score: 10},
    {rank: 1, name: 'person 1', quizCount: 7, score: 10},
    {rank: 1, name: 'person 1', quizCount: 7, score: 10},
    {rank: 1, name: 'person 1', quizCount: 7, score: 10},
    {rank: 1, name: 'person 1', quizCount: 7, score: 10}
  ]
  
  const rows = defaultRow.map(item => (
    createData(item.rank, item.name, item.quizCount, item.score)
  ))

  return (
    <Box m="20px" sx={{ textAlign: "center" }}>
      <Header title="Leaderboard" />

      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} p={4}>
        <Grid xs={12} sm={12} md={12}>
          <TableContainer
            sx={{ backgroundColor: colors.primary[400] }}
            component={Paper}
          >
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{backgroundColor: "#90caf9"}}>
                <TableRow>
                  <TableCell sx={{color: 'black', fontSize: '1rem'}}>Rank</TableCell>
                  <TableCell align="right" sx={{color: 'black', fontSize: '1rem'}}>Name</TableCell>
                  <TableCell align="right" sx={{color: 'black', fontSize: '1rem'}}>Quiz Count</TableCell>
                  <TableCell align="right" sx={{color: 'black', fontSize: '1rem'}}>Score</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{fontSize: '0.8rem'}}>
                      {row.rank}
                    </TableCell>
                    <TableCell align="right" sx={{fontSize: '0.8rem'}}>{row.name}</TableCell>
                    <TableCell align="right" sx={{fontSize: '0.8rem'}}>{row.quizCount}</TableCell>
                    <TableCell align="right" sx={{fontSize: '0.8rem'}}>{row.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
