import React, {Component} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';
import NavBar from "./components/layout/header/NavBar";
import {TodoInput, TodoItem} from './components/todo/Todo';
import Calendar from './components/calendar/Calendar';
import WeekTodo from './../src/components/todo/WeekTodo';

const style = {
    position: "relative", margin: "50px auto"
};

const Week= () => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    // Добавим состояние для задач каждого дня
    const [dailyTasks, setDailyTasks] = React.useState({});

    const addTask = (day, task) => {
        setDailyTasks((prevTasks) => ({
            ...prevTasks, [day]: [...(prevTasks[day] || []), task]
        }));
    };

    const removeTask = (day, id) => {
        setDailyTasks((prevTasks) => ({
            ...prevTasks, [day]: prevTasks[day].filter((_, index) => index !== id)
        }));
    };

    return (<div>
            <h2>Week</h2>
            <div className="days-todo">
                {days.map((day, index) => (<div key={index}>
                        <h3>{day}</h3>
                        <div className="day-todo">
                            <TodoInput
                                todoText=""
                                addTodo={(text) => addTask(day, {id: dailyTasks[day]?.length || 0, text})}
                            />
                            <ul>
                                {dailyTasks[day] && dailyTasks[day].map((task, id) => (<TodoItem
                                        todo={task}
                                        key={task.id}
                                        id={id}
                                        removeTodo={() => removeTask(day, id)}
                                    />))}
                            </ul>
                        </div>
                    </div>))}
            </div>
        </div>);
};


const WorkCalendar = () => {
    const [showCalendar, setShowCalendar] = React.useState(false);

    const toggleCalendar = () => {
        setShowCalendar(!showCalendar);
    };

    return (<div className="work-container">
            <button onClick={toggleCalendar}>Show Calendar</button>
            {showCalendar && (
                <div className="calendar-container" style={{position: 'absolute', bottom: '0', width: '100%'}}>
                    <Calendar
                        style={{margin: '0 auto'}}
                        width="302px"
                        onDayClick={(e, day) => alert(day)}
                    />
                </div>)}
        </div>);
};

const Home = () => {
    return (
        <div>
            <h2>Home</h2>
            <Calendar style={{ position: 'relative', margin: '50px auto' }} />
        </div>
    );
};

const Day = () => {
    return (<div>
            <h2>Study</h2>
            {/* Добавьте здесь компонент для Study, если необходимо */}
        </div>);
};


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [{id: 0, text: "Learn!"}, {id: 1, text: "WRITE thesis"}, {
                id: 2,
                text: "Learn to make a React app!"
            }], nextId: 3
        };

        this.addTodo = this.addTodo.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
    }

    addTodo = (todoText) => {
        this.setState((prevState) => ({
            todos: [...prevState.todos, {id: prevState.nextId, text: todoText}], nextId: prevState.nextId + 1
        }));
    }

    removeTodo = (id) => {
        this.setState((prevState) => ({
            todos: prevState.todos.filter(todo => todo.id !== id)
        }));
    }

    render() {
        return (<Router>
                <div className="App">
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/study" element={<Day/>}/>
                        <Route path="/work" element={<Week/>}/>
                    </Routes>
                </div>
            </Router>);
    }
}


export default App;




