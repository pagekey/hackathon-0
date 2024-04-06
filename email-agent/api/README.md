# Email Agent API

The API behind the email agent Chrome extension that handles generating emails,
validating that users have a valid subscription and canceling subscriptions.

## Setup

1. Install poetry with `pip install poetry`
2. Install all dependencies with `poetry install`
3. Enter the shell with `poetry shell`
4. Copy the .env.example file to .env and fill in the values.
5. Run the app with uvicorn by running the `./run.sh` file (`./run.sh` or `sh run.sh`).

You should now be able to access the running application on http://localhost:8000.

## Docker

### Building and Pushing Image Locally

```bash
docker compose build
docker compose push
```

### Building and Running the Image

```bash
make run
```
