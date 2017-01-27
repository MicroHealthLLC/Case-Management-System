//Case Management System

// QUESTIONNAIRE SCREEN

function getQuestAnswers() {
    "use strict";
    var x = $("#questform").serializeArray();
    var ansval = [];
    var y;
//    $.each(x, function (i, field) {
    $.each(x, function (field) {
        y = '"' + field.name + '"' + ':"' + field.value + '"';
        ansval.push(y);
    });
    ansval.pop();
    $("#answers").val(ansval);
    $("#questform").submit();
}

$("#savequestionnaire").click(function (e) {
    "use strict";
    e.preventDefault();
    getQuestAnswers();
});

$("#submitquestionnaire").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#finished").val("1");
    getQuestAnswers();
});


$(".userchoice").click(function () {
    "use strict";
    var userchoice = this.id;
    var userinput = document.querySelectorAll(".userinput");
    var i, userinputid;
    if (document.getElementById(userchoice).checked === true) {
        for (i = 0; i < userinput.length; i += 1) {
            userinputid = userinput[i].id;
            if (userinputid.indexOf(userchoice) > -1) {
                document.getElementById(userinputid).disabled = false;
            }
        }
    } else {
        for (i = 0; i < userinput.length; i += 1) {
            userinputid = userinput[i].id;
            if (userinputid.indexOf(userchoice) > -1) {
                document.getElementById(userinputid).value = "";
                document.getElementById(userinputid).disabled = true;
            }
        }
    }
});

$("input[type = 'radio']").click(function () {
    "use strict";
    if (this.className !== "userchoice") {
        var thisradiogroupname = this.name;
        var thisradiogroup = $("input[name = " + thisradiogroupname + "]:radio");
        var i, j, userchoice, userinput, userinputid;
        for (i = 0; i < thisradiogroup.length; i += 1) {
            if (thisradiogroup[i].className === "userchoice") {
                userchoice = thisradiogroup[i].id;
                userinput = document.querySelectorAll(".userinput");
                for (j = 0; j < userinput.length; j += 1) {
                    userinputid = userinput[j].id;
                    if (userinputid.indexOf(userchoice) > -1) {
                        document.getElementById(userinputid).value = "";
                        document.getElementById(userinputid).disabled = true;
                    }
                }
            }
        }
    }
});
