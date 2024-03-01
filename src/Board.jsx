import React from 'react'


function Board({board}) {
  return (
    <div style={{
        display: "flex",
        flexDirection: "column",
        border: "solid 5px black"
    }}>
    {board.map((rowArray,rowIndex)=>(
        <div key={rowArray.join('_') }className="sudoku-row" style={{
            display: "flex",
            // backgroundColor: "grey",
            borderTop: rowIndex>0 && rowIndex%3==0?"solid 5px black":"white"
        }} >
            {rowArray.map((el,index)=>(
                <div key={index} className={`${rowIndex}-${index}`} style={{
                    backgroundColor: "white",
                    margin: "2px",
                    padding: "5px",
                    width: "30px",
                    height: "30px",
                    textAlign: "center",
                    borderLeft: index>0 && index%3==0?"solid 5px black":"white"
                }}>{el}</div>
            ))}
        </div>
    ))}
    </div>
  )
}

export default Board