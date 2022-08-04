import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createWorkout } from "../features/workoutSlice"
import "./WorkoutForm.css"

const WorkoutForm = () => {
  const dispatch = useDispatch();
  const [ title, setTitle ] = useState('')
  const [ load, setLoad ] = useState('')
  const [ reps, setReps ] = useState('')
  const [ error, setError ] = useState('')
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const workout = { title, load, reps }

    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }

    if (response.ok) {
      setTitle("")
      setLoad("")
      setReps("")
      setError(null)
      setEmptyFields([])
      console.log("new workout added ", json)

      dispatch(createWorkout(json))
    }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Excersize Title: </label>

      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Load (lbs):</label>
      <input 
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes('load') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input 
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes('reps') ? 'error' : ''}
      />

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm