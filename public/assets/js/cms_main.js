//Case Management System

$(window).load(function () {
    "use strict";
    $(".toggleform, .filterform").each(function () {
        this.reset();
    });
    $(".uploadform").each(function () {
        this.reset();
        this.hide();
    });
    if ($(window).width() <= 640) {
        $("div").removeClass("col-xs-6");
    }
});



$(".brieflink").click(function (e) {
    "use strict";
    e.preventDefault();
    var brieflink = this.id;
    var words = brieflink.slice(5);
    $("div#taskpanel ul#navmenu li").removeClass("active");
    if (brieflink.indexOf("goal") > -1) {
        $("div#taskpanel ul#navmenu li:nth-child(5)").addClass("active");
    } else if (brieflink.indexOf("plan") > -1) {
        $("div#taskpanel ul#navmenu li:nth-child(6)").addClass("active");
    } else {
        $("div#taskpanel ul#navmenu li:nth-child(7)").addClass("active");
    }
    setTimeout(function () {
        location.hash = words;
    }, 100);
});



$("a").click(function () {
    var thislink = this.getAttribute("href");
    window.location.assign(thislink);
});




//SEARCH FORM

$("#searchbtn").click(function (e) {
    "use strict";
    e.preventDefault(e);
    alert("search feature to come");
});


//FILTER BUTTON TOGGLE TO SHOW/HIDE CORRESPONDING FORM

$(".filterbtn").click(function () {
    "use strict";
    var filterbtn = this.id;
    var words = filterbtn.slice(0,-3);
    if (document.getElementById(words + "form").style.display !== "block") {
        document.getElementById(words + "form").style.display = "block";
    } else {
        document.getElementById(words + "form").style.display = "none";
    }
});


//PLUS BUTTON TOGGLE TO SHOW/HIDE CORRESPONDING FORM

$(".plusbtn").click(function () {
    "use strict";
    var plusbtn = this.id;
    var words = plusbtn.slice(4);
    document.getElementById("reset" + words).textContent = "Reset";
    document.getElementById("submit" + words).textContent = "Submit";
    if (document.getElementById(words + "form").style.display !== "block") {
        document.getElementById(words + "form").style.display = "block";
    } else {
        document.getElementById(words + "form").style.display = "none";
    }
});


$(".resetbtn").click(function () {
    "use strict";
    var resetbtn = this.id;
    var words = resetbtn.slice(5);
    if (document.getElementById("reset" + words).textContent === "Cancel") {
        document.getElementById(words + "form").style.display = "none";
        document.getElementById("reset" + words).textContent = "Reset";
        document.getElementById("submit" + words).textContent = "Submit";
    }
});


//EDIT BUTTON FUNCTION FOR DISPLAY TABLES

$(".tableeditbtn").click(function () {
    "use strict";
    var edititem = this.id;
    var words;
    if (edititem.indexOf("phone") >= 0) {
        words = "contactphone";
    } else if (edititem.indexOf("email") >= 0) {
        words = "contactemail";
    } else if (edititem.indexOf("fax") >= 0) {
        words = "contactfax";
    } else if (edititem.indexOf("media") >= 0) {
        words = "contactmedia";
    } else if (edititem.indexOf("address") >= 0) {
        words = "contactaddress";
    } else if (edititem.indexOf("identification") >= 0) {
        words = "personidentification";
    } else if (edititem.indexOf("goal") >= 0) {
        words = "goal";
    } else if (edititem.indexOf("plan") >= 0) {
        words = "plan";
    } else if (edititem.indexOf("action") >= 0) {
        words = "action";
    } else if (edititem.indexOf("task") >= 0) {
        words = "task";
    } else if (edititem.indexOf("relatedcase") >= 0) {
        words = "relatedcase";
    } else if (edititem.indexOf("personassignment") >= 0) {
        words = "personassignment";
    } else if (edititem.indexOf("organizationassignment") >= 0) {
        words = "organizationassignment";
    } else if (edititem.indexOf("measurement") >= 0) {
        words = "measurement";
    } else if (edititem.indexOf("casefile") >= 0) {
        words = "casefile";
    } else if (edititem.indexOf("casenote") >= 0) {
        words = "casenote";
    } else {
        alert("edit" + this.id);
    }
    location.hash = "#plus" + words;
    document.getElementById(words + "form").reset();
    document.getElementById("reset" + words).textContent = "Cancel";
    document.getElementById("submit" + words).textContent = "Save";
    document.getElementById(words + "form").style.display = "block";
});



//****************    TASKS    ****************************************

$("#resettask").click(function () {
    "use strict";
    document.getElementById("taskform").action = "/task";
    document.getElementById("taskcompletedate").disabled = true;
});


$(".taskeditbtn").click(function () {
    "use strict";
    var taskid = this.closest("td").id;
    var i = this.id.slice(8);
    location.hash = "#plustask";
    document.getElementById("taskform").reset();
    document.getElementById("taskform").action = "/task/" + taskid + "?_method=PUT";
    $("#tasksubject").val(document.getElementById("tsubject" + i).innerHTML);
    $("#tasktype").val(document.getElementById("ttype" + i).innerHTML);
    $("#taskpriority").val(document.getElementById("tpriority" + i).innerHTML);
    $("#taskstartdate").val(document.getElementById("tstart" + i).innerHTML);    
    $("#taskduedate").val(document.getElementById("tdue" + i).innerHTML);    
    document.getElementById("taskcompletedate").disabled = false;
    $("#taskcompletedate").val(document.getElementById("tcomplete" + i).innerHTML);    
    $("#taskstatus").val(document.getElementById("tstatus" + i).innerHTML);    
    $("#taskassignedperson").val(document.getElementById("tpersonid" + i).innerHTML);    
    $("#tasknote").val(document.getElementById("tnote" + i).innerHTML);    
    $("#taskcaseid").val(document.getElementById("tcaseid" + i).innerHTML);    
    document.getElementById("resettask").textContent = "Cancel";
    document.getElementById("submittask").textContent = "Save";
    document.getElementById("taskform").style.display = "block";
});


$("#submittask").click(function (e) {
    "use strict";
    e.preventDefault();
//    var passvalidation = validatetask();
    var passvalidation = true;
//  NOTE VALIDATE TASK FORM
    if (passvalidation === true) {
        $("#taskform").submit();
    }
});



$(".moretaskbtn").click(function () {
    "use strict";
    var thisdiv = this.id.slice(3);
    if (document.getElementById(thisdiv).style.display !== "block") {
        document.getElementById(thisdiv).style.display = "block";
    } else {
        document.getElementById(thisdiv).style.display = "none";
    }
});

// *******  SHOW/HIDE TASK TABLES ***********

$(".collapsetasksbtn").click(function () {
    "use strict";
    $(".tasktable").hide();
});

$(".expandtasksbtn").click(function () {
    "use strict";
    $(".tasktable").show();
});


