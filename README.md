# Instagram Clone Web App - Working on it

Welcome to the Instagram clone web app repository. The idea behind this app is that users can sign up, log in, see photos, upload photos, like photos, comment on photos, and follow users.

## How to run this app

### Previous Installations
- Docker
- Yarn (optional)

1 - Clone the repository

2 - Rename .env.example to .env in backend and frontend folder

3 - Complete and edit the .env file

4 - Create docker container database

```bash
cd ./backend   
docker compose up -d
```
5- Install dependencies

- Backend

```bash
cd ./backend   
yarn
```
- Frontend

```bash
cd ./frontend   
yarn
```

6- Create databases instances

```bash
cd ./backend   
yarn push
```
7. Run backend server

```bash
cd ./backend   
yarn start
```
8. Run frontend react app

```bash
cd ./backend   
yarn start
```

## Technologies Used

- Frontend: React, TypeScript, Redux Toolkit, React Router, Styled Components.
- Backend: Node.js, Express, Zod, Prisma, PostgreSQL.