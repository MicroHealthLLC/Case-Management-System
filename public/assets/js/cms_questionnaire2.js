
function checkQuestions() {
    var questionnairename = $("#questionnairename").val().trim();
    if (questionnairename === "") {
        alert("Must have questionnaire name!");
        return (false);
    }
    var questionnairetype = $("#questionnairetype").val();
    if (questionnairetype === "0") {
        alert("Must select questionnaire type!");
        return (false);
    }    
    var questionnumbers = document.querySelectorAll(".questionnumber");
    var questnos = [];
    var thisquestno = 0;
    var q = 0;
    if (questionnumbers.length < 1) {
        alert("Must have at leat one question!");
        return (false);
    } else {
        while (q < questionnumbers.length) {
            thisquestno = Number(questionnumbers[q].value);
            if (isNaN(thisquestno)) {
                alert("Question group " + (q + 1) + " has invalid question number!");
                return (false);
            } else if ((thisquestno < 1) || (thisquestno > questionnumbers.length)) {
                alert("Question number must be between 1 and " + questionnumbers.length + "!");
                return (false);
            } else if (questnos.indexOf(thisquestno) > -1) {
                alert("Question number " + thisquestno + " is used more than once!");
                return (false);
            } else {
                questnos.push(thisquestno);
            }
            q += 1;
        }
    }
    for (var i = 1; i <= questionnumbers.length; i += 1) {
        var questgroup = document.getElementById("qa" + i);
        var thisquestno = questgroup.querySelector(".questionnumber");
        var questno = thisquestno.value;
        thisquestno.name = "question" + questno;
        var totalansw = questgroup.querySelector(".totalanswers");
        totalansw.name = "totalanswers" + questno;
        var totalanswers = Number($(totalansw).val());
        var questtext = questgroup.querySelector(".questiontext");
        questtext.name = "questtext" + questno;
        var questtype = questgroup.querySelector(".questtype");
        questtype.name = "questtype" + questno;
        if ((questtype.value !== "textbox") && (questtype.value !== "textarea")) {
            var anstextbox = questgroup.querySelectorAll("input[type='text'].answer");
            for (var thisanswno = 0; thisanswno < anstextbox.length; thisanswno += 1) {
                anstextbox[thisanswno].name = "answer" + questno + '-' + (thisanswno + 1) + '_textbox';
            }
        }
    }
    return (true);
}


$("#submitquestionnaire").click(function (e) {
    "use strict";
	e.preventDefault();
    var okquestnos = checkQuestions();
    if (okquestnos === true) {
        $("#questionnaireform").submit();
    }
});


