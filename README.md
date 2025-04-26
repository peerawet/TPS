📄 TPS - Document Management System
A mini document management system (DMS) where users can upload, view, tag, and manage documents securely.

Live Demo: https://dms-frontend-q93o.onrender.com/

🚀 Setup Instructions

# 1. Clone the repository
git clone https://github.com/peerawet/TPS.git
cd TPS/

# 2. Backend setup
cd backend
cp .env-example .env
npm install
cd ..

# 3. Frontend setup
cd frontend
cp .env-example .env
npm ci --legacy-peer-dep
cd ..

# 4. Start the project
docker-compose up --build

🌐 Access the Application
Frontend → http://localhost:3000/
Backend API → http://localhost:5000/

🛠 Technologies Used

Frontend	React.js, Tailwind CSS
Backend	Node.js, Express.js
Database	Supabase (PostgreSQL)
Storage	Supabase Storage
Authentication	JWT (JSON Web Tokens)
Deployment	Docker, Docker Compose, Render.com

📋 Assumptions and Limitations



⏳ Time Spent

Task	Hours
Project setup	8
Backend API development	4
Frontend development	4
Testing & debugging	2
Total	18 hours

🔑 Sample Login Credentials

https://dms-frontend-q93o.onrender.com/

Email	peerawet1996@gmail.com
Password 12345678

🌎 Bonus: Deployment
Deployed App: https://dms-frontend-q93o.onrender.com/

✨ Enjoy
Created with ❤️ by [Peerawet]
