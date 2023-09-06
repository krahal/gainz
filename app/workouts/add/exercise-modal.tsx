'use-client'

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Input,
    Divider,
    Box,
    CardBody,
    Card,
} from '@chakra-ui/react'
import { Exercise } from './page';
// import { Database } from '..../types/supabase'

interface ExerciseModalProps {
    addWorkoutExercise: (exercise: Exercise) => void
    toggleModal: () => void
}

const ExerciseModal: React.FC<ExerciseModalProps> = ({ addWorkoutExercise, toggleModal }) => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    const [search, setSearch] = useState<string>('');
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const supabase = createClientComponentClient()

    useEffect(() => {
        const fetchExercises = async () => {
            const { data: exercises } = await supabase.from('exercises').select();
            const exerciseList = exercises?.map(exercise => {
                return {
                    id: exercise.id,
                    exercise_name: exercise.exercise_name,
                    description: exercise.description,
                    createdAt: exercise.created_at,
                    updatedAt: exercise.updated_at
                }
            });
            setExercises(exerciseList || []);
        };

        fetchExercises();
    }, []);

    const handleSelectExercise = (exercise: Exercise) => {
        setSelectedExercise(exercise);
        addWorkoutExercise(exercise);
    };

    const filteredExercises = exercises.filter((exercise) =>
        exercise.exercise_name?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Modal isOpen={true} onClose={() => setSelectedExercise(null)}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Search for an exercise</ModalHeader>
                <ModalCloseButton onClick={toggleModal} />
                <ModalBody>
                    <Input
                        type="text"
                        placeholder="Search for an exercise"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Card>
                        {filteredExercises.map((exercise, index) => (
                            <Box key={exercise.exercise_name} onClick={() => {
                                handleSelectExercise(exercise);
                                alert(`${exercise.exercise_name} selected!`);
                            }}>
                                <CardBody>
                                    {exercise.exercise_name}
                                </CardBody>
                                {index < filteredExercises.length - 1 && <Divider />}
                            </Box>
                        ))}
                    </Card>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ExerciseModal;