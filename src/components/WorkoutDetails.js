import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteWorkout, updateWorkout } from "../app/features/workoutSlice";
import { selectUserAuth } from "../app/features/AuthContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { compareAsc, format } from "date-fns";
import "./WorkoutDetails.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import { capitalizeFirstLetter } from "../utils/capFirstLetter";

const WorkoutDetails = ({ workout }) => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUserAuth);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      `https://a1fitness-app-frontend.herokuapp.com/api/workouts/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log(`Deleting workout: ${data}`);
      dispatch(deleteWorkout(data));
    }
  };

  const openModal = async () => {
    setModal(true);
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

      <div className="workoutButtons">
        <DeleteOutlinedIcon variant="contained" onClick={handleClick} />
        <EditIcon variant="contained" onClick={openModal} />
      </div>

      {modal ? <ModalTest workout={workout} /> : ""}
    </div>
  );
};

export default WorkoutDetails;

function ModalTest({ workout }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUserAuth);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);

  const label = { inputProps: { "aria-label": "Track Calories Burned" } };

  const handleEditWorkout = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    const response = await fetch(
      `https://a1fitness-app-frontend.herokuapp.com/api/workouts/${workout._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Access-Control-Allow-Methods": "*",
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log(`Updating workout: ${data}`);
      dispatch(updateWorkout(data));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (!user) {
  //     setError("You must be logged");
  //     return;
  //   }

  //   const workout = { title, load, reps, sets };

  //   const response = await fetch(
  //     `https://a1fitness-app-frontend.herokuapp.com/api/workouts`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(workout),
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );

  //   const json = await response.json();

  //   if (!response.ok) {
  //     setError(json.error);
  //     setEmptyFields(json.emptyFields);
  //   }

  //   if (response.ok) {
  //     setTitle("");
  //     setLoad("");
  //     setReps("");
  //     setSets("");
  //     setError(null);
  //     setEmptyFields([]);
  //     console.log("new workout added ", json);

  //     dispatch(createWorkout(json));
  //   }
  // };

  return (
    <div>
      <form className="create" onSubmit={(e) => handleEditWorkout(e)}>
        <h3>Add a new Workout</h3>

        <label>Excersize Title: </label>

        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />

        <label>Load (lbs):</label>
        <input
          type="text"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />

        <label>Reps:</label>
        <input
          type="text"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />

        <label>Sets</label>
        <input
          type="number"
          onChange={(e) => setSets(e.target.value)}
          value={sets}
          className={emptyFields.includes("sets") ? "error" : ""}
        />

        <div>
          <Switch {...label} label="Track Calories Burned" />
          <Select
            labelId="calories-dropDown"
            id="calories-dropDown"
            label="calories-dropDown"
            // onChange={handleChange}
          >
            <label>Reps:</label>
            <input
              type="text"
              onChange={(e) => setReps(e.target.value)}
              value={reps}
              className={emptyFields.includes("reps") ? "error" : ""}
            />

            <label>Sets</label>
            <input
              type="number"
              onChange={(e) => setSets(e.target.value)}
              value={sets}
              className={emptyFields.includes("sets") ? "error" : ""}
            />
          </Select>
        </div>

        <button>Save Workout</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
}
