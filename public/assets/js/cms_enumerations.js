
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
    $("#totalenumkeys").val(0);
    $("#freezeenumkeys").val(0);
    $("#enumname").val("");   
    document.getElementById("userenumkeysdiv").innerHTML = "";
});


$("#adduserenumkey").click(function (e) {
    "use strict";
	e.preventDefault();
    var userenumkey = $(".userenumkey");
    var thiskeyno = userenumkey.length + 1;
    var userenumkeytextbox = '<div id="enumkeyrow' + thiskeyno + '" class="row userdefinedenum"><br><div class="col-xs-10 col-sm-11"><input type="text" class="form-control userenumkey" id="userenumkey' + thiskeyno + '" name="userenumkey' + thiskeyno + '" value=""/></div><div class="col-xs-2 col-sm-1"><button class="btn btn-default btn-md oneline enumkeyremovebtn" id="removeenumkey' + thiskeyno + '"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></button></div></div>';
    $("#userenumkeysdiv").append(userenumkeytextbox);
    var totalenumkeys = Number($("#totalenumkeys").val());
    totalenumkeys += 1;
    $("#totalenumkeys").val(totalenumkeys);
});


$("#freezeuserenumkey").click(function (e) {
    "use strict";
	e.preventDefault();
    var userenumkey = $(".userenumkey");
    var thiskeyno = userenumkey.length + 1;
    var userenumkeytextbox = '<div id="enumkeyrow' + thiskeyno + '" class="row userdefinedenum"><br><div class="col-xs-10 col-sm-11"><input type="text" class="form-control userenumkey" id="userenumkey' + thiskeyno + '" name="userenumkey' + thiskeyno + '" readonly value=""/></div><div class="col-xs-2 col-sm-1"></div></div>';
    $("#userenumkeysdiv").append(userenumkeytextbox);
    var totalenumkeys = Number($("#totalenumkeys").val());
    totalenumkeys += 1;
    $("#totalenumkeys").val(totalenumkeys);
});


$("#closeeditenum").click(function (e) {
    "use strict";
	e.preventDefault();
    $("#resetenum").click();
    $("#enumformdiv").hide();
});



$("body").on("click", ".editenumbtn", function () {
    "use strict";
    $("#resetenum").click();
    var enumname = this.id.slice(9);
    $("#enumname").val(enumname);
    $("#enumformdiv").show();
    var enumkeys = document.getElementById(enumname).querySelectorAll(".enumkey");
    var freezekeys = Number(document.getElementById("freeze_" + enumname).value);
    $("#freezeenumkeys").val(freezekeys);
    for (var i = 0; i < freezekeys; i += 1) {
        $("#freezeuserenumkey").click();
        document.getElementById("userenumkey" + (i + 1)).value = enumkeys[i].innerHTML;
    }
    for (var i = freezekeys; i < enumkeys.length; i += 1) {
        $("#adduserenumkey").click();
        document.getElementById("userenumkey" + (i + 1)).value = enumkeys[i].innerHTML;
    }
    location.hash = "#enumformdiv";
});


$("body").on("click", ".enumkeyremovebtn", function (e) {
    "use strict";
	e.preventDefault();
    var checkstr = window.confirm("Sure you want to remove this answer?");
    if (checkstr === true) {
        var userdefinedenum = $(this).closest("div.userdefinedenum");
        $(userdefinedenum).remove();
        var totalenumkeys = Number($("#totalenumkeys").val());
        totalenumkeys -= 1;
        $("#totalenumkeys").val(totalenumkeys);
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
