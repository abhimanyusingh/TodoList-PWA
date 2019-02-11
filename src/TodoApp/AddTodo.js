import React  from 'react';

const AddTodo = ({ AddTodoHandler }) =>{
    return (
        <div className="add-todo">
            <input type='text' placeholder="What do you need to do?" onKeyDown={(e) => {
                if(e.keyCode === 13) {
                    AddTodoHandler(e.target.value)
                }
            }}/>
        </div>
        
    )
}

export default AddTodo;