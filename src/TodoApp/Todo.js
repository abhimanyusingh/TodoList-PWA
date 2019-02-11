import React, {Component} from 'react';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import './todos.scss'

const API_POINT = 'http://localhost:4567/items.json';


class Todo extends Component {
    state = ({
        todos: [],
        loading: true,
        todoItem: '',
        offline: !navigator.onLine
    })

    addTodo = (newTodoItem) => {
        console.log(newTodoItem);
        fetch(API_POINT, {
            method: 'POST',
            body: JSON.stringify({item: newTodoItem}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(todos => {
            if(todos.error) {
                alert(todos.error)
            } else {
                this.setState({todos})
            }
        })

        window.addEventListener('online', this.setOfflineStatus);
        window.addEventListener('offline', this.setOfflineStatus);
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.setOfflineStatus);
        window.removeEventListener('offline', this.setOfflineStatus);
    }

    setOfflineStatus = () => {
        this.setState({offline: !navigator.onLine})
    }

    deleteTodo = (todoId) => {
        fetch(API_POINT, {
            method: 'DELETE',
            body: JSON.stringify({id: todoId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(todos => {
            if(todos.error) {
                alert(todos.error)
            } else {
                this.setState({todos})
            }
        })
    }

    componentDidMount() {
        fetch(API_POINT)
            .then(response => response.json())
            .then(todos => this.setState({todos, loading: false}))
    }

    render() {
        const { todos, loading, offline } = this.state;
        return (
            <div class="todo-wrapper">
                {offline && <span className="offline">Offline</span>}
                <h1 class="title">Todo App</h1>
                <AddTodo AddTodoHandler = {this.addTodo}/>
                {loading  && <p>Loading....</p>}
                {
                    !loading  && 
                    <TodoList todos = {todos} deleteTodoHandler = {this.deleteTodo}/>
                }
                
            </div>
        )
    }
}


export default Todo;