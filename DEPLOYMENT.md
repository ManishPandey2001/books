# Deployment Guide

Architecture:
`React (Vercel) -> Express API (Azure Container Apps) -> MongoDB Atlas`

## 1. MongoDB Atlas

1. Create an Atlas cluster.
2. Create a database user.
3. Get the SRV connection string from Atlas and replace the username/password.
4. Add your Azure Container App outbound IP to Atlas Network Access, or temporarily allow `0.0.0.0/0` while testing.

MongoDB docs:
- https://www.mongodb.com/docs/guides/atlas/connection-string/

## 2. Backend to Azure Container Apps

Files prepared:
- `Backend/Dockerfile`
- `Backend/.dockerignore`

Required environment variables for the container app:
- `PORT=5000`
- `MONGO_URI=<your atlas connection string>`
- `JWT_SECRET=<your secret>`
- `API_PUBLIC_URL=https://<your-backend-name>.<region>.azurecontainerapps.io`
- `CORS_ORIGINS=https://<your-vercel-domain>`

Important Azure settings:
- Enable external ingress
- Set target port to `5000`

Azure docs:
- https://learn.microsoft.com/en-us/azure/container-apps/get-started
- https://learn.microsoft.com/azure/container-apps/ingress-overview
- https://learn.microsoft.com/en-us/azure/container-apps/environment-variables

Suggested flow:
1. Push this repo to GitHub.
2. Build the backend container image from `Backend/`.
3. Deploy that image to Azure Container Apps.
4. Copy the generated backend URL.

## 3. Frontend to Vercel

Files prepared:
- `frontend/vercel.json`
- `frontend/src/services/api.js`

In Vercel, set:
- Root Directory: `frontend`
- Framework Preset: `Vite`
- Environment Variable:
  - `VITE_API_BASE_URL=https://<your-backend-name>.<region>.azurecontainerapps.io/api`

Vercel docs:
- https://examples.vercel.com/docs/frameworks/vite
- https://vercel.com/docs/project-configuration/vercel-json

## 4. Final Wiring

After Vercel gives you the frontend URL:
1. Add that Vercel URL to backend `CORS_ORIGINS`.
2. Redeploy or create a new Azure Container Apps revision.
3. Test:
   - frontend login
   - books CRUD
   - borrow/return
   - Swagger at `/api-docs`

## Example Values

Frontend:
- `VITE_API_BASE_URL=https://library-api.wittywave-12345.centralindia.azurecontainerapps.io/api`

Backend:
- `API_PUBLIC_URL=https://library-api.wittywave-12345.centralindia.azurecontainerapps.io`
- `CORS_ORIGINS=https://library-app.vercel.app`
