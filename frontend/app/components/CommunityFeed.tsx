"use client";

import { useState } from "react";

interface Note {
  id: string;
  title: string;
  course: string;
  author: string;
  upvotes: number;
  timeAgo: string;
  isUpvoted: boolean;
}

export default function CommunityFeed() {
  const [notes, setNotes] = useState<Note[]>([
    { id: "1", title: "Complete Calculus II Cheatsheet", course: "Math 201", author: "jenigupta19", upvotes: 142, timeAgo: "2 hours ago", isUpvoted: false },
    { id: "2", title: "Data Structures Python Code Implementations", course: "CS 301", author: "algo_wizard", upvotes: 89, timeAgo: "5 hours ago", isUpvoted: false },
    { id: "3", title: "Physics Final Exam PYQ 2023 Solved", course: "Phys 101", author: "newton_fan", upvotes: 56, timeAgo: "1 day ago", isUpvoted: false },
    { id: "4", title: "Organic Chemistry Reaction Mechanisms summary", course: "Chem 202", author: "chem_nerd", upvotes: 34, timeAgo: "2 days ago", isUpvoted: false }
  ]);

  const [newTitle, setNewTitle] = useState("");
  const [newCourse, setNewCourse] = useState("");

  const handleUpvote = (id: string) => {
    setNotes(notes.map(note => {
      if (note.id === id) {
        return {
          ...note,
          upvotes: note.isUpvoted ? note.upvotes - 1 : note.upvotes + 1,
          isUpvoted: !note.isUpvoted
        };
      }
      return note;
    }));
  };

  const handleShare = () => {
    if (!newTitle || !newCourse) return;
    
    setNotes([
      {
        id: Date.now().toString(),
        title: newTitle,
        course: newCourse,
        author: "You",
        upvotes: 1,
        timeAgo: "Just now",
        isUpvoted: true
      },
      ...notes
    ]);
    
    setNewTitle("");
    setNewCourse("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-medium text-gray-700 flex items-center gap-2">
          <span>🌍</span> Peer-Shared Notes
        </h3>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">Live Feed</span>
      </div>

      <div className="mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h4 className="font-medium text-gray-700 mb-3">Share your resources</h4>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Title (e.g. OS Final Cheatsheet)"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <input
            type="text"
            placeholder="Course Code"
            value={newCourse}
            onChange={(e) => setNewCourse(e.target.value)}
            className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
          <button
            onClick={handleShare}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
          >
            Share Note
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {notes.sort((a, b) => b.upvotes - a.upvotes).map(note => (
          <div key={note.id} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all bg-white flex gap-4">
            
            <div className="flex flex-col items-center justify-start min-w-[40px]">
              <button 
                onClick={() => handleUpvote(note.id)}
                className={`p-1 rounded hover:bg-gray-100 transition-colors ${note.isUpvoted ? 'text-orange-500' : 'text-gray-400'}`}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd"></path></svg>
              </button>
              <span className={`font-bold text-sm ${note.isUpvoted ? 'text-orange-500' : 'text-gray-700'}`}>{note.upvotes}</span>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-0.5 rounded">{note.course}</span>
                <span className="text-xs text-gray-500">Posted by <span className="font-medium">u/{note.author}</span> • {note.timeAgo}</span>
              </div>
              <h4 className="font-bold text-gray-900 text-lg mb-2">{note.title}</h4>
              <div className="flex gap-3">
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <span>💬</span> 0 Comments
                </button>
                <button className="text-xs font-medium text-gray-500 hover:text-gray-700 flex items-center gap-1">
                  <span>⬇️</span> Download PDF
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
