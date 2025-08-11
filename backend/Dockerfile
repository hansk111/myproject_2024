
# pull official base image
FROM python:3.11.5

#set work directory
WORKDIR /usr/src/app

#set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# RUN apk update
# RUN apk add gcc python3-dev musl-dev zlib-dev libxml2-dev libxslt-dev jpeg-dev jpeg-dev libffi-dev cairo-dev pango-dev gdk-pixbuf-dev py-mysqldb mariadb-dev

RUN apt-get update && apt-get install -y iputils-ping

COPY . /usr/src/app/

#install dependencies
RUN pip install --upgrade pip
Run pip install wand
RUN pip install -r requirements.txt