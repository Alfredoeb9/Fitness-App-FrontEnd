export function calculateCaloriesBurned(workout) {
  let caloriesBurned = 0;
  let MET = 1;

  switch (workout.activity) {
    case "Beach volleyball":
    case "Basketball":
    case "Boxing":
    case "Cycling (fast)":
    case "Football":
    case "Rugby":
    case "Running":
    case "Skiing":
    case "Soccer":
    case "Water polo":
    case "Wrestling":
    case "Martial arts (jiu-jitsu, judo, karate, kickboxing, taekwondo)":
      MET = 10;
      break;
    case "Cycling (moderate)":
    case "Cycling (slow)":
    case "Jumping rope (fast)":
    case "Jumping rope (moderate)":
    case "Racquetball":
    case "Rock climbing":
    case "Surfing (body or board)":
    case "Volleyball":
      MET = 8;
      break;
    case "Aerobic dancing (high impact)":
    case "Jumping rope (slow)":
    case "Race walking":
    case "Water aerobics":
      MET = 6.5;
      break;
    case "Swimming (backstroke)":
    case "Swimming (breaststroke)":
    case "Swimming (butterfly)":
    case "Swimming (freestyle, fast effort)":
    case "Swimming (freestyle, moderate effort)":
    case "Walking (moderate)":
    case "Walking (slow)":
    case "Walking (very brisk)":
      MET = 6;
      break;
    case "Bodyweight exercises (vigorous effort)":
    case "Weightlifting (moderate effort)":
    case "Weightlifting (vigorous effort)":
    case "Hiking":
    case "Aerobic dancing (low impact)":
    case "Ski exercise machine":
    case "Stair climber machine":
    case "Stationary cycling (moderate effort)":
    case "Stationary cycling (vigorous effort)":
    case "Stationary rowing (moderate effort)":
    case "Stationary rowing (vigorous effort)":
    case "Walking (brisk)":
      MET = 5;
      break;
    case "Bodyweight exercises (moderate effort)":
    case "Golf":
    case "Stationary rowing (light effort)":
    case "Table tennis":
      MET = 4;
      break;
    case "Gymnastics":
    case "Pilates":
    case "Tai chi":
    case "Yoga":
      MET = 2;
      break;
    default:
      MET = 1;
  }

  //   if (workout.activity == "Aerobic dancing (high impact)") {
  //     MET = 6.5;
  //   } else if ()

  caloriesBurned =
    (workout.duration * (MET * 3.5 * (workout.currentWeight / 2.2))) / 200;

  return Math.round(caloriesBurned);
}
