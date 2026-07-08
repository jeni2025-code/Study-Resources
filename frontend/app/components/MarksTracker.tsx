"use client";

import { useState } from "react";

interface Assessment {
  id: string;
  name: string;
  weight: number; // percentage of total grade (e.g., 20 for 20%)
  score: number; // score achieved
  maxScore: number; // max possible score
}

export default function MarksTracker() {
  const [assessments, setAssessments] = useState<Assessment[]>([
    { id: "1", name: "Midterm 1", weight: 20, score: 18, maxScore: 20 },
    { id: "2", name: "Assignment 1", weight: 10, score: 9.5, maxScore: 10 }
  ]);

  const [newName, setNewName] = useState("");
  const [newWeight, setNewWeight] = useState("");
  const [newScore, setNewScore] = useState("");
  const [newMaxScore, setNewMaxScore] = useState("");
  const [targetGrade, setTargetGrade] = useState("90");

  const handleAddAssessment = () => {
    if (!newName || !newWeight || !newScore || !newMaxScore) return;
    setAssessments([
      ...assessments,
      {
        id: Date.now().toString(),
        name: newName,
        weight: parseFloat(newWeight),
        score: parseFloat(newScore),
        maxScore: parseFloat(newMaxScore)
      }
    ]);
    setNewName("");
    setNewWeight("");
    setNewScore("");
    setNewMaxScore("");
  };

  const calculateCurrentGrade = () => {
    if (assessments.length === 0) return 0;
    let earnedPoints = 0;
    let totalWeightAttempted = 0;

    assessments.forEach(a => {
      earnedPoints += (a.score / a.maxScore) * a.weight;
      totalWeightAttempted += a.weight;
    });

    if (totalWeightAttempted === 0) return 0;
    return (earnedPoints / totalWeightAttempted) * 100;
  };

  const calculateRequiredForTarget = () => {
    let earnedPoints = 0;
    let totalWeightAttempted = 0;

    assessments.forEach(a => {
      earnedPoints += (a.score / a.maxScore) * a.weight;
      totalWeightAttempted += a.weight;
    });

    const weightRemaining = 100 - totalWeightAttempted;
    if (weightRemaining <= 0) return null; // Course is over

    const pointsNeeded = parseFloat(targetGrade) - earnedPoints;
    const percentageNeeded = (pointsNeeded / weightRemaining) * 100;

    return { percentageNeeded, weightRemaining };
  };

  const currentGrade = calculateCurrentGrade();
  const required = calculateRequiredForTarget();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-gray-700 mb-6 flex items-center gap-2">
        <span>📈</span> Internal Marks Tracker
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 flex flex-col justify-center items-center">
          <p className="text-blue-800 text-sm font-medium mb-1">Current Standing</p>
          <div className="text-4xl font-bold text-blue-600">{currentGrade.toFixed(1)}%</div>
          <p className="text-blue-600 text-xs mt-2">Based on completed assessments</p>
        </div>

        <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 flex flex-col justify-center items-center">
          <div className="flex items-center gap-2 mb-2">
             <p className="text-indigo-800 text-sm font-medium">Target Grade:</p>
             <input 
                type="number" 
                value={targetGrade} 
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-16 px-2 py-1 text-center font-bold text-indigo-700 bg-white border border-indigo-200 rounded"
              />
              <span className="text-indigo-800 font-bold">%</span>
          </div>
          
          {required ? (
            required.percentageNeeded > 100 ? (
              <p className="text-red-600 text-sm font-medium text-center">Impossible. You need {required.percentageNeeded.toFixed(1)}% on the remaining {required.weightRemaining}% of the course.</p>
            ) : required.percentageNeeded <= 0 ? (
              <p className="text-green-600 text-sm font-medium text-center">Target already achieved! You need 0% on the rest.</p>
            ) : (
               <div className="text-center">
                 <div className="text-2xl font-bold text-indigo-600">{required.percentageNeeded.toFixed(1)}%</div>
                 <p className="text-indigo-600 text-xs mt-1">Required on the remaining {required.weightRemaining}% of the course</p>
               </div>
            )
          ) : (
            <p className="text-gray-500 text-sm font-medium text-center">Course 100% complete.</p>
          )}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Add Assessment</h4>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
          <input
            type="text"
            placeholder="Name (e.g. Midterm)"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="col-span-2 md:col-span-2 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="number"
            placeholder="Weight (%)"
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="number"
            placeholder="Your Score"
            value={newScore}
            onChange={(e) => setNewScore(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="number"
            placeholder="Max Score"
            value={newMaxScore}
            onChange={(e) => setNewMaxScore(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
        <button
          onClick={handleAddAssessment}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Add to Tracker
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">Assessment</th>
              <th className="px-4 py-3">Weight</th>
              <th className="px-4 py-3">Score</th>
              <th className="px-4 py-3">Percentage</th>
            </tr>
          </thead>
          <tbody>
            {assessments.map(a => (
              <tr key={a.id} className="border-b">
                <td className="px-4 py-3 font-medium text-gray-900">{a.name}</td>
                <td className="px-4 py-3">{a.weight}%</td>
                <td className="px-4 py-3">{a.score} / {a.maxScore}</td>
                <td className="px-4 py-3 font-medium text-blue-600">{((a.score / a.maxScore) * 100).toFixed(1)}%</td>
              </tr>
            ))}
            {assessments.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-gray-500">No assessments added yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
