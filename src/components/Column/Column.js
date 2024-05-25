import React, { useCallback, useEffect, useState } from "react";
import { Dropdown, Form } from 'react-bootstrap';
import { Container, Draggable } from "react-smooth-dnd";
import './Column.scss';
import Card from "../Card/Card";
import { mapOrder } from "utilities/sorts";
import ConfirmModal from "Common/confirmModal";
import { MODAL_ACTION_CONFIRM } from 'utilities/constants'
import { PressEnter } from 'utilities/contentEditable'

function Column(props) {
    const { column, onCardDrop, onUpdateColumn } = props
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    const [show, setShow] = useState(false);
    const toggleShowConfirmModal = () => setShow(!show)

    const [columnTitle, setColumnTitle] = useState('')
    const columnTitleChange = useCallback((e) => setColumnTitle(e.target.value), [])

    useEffect(() => {
        setColumnTitle(column.title)
    }, [column.title])

    const onConfirmModalAction = (type) => {
        console.log(type)
        if (type === MODAL_ACTION_CONFIRM) {
            const newColumn = {
                ...column,
                _destroy: true
            }
            onUpdateColumn(newColumn)
        }
        toggleShowConfirmModal()
    }

    const columnTitleChangeBlur = () => {
        console.log(columnTitle)
        const newColumn = {
            ...column,
            title: columnTitle
        }
        onUpdateColumn(newColumn)
    }

    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    <Form.Control
                        size="sm"
                        type="text"
                        className="trello-content-editable"
                        value={columnTitle}
                        onChange={columnTitleChange}
                        onBlur={columnTitleChangeBlur}
                        onKeyDown={PressEnter}
                        // onMouseDown={e => e.preventDefault()}
                    />
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic" size="sm" className="dropdown-btn" />

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Add card...</Dropdown.Item>
                            <Dropdown.Item onClick={toggleShowConfirmModal}>Remove column...</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </header>
            <div className="task-list">
                <Container
                    groupName="col"
                    // onDragStart={e => console.log("drag started", e)}
                    // onDragEnd={e => console.log("drag end", e)}
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    // onDragEnter={() => {
                    //   console.log("drag enter:", column.id);
                    // }}
                    // onDragLeave={() => {
                    //   console.log("drag leave:", column.id);
                    // }}
                    // onDropReady={p => console.log('Drop ready: ', p)}
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>

                    ))}
                </Container>
            </div>

            <footer>
                <div className="footer-action">
                    <i className="fa fa-plus icon" /> Add another card
                </div>
            </footer>

            <ConfirmModal
                title="Remove column"
                content={'Are you sure you want to remove this column!'}
                show={show}
                onAction={onConfirmModalAction}
            />


        </div>
    )
}

export default Column;