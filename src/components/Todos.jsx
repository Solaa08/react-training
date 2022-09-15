
import { useContext, useState, useMemo } from "react";
import { IoMdTrash } from "react-icons/io";
import { TodosContext } from "../context/TodoContext";
import { v4 as uuid } from "uuid";

const TODO_STATUS = {
  COMPLETED: "completed",
  IN_PROGRESS: "in-progress",
}

const FILTERS = {
  COMPLETED: TODO_STATUS.COMPLETED,
  IN_PROGRESS: TODO_STATUS.IN_PROGRESS,
  ALL: "all",
}

const Todos = () => {
  const { todos, isLoading, dispatch, TYPES } = useContext(TodosContext)
  const [filteredStatus, setFilteredStatus] = useState(FILTERS.ALL)
  const [bool, setBool] = useState(false);

  const filteredTodos = useMemo(() => {
    switch (filteredStatus) {
      case FILTERS.IN_PROGRESS:
        return todos.filter(todo => !todo.completed);
      case FILTERS.COMPLETED:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filteredStatus])

  const filterByStatus = (e) => {
    const filterValue = e.target.value;
    setFilteredStatus(filterValue);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const newTodo = {
      id: uuid(),
      title,
      completed: false,
    }
    dispatch({ type: "ADD", payload: newTodo })
  }

  if (isLoading) {
    return <p>Chargement...</p>
  }

  return (
    <div>
      <form className="py-4 my-2" onSubmit={onSubmit}>
        <div className="grid space-y-4">
          <div className="grid">
            <label className="text-sm font-medium text-gray-400">Titre</label>
            <input className="border-t-0 border-b-blue-800 border-x-0" id="todoLableInput" name="title" type="text" />
          </div>
          <button type="submit" className="px-4 py-2 font-bold text-white bg-blue-800 rounded-full">Ajouter</button>
        </div>
      </form>
      <button onClick={() => setBool(!bool)}>click me !</button>
      {bool.toString()}
      <p className="text-gray-400">Afficher&nbsp;:&nbsp;</p>
      <div className="flex items-center gap-1">
        <input type="radio" id={`todo-${FILTERS.ALL}`} name="filter-todo" value={FILTERS.ALL} defaultChecked={filteredStatus === FILTERS.ALL} onChange={(e) => filterByStatus(e)} />
        <label htmlFor={`todo-${FILTERS.ALL}`}>Tous</label>
      </div>
      <div className="flex items-center gap-1">
        <input type="radio" id={`todo-${FILTERS.IN_PROGRESS}`} name="filter-todo" value={FILTERS.IN_PROGRESS} defaultChecked={filteredStatus === FILTERS.IN_PROGRESS} onChange={(e) => filterByStatus(e)} />
        <label htmlFor={`todo-${FILTERS.IN_PROGRESS}`}>En cours</label>
      </div>
      <div className="flex items-center gap-1">
        <input type="radio" id={`todo-${FILTERS.COMPLETED}`} name="filter-todo" value={FILTERS.COMPLETED} defaultChecked={filteredStatus === FILTERS.COMPLETED} onChange={(e) => filterByStatus(e)} />
        <label htmlFor={`todo-${FILTERS.COMPLETED}`}>Terminée</label>
      </div>
      <ul className="grid py-4 space-y-2">
        {filteredTodos?.map(todo => {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              onToggle={() => dispatch({ type: TYPES.TOGGLE, id: todo.id })}
              onDelete={() => dispatch({ type: TYPES.DELETE, id: todo.id })} />
          )
        })}
      </ul>
    </div>
  );
}

const Todo = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="px-3 py-4 border-l-2 shadow bg-zinc-100">
      <div className="flex justify-between">
        <p>{todo.title}</p>
        <div>
          <div className="grid space-y-2">
            <input className="border-blue-800 form-checkbox" type="checkbox" defaultChecked={todo.completed} onChange={onToggle} />
            <button onClick={onDelete}>
              <IoMdTrash className="text-red-500" />
            </button>
          </div>
        </div>
      </div>
      {new Date().toLocaleDateString("fr")}
    </li>
  )
}

export default Todos;