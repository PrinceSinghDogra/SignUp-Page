async function fetchEmployees() {
    const response = await fetch('http://localhost:3001/employees');
    const employees = await response.json();
    const tableBody = document.querySelector('#employeeTable tbody');
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.salary}</td>
            <td>${employee.department}</td>
            <td class="action-buttons">
                <button class="update" onclick="showUpdateForm(${employee.id}, '${employee.name}', ${employee.salary})">Update</button>
                <button onclick="deleteEmployee(${employee.id})">Delete</button>
            </td>`;
        tableBody.appendChild(row);
    });
}

const addForm = document.getElementById('addEmployeeForm');
const addMessage = document.getElementById('addMessage');
addForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const department = document.getElementById('department').value;
    const salary = document.getElementById('salary').value;
    console.log(name,department,salary);
    const response = await fetch('http://localhost:3001/employees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, department, salary })
    });
    if (response.ok) {
        addMessage.textContent = 'Employee added successfully!';
        addForm.reset();
        fetchEmployees();
    } else {
        addMessage.textContent = 'Failed to add employee.';
    }
});

async function deleteEmployee(id) {
    const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        fetchEmployees();
    } else {
        alert('Failed to delete employee.');
    }
}

function showUpdateForm(id, name, salary) {
    const updateFormContainer = document.createElement('div');
    updateFormContainer.classList.add('form-container');
    updateFormContainer.innerHTML = `
        <h3>Update Employee</h3>
        <form id="updateEmployeeForm">
            <label for="updateName">Name:</label>
            <input type="text" id="updateName" name="name" value="${name}" required>
            <label for="updateSalary">Salary:</label>
            <input type="number" id="updateSalary" name="salary" value="${salary}" required>
            <button type="submit">Update Employee</button>
        </form>
        <div class="message" id="updateMessage"></div>`;
    document.body.appendChild(updateFormContainer);
    const updateForm = document.getElementById('updateEmployeeForm');
    const updateMessage = document.getElementById('updateMessage');
    updateForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const updatedName = document.getElementById('updateName').value;
        const updatedSalary = document.getElementById('updateSalary').value;
        const response = await fetch(`http://localhost:3001/employees/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: updatedName, salary: updatedSalary })
        });
        if (response.ok) {
            updateMessage.textContent = 'Employee updated successfully!';
            fetchEmployees();
            document.body.removeChild(updateFormContainer);
        } else {
            updateMessage.textContent = 'Failed to update employee.';
        }
    });
}

fetchEmployees();
