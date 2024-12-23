import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useQueryClient } from "react-query";
import Switch from "@mui/material/Switch";
import { createWorkout } from "../app/features/workoutSlice";
import { selectUserAuth } from "../app/features/AuthContext";
import "./WorkoutForm.css";
import "react-toastify/dist/ReactToastify.css";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const WorkoutForm = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUserAuth);
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState(0);
  const [error, setError] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [currentWeight, setCurrentWeight] = useState("");
  const [checked, setChecked] = useState(false);

  // Get QueryClient from the context
  const queryClient = useQueryClient();

  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const label = { inputProps: { "aria-label": "Track Calories Burned" } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged");
      return;
    }

    if (!title || !load || !reps || !sets) {
      setError("All fields are required");
      return;
    }

    const workout = {
      title,
      load,
      reps,
      sets,
      activity,
      duration,
      currentWeight,
    };

    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/api/workouts`,
      {
        method: "POST",
        body: JSON.stringify(workout),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }

    // if (response.ok) {
    setTitle("");
    setLoad("");
    setReps("");
    setSets(0);
    setError(null);
    setActivity("");
    setDuration("");
    setCurrentWeight("");
    setEmptyFields([]);

    dispatch(createWorkout(json));
    queryClient.invalidateQueries("workouts");
    // }

    toast("New Workout Created", {
      position: "bottom-right",
      autoClose: 5000,
      closeOnClick: true,
      draggable: false,
      type: "success",
      toastId: 4,
    });
  };

  const handleTrackActivity = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();

    setActivity(e.target.value);
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a new Workout</h3>

      <label>Excersize Title: </label>

      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        aria-label="title"
        className={emptyFields.includes("title") ? "error" : ""}
        required
      />

      <label>Load (lbs):</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        aria-label="load"
        className={emptyFields.includes("load") ? "error" : ""}
        required
      />

      <label>Reps:</label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        aria-label="reps"
        className={emptyFields.includes("reps") ? "error" : ""}
        required
      />

      <label>Sets</label>
      <input
        type="number"
        onChange={(e) => setSets(Number(e.target.value))}
        value={sets}
        aria-label="sets"
        className={emptyFields.includes("sets") ? "error" : ""}
        required
      />

      <div>
        <label>Track Calories?</label>
        <Switch
          checked={checked}
          onChange={handleCheckedChange}
          inputProps={{ "aria-label": "controlled" }}
        />
        {/* {checked ? ( */}
        <div className={checked ? "calories-dropDown" : "hide-messages"}>
          <label>Search and Select Activity</label>
          <select
            name="workout-dropdown"
            id="workout-dropdown"
            onChange={(e) => handleTrackActivity(e)}
            aria-label="workout-dropdown"
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
            <option className="tt-suggestion tt-selectable" value={"Football"}>
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
              aria-label="Weightlifting (vigorous effort)"
            >
              Weightlifting (vigorous effort)
            </option>
            <option className="tt-suggestion tt-selectable" value={"Wrestling"}>
              Wrestling
            </option>
            <option className="tt-suggestion tt-selectable" value={"Yoga"}>
              Yoga
            </option>
          </select>

          <label>Enter Duration (min)</label>
          <input
            type="number"
            onChange={(e) => setDuration(e.target.value)}
            value={duration}
            aria-label="duration"
          />

          <label>Current Weight (lbs)</label>
          <input
            type="number"
            onChange={(e) => setCurrentWeight(e.target.value)}
            value={currentWeight}
            aria-label="weight"
          />
        </div>
      </div>

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}

      <ToastContainer />
    </form>
  );
};

export default WorkoutForm;
