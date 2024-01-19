import React, { useState, useEffect } from 'react';
import DayTodo from './DayTodo';
import { TaskType } from './DayTodo';
import { FilterValuesType } from './App';
import { saveDataToLocalStorage, loadDataFromLocalStorage } from './localStorageUtils';
import s from "./DayTodo.module.css";
import samurai from "./img/samurai.jpg";
import DailyEntry from "./DailyEntry";

interface WeekTodoProps {
    title: string;
    tasks: TaskType[];
    addTask: (title: string) => void;
    removeTask: (taskId: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    changeTaskStatus: (taskId: string) => void;
}

const WeekTodo: React.FC<WeekTodoProps> = ({
                                                title,
                                                tasks,
                                                addTask,
                                                removeTask,
                                                changeFilter,
                                                changeTaskStatus,
                                            }) => {
    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    const [dailyTasks, setDailyTasks] = useState<{ [key: string]: TaskType[] }>({});

    useEffect(() => {
        const savedData = loadDataFromLocalStorage('dailyTasks');
        if (savedData) {
            setDailyTasks(savedData);
        }
    }, []);

    const addTaskToDay = (day: string, task: string) => {
        setDailyTasks((prevTasks) => ({
            ...prevTasks,
            [day]: [...(prevTasks[day] || []), { id: Date.now().toString(), title: task, isDone: false }],
        }));
    };

    const removeTaskFromDay = (day: string, id: string) => {
        setDailyTasks((prevTasks) => ({
            ...prevTasks,
            [day]: prevTasks[day].filter((task) => task.id !== id),
        }));
    };

    const [expandedDay, setExpandedDay] = useState<string | null>(null);

    const toggleDay = (day: string) => {
        setExpandedDay(expandedDay === day ? null : day);
    };

    return (
        <div>
            <h2>{title}</h2>
            <div className={s.samuraiImage}>
                <img src={samurai} alt="Samurai" />
            </div>
            <DailyEntry/>
            <div>
                {days.map((day) => (
                    <div key={day}>
                        <div className={s.dayContainer}>
                        <button onClick={() => toggleDay(day)} className={s.toggleButton}>
                            {day} {expandedDay === day ? '-' : '+'}
                        </button>
                            </div>
                        {expandedDay === day && (
                            <DayTodo
                                title={day}
                                tasks={dailyTasks[day] || []}
                                addTask={(text) => addTaskToDay(day, text)}
                                removeTask={(id) => removeTaskFromDay(day, id)}
                                changeFilter={changeFilter}
                                changeTaskStatus={changeTaskStatus}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeekTodo;