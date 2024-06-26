FROM python:alpine

WORKDIR /app

COPY requirements.txt ./

RUN pip install bson
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]


