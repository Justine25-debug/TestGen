"use client";

import { useQuizStore } from "@/store/quiz";
import FormField from "./FormField";
import Quiz from "./Quiz";
import { useFormStore } from "@/store/form";
import { useState, useEffect } from "react";
import ProgressBar from "../shared/ProgressBar";
import { useRouter } from 'next/navigation';
import FormContainer from "@/components/pages/FormContainer";
import Container from "@/components/shared/Container";


export default function QuizContainer() {
  const quizzes = useQuizStore((state) => state.quizzes);
  const [showAnswers, setShowAnswers] = useState(false);
  const [activeComponent, setActiveComponent] = useState<React.ReactNode>(null);
  const setStatus = useFormStore((state) => state.setStatus);
  const reset = useQuizStore((state) => state.reset);
  const router = useRouter();

  return (
    <FormField>
      <div>

        {quizzes.map((quiz, index) => (
          <div key={quiz.id} className="mb-8">
            <blockquote className="max-w-md mx-auto text-center font-semibold text-xl leading-relaxed text-zinc-700 tracking-tight mt-12">
              {quiz.question}
            </blockquote>

            <div className="flex flex-col gap-4 my-8">
              {Object.entries(quiz.options).map(([key, value]) => (
                <Quiz
                  key={`${quiz.id}-${key}`}
                  alpha={key}
                  text={value}
                  quiz={quiz}
                  showAnswers={showAnswers}
                />
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => setShowAnswers(true)}
          className="flex mx-auto mt-16 bg-primary hover:bg-secondary text-white text-center px-4 py-3 rounded-full duration-200"
        >
          Show Correct Answers
        </button>

        <button
          onClick={() => {
            setStatus("idle");
            reset();
            router.push("/");
          }}
          className="flex mx-auto mt-16 bg-primary hover:bg-secondary text-white text-center px-4 py-3 rounded-full duration-200"
        >
          Exit
        </button>

      </div>
    </FormField>
  );
}