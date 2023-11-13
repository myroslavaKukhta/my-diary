import React from 'react';

const WeekTodo = () => {
    const weekTodos = [
        "Task 1 for Monday",
        "Task 2 for Tuesday",
        "Task 3 for Wednesday",
        "Task 4 for Thursday",
        "Task 5 for Friday",
        "Task 6 for Saturday",
        "Task 7 for Sunday"
    ];

    return (
        <div>
            <h2>Weekly Todo List</h2>
            <ul>
                {weekTodos.map((todo, index) => (
                    <li key={index}>{todo}</li>
                ))}
            </ul>
        </div>
    );
};

export default WeekTodo;