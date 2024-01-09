FROM python:3.11.3

WORKDIR /app

COPY requirements.txt .

RUN apt-get update && \
    apt-get install -y libpq-dev && \
    rm -rf /var/lib/apt/lists/*

RUN python -m venv venv
RUN /bin/bash -c "source venv/bin/activate"

RUN pip install --upgrade pip
RUN pip install -r requirements.txt

COPY . .

CMD ["python", "manage.py", "migrate"]

CMD ["gunicorn", "web.wsgi"]