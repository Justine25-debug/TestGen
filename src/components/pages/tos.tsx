"use client";

import { useState } from "react";
import { db } from "@/app/firebase/config";
import { collection, addDoc } from "firebase/firestore";

export default function TosForm() {
  const [tosData, setTosData] = useState({
    subject: "",
    level: "",
    term: "",
    schoolYear: "",
    numberOfItems: "",
    weeklyBreakdown: [{
      week: "",
      competencies: "",
      hours: "",
      percent: "",
      items: "",
      remember: "",
      understand: "",
      apply: "",
      analyse: "",
      evaluate: "",
      create: "",
      testType: ""
    }],
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTosData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWeekChange = (index, e) => {
    const { name, value } = e.target;
    const updatedBreakdown = [...tosData.weeklyBreakdown];
    updatedBreakdown[index][name] = value;
    setTosData((prev) => ({ ...prev, weeklyBreakdown: updatedBreakdown }));
  };

  const addWeek = () => {
    setTosData((prev) => ({
      ...prev,
      weeklyBreakdown: [
        ...prev.weeklyBreakdown,
        {
          week: "",
          competencies: "",
          hours: "",
          percent: "",
          items: "",
          remember: "",
          understand: "",
          apply: "",
          analyse: "",
          evaluate: "",
          create: "",
          testType: ""
        }
      ]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const docRef = await addDoc(collection(db, "tosData"), tosData);
      console.log("Document written with ID: ", docRef.id);
      alert("Data submitted successfully!");
      setTosData({
        subject: "",
        level: "",
        term: "",
        schoolYear: "",
        numberOfItems: "",
        weeklyBreakdown: [{
          week: "",
          competencies: "",
          hours: "",
          percent: "",
          items: "",
          remember: "",
          understand: "",
          apply: "",
          analyse: "",
          evaluate: "",
          create: "",
          testType: ""
        }]
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert(`Failed to submit data. Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-7xl mx-auto">
      <h1 className="text-xl font-semibold text-zinc-800">Table of Specification (TOS) Input</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="subject"
          value={tosData.subject}
          onChange={handleChange}
          placeholder="Subject"
          className="w-full rounded-md border p-2 text-sm"
        />

        <input
          type="text"
          name="level"
          value={tosData.level}
          onChange={handleChange}
          placeholder="Level (e.g., First Year)"
          className="w-full rounded-md border p-2 text-sm"
        />

        <input
          type="text"
          name="term"
          value={tosData.term}
          onChange={handleChange}
          placeholder="Term/Period (e.g., Midterm, 1st Sem)"
          className="w-full rounded-md border p-2 text-sm"
        />

        <input
          type="text"
          name="schoolYear"
          value={tosData.schoolYear}
          onChange={handleChange}
          placeholder="School Year (e.g., 2024-2025)"
          className="w-full rounded-md border p-2 text-sm"
        />

        <input
          type="text"
          name="numberOfItems"
          value={tosData.numberOfItems}
          onChange={handleChange}
          placeholder="No. of Items/Points"
          className="w-full rounded-md border p-2 text-sm"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[1200px] table-auto border-collapse border border-gray-300 mt-4">
          <thead>
            <tr className="bg-gray-100 text-xs">
              <th className="border p-2">Week</th>
              <th className="border p-2">Competencies</th>
              <th className="border p-2">Hours</th>
              <th className="border p-2">% Time</th>
              <th className="border p-2"># Items</th>
              <th className="border p-2">Remember</th>
              <th className="border p-2">Understand</th>
              <th className="border p-2">Apply</th>
              <th className="border p-2">Analyse</th>
              <th className="border p-2">Evaluate</th>
              <th className="border p-2">Create</th>
              <th className="border p-2">Test Type</th>
            </tr>
          </thead>
          <tbody>
            {tosData.weeklyBreakdown.map((row, index) => (
              <tr key={index}>
                {Object.entries(row).map(([key, val]) => (
                  <td key={key} className="border p-1">
                    <input
                      type="text"
                      name={key}
                      value={val}
                      onChange={(e) => handleWeekChange(index, e)}
                      className="w-full text-xs border rounded px-1 py-0.5"
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        type="button"
        onClick={addWeek}
        className="mt-2 bg-green-500 text-white px-4 py-1 rounded"
      >
        + Add Week
      </button>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white rounded-md p-2 text-sm mt-4"
        disabled={loading}
      >
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
