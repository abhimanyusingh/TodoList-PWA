import React from 'react';

const TodoList = ({ todos, deleteTodoHandler }) => {
    return (
        <div className="todo-list">
            <ul>
            {
                todos.map(todo => 
                    <li className="todo-item" key={todo.id}>{todo.item} 
                        <a href="#0" className="delete" onClick={() => {
                            deleteTodoHandler(todo.id)
                        }}>x</a>
                    </li>
                )
            }
            </ul>
        </div>
    )
}

export default TodoList;