$("#addquestiongroup").click(function () {
    "use strict";
	var questiontype = $("#question_type").val();
	var totalansw = Number($("#total_answers").val());
	if ((questiontype !== "0") && (totalansw > 0)) {
		var thisquestno = Number($("#currquestno").val()) + 1;
		var thisquestanswer = '<div id="qa' + thisquestno + '" class="questgroup"><hr><div class="row question"><div class="col-xs-2 col-sm-1">Question Number:</div><div class="col-xs-10 col-sm-11"><input type="text" class="form-control questionnumber" name="question' + thisquestno + '" value="' + thisquestno + '"/></div><br><br><br><div class="col-xs-2 col-sm-1">Question Type:</div><div class="col-xs-10 col-sm-11"><input type="text" class="form-control questtype" id="questtype' + thisquestno + '" name="questtype' + thisquestno + '" readonly value="' + questiontype + '"/></div><br><br><br><div class="col-xs-2 col-sm-1">Total Answers:</div><div class="col-xs-10 col-sm-11"><input type="text" class="form-control totalanswers" id="totalanswers' + thisquestno + '" name="totalanswers' + thisquestno + '" readonly value="' + totalansw + '"/></div><br><br><br><div class="col-xs-2 col-sm-1">Question Text:</div><div class="col-xs-10 col-sm-11"><textarea class="form-control questiontext" id="questtext' + thisquestno + '" name="questtext' + thisquestno + '"></textarea></div></div>';
		if ((questiontype !== "textbox") && (questiontype !== "textarea")) {
            var thisanswno = 1;
			while (thisanswno <= totalansw) {
                if (((thisanswno === 1) && (totalansw > 1)) || ((thisanswno === 1) && (totalansw === 1) && ((questiontype === "radio") || (questiontype === "checkbox")))) {
    		        var anstextbox = '<div id="answrow' + thisquestno + '-' + 1 + '" class="row firstanswer"><br><div class="col-xs-2 col-sm-1">Answer:</div><div class="col-xs-8 col-sm-10"><input type="text" class="form-control answer" id="answer' + thisquestno + '-' + thisanswno + '" name="answer' + thisquestno + '-' + thisanswno + '_textbox" value=""/></div></div><div id="answersdiv' + thisquestno + '">';
                } else if ((thisanswno === totalansw) && ((questiontype === "radio_input_sm") || (questiontype === "radio_input_lg") || (questiontype === "checkbox_input_sm"))) {
    		        var anstextbox = '</div><div id="answrow' + thisquestno + '-' + thisanswno + '" class="row correspanswer"><br><div class="col-xs-2 col-sm-1">Answer:</div><div class="col-xs-8 col-sm-10"><input type="text" class="form-control corresp1-2 answer" id="answer' + thisquestno + '-' + thisanswno + '" name="answer' + thisquestno + '-' + thisanswno + '_textbox" value=""/><p class="corresp1-2note">Content in the above textbox will be the corresponding controller for optional user input.</p></div></div>';       
                } else {
    		        var anstextbox = '<div id="answrow' + thisquestno + '-' + thisanswno + '" class="row answer"><br><div class="col-xs-2 col-sm-1">Answer:</div><div class="col-xs-8 col-sm-10"><input type="text" class="form-control answer" id="answer' + thisquestno + '-' + thisanswno + '" name="answer' + thisquestno + '-' + thisanswno + '_textbox" value=""/></div><div class="col-xs-2 col-sm-1"><button class="btn btn-default btn-md oneline answremovebtn" id="removeanswer' + thisquestno + '-' + thisanswno + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div>';
                }
				thisquestanswer = thisquestanswer + anstextbox;
				thisanswno += 1;
			}
            if ((questiontype === "radio") || (questiontype === "checkbox")) {
                thisquestanswer = thisquestanswer + '</div>';
            }
            thisquestanswer = thisquestanswer + '<br><button class="btn btn-default btn-md removequestbtn" id="removequestgroup' + thisquestno + '">Remove Question</button><button class="btn btn-default btn-md addanswerbtn" id="addanswer' + thisquestno + '"><span class="answbtntext">Add Answer</span>&nbsp;&nbsp;<span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><br><br></div>';
		} else {
            thisquestanswer = thisquestanswer + '<br><button class="btn btn-default btn-md removequestbtn" id="removequestgroup' + thisquestno + '">Remove Question</button><button class="btn btn-default btn-md addanswerbtn" id="addanswer' + thisquestno + '"><span class="answbtntext">Add Answer</span>&nbsp;&nbsp;<span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button><button class="btn btn-default btn-md answremove67btn" id="remove67answer' + thisquestno + '"><span class="answbtntext">Remove Answer</span>&nbsp;<span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></button><br><br></div>';            
        }
		$("#qa").append(thisquestanswer);
        $("#currquestno").val(thisquestno);
        document.getElementById("displayviewquestiontype").innerHTML = "";
	}
});


$("body").on("click", ".answremovebtn", function (e) {
    "use strict";
	e.preventDefault();
    var answer = $(this).closest("div.answer");
    var questgroup = $(this).closest("div.questgroup");
    var totalansw = $(questgroup).find("input.totalanswers");
    var newtotal = Number($(totalansw).val()) - 1;
    if (newtotal > 1) {
        var checkstr = window.confirm("Sure you want to remove this answer?");
        if (checkstr === true) {
            $(answer).remove();
            $(totalansw).val(newtotal);
        }
    } else {
        alert("Must have at least two answers!");
    }
});


$("body").on("click", ".answremove67btn", function (e) {
    "use strict";
	e.preventDefault();
    var thisquestno = this.id.slice(14);
    var totalansw = Number($("#totalanswers" + thisquestno).val());
    if (totalansw > 1) {
        totalansw -= 1;
        document.getElementById("totalanswers" + thisquestno).value = totalansw;
    } else {
        alert("Must have at least one answer!");
    }
});


$("body").on("click", ".addanswerbtn", function (e) {
    "use strict";
	e.preventDefault();
    var thisquestno = this.id.slice(9);
    var totalansw = Number($("#totalanswers" + thisquestno).val());
    if (totalansw < 20) {
        totalansw += 1;
        document.getElementById("totalanswers" + thisquestno).value = totalansw;
        var questtype = document.getElementById("questtype" + thisquestno).value;
        if ((questtype !== "textbox") && (questtype !== "textarea")) {
            var thisanswno = $("#answersdiv" + thisquestno).children().size() + 2;
            var anstextbox = '<div id="answrow' + thisquestno + '-' + thisanswno + '" class="row answer"><br><div class="col-xs-2 col-sm-1">Answer:</div><div class="col-xs-8 col-sm-10"><input type="text" class="form-control answer" id="answer' + thisquestno + '-' + thisanswno + '" name="answer' + thisquestno + '-' + thisanswno + '_textbox" value=""/></div><div class="col-xs-2 col-sm-1"><button class="btn btn-default btn-md oneline answremovebtn" id="removeanswer' + thisquestno + '-' + thisanswno + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div>';
            $("#answersdiv" + thisquestno).append(anstextbox);
            if ((questtype === "radio_input_sm") || (questtype === "radio_input_lg") || (questtype === "checkbox_input_sm")) {
                var thiscorrespbox = document.getElementById("qa" + thisquestno).querySelector("input[type='text'].corresp1-2");
                thiscorrespbox.name = "answer" + thisquestno + '-' + totalansw + "_textbox";
            }
        }
    } else {
        alert("Maximum Answers");
    }
});


