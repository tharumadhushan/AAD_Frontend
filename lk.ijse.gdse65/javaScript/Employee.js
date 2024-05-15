$(document).ready(function (){
    function loadAllEmployee() {
        $("#employee-tbl-body").empty();
        $.ajax({
            url: "http://localhost:8080/shop/api/v1/employee",
            method: "GET",
            dataType: "json",
            success: function (resp) {
                for (const employee of resp) {
                    let row = `<tr><td>${employee.employeeId}</td><td>${employee.employeeName}</td><td>${employee.gender}</td><td>${employee.role}</td>
                                    <td>${employee.dob}</td><td>${employee.joinDate}</td><td>${employee.attachedBranch}</td><td>${employee.contactNo}</td><td>${employee.email}</td></tr>`;
                    $("#employee-tbl-body").append(row);
                }
                callMethod();
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    }

    // Function to bind click event to customer table rows
    function callMethod() {
        $("#employee-tbl-body>tr").click(function (){
            let employeeId = $(this).children().eq(0).text();
            let employeeName = $(this).children().eq(1).text();
            let gender = $(this).children().eq(2).text();
            let role = $(this).children().eq(3).text();
            let dob = $(this).children().eq(5).text();
            let joinDate = $(this).children().eq(4).text();
            let branch = $(this).children().eq(6).text();
            let contact = $(this).children().eq(7).text();
            let email = $(this).children().eq(8).text();

            $("#emp_id").val(employeeId);
            $("#emp_name").val(employeeName);
            $("#emp_gender").val(gender);
            $("#emp_role").val(role);
            $("#emp_dob").val(dob);
            $("#emp_joindate").val(joinDate);
            $("#attachedBranch").val(branch);
            $("#contact").val(contact);
            $("#emp_email").val(email);
        });
    }

    // Save customer
        $("#save_employee").click(function () {
            let formData = new FormData();

            // Append form data
            formData.append("employeeId", $("#emp_id").val());
            formData.append("employeeName", $("#emp_name").val());
            formData.append("gender", $("#emp_gender").val());
            formData.append("status", $("#status").val());
            formData.append("designation", $("#designation").val());
            formData.append("role", $("#emp_role").val());
            formData.append("dob", $("#emp_dob").val());
            formData.append("joinDate", $("#emp_joindate").val());
            formData.append("attachedBranch", $("#attachedBranch").val());
            formData.append("employeeAddress1", $("#employeeAddress1").val());
            formData.append("employeeAddress2", $("#employeeAddress2").val());
            formData.append("employeeAddress3", $("#employeeAddress3").val());
            formData.append("employeeAddress4", $("#employeeAddress4").val());
            formData.append("employeeAddress5", $("#employeeAddress5").val());
            formData.append("contactNo", $("#contact").val());
            formData.append("email", $("#emp_email").val());
            formData.append("informInCaseOfEmergency", $("#informInCaseOfEmergency").val());
            formData.append("emergencyContactNo", $("#emergencyContactNo").val());

            // Append file data
            let fileInput = document.getElementById('emp_pic');
            formData.append("employeeProfilePic", fileInput.files[0]);

            $.ajax({
                method: "POST",
                url: "http://localhost:8080/shop/api/v1/employee",
                processData: false, // Prevent jQuery from automatically processing data
                contentType: false, // Prevent jQuery from automatically setting contentType
                data: formData,
                success: function (data) {
                    reset(); // Assuming reset() function is defined elsewhere
                    alert("Employee saved successfully.");
                },
                error: function (xhr, status, error) {
                    alert("Error: " + error);
                }
            });
        });




    // Update customer
    $("#update_employee").click(function () {
        let employeeId = $("#emp_id").val(); // Assuming you have a field to input the employee ID
        let formData = new FormData();

        // Append form data
        formData.append("employeeId", employeeId);
        formData.append("employeeName", $("#emp_name").val());
        formData.append("gender", $("#emp_gender").val());
        formData.append("status", $("#status").val());
        formData.append("designation", $("#designation").val());
        formData.append("role", $("#emp_role").val());
        formData.append("dob", $("#emp_dob").val());
        formData.append("joinDate", $("#emp_joindate").val());
        formData.append("attachedBranch", $("#attachedBranch").val());
        formData.append("employeeAddress1", $("#employeeAddress1").val());
        formData.append("employeeAddress2", $("#employeeAddress2").val());
        formData.append("employeeAddress3", $("#employeeAddress3").val());
        formData.append("employeeAddress4", $("#employeeAddress4").val());
        formData.append("employeeAddress5", $("#employeeAddress5").val());
        formData.append("contactNo", $("#contact").val());
        formData.append("email", $("#emp_email").val());
        formData.append("informInCaseOfEmergency", $("#informInCaseOfEmergency").val());
        formData.append("emergencyContactNo", $("#emergencyContactNo").val());

        // Append file data if updated
        let fileInput = document.getElementById('emp_pic');
        if (fileInput.files.length > 0) {
            formData.append("employeeProfilePic", fileInput.files[0]);
        }

        $.ajax({
            method: "PATCH", // Change method to PUT
            url: "http://localhost:8080/shop/api/v1/employee", // Include employee ID in URL
            processData: false,
            contentType: false,
            data: formData,
            success: function (data) {
                reset(); // Assuming reset() function is defined elsewhere
                alert("Employee updated successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });


    // Delete customer
    $("#delete_employee").click(function () {
        let empID = $("#emp_id").val();

        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/shop/api/v1/employee/" + empID,
            success: function (data) {
                reset();
                alert("Employee deleted successfully.");
            },
            error: function (xhr, status, error) {
                alert("Error: " + error);
            }
        });
    });

    // Reset form
    $("#customer_reset").click(function () {
        reset();
    });

    // Reset function
    function reset() {
            $("#emp_id").val(""),
            $("#emp_name").val(""),
            $("#emp_pic").val(""),
            $("#emp_gender").val(""),
            $("#status").val(""),
            $("#designation").val(""),
            $("#emp_role").val(""),
            $("#emp_dob").val(""),
            $("#emp_joindate").val(""),
            $("#attachedBranch").val(""),
            $("#employeeAddress1").val(""),
            $("#employeeAddress2").val(""),
            $("#employeeAddress3").val(""),
            $("#employeeAddress4").val(""),
            $("#employeeAddress5").val(""),
            $("#contact").val(""),
            $("#emp_email").val(""),
            $("#informInCaseOfEmergency").val(""),
            $("#emergencyContactNo").val("")
        loadAllEmployee();
    }

    // Load customers on page load
    loadAllEmployee();
});
