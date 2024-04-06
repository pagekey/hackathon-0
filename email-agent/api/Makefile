.PHONY=run build

IMAGE_NAME=email-agent-api

build:
	docker build -t $(IMAGE_NAME) -f Dockerfile .

run: build
run:
	docker run --rm -it --expose 8000 -p 8000:8000 $(IMAGE_NAME)