//**********************   CONTACT PHONE *****************************************************

$("#submitcontactphone").click(function (e) {
    "use strict";
    e.preventDefault();
    //NOTE: Validate Form
//    var passvalidation = validatephone();
    var passvalidation = true;
//  NOTE VALIDATE CONTACT PHONE FORM
    if (passvalidation === true) {
        $("#contactphoneform").submit();
    }
});


$("#resetcontactphone").click(function () {
    "use strict";
    document.getElementById("contactphoneform").action = "/contactphone";
});


$(".contactphoneeditbtn").click(function () {
    "use strict";
    var phid = this.closest("td").id;
    var i = this.id.slice(9);
    location.hash = "#pluscontactphone";
    document.getElementById("contactphoneform").reset();
    document.getElementById("contactphoneform").action = "/contactphone/" + phid + "?_method=PUT";
    $("#contactphonetype").val(document.getElementById("phtype" + i).innerHTML);
    $("#contactphonenumber").val(document.getElementById("phnumber" + i).innerHTML);
    $("#phonenote").val(document.getElementById("phnote" + i).innerHTML);
    $("#phoneorgid").val(document.getElementById("phorg" + i).innerHTML);    
    document.getElementById("resetcontactphone").textContent = "Cancel";
    document.getElementById("submitcontactphone").textContent = "Save";
    document.getElementById("contactphoneform").style.display = "block";
});





//**********************   CONTACT EMAIL *****************************************************

$("#submitcontactemail").click(function (e) {
    "use strict";
    e.preventDefault();
    //NOTE: Validate Form
//    var passvalidation = validateemail();
    var passvalidation = true;
//  NOTE VALIDATE CONTACT EMAIL FORM
    if (passvalidation === true) {
        $("#contactemailform").submit();
    }
});


$("#resetcontactemail").click(function () {
    "use strict";
    document.getElementById("contactemailform").action = "/contactemail";
});


$(".contactemaileditbtn").click(function () {
    "use strict";
    var emid = this.closest("td").id;
    var i = this.id.slice(9);
    location.hash = "#pluscontactemail";
    document.getElementById("contactemailform").reset();
    document.getElementById("contactemailform").action = "/contactemail/" + emid + "?_method=PUT";
    $("#contactemailtype").val(document.getElementById("emtype" + i).innerHTML);
    $("#contactemailaddress").val(document.getElementById("emaddress" + i).innerHTML);
    $("#emailnote").val(document.getElementById("emnote" + i).innerHTML);
    $("#emailorgid").val(document.getElementById("emorg" + i).innerHTML);    
    document.getElementById("resetcontactemail").textContent = "Cancel";
    document.getElementById("submitcontactemail").textContent = "Save";
    document.getElementById("contactemailform").style.display = "block";
});





//**********************   CONTACT FAX *****************************************************

$("#submitcontactfax").click(function (e) {
    "use strict";
    e.preventDefault();
    //NOTE: Validate Form
//    var passvalidation = validatefax();
    var passvalidation = true;
//  NOTE VALIDATE CONTACT FAX FORM
    if (passvalidation === true) {
        $("#contactfaxform").submit();
    }
});


$("#resetcontactfax").click(function () {
    "use strict";
    document.getElementById("contactfaxform").action = "/contactfax";
});


$(".contactfaxeditbtn").click(function () {
    "use strict";
    var faxid = this.closest("td").id;
    var i = this.id.slice(7);
    location.hash = "#pluscontactfax";
    document.getElementById("contactfaxform").reset();
    document.getElementById("contactfaxform").action = "/contactfax/" + faxid + "?_method=PUT";
    $("#contactfaxtype").val(document.getElementById("faxtype" + i).innerHTML);
    $("#contactfaxnumber").val(document.getElementById("faxnumber" + i).innerHTML);
    $("#faxnote").val(document.getElementById("faxnote" + i).innerHTML);
    $("#faxorgid").val(document.getElementById("faxorg" + i).innerHTML);    
    document.getElementById("resetcontactfax").textContent = "Cancel";
    document.getElementById("submitcontactfax").textContent = "Save";
    document.getElementById("contactfaxform").style.display = "block";
});








//**********************   CONTACT SOCIAL MEDIA *****************************************************

$("#submitcontactmedia").click(function (e) {
    "use strict";
    e.preventDefault();
    //NOTE: Validate Form
//    var passvalidation = validatemedia();
    var passvalidation = true;
//  NOTE VALIDATE CONTACT SOCIAL MEDIA FORM
    if (passvalidation === true) {
        $("#contactmediaform").submit();
    }
});


$("#resetcontactmedia").click(function () {
    "use strict";
    document.getElementById("contactmediaform").action = "/contactmedia";
});


$(".contactmediaeditbtn").click(function () {
    "use strict";
    var mediaid = this.closest("td").id;
    var i = this.id.slice(9);
    location.hash = "#pluscontactmedia";
    document.getElementById("contactmediaform").reset();
    document.getElementById("contactmediaform").action = "/contactmedia/" + mediaid + "?_method=PUT";
    $("#contactmediatype").val(document.getElementById("mediatype" + i).innerHTML);
    $("#contactmediahandle").val(document.getElementById("mediahandle" + i).innerHTML);
    $("#medianote").val(document.getElementById("medianote" + i).innerHTML);
    document.getElementById("resetcontactmedia").textContent = "Cancel";
    document.getElementById("submitcontactmedia").textContent = "Save";
    document.getElementById("contactmediaform").style.display = "block";
});








//**********************   CONTACT ADDRESS *****************************************************

$("#submitcontactaddress").click(function (e) {
    "use strict";
    e.preventDefault();
    //NOTE: Validate Form
//    var passvalidation = validateaddress();
    var passvalidation = true;
//  NOTE VALIDATE CONTACT ADDRESS FORM
    if (passvalidation === true) {
        $("#contactaddressform").submit();
    }
});


$("#resetcontactaddress").click(function () {
    "use strict";
    document.getElementById("contactaddressform").action = "/contactaddress";
});


$(".contactaddresseditbtn").click(function () {
    "use strict";
    var addressid = this.closest("td").id;
    var i = this.id.slice(11);
    location.hash = "#pluscontactaddress";
    document.getElementById("contactaddressform").reset();
    document.getElementById("contactaddressform").action = "/contactaddress/" + addressid + "?_method=PUT";
    $("#contactaddresstype").val(document.getElementById("addresstype" + i).innerHTML);
    $("#contactstreet").val(document.getElementById("addressstreet" + i).innerHTML);
    $("#contactcity").val(document.getElementById("addresscity" + i).innerHTML);
    $("#contactstate").val(document.getElementById("addressstate" + i).innerHTML);
    $("#contactzipcode").val(document.getElementById("addresszipcode" + i).innerHTML);
    $("#contactstatecode").val(document.getElementById("addressstatecode" + i).innerHTML);
    $("#contactcountrycode").val(document.getElementById("addresscountrycode" + i).innerHTML);
    $("#addressnote").val(document.getElementById("addressnote" + i).innerHTML);
    $("#addressorgid").val(document.getElementById("addressorg" + i).innerHTML);    
    document.getElementById("resetcontactaddress").textContent = "Cancel";
    document.getElementById("submitcontactaddress").textContent = "Save";
    document.getElementById("contactaddressform").style.display = "block";
});






//REMOVE BUTTON FUNCTION FOR DISPLAY TABLES

$(".tableremovebtn").click(function () {
    "use strict";
    var removeitem = this.id;
    var checkstr = window.confirm("Sure you want to remove this?");
    if (checkstr === true) {
        alert("Handle remove record " + removeitem);
        var tableRef = $(this).closest("table").attr("id");
        var removebtntype = $(this).closest("table").hasClass("2rowremovebtntop");
        if (removebtntype === true) {
            $(this).closest("tr").next()[0].remove();
        } else {
            if ((tableRef !== "contactphonedisplaytable") && (tableRef !== "contactemaildisplaytable") && (tableRef !== "contactfaxdisplaytable") &&
                    (tableRef !== "contactmediadisplaytable") && (tableRef !== "relatedcasedisplaytable")) {
                $(this).closest("tr").prev()[0].remove();
            }
        }
        $(this).closest("tr").remove();
    } else {
        return false;
    }
});


$(".tableremovebtn2").click(function () {
    "use strict";
    var removeitem = this.id;
    var checkstr = window.confirm("Sure you want to remove this?");
    if (checkstr === true) {
        var tableRef = $(this).closest("table").attr("id");
        alert("Handle remove table" + tableRef);
        document.getElementById(tableRef).style.display = "none";
    } else {
        return false;
    }
});



//**********************   PERSON IDENTIFICATION *****************************************************

$("#submitpersonidentification").click(function (e) {
    "use strict";
    e.preventDefault();
    //NOTE: Validate Form
//    var passvalidation = validateidentification();
    var passvalidation = true;
//  NOTE VALIDATE PERSON IDENTIFICATION FORM
    if (passvalidation === true) {
        $("#personidentificationform").submit();
    }
});


$("#resetpersonidentification").click(function () {
    "use strict";
    document.getElementById("personidentificationform").action = "/personidentification";
});


$(".identificationeditbtn").click(function () {
    "use strict";
    var identificationid = this.closest("td").id;
    var i = this.id.slice(18);
    location.hash = "#pluspersonidentification";
    document.getElementById("personidentificationform").reset();
    document.getElementById("personidentificationform").action = "/personidentification/" + identificationid + "?_method=PUT";
    $("#identificationnumber").val(document.getElementById("pid_idnumber" + i).innerHTML); 
    $("#identificationtype").val(document.getElementById("pid_type" + i).innerHTML);
    $("#identificationorg").val(document.getElementById("pid_org" + i).innerHTML);
    $("#issueddate").val(document.getElementById("pid_issueddate" + i).innerHTML);    
    $("#expirationdate").val(document.getElementById("pid_expdate" + i).innerHTML);    
    $("#identificationstatus").val(document.getElementById("pid_status" + i).innerHTML);    
    $("#identificationnote").val(document.getElementById("pid_note" + i).innerHTML);
    document.getElementById("resetpersonidentification").textContent = "Cancel";
    document.getElementById("submitpersonidentification").textContent = "Save";
    document.getElementById("personidentificationform").style.display = "block";
});




// RELATIONSHIP and ASSIGNMENT FORMS DISPLAY
$(".plusbtn2").click(function () {
    "use strict";
    var plusbtn = this.id;
    var words = plusbtn.slice(4);
    if (plusbtn === "pluspersonrelationship") {
        $("#ablepersonrelationship").prop("disabled", false);
    } else if (plusbtn === "pluspersonorgrelationship") {
        $("#ablepersonorgrelationship").prop("disabled", false);
    } else if (plusbtn === "plusorganizationrelationship") {
        $("#ableorganizationrelationship").prop("disabled", false);
    } else if (plusbtn === "pluspersonassignment") {
        $("#ablepersonassignment").prop("disabled", false);
    } else if (plusbtn === "plusorganizationassignment") {
        $("#ableorganizationassignment").prop("disabled", false);
    } else {
        alert(plusbtn);
    }
    document.getElementById(words + "endreason").disabled = true;
    if (document.getElementById(words + "form").style.display !== "block") {
        document.getElementById(words + "form").style.display = "block";
    } else {
        document.getElementById(words + "form").style.display = "none";
    }
});





//************************* CASE ASSIGNMENT   *****************************88

// PERSON ASSIGNMENT   *****************

$(".personassignmentendbtn").click(function () {
    "use strict";
    var checkstr = window.confirm("Sure you want to end this assignment?");
    if (checkstr === true) {
        var caseassignmentid = this.closest("td").id;
        var i = this.id.slice(19);
        location.hash = "#pluspersonassignment";
        document.getElementById("personassignmentform").reset();
        document.getElementById("personassignmentform").action = "/personassignment/" + caseassignmentid + "?_method=PUT";
        $("#personassignpersonid").val(document.getElementById("passign_personid" + i).innerHTML);
        $("#personassignrole").val(document.getElementById("passign_role" + i).innerHTML);
        $("#personassigntype").val(document.getElementById("passign_type" + i).innerHTML);
        $("#ablepersonassignment").prop("disabled", true);
        $("#personassignmentendreason").prop("disabled", false);
        document.getElementById("resetpersonassignment").textContent = "Cancel";
        document.getElementById("submitpersonassignment").textContent = "Save";
        document.getElementById("personassignmentform").style.display = "block";
    } else {
        return false;
    }        
});

$("#submitpersonassignment").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#ablepersonassignment").prop("disabled", false);
    $("#personassignmentform").submit();
    $("#personassignmentendreason").prop("disabled", true);        
});

$("#resetpersonassignment").click(function () {
    "use strict";
    document.getElementById("personassignmentform").action = "/personassignment";
    $("#ablepersonassignment").prop("disabled", false);
    $("#personassignmentendreason").prop("disabled", true);        
});



var x = document.querySelectorAll(".endpa");
for (var i = 0; i < x.length; i += 1) {
    if (x[i].innerHTML === "") {
        document.getElementById("endpersonassignment" + i).style.visibility = "visible";
        document.getElementById("removepersonassignment" + i).style.visibility = "hidden";
    } else {
        document.getElementById("endpersonassignment" + i).style.visibility = "hidden";
        document.getElementById("removepersonassignment" + i).style.visibility = "visible";
    }
}


// ORGANIZATION ASSIGNMENT   *****************

$(".organizationassignmentendbtn").click(function () {
    "use strict";
    var checkstr = window.confirm("Sure you want to end this assignment?");
    if (checkstr === true) {
        var caseassignmentid = this.closest("td").id;
        var i = this.id.slice(25);
        location.hash = "#plusorganizationassignment";
        document.getElementById("organizationassignmentform").reset();
        document.getElementById("organizationassignmentform").action = "/organizationassignment/" + caseassignmentid + "?_method=PUT";
        $("#organizationassignorgid").val(document.getElementById("oassign_organizationid" + i).innerHTML);
        $("#organizationassignrole").val(document.getElementById("oassign_role" + i).innerHTML);
        $("#organizationassigntype").val(document.getElementById("oassign_type" + i).innerHTML);
        $("#ableorganizationassignment").prop("disabled", true);
        $("#organizationassignmentendreason").prop("disabled", false);    
        document.getElementById("resetorganizationassignment").textContent = "Cancel";
        document.getElementById("submitorganizationassignment").textContent = "Save";
        document.getElementById("organizationassignmentform").style.display = "block";
    } else {
        return false;
    }        
});

$("#submitorganizationassignment").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#ableorganizationassignment").prop("disabled", false);
    $("#organizationassignmentform").submit();
    $("#organizationassignmentendreason").prop("disabled", true);        
});

$("#resetorganizationassignment").click(function () {
    "use strict";
    document.getElementById("organizationassignmentform").action = "/organizationassignment";
    $("#ableorganizationassignment").prop("disabled", false);
    $("#organizationassignmentendreason").prop("disabled", true);        
});

var x = document.querySelectorAll(".endoa");
for (var i = 0; i < x.length; i += 1) {
    if (x[i].innerHTML === "") {
        document.getElementById("endorganizationassignment" + i).style.visibility = "visible";
        document.getElementById("removeorganizationassignment" + i).style.visibility = "hidden";
    } else {
        document.getElementById("endorganizationassignment" + i).style.visibility = "hidden";
        document.getElementById("removeorganizationassignment" + i).style.visibility = "visible";
    }
}




// ********************   RELATIONSHIPS  ****************************************************


// PERSON RELATIONSHIP   *****************

$(".personrelationshipendbtn").click(function () {
    "use strict";
    var checkstr = window.confirm("Sure you want to end this relationship?");
    if (checkstr === true) {
        var personrelationshipid = this.closest("td").id;
        var i = this.id.slice(21);
        location.hash = "#pluspersonrelationship";
        document.getElementById("personrelationshipform").reset();
        document.getElementById("personrelationshipform").action = "/personrelationship/" + personrelationshipid + "?_method=PUT";
        $("#personreltwopersonid").val(document.getElementById("pprelation_personid" + i).innerHTML);
        $("#personcontacttype").val(document.getElementById("pprelation_contacttype" + i).innerHTML);
        $("#personrelationshiptype").val(document.getElementById("pprelation_relationshiptype" + i).innerHTML);
        $("#ablepersonrelationship").prop("disabled", true);
        $("#personrelationshipendreason").prop("disabled", false);    
        document.getElementById("resetpersonrelationship").textContent = "Cancel";
        document.getElementById("submitpersonrelationship").textContent = "Save";
        document.getElementById("personrelationshipform").style.display = "block";
    } else {
        return false;
    }        
});

$("#submitpersonrelationship").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#ablepersonrelationship").prop("disabled", false);
    $("#personrelationshipform").submit();
    $("#personrelationshipendreason").prop("disabled", true);        
});

$("#resetpersonrelationship").click(function () {
    "use strict";
    document.getElementById("personrelationshipform").action = "/personrelationship";
    $("#ablepersonrelationship").prop("disabled", false);
    $("#personrelationshipendreason").prop("disabled", true);        
});


var x = document.querySelectorAll(".endppr");
for (var i = 0; i < x.length; i += 1) {
    if (x[i].innerHTML === "") {
        document.getElementById("endpersonrelationship" + i).style.visibility = "visible";
        document.getElementById("removepersonrelationship" + i).style.visibility = "hidden";
    } else {
        document.getElementById("endpersonrelationship" + i).style.visibility = "hidden";
        document.getElementById("removepersonrelationship" + i).style.visibility = "visible";
    }
}





// PERSON ORGANIZATION RELATIONSHIP   *****************

$(".personorgrelationshipendbtn").click(function () {
    "use strict";
    var checkstr = window.confirm("Sure you want to end this relationship?");
    if (checkstr === true) {
        var personorganizationid = this.closest("td").id;
        var i = this.id.slice(24);
        location.hash = "#pluspersonorgrelationship";
        document.getElementById("personorgrelationshipform").reset();
        document.getElementById("personorgrelationshipform").action = "/personorgrelationship/" + personorganizationid + "?_method=PUT";
        var screen = $("#personorgscreen").val();
        if (screen === "person") {
            $("#personorgorganizationid").val(document.getElementById("porelation_organizationid" + i).innerHTML);
        } else {
            $("#personorgpersonid").val(document.getElementById("porelation_personid" + i).innerHTML);
        }
        $("#personorgcontacttype").val(document.getElementById("porelation_contacttype" + i).innerHTML);
        $("#personorgrelationshiptype").val(document.getElementById("porelation_relationshiptype" + i).innerHTML);
        $("#ablepersonorgrelationship").prop("disabled", true);
        $("#personorgrelationshipendreason").prop("disabled", false);    
        document.getElementById("resetpersonorgrelationship").textContent = "Cancel";
        document.getElementById("submitpersonorgrelationship").textContent = "Save";
        document.getElementById("personorgrelationshipform").style.display = "block";
    } else {
        return false;
    }        
});

$("#submitpersonorgrelationship").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#ablepersonorgrelationship").prop("disabled", false);
    $("#personorgrelationshipform").submit();
    $("#personorgrelationshipendreason").prop("disabled", true);        
});

$("#resetpersonorgrelationship").click(function () {
    "use strict";
    document.getElementById("personorgrelationshipform").action = "/personorgrelationship";
    $("#ablepersonorgrelationship").prop("disabled", false);
    $("#personorgrelationshipendreason").prop("disabled", true);        
});


var x = document.querySelectorAll(".endpor");
for (var i = 0; i < x.length; i += 1) {
    if (x[i].innerHTML === "") {
        document.getElementById("endpersonorgrelationship" + i).style.visibility = "visible";
        document.getElementById("removepersonorgrelationship" + i).style.visibility = "hidden";
    } else {
        document.getElementById("endpersonorgrelationship" + i).style.visibility = "hidden";
        document.getElementById("removepersonorgrelationship" + i).style.visibility = "visible";
    }
}



// ORGANIZATION RELATIONSHIP   *****************

$(".organizationrelationshipendbtn").click(function () {
    "use strict";
    var checkstr = window.confirm("Sure you want to end this relationship?");
    if (checkstr === true) {
        var organizationrelationshipid = this.closest("td").id;
        var i = this.id.slice(27);
        location.hash = "#plusorganizationrelationship";
        document.getElementById("organizationrelationshipform").reset();
        document.getElementById("organizationrelationshipform").action = "/organizationrelationship/" + organizationrelationshipid + "?_method=PUT";
        $("#orgreltwoorganizationid").val(document.getElementById("oorelation_organizationid" + i).innerHTML);
        $("#organizationcontacttype").val(document.getElementById("oorelation_contacttype" + i).innerHTML);
        $("#organizationrelationshiptype").val(document.getElementById("oorelation_relationshiptype" + i).innerHTML);
        $("#ableorganizationrelationship").prop("disabled", true);
        $("#organizationrelationshipendreason").prop("disabled", false);    
        document.getElementById("resetorganizationrelationship").textContent = "Cancel";
        document.getElementById("submitorganizationrelationship").textContent = "Save";
        document.getElementById("organizationrelationshipform").style.display = "block";
    } else {
        return false;
    }        
});

$("#submitorganizationrelationship").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#ableorganizationrelationship").prop("disabled", false);
    $("#organizationrelationshipform").submit();
    $("#organizationrelationshipendreason").prop("disabled", true);        
});

$("#resetorganizationrelationship").click(function () {
    "use strict";
    document.getElementById("organizationrelationshipform").action = "/organizationrelationship";
    $("#ableorganizationrelationship").prop("disabled", false);
    $("#organizationrelationshipendreason").prop("disabled", true);        
});


var x = document.querySelectorAll(".endoor");
for (var i = 0; i < x.length; i += 1) {
    if (x[i].innerHTML === "") {
        document.getElementById("endorganizationrelationship" + i).style.visibility = "visible";
        document.getElementById("removeorganizationrelationship" + i).style.visibility = "hidden";
    } else {
        document.getElementById("endorganizationrelationship" + i).style.visibility = "hidden";
        document.getElementById("removeorganizationrelationship" + i).style.visibility = "visible";
    }
}



$(".morerelationshipbtn").click(function () {
    "use strict";
    var thisdiv = this.id.slice(3);
    document.getElementById(thisdiv)
    if (document.getElementById(thisdiv).style.display !== "block") {
        document.getElementById(thisdiv).style.display = "block";
    } else {
        document.getElementById(thisdiv).style.display = "none";
    }
});


// *******  SHOW/HIDE RELATIONSHIP TABLES ***********

$(".collapsepersonrelbtn").click(function () {
    "use strict";
    $(".personrelationshiptable").hide();
});

$(".expandpersonrelbtn").click(function () {
    "use strict";
    $(".personrelationshiptable").show();
});

$(".collapseorgrelbtn").click(function () {
    "use strict";
    $(".orgrelationshiptable").hide();
});

$(".expandorgrelbtn").click(function () {
    "use strict";
    $(".orgrelationshiptable").show();
});



//****************** GOALS, PLANS, ACTIONS, CASE FILES *************************************************

// DOC UPLOAD BUTTON CLICKED

$(".uploaddocbtn").click(function () {
    "use strict";
    var btn = this.id;
    if (btn.indexOf("goal") > -1) {
        $("#goaluploadformdiv").show();
        var goalid = btn.slice(16);
        document.getElementById("goaluploadForm").action = "/goal/upload/" + goalid;
    } else if (btn.indexOf("plan") > -1) {
        $("#planuploadformdiv").show();
        var planid = btn.slice(16);
        document.getElementById("planuploadForm").action = "/plan/upload/" + planid;
    } else if (btn.indexOf("action") > -1) {
        $("#actionuploadformdiv").show();
        var actionid = btn.slice(18);
        document.getElementById("actionuploadForm").action = "/action/upload/" + actionid;
    } else {
        if (btn.indexOf("file") > -1) {
            $("#fileuploadformdiv").show();
            var casefileid = btn.slice(16);
            document.getElementById("fileuploadForm").action = "/casefile/upload/" + casefileid;
        }
    }
});


$(".docremovebtn").click(function (e) {
    "use strict";
    e.preventDefault();
    var thisform = this.closest("form").id;
    var checkstr = window.confirm("Sure you want to remove this?");
    if (checkstr === true) {
        document.getElementById(thisform).submit();
    }
});


// *******  SHOW/HIDE GOAL THRU NOTE TABLES ***********

$(".collapsetablesbtn").click(function () {
    "use strict";
    var collapsebtn = this.id;
    var words = collapsebtn.slice(8);
    $(".display" + words + "_div").hide();
});

$(".expandtablesbtn").click(function () {
    "use strict";
    var expandbtn = this.id;
    var words = expandbtn.slice(6);
    $(".display" + words + "_div").show();
});


$(".associatedheadbtn").click(function () {
    "use strict";
    var hdbtn = this.id;
    var words = hdbtn.slice(4);
    if (document.getElementById("div" + words).style.display !== "block") {
        document.getElementById("div" + words).style.display = "block";
    } else {
        document.getElementById("div" + words).style.display = "none";
    }
});



//************* ANCHOR BUTTONS AND HYPERLINKS  ************************************************

$(".parentanchorbtn").click(function (e) {
    "use strict";
    e.preventDefault();
    var btn = this.id.slice(4);
    $("div#taskpanel ul#navmenu li").removeClass("active");
    if (btn.indexOf("goal") > -1) {
        $("div#taskpanel ul#navmenu li:nth-child(5)").addClass("active");
    } else {
        if (btn.indexOf("plan") > -1) {
            $("div#taskpanel ul#navmenu li:nth-child(6)").addClass("active");
        }
    }
    setTimeout(function () {
        location.hash = btn;
    }, 100);
});


$(".childrenanchorbtn").click(function (e) {
    "use strict";
    e.preventDefault();
    var btn = this.id.slice(4);
    if (document.getElementById(btn) !== null) {
        $("div#taskpanel ul#navmenu li").removeClass("active");
        if (btn.indexOf("goal") > -1) {
            $("div#taskpanel ul#navmenu li:nth-child(6)").addClass("active");
        } else {
            if (btn.indexOf("plan") > -1) {
                $("div#taskpanel ul#navmenu li:nth-child(7)").addClass("active");
            }
        }
        setTimeout(function () {
            location.hash = btn;
        }, 100);
    } else {
        alert("this does not exist");
        window.history.back();
    }
});



//********  CASE GOALS ***********************************************************

$("#resetgoal").click(function () {
    "use strict";
    document.getElementById("goalform").action = "/goal";
    document.getElementById("goalcompletedate").disabled = true;
});

$("#submitgoal").click(function (e) {
    "use strict";
    e.preventDefault();
//  NOTE VALIDATE CASE GOAL FORM
//    var passvalidation = validatecasegoal();
    var passvalidation = true;
    if (passvalidation === true) {   
        $("#goalform").submit();
    }
});

$(".casesgoaleditbtn").click(function () {
    "use strict";
    var goalid = this.closest("td").id;
    var i = this.id.slice(13);
    location.hash = "#plusgoal";
    document.getElementById("goalform").reset();
    document.getElementById("goalform").action = "/goal/" + goalid + "?_method=PUT";
    $("#goalname").val(document.getElementById("goalname" + i).innerHTML);
    $("#goaltype").val(document.getElementById("goaltype" + i).innerHTML);
    $("#goalpriority").val(document.getElementById("goalpriority" + i).innerHTML);
    $("#goalstartdate").val(document.getElementById("goalstartdate" + i).innerHTML);
    $("#goalduedate").val(document.getElementById("goalduedate" + i).innerHTML);
    document.getElementById("goalcompletedate").disabled = false;
    $("#goalcompletedate").val(document.getElementById("goalcompletedate" + i).innerHTML);
    $("#goalassignedpersonid").val(document.getElementById("goalassignedpersonid" + i).innerHTML);
    $("#goalnote").val(document.getElementById("goalnote" + i).innerHTML);
    $("#goalcaseid").val(document.getElementById("goalcaseid" + i).innerHTML);  
    document.getElementById("resetgoal").textContent = "Cancel";
    document.getElementById("submitgoal").textContent = "Save";
    document.getElementById("goalform").style.display = "block";
});

$("#canceldocgoal").click(function () {
    "use strict";
    var thisdiv = document.getElementById("uploadgoalbtns");
    while (thisdiv.hasChildNodes()) {
        thisdiv.removeChild(thisdiv.lastChild);
    }
    $("#goaluploadformdiv").hide();
});


$("#addgoaluploadbtn").click(function () {
	"use strict";
    var goalfilenames = document.querySelectorAll(".uploadgoalbtn");
    var k = 0;
    var emptyupload = false;
    while ((emptyupload === false) && (k < goalfilenames.length)) {
        if (goalfilenames[k].value === "") {
            emptyupload = true;
        }
        k += 1;
    }
    if ((emptyupload === true) && (k <= 10)) {
        alert("Use empty upload.");
    } else if (emptyupload === false) {
        if (k < 10) {
	        var newgoaluploadbtn = '<div class="col-xs-12"><input type="file" class="btn btn-primary btn-md uploadgoalbtn" name="userFile" /></div>';
    	    $("#uploadgoalbtns").append(newgoaluploadbtn);
        } else {
            alert("Maximum 10 files uploaded at once.");
        }
    } 
});

// GOAL TYPE BUTTONS

$(".goaltypebtn").click(function () {
    "use strict";
    var goaltype = this.id.slice(8);
    var goalbtn = document.getElementById("showgoal" + goaltype);
    var words = $(goalbtn).val();
    if (goalbtn.checked === true) {
        $(".goal" + words + "row").removeClass("collapse out");
    } else {
        $(".goal" + words + "row").addClass("collapse out");
    }
});





//********  CASE PLANS ***********************************************************

$("#resetplan").click(function () {
    "use strict";
    document.getElementById("planform").action = "/plan";
    document.getElementById("plancompletedate").disabled = true;
});

function validatecaseplan() {
    if (($("#planname").val() !== "") && ($("#assocgoalid").val() !== "0")) {
        return true;
    } else {
        return false;
    }
}

$("#submitplan").click(function (e) {
    "use strict";
    e.preventDefault();
//  NOTE VALIDATE CASE PLAN FORM
//    var passvalidation = validatecaseplan();
    var passvalidation = true;
    if (passvalidation === true) {   
        $("#planform").submit();
    } else {
        alert("Enter Name and Associated Goal");
    }
});

$(".casesplaneditbtn").click(function () {
    "use strict";
    var planid = this.closest("td").id;
    var i = this.id.slice(13);
    location.hash = "#plusplan";
    document.getElementById("planform").reset();
    document.getElementById("planform").action = "/plan/" + planid + "?_method=PUT";
    $("#planname").val(document.getElementById("planname" + i).innerHTML);
    $("#plantype").val(document.getElementById("plantype" + i).innerHTML);
    $("#planpriority").val(document.getElementById("planpriority" + i).innerHTML);
    $("#planstartdate").val(document.getElementById("planstartdate" + i).innerHTML);
    $("#planduedate").val(document.getElementById("planduedate" + i).innerHTML);
    document.getElementById("plancompletedate").disabled = false;
    $("#plancompletedate").val(document.getElementById("plancompletedate" + i).innerHTML);
    $("#assocgoalid").val(document.getElementById("assocgoalid" + i).innerHTML);
    $("#planassignedpersonid").val(document.getElementById("planassignedpersonid" + i).innerHTML);
    $("#plannote").val(document.getElementById("plannote" + i).innerHTML);
    $("#plancaseid").val(document.getElementById("plancaseid" + i).innerHTML);    
    document.getElementById("resetplan").textContent = "Cancel";
    document.getElementById("submitplan").textContent = "Save";
    document.getElementById("planform").style.display = "block";
});

$("#canceldocplan").click(function () {
    "use strict";
    var thisdiv = document.getElementById("uploadplanbtns");
    while (thisdiv.hasChildNodes()) {
        thisdiv.removeChild(thisdiv.lastChild);
    }
    $("#planuploadformdiv").hide();
});

$("#addplanuploadbtn").click(function () {
	"use strict";
    var planfilenames = document.querySelectorAll(".uploadplanbtn");
    var k = 0;
    var emptyupload = false;
    while ((emptyupload === false) && (k < planfilenames.length)) {
        if (planfilenames[k].value === "") {
            emptyupload = true;
        }
        k += 1;
    }
    if ((emptyupload === true) && (k <= 10)) {
        alert("Use empty upload.");
    } else if (emptyupload === false) {
        if (k < 10) {
	        var newplanuploadbtn = '<div class="col-xs-12"><input type="file" class="btn btn-primary btn-md uploadplanbtn" name="userFile" /></div>';
    	    $("#uploadplanbtns").append(newplanuploadbtn);
        } else {
            alert("Maximum 10 files uploaded at once.");
        }
    }
});

// PLAN TYPE BUTTONS

$(".plantypebtn").click(function () {
    "use strict";
    var plantype = this.id.slice(8);
    var planbtn = document.getElementById("showplan" + plantype);
    var words = $(planbtn).val();
    if (planbtn.checked === true) {
        $(".plan" + words + "row").removeClass("collapse out");
    } else {
        $(".plan" + words + "row").addClass("collapse out");
    }
});







//********  CASE ACTIONS ***********************************************************

$("#resetaction").click(function () {
    "use strict";
    document.getElementById("actionform").action = "/action";
    document.getElementById("actioncompletedate").disabled = true;
});

function validatecaseaction() {
    if (($("#actionname").val() !== "") && ($("#assocplanid").val() !== "0")) {
        return true;
    } else {
        return false;
    }
}

$("#submitaction").click(function (e) {
    "use strict";
    e.preventDefault();
//  NOTE VALIDATE CASE ACTION FORM
//    var passvalidation = validatecaseaction();
    var passvalidation = true;
    if (passvalidation === true) {   
        $("#actionform").submit();
    } else {
        alert("Enter Name and Associated Plan");
    }
});

$(".casesactioneditbtn").click(function () {
    "use strict";
    var actionid = this.closest("td").id;
    var i = this.id.slice(15);
    location.hash = "#plusaction";
    document.getElementById("actionform").reset();
    document.getElementById("actionform").action = "/action/" + actionid + "?_method=PUT";
    $("#actionname").val(document.getElementById("actionname" + i).innerHTML);
    $("#actiontype").val(document.getElementById("actiontype" + i).innerHTML);
    $("#actionpriority").val(document.getElementById("actionpriority" + i).innerHTML);
    $("#actionstartdate").val(document.getElementById("actionstartdate" + i).innerHTML);
    $("#actionduedate").val(document.getElementById("actionduedate" + i).innerHTML);
    document.getElementById("actioncompletedate").disabled = false;
    $("#actioncompletedate").val(document.getElementById("actioncompletedate" + i).innerHTML);
    $("#assocplanid").val(document.getElementById("assocplanid" + i).innerHTML);
    $("#actionassignedpersonid").val(document.getElementById("actionassignedpersonid" + i).innerHTML);
    $("#actionnote").val(document.getElementById("actionnote" + i).innerHTML);
    $("#actioncaseid").val(document.getElementById("actioncaseid" + i).innerHTML);    
    document.getElementById("resetaction").textContent = "Cancel";
    document.getElementById("submitaction").textContent = "Save";
    document.getElementById("actionform").style.display = "block";
});

$("#canceldocaction").click(function () {
    "use strict";
    var thisdiv = document.getElementById("uploadactionbtns");
    while (thisdiv.hasChildNodes()) {
        thisdiv.removeChild(thisdiv.lastChild);
    }
    $("#actionuploadformdiv").hide();
});

$("#addactionuploadbtn").click(function () {
	"use strict";
    var actionfilenames = document.querySelectorAll(".uploadactionbtn");
    var k = 0;
    var emptyupload = false;
    while ((emptyupload === false) && (k < actionfilenames.length)) {
        if (actionfilenames[k].value === "") {
            emptyupload = true;
        }
        k += 1;
    }
    if ((emptyupload === true) && (k <= 10)) {
        alert("Use empty upload.");
    } else if (emptyupload === false) {
        if (k < 10) {
    	    var newactionuploadbtn = '<div class="col-xs-12"><input type="file" class="btn btn-primary btn-md uploadactionbtn" name="userFile" /></div>';
	        $("#uploadactionbtns").append(newactionuploadbtn);
        } else {
            alert("Maximum 10 files uploaded at once.");
        }
    }
});

// ACTION TYPE BUTTONS

$(".actiontypebtn").click(function () {
    "use strict";
    var actiontype = this.id.slice(10);
    var actionbtn = document.getElementById("showaction" + actiontype);
    var words = $(actionbtn).val();
    if (actionbtn.checked === true) {
        $(".action" + words + "row").removeClass("collapse out");
    } else {
        $(".action" + words + "row").addClass("collapse out");
    }
});

// ACTION TASK SHOW/HIDE TASKS BUTTON

$("#btnactionstaskstable").click(function () {
    "use strict";
    $("#actionstaskstable").toggle();
});





//CASE FILES ***********************************************************

$("#resetcasefile").click(function () {
    "use strict";
    var thisdiv = document.getElementById("uploadcasefilebtns");
    while (thisdiv.hasChildNodes()) {
        thisdiv.removeChild(thisdiv.lastChild);
    }
});


$("#submitcasefile").click(function (e) {
    "use strict";
    e.preventDefault();
//  NOTE VALIDATE CASE FILE FORM
//    var passvalidation = validatecasefile();
    var passvalidation = true;
    if (passvalidation === true) {   
        $("#casefileform").submit();
    }
});



$("#addfileuploadbtn").click(function () {
	"use strict";
    var casefilenames = document.querySelectorAll(".uploadcasefilebtn");
    var k = 0;
    var emptyupload = false;
    while ((emptyupload === false) && (k < casefilenames.length)) {
        if (casefilenames[k].value === "") {
            emptyupload = true;
        }
        k += 1;
    }
    if ((emptyupload === true) && (k <= 10)) {
        alert("Use empty upload.");
    } else if (emptyupload === false) {
        if (k < 10) {
            var newfileuploadbtn = '<div class="col-xs-12"><input type="file" class="btn btn-primary btn-md uploadcasefilebtn" name="userFile" /></div>';
            $("#uploadcasefilebtns").append(newfileuploadbtn);
        } else {
            alert("Maximum 10 files uploaded at once.");
        }
    }
});


// FILE CASE DOMAIN BUTTONS

$(".filecasedomainbtn").click(function () {
    "use strict";
    var filecasedomain = this.id.slice(8);
    var filecasedomainbtn = document.getElementById("showfile" + filecasedomain);
    var words = $(filecasedomainbtn).val();
    if (filecasedomainbtn.checked === true) {
        $(".filecasedomain" + words + "table").show();
    } else {
        $(".filecasedomain" + words + "table").hide();
    }
});




//CASE NOTES ***********************************************************

$("#submitcasenote").click(function (e) {
    "use strict";
    e.preventDefault();
//  NOTE VALIDATE CASE note FORM
//    var passvalidation = validatecasenote();
    var passvalidation = true;
    if (passvalidation === true) {   
        $("#casenoteform").submit();
    }
});


$("#resetcasenote").click(function () {
    "use strict";
    document.getElementById("casenoteform").action = "/casenote";
});


$(".casenoteeditbtn").click(function () {
    "use strict";
    var casenoteid = this.closest("td").id;
    var i = this.id.slice(12);
    location.hash = "#pluscasenote";
    document.getElementById("casenoteform").reset();
    document.getElementById("casenoteform").action = "/casenote/" + casenoteid + "?_method=PUT";
    $("#casenotename").val(document.getElementById("notename" + i).innerHTML);
    $("#casenotecasedomain").val(document.getElementById("notedomain" + i).innerHTML);
    $("#casenoteactiontype").val(document.getElementById("noteactiontype" + i).innerHTML);
    $("#casenotetype").val(document.getElementById("notetype" + i).innerHTML);
    $("#casenotepersonid").val(document.getElementById("notepersonid" + i).innerHTML);
    $("#casenoteorgid").val(document.getElementById("noteorgid" + i).innerHTML);
    $("#casenotetext").val(document.getElementById("notetext" + i + "-0").innerHTML);
    document.getElementById("resetcasenote").textContent = "Cancel";
    document.getElementById("submitcasenote").textContent = "Save";
    document.getElementById("casenoteform").style.display = "block";
});

