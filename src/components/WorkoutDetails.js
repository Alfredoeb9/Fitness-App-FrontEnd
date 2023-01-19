import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout } from "../app/features/workoutSlice";
import { selectUserAuth } from "../app/features/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { compareAsc, format } from "date-fns";
import "./WorkoutDetails.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { capitalizeFirstLetter } from "../utils/capFirstLetter";

const WorkoutDetails = ({ workout }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserAuth);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(`${process.env.REACT_API_URL}${workout._id}`, {
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
      <h4 style={{ color: "goldenrod" }}>
        {capitalizeFirstLetter(workout.title)}
      </h4>
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
      <p>{format(new Date(workout.createdAt), "yyyy-MM-dd")}</p>

      <DeleteOutlinedIcon variant="contained" onClick={handleClick} />
    </div>
  );
};

export default WorkoutDetails;
