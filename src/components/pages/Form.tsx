import { Dispatch, SetStateAction, useState } from "react";
import TabComponent from "@/components/shared/TabComponent";
import FileNote from "@/components/pages/FileNote";
import TextNote from "@/components/pages/TextNote";
import FormField from "@/components/pages/FormField";

export default function Form({
  onSubmit,
  timer,
  onSetTimer,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  timer: number;
  onSetTimer: (index: number) => void;
}) {
  const [step, setStep] = useState(0);

  return (
    <FormField>
      <form onSubmit={onSubmit}>
        <header className="text-center mb-10">
          <h2 className="text-lg font-semibold mb-1">Upload a file</h2>
        </header>
        <div className="flex flex-col gap-3 mb-4">
            <label htmlFor="topic" className="block mb-3">
            <div className="flex items-center justify-between gap-2 mb-3">
              <span className="inline-flex text-sm font-semibold text-zinc-600">
              Topic
              </span>
              <FileNote />
            </div>
              <div className="flex items-center"></div>
              <input
                type="text"
                name="topic"
                id="topic"
                placeholder="Web Development or Database Administration"
                className="font-geistmono appearance-none w-full p-3 border border-black placeholder-zinc-400 text-zinc-700 rounded-md focus:outline-none focus:ring-zinc-300 text-sm"
              />
            </label>
        </div>

        <fieldset className="grid md:grid-cols-2 grid-cols-1 gap-x-10 gap-8 mb-10">
          <label htmlFor="difficulty">
            <p className="text-sm mb-2 text-zinc-500">
              Difficulty Level
            </p>
            <div>
              {["easy", "moderate", "hard"].map((level) => (
                <label key={level} className="block text-sm font-medium text-zinc-700">
                  <input
                    type="radio"
                    name="difficulty"
                    value={level}
                    className="mr-2"
                  />
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </label>
              ))}
            </div>
          </label>

          <label htmlFor="quizCount">
            <p className="text-sm mb-2 text-zinc-500">
              How many items do you want to generate?
            </p>
            <div>
              {[2, 5, 10, 15, 20].map((count) => (
                <label key={count} className="block text-sm font-medium text-zinc-700">
                  <input
                    type="radio"
                    name="quizCount"
                    value={count}
                    className="mr-2"
                  />
                  {count}
                </label>
              ))}
            </div>
          </label>

          <label htmlFor="timer">
            <p className="text-sm mb-2 text-zinc-500">Completion Time (Higher the time, the better result)</p>
            <div>
              {[1, 5, 10, 15].map((time) => (
                <label key={time} className="block text-sm font-medium text-zinc-700">
                  <input
                    type="radio"
                    name="timer"
                    value={time}
                    checked={timer === time}
                    onChange={(e) => onSetTimer(+e.target.value)}
                    className="mr-2"
                  />
                  {time} min
                </label>
              ))}
            </div>
          </label>
        </fieldset>

        <button className="flex items-center justify-center w-full text-center max-w-lg mx-auto duration-200 text-sm gap-x-2 bg-primary hover:bg-secondary text-white font-medium px-4 py-3 rounded-full">
          Generate Quiz
        </button>
      </form>
    </FormField>
  );
}
