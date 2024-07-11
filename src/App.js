import React, { useState } from 'react';
import './App.css';

const workoutTypes = {
    'Running': 10,
    'Cycling': 8,
    'Weight lifting': 6,
    'Jumping jacks': 12,
    'Plank': 4
};

const intensityLevels = {
    'slow': 0.8,
    'medium': 1,
    'intense': 1.2
};

const workoutImages = {
    'Running': 'https://hips.hearstapps.com/hmg-prod/images/running-track-1667904802.jpg?crop=0.668xw:1.00xh;0.0737xw,0&resize=1200:*',
    'Cycling': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRojYLPHyZSdib7HVum9UNMT9VGBfHYYHnikQ&s',
    'Weight lifting': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV36vg3YFDBjYPqH7wZYl9OMc6uF-WfS_p6Q&s',
    'Jumping jacks': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlECUUtGf9-0uZHJw2U-XOQ1cP3D1bdUgWYw&s',
    'Plank': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaXU2VOusNl6L3TFrxmdxXNYFagP7Zu0v2tQ&s'
};

function App() {
    const [currentPage, setCurrentPage] = useState('Signin');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fitnessEntries, setFitnessEntries] = useState([]);
    const [showAddEntryForm, setShowAddEntryForm] = useState(false);
    const [editEntryIndex, setEditEntryIndex] = useState(null);

    const handleSignIn = () => {
        
        console.log('Sign In clicked');
        setCurrentPage('fitness');
    };

    const handleSignUp = () => {
        
        console.log('Sign Up clicked');
        setCurrentPage('Signin');
    };

    const handleSignOut = () => {
        
        console.log('Sign Out clicked');
        setCurrentPage('Signin');
        setUsername('');
        setPassword('');
    };

    const handleAddOrUpdateEntry = (newEntry) => {
        if (editEntryIndex !== null) {
            const updatedEntries = [...fitnessEntries];
            updatedEntries[editEntryIndex] = newEntry;
            setFitnessEntries(updatedEntries);
            setEditEntryIndex(null);
        } else {
            setFitnessEntries([...fitnessEntries, newEntry]);
        }
        setShowAddEntryForm(false);
    };

    const handleDeleteEntry = (index) => {
        setFitnessEntries(fitnessEntries.filter((_, i) => i !== index));
    };

    const handleEditEntry = (index) => {
        setEditEntryIndex(index);
        setShowAddEntryForm(true);
    };

    if (currentPage === 'Signin') {
        return (
            <div className="App">
                <header>
                    <h1>Fitness Tracker App</h1>
                </header>
                <div className="signin-container">
                    <input type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={handleSignIn}>
                        SIGN IN
                    </button>
                    <button onClick={() => setCurrentPage('Signup')}>
                        SIGN UP
                    </button>
                </div>
            </div>
        );
    } else if (currentPage === 'Signup') {
        return (
            <div className="App">
                <header>
                    <h1>Fitness Tracker App</h1>
                </header>
                <div className="signin-container">
                    <input type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                    <input type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" onClick={handleSignUp}>
                        SIGN UP
                    </button>
                    <button onClick={() => setCurrentPage('Signin')}>
                        SIGN IN
                    </button>
                </div>
            </div>
        );
    } else if (currentPage === 'fitness') {
        return (
            <div className="App">
                <header>
                    <h1>Fitness Tracker</h1>
                    <button className="signout-button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                </header>
                <FitnessHistory entries={fitnessEntries}
                    onDeleteEntry={handleDeleteEntry}
                    onEditEntry={handleEditEntry}
                />
                <button className="add-entry-button" onClick={() => setShowAddEntryForm(true)}>
                    Add Entry
                </button>
                {showAddEntryForm && (
                    <FitnessEntryForm onAddOrUpdateEntry={handleAddOrUpdateEntry}
                        entry={editEntryIndex !== null ? fitnessEntries[editEntryIndex] : null}
                    />
                )}
            </div>
        );
    }
}

function FitnessEntryForm({ onAddOrUpdateEntry, entry }) {
    const [activityName, setActivityName] = useState(entry ? entry.activityName : 'Running');
    const [duration, setDuration] = useState(entry ? entry.duration : '');
    const [intensity, setIntensity] = useState(entry ? entry.intensity : 'medium');
    const [activityDate, setActivityDate] = useState(entry ? entry.activityDate : new Date().toISOString().split('T')[0]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = {
            activityName,
            caloriesBurned: calculateCalories(activityName, duration, intensity),
            duration,
            intensity,
            activityDate,
        };
        onAddOrUpdateEntry(newEntry);
        resetForm();
    };

    const resetForm = () => {
        setActivityName('Running');
        setDuration('');
        setIntensity('medium');
        setActivityDate(new Date().toISOString().split('T')[0]);
    };

    const calculateCalories = (activityName, duration, intensity) => {
        const caloriesPerMinute = workoutTypes[activityName];
        const intensityMultiplier = intensityLevels[intensity];
        return Math.round(caloriesPerMinute * duration * intensityMultiplier);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{entry ? 'Edit Fitness Entry' : 'Add New Fitness Entry'}</h2>
            <div>
                <label htmlFor="activityName">Activity Name:</label>
                <select id="activityName"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}>
                    {Object.keys(workoutTypes).map((workout) => (
                        <option key={workout} value={workout}>{workout}</option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="duration">Duration (minutes):</label>
                <input type="number"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    required
                />
            </div>
            <div>
                <label htmlFor="intensity">Intensity:</label>
                <select id="intensity"
                    value={intensity}
                    onChange={(e) => setIntensity(e.target.value)}>
                    <option value="slow">Slow</option>
                    <option value="medium">Medium</option>
                    <option value="intense">Intense</option>
                </select>
            </div>
            <div>
                <label htmlFor="activityDate">Date:</label>
                <input type="date"
                    id="activityDate"
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                    required
                />
            </div>
            <button type="submit">{entry ? 'Update Entry' : 'Add Entry'}</button>
        </form>
    );
}

function FitnessHistory({ entries, onDeleteEntry, onEditEntry }) {
    return (
        <div>
            <h2>Fitness History</h2>
            <ul>
                {entries.map((entry, index) => (
                    <li key={index}>
                        <img src={workoutImages[entry.activityName]}
                            alt={entry.activityName}
                            className="activity-image"
                        />
                        <div>
                            <h3>{entry.activityName}</h3>
                            <p>Calories Burned: {entry.caloriesBurned}</p>
                            <p>Duration: {entry.duration} minutes</p>
                            <p>Intensity: {entry.intensity}</p>
                            <p>Date: {entry.activityDate}</p>
                            <button className="delete-btn" onClick={() => onDeleteEntry(index)}>Delete</button>
                            <button onClick={() => onEditEntry(index)}>Edit</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
