<h1>📄 TPS - Document Management System</h1>

<p>A mini document management system (DMS) where users can upload, view, tag, and manage documents securely.</p>

<p><strong>Live Demo:</strong> <a href="https://dms-frontend-q93o.onrender.com/" target="_blank">https://dms-frontend-q93o.onrender.com/</a></p>

<hr>

<h2>🚀 Setup Instructions</h2>

<ol>
  <li><strong>Clone the repository</strong><br>
    <code>git clone https://github.com/peerawet/TPS.git</code><br>
    <code>cd TPS/</code>
  </li>

  <li><strong>Backend setup</strong><br>
    <code>cd backend</code><br>
    <code>cp .env-example .env</code><br>
    <code>npm install</code><br>
    <code>cd ..</code>
  </li>

  <li><strong>Frontend setup</strong><br>
    <code>cd frontend</code><br>
    <code>cp .env-example .env</code><br>
    <code>npm ci --legacy-peer-dep</code><br>
    <code>cd ..</code>
  </li>

  <li><strong>Start the project</strong><br>
    <code>docker-compose up --build</code>
  </li>
</ol>

<hr>

<h2>🌐 Access the Application</h2>

<ul>
  <li><strong>Frontend →</strong> <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a></li>
  <li><strong>Backend API →</strong> <a href="http://localhost:5000/" target="_blank">http://localhost:5000/</a></li>
</ul>

<hr>

<h2>🛠 Technologies Used</h2>

<table>
  <tr>
    <td><strong>Frontend</strong></td>
    <td>React.js, Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>Backend</strong></td>
    <td>Node.js, Express.js</td>
  </tr>
  <tr>
    <td><strong>Database</strong></td>
    <td>Supabase (PostgreSQL)</td>
  </tr>
  <tr>
    <td><strong>Storage</strong></td>
    <td>Supabase Storage</td>
  </tr>
  <tr>
    <td><strong>Authentication</strong></td>
    <td>JWT (JSON Web Tokens)</td>
  </tr>
  <tr>
    <td><strong>Deployment</strong></td>
    <td>Docker, Docker Compose, Render.com</td>
  </tr>
</table>

<hr>

<h2>📋 Assumptions and Limitations</h2>

<ul>
  <li>✅ Only authenticated users can upload, edit, download, and delete documents.</li>
  <li>✅ Allowed file types: .pdf, .docx, .txt</li>
  <li>✅ Maximum upload file size: 10MB.</li>
  <li>✅ Each document is tied to the uploading user only.</li>
  <li>🚫 No OCR / full-text search inside file contents (metadata only).</li>
</ul>

<hr>

<h2>⏳ Time Spent</h2>

<table>
  <tr>
    <td>Task</td>
    <td>Hours</td>
  </tr>
  <tr>
    <td>Project setup</td>
    <td>8</td>
  </tr>
  <tr>
    <td>Backend API development</td>
    <td>4</td>
  </tr>
  <tr>
    <td>Frontend development</td>
    <td>4</td>
  </tr>
  <tr>
    <td>Testing &amp; debugging</td>
    <td>2</td>
  </tr>
  <tr>
    <td><strong>Total</strong></td>
    <td><strong>18 hours</strong></td>
  </tr>
</table>

<hr>

<h2>🔑 Sample Login Credentials</h2>

<p><strong>Deployed App:</strong> <a href="https://dms-frontend-q93o.onrender.com/" target="_blank">https://dms-frontend-q93o.onrender.com/</a></p>

<ul>
  <li><strong>Email:</strong> peerawet1996@gmail.com</li>
  <li><strong>Password:</strong> 12345678</li>
</ul>

<hr>

<h2>🌎 Bonus: Deployment</h2>

<p><strong>Deployed App:</strong> <a href="https://dms-frontend-q93o.onrender.com/" target="_blank">https://dms-frontend-q93o.onrender.com/</a></p>

<hr>

<h2>✨ Enjoy</h2>

<p>Created with ❤️ by <strong>Peerawet</strong></p>
