import React from "react"
import './BoardContent.scss'
import Column from "../Column/Column";

function BoardContent() {
    return (
        <div className="board_conten">
            <Column />
            <Column />
            
        </div>
    )
}

export default BoardContent;