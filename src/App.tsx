import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { Posts } from "./Posts";
import "./App.css";
import { observer } from "mobx-react";
import observableNumberStore from "./store/numberCounter";
import App2 from './App2';
import Child from "./Child";

@observer
class App extends React.Component {
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("App1 Rerender");
  }
  render() {

    return (
      <>
        <div>{observableNumberStore.num}</div>
        <ul>
          {observableNumberStore.todos.map((todo) => {
            return <li>{todo.name}</li>;
          })}
        </ul>
        <button
          onClick={() => {
            observableNumberStore.increaseAction(1);
          }}
        >
          증가
        </button>
        <button
          onClick={() => {
            observableNumberStore.decreaseAction(1);
          }}
        >
          감가
        </button>
        <button
          onClick={() => {
            observableNumberStore.addTodos({ name: "숙제1" });
          }}
        >
          일정추가
        </button>
        {/* <App2/> */}
      </>
    );
  }
}

export default App;
