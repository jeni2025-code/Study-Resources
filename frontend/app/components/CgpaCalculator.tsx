"use client";

import { useState } from "react";

interface Semester {
  id: number;
  name: string;
  sgpa: number | "";
  credits: number | "";
}

export default function CgpaCalculator() {
  const [semesters, setSemesters] = useState<Semester[]>([
    { id: 1, name: "Semester 1", sgpa: "", credits: "" },
  ]);
  const [targetCgpa, setTargetCgpa] = useState<number | "">("");

  const addSemester = () => {
    setSemesters([
      ...semesters,
      { id: semesters.length + 1, name: `Semester ${semesters.length + 1}`, sgpa: "", credits: "" },
    ]);
  };

  const updateSemester = (id: number, field: keyof Semester, value: string) => {
    const numValue = value === "" ? "" : parseFloat(value);
    setSemesters(
      semesters.map((sem) =>
        sem.id === id ? { ...sem, [field]: numValue } : sem
      )
    );
  };

  // Calculate current CGPA
  let totalCredits = 0;
  let totalPoints = 0;
  
  semesters.forEach(sem => {
      if (typeof sem.sgpa === 'number' && typeof sem.credits === 'number') {
          totalCredits += sem.credits;
          totalPoints += (sem.sgpa * sem.credits);
      }
  });

  const currentCgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";

  // Calculate required SGPA for next semester
  let requiredSgpa = null;
  const nextSemCredits = 20; // Assume 20 credits for the next semester for estimation
  if (typeof targetCgpa === 'number' && targetCgpa > 0) {
      const targetTotalPoints = targetCgpa * (totalCredits + nextSemCredits);
      const pointsNeeded = targetTotalPoints - totalPoints;
      requiredSgpa = (pointsNeeded / nextSemCredits).toFixed(2);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-gray-700 mb-6 flex items-center gap-2">
        <span>📈</span> CGPA & Target Calculator
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div>
          <h4 className="font-medium text-gray-600 mb-3">Your Academic Record</h4>
          <div className="space-y-3 mb-4 max-h-60 overflow-y-auto pr-2">
            {semesters.map((sem) => (
              <div key={sem.id} className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-500 w-20">{sem.name}</span>
                <input
                  type="number"
                  placeholder="SGPA (e.g. 8.5)"
                  value={sem.sgpa}
                  onChange={(e) => updateSemester(sem.id, "sgpa", e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  step="0.01"
                  min="0"
                  max="10"
                />
                <input
                  type="number"
                  placeholder="Credits (e.g. 20)"
                  value={sem.credits}
                  onChange={(e) => updateSemester(sem.id, "credits", e.target.value)}
                  className="w-24 px-3 py-1.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  min="1"
                />
              </div>
            ))}
          </div>
          <button
            onClick={addSemester}
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors flex items-center gap-1"
          >
            <span>+</span> Add Semester
          </button>
        </div>

        {/* Results Section */}
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center">
          <div className="text-center mb-6">
            <p className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-1">Current CGPA</p>
            <p className="text-5xl font-bold text-gray-800">{currentCgpa}</p>
            <p className="text-sm text-gray-500 mt-2">Based on {totalCredits} total credits</p>
          </div>

          <div className="border-t border-blue-200 pt-4 mt-2">
            <p className="text-sm font-semibold text-gray-600 mb-2">Target Calculator</p>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-500">I want a CGPA of:</span>
              <input
                type="number"
                placeholder="e.g. 9.0"
                value={targetCgpa}
                onChange={(e) => setTargetCgpa(e.target.value === "" ? "" : parseFloat(e.target.value))}
                className="w-24 px-2 py-1 border border-gray-200 rounded outline-none focus:ring-2 focus:ring-blue-500 text-sm font-semibold text-gray-700"
                step="0.01"
                min="0"
                max="10"
              />
            </div>
            {requiredSgpa && (
              <div className={`p-3 rounded-lg text-sm font-medium ${parseFloat(requiredSgpa) > 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {parseFloat(requiredSgpa) > 10 
                  ? "Impossible to reach this target in one semester (Requires > 10 SGPA)."
                  : `You need an SGPA of ${requiredSgpa} in your next semester (assuming 20 credits) to hit this target.`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
