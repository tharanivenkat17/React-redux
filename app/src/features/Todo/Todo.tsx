import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { addTodo, toggleTodo, removeTodo } from "../Todo/todoSlice";

const Todo: React.FC = () => {
    const [text, setText] = useState('');
    const dispatch = useDispatch();
    const todos = useSelector((state: RootState) => state.todo)

    const handleAdd = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    }

    return (
        <div>
            <h1>Todo List</h1>
            <input
                type="text"
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Enter Todo Items"
            />
            <button onClick={handleAdd}>Add</button>
            <ul>
                {todos.map(todoData => (
                    <li
                        key={todoData.id}
                        onClick={() => dispatch(toggleTodo(todoData.id))}
                        style={{ textDecoration: todoData.complete ? 'line-through' : 'none' }}
                    >
                        {todoData.text}
                        <button onClick={() => {dispatch(removeTodo(todoData.id)); }}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Todo;