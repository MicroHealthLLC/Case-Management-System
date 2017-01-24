//Case Management System

//TOP Organization INFO

document.getElementById("organizationtype").disabled = true;
document.getElementById("organizationrolestatus").disabled = true;

$("#organizationrole").change(function () {
    "use strict";
    var role = $("#organizationrole").val();
    document.getElementById("organizationtype").selectedIndex = "0";
    document.getElementById("organizationtype").disabled = true;
    document.getElementById("organizationrolestatus").selectedIndex = "0";
    document.getElementById("organizationrolestatus").disabled = true;
    if (role !== "0") {
        document.getElementById("organizationtype").options[0].style.display = "block";
        document.getElementById("organizationtype").disabled = false;
    }
});


$("#organizationtype").change(function () {
    "use strict";
    var x = $("#organizationtype").val();
    if (x === "0") {
        document.getElementById("organizationrolestatus").selectedIndex = "0";
        document.getElementById("organizationrolestatus").disabled = true;
    } else {
        document.getElementById("organizationrolestatus").selectedIndex = 1;
        document.getElementById("organizationrolestatus").disabled = false;
    }
});


$("#resetorganization").click(function (e) {
    "use strict";
    e.preventDefault();
    getorganizationinfo();
    $("#ableorganizationform").prop("disabled", true);
    document.getElementById("organizationtype").disabled = true;
    document.getElementById("organizationrolestatus").disabled = true;
    var removereq = $("#organizationform .requiredfield");
    for (var r = 0; r < removereq.length; r += 1) {
        removereq[r].style.borderColor = "#cccccc";
    }
    $("#cancelsaveorganization").hide();
    $("#editdeleteorganization").show();
    $("#organizationform").reset();
});


//NOTE: Must Complete Validation  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function validateorganization() {
    "use strict";
    var passvalidation = false;
    if ((($("#organizationname").val()).trim() !== "") && ($("#organizationrole").val() !== "0")
            && ($("#organizationtype").val() !== "0") && ($("#organizationrolestatus").val() !== "0")) {
        passvalidation = true;
alert('from validation ' + passvalidation);
    } else {
        alert('invalid input');
    }
    return (passvalidation);
}

//Submit to Create Organization
$("#submitorganization1").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validateorganization();
    var passvalidation = true;
//  NOTE VALIDATE Organization FORM and POST back to Organization Screen if passes
//  validate(organizationform);
    if (passvalidation === true) {
//        alert("Input main record");
        $("#organizationform").submit();
    }
});

//Submit to Edit Organization
$("#submitorganization").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validateorganization();
    var passvalidation = true;
//  NOTE VALIDATE Organization FORM and POST back to Organization Screen if passes
//  validate(organizationform);
    if (passvalidation === true) {
        $("#cancelsaveorganization").hide();
        $("#editdeleteorganization").show();
//        $("#ableorganizationform").prop("disabled", true);
//        alert("Edit main record");
        $("#organizationform").submit();
    }
});

//Enables Organization Form
$("#editorganization").click(function () {
    "use strict";
    $("#ableorganizationform").prop("disabled", false);
    document.getElementById("organizationtype").disabled = false;
    document.getElementById("organizationrolestatus").disabled = false;
    var removereq = $("#organizationform .requiredfield");
    for (var r = 0; r < removereq.length; r += 1) {
        removereq[r].style.borderColor = "#ffb8af";
    }
    if (document.getElementById("cancelsaveorganization").style.visibility !== "visible") {
        $("#editdeleteorganization").hide();
        $("#cancelsaveorganization").show();
   } else {
        $("#cancelsaveorganization").hide();
    }
});

//Delete Organization Record et al.
$("#deleteorganization").click(function () {
    "use strict";
    var checkstr = window.confirm("Are you sure you want to delete this?");
    if (checkstr === true) {
        alert("Handle Delete Organization");
        //NOTE: PUT IN CODE TO DELETE ORGANIZATION RECORD
    } else {
        return false;
    }
});

