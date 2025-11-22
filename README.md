# 🩺 HealthGuardAI
### AI-Powered Digital Health Assistant for Proactive Chronic Disease Management

HealthGuardAI (ChronicleAI) is an intelligent health management system designed to support patients with chronic conditions such as **diabetes** and **hypertension**.  
It uses **AI, Machine Learning, IoT device data, secure backend APIs, and a modern UI** to provide personalized insights, real-time monitoring, and medication adherence tracking.

---

## 📌 Table of Contents
- [Problem Statement](#problem-statement)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Screenshots](#screenshots)
- [Installation Guide](#installation-guide)
- [Environment Variables](#environment-variables)
- [Available API Endpoints](#available-api-endpoints)
- [AI & ML Engine](#ai--ml-engine)
- [IoT Device Integration](#iot-device-integration)
- [Security](#security)
- [Future Enhancements](#future-enhancements)
- [Team](#team)

---

# 🧠 Problem Statement
Chronic diseases require **continuous monitoring**, **personalized treatment**, and **timely intervention**.  
However, most patients:

- Forget medication doses  
- Lack real-time insights  
- Cannot interpret their glucose/BP trends  
- Don’t have access to actionable recommendations  
- Face privacy risks with health apps  

**HealthGuardAI solves these issues using AI, ML, IoT, secure backend design, and a user-friendly dashboard.**

---

# 🚀 Key Features

### **🧠 AI Assistant**
- Gemini LLM-based health insights  
- Personalized guidance  
- Natural language explanations of vitals  

### **📊 Health Dashboard**
- Daily vitals summary  
- Glucose, BP, heart rate charts  
- Weekly & monthly trends  

### **💊 Medication Management**
- Add medications  
- Mark doses as taken  
- Track adherence  
- Smart reminders  

### **📡 IoT Device Simulator**
Simulates real IoT devices (with backend integration):
- Fitness Tracker — Heart rate, Steps, Calories  
- Glucometer — Glucose levels  
- BP Monitor — Systolic/Diastolic readings  
- Real-time reading cards  
- Secure storage in MongoDB  

### **🔐 Privacy & Security**
- JWT authentication  
- AES-256 encryption for sensitive data  
- Secure backend architecture  
- Privacy Mode (“Blur/Pseudonymize sensitive data”)  

### **📚 Educational Resources**
- Curated articles  
- Chronic disease management info  
- Lifestyle guidance  

---

# 🛠 Tech Stack

### **Frontend**
- React.js  
- Context API  
- TailwindCSS / Custom CSS  
- Axios  

### **Backend**
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- AES-256 Encryption  
- ioT Routes + Simulation Logic  

### **AI & ML**
- Gemini API (LLM Insights)  
- TensorFlow.js (Risk scoring / trend evaluation)  

### **IoT Integration**
- IoT Simulation API  
- Architecture ready for:
  - Google Fit  
  - Apple HealthKit (OAuth 2.0)

---

# 🏗 System Architecture

React Frontend (UI/UX)
│
Axios API Calls
│
Node.js + Express Backend
│
MongoDB Database (Users, Logs, IoT Readings, Medications)
│
TensorFlow.js ML Engine (Risk Prediction)
│
Gemini AI (Insights & Recommendations)
│
IoT Simulator → Real Wearables (Future)


---

# 🖼 Screenshots
https://github.com/greeshmagowda06/Astrocoders/tree/main/UI%20images
# ⚙️ Installation Guide
repo link:
https://github.com/greeshmagowda06/Astrocoders

2️⃣ Backend Setup
cd backend
npm install


Run the server:

npm run dev

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev

🌍 Environment Variables

Create .env in backend/:

PORT=4000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_AES_secret_key
GEMINI_API_KEY=your_gemini_key


Create .env in frontend/:

VITE_API_BASE_URL=http://localhost:4000
VITE_GEMINI_API_KEY=your_key

🔌 Available API Endpoints
Auth
POST /api/auth/register
POST /api/auth/login
GET  /api/auth/me

IoT
POST /api/iot/simulate/fitness
POST /api/iot/simulate/glucose
POST /api/iot/simulate/bp
GET  /api/iot/readings

Medications
POST /api/medications
PATCH /api/medications/taken/:id
GET  /api/medications

Health Logs
POST /api/readings
GET  /api/readings

🧬 AI & ML Engine
Gemini AI

Used for:

Explaining vitals

Answering medical questions

Lifestyle guidance

Personalized insights

TensorFlow.js

Used for:

Basic risk scoring

Glucose/BP abnormality detection

Trend evaluation
(batch model inside backend/service)

📡 IoT Device Integration

✔ Fully implemented:

IoT Simulator (Fitness, Glucose, BP)

Backend routes for each device

Database storage

Real-time UI updates

⚠ Future implementation:

Real Google Fit integration

Real Apple HealthKit OAuth 2.0

BLE wearable device support

🔐 Security

AES-256 encryption for sensitive tokens

JWT authentication

Helmet.js

CORS protection

Rate limiting

Privacy Mode (blur sensitive PHI)

Environment variable isolation

🚀 Future Enhancements

Doctor dashboard

Automated alerts based on ML models

Multi-language support

Advanced LSTM-based risk prediction

Wearable ECG support

FHIR interoperability

👥 Team

Team ChronicleAI

AI/ML

IoT Integration

Frontend UI/UX

Backend Services

Security & Architecture

⭐ Final Note

This project was built during a hackathon to demonstrate a functional, scalable, and secure digital health ecosystem using AI, ML, IoT, and modern web technologies.