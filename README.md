 AI-Powered Meeting Agenda Generator

 This web app automatically generates structured meeting agendas based on your input (title, topics, duration) using AI. You can view past agendas, edit them, and download them as PDF.

**LIVE DEMO**
 Frontend: https://meeting-agenda-app-k96s-fp5be9ls5-kashinath21159s-projects.vercel.app/
Backend API: https://agenda-app-backend.onrender.com


**Tech Stack**

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **AI Integration**: Groq API )
- **Database**: SQLite (via Sequelize)
- **Deployment**: Vercel (frontend) + Render (backend)


**Architecture Overview**
1. User Interaction (Frontend - React + Vite)
User enters:

Meeting title

Topics (comma-separated)

Duration (in minutes)

Clicks "Generate Agenda"

The app makes a POST request to the backend API.

 2. Backend Processing (Node.js + Express)
Endpoint: POST /api/agendas

Backend does the following:

Validates the input

Constructs a prompt for the LLM (e.g., Groq API)

Sends the prompt to the LLM

Receives a structured agenda text

Stores the agenda in a database (SQLite via Sequelize)

Returns the generated agenda to the frontend

3. Frontend Response
Displays the AI-generated agenda in a text area

User can:

Edit the agenda manually

Download it as a PDF using jsPDF

See agenda history

4. Agenda History (Persistent Storage)
The frontend also calls GET /api/agendas to:

Retrieve past agendas

Render them in a scrollable list

 5. Deployment Architecture
Frontend is deployed on Vercel

Backend is deployed on Render

Environment variable VITE_BACKEND_URL is used in frontend to connect to backend’s hosted API


**User → [React Form] → POST /api/agendas → [Backend Prompt + Groq API] → AI Response → Store in DB → Return agenda → Render to user**

**Frontend → GET /api/agendas → Backend → Fetch from DB → Return JSON → Show Agenda History**

**Project Setup Instructions**
Clone repository
git clone https://github.com/Kashinath21159/meeting-agenda-app


To generate Groq Key 
https://console.groq.com/key
create account and generate key

**Backend Setup**
open terminal
change directory
cd backend
npm install

Create a .env file:

inside it give Groq api key
GROQ_API_KEY =  your groq API key (generated from site)

**Frontend Setup**
change directory:
cd meeting-agenda-app
npm install

Create.env file 
inside it give backend URL
VITE_BACKEND_URL= https://agenda-app-backend.onrender.com

npm run dev (run the development server)


- 
