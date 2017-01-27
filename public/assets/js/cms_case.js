//Case Management System


//TOP Case INFO

document.getElementById("casecategory").disabled = true;
document.getElementById("casetype").disabled = true;
document.getElementById("casestatus").disabled = true;

$("#casedomain").change(function () {
    "use strict";
    var x = $("#casedomain").val();
    document.getElementById("casestatus").selectedIndex = "0";
    document.getElementById("casestatus").disabled = true;
    document.getElementById("casetype").selectedIndex = "0";
    document.getElementById("casetype").disabled = true;
    document.getElementById("casecategory").selectedIndex = "0";
    document.getElementById("casecategory").disabled = true;
    if (x !== "0") {
        document.getElementById("casecategory").disabled = false;
    }
});

$("#casecategory").change(function () {
    "use strict";
    var category = $("#casecategory").val();
    var i;
    document.getElementById("casestatus").selectedIndex = "0";
    document.getElementById("casestatus").disabled = true;
    document.getElementById("casetype").selectedIndex = "0";
    document.getElementById("casetype").disabled = true;
    if (category !== "0") {
        document.getElementById("casetype").options[0].style.display = "block";
        var topic = document.getElementById("casedomain").selectedIndex + " " + document.getElementById("casecategory").selectedIndex;
        for (i = 1; i < document.getElementById("casetype").length; i += 1) {
            if (document.getElementById("casetype").options[i].className === topic) {
                document.getElementById("casetype").options[i].style.display = "block";
            } else {
                document.getElementById("casetype").options[i].style.display = "none";
            }
        }
        document.getElementById("casetype").disabled = false;
    }
});

$("#casetype").change(function () {
    "use strict";
    var x = $("#casetype").val();
    if (x === "0") {
        document.getElementById("casestatus").selectedIndex = "0";
        document.getElementById("casestatus").disabled = true;
    } else {
        document.getElementById("casestatus").selectedIndex = "1";
        document.getElementById("casestatus").disabled = false;
    }
});


$("#resetcase").click(function (e) {
    "use strict";
    e.preventDefault();
    getcaseinfo();
    $("#selectparentmodule").hide();
    $("#ablecaseform").prop("disabled", true);
    document.getElementById("casecategory").disabled = true;
    document.getElementById("casetype").disabled = true;
    document.getElementById("casestatus").disabled = true;
    var removereq = $("#caseform .requiredfield");
    var r;
    for (r = 0; r < removereq.length; r += 1) {
        removereq[r].style.borderColor = "#cccccc";
    }
    $("#cancelsavecase").hide();
    $("#editdeletecase").show();
    $("#caseform").reset();
});


//NOTE: Must Complete Validation  !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function validatecase() {
    "use strict";
    var passvalidation = false;
    if ((($("#casetitle").val()).trim() !== "") && (($("#casestartdate").val()).trim() !== "")
            && ($("#casedomain").val() !== "0") && ($("#casecategory").val() !== "0")
            && ($("#casetype").val() !== "0") && ($("#casestatus").val() !== "0")
            && ($("#caseseverity").val() !== "0") && ($("#casepriority").val() !== "0")) {
        passvalidation = true;
    } else {
        alert("invalid input");
    }
    return (passvalidation);
}

//Submit to Create Case
$("#submitcase1").click(function (e) {
    "use strict";
    e.preventDefault();
//    $("#selectparentmodule").hide();
//    var passvalidation = validatecase();
    var passvalidation = true;
//  NOTE VALIDATE CASE FORM and POST back to Case Screen if passes
//  validate(caseform);
    if (passvalidation === true) {
        $("#caseform").submit();
    }
});

//Submit to Edit Case
$("#submitcase").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validatecase();
    var passvalidation = true;
//  NOTE VALIDATE CASE FORM and POST back to Case Screen if passes
//  validate(caseform);
    if (passvalidation === true) {
        $("#cancelsavecase").hide();
        $("#editdeletecase").show();
        $("#caseform").submit();
    }
});




//Enables Case Form
$("#editcase").click(function () {
    "use strict";
    $("#ablecaseform").prop("disabled", false);
    document.getElementById("casecategory").disabled = false;
    document.getElementById("casetype").disabled = false;
    var thistype = document.getElementById("casetype").selectedIndex;
    $("#casecategory").change();
    document.getElementById("casetype").selectedIndex = thistype;
    document.getElementById("casestatus").disabled = false;
    var removereq = $("#caseform .requiredfield");
    var r;
    for (r = 0; r < removereq.length; r += 1) {
        removereq[r].style.borderColor = "#ffb8af";
    }
    if (document.getElementById("cancelsavecase").style.visibility !== "visible") {
        $("#editdeletecase").hide();
        $("#cancelsavecase").show();
    } else {
        $("#cancelsavecase").hide();
    }
});

//Delete Case Record et al.
$("#deletecase").click(function () {
    "use strict";
    var checkstr = window.confirm("Are you sure you want to delete this?");
    if (checkstr === true) {
        alert("Handle Delete Case");
        //NOTE: PUT IN CODE TO DELETE CASE RECORD
    } else {
        return false;
    }
});

