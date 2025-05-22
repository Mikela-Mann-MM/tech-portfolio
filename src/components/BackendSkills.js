export function renderBackendSkills() {
  const backendSkills = document.getElementById('backend-skills')
  
  backendSkills.innerHTML = `
    <div class="backend-showcase">
      <div class="code-editor">
        <div class="editor-header">
          <span class="file-name">server.js</span>
          <div class="editor-buttons">
            <span class="editor-btn red"></span>
            <span class="editor-btn yellow"></span>
            <span class="editor-btn green"></span>
          </div>
        </div>
        <div class="editor-content">
          <pre><code>// Express server setup
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Database connection
const db = new sqlite3.Database('./database.db');

// Create projects table
db.serialize(() => {
  db.run(\`CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    image_url TEXT,
    technologies TEXT,
    github_url TEXT,
    demo_url TEXT
  )\`);
});

// Middleware
app.use(express.json());
app.use(express.static('public'));

// RESTful API Routes
app.get('/api/projects', (req, res) => {
  db.all('SELECT * FROM projects', [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

app.get('/api/projects/:id', (req, res) => {
  db.get('SELECT * FROM projects WHERE id = ?', [req.params.id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(row);
  });
});

app.post('/api/projects', (req, res) => {
  const { title, description, image_url, technologies, github_url, demo_url } = req.body;
  
  db.run(
    \`INSERT INTO projects (title, description, image_url, technologies, github_url, demo_url) 
     VALUES (?, ?, ?, ?, ?, ?)\`,
    [title, description, image_url, technologies, github_url, demo_url],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({
        id: this.lastID,
        message: "Project created successfully"
      });
    }
  );
});

app.put('/api/projects/:id', (req, res) => {
  const { title, description, image_url, technologies, github_url, demo_url } = req.body;
  
  db.run(
    \`UPDATE projects 
     SET title = ?, description = ?, image_url = ?, technologies = ?, github_url = ?, demo_url = ? 
     WHERE id = ?\`,
    [title, description, image_url, technologies, github_url, demo_url, req.params.id],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      
      res.json({
        message: "Project updated successfully"
      });
    }
  );
});

app.delete('/api/projects/:id', (req, res) => {
  db.run('DELETE FROM projects WHERE id = ?', [req.params.id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    
    res.json({
      message: \`Project with id \${req.params.id} deleted successfully\`
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(\`Server running at http://localhost:\${port}\`);
});</code></pre>
        </div>
      </div>
      
      <div class="api-section">
        <div class="endpoint-list">
          <h3>API Endpoints</h3>
          <div class="endpoint">
            <span class="method get">GET</span>
            <span class="url">/api/projects</span>
            <span class="description">Fetch all projects</span>
          </div>
          <div class="endpoint">
            <span class="method get">GET</span>
            <span class="url">/api/projects/:id</span>
            <span class="description">Fetch single project</span>
          </div>
          <div class="endpoint">
            <span class="method post">POST</span>
            <span class="url">/api/projects</span>
            <span class="description">Create new project</span>
          </div>
          <div class="endpoint">
            <span class="method put">PUT</span>
            <span class="url">/api/projects/:id</span>
            <span class="description">Update project</span>
          </div>
          <div class="endpoint">
            <span class="method delete">DELETE</span>
            <span class="url">/api/projects/:id</span>
            <span class="description">Delete project</span>
          </div>
        </div>
        
        <div class="code-editor response-editor">
          <div class="editor-header">
            <span class="file-name">response.json</span>
            <div class="editor-buttons">
              <span class="editor-btn red"></span>
              <span class="editor-btn yellow"></span>
              <span class="editor-btn green"></span>
            </div>
          </div>
          <div class="editor-content">
            <div class="response-container">
              <pre><code>{
  "projects": [
    {
      "id": 1,
      "title": "E-commerce Platform",
      "description": "Simple online store with cart functionality",
      "technologies": "Node.js, Express, SQLite, JavaScript",
      "github_url": "https://github.com/mikelamann/birgersbolcher",
      "demo_url": "https://birgersbolcher.mikelamann.com"
    },
    {
      "id": 2,
      "title": "Under construction",
      "description": "More info coming soon",
      "technologies": "Express, SQLite, React, SCSS",
      "github_url": "https://github.com/mikelamann/newproject",
      "demo_url": "https://newproject.mikelamann.com"
    }
  ]
}</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="backend-skills-info">
      <h3>Backend Development Skills</h3>
      <p>Beyond crafting beautiful frontends, I build robust server-side solutions using Node.js and Express to power my applications. My experience includes:</p>
      
      <ul class="skills-list">
        <li><span class="skill-highlight">RESTful API Design</span> - Creating intuitive and well-documented endpoints that follow REST principles</li>
        <li><span class="skill-highlight">Database Management</span> - Using SQLite for efficient data storage</li>
        <li><span class="skill-highlight">Full-Stack Integration</span> - Connecting frontend interfaces with backend services</li>
      </ul>
  `;

  // Tilføj interactivity til API demo
  const endpoints = document.querySelectorAll('.endpoint')
  endpoints.forEach(endpoint => {
    endpoint.addEventListener('click', () => {
      endpoints.forEach(ep => ep.classList.remove('active'))
      endpoint.classList.add('active')
      
      // Viser forskellige svar baseret på endpoint
      const responseContainer = document.querySelector('.response-container pre code')
      const method = endpoint.querySelector('.method').textContent
      const url = endpoint.querySelector('.url').textContent
      
      if (method === 'GET' && url === '/api/projects') {
        // GET all projects
        responseContainer.textContent = `{
  "projects": [
    {
      "id": 1,
      "title": "E-commerce Platform",
      "description": "Simple online store with cart functionality",
      "technologies": "Node.js, Express, SQLite, JavaScript",
      "github_url": "https://github.com/mikelamann/birgersbolcher",
      "demo_url": "https://birgersbolcher.mikelamann.com"
    },
    {
      "id": 2,
      "title": "Under construction",
      "description": "More info coming soon",
      "technologies": "Express, SQLite, React, SCSS",
      "github_url": "https://github.com/mikelamann/newproject",
      "demo_url": "https://newproject.mikelamann.com"
    }
  ]
}`
      } else if (method === 'GET' && url.includes(':id')) {
        // GET single project
        responseContainer.textContent = `{
  "id": 1,
  "title": "E-commerce Platform",
  "description": "Full-featured online store with cart functionality",
  "technologies": "Node.js, Express, SQLite, JavaScript",
  "github_url": "https://github.com/mikelamann/birgersbolcher",
  "demo_url": "https://birgersbolcher.mikelamann.com"
}`
      } else if (method === 'POST') {
        // POST new project
        responseContainer.textContent = `{
  "id": 3,
  "message": "Project created successfully"
}`
      } else if (method === 'PUT') {
        // PUT update project
        responseContainer.textContent = `{
  "message": "Project updated successfully"
}`
      } else if (method === 'DELETE') {
        // DELETE project
        responseContainer.textContent = `{
  "message": "Project with id 2 deleted successfully"
}`
      }
    })
  })
}