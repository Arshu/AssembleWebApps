#Alpine x64
FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64 as initial

WORKDIR /app
COPY . .
RUN chmod +x ./linux64_musl/AppWeb.Web

FROM mcr.microsoft.com/dotnet/runtime-deps:7.0-alpine-amd64

LABEL Author="Sridharan Srinivasan" 

EXPOSE 8080
EXPOSE 9091

WORKDIR /app
#RUN addgroup --system --gid 101 app \
#    && adduser --system --ingroup app --uid 101 app
#USER app
#COPY --from=initial --chown=app:app /app /app
COPY --from=initial /app /app

CMD ["./linux64_musl/AppWeb.Web", "--urls", "http://0.0.0.0:8080;http://0.0.0.0:9091"]

