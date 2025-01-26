import { create } from "zustand";
import { QuizType } from "../../types";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";

interface StoreState {
  quizzes: QuizType[];
  index: number;
  selectedAnswer: string;
  totalPoints: number;
  points: number;
}

interface StoreActions extends StoreState {
  setQuizzes: (quizzes: QuizType[]) => void;
  nextIndex: () => void;
  setSelectedAnswer: (index: string) => void;
  addPoints: () => void;
  reset: () => void;
}

const initialState = {
  quizzes: [],
  index: 0,
  selectedAnswer: "",
  points: 1,
  totalPoints: 0,
};

export const useQuizStore = create<StoreState & StoreActions>((set) => ({
  ...initialState,
  setQuizzes: (quizzes) => {
    set({ quizzes, points: 100 / quizzes.length });
    sendQuizToFirebase(quizzes); // Send quiz to Firebase
  },
  nextIndex: () =>
    set((state) => ({
      index:
        state.index + 1 === state.quizzes.length
          ? state.index
          : state.index + 1,
      selectedAnswer: "",
    })),
  setSelectedAnswer: (selectedAnswer) => set({ selectedAnswer }),
  addPoints: () =>
    set((state) => ({ totalPoints: state.totalPoints + state.points })),
  reset: () =>
    set({
      ...initialState,
    }),
}));

async function sendQuizToFirebase(quiz: QuizType[]) {
  try {
    const docRef = await addDoc(collection(db, "quizzes"), { quiz });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}