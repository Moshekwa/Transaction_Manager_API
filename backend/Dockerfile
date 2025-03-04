FROM python:latest
EXPOSE 4000

WORKDIR /app

COPY . .

# Copy the requirements file and install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install -e .

#CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "6000"]
# Command to run the application using Uvicorn
# CMD ["uvicorn", "backend:create_app", "--host", "0.0.0.0", "--port", "4000", "--factory"]

# Command to run the application using Hypercorn
CMD ["hypercorn", "app:app", "--bind", "0.0.0.0:4000", "--reload"]