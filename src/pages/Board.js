// A placeholder to show poster of Algo before start
// When start, replace poster with actuals board

import React from 'react'
import { getPoster } from '../services/api';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { tokens } from '../theme';
import { useTheme } from '@emotion/react';

function createData(
  name,
  calories,
  fat,
  carbs,
  protein
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];


const Board = ({showBoard, rowCnt, colCnt, toggleBlock, isSudoku, algo, editable}) => {

  const rowArr = [];
  const colArr = [];
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  
  while(rowCnt--) rowArr.push(0);
  while(colCnt--) colArr.push(0);

  // return (
  //   <div className='p-5 d-flex justify-content-center'>
  //       <table style={{display: showBoard ? 'block' : 'none'}} className='h-100'>{
  //         rowArr.map((i, ind) => <tr key={ind} className='h-100'>{
  //           colArr.map((i, ind1) => <td key={ind1} className='px-3 py-2 position-relative h-100' id={!isSudoku && ('colR'+ind+ind1)} onClick={toggleBlock ? () => toggleBlock(ind, ind1) : ''} style={{background: (ind+ind1)%2 ? 'white' : 'grey'}}>
  //             {isSudoku ? <input type='number' id={'colR'+ind+ind1} style={{width: '100%', border: 'none', background: 'inherit', outline: 'none'}} disabled={!editable} /> : <div>&nbsp;</div>}
  //           </td>)
  //         }</tr>)
  //       }
  //       </table>
  //   </div>
  // )

  return (
    <TableContainer style={{backgroundColor: colors.primary[400]}}>
      <Table style={showBoard ? {} : {display: 'none'}} aria-label="simple table">
        <TableBody>
          {rowArr.map((row, ind) => (
            <TableRow
              style={{backgroundColor: 'grey'}}
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
            >
              {colArr.map((item, ind1) => <TableCell sx={{border: 1}} align="center" id={!isSudoku && ('colR'+ind+ind1)} onClick={toggleBlock ? () => toggleBlock(ind, ind1) : ''} >
              {isSudoku ? <input type='number' id={'colR'+ind+ind1} style={{width: '100%', border: 'none', background: 'inherit', outline: 'none'}} disabled={!editable} /> : <span>&nbsp;</span>}
              </TableCell>)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Board