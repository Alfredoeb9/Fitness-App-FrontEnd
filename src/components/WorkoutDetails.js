import { useDispatch } from "react-redux"
import { deleteWorkout } from "../features/workoutSlice"
import "./WorkoutDetails.css"

const WorkoutDetails = ({ workout}) => {
  const dispatch = useDispatch()

  const handleClick = async () => {
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: 'DELETE'
    })
    const data = await response.json()

    if(response.ok) {
      console.log(`Deleting workout: ${data}`)
      dispatch(deleteWorkout(data))
    }
  }

  return (
    <div className="workOutDetails">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>

      <span onClick={handleClick}>Delete</span>
    </div>
  )
}

export default WorkoutDetails;