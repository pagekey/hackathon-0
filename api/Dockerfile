FROM python:3.10-slim-buster

WORKDIR /usr/src/app

COPY pyproject.toml poetry.lock ./
RUN touch README.md

RUN pip install poetry \
    && poetry export --without-hashes --format=requirements.txt > requirements.txt \
    && pip uninstall poetry -y \
    && pip install --no-cache -r requirements.txt

COPY . .

RUN pip install --no-cache --no-deps .

EXPOSE 8000
CMD ["uvicorn", "email_agent_api.main:app", "--host=0.0.0.0", "--port=8000"]
