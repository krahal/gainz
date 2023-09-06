import React, { useState } from "react";
import { Box, Button, Heading, Text, Flex, Input } from "@chakra-ui/react";
import { WorkoutExercise, Set } from "./page";

interface ExerciseItemProps {
  exercise: WorkoutExercise;
  index: number;
  removeExercise: (index: number) => void;
  addSet: (index: number, set: Set) => void;
  removeSet: (index: number, setIndex: number) => void;
  setSetWeight: (index: number, setIndex: number, weight: number) => void;
  setSetReps: (index: number, setIndex: number, reps: number) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({
  exercise,
  index,
  removeExercise,
  addSet,
  removeSet,
  setSetWeight,
  setSetReps,
}) => {
  const _addSet = () => {
    const newSet = { setNumber: exercise.sets.length + 1, weight: 0, reps: 0 };
    addSet(index, newSet);
  };

  const _removeSet = (setIndex: number) => {
    removeSet(index, setIndex);
  };

  const _setSetWeight = (setIndex: number, weight: number) => {
    setSetWeight(index, setIndex, weight);
  };

  const _setSetReps = (setIndex: number, reps: number) => {
    setSetReps(index, setIndex, reps);
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      padding="6"
      mb="4"
      minWidth="400px"
    >
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md" textAlign="left" mb="0" alignSelf="center">
          {exercise.exercise.exercise_name}
        </Heading>
        <Button
          colorScheme="red"
          size="sm"
          onClick={() => removeExercise(index)}
        >
          X
        </Button>
      </Flex>
      <Flex direction="column" justify="center" align="center" mb="4">
        <table>
          <thead>
            <tr>
              <th>Set</th>
              <th>Weight</th>
              <th>Reps</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {exercise.sets.map((set, setIndex) => (
              <tr key={setIndex}>
                <td>{set.setNumber}</td>
                <td>
                  <Input
                    type="number"
                    onChange={(e) =>
                      _setSetWeight(setIndex, parseInt(e.target.value))
                    }
                    value={set.weight}
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    onChange={(e) =>
                      _setSetReps(setIndex, parseInt(e.target.value))
                    }
                    value={set.reps}
                  />
                </td>
                <td>
                  <Button
                    colorScheme="red"
                    onClick={() => _removeSet(setIndex)}
                  >
                    Delete {setIndex}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Flex>
      <Flex justifyContent="center" alignItems="center" height="100%">
        <Button colorScheme="teal" onClick={_addSet}>
          Add Set
        </Button>
      </Flex>
    </Box>
  );
};

export default ExerciseItem;
