export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      exercises: {
        Row: {
          created_at: string
          description: string | null
          exercise_name: string | null
          id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          exercise_name?: string | null
          id?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          exercise_name?: string | null
          id?: number
          updated_at?: string
        }
        Relationships: []
      }
      workout_exercises: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          exercise_id: number
          reps: number | null
          sets: number | null
          updated_at: string | null
          weight_lb: number | null
          workout_id: number
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          exercise_id?: number
          reps?: number | null
          sets?: number | null
          updated_at?: string | null
          weight_lb?: number | null
          workout_id?: number
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          exercise_id?: number
          reps?: number | null
          sets?: number | null
          updated_at?: string | null
          weight_lb?: number | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "workout_exercises_exercise_id_fkey"
            columns: ["exercise_id"]
            referencedRelation: "exercises"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workout_exercises_workout_id_fkey"
            columns: ["workout_id"]
            referencedRelation: "workouts"
            referencedColumns: ["id"]
          }
        ]
      }
      workouts: {
        Row: {
          created_at: string
          duration_minutes: number | null
          id: number
          updated_at: string
          user_id: string
          workout_name: string | null
        }
        Insert: {
          created_at?: string
          duration_minutes?: number | null
          id?: number
          updated_at?: string
          user_id: string
          workout_name?: string | null
        }
        Update: {
          created_at?: string
          duration_minutes?: number | null
          id?: number
          updated_at?: string
          user_id?: string
          workout_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workouts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
