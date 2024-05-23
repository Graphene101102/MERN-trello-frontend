import React, {useState, useEffect} from "react"
import { isEmpty } from "lodash";
import './BoardContent.scss'
import Column from "../Column/Column";
import { mapOrder } from "utilities/sorts";
import { initialData } from "actions/initialData";

function BoardContent() {
    const [board, setBoard] = useState({});
    const [columns, setColumns] = useState([]);

        useEffect(() => {
            const boardFromDB = initialData.board.find(board => board.id === 'board-1')
            if (boardFromDB) {
                setBoard(boardFromDB)

                //sort column
                setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'))
            }
        }, [])

        if(isEmpty(board)) {
            return <div className="not-found" style={{'padding': '10px', 'color': 'white'}}>Board not found</div>
        }
    return (
        <div className="board_conten">
             {columns.map((column, index) => <Column key={index} column={column} />)}  
            
        </div>
    )
}

export default BoardContent;