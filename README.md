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

<h2>📋 ข้อสมมติและข้อจำกัด (Assumptions and Limitations)</h2>

<ul>
  <li>⚠️ การใช้ Supabase เป็นระบบ backend มีข้อจำกัดด้านการขยายตัว (Scalability) แนวนอน เนื่องจากปัจจุบันไม่มีการจัดการโครงสร้างพื้นฐาน (Infrastructure) ผ่านสคริปต์ การขยายระบบจึงสามารถทำได้เพียงแนวตั้งเท่านั้น (เพิ่มประสิทธิภาพโดยการอัปเกรดแผนการใช้งานของ Supabase)</li>

  <li>⚠️ ยังไม่มีสคริปต์สำหรับการทำ Migration ฐานข้อมูล หากมีการเปลี่ยนแปลงโครงสร้างฐานข้อมูล ผู้ดูแลจะต้องดำเนินการปรับแก้ด้วยตนเอง ซึ่งเสี่ยงต่อข้อผิดพลาด และทำให้การขยายระบบในอนาคตมีความยุ่งยาก</li>

  <li>⚠️ ยังไม่มีการเขียนสคริปต์สำหรับการทดสอบระบบ (Test Script)</li>

  <li>⚡ ระบบถูก Deploy ผ่าน Render.com โดยตั้งค่าให้ทำ Auto-deploy เมื่อมีการ Push ไปยังBranch <code>main</code> โดยสามารถต่อยอด CI/CD เต็มรูปแบบ เช่น การทำ Automated Testing, Build, และ Deployment Workflow ได้ในอนาคต</li>
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
