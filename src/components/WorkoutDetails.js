import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout } from "../app/features/workoutSlice";
import { selectUserAuth } from "../app/features/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import "./WorkoutDetails.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

const WorkoutDetails = ({ workout }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserAuth);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`/api/workouts/${workout._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      console.log(`Deleting workout: ${data}`);
      dispatch(deleteWorkout(data));
    }
  };

  return (
    <div className="workOutDetails">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {workout.reps}
      </p>
      <p>
        <strong>Sets: </strong>
        {workout.sets}
      </p>
      <p>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>

      <DeleteOutlinedIcon variant="contained" onClick={handleClick} />
    </div>
  );
};

export default WorkoutDetails;
