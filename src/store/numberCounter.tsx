import { makeObservable,computed, observable,action } from "mobx";
import mobx from "mobx-react";

interface Todo {
  name:string
}

class NumberStore {
  @observable num = 0;
  @observable todos:Todo[] = [];
  
  constructor(){
    makeObservable(this);
  }

  @action
  increaseAction(num:number) {
    this.num = this.num+num;
  }
  
  @action
  decreaseAction(num:number) {
    this.num = this.num-num;
  }

  
  // @computed
  // set setNumberAction(number){
  //   this.num = this.num+num
  // }

  @action
  addTodos(todo:Todo){
    this.todos.push(todo)
  }
}

const observableNumberStore = new NumberStore();
export default observableNumberStore
