<h1>Swapped</h1>
<p><strong>Swapped</strong> is a skill-swapping web application that connects people looking to trade their talents and expertise. Instead of traditional payments, users can exchange skills with one another, fostering collaboration and community growth.</p>

<h2>Features</h2>
<ul>
  <li><strong>User Authentication</strong>: Sign up and sign in securely with a personalized profile.</li>
  <li><strong>Skill Selection</strong>: Choose skills you have or want to offer.</li>
  <li><strong>Custom Homepage</strong>: Navigate a streamlined user dashboard with tabs for home, messages, and profile.</li>
  <li><strong>Skill Management</strong>: Update and manage your skills with ease.</li>
  <li><strong>Responsive Design</strong>: Clean and intuitive interface across devices.</li>
</ul>

<h2>Tech Stack</h2>
<h3>Frontend</h3>
<ul>
  <li><strong>React</strong>: For building a dynamic and interactive UI.</li>
  <li><strong>CSS</strong>: For styling and layout.</li>
  <li><strong>Axios</strong>: For handling API requests.</li>
</ul>
<h3>Backend</h3>
<ul>
  <li><strong>Node.js</strong>: For server-side logic.</li>
  <li><strong>Express.js</strong>: For routing and middleware.</li>
  <li><strong>MongoDB (NoSQL)</strong>: For database storage and user data management.</li>
  <li><strong>Mongoose</strong>: For schema modeling.</li>
  <li><strong>JWT (JSON Web Tokens)</strong>: For secure user authentication.</li>
  <li><strong>Bcrypt</strong>: For password hashing.</li>
</ul>
<h3>Dev Tools</h3>
<ul>
  <li><strong>Postman</strong>: For testing API endpoints.</li>
  <li><strong>ESLint</strong>: For maintaining clean and error-free code.</li>
  <li><strong>React Router</strong>: For client-side routing.</li>
</ul>

<h2>Installation</h2>
<ol>
  <li>Clone the repository:
    <pre>
git clone https://github.com/your-username/swapped.git  
cd swapped
    </pre>
  </li>
  <li>Set up the backend:
    <pre>
cd server  
npm install
    </pre>
    <p>Create a <code>.env</code> file in the <code>server</code> folder and add the following:</p>
    <pre>
PORT=5000  
MONGO_URI=&lt;your-mongodb-connection-string&gt;  
JWT_SECRET=&lt;your-jwt-secret&gt;
    </pre>
    <p>Run the backend:</p>
    <pre>
node server.js
    </pre>
  </li>
  <li>Set up the frontend:
    <pre>
cd ../client  
npm install
    </pre>
    <p>Start the frontend:</p>
    <pre>
npm start
    </pre>
  </li>
  <li>Access the app:
    <p>Open your browser and navigate to <a href="http://localhost:3000">http://localhost:3000</a>.</p>
  </li>
</ol>

<h2>Usage</h2>
<ol>
  <li><strong>Sign Up</strong>: Create a new account.</li>
  <li><strong>Select Skills</strong>: Choose your skills and submit them.</li>
  <li><strong>Dashboard</strong>: Explore your personalized homepage with navigation tabs for home, messages, and profile.</li>
</ol>

<h2>Future Enhancements</h2>
<ul>
  <li><strong>Skill Matching</strong>: Suggest matches based on user preferences.</li>
  <li><strong>Real-Time Chat</strong>: Enable users to communicate directly.</li>
  <li><strong>Reviews & Ratings</strong>: Provide feedback on skill exchanges.</li>
  <li><strong>Mobile App</strong>: Expand to iOS and Android platforms.</li>
</ul>

<h2>Contributing</h2>
<p>Contributions are welcome! :) </p>

<h2>License</h2>
<p>This project is licensed under the <a href="LICENSE">MIT License</a>.</p>