$("body").on("click", ".removequestbtn", function (e) {
    "use strict";
	e.preventDefault();
    var checkstr = window.confirm("Sure you want to remove this question?");
    if (checkstr === true) {
        var questgroup = $(this).closest("div .questgroup");
        $(questgroup).remove();
        var qn = $("input.questionnumber");
        for (var i = 1; i <= qn.length; i += 1) {
            qn[i - 1].value = i;
        }
        $("#currquestno").val(qn.length);
    }
});



$("#question_type").change(function() {
    "use strict";
    document.getElementById("displayviewquestiontype").innerHTML = "";
    var questiontype = $("#question_type").val();
    if ((questiontype === "0") || (questiontype === "textbox") || (questiontype === "textarea")) {
        document.getElementById("total_answers").options[1].disabled = false;
    } else {
        document.getElementById("total_answers").options[1].disabled = true;        
        document.getElementById("total_answers").selectedIndex = "2";        
    }
});


var newquestnotext = '<h5>EXAMPLE</h5><p class="question"><span class="questno">Question 1:</span> Question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1 question 1.</p>';

var closebtn = '<button class="btn btn-primary btn-md addquestbtn" id="hidequestionexample" name="hidequestionexample">Hide Question Example</button>';


$("#showquestionexample").click(function() {
    "use strict";
    var questtype = $("#question_type").val();
    var totalanswers = $("#total_answers").val();    
    if (questtype === "radio") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><label for="answer0-1" class="btn btn-sm btn-default"><input type="radio" name="answer0_radio" id="answer0-1" value="1"> No</label></p><p><label for="answer0-2" class="btn btn-sm btn-default"><input type="radio" name="answer0_radio" id="answer0-2" value="2"> Yes</label></p>' + closebtn;       
    } else if (questtype === "radio_input_sm") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><label for="answer0-1" class="btn btn-sm btn-default"><input type="radio" name="answer0_radio" id="answer0-1" value="1"> No</label></p><p><label for="answer0-2" class="btn btn-sm btn-default"><input type="radio" name="answer0_radio" id="answer0-2" class="userchoice" value="2"> Yes</label></p><p><input disabled type="text" class="form-control userinput" id="answer0-2-1" name="answer0-2_textbox" value=""/></p>' + closebtn;       
    } else if (questtype === "radio_input_lg") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><label for="answer0-1" class="btn btn-sm btn-default"><input type="radio" name="answer0_radio" id="answer0-1" value="1"> No</label></p><p><label for="answer0-2" class="btn btn-sm btn-default"><input type="radio" name="answer0_radio" id="answer0-2" class="userchoice" value="2"> Yes</label></p><p><textarea disabled class="form-control userinput" id="answer0-2-1" name="answer0-2_textarea"></textarea></p>' + closebtn;       
    } else if (questtype === "checkbox") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><label for="answer0-1" class="btn btn-sm btn-default"><input type="checkbox" name="answer0-1_checkbox" id="answer0-1" value="1"> Answer 1-1</label></p><p><label for="answer0-2" class="btn btn-sm btn-default"><input type="checkbox" name="answer0-2_checkbox" id="answer0-2" value="2"> Answer 1-2</label></p><p><label for="answer0-3" class="btn btn-sm btn-default"><input type="checkbox" name="answer0-3_checkbox" id="answer0-3" value="3"> Answer 1-3</label></p>' + closebtn;
    } else if (questtype === "checkbox_input_sm") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><label for="answer0-1" class="btn btn-sm btn-default"><input type="checkbox" name="answer0-1_checkbox" id="answer0-1" value="1"> Answer 1-1</label></p><p><label for="answer0-2" class="btn btn-sm btn-default"><input type="checkbox" name="answer0-2_checkbox" id="answer0-2" value="2"> Answer 1-2</label></p><p><label for="answer0-3" class="btn btn-sm btn-default"><input type="checkbox" name="answer0-3_checkbox" id="answer0-3" class="userchoice" value="3"> Other</label></p><p><input disabled type="text" class="form-control userinput" id="answer0-3-1" name="answer0-3_textbox" value=""/></p>' + closebtn;
    } else if (questtype === "textbox") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><input type="text" class="form-control" id="answer0-1" name="answer0-1_textbox" value=""/></p><p><input type="text" class="form-control" id="answer0-2" name="answer0-2_textbox" value=""/></p>' + closebtn;
    } else if (questtype === "textarea") {
        document.getElementById("displayviewquestiontype").innerHTML = newquestnotext + '<p><textarea class="form-control" id="answer0-1" name="answer0-1_textarea"></textarea></p>' + closebtn;
    } else {
        document.getElementById("displayviewquestiontype").innerHTML = "";
    }
});


$("body").on("click", "#hidequestionexample", function () {
    "use strict";
    document.getElementById("displayviewquestiontype").innerHTML = "";
});


$("body").on("click", ".userchoice", function () {
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


$("body").on("click", "input[type = 'radio']", function () {
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
