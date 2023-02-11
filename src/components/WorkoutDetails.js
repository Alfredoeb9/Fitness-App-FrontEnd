import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
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

      {modal ? (
        <ModalTest workout2={workout} user={user} setModal={setModal} />
      ) : (
        ""
      )}
    </div>
  );
};

export default WorkoutDetails;

function ModalTest({ workout2, user, setModal }) {
  const dispatch = useDispatch();
  const location = useLocation();
  // const user = useSelector(selectUserAuth);
  const [title2, setTitle2] = useState("");
  const [load2, setLoad2] = useState("");
  const [reps2, setReps2] = useState("");
  const [sets2, setSets2] = useState(0);
  const [error2, setError2] = useState("");
  const [emptyFields2, setEmptyFields2] = useState([]);

  const label = { inputProps: { "aria-label": "Track Calories Burned" } };

  const handleEditWorkout = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    const workout = { title2, load2, reps2, sets2 };

    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout2._id}`,
      {
        method: "PUT",
        body: JSON.stringify(workout),
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "application/json",
          "Access-Control-Allow-Methods": "PUT",
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError2(json.error);
      setEmptyFields2(json.emptyFields);
    }

    if (response.ok) {
      setTitle2("");
      setLoad2("");
      setReps2("");
      setSets2("");
      setError2(null);
      setEmptyFields2([]);
      console.log(`Updating workout `, json);
      dispatch(updateWorkout(json));
      setModal(false);
    }

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
  };

  return (
    <div>
      <form className="create" onSubmit={(e) => handleEditWorkout(e)}>
        <h3>Add a new Workout</h3>

        <label>Excersize Title: </label>

        <input
          type="text"
          onChange={(e) => setTitle2(e.target.value)}
          value={title2}
          className={emptyFields2.includes("title") ? "error" : ""}
        />

        <label>Load (lbs):</label>
        <input
          type="text"
          onChange={(e) => setLoad2(e.target.value)}
          value={load2}
          className={emptyFields2.includes("load") ? "error" : ""}
        />

        <label>Reps:</label>
        <input
          type="text"
          onChange={(e) => setReps2(e.target.value)}
          value={reps2}
          className={emptyFields2.includes("reps") ? "error" : ""}
        />

        <label>Sets</label>
        <input
          type="number"
          onChange={(e) => setSets2(e.target.value)}
          value={sets2}
          className={emptyFields2.includes("sets") ? "error" : ""}
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
              onChange={(e) => setReps2(e.target.value)}
              value={reps2}
              className={emptyFields2.includes("reps") ? "error" : ""}
            />

            <label>Sets</label>
            <input
              type="number"
              onChange={(e) => setSets2(e.target.value)}
              value={sets2}
              className={emptyFields2.includes("sets") ? "error" : ""}
            />
          </Select>
        </div>

        <button>Save Workout</button>

        {error2 && <div className="error">{error2}</div>}
      </form>
    </div>
  );
}
