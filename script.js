const form = document.getElementById("studentForm");
const studentTable = document
  .getElementById("studentTable")
  .querySelector("tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];

const renderStudents = () => {
  studentTable.innerHTML = "";

  students.forEach((student, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.class}</td>
      <td>${student.rollNo}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editStudent(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    studentTable.appendChild(row);
  });
};

const saveToLocalStorage = () => {
  localStorage.setItem("students", JSON.stringify(students));
};

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const id = document.getElementById("studentId").value.trim();
  const studentClass = document.getElementById("class").value.trim();
  const rollNo = document.getElementById("rollNo").value.trim();

  if (!name || !id || !studentClass || !rollNo) {
    alert("All fields are required.");
    return;
  }

  students.push({ name, id, class: studentClass, rollNo });
  saveToLocalStorage();
  renderStudents();
  form.reset();
});

function deleteStudent(index) {
  students.splice(index, 1);
  saveToLocalStorage();
  renderStudents();
}

function editStudent(index) {
  const student = students[index];

  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.id;
  document.getElementById("class").value = student.class;
  document.getElementById("rollNo").value = student.rollNo;

  students.splice(index, 1);
  saveToLocalStorage();
  renderStudents();
}

renderStudents();
