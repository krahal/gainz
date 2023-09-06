import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { PostgrestError } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { WorkoutExercise, Set } from '../page'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
    try {
        // Create a Supabase client configured to use cookies
        const supabase = createRouteHandlerClient({ cookies })

        // Create and insert a new workout into the db
        const { data: user_response } = await supabase.auth.getUser()
        if (user_response.user == null) {
            throw new Error("Invalid user");
        }
        const workout = {
            user_id: user_response.user.id,
            workout_name: new Date().toLocaleDateString() + " workout",
        }
        const { data: workoutData, error: workoutError } = await supabase
            .from('workouts')
            .insert(workout)
            .select()
        if (workoutError) {
            throw workoutError;
        }
        // get workout_id for workout_exercises
        const workout_id = workoutData[0]["id"]

        // Extract workout_exercises from the request body
        const {workout_exercises} = await req.json()

        // update workout_exercises with workout_id
        const updatedWorkoutExercises = [].concat(...workout_exercises.map((exercise: WorkoutExercise) => {
            return exercise.sets.map((set: Set) => {
                return {
                    exercise_id: exercise.exercise.id,
                    reps: set.reps,
                    set_number: set.setNumber,
                    weight_lb: set.weight,
                    workout_id: workout_id
                }
            });
        }));

        // Insert list of workout_exercises into the database
        const { data: workoutExerciseData, error: workoutExerciseError } = await supabase
            .from('workout_exercises')
            .insert(updatedWorkoutExercises)
            .select()

        if (workoutExerciseError) {
            throw workoutExerciseError;
        }

        return new NextResponse(JSON.stringify({ message: 'Successfully added workout' }), {
            status: 201,
        });
    } catch (error) {
        console.error('Error adding workout:', (error as PostgrestError).message);
        return new NextResponse(JSON.stringify({ error: 'Unable to add workout' }), {
            status: 500,
        });
    }
}