
export enum FitnessGoal {
  WEIGHT_LOSS = 'Weight Loss',
  MUSCLE_GAIN = 'Muscle Gain',
  GENERAL_FITNESS = 'General Fitness'
}

export type DietPreference = 'Veg' | 'Non-Veg' | 'Vegan';
export type Lifestyle = 'Student' | 'Office Worker' | 'Athlete';

export interface UserProfile {
  age: number;
  gender: string;
  weight: number;
  height: number;
  goal: FitnessGoal;
  dietPreference: DietPreference;
  lifestyle: Lifestyle;
}

export interface Exercise {
  name: string;
  sets: string;
  reps: string;
  instruction: string;
  videoUrl?: string;
}

export interface DayPlan {
  day: string;
  title: string;
  exercises: Exercise[];
}

export interface Meal {
  title: string;
  description: string;
  calories: string;
}

export interface NutritionGuidance {
  dailyCalories: number;
  proteinGrams: number;
  fatsGrams: number;
  carbsGrams: number;
  proTip: string;
  waterIntakeLiters: number;
}

export interface FitnessPlan {
  workoutPlan: DayPlan[];
  dietPlan: {
    breakfast: Meal;
    lunch: Meal;
    snack: Meal;
    dinner: Meal;
  };
  nutritionGuidance: NutritionGuidance;
  safetyTips: string[];
  lifestyleTips: string[];
  motivation: string;
}

export interface GroundingSource {
  uri: string;
  title: string;
}

export interface FitnessPlanResult {
  plan: FitnessPlan;
  sources: GroundingSource[];
}
