
# AI-Readiness Lead Scoring Tool

## 📌 Overview
This project is a response to **Caprae Capital's AI-Readiness Pre-Screening Challenge**. The goal is to build a tool that enhances lead generation capabilities by introducing **AI-readiness scoring logic** and an intuitive UI for sales teams.  
Unlike traditional lead gen tools, this solution prioritizes **business impact** by identifying high-value companies based on workforce size, industry, and readiness for AI transformation.

---

## 🛠️ Features Implemented
- **Dynamic Scoring Logic**  
  Assigns a readiness score to each company based on:
  - Employee size tiers (enterprise > mid-market > SMB)
  - Industry relevance (AI, tech, finance score higher)
  - Optional: Future hooks for AI adoption signals
- **Lead Filtering & Sorting**  
  Simple UI to filter companies by country, industry, or score.
- **MongoDB Atlas Integration**  
  Scalable lead storage with schema-based validation.
- **Responsive UI (React + Tailwind)**  
  Clean dashboard for viewing, filtering, and sorting leads.
- **Batch CSV Import**  
  Node.js script to ingest large datasets and calculate scores automatically.

---

## 🚀 Tech Stack
- **Frontend:** React + TypeScript + Tailwind CSS
- **Backend:** Node.js (Express)
- **Database:** MongoDB Atlas (via Mongoose)
- **CSV Parsing:** `csv-parser` npm package

---

## 📂 Project Structure
```

root/
│
├── client/             # React + TypeScript UI
│   ├── src/
│   │   ├── components/ # UI Components
│   │   ├── pages/      # Dashboard & Filters
│   │   └── services/   # API Calls
│
├── server/
│   ├── src/
│   │   ├── models/     # Mongoose Schemas
│   │   ├── routes/     # Express Routes
│   │   ├── scraping/      # CSV Import, Scoring Logic
│   ── index.js      # Main Server Entry
│
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/ai-readiness-leads.git
cd ai-readiness-leads
````

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```ini
atlas_URL=your-mongodb-atlas-connection
PORT=5000
```

Run backend:

```bash
npm start
```

### 3️⃣ Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

### 4️⃣ CSV Import (Optional)

Place your dataset in `server/src/companies_sorted.csv` and run:

```bash
node src/utils/importCSV.js
```

---

## 🧠 Scoring Logic

* **Base Score:** `3.0`

### Employee Size:

* > 5000 → `+0.8`
* ≥ 1000 → `+0.6`
* ≥ 100 → `+0.3`
* > 0 → `+0.1`

### Industry Weight:

* Tech / Software / Finance / Healthcare / AI / Cloud → `+1.0`
* Manufacturing / Automotive / Logistics → `+0.5`
* Others → `+0.2`

