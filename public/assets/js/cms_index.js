//CMS - Index

$(".morecasebtn").click(function () {
    "use strict";
    var morebtn = this.id;
    var words = morebtn.slice(11);
    var peopletablerows = document.getElementById("p_assign" + words).getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    if (peopletablerows > 0) {
        document.getElementById("peoplediv" + words).style.display = "block";
    } else {
        document.getElementById("peoplediv" + words).style.display = "none";
    }
    var orgtablerows = document.getElementById("o_assign" + words).getElementsByTagName("tbody")[0].getElementsByTagName("tr").length;
    if (orgtablerows > 0) {
        document.getElementById("orgdiv" + words).style.display = "block";
    } else {
        document.getElementById("orgdiv" + words).style.display = "none";
    }
    if ((peopletablerows > 0) || (orgtablerows > 0)) {
        document.getElementById(morebtn).disabled = false;
    } else {
        document.getElementById(morebtn).disabled = true;
    }
});




//OVERDUE TABLES

$(".collapsealloverdue").click(function () {
    "use strict";
    $(".overdue_table").hide();
});

$(".expandalloverdue").click(function () {
    "use strict";
    $(".overdue_table").show();
});

$(".overduehdbtn").click(function () {
    "use strict";
    var hdbtn = this.id;
    var words = hdbtn.slice(4);
    if (document.getElementById("div" + words).style.display !== "block") {
        document.getElementById("div" + words).style.display = "block";
    } else {
        document.getElementById("div" + words).style.display = "none";
    }
});

