//Case Management System

//TOP PERSON INFO

// PERSON IMAGE ****************************************************************************************************

$("#changeimage").click(function () {
    "use strict";
    $("#showuploadpersonimage").show();
});

$("#cancelnewimage").click(function () {
    "use strict";
    $("#personbrowsebtn").val("");
    $("#showuploadpersonimage").hide();
});

$("#submitpersonimage").click(function () {
    "use strict";
    $("#personuploadForm").submit();
});

$("#removeimage").click(function () {
    "use strict";
    document.getElementById("personimagesrc").src = "../images/noimage_lg.jpg";
});

/*  ************************************************************************************************** */


document.getElementById("persontype").disabled = true;
document.getElementById("personrolestatus").disabled = true;


$("#personrole").change(function () {
    "use strict";
    var role = $("#personrole").val();
    document.getElementById("personrolestatus").selectedIndex = "0";
    document.getElementById("personrolestatus").disabled = true;
    document.getElementById("persontype").selectedIndex = "0";
    document.getElementById("persontype").disabled = true;
    if (role !== "0") {
        document.getElementById("persontype").style.display = "block";
        document.getElementById("persontype").disabled = false;
    }
});


$("#persontype").change(function () {
    "use strict";
    var x = $("#persontype").val();
    if (x === "0") {
        document.getElementById("personrolestatus").selectedIndex = "0";
        document.getElementById("personrolestatus").disabled = true;
    } else {
        document.getElementById("personrolestatus").selectedIndex = "1";
        document.getElementById("personrolestatus").disabled = false;
    }
});


$("#resetperson").click(function (e) {
    "use strict";
    e.preventDefault();
    getpersoninfo();
    $("#ablepersonform").prop("disabled", true);
    document.getElementById("persontype").disabled = true;
    document.getElementById("personrolestatus").disabled = true;
    var removereq = $("#personform .requiredfield");
    var r;
    for (r = 0; r < removereq.length; r += 1) {
        removereq[r].style.borderColor = "#cccccc";
    }
    $("#cancelsaveperson").hide();
    $("#editdeleteperson").show();
    $("#personform").reset();
});


//NOTE: Must Complete Validation  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function validateperson() {
    "use strict";
    var passvalidation = false;
    if ((($("#lastname").val()).trim() !== "") && (($("#firstname").val()).trim() !== "")
            && (($("#birthdate").val()).trim() !== "") && ($("#gender").val() !== "0")
            && ($("#personrole").val() !== "0") && ($("#persontype").val() !== "0") && ($("#personrolestatus").val() !== "0")) {
        passvalidation = true;
    } else {
        alert("invalid input");
    }
    return (passvalidation);
}


//Submit to Create Person
$("#submitperson1").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validateperson();
    var passvalidation = true;
//  NOTE VALIDATE PERSON FORM and POST back to Person Screen if passes
//  validate(personform);
    if (passvalidation === true) {
        $("#personform").submit();
    }
});

//Submit to Edit Person
$("#submitperson").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validateperson();
    var passvalidation = true;
//  NOTE VALIDATE PERSON FORM and POST back to Person Screen if passes
//  validate(personform);
    if (passvalidation === true) {
        $("#cancelsaveperson").hide();
        $("#editdeleteperson").show();
        $("#personform").submit();
    }
});


//Enables Person Form
$("#editperson").click(function () {
    "use strict";
    $("#ablepersonform").prop("disabled", false);
    document.getElementById("persontype").disabled = false;
    document.getElementById("personrolestatus").disabled = false;
    var removereq = $("#personform .requiredfield");
    var r;
    for (r = 0; r < removereq.length; r += 1) {
        removereq[r].style.borderColor = "#ffb8af";
    }
    if (document.getElementById("cancelsaveperson").style.visibility !== "visible") {
        $("#editdeleteperson").hide();
        $("#cancelsaveperson").show();
    } else {
        $("#cancelsaveperson").hide();
    }
});


//Delete Person Record et al.
$("#deleteperson").click(function () {
    "use strict";
    var checkstr = window.confirm("Are you sure you want to delete this?");
    if (checkstr === true) {
        alert("Handle Delete Person");
        //NOTE: PUT IN CODE TO DELETE PERSON RECORD
    } else {
        return false;
    }
});



//PERSON EXTENDED DEMOGRAPHICS  *********************************************************************************


//CONTACT PHONE  ******************************

document.getElementById("assocphoneorgid").disabled = true;
$("#contactphonetype").change(function () {
    "use strict";
    var business = $("#contactphonetype").val();
    if (business === "2") {
        document.getElementById("assocphoneorgid").disabled = false;
    } else {
        document.getElementById("assocphoneorgid").selectedIndex = "0";
        document.getElementById("assocphoneorgid").disabled = true;
    }
});



//CONTACT EMAIL  ******************************

document.getElementById("assocemailorgid").disabled = true;
$("#contactemailtype").change(function () {
    "use strict";
    var business = $("#contactemailtype").val();
    if (business === "2") {
        document.getElementById("assocemailorgid").disabled = false;
    } else {
        document.getElementById("assocemailorgid").selectedIndex = "0";
        document.getElementById("assocemailorgid").disabled = true;
    }
});


//CONTACT FAX  ******************************

document.getElementById("assocfaxorgid").disabled = true;
$("#contactfaxtype").change(function () {
    "use strict";
    var business = $("#contactfaxtype").val();
    if (business === "2") {
        document.getElementById("assocfaxorgid").disabled = false;
    } else {
        document.getElementById("assocfaxorgid").selectedIndex = "0";
        document.getElementById("assocfaxorgid").disabled = true;
    }
});

//NOTE: For now, disable fax input
$("#submitcontactfax").click(function (e) {
    "use strict";
    e.preventDefault();
    alert("Input/Edit Fax to come");
});


//CONTACT SOCIAL MEDIA   ***********************
//NOTE: For now, disable social media input
$("#submitcontactmedia").click(function (e) {
    "use strict";
    e.preventDefault();
    alert("Input/Edit Social Media to come");
});



//CONTACT ADDRESS  ******************************

document.getElementById("assocaddrorgid").disabled = true;
$("#contactaddresstype").change(function () {
    "use strict";
    var business = $("#contactaddresstype").val();
    if (business === "2") {
        document.getElementById("assocaddrorgid").disabled = false;
    } else {
        document.getElementById("assocaddrorgid").selectedIndex = "0";
        document.getElementById("assocaddrorgid").disabled = true;
    }
});

//NOTE: For now, disable address input
$("#submitcontactaddress").click(function (e) {
    "use strict";
    e.preventDefault();
    alert("Input/Edit Address to come");
});



//PERSON IDENTIFICATION   ***********************

$("#submitpersonidentification").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validatepersonidentification();
    var passvalidation = true;
//  NOTE VALIDATE PERSON IDENTIFICATION FORM and POST back to Person Screen if passes
//  validate(personidentificationform);
    if (passvalidation === true) {
        $("#personidentificationform").submit();
    }
});

