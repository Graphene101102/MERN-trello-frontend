import React, { useState, useEffect, useCallback } from "react"
import { Container as BoostrapContainer, Row, Col, Form, Button } from 'react-bootstrap';
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
    const [openNewColumnForm, setOpenNewColumnForm] = useState(false);
    const toggleOpenNewColumn = () => setOpenNewColumnForm(!openNewColumnForm)

    const [newColumnTitle, setNewColumnTitle] = useState('')

    const onNewColumnTitleChange = useCallback((e) => setNewColumnTitle(e.target.value), [])

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

    const addNewColumn = () => {
        const newColumnToAdd = {
            id: Math.random().toString(36).substring(2, 5),
            boardId: board.id,
            title: newColumnTitle.trim(),
            cardOrder: [],
            cards: []
        }
        let newColumns = [...columns]
        newColumns.push(newColumnToAdd)

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)

        setNewColumnTitle('')
        toggleOpenNewColumn()
    }

    const onUpdateColumn = (newColumnToUpdate) => {
        const columnIdToUpdate = newColumnToUpdate.id
        let newColumns = [...columns]
        const columnToUpdate = newColumns.findIndex(i => i.id === columnIdToUpdate)

        if (newColumnToUpdate._destroy) {
            //remove column
            newColumns.splice(columnToUpdate, 1)
        } else {
            //change title
            newColumns.splice(columnToUpdate, 1, newColumnToUpdate)
        }

        let newBoard = { ...board }
        newBoard.columnOrder = newColumns.map(c => c.id)
        newBoard.columns = newColumns

        setColumns(newColumns)
        setBoard(newBoard)
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
                        <Column
                            column={column}
                            onCardDrop={onCardDrop}
                            onUpdateColumn={onUpdateColumn}
                        />
                    </Draggable>

                ))}
            </Container>

            <BoostrapContainer className="container">
                {!openNewColumnForm && <Row>
                    <Col className="add-new-column" onClick={toggleOpenNewColumn}>
                        <i className="fa fa-plus icon" /> Add another column
                    </Col>
                </Row>}

                {openNewColumnForm && <Row>
                    <Col className="enter-new-column">
                        <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Enter column title..."
                            className="input-new-column"
                            value={newColumnTitle}
                            onChange={onNewColumnTitleChange}
                            onKeyDown={event => (event.key === 'Enter') && addNewColumn()}
                        />
                        <Button variant="success" size="sm" onClick={addNewColumn}>Add column</Button>{' '}
                        <span className="cancel-icon" onClick={toggleOpenNewColumn}> <i className="fa fa-trash icon" /></span>
                    </Col>
                </Row>}

            </BoostrapContainer>

        </div>
    )
}

export default BoardContent;