const http = require("http");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const PORT = 3000;


// Función para renderizar plantillas con datos
function renderTemplate(res, fileName, data) {
  const filePath = path.join(__dirname, "views", fileName);

  fs.readFile(filePath, "utf8", (err, templateData) => {
    if (err) {
      res.statusCode = 500;
      res.end("Error interno del servidor");
      return;
    }

    const template = handlebars.compile(templateData);
    const html = template(data);

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end(html);
  });
}

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    renderTemplate(res, "home.hbs", {
      title: "Inicio 🚀",
      welcomeMessage: "Bienvenido al laboratorio de Node.js",
      day: new Date().toLocaleDateString("es-PE"),
      students: ["Ana", "Luis", "Pedro", "María"],
    });

  } else if (req.url === "/about") {
    renderTemplate(res, "about.hbs", {
      title: "Acerca del curso",
      course: "Programación Web Avanzada",
      teacher: "Prof. Edwin William",
      date: new Date().toLocaleDateString("es-PE"),
    });
    } else if (req.url === "/students") {
    renderTemplate(res, "students.hbs", {
        title: "Notas de estudiantes",
        students: [
        { name: "Ana", grade: 18, passed: true },
        { name: "Luis", grade: 14, passed: false },
        { name: "Pedro", grade: 16, passed: true },
        { name: "María", grade: 12, passed: false },
        ],
    });

  } else {
    res.statusCode = 404;
    res.end("<h1>404 - Página no encontrada</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
