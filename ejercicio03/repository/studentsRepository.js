let students = [
  { 
    id: 1, 
    name: "Ana", 
    grade: 18,
    age: 21,
    email: "ana.gonzalez@ejemplo.com",
    phone: "+51 987654321",
    enrollmentNumber: "2024001",
    course: "Ingeniería de Sistemas",
    year: 2,
    subjects: ["Bases de Datos", "Redes"],
    gpa: 3.5,
    status: "Activo",
    admissionDate: "2023-03-01"
  },
  { 
    id: 2, 
    name: "Luis", 
    grade: 14,
    age: 20,
    email: "luis.rodriguez@ejemplo.com",
    phone: "+51 912345678",
    enrollmentNumber: "2023002",
    course: "Diseño y Desarrollo de Software C24",
    year: 3,
    subjects: ["Algoritmos", "Bases de Datos"],
    gpa: 3.2,
    status: "Inactivo",
    admissionDate: "2022-03-01"
  },
  { 
    id: 3, 
    name: "Pedro", 
    grade: 16,
    age: 23,
    email: "pedro.sanchez@ejemplo.com",
    phone: "+51 999888777",
    enrollmentNumber: "2022003",
    course: "Ingeniería de Sistemas",
    year: 4,
    subjects: ["Redes", "Inteligencia Artificial"],
    gpa: 3.8,
    status: "Activo",
    admissionDate: "2021-03-01"
  },
];

function getAll() {
  return students;
}

function getById(id) {
  return students.find(s => s.id === id);
}

function create(student) {

  if (!student.name || !student.email || !student.course || !student.phone) {
    throw new Error("Missing required fields: name, email, course, and phone are mandatory.");
  }
  student.id = students.length + 1;
  students.push(student);
  return student;
}

function update(id, updateData) {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {

    students[index] = { ...students[index], ...updateData };
    return students[index];
  }
  return null;
}

function remove(id) {
  const index = students.findIndex(s => s.id === id);
  if (index !== -1) {
    return students.splice(index, 1)[0];
  }
  return null;
}


function listByStatus(status) {
  return students.filter(s => s.status === status);
}

function listByGrade(minGrade, maxGrade) {
  return students.filter(s => s.grade >= minGrade && s.grade <= maxGrade);
}

module.exports = { 
  getAll, 
  getById, 
  create, 
  update, 
  remove, 
  listByStatus,
  listByGrade
};