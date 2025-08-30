const http = require("http");
const repo = require("./repository/studentsRepository");
const port = 4000;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  const { method, url } = req;

  // RUTA: GET /students
  if (url === "/students" && method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify(repo.getAll()));
  }

  // RUTA: GET /students/:id
  else if (url.startsWith("/students/") && method === "GET") {
    const id = parseInt(url.split("/")[2]);
    const student = repo.getById(id);

    if (student) {
      res.statusCode = 200;
      res.end(JSON.stringify(student));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
    }
  }

  // RUTA: POST /students
  else if (url === "/students" && method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const studentData = JSON.parse(body);
        const newStudent = repo.create(studentData);
        res.statusCode = 201;
        res.end(JSON.stringify(newStudent));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: error.message }));
      }
    });
  }

  // RUTA: PUT /students/:id
  else if (url.startsWith("/students/") && method === "PUT") {
    const id = parseInt(url.split("/")[2]);
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      const updated = repo.update(id, JSON.parse(body));
      if (updated) {
        res.statusCode = 200;
        res.end(JSON.stringify(updated));
      } else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
      }
    });
  }

  // RUTA: DELETE /students/:id
  else if (url.startsWith("/students/") && method === "DELETE") {
    const id = parseInt(url.split("/")[2]);
    const deleted = repo.remove(id);
    if (deleted) {
      res.statusCode = 200;
      res.end(JSON.stringify(deleted));
    } else {
      res.statusCode = 404;
      res.end(JSON.stringify({ error: "Estudiante no encontrado" }));
    }
  }

  // NUEVA RUTA: POST /listByStatus
  else if (url === "/listByStatus" && method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { status } = JSON.parse(body);
        const filteredStudents = repo.listByStatus(status);
        res.statusCode = 200;
        res.end(JSON.stringify(filteredStudents));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid request body" }));
      }
    });
  }

  // NUEVA RUTA: POST /listByGrade
  else if (url === "/listByGrade" && method === "POST") {
    let body = "";
    req.on("data", chunk => (body += chunk));
    req.on("end", () => {
      try {
        const { minGrade, maxGrade } = JSON.parse(body);
        const filteredStudents = repo.listByGrade(minGrade, maxGrade);
        res.statusCode = 200;
        res.end(JSON.stringify(filteredStudents));
      } catch (error) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid request body" }));
      }
    });
  }

  // Ruta no encontrada
  else {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Ruta no encontrada" }));
  }
});

server.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});