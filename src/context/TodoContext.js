import { createContext, useState, useEffect, useReducer } from 'react';

const TodosContext = createContext();

const TYPES = {
  INIT: "INIT",
  TOGGLE: "TOGGLE",
  DELETE: "DELETE",
  ADD: "ADD",
}

const reducer = (state, action) => {
  switch (action.type) {
    case TYPES.INIT:
      return action.payload
    case TYPES.ADD:
      return [action.payload, ...state]
    case TYPES.TOGGLE:
      return [
        ...state.map(todo => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo)
      ]
    case TYPES.DELETE:
      return [
        ...state.filter(todo => todo.id !== action.id)
      ]
    default:
      return state;
  }
}

const TodosContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [todos, dispatch] = useReducer(reducer, []);

  const completedCounter = todos?.filter(todo => todo.completed).length;

  useEffect(() => {
    setIsLoading(true);
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: TYPES.INIT, payload: json });
        setIsLoading(false);
      })
  }, [])

  return (
    <TodosContext.Provider value={{ todos, completedCounter, isLoading, dispatch, TYPES }}>
      {children}
    </TodosContext.Provider>
  )
}

export { TodosContext, TodosContextProvider };
