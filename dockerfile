# .NET SDK
FROM mcr.microsoft.com/dotnet/sdk:5.0-alpine AS dotnet

# Copy Projects
COPY source/Application/Architecture.Application.csproj ./source/Application/
COPY source/Database/Architecture.Database.csproj ./source/Database/
COPY source/Domain/Architecture.Domain.csproj ./source/Domain/
COPY source/Model/Architecture.Model.csproj ./source/Model/
COPY source/Web/Architecture.Web.csproj ./source/Web/

# .NET Restore
RUN dotnet restore ./source/Web/Architecture.Web.csproj

# Copy All Files
COPY source ./source/

# .NET Publish
RUN dotnet publish ./source/Web/Architecture.Web.csproj -c Release -o /dist --no-restore

# Angular
FROM node:16-alpine AS angular
WORKDIR ./source/Web/Frontend/
COPY source/Web/Frontend/package.json ./
RUN npm run restore
COPY source/Web/Frontend ./
RUN npm run publish

# .NET Runtime
FROM mcr.microsoft.com/dotnet/aspnet:5.0-alpine
RUN apk add --no-cache icu-libs
ENV DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=false
WORKDIR /app
COPY --from=dotnet /dist .
COPY --from=angular /source/Web/Frontend/dist ./Frontend/dist
ENTRYPOINT ["dotnet", "Architecture.Web.dll"]
