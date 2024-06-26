export const initialData = {
    board: [
        {
            id: 'board-1',
            columnOrder: ['column-1', 'column-2', 'column-3'],
            columns : [
                {
                    id: 'column-1',
                    boardId: 'board-1',
                    title: 'To do',
                    cardOrder: ['card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7'],
                    cards: [
                        { id: 'card-1', boardId: 'board-1', columnId: 'column-1', title: 'Title card 1', cover: 'https://i.pinimg.com/564x/1e/92/b3/1e92b3f2edf7064da7c4ba7d4998f26a.jpg'},
                        { id: 'card-2', boardId: 'board-1', columnId: 'column-1', title: 'Title card 2', cover: null},
                        { id: 'card-3', boardId: 'board-1', columnId: 'column-1', title: 'Title card 3', cover: null},
                        { id: 'card-4', boardId: 'board-1', columnId: 'column-1', title: 'Title card 4', cover: null},
                        { id: 'card-5', boardId: 'board-1', columnId: 'column-1', title: 'Title card 5', cover: null},
                        { id: 'card-6', boardId: 'board-1', columnId: 'column-1', title: 'Title card 6', cover: null},
                        { id: 'card-7', boardId: 'board-1', columnId: 'column-1', title: 'Title card 7', cover: null}
                    ]
                },
                {
                    id: 'column-2',
                    boardId: 'board-1',
                    title: 'Inprogress',
                    cardOrder: ['card-8', 'card-9', 'card-10'],
                    cards: [
                        { id: 'card-8', boardId: 'board-1', columnId: 'column-1', title: 'Title card 8', cover: null},
                        { id: 'card-9', boardId: 'board-1', columnId: 'column-1', title: 'Title card 9', cover: null},
                        { id: 'card-10', boardId: 'board-1', columnId: 'column-1', title: 'Title card 10', cover: null},
                    ]
                },
                {
                    id: 'column-3',
                    boardId: 'board-1',
                    title: 'Done',
                    cardOrder: ['card-11', 'card-12', 'card-13'],
                    cards: [
                        { id: 'card-11', boardId: 'board-1', columnId: 'column-1', title: 'Title card 11', cover: null},
                        { id: 'card-12', boardId: 'board-1', columnId: 'column-1', title: 'Title card 12', cover: null},
                        { id: 'card-13', boardId: 'board-1', columnId: 'column-1', title: 'Title card 13', cover: null},
                    ]
                }
            ]
        }
    ]
}