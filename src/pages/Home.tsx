import React from "react";
import { useQuery } from "react-query";
import { getWorkout } from "../app/features/workoutSlice";
import { selectUserAuth } from "../app/features/AuthContext";
import axios from "axios";
import "./Home.css";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAppDispatch, useAppSelector } from "../app/hooks";

const Home = () => {
  const user = useAppSelector(selectUserAuth);
  const dispatch = useAppDispatch();
  const { isLoading, data, error } = useQuery(["workouts"], {
    queryFn: async () => {
      let response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/workouts`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (!response)
        throw new Error(
          "Something went wrong with retrieving your workouts! Please refresh"
        );

      const data = await response.data;

      return data;
    },

    onSuccess: (data) => {
      dispatch(getWorkout(data));
    },
    enabled: !!user,
  });

  // const fetchAllWorkouts = async () => {
  //   console.log('this is getting called')
  //   const response = await axios.get(
  //     `${process.env.REACT_APP_API_URL}/api/workouts`,
  //     {
  //       headers: {
  //         Authorization: `Bearer ${user.token}`,
  //       },
  //     }
  //   );
  //   const data = await response.data;

  //   if (response.status === 200) {
  //     // dispatch the new workouts
  //     console.log("data", data)
  //     // query.data = data
  //     dispatch(getWorkout(data));
  //     return data;
  //   }
  // };

  // // Queries
  // const query = useQuery('todos', fetchAllWorkouts);

  // useEffect(() => {

  //   console.log("query", query)
  //   if (user) query;
  // }, [user, query.status])

  // useEffect(() => {

  //   if (user !== undefined || user !== null || user.length !== 0) {
  //     fetchAllWorkouts();
  //   } else {
  //     // navigate("/login", { replace: true });
  //     // return <Navigate to="/welcome" state={{ from: location }} />;
  //     redirect("/welcome")
  //   }
  // }, [dispatch, user]);

  return (
    <div className="home">
      <div className="workouts">
        {data ? (
          data?.map((workout: any) => {
            return <WorkoutDetails key={workout._id} workout={workout} />;
          })
        ) : (
          <div>
            {error ? (
              <p className="error">{String(error)}</p>
            ) : (
              <p> Put Some new Workouts</p>
            )}
          </div>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
