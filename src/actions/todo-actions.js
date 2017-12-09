import uuid from 'uuid';

export const addTodo = (text) => {
    return {
        type: 'ADD_TODO',
        text,
        id: uuid()
    }
}

export const toggleTodo = (id) => {
    return {
        type: 'TOGGLE_TODO',
        id,
    }
}