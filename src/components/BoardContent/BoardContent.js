import React, { useState, useEffect } from "react"
import { Container, Draggable } from "react-smooth-dnd";
import { isEmpty } from "lodash";
import './BoardContent.scss'
import Column from "../Column/Column";
import { mapOrder } from "utilities/sorts";
import { initialData } from "actions/initialData";
import { applyDrag } from "utilities/dragDrop";

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

    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white' }}>Board not found</div>
    }

    const onColumnDrop = (dropResult) => {

        let newColumns = [...columns]
        newColumns = applyDrag(newColumns, dropResult)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
        // console.log(newBoard)
    }

    const onCardDrop = (columnId, dropResult) => {
        if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

            let newColumns = [...columns]
            let currentColumns = newColumns.find(c => c.id === columnId)
            currentColumns.cards = applyDrag(currentColumns.cards, dropResult)
            currentColumns.cardOrder = currentColumns.cards.map(i => i.id)

            // console.log(newColumns)
            setColumns(newColumns)

        }
    }

    return (
        <div className="board_conten">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop} />
                    </Draggable>

                ))}
            </Container>
            <div className="add-new-column">
                <i className="fa fa-plus icon" /> Add another column
            </div>

        </div>
    )
}

export default BoardContent;