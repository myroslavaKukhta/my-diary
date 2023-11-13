import React from 'react';
import './Todo.css';

export class TodoItem extends React.Component {
    constructor(props) {
        super(props);
    }

    removeTodo(id) {
        this.props.removeTodo(id);
    }

    render() {
        return (
            <div className="todoWrapper">
                <button className="removeTodo" onClick={(e) => this.removeTodo(this.props.id)}>remove</button>
                {this.props.todo.text}
            </div>
        );
    }
}

export class TodoInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: this.props.todoText};

        this.handleChange = this.handleChange.bind(this);
        this.addTodo = this.addTodo.bind(this);
    }

    handleChange(e) {
        this.setState({value: e.target.value});
    }

    addTodo(todo) {
        // Ensure a todo was actually entered before submitting
        if (todo.length > 0) {
            this.props.addTodo(todo);
            this.setState({value: ''});
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange} />
                <button className="btn btn-primary" onClick={() => this.addTodo(this.state.value)}>Submit</button>
            </div>
        );
    }
}