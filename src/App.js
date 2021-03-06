import React, {useState,useEffect} from "react";
import './App.css';

// İmporting Components
import Form from "./components/form"
import TodoList from './components/TodoList';

function App() {
  // State Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  
  // Run once when the start app
  useEffect(() => {
    getLocalTodos();
  }, []);
    // Use Effect
    useEffect(() => {
      // Functions
  const filterHandler = () => {
    switch(status) {
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true ))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false ))
        break;
      default : setFilteredTodos(todos);
      break;
    } 
  }
  saveLocalTodos();
filterHandler();
    },[todos,status]);

    // Save to Local
    const saveLocalTodos = () => {
        localStorage.setItem("todos", JSON.stringify(todos));
    };

    const getLocalTodos = () => {
      if(localStorage.getItem("todos") === null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
       let todoLocal = JSON.parse(localStorage.getItem("todos"));
       setTodos(todoLocal);
      }
    }

  return (
    <div className="App">
      <header>
      <h1>To - Do List - 2021</h1>
      </header>
      <Form inputText={inputText} 
            todos={todos} 
            setTodos={setTodos} 
            setInputText={setInputText}
            setStatus={setStatus}
            />
      <TodoList setTodos={setTodos} 
                todos={todos}
                filteredTodos={filteredTodos}/>
    </div>
  );
}

export default App;
