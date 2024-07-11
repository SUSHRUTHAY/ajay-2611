import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddRecord() {
    const [record, setRecord] = useState({
        type: '',
        duration: '',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord((prevRecord) => ({
            ...prevRecord,
            [name]: value
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await axios.post('/api/fitness', record);
            toast.success('Record added successfully');
        } catch (error) {
            toast.error('Failed to add record');
        }
    };

    return ( <
        form onSubmit = { handleSubmit } >
        <
        input type = "text"
        name = "type"
        onChange = { handleChange }
        value = { record.type }
        /> <
        input type = "number"
        name = "duration"
        onChange = { handleChange }
        value = { record.duration }
        /> <
        input type = "date"
        name = "date"
        onChange = { handleChange }
        value = { record.date }
        /> <
        button type = "submit" > Add Record < /button> <
        /form>
    );
}

export default AddRecord;