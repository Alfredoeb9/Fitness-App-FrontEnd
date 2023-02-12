import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import { calculateCaloriesBurned } from "../utils/calculateCaloriesBurned";

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
    if (modal) {
      setModal(false);
    } else {
      setModal(true);
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

      <div className="trackCalories-ui">
        <h2>
          Calories Burned: <span>{calculateCaloriesBurned(workout)}</span>
        </h2>
        <p>
          <strong>Activity: </strong>
          {workout.activity}
        </p>
        <p>
          <strong>Duration: </strong>
          {workout.duration}
        </p>
        <p>
          <strong>Current Weight: </strong>
          {workout.currentWeight}
        </p>
      </div>

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
  const [activity2, setActivity2] = useState("");
  const [duration2, setDuration2] = useState("");
  const [currentWeight2, setCurrentWeight2] = useState("");
  const [checked2, setChecked2] = useState(false);

  const label = { inputProps: { "aria-label": "Track Calories Burned" } };

  const handleCheckedChange = (event) => {
    setChecked2(event.target.checked);
  };

  const handleEditWorkout = async (e) => {
    e.preventDefault();
    if (!user) {
      return;
    }

    const workout = { title2, load2, reps2, sets2 };

    const response = await fetch(
      `https://a1fitness-app-frontend.herokuapp.com/api/workouts/${workout2._id}`,
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
      setActivity2("");
      setDuration2("");
      setCurrentWeight2("");
      setEmptyFields2([]);
      toast("Workout Updated...!");
      dispatch(updateWorkout(json));
      setModal(false);
    }
  };

  const handleTrackActivity = (e) => {
    e.preventDefault();

    setActivity2(e.target.value);
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
          <label>Track Calories?</label>
          <Switch
            label="Track Calories Burned"
            checked={checked2}
            onChange={handleCheckedChange}
            inputProps={{ "aria-label": "controlled" }}
          />
          {/* {checked ? ( */}
          <div className={checked2 ? "calories-dropDown" : "hide-messages"}>
            <label>Search and Select Activity</label>
            <select
              name="cars"
              id="cars"
              onChange={(e) => handleTrackActivity(e)}
            >
              <option
                className="tt-suggestion tt-selectable"
                value={"Aerobic dancing (high impact)"}
              >
                Aerobic dancing (high impact)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Aerobic dancing (low impact)"}
              >
                Aerobic dancing (low impact)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Baseball/softball"}
              >
                Baseball/softball
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Basketball"}
              >
                Basketball
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Beach volleyball"}
              >
                Beach volleyball
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Bodyweight exercises (moderate effort)"}
              >
                Bodyweight exercises (moderate effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Bodyweight exercises (vigorous effort)"}
              >
                Bodyweight exercises (vigorous effort)
              </option>
              <option className="tt-suggestion tt-selectable" value={"Boxing"}>
                Boxing
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Cycling (fast)"}
              >
                Cycling (fast)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Cycling (moderate)"}
              >
                Cycling (moderate)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Cycling (slow)"}
              >
                Cycling (slow)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Football"}
              >
                Football
              </option>
              <option className="tt-suggestion tt-selectable" value={"Golf"}>
                Golf
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Gymnastics"}
              >
                Gymnastics
              </option>
              <option className="tt-suggestion tt-selectable" value={"Hiking"}>
                Hiking
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Jumping rope (fast)"}
              >
                Jumping rope (fast)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Jumping rope (moderate)"}
              >
                Jumping rope (moderate)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Jumping rope (slow)"}
              >
                Jumping rope (slow)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={
                  "Martial arts (jiu-jitsu, judo, karate, kickboxing, taekwondo)"
                }
              >
                Martial arts (jiu-jitsu, judo, karate, kickboxing, taekwondo)
              </option>
              <option className="tt-suggestion tt-selectable" value={"Pilates"}>
                Pilates
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Race walking"}
              >
                Race walking
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Racquetball"}
              >
                Racquetball
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Rock climbing"}
              >
                Rock climbing
              </option>
              <option className="tt-suggestion tt-selectable" value={"Rugby"}>
                Rugby
              </option>
              <option className="tt-suggestion tt-selectable" value={"Running"}>
                Running
              </option>

              <option
                className="tt-suggestion tt-selectable"
                value={"Ski exercise machine"}
              >
                Ski exercise machine
              </option>
              <option className="tt-suggestion tt-selectable" value={"Skiing"}>
                Skiing
              </option>
              <option className="tt-suggestion tt-selectable" value={"Soccer"}>
                Soccer
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stair climber machine"}
              >
                Stair climber machine
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stationary cycling (light effort)"}
              >
                Stationary cycling (light effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stationary cycling (moderate effort)"}
              >
                Stationary cycling (moderate effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stationary cycling (vigorous effort)"}
              >
                Stationary cycling (vigorous effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stationary rowing (light effort)"}
              >
                Stationary rowing (light effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stationary rowing (moderate effort)"}
              >
                Stationary rowing (moderate effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stationary rowing (vigorous effort)"}
              >
                Stationary rowing (vigorous effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Stretching"}
              >
                Stretching
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Surfing (body or board)"}
              >
                Surfing (body or board)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Swimming (backstroke)"}
              >
                Swimming (backstroke)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Swimming (breaststroke)"}
              >
                Swimming (breaststroke)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Swimming (butterfly)"}
              >
                Swimming (butterfly)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Swimming (freestyle, fast effort)"}
              >
                Swimming (freestyle, fast effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Swimming (freestyle, moderate effort)"}
              >
                Swimming (freestyle, moderate effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Table tennis"}
              >
                Table tennis
              </option>
              <option className="tt-suggestion tt-selectable" value={"Tai chi"}>
                Tai chi
              </option>
              <option className="tt-suggestion tt-selectable" value={"Tennis"}>
                Tennis
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Volleyball"}
              >
                Volleyball
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Walking (brisk)"}
              >
                Walking (brisk)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Walking (moderate)"}
              >
                Walking (moderate)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Walking (slow)"}
              >
                Walking (slow)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Walking (very brisk)"}
              >
                Walking (very brisk)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Water aerobics"}
              >
                Water aerobics
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Water polo"}
              >
                Water polo
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Weightlifting (moderate effort)"}
              >
                Weightlifting (moderate effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Weightlifting (vigorous effort)"}
              >
                Weightlifting (vigorous effort)
              </option>
              <option
                className="tt-suggestion tt-selectable"
                value={"Wrestling"}
              >
                Wrestling
              </option>
              <option className="tt-suggestion tt-selectable" value={"Yoga"}>
                Yoga
              </option>
            </select>

            <label>Enter Duration (min)</label>
            <input
              type="number"
              onChange={(e) => setDuration2(e.target.value)}
              value={duration2}
            />

            <label>Current Weight (lbs)</label>
            <input
              type="number"
              onChange={(e) => setCurrentWeight2(e.target.value)}
              value={currentWeight2}
            />
          </div>
          {/* ) : (
          ""
        )} */}
        </div>

        <button>Save Workout</button>

        {error2 && <div className="error">{error2}</div>}
        <ToastContainer />
      </form>
    </div>
  );
}
