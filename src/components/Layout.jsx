import { useContext } from "react";
import { TodosContext } from "../context/TodoContext";

const Layout = ({ children }) => {
  const {completedCounter} = useContext(TodosContext)

  return (
    <div className="layout">
      <nav className="flex justify-between px-3 py-4 bg-blue-800 text-neutral-50">
        <h1 className="text-xl font-light">React TODO CDA</h1>
        <div className="grid items-center grid-flow-col gap-2">
          <span>Username</span>
          <div className="grid font-medium text-blue-800 bg-neutral-50 aspect-square w-7 place-content-center">
            {completedCounter}
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
}

export default Layout;