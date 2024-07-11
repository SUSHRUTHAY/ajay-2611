import { useEffect, useState } from 'react';
import Styles from './Fitness.module.css';
import axios from 'axios';

export function Fitness(props) {
    const [newActivity, setNewActivity] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [activitiesData, setActivitiesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [updatedActivity, setUpdatedActivity] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            const apiData = await getActivities();
            setActivitiesData(apiData);
            setLoading(false);
        };
        fetchActivities();
    }, []);

    const getActivities = async () => {
        const options = {
            method: 'GET',
            url: 'http://localhost:8000/api/activities',
            headers: {
                accept: 'application/json',
            },
        };
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (err) {
            console.error(err);
            return []; // return an empty array in case of error
        }
    };

    const addActivity = async () => {
        const options = {
            method: 'POST',
            url: 'http://localhost:8000/api/activities',
            headers: {
                accept: 'application/json',
            },
            data: {
                title: newActivity,
                description: newDescription,
            },
        };
        try {
            const response = await axios.request(options);
            setActivitiesData((prevData) => [...prevData, response.data.newActivity]);
            setNewActivity('');
            setNewDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    const deleteActivity = async (id) => {
        const options = {
            method: 'DELETE',
            url: `http://localhost:8000/api/activities/${id}`,
            headers: {
                accept: 'application/json',
            },
        };
        try {
            const response = await axios.request(options);
            setActivitiesData((prevData) => prevData.filter((activity) => activity._id !== id));
        } catch (err) {
            console.error(err);
        }
    };

    const updateActivity = async (id) => {
        const activityToUpdate = activitiesData.find((activity) => activity._id === id);
        const options = {
            method: 'PATCH',
            url: `http://localhost:8000/api/activities/${id}`,
            headers: {
                accept: 'application/json',
            },
            data: {
                title: updatedActivity || activityToUpdate.title,
                description: updatedDescription || activityToUpdate.description,
            },
        };
        try {
            const response = await axios.request(options);
            setActivitiesData((prevData) => prevData.map((activity) => (activity._id === id ? response.data : activity)));
            setEditing(null);
            setUpdatedActivity('');
            setUpdatedDescription('');
        } catch (err) {
            console.error(err);
        }
    };

    const startEditing = (id, currentTitle, currentDescription) => {
        setEditing(id);
        setUpdatedActivity(currentTitle);
        setUpdatedDescription(currentDescription);
    };

    return (
        <div className={Styles.ancestorContainer}>
            <div className={Styles.headerContainer}>
                <h1>Fitness Activities</h1>
                <span>
                    <input
                        className={Styles.activityInput}
                        type='text'
                        name='New Activity'
                        placeholder='Title'
                        value={newActivity}
                        onChange={(event) => setNewActivity(event.target.value)}
                    />
                    <input
                        className={Styles.activityInput}
                        type='text'
                        name='New Description'
                        placeholder='Description'
                        value={newDescription}
                        onChange={(event) => setNewDescription(event.target.value)}
                    />
                    <button
                        id='addButton'
                        name='add'
                        className={Styles.addButton}
                        onClick={addActivity}
                    >
                        + New Activity
                    </button>
                </span>
            </div>
            <div id='activityContainer' className={Styles.activityContainer}>
                {loading ? (
                    <p style={{ color: 'white' }}>Loading...</p>
                ) : activitiesData.length > 0 ? (
                    activitiesData.map((entry) => (
                        <div key={entry._id} className={Styles.activity}>
                            <span className={Styles.infoContainer}>
                                {editing === entry._id ? (
                                    <input
                                        type='text'
                                        value={updatedActivity}
                                        onChange={(event) => setUpdatedActivity(event.target.value)}
                                    />
                                ) : (
                                    <span>{entry.title}</span>
                                )}
                            </span>
                            {editing === entry._id ? (
                                <input
                                    type='text'
                                    value={updatedDescription}
                                    onChange={(event) => setUpdatedDescription(event.target.value)}
                                />
                            ) : (
                                <p>{entry.description}</p>
                            )}
                            <span style={{ cursor: 'pointer' }} onClick={() => deleteActivity(entry._id)}>
                                Delete
                            </span>
                            {editing === entry._id ? (
                                <button onClick={() => updateActivity(entry._id)}>Save</button>
                            ) : (
                                <button onClick={() => startEditing(entry._id, entry.title, entry.description)}>Edit</button>
                            )}
                        </div>
                    ))
                ) : (
                    <p className={Styles.noActivityMessage}>No activities available. Please add a new activity.</p>
                )}
            </div>
        </div>
    );
}
