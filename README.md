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
https://github.com/greeshmagowda06/Astrocoders