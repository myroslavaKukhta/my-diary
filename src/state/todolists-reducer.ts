import {FilterValuesType, TodolistType} from '../App';
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    payload: {
        id: string
    }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    payload: {
        title: string
    }
}
export type ChangeTodolistActionType = {
    type: 'CHANGE-TODOLIST',
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id: string
        filter: FilterValuesType
    }
}
export type ActionType =
    RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistActionType
    | ChangeTodolistFilterActionType

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
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default: return state
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id} as const
    }
}

export const AddTodolistAC = (title: string): AddTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        payload: {title} as const
    }
}

export const ChangeTodolistAC = (id: string, title: string): ChangeTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST',
        payload: {id, title} as const
    }
}

export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter} as const
    }
}