import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWorkout, selectWorkout } from "../app/features/workoutSlice";
import { selectUserAuth } from "../app/features/AuthContext";
import axios from "axios";
import "./Home.css";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  // const [workouts, setWorkouts] = useState(null);
  const workouts = useSelector(selectWorkout);
  const user = useSelector(selectUserAuth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllWorkouts = async () => {
      const response = await axios.get("/api/workouts", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.data;

      if (response.status === 200) {
        // dispatch the new workouts
        dispatch(getWorkout(data));
      }
    };

    if (user) {
      fetchAllWorkouts();
    }
  }, [dispatch, user]);

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
