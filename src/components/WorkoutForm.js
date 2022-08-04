import axios from "axios"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { createWorkout } from "../features/workoutSlice"
import "./WorkoutForm.css"

const WorkoutForm = () => {
  const [ title, setTitle ] = useState('')
  const [ load, setLoad ] = useState('')
  const [ reps, setReps ] = useState('')
  const [ error, setError ] = useState('')
  const dispatch = useDispatch();

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
    }

    if (response.ok) {
      setTitle("")
      setLoad("")
      setReps("")
      setError(null)
      console.log("new workout added ", json)

      dispatch(createWorkout(json))
    }


    // const response = await axios.post('/api/workouts', {
    //   "data": {
    //     title: workout.title,
    //     load: workout.load,
    //     reps: workout.reps,
    //   },
        
      
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then(response => {
    //   console.log(response)
    // }).catch(error => {
    //   console.log(error)
    // })

    // const data = await response.data

    // if (!response.data == "") {
    //   setError(data.error)
    // }

    // if (response.data) {
    //   setTitle("")
    //   setLoad("")
    //   setReps("")
    //   setError(null)
    //   console.log("new workout added ", data)
    // }
  }

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Excersize Title: </label>

      <input 
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <label>Load (lbs):</label>
      <input 
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
      />

      <label>Reps:</label>
      <input 
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
      />

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm