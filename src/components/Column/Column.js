import React from "react";
import './Column.scss';
import Task from "../Task/Task";

function Column(){
    return(
        <div className="column">
        <header>Brainstorm</header>
        <ul className="task-list">
            <Task />
            <li className="task-item">Hoang Nguyen Quang Viet</li>
            <li className="task-item">Hoang Nguyen Quang Viet</li>
            <li className="task-item">Hoang Nguyen Quang Viet</li>
        </ul>
        <footer>add another card</footer>
    </div>
    )
}

export default Column;