class Employee {
    constructor(firstName, lastName, identificationNumber, title, annualSalary) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.identificationNumber = identificationNumber;
        this.title = title;
        this.annualSalary = annualSalary;
    }
}

let employeeList = [];

let deletedEmployees = [];

let arrayDeleteIndex = 0

let annualSalaryTotal = 0

let monthlyTotal = 0

$(document).ready(onReady);

function onReady() {
    $("#submitButton").on('click', submitEmployee);

    $('#outputTable').on('click', '.deleteButton', deleteEmployee);

    $('#undoButton').on('click', undoDeletion);
}

function calculateMonthlyTotal() {
    annualSalaryTotal = 0;

    for (let entry of employeeList) {
        annualSalaryTotal += entry.annualSalary;
    };

    monthlyTotal = annualSalaryTotal / 12;

    monthlyTotal = Math.round(monthlyTotal);

    $('#totalMonthly').replaceWith(
        '<h2 id="totalMonthly">Total Monthly: $' + monthlyTotal + '</h2>');

    if (monthlyTotal > 20000) {
        $('#totalMonthly').css('background-color', 'red');
        $('#totalMonthly').css('color', 'white');
    }
}

function submitEmployee() {

    let incomingEmployee = new Employee(
        $('#firstName').val(),
        $('#lastName').val(),
        Number($('#identificationNumber').val()),
        $('#title').val(),
        Number($('#annualSalary').val()));

    for (property in incomingEmployee) {
        if (incomingEmployee[property] == '' || 0) {
            alert('Please fill in all fields before submitting');
            return;
        }
    }

    employeeList.push(incomingEmployee);
    updateDom();
    $('input').val('');
}

function deleteEmployee() {
    arrayDeleteIndex = Number($(this).attr('id'));

    deletedEmployees = deletedEmployees.concat(employeeList.splice(arrayDeleteIndex, 1));

    updateDom();
}

function undoDeletion() {
    employeeList = employeeList.concat(deletedEmployees.splice(deletedEmployees.length - 1, 1));
    updateDom();
}

function updateDom() {
    $('.outputDisplay').empty();
    for (let i = 0; i < employeeList.length; i++) {
        $('.outputDisplay').prepend(
            `<tr>
                <td>` + employeeList[i].firstName + `</td>
                <td>` + employeeList[i].lastName + `</td>
                <td>` + employeeList[i].identificationNumber + `</td>
                <td>` + employeeList[i].title + `</td>
                <td>` + employeeList[i].annualSalary + `</td>
            <td><button id="` + i + `" class="deleteButton">Remove Employee</button></td>
            </tr>`);
    };
   
    calculateMonthlyTotal();

    if (deletedEmployees.length > 0){
        $('#undoButton').prop('disabled', false);
    }
    else{
        $('#undoButton').prop('disabled', true);
    }
}