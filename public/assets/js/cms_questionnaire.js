//Case Management System

// QUESTIONNAIRE SCREEN

function getQuestAnswers() {
    var x = $("#questform").serializeArray();
    var ansval = [];
    $.each(x, function(i, field) {
        var y = '"' + field.name + '"' + ':"' + field.value + '"';
        ansval.push(y);
    });
    ansval.pop();
    $("#answers").val(ansval);
    $("#questform").submit();
}

$("#savequestionnaire").click(function(e) {
    "use strict";
    e.preventDefault();
    getQuestAnswers();
});

$("#submitquestionnaire").click(function(e) {
    "use strict";
    e.preventDefault();
    $("#finished").val("1");
    getQuestAnswers();
});


$(".userchoice").click(function () {
    "use strict";
    var userchoice = this.id;
    var userinput = document.querySelectorAll(".userinput");
    if (document.getElementById(userchoice).checked === true) {
        for (var i = 0; i < userinput.length; i += 1) {
            var userinputid = userinput[i].id;
            if (userinputid.indexOf(userchoice) > -1) {
                document.getElementById(userinputid).disabled = false;
            }
        }
    } else {
        for (var i = 0; i < userinput.length; i += 1) {
            var userinputid = userinput[i].id;
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
        for (var i = 0; i < thisradiogroup.length; i += 1) {
            if (thisradiogroup[i].className === "userchoice") {
                var userchoice = thisradiogroup[i].id;
                var userinput = document.querySelectorAll(".userinput");
                for (var j = 0; j < userinput.length; j += 1) {
                    var userinputid = userinput[j].id;
                    if (userinputid.indexOf(userchoice) > -1) {
                        document.getElementById(userinputid).value = "";
                        document.getElementById(userinputid).disabled = true;
                    }
                }
            }
        }
    }
});
