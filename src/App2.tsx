// 컴포넌트 리렌더링이, 딱 참조하는 그값에만 의존적이다 
// 또한, 부모컴포넌트가 리렌더링 되더라도, 자식에서 해당 스토어를 구독하지않으면, 업데이트 되지 않는다.
// 다만 부모 props가 변경되면 리렌더링 됨. 
import React, { Component } from "react";
import { observer } from "mobx-react";
import observableNumberStore from "./store/numberCounter";

@observer
export default class App2 extends Component {
  componentDidUpdate(
    prevProps: Readonly<{}>,
    prevState: Readonly<{}>,
    snapshot?: any
  ): void {
    console.log("App2 Rerender");
  }
  render() {
    const todos = observableNumberStore.todos;
    // const num = observableNumberStore.getNumberAction;

    // return(
    //   <ul>
    //     {
    //       todos.map(todo => {
    //         return (
    //           <li>{todo.name}</li>
              
    //         )
    //     })
    //     }
    //   </ul>
    // )
    return(
      <p>{observableNumberStore.num}</p>
    )
  }
}
