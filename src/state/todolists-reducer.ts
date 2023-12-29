import {TodolistType} from '../App';
import {v1} from "uuid";

// type ActionType = {
//     type: string
//     [key: string]: any
// }

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string
}

export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST',
    id: string
    title: string
}

export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}

export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType

export const TodolistReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }

        case 'ADD-TODOLIST': {
            let newTodolistId = v1();
            let newTodoList: TodolistType = {id: newTodolistId, title: action.title, filter: 'all'};
        return [...state, newTodoList]
        }

        case 'CHANGE-TODOLIST': {
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
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