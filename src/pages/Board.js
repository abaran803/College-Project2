// A placeholder to show poster of Algo before start
// When start, replace poster with actuals board

import React from 'react'
import { getPoster } from '../services/api';

const Board = ({showBoard, rowCnt, colCnt, toggleBlock, isSudoku, algo, editable}) => {

  const rowArr = [];
  const colArr = [];
  
  while(rowCnt--) rowArr.push(0);
  while(colCnt--) colArr.push(0);

  return (
    <div className='p-5 d-flex justify-content-center'>
        <table style={{display: showBoard ? 'block' : 'none'}} className='h-100'>{
          rowArr.map((i, ind) => <tr key={ind} className='h-100'>{
            colArr.map((i, ind1) => <td key={ind1} className='px-3 py-2 position-relative h-100' id={!isSudoku && ('colR'+ind+ind1)} onClick={toggleBlock ? () => toggleBlock(ind, ind1) : ''} style={{background: (ind+ind1)%2 ? 'white' : 'grey'}}>
              {isSudoku ? <input type='number' id={'colR'+ind+ind1} style={{width: '100%', border: 'none', background: 'inherit', outline: 'none'}} disabled={!editable} /> : <div>&nbsp;</div>}
            </td>)
          }</tr>)
        }
        </table>
    </div>
  )
}

export default Board