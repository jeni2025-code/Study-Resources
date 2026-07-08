"use client";

import { useState } from "react";

interface Exam {
  id: string;
  name: string;
  date: string;
  topics: string;
}

export default function StudyPlanner() {
  const [exams, setExams] = useState<Exam[]>([
    { id: "1", name: "Data Structures Final", date: "2026-08-15", topics: "Graphs, Trees, Dynamic Programming" }
  ]);
  
  const [newExamName, setNewExamName] = useState("");
  const [newExamDate, setNewExamDate] = useState("");
  const [newExamTopics, setNewExamTopics] = useState("");

  const handleAddExam = () => {
    if (!newExamName || !newExamDate) return;
    setExams([
      ...exams,
      {
        id: Date.now().toString(),
        name: newExamName,
        date: newExamDate,
        topics: newExamTopics
      }
    ]);
    setNewExamName("");
    setNewExamDate("");
    setNewExamTopics("");
  };

  const calculateDaysLeft = (dateStr: string) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const examDate = new Date(dateStr);
    const diffTime = examDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-gray-700 mb-6 flex items-center gap-2">
        <span>📅</span> Exam Countdown & Study Planner
      </h3>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Add Upcoming Exam</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <input
            type="text"
            placeholder="Exam Name (e.g., Calculus)"
            value={newExamName}
            onChange={(e) => setNewExamName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            value={newExamDate}
            onChange={(e) => setNewExamDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Topics to Cover"
            value={newExamTopics}
            onChange={(e) => setNewExamTopics(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleAddExam}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
        >
          Add Exam Schedule
        </button>
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 mb-2">Upcoming Schedule</h4>
        {exams.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map(exam => {
          const daysLeft = calculateDaysLeft(exam.date);
          const isUrgent = daysLeft <= 7 && daysLeft >= 0;
          const isPast = daysLeft < 0;

          return (
            <div key={exam.id} className={`p-4 rounded-lg border ${isPast ? 'bg-gray-100 border-gray-200 opacity-60' : isUrgent ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-100'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h5 className="font-bold text-gray-800 text-lg">{exam.name}</h5>
                  <p className="text-sm text-gray-600">Date: {new Date(exam.date).toLocaleDateString()}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-bold ${isPast ? 'bg-gray-200 text-gray-600' : isUrgent ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                  {isPast ? 'Completed' : `${daysLeft} Days Left`}
                </div>
              </div>
              
              {!isPast && (
                <div className="mt-3 p-3 bg-white bg-opacity-60 rounded border border-white">
                  <p className="text-sm text-gray-700 mb-2"><strong>Topics to cover:</strong> {exam.topics || "None specified"}</p>
                  {daysLeft > 0 && exam.topics && (
                    <div className="text-xs font-medium text-gray-500 flex items-center gap-1">
                      <span>💡</span>
                      Suggested Pace: {Math.ceil(exam.topics.split(',').length / daysLeft)} topic(s) per day
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
        {exams.length === 0 && (
          <p className="text-gray-500 text-center py-4">No upcoming exams. You're all caught up!</p>
        )}
      </div>
    </div>
  );
}
