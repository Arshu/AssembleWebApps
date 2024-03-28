#Alpine x64
FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-alpine3.19 as initial

WORKDIR /app
COPY /app/linux64_musl /app/linux64_musl
COPY /app/wwwroot /app/wwwroot
RUN mkdir -p /app/wwwroot/App_Data
RUN chmod +x ./linux64_musl/Arshu.AppBaseWeb

FROM mcr.microsoft.com/dotnet/runtime-deps:8.0-alpine3.19

LABEL Author="Sridharan Srinivasan" 

WORKDIR /app
COPY --from=initial /app /app

EXPOSE 8080
#EXPOSE 9091

#http://0.0.0.0:9091
CMD ["./linux64_musl/Arshu.AppBaseWeb", "--urls", "http://0.0.0.0:8080;"] 

