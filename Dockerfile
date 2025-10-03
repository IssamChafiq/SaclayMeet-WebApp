FROM ubuntu:latest
LABEL authors="issam"

ENTRYPOINT ["top", "-b"]