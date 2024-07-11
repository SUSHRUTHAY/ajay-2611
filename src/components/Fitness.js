// src/components/Fitness.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFitnessRecords, addFitnessRecord } from '../redux/actions/fitnessActions';
import { toast } from 'react-toastify';

const Fitness = () => {
    const dispatch = useDispatch();
    const records = useSelector(state => state.fitness.records);
    const error = useSelector(state => state.fitness.error);

    useEffect(() => {
        dispatch(getFitnessRecords());
    }, [dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const record = {
            date: e.target.date.value,
            activity: e.target.activity.value,
            duration: e.target.duration.value,
        };
        dispatch(addFitnessRecord(record));
        if (error) {
            toast.error(error);
        } else {
            toast.success('Record added successfully!');
        }
    };

    return ( <
        div >
        <
        form onSubmit = { handleSubmit } >
        <
        input type = "date"
        name = "date"
        required / >
        <
        input type = "text"
        name = "activity"
        placeholder = "Activity"
        required / >
        <
        input type = "number"
        name = "duration"
        placeholder = "Duration (mins)"
        required / >
        <
        button type = "submit" > Add Record < /button> <
        /form> <
        ul > {
            records.map(record => ( <
                li key = { record._id } > { record.date } - { record.activity } - { record.duration }
                mins < /li>
            ))
        } <
        /ul> <
        /div>
    );
};

export default Fitness;