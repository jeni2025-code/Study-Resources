from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI(title="Study Platform API")

# Configure CORS so the Next.js frontend can communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class StatusResponse(BaseModel):
    status: str
    service: str

@app.get("/api/status", response_model=StatusResponse)
def get_status():
    return {"status": "ok", "service": "Python FastAPI Backend"}

@app.post("/api/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        return {"error": "Only PDF files are allowed"}
    
    # In a real app, you would save this to S3/Firebase
    content = await file.read()
    
    return {
        "filename": file.filename,
        "size": len(content),
        "message": "File uploaded successfully! Ready for AI processing."
    }

@app.post("/api/summarize")
async def summarize_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith('.pdf'):
        return {"error": "Only PDF files are allowed"}
    
    # Read the file content
    content = await file.read()
    
    # TODO: In a real app, extract text from PDF (e.g., using PyPDF2) 
    # and send it to an LLM API (like OpenAI or Gemini) for summarization.
    
    import asyncio
    # Simulate API latency
    await asyncio.sleep(2)
    
    mock_summary = f"This is an AI-generated summary of '{file.filename}'. The document appears to cover foundational concepts. Key takeaways include: \n1. The importance of understanding core principles.\n2. Several detailed examples illustrating the application of theory.\n3. A concluding section that bridges the gap between theory and practical usage.\n\n(Note: This is a simulated response. To generate real summaries, integrate an LLM API key in backend/main.py)"
    
    return {
        "filename": file.filename,
        "summary": mock_summary
    }
