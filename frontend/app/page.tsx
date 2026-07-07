"use client";

import { useEffect, useState } from "react";
import PomodoroTimer from "./components/PomodoroTimer";
import FileUpload from "./components/FileUpload";
import SyllabusTracker from "./components/SyllabusTracker";
import CgpaCalculator from "./components/CgpaCalculator";

const TABS = ["Core Content", "Planning & Productivity", "Performance", "Community", "Smart/AI Layer"];

export default function Home() {
  const [apiStatus, setApiStatus] = useState<string>("Checking...");
  const [activeTab, setActiveTab] = useState<string>("Core Content");

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:7860";
    fetch(`${apiUrl}/api/status`)
      .then((res) => res.json())
      .then((data) => setApiStatus(`✅ Connected to ${data.service}`))
      .catch(() => setApiStatus("❌ Backend Not Connected. Please run FastAPI on port 8000."));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-[family-name:var(--font-geist-sans)] flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-blue-600 tracking-tight">📚 Study Platform</h1>
        </div>
        <nav className="mt-4">
          {TABS.map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left block px-6 py-3 font-medium transition-colors ${
                activeTab === item
                  ? "bg-blue-50 text-blue-700 border-r-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h2 className="text-3xl font-semibold text-gray-800">{activeTab}</h2>
            <p className="text-gray-500 mt-2">Manage your {activeTab.toLowerCase()} tools and resources.</p>
          </div>
          
          <div className={`px-4 py-2 rounded-lg text-sm font-semibold shadow-sm border ${apiStatus.includes("✅") ? "bg-green-50 text-green-700 border-green-200" : apiStatus.includes("Checking") ? "bg-yellow-50 text-yellow-700 border-yellow-200" : "bg-red-50 text-red-700 border-red-200"}`}>
            {apiStatus}
          </div>
        </header>

        {/* Tab Content Routing */}
        <section className="mt-8">
          {activeTab === "Core Content" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <FileUpload />
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-4">📂</span>
                <h3 className="text-xl font-medium text-gray-700">Course Materials</h3>
                <p className="text-gray-500 mt-2">Upload PDFs using the tool to the left, and view your resources here.</p>
              </div>
            </div>
          )}

          {activeTab === "Planning & Productivity" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              <SyllabusTracker />
              <PomodoroTimer />
            </div>
          )}

          {activeTab === "Performance" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
               <CgpaCalculator />
            </div>
          )}

          {activeTab === "Community" && (
            <div className="bg-white p-12 rounded-xl shadow-sm border border-gray-200 text-center">
               <span className="text-5xl mb-4 block">💬</span>
               <h3 className="text-2xl font-medium text-gray-700">Community Forums</h3>
               <p className="text-gray-500 mt-2 max-w-md mx-auto">Connect with peers, join study groups, and ask questions. (Coming Soon)</p>
            </div>
          )}

          {activeTab === "Smart/AI Layer" && (
             <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-12 rounded-xl shadow-sm border border-blue-100 text-center">
               <span className="text-5xl mb-4 block">✨</span>
               <h3 className="text-2xl font-medium text-blue-900">AI Summarizer & Flashcards</h3>
               <p className="text-blue-700 mt-2 max-w-md mx-auto">The backend is ready to integrate with LLMs to automatically generate study materials from your uploaded notes.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
