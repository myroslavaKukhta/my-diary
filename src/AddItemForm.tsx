import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {Button} from "@mui/material";
import TextField from '@mui/material/TextField';

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

        const styles = {
            maxWidth: '38px',
            maxHeight: '38px',
            minWidth: '38px',
            minHeight: '38px',
    }

    return (
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" value={title} size="small"
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />


            <Button variant="contained" size="small"
                    style={styles}
                    onClick={addTask}>+</Button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}

export default AddItemForm;


