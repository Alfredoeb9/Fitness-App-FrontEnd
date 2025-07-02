export interface Workout {
    _id?: string;
    title: string;
    load: number;
    reps: number;
    sets: number;
    controlled?: boolean;
    duration?: number;
    weight?: number;
    workoutType?: string;

}