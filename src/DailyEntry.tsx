import React, { useState, ChangeEvent, FormEvent } from 'react';
import { saveDataToLocalStorage } from './localStorageUtils';
import s from './DailyEntry.module.css';

interface Entry {
    id: string;
    text: string;
    date: string;
}

const DailyEntry: React.FC = () => {
    const [entry, setEntry] = useState<string>('');
    const [date, setDate] = useState<string>('');

    const handleEntryChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setEntry(event.target.value);
    };

    const handleDateChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value);
    };

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        const newEntry: Entry = {
            id: Date.now().toString(),
            text: entry,
            date: date
        };

        const entries = JSON.parse(localStorage.getItem('dailyEntries') || '[]');
        entries.push(newEntry);
        saveDataToLocalStorage('dailyEntries', entries);

        setDate('');
    };

    return (
        <div className={s.dailyEntryContainer}>
            <form onSubmit={handleSubmit} className={s.dailyEntryContainer}>
                <label>
                    Date:
                    <input
                        type="date"
                        value={date}
                        onChange={handleDateChange}
                        required
                    />
                </label>
                <br />
                <label>
                    Week text:
                    <textarea
                        value={entry}
                        onChange={handleEntryChange}
                        placeholder="What in your mind?"
                        required
                    />
                </label>
                <br />
                <button type="submit" className={s.button}>Save</button>
            </form>
        </div>
    );
};

export default DailyEntry;