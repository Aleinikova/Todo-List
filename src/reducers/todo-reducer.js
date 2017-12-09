const todo = (state, action) => {
    switch (action.type) {
      case 'ADD_TODO':
        if (action.text === '') {
          return {
            id: action.id,
            text: "Have a good mood",
            completed: false,
          };
        }
        
        return {
          id: action.id,
          text: action.text,
          completed: false,
        };
        
      case 'TOGGLE_TODO': 
        if (state.id !== action.id) {
          return state;
        }
        return Object.assign({}, state, {completed: !state.completed});
        
      default: 
        return state;
    }
}
  
const todos = (state = [], action) => {
    switch (action.type) {
      case 'ADD_TODO':
        return [
          ...state,
          todo(undefined, action)
        ];
      
      case 'TOGGLE_TODO':
        return state.map(state => todo(state, action));
      
      default:
        return state;
    }
}

export default todos;

export const getVisibileTodos = (state, filter) => {
  switch (filter) {
      case 'active':
          return state.filter(todo => !todo.completed);
      case 'completed':
          return state.filter(todo => todo.completed);
      default:
          return state;
  }
}