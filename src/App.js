import logo from "./logo.svg";
import "./App.css";
import Nav from "./views/Nav";
import { useState, useEffect } from "react";
import Todo from "./views/Todo";
import Covid from "./views/Covid";
import { CountDown, NewCountDown } from "./views/Countdown";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Blog from "./views/Blog";
import DetailBlog from "./views/DetailBlog";
import AddNewBlog from "./views/AddNewBlog";
import NotFound from "./views/NotFound";
import YoutubeSearch from "./views/YoutubeSearch";

const App = () => {
  //state
  let [name, setName] = useState("Duc");
  const [address, setAddress] = useState("");
  const [todos, setTodos] = useState([
    { id: "todo1", title: "watching youtube", type: "Duc" },
    { id: "todo2", title: "Doing homework", type: "Cuong" },
    { id: "todo3", title: "Playing game", type: "Chi" },
    { id: "todo4", title: "Reading book", type: "Chi" },
  ]);

  useEffect(() => {}, [address]);
  const handleEventClick = (event) => {
    if (!address) {
      alert("Empty input!");
      return;
    }
    //hook not merge state
    //...spread syntax array js
    let newTodo = {
      id: Math.floor(Math.random() * 100000 + 1),
      title: address,
      type: "Duc",
    };
    setTodos([...todos, newTodo]);
    setAddress("");
  };

  const handleOnChangeInput = (event) => {
    setAddress(event.target.value);
    console.log(event.target.value);
  };

  const deleteDataTodo = (id) => {
    let currentTodos = todos;
    currentTodos = currentTodos.filter((item) => item.id !== id);
    setTodos(currentTodos);
  };

  const onTimesup = () => {
    alert("times up");
  };
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav />
          <img src={logo} className="App-logo" alt="logo" />
        </header>

        <Switch>
          <Route path="/" exact>
            <Covid />
          </Route>
          <Route path="/timer">
            <CountDown onTimesup={onTimesup} />
            <span>----------------------</span>
            <NewCountDown onTimesup={onTimesup} />
          </Route>
          <Route path="/todo">
            <Todo
              todos={todos}
              title={"All todos"}
              deleteDataTodo={deleteDataTodo}
            />
            <input
              type="text"
              value={address}
              onChange={(event) => handleOnChangeInput(event)}
            />
            <button type="button" onClick={() => handleEventClick()}>
              Click me
            </button>
          </Route>
          <Route path="/blog" exact>
            <Blog />
          </Route>
          <Route path="/blog/:id">
            <DetailBlog />
          </Route>
          <Route path="/add-new-blog">
            <AddNewBlog />
          </Route>
          <Route path="/youtube-search">
            <YoutubeSearch />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
