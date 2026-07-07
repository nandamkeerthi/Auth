# AI-Based Application Maintenance and Support Workbench

Monorepo containing the React frontend and ASP.NET Core backend.

## Project Structure

```
Project/
├── Frontend/     React + Vite application
└── Backend/      ASP.NET Core 8 Web API
```

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

## Backend

Update the Oracle connection string in `Backend/appsettings.json`, then open the solution in Visual Studio 2022 and run the `Auth.Api` project.

```bash
cd Backend
dotnet restore
dotnet build
dotnet run
```
