import React, {Component} from 'react';
import './App.css';
import {TodoInput} from './components/todo/todo';
import {TodoItem} from './components/todo/todo';
import Menu from "./components/layout/header/navBar";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {id: 0, text: "Learn!"},
                {id: 1, text: "WRITE thesis"},
                {id: 2, text: "Learn to make a React app!"}
            ],
            nextId: 3
        };

        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    addTodo(todoText) {
        let todos = this.state.todos.slice();
        todos.push({id: this.state.nextId, text: todoText});
        this.setState({
            todos: todos,
            nextId: ++this.state.nextId
        });
    }

    removeTodo(id) {
        this.setState({
            todos: this.state.todos.filter((todo, index) => todo.id !== id)
        });
    }

    render() {
        return (
            <div className="App">
                <Menu/>
                <div className="todo-wrapper">
                    <TodoInput todoText="" addTodo={this.addTodo}/>
                    <ul>
                        {
                            this.state.todos.map((todo) => {
                                return <TodoItem todo={todo} key={todo.id} id={todo.id} removeTodo={this.removeTodo}/>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default App;
