<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkout, selectWorkout } from "../app/features/workoutSlice";
import axios from "axios";
import "./Home.css";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const workouts = useSelector(selectWorkout);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllWorkouts = async () => {
      const response = await axios.get("/api/workouts");
      const data = await response.data;

      console.log(data);

      if (response.status === 200) {
        // dispatch the new workouts
        dispatch(getWorkout(data));
      }
    };

    fetchAllWorkouts();
  }, [dispatch]);

  // console.log(workout)

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
=======
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getWorkout, selectWorkout } from '../features/workoutSlice';
import axios from "axios"
import "./Home.css"
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const workouts = useSelector(selectWorkout);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllWorkouts = async() => {
      const response = await axios.get('/api/workouts')
      const data = await response.data

      console.log(data)

      if (response.status === 200) {
        // dispatch the new workouts
        dispatch(getWorkout(data))
      }
    }

    fetchAllWorkouts()
  }, [dispatch])

  // console.log(workout)

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => {
          return (
            <WorkoutDetails key={workout._id}  workout={workout}/>
          )
        })}
      </div>
      <WorkoutForm />
    </div>
  )
}

export default Home;
>>>>>>> 7154eaf8395e3cde691727c07bd657214ecdb89b