// NOTE CASE DOMAIN BUTTONS
$(".notecasedomainbtn").click(function () {
    "use strict";
    var notecasedomain = this.id.slice(8);
    var notecasedomainbtn = document.getElementById("shownote" + notecasedomain);
    var words = $(notecasedomainbtn).val();
    if (notecasedomainbtn.checked === true) {
        $(".notecasedomain" + words + "table").show();
    } else {
        $(".notecasedomain" + words + "table").hide();
    }
});



//******************************   QUESTIONNAIRES   *******************************************************************

//*** Case Questionnaires ******************************

$("#casequestionnairetype").change(function () {
    "use strict";
    var typequest = $("#casequestionnairetype").val();
    document.getElementById("casequestionnairename").selectedIndex = "0";
    if (typequest === "0") {
        for (var i = 1; i < document.getElementById("casequestionnairename").length; i += 1) {
            document.getElementById("casequestionnairename").options[i].style.display = "block";
        }
    } else {
        for (var i = 1; i < document.getElementById("casequestionnairename").length; i += 1) {
            if (document.getElementById("casequestionnairename").options[i].className === typequest) {
                document.getElementById("casequestionnairename").options[i].style.display = "block";
            } else {
                document.getElementById("casequestionnairename").options[i].style.display = "none";
            }
        }
    }
});

$("#casequestionnairename").change(function () {
    "use strict";
    var i = document.getElementById("casequestionnairename").selectedIndex;
    if (i !== 0) {
        var questClass = document.getElementById("casequestionnairename").options[i].className;
        document.getElementById("casequestionnairetype").selectedIndex = questClass;
    } else {
        $("#casequestionnairetype").change();
    }
});

$("#questcaseassocwith").change(function () {
    "use strict";
    var assocwith = $("#questcaseassocwith").val();
    document.getElementById("questassocwithname").selectedIndex = "0";
    if (assocwith !== 0) {
        for (var i = 1; i < document.getElementById("questassocwithname").length; i += 1) {
            if (document.getElementById("questassocwithname").options[i].className === assocwith) {
                document.getElementById("questassocwithname").options[i].style.display = "block";
            } else {
                document.getElementById("questassocwithname").options[i].style.display = "none";
            }
        }
    } else {
        for (var i = 1; i < document.getElementById("questassocwithname").length; i += 1) {
            document.getElementById("questassocwithname").options[i].style.display = "none";
        }
    }
});

$(".questeditbtn").click(function() {
    "use strict";
    var casequestid = this.closest("td").id;
    var i = this.id.slice(13);
    location.hash = "#pluscasequestionnaire";
    document.getElementById("casequestionnaireform").reset();
    document.getElementById("casequestionnaireform").action = "/casequestionnaire/" + casequestid + "?_method=PUT";
    $("#casequestionnairetype").val(document.getElementById("casequesttype" + i).innerHTML);
    document.getElementById("casequestionnairetype").disabled = true;
    $("#casequestionnairename").val(document.getElementById("casequestionnaireid" + i).innerHTML);
    document.getElementById("casequestionnairename").disabled = true;
    if (document.getElementById("casequestcaseassocwith" + i).innerHTML !== "") {
        $("#questcaseassocwith").val(document.getElementById("casequestcaseassocwith" + i).innerHTML);
        var questcaseclass = $("#questcaseassocwith").val();
    } else {
        $("#questcaseassocwith").val("0");      
    }
    if (document.getElementById("casequestassocwithnameid" + i).innerHTML !== "") {
        var questcaseassocnameid = document.getElementById("casequestassocwithnameid" + i).innerHTML;
        for (var g = 1; g < document.getElementById("questassocwithname").length; g += 1) {
            document.getElementById("questassocwithname").options[g].style.display = "block";
        }
        document.getElementById("questassocwithname").disabled = false;
        var found = false;
        var j = 0;
        while ((found === false) && (j < document.getElementById("questassocwithname").length)) {   
            j += 1;
            if ((document.getElementById("questassocwithname").options[j].className === questcaseclass) && (document.getElementById("questassocwithname").options[j].value === questcaseassocnameid)) {
                found = true;
                document.getElementById("questassocwithname").selectedIndex = j;
            }
        }
    } else {
        for (var g = 1; g < document.getElementById("questassocwithname").length; g += 1) {
            document.getElementById("questassocwithname").options[g].style.display = "none";
        }        
    }
	for (var q = 0; q < document.getElementById("casequeststatus").length; q += 1) {
		document.getElementById("casequeststatus").options[q].style.display = "block";
	}
    document.getElementById("questcaseassocwith").disabled = true;
    document.getElementById("questassocwithname").disabled = true;
    $("#casequeststatus").val(document.getElementById("casequeststatus" + i).innerHTML);
    $("#questnote").val(document.getElementById("casequestnote" + i).innerHTML);
    document.getElementById("resetcasequestionnaire").textContent = "Cancel";
    document.getElementById("submitcasequestionnaire").textContent = "Save";
    document.getElementById("casequestionnaireform").style.display = "block";
});

$("#resetcasequestionnaire").click(function() {
    "use strict";
    document.getElementById("casequestionnaireform").action = "/casequestionnaire";
    document.getElementById("casequestionnairetype").disabled = false;
    document.getElementById("casequestionnairename").disabled = false;
    document.getElementById("questcaseassocwith").disabled = false;
    document.getElementById("questassocwithname").disabled = false;
    for (var i = 0; i < document.getElementById("casequeststatus").length; i += 1) {
        if (i !== 1) {
            document.getElementById("casequeststatus").options[i].style.display = "none";
        } else {
            document.getElementById("casequeststatus").options[i].style.display = "block";
        }
    }
});


//NOTE: Will be updated for development
$(".questremovebtn").click(function() {
    "use strict";
    var casequestid = this.closest("td").id;
    var i = this.id.slice(15);
    var checkstr = window.confirm("Sure you want to remove this questionnaire?");
    if (checkstr === true) {
        alert("Handle remove Case Questionnaire " + i);
    }
});




//NAVBAR LINKS

$("#contact a, #identification a, #cases a, #goals a, #plans a, #actions a, #cases_brief a, #related_cases a, #assigned_people a, #assigned_organizations a, #measurements a, #casefiles a, #casenotes a, #questionnaire a").click(function (e) {
    "use strict";
    e.preventDefault();
    $(this).tab("show");
});


//FOOTER BUTTONS

$("#totop").click(function () {
    "use strict";
    window.scrollTo(0, 0);
});
$("#tonavbar").click(function () {
    "use strict";
    location.href = "#";
    location.href = "#taskpanel";
});
$("#tonavbtns").click(function () {
    "use strict";
    location.href = "#";
    location.href = "#navbtns";
});
$("#goback").click(function () {
    "use strict";
    window.history.back();
});

