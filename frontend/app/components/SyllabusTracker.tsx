"use client";

import { useState } from "react";

type TopicStatus = "Not Started" | "In Progress" | "Done";

interface Topic {
  id: number;
  title: string;
  status: TopicStatus;
}

export default function SyllabusTracker() {
  const [topics, setTopics] = useState<Topic[]>([
    { id: 1, title: "Data Structures & Algorithms", status: "Not Started" },
    { id: 2, title: "Database Management Systems", status: "In Progress" },
    { id: 3, title: "Computer Networks", status: "Done" },
    { id: 4, title: "Operating Systems", status: "Not Started" },
  ]);

  const [newTopic, setNewTopic] = useState("");

  const handleStatusChange = (id: number, newStatus: TopicStatus) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, status: newStatus } : topic
      )
    );
  };

  const addTopic = () => {
    if (newTopic.trim()) {
      setTopics([
        ...topics,
        { id: Date.now(), title: newTopic, status: "Not Started" },
      ]);
      setNewTopic("");
    }
  };

  const getStatusColor = (status: TopicStatus) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Not Started":
        return "bg-gray-100 text-gray-600";
    }
  };

  const progress = Math.round(
    (topics.filter((t) => t.status === "Done").length / (topics.length || 1)) * 100
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-medium text-gray-700 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span>📅</span> Syllabus Tracker
        </div>
        <span className="text-sm font-bold text-blue-600">{progress}% Completed</span>
      </h3>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Topic List */}
      <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="flex items-center justify-between p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <span className={`font-medium ${topic.status === "Done" ? "line-through text-gray-400" : "text-gray-700"}`}>
              {topic.title}
            </span>
            <select
              value={topic.status}
              onChange={(e) => handleStatusChange(topic.id, e.target.value as TopicStatus)}
              className={`text-sm rounded-md px-2 py-1 outline-none font-semibold cursor-pointer border-none ${getStatusColor(
                topic.status
              )}`}
            >
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        ))}
      </div>

      {/* Add New Topic */}
      <div className="flex gap-2">
        <input
          type="text"
          value={newTopic}
          onChange={(e) => setNewTopic(e.target.value)}
          placeholder="Add a new topic..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          onKeyDown={(e) => e.key === "Enter" && addTopic()}
        />
        <button
          onClick={addTopic}
          disabled={!newTopic.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          Add
        </button>
      </div>
    </div>
  );
}
