"use client";

import { useState } from "react";
import ExerciseModal from "./exercise-modal";
import { Heading, Center, VStack, Button } from "@chakra-ui/react";
import ExerciseItem from "./exercise-item";
import Exercise from "./exercise-modal";

export interface Set {
  setNumber: number;
  weight: number;
  reps: number;
}

export interface Exercise {
  id: number;
  exercise_name: string | null;
  description: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface WorkoutExercise {
  exercise: Exercise;
  sets: Set[];
}

export default function AddWorkout() {
  const [workout_exercises, setWorkoutExercises] = useState<WorkoutExercise[]>(
    []
  );
  const [showModal, setShowModal] = useState<Boolean>(false);

  const addWorkoutExercise = (exercise: Exercise) => {
    const workout_exercise = {
      exercise: exercise,
      sets: [],
    };
    setWorkoutExercises([...workout_exercises, workout_exercise]);
    setShowModal(false);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const removeExercise = (index: number) => {
    const updatedExercises = [...workout_exercises];
    updatedExercises.splice(index, 1);
    setWorkoutExercises(updatedExercises);
  };

  const addSet = (index: number, set: Set) => {
    const updated_exercises = [...workout_exercises];
    updated_exercises[index].sets.push(set);
    setWorkoutExercises(updated_exercises);
  };

  const removeSet = (index: number, setIndex: number) => {
    const updated_exercises = [...workout_exercises];
    console.log(updated_exercises);
    console.log(setIndex);
    updated_exercises[index].sets.splice(setIndex, 1);
    setWorkoutExercises(updated_exercises);
    console.log(workout_exercises);
  };

  const setSetWeight = (index: number, setIndex: number, weight: number) => {
    const updated_exercises = [...workout_exercises];
    updated_exercises[index].sets[setIndex].weight = weight;
    setWorkoutExercises(updated_exercises);
  };

  const setSetReps = (index: number, setIndex: number, reps: number) => {
    const updated_exercises = [...workout_exercises];
    updated_exercises[index].sets[setIndex].reps = reps;
    setWorkoutExercises(updated_exercises);
  };

  const finishWorkout = async () => {
    try {
      const response = await fetch("/workouts/add/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({'workout_exercises': workout_exercises}),
      });
      if (response.ok) {
        console.log("Workout added successfully");
      } else {
        console.log("Failed to add workout");
      }
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <Center>
      <VStack spacing={5}>
        <Heading as="h1" size="xl">
          Workout Tracker
        </Heading>
        {workout_exercises.map((exercise, index) => (
          <ExerciseItem
            key={index}
            exercise={exercise}
            index={index}
            removeExercise={removeExercise}
            addSet={addSet}
            removeSet={removeSet}
            setSetWeight={setSetWeight}
            setSetReps={setSetReps}
          />
        ))}
        <Button colorScheme="teal" onClick={() => setShowModal(true)}>
          Add Exercise
        </Button>
        {showModal && (
          <ExerciseModal
            addWorkoutExercise={addWorkoutExercise}
            toggleModal={toggleModal}
          />
        )}
        <Button colorScheme="blue" onClick={() => finishWorkout()}>
          Finish Workout
        </Button>
      </VStack>
    </Center>
  );
}
