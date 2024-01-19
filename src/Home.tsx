import React, { useState, useEffect } from 'react';
import s from './Home.module.css'
import onHorse from "./img/onHorse.webp";


const Home: React.FC = () => {
    const [count, setCount] = useState<number>(0);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const saveData = () => {
        localStorage.setItem('counterValue', count.toString());
    };

    const clearData = () => {
        localStorage.removeItem('counterValue');
        setCount(0); // Скидання лічильника
    };

    useEffect(() => {
        const savedCount = localStorage.getItem('counterValue');
        if (savedCount !== null) {
            setCount(parseInt(savedCount, 10));
        }
    }, []);

    return (
        <div className={s.counter}>
            <div className={s.imageContainer}>
                <img
                    src={onHorse}
                    alt="win"
                />
            </div>
            <div className={s.counterContent}>
                <h2>I did tasks: {count}</h2>
                <button onClick={increment}>One more did</button>
                <button onClick={clearData}>Clear</button>
                <button onClick={saveData}>Save</button>
            </div>
        </div>
    );
};

export default Home;
