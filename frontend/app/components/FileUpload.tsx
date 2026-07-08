"use client";

import { useState } from "react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);
  const [summary, setSummary] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setUploadStatus("");
      setSummary("");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    setUploadStatus("Uploading & Analyzing with AI...");
    setSummary("");

    const formData = new FormData();
    formData.append("file", file);

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://jenigupta19-study-resources-backend.hf.space";
    try {
      const response = await fetch(`${apiUrl}/api/summarize`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && !data.error) {
        setUploadStatus(`✅ Success!`);
        setSummary(data.summary);
        setFile(null); // Reset after successful upload
      } else {
        setUploadStatus(`❌ Error: ${data.error || "Upload failed"}`);
      }
    } catch (error) {
      setUploadStatus("❌ Network error. Is the backend running?");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-full flex flex-col">
      <h3 className="text-xl font-medium text-gray-700 mb-4 flex items-center gap-2">
        <span>📄</span> Upload Study Material (PDF)
      </h3>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
         <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="text-gray-500">
          {file ? (
            <p className="font-medium text-blue-600">{file.name}</p>
          ) : (
            <p>Click or drag to upload a PDF note or PYQ</p>
          )}
        </div>
      </div>
      
      {file && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="mt-4 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {isUploading ? "Analyzing..." : "Process with AI"}
        </button>
      )}

      {uploadStatus && (
        <p className={`mt-4 text-sm font-medium ${uploadStatus.includes("✅") ? "text-green-600" : uploadStatus.includes("❌") ? "text-red-600" : "text-blue-600"}`}>
          {uploadStatus}
        </p>
      )}

      {summary && (
        <div className="mt-6 p-4 bg-indigo-50 border border-indigo-100 rounded-lg flex-1 overflow-y-auto">
           <h4 className="font-semibold text-indigo-900 flex items-center gap-2 mb-2">
             <span>✨</span> AI Summary
           </h4>
           <p className="text-sm text-indigo-800 whitespace-pre-line leading-relaxed">
             {summary}
           </p>
        </div>
      )}
    </div>
  );
}
