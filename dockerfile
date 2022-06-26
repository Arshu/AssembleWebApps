#docker build -t arshucs/appweb .
#docker run -it -p 5000:8080 --rm --name appweb arshucs/appweb
#docker run -it -p 5000:8080 -v $(pwd)/app/wwwroot:/app/wwwroot --rm --name appweb arshucs/appweb
#docker run -it -p 5000:8080 -v $(pwd)/app/Log:/app/Log -v $(pwd)/app/wwwroot:/app/wwwroot --rm --name appweb arshucs/appweb

#Alpine x64
FROM mcr.microsoft.com/dotnet/runtime-deps:6.0-alpine-amd64
#Alpine arm64
#FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine-arm64v8
#Ubuntu x64
#FROM mcr.microsoft.com/dotnet/aspnet:6.0-focal-amd64

EXPOSE 8080
EXPOSE 9091

# Copy 
RUN mkdir /app
WORKDIR /app
COPY /linux64_musl/. ./
#COPY /linux64_musl_arm64/. ./
#COPY /linux64/. ./

RUN chmod +x ./AppWeb.Web
CMD ["./AppWeb.Web", "--urls", "http://0.0.0.0:8080"]
