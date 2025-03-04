FROM python:3.12-slim
EXPOSE 4000

WORKDIR /app

COPY . .


# Copy the requirements file and install dependencies
COPY requirements.txt .

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install -e .

# Running the application using Hypercorn
CMD ["hypercorn", "app:app", "--bind", "0.0.0.0:4000", "--reload"]