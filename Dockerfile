FROM postgres:14.5

ENV POSTGRES_PASSWORD planner
ENV POSTGRES_USER planner
ENV POSTGRES_DB planner

RUN apt-get update \
      && apt-get install postgresql-14-similarity \
      && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /docker-entrypoint-initdb.d
