//Case Management System

// INDEX (Cases) AND TASKS SCREEN


$("#submitcasesfilter").click(function () {
    "use strict";
//alert('case filter click');
    var passvalidation = true;
    if (passvalidation === true) {
        $("#casesfilterform").submit();
    }
});



$("#submittasksfilter").click(function () {
    "use strict";
//alert('task filter click');
    var passvalidation = true;
    if (passvalidation === true) {
        $("#tasksfilterform").submit();
    }
});


$("#submittask").click(function () {
    "use strict";
//alert('task listing click');
    var passvalidation = true;
    if (passvalidation === true) {
        $("#taskform").submit();
    }
});

