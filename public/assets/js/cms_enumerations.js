
$("#expandenums").click(function () {
    "use strict";
    $(".enumsectdiv").show();
});

$("#collapseenums").click(function () {
    "use strict";
    $(".enumsectdiv").hide();
});



$(".enumhdbtn").click(function () {
    "use strict";
    var hdbtn = this.id;
    var words = hdbtn.slice(4);
    if (document.getElementById("div" + words).style.display !== "block") {
        document.getElementById("div" + words).style.display = "block";
    } else {
        document.getElementById("div" + words).style.display = "none";
    }
});


$("#resetenum").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#totalenumvalues").val(0);
    $("#freezeenumvalues").val(0);
    $("#enumname").val("");
    document.getElementById("userenumvaluesdiv").innerHTML = "";
});


$("#adduserenumvalue").click(function (e) {
    "use strict";
    e.preventDefault();
    var userenumvalue = $(".userenumvalue");
    var thisvalueno = userenumvalue.length + 1;
    var userenumvaluetextbox = '<div id="enumvaluerow' + thisvalueno + '" class="row userdefinedenum"><br><div class="col-xs-10 col-sm-11"><input type="text" class="form-control userenumvalue" id="userenumvalue' + thisvalueno + '" name="userenumvalue' + thisvalueno + '" value=""/></div><div class="col-xs-2 col-sm-1"><button class="btn btn-default btn-md oneline enumvalueremovebtn" id="removeenumvalue' + thisvalueno + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div>';
    $("#userenumvaluesdiv").append(userenumvaluetextbox);
    var totalenumvalues = Number($("#totalenumvalues").val());
    totalenumvalues += 1;
    $("#totalenumvalues").val(totalenumvalues);
});


$("#freezeuserenumvalue").click(function (e) {
    "use strict";
    e.preventDefault();
    var userenumvalue = $(".userenumvalue");
    var thisvalueno = userenumvalue.length + 1;
    var userenumvaluetextbox = '<div id="enumvaluerow' + thisvalueno + '" class="row userdefinedenum"><br><div class="col-xs-10 col-sm-11"><input type="text" class="form-control userenumvalue" id="userenumvalue' + thisvalueno + '" name="userenumvalue' + thisvalueno + '" readonly value=""/></div><div class="col-xs-2 col-sm-1"></div></div>';
    $("#userenumvaluesdiv").append(userenumvaluetextbox);
    var totalenumvalues = Number($("#totalenumvalues").val());
    totalenumvalues += 1;
    $("#totalenumvalues").val(totalenumvalues);
});


$("#closeeditenum").click(function (e) {
    "use strict";
    e.preventDefault();
    $("#resetenum").click();
    $("#enumformdiv").hide();
});



$("body").on("click", ".inputenumbtn", function () {
    "use strict";
    $("#resetenum").click();
    var enumname = this.id.slice(10);
    $("#enumfunctiontype").val("input");
    $("#enumname").val(enumname);
    var freezevalues = Number(document.getElementById("freeze_" + enumname).value);
    $("#freezeenumvalues").val(freezevalues);
    $("#enumformdiv").show();
    $("#adduserenumvalue").click();
    location.hash = "#enumformdiv";
});



$("body").on("click", ".editenumbtn", function () {
    "use strict";
    $("#resetenum").click();
    var enumname = this.id.slice(9);
    $("#enumfunctiontype").val("update");
    $("#enumname").val(enumname);
    $("#enumformdiv").show();
    var enumvalues = document.getElementById(enumname).querySelectorAll(".enumvalue");
    var freezevalues = Number(document.getElementById("freeze_" + enumname).value);
    $("#freezeenumvalues").val(freezevalues);
    var i;
    for (i = 0; i < freezevalues; i += 1) {
        $("#freezeuserenumvalue").click();
        document.getElementById("userenumvalue" + (i + 1)).value = enumvalues[i].innerHTML;
    }
    for (i = freezevalues; i < enumvalues.length; i += 1) {
        $("#adduserenumvalue").click();
        document.getElementById("userenumvalue" + (i + 1)).value = enumvalues[i].innerHTML;
    }
    location.hash = "#enumformdiv";
});


$("body").on("click", ".enumvalueremovebtn", function (e) {
    "use strict";
    e.preventDefault();
    var checkstr = window.confirm("Sure you want to remove this answer?");
    if (checkstr === true) {
        var userdefinedenum = $(this).closest("div.userdefinedenum");
        $(userdefinedenum).remove();
        var totalenumvalues = Number($("#totalenumvalues").val());
        totalenumvalues -= 1;
        $("#totalenumvalues").val(totalenumvalues);
    }
});


$(".minfreeze").change(function () {
    "use strict";
    var minfreeze = $(this).val();
    var thisenum = this.id.slice(6);
    var reqfreeze = document.getElementById("required" + thisenum).value;
    if (minfreeze < reqfreeze) {
        $(this).val(reqfreeze);
    }
});
