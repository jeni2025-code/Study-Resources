FROM python:3.11-slim

WORKDIR /app

# Copy requirements first to leverage Docker cache
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the backend application
COPY . .

# Expose the port Hugging Face Spaces requires
EXPOSE 7860

# HF Spaces requires a non-root user with id 1000
RUN useradd -m -u 1000 user && chown -R user:user /app
USER user

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "7860"]
