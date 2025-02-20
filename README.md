# Arcjet Security Tool - IS_IA1 Project

## 📌 Project Overview
This project implements a **security tool** using [Arcjet](https://arcjet.io/) to enhance the security of web applications by:
- **Detecting and blocking bots** 🕵️‍♂️
- **Enforcing rate limiting** ⏳
- **Preventing unauthorized access attempts** 🚫

Developed as part of the **Information Security (IS)** course, this project aims to mitigate **automated attacks, scraping, and brute-force attempts** using Arcjet middleware in a Node.js backend.

---

## 🚀 Features
- ✅ **Bot Detection:** Blocks malicious bots using `detectBot()`
- ✅ **Rate Limiting:** Restricts excessive requests using `tokenBucket()`
- ✅ **IP-Based Access Control:** Temporarily bans suspicious IPs
- ✅ **Express Integration:** Easy implementation in any Node.js app
- ✅ **Logging & Debugging:** Tracks bot detections for security analysis

---

## 🛠️ Setup & Installation
### 1️⃣ Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14+ recommended)
- [Postman](https://www.postman.com/) (for testing API security)
- Arcjet API Key (Sign up at [Arcjet.io](https://arcjet.io/))

### 2️⃣ Clone the Repository
```sh
git clone https://github.com/minavkaria/IS_IA1.git
cd IS_IA1
```

### 3️⃣ Install Dependencies
```sh
npm install express dotenv @arcjet/node
```

### 4️⃣ Configure Environment Variables
Create a `.env` file and add your Arcjet API key:
```env
ARCJET_KEY=your-arcjet-api-key
```

---

## 📜 Implementation
### 🔹 Arcjet Middleware (Security Layer)
```javascript
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

// Initialize Arcjet
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],  // Identify requests based on IP
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 1000,
      capacity: 10,
    }),
  ],
});

// Apply Arcjet security middleware
app.use(aj);

// Sample API route
app.get("/api/v1/users", (req, res) => {
  res.json({ success: true, message: "Protected API!" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
```

---

## 🧪 Testing the Security Tool
### ✅ **Normal Request (Allowed)**
```sh
curl -X GET http://localhost:3000/api/v1/users -H "User-Agent: Mozilla/5.0"
```
Expected Response:
```json
{"success":true, "message":"Protected API!"}
```

### ❌ **Bot Simulation (Blocked)**
```sh
curl -X GET https://is-ia-1.vercel.app/api/v1/users -H "User-Agent: python-requests/2.26.0"
```
Expected Response:
```json
{"error":"Bot detected. Access denied."}
```

### ❌ **Rate Limit Exceeded (Blocked)**
```sh
for i in {1..20}; do curl -X GET http://localhost:3000/api/v1/users; done
```
Expected Response:
```json
{"error":"Rate limit exceeded"}
```

### ❌ **Shield WAF (Protects from Common Attacks)**
```sh
for i in {1..6}; do  
  curl -L -X GET "https://is-ia-1.vercel.app/api/v1/users" -H "x-arcjet-suspicious: true";   
  echo "Request $i sent"; 
done
```
---

## 📌 Conclusion
This **Arcjet-based security tool** enhances web application security by detecting bots, limiting requests, and preventing abuse. This project serves as a **practical implementation** of security concepts in **Information Security (IS)** coursework.

🔒 **Stay Secure!** 🚀

