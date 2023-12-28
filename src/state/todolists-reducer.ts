import {TodolistType} from '../App';
import {v1} from "uuid";

type ActionType = {
    type: string
    [key: string]: any
}

export const TodolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.id)
        }

        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodoList: TodolistType = {id: newTodolistId, title: action.payload.title, filter: 'all'};
        return [...state, newTodoList]
        }

        case 'CHANGE-TODOLIST': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }

        default: return state
    }
}

type TodolistReducerType = RemoveTodolistActionType | AddTodolistActionType | ChangeTodolistActionType
type RemoveTodolistActionType = ReturnType<typeof RemoveTodolistAC>

export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id} as const
    }
}

type AddTodolistActionType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title} as const
    }
}

type ChangeTodolistActionType = ReturnType<typeof ChangeTodolistAC>
export const ChangeTodolistAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST',
        payload: {id, title} as const
    }
}