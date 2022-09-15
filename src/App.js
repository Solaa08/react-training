import Layout from "./components/Layout";
import Todos from "./components/Todos";
import { TodosContextProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="App">
      <TodosContextProvider>
        <Layout>
          <main className="px-3 py-4">
            <h1 className="text-2xl font-medium">Liste des tâches</h1>
            <Todos />
          </main>
        </Layout>
      </TodosContextProvider>
    </div>
  );
}

export default App;
