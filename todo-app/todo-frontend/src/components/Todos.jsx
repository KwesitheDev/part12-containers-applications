// src/components/Todo.jsx
export default function Todo({ todo }) {
  return (
    <div className="todo">
      <p>{todo.text}</p>
      <p>Done: {todo.done ? 'Yes' : 'No'}</p>
    </div>
  );
}
