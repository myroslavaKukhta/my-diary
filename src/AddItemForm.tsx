import React, {ChangeEvent, useState, KeyboardEvent} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string, todolistId: string) => void
    id: string
}

const AddItemForm = (props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addItem(title.trim(), props.id);
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === 'Enter') {
            addTask()
        }
    }
    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />


            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm;


