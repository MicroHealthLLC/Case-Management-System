var express = require("express");
var multer = require("multer");
var upload = multer({ dest: "uploads" });
var app = express();
app.use(express.static("public/assets"));
app.use(express.static("uploads/assets2"));
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/uploads"));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride("_method"));

var port = process.env.PORT || 3000;

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "mountains half grassy, half snow-capped.",
    resave: false,
    saveUninitialized: false
}));

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
//    res.locals.error = req.flash("error");
//    res.locals.success = req.flash("success");
    next();
});


var person = [
	{person_id: "1", last_name: "Doe", first_name: "John", middle_name: "Mark", title: "CEO", lk_gender: "1", birth_date: "10/12/1990", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "1", note: "Is hearing impaired.", image: "1_personimage.jpg"},
	{person_id: "2", last_name: "Johnson", first_name: "Beth", middle_name: "Sue", title: "Assistant", lk_gender: "2", birth_date: "02/30/1995", lk_user_role: "2", lk_person_type: "3", lk_person_status: "1", lk_religion: "2", note: "Blah Blah Blah.", image: "2_personimage.jpg"},
	{person_id: "3", last_name: "Albertson", first_name: "Michael", middle_name: "", title: "CIO", lk_gender: "1", birth_date: "07/20/1998", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "0", note: "", image: "noimage_lg.jpg"},
	{person_id: "4", last_name: "Richardson", first_name: "Mary", middle_name: "", title: "Manager", lk_gender: "2", birth_date: "03/22/1974", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "1", note: "", image: "noimage_lg.jpg"},
	{person_id: "5", last_name: "Parker", first_name: "Donna", middle_name: "Ray", title: "", lk_gender: "2", birth_date: "05/08/1980", lk_user_role: "", lk_person_type: "", lk_person_status: "", lk_religion: "", note: "", image: "noimage_lg.jpg"}
];
var thisperson = [];

var identification = [
    {identification_id: "1", person_id: "1", lk_identification_type: "1", identification_number: "123456789000", issuedby_org: "DMV - Richmond, VA", issued_date: "04/19/2012", expiration_date: "04/19/2022", identification_status: "1", note: ""},
    {identification_id: "2", person_id: "2", lk_identification_type: "3", identification_number: "897543654335", issuedby_org: "Passport USA", issued_date: "11/10/2014", expiration_date: "11/10/2024", identification_status: "1", note: ""},
    {identification_id: "3", person_id: "3", lk_identification_type: "2", identification_number: "432844966", issuedby_org: "Social Security Services, USA", issued_date: "08/05/1980", expiration_date: "", identification_status: "1", note: ""}
];
var person_identification = [];

var organization = [
	{organization_id: "1", organization_name: "Organization Name 1", organization_website: "www.organizationone.com", lk_user_role: "1", lk_organization_type: "1",  lk_organization_status: "1", note: ""},
	{organization_id: "2", organization_name: "Organization Name 2", organization_website: "www.organizationtwo.net", lk_user_role: "2", lk_organization_type: "2",  lk_organization_status: "1", note: ""},
	{organization_id: "3", organization_name: "Organization Name 3", organization_website: "www.organization3.org", lk_user_role: "2", lk_organization_type: "2",  lk_organization_status: "1", note: ""}
];
var thisorg = [];

var cases = [
	{case_id: "1", case_title: "Case Title 1", case_description: "medical info info info", lk_case_domain: "1", lk_case_category: "1", lk_case_type: "1",  lk_case_status: "1", lk_case_severity: "3", lk_case_priority: "2",
    start_date: "11/20/2015", due_date: "01/20/2017", complete_date: "", caseperson_id: "5"},
	{case_id: "2", case_title: "Case Title 2", case_description: "medical info2 info2 info2", lk_case_domain: "1", lk_case_category: "1", lk_case_type: "1",  lk_case_status: "1", lk_case_severity: "1", lk_case_priority: "1",
    start_date: "02/27/2016", due_date: "09/23/2016", complete_date: "", caseperson_id: "5"},
	{case_id: "3", case_title: "Case Title 3", case_description: "non-medical blah blah blah", lk_case_domain: "1", lk_case_category: "2", lk_case_type: "2",  lk_case_status: "1", lk_case_severity: "2", lk_case_priority: "1",
    start_date: "09/10/2015", due_date: "12/20/2016", complete_date: "", caseperson_id: ""}
];
var thiscase = [];
var overdue_cases = [];
var thesecasespeople = [];
var thiscaseperson = [];


var case_case_relationship = [
    {case_relationship_id: "1", lk_case_relationship_type: "1", case_id1: "2", case_id2: "1"}
];
var thisrelatedcase = [];

var case_assignment = [
    {case_assignment_id: "1", case_id: "1", person_id: "1", organization_id: "", lk_assigned_role: "1", lk_case_assignment_type: "1", start_date: "09/20/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "2", case_id: "1", person_id: "2", organization_id: "", lk_assigned_role: "2", lk_case_assignment_type: "2", start_date: "11/27/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "3", case_id: "1", person_id: "4", organization_id: "", lk_assigned_role: "1", lk_case_assignment_type: "2", start_date: "06/22/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "4", case_id: "1", person_id: "", organization_id: "1", lk_assigned_role: "1", lk_case_assignment_type: "1", start_date: "09/20/2015", end_reason: "", end_date: ""},
];
var cases_person_assignment = [];
var cases_org_assignment = [];
var person_assignment = [];
var org_assignment = [];
var my_cases = [];

var cases_needs = [
    {need_id: "1", case_id: "1", name: "Need 1 - Medical", type: "2", assessment_date: "10/22/2016", stage: "1", need_status: "1", severity: "2", note: "", need_doc: "Case_1__Need_1.docx"},
    {need_id: "2", case_id: "1", name: "Need 2 - Financial", type: "3", assessment_date: "10/23/2016", stage: "3", need_status: "3", severity: "1", note: "", need_doc: ""},
    {need_id: "3", case_id: "1", name: "Need 3 - Social", type: "1", assessment_date: "10/25/2016", stage: "1", need_status: "1", severity: "1", note: "", need_doc: ""},
];
var this_cases_needs = [];
var goals_thru_actions = [];

var cases_goals = [
    {goal_id: "1", case_id: "1", name: "Goal 1 - Medical", type: "1", priority: "2", start_date: "10/23/2016", due_date: "11/10/2016", complete_date: "11/06/2016", assocneed_id: "1", assignedperson_id: "1", note: "", goal_doc: "Case_1__Goal_1.docx"},
    {goal_id: "2", case_id: "1", name: "Goal 2 - Financial", type: "1", priority: "1", start_date: "10/23/2016", due_date: "10/28/2016", complete_date: "10/28/2016", assocneed_id: "2", assignedperson_id: "1", note: "", goal_doc: ""},
    {goal_id: "3", case_id: "1", name: "Goal 3 - Medical", type: "2", priority: "3", start_date: "11/01/2016", due_date: "12/06/2016", complete_date: "", assocneed_id: "1", assignedperson_id: "1", note: "", goal_doc: ""},
    {goal_id: "4", case_id: "1", name: "Goal 4 - Social", type: "1", priority: "3", start_date: "11/04/2016", due_date: "12/09/2016", complete_date: "", assocneed_id: "3", assignedperson_id: "1", note: "", goal_doc: ""},
];
var this_cases_goals = [];
var overdue_goals = [];

var cases_plans = [
    {plan_id: "1", case_id: "1", name: "Plan 1 - Medical", type: "2", priority: "2", start_date: "10/27/2016", due_date: "11/10/2016", complete_date: "11/04/2016", assocgoal_id: "1", assignedperson_id: "1", note: "", plan_doc: "Case_1__Plan_1.docx"},
    {plan_id: "2", case_id: "1", name: "Plan 2 - Financial", type: "3", priority: "1", start_date: "10/28/2016", due_date: "11/01/2016", complete_date: "11/01/2016", assocgoal_id: "2", assignedperson_id: "1", note: "", plan_doc: ""},
    {plan_id: "3", case_id: "1", name: "Plan 3 - Medical", type: "1", priority: "1", start_date: "10/31/2016", due_date: "11/03/2016", complete_date: "", assocgoal_id: "1", assignedperson_id: "1", note: "", plan_doc: ""},
];
var this_cases_plans = [];
var overdue_plans = [];

var cases_actions = [
    {action_id: "1", case_id: "1", name: "Action 1 - Medical", type: "2", priority: "2", start_date: "10/28/2016", due_date: "11/01/2016", complete_date: "10/30/2016", assocplan_id: "1", assignedperson_id: "1", note: "", action_doc: "Case_1__Action_1.docx"},
    {action_id: "2", case_id: "1", name: "Action 2 - Medical", type: "1", priority: "3", start_date: "10/31/2016", due_date: "11/02/2016", complete_date: "", assocplan_id: "1", assignedperson_id: "1", note: "", action_doc: ""},
    {action_id: "3", case_id: "1", name: "Action 2 - Financial", type: "2", priority: "1", start_date: "11/01/2016", due_date: "11/03/2016", complete_date: "11/03/2016", assocplan_id: "2", assignedperson_id: "1", note: "", action_doc: ""},
    {action_id: "4", case_id: "1", name: "Action 1A - Medical", type: "3", priority: "3", start_date: "11/03/2016", due_date: "11/06/2016", complete_date: "11/06/2016", assocplan_id: "1", assignedperson_id: "1", note: "", action_doc: ""},
];
var this_cases_actions = [];
var overdue_actions = [];

var cases_casefiles = [
    {casefile_id: "1", case_id: "1", name: "Case_1__File_1", domain: "2", actiontype: "1", type: "1", filedate: "11/04/2016 at 10:41:53", fileperson_id: "1", fileorg_id: "1", note: "", file_doc: "Case_1__File_1.docx"},
];
var this_cases_files = [];

var cases_casenotes = [];
var this_cases_notes = [];


var contact_phone = [
	{phone_id: "1", person_id: "", organization_id: "1", lk_phone_type: "2", phone_number: "642-562-1198", note: ""},
	{phone_id: "2", person_id: "1", organization_id: "1", lk_phone_type: "2", phone_number: "642-562-1197", note: "Extension 384"},
	{phone_id: "3", person_id: "3", organization_id: "1", lk_phone_type: "2", phone_number: "642-562-1197", note: "Extension 390"},
	{phone_id: "4", person_id: "", organization_id: "2", lk_phone_type: "2", phone_number: "534-833-0000", note: ""},
	{phone_id: "5", person_id: "2", organization_id: "2", lk_phone_type: "2", phone_number: "534-833-0001", note: "Extension 8745"},
	{phone_id: "6", person_id: "1", organization_id: "", lk_phone_type: "1", phone_number: "123-999-7777", note: ""},
	{phone_id: "7", person_id: "1", organization_id: "", lk_phone_type: "3", phone_number: "123-977-7000", note: "Weeknights and weekends."},
	{phone_id: "8", person_id: "2", organization_id: "", lk_phone_type: "1", phone_number: "427-456-5555", note: ""},
	{phone_id: "9", person_id: "", organization_id: "1", lk_phone_type: "3", phone_number: "642-562-0000", note: ""},
	{phone_id: "10", person_id: "5", organization_id: "", lk_phone_type: "1", phone_number: "456-987-5566", note: ""},
];
var person_contact_phone = [];
var org_contact_phone = [];

var contact_email = [
	{email_id: "1", person_id: "", organization_id: "1", lk_email_type: "2", email_address: "info@organizationone.com", note: ""},
	{email_id: "2", person_id: "1", organization_id: "1", lk_email_type: "2", email_address: "person1.lastname@organizationone.com", note: ""},
	{email_id: "3", person_id: "3", organization_id: "1", lk_email_type: "2", email_address: "person3.lastname@organizationone.com", note: ""},
	{email_id: "4", person_id: "", organization_id: "2", lk_email_type: "2", email_address: "info@organizationtwo.net", note: ""},
	{email_id: "5", person_id: "2", organization_id: "2", lk_email_type: "2", email_address: "person2.lastname@organizationtwo.net", note: ""},
	{email_id: "6", person_id: "1", organization_id: "", lk_email_type: "1", email_address: "person1name@gmail.com", note: "Only when status is Inactive."},
	{email_id: "7", person_id: "2", organization_id: "", lk_email_type: "1", email_address: "person2name@yahoo.com", note: "Use only for emergencies when there is no response after 1 hour from sending business email."},
	{email_id: "8", person_id: "5", organization_id: "", lk_email_type: "1", email_address: "donna.parker@gmail.com", note: ""},
];
var person_contact_email = [];
var org_contact_email = [];


var contact_fax = [
	{fax_id: "1", person_id: "", organization_id: "1", lk_fax_type: "2", fax_number: "642-562-2198", note: ""},
	{fax_id: "2", person_id: "1", organization_id: "1", lk_fax_type: "2", fax_number: "642-562-2197", note: ""},
];
var person_contact_fax = [];
var org_contact_fax = [];


var contact_media = [
	{media_id: "1", person_id: "1", organization_id: "", lk_media_type: "1", media_handle: "person1@facebook.com", note: ""},
	{media_id: "2", person_id: "", organization_id: "1", lk_media_type: "1", media_handle: "organization1@facebook.com", note: ""},
];
var person_contact_media = [];
var org_contact_media = [];


var contact_address = [
	{address_id: "1", person_id: "", organization_id: "1", lk_address_type: "2", address: "234 Anywhere Street", city: "Richmond", lk_state: "Virginia", zipcode: "11111", lk_statecode: "VA", lk_countrycode: "USA", note: ""},
	{address_id: "2", person_id: "1", organization_id: "1", lk_address_type: "2", address: "234 Anywhere Street", city: "Richmond", lk_state: "Virginia", zipcode: "11111", lk_statecode: "VA", lk_countrycode: "USA", note: ""},
	{address_id: "3", person_id: "5", organization_id: "", lk_address_type: "1", address: "733 Patient Avenue", city: "Atlanta", lk_state: "Georgia", zipcode: "11177", lk_statecode: "GA", lk_countrycode: "USA", note: ""},
];
var person_contact_address = [];
var org_contact_address = [];


var person_organization_relationship = [
    {person_organization_id: "1", person_id: "1", organization_id: "1", lk_contact_type: "1", lk_person_organization_relationship_type: "1", start_date: "06/15/2015", end_reason: "", end_date: ""},
    {person_organization_id: "2", person_id: "1", organization_id: "3", lk_contact_type: "3", lk_person_organization_relationship_type: "2", start_date: "07/22/2016", end_reason: "", end_date: ""},
    {person_organization_id: "3", person_id: "2", organization_id: "1", lk_contact_type: "3", lk_person_organization_relationship_type: "2", start_date: "03/07/2016", end_reason: "", end_date: ""},
];
var personorg_relationship = [];

var person_person_relationship = [
    {person_relationship_id: "1", person_id1: "1", person_id2: "2", lk_contact_type: "1", lk_person_relationship_type: "1", start_date: "02/19/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "2", person_id1: "1", person_id2: "2", lk_contact_type: "2", lk_person_relationship_type: "1", start_date: "01/22/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "3", person_id1: "1", person_id2: "3", lk_contact_type: "1", lk_person_relationship_type: "1", start_date: "03/27/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "4", person_id1: "1", person_id2: "4", lk_contact_type: "1", lk_person_relationship_type: "2", start_date: "08/18/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "5", person_id1: "1", person_id2: "3", lk_contact_type: "3", lk_person_relationship_type: "2", start_date: "07/25/2016", end_reason: "", end_date: ""},
];
var person_relationship = [];

var organization_organization_relationship = [
    {organization_relationship_id: "1", organization_id1: "1", organization_id2: "2", lk_contact_type: "1", lk_organization_relationship_type: "1", start_date: "03/25/2016", end_reason: "", end_date: ""},
    {organization_relationship_id: "2", organization_id1: "1", organization_id2: "3", lk_contact_type: "3", lk_organization_relationship_type: "2", start_date: "04/01/2016", end_reason: "", end_date: ""},
];
var organization_relationship = [];

var tasks = [
    {task_id: "1", subject: "Start Case", type: "2", priority: "2", person_id: "1", case_id: "1", start_date: "04/12/2015", due_date: "04/19/2015", complete_date: "04/19/2015", status: "4", note: ""},
    {task_id: "2", subject: "Assign Person to Case", type: "1", priority: "3", person_id: "3", case_id: "2", start_date: "10/02/2016", due_date: "10/12/2016", complete_date: "", status: "5", note: "Call the client."},
    {task_id: "3", subject: "Assign Person to Case", type: "3", priority: "2", person_id: "2", case_id: "1", start_date: "10/09/2016", due_date: "11/19/2016", complete_date: "", status: "2", note: "Remind to submit results."},
];
var taskslisting = [];
var overdue_tasks = [];





// *************  INDEX SCREEN   ********************************************

app.get("/", function(req, res){
//    res.render("index", {cases:cases});
    updateCasesPeople();
    updateCasesPersonAssignments();
    updateCasesOrgAssignments();
    overdueCases();
    overdueGoals();
    overduePlans();
    overdueActions();
    res.render("index", {cases:cases, organization:organization, thesecasespeople:thesecasespeople, cases_person_assignment:cases_person_assignment, cases_org_assignment:cases_org_assignment, overdue_cases:overdue_cases, overdue_goals:overdue_goals, overdue_plans:overdue_plans, overdue_actions:overdue_actions});
});


app.post("/", function(req, res){
    res.render("index", {cases:cases, organization:organization, cases_person_assignment:cases_person_assignment, cases_org_assignment:cases_org_assignment});
//    res.send("'<html><head></head><body><h1>Filter Cases</h1></body></html>'");
});





// *************  CASE SCREEN *********************************

// DISPLAY CASE INPUT FORM
app.get("/case", function(req, res){
//    res.render("case/index1");
    res.render("case/index1");
});

// CREATE CASE
app.post("/case", function(req, res){
    var title = req.body.casetitle;
    var description = req.body.casedescription;
    var domain = req.body.casedomain;
    var category = req.body.casecategory;
    var casetype = req.body.casetype;
    var casestatus = req.body.casestatus;
    var severity = req.body.caseseverity;
    var priority = req.body.casepriority;
    var startdate = req.body.casestartdate;
    var duedate = req.body.caseduedate;
    var completedate = req.body.casecompletedate;
    var j = cases.length - 1;
    if (j >= 0) {
        var caseid = (parseInt(cases[j].case_id,10) + 1);
        caseid = caseid.toString();
    } else {
        caseid = "1";
    }
	var newCase = {case_id: caseid, case_title: title, case_description: description, lk_case_domain: domain, lk_case_category: category, lk_case_type: casetype,  lk_case_status: casestatus, lk_case_severity: severity, lk_case_priority: priority, 
    start_date: startdate, due_date: duedate, complete_date: completedate};
    cases.push(newCase);
    res.redirect("/case/" + caseid);
});


// DISPLAY SPECIFC CASE
app.get("/case/:case_id", function(req, res){
    var caseid = req.params.case_id;
    var found = false;
    var j = -1;
    while ((found === false) && (j < cases.length - 1)) {
        j += 1;
        if (cases[j].case_id === caseid) {
            found = true;
        }
    }
    if (found === true) {
        updateThisCasePerson(caseid);
        updateRelatedCases(caseid);
        updatePersonAssignments(caseid);
        updateOrganizationAssignments(caseid);
        updateThisCasesNeeds(caseid);    
        updateThisCasesGoals(caseid);   
        updateThisCasesPlans(caseid);
        updateThisCasesActions(caseid);
        updateTasksCaseListing(caseid);
        updateThisCasesFiles(caseid);
        updateThisCasesNotes(caseid);
        res.render("case/index2",{thiscase:cases[j], thiscaseperson:thiscaseperson, cases:cases, person:person, organization:organization, thisrelatedcase:thisrelatedcase, person_assignment:person_assignment, organization_assignment:organization_assignment, this_cases_needs:this_cases_needs, this_cases_goals:this_cases_goals, this_cases_plans:this_cases_plans, this_cases_actions:this_cases_actions, taskscaselisting:taskscaselisting, this_cases_files:this_cases_files, this_cases_notes:this_cases_notes});
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Case Not Found!</h1></body></html>'");
    }
});


// EDIT SPECIFIC CASE
app.put("/case/:case_id", function(req, res){
    var caseid = req.params.case_id;
    var title = req.body.casetitle;
    var description = req.body.casedescription;
    var domain = req.body.casedomain;
    var category = req.body.casecategory;
    var casetype = req.body.casetype;
    var casestatus = req.body.casestatus;
    var severity = req.body.caseseverity;
    var priority = req.body.casepriority;
    var startdate = req.body.casestartdate;
    var duedate = req.body.caseduedate;
    var completedate = req.body.casecompletedate;
    var found = false;
    var j = -1;
    while ((found === false) && (j < cases.length - 1)) {
        j += 1;
        if (cases[j].case_id === caseid) {
            found = true;
        }
    }
    if (found === true) {
        var editCase = {case_id: caseid, case_title: title, case_description: description, lk_case_domain: domain, lk_case_category: category, lk_case_type: casetype,  lk_case_status: casestatus, lk_case_severity: severity, lk_case_priority: priority, 
    start_date: startdate, due_date: duedate, complete_date: completedate};
        cases[j] = editCase;
        res.redirect("/case/" + caseid);
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Case Not Found!</h1></body></html>'");
    }
});


// DELETE SPECIFIC CASE
app.delete("/case/:case_id", function(req, res){
  res.redirect("/");    
//    res.send("'<html><head></head><body><h1>Delete Specific Case</h1></body></html>'");
});





// *************  PERSON SCREEN ***************************************************

// DISPLAY PERSON INPUT FORM
app.get("/person", function(req, res){
//    res.render("person/index1");
    res.render("person/index1");
});


// CREATE PERSON
app.post("/person", function(req, res){
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var middlename = req.body.middlename;
    var persontitle = req.body.persontitle;
    var gender = req.body.gender;
    var birthdate = req.body.birthdate;
    var personrole = req.body.personrole;
    var persontype = req.body.persontype;
    var personstatus = req.body.personrolestatus;
    var religion = req.body.religion;
    var personnote = req.body.personnote;
    var personimage = "noimage_lg.jpg";
    var j = person.length - 1;
    if (j >= 0) {
        var personid = parseInt(person[j].person_id,10) + 1;
        personid = personid.toString();
    } else {
        personid = "1";
    }    
	var newPerson = {person_id: personid, last_name: lastname, first_name: firstname, middle_name: middlename, title: persontitle, lk_gender: gender, birth_date: birthdate, lk_user_role: personrole, lk_person_type: persontype, lk_person_status: personstatus, lk_religion: religion, note: personnote, image:personimage};
    person.push(newPerson);
    res.redirect("/person/" + personid);
});


// DISPLAY SPECIFC PERSON
app.get("/person/:person_id", function(req, res){
    var personid = req.params.person_id;
    var found = false;
    var j = -1;
    while ((found === false) && (j < person.length - 1)) {
        j += 1;
        if (person[j].person_id === personid) {
            found = true;
        }
    }
    if (found === true) {
        person_contact_phone = [];
        for (i = 0; i < contact_phone.length; i += 1) {
            if (contact_phone[i].person_id === personid) {
                person_contact_phone.push(contact_phone[i]);
            }
        }
        person_contact_email = [];
        for (i = 0; i < contact_email.length; i += 1) {
            if (contact_email[i].person_id === personid) {
                person_contact_email.push(contact_email[i]);
            }
        }
        person_contact_fax = [];
        for (i = 0; i < contact_fax.length; i += 1) {
            if (contact_fax[i].person_id === personid) {
                person_contact_fax.push(contact_fax[i]);
            }
        }
        person_contact_media = [];
        for (i = 0; i < contact_media.length; i += 1) {
            if (contact_media[i].person_id === personid) {
                person_contact_media.push(contact_media[i]);
            }
        }
        person_contact_address = [];
        for (i = 0; i < contact_address.length; i += 1) {
            if (contact_address[i].person_id === personid) {
                person_contact_address.push(contact_address[i]);
            }
        }
        person_identification = [];
        for (i = 0; i < identification.length; i += 1) {
            if (identification[i].person_id === personid) {
                person_identification.push(identification[i]);
            }
        }
        updatePersonRelationships(personid);
        updatePersonOrgRelationships(personid);
        updateThisPersonAssignments(personid);
//        updateThisPersonImage(personid);
        res.render("person/index2",{thisperson:person[j], person:person, cases:cases, organization:organization, person_contact_phone:person_contact_phone, person_contact_email:person_contact_email, person_contact_fax:person_contact_fax, person_contact_media:person_contact_media, person_contact_address:person_contact_address, person_identification:person_identification, person_relationship:person_relationship, personorg_relationship:personorg_relationship, my_cases:my_cases});
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Person Not Found!</h1></body></html>'");
    }
});


// EDIT SPECIFIC PERSON
app.put("/person/:person_id", function(req, res){
    var personid = req.params.person_id;
    var lastname = req.body.lastname;
    var firstname = req.body.firstname;
    var middlename = req.body.middlename;
    var persontitle = req.body.persontitle;
    var gender = req.body.gender;
    var birthdate = req.body.birthdate;
    var personrole = req.body.personrole;
    var persontype = req.body.persontype;
    var personstatus = req.body.personrolestatus;
    var religion = req.body.religion;
    var personnote = req.body.personnote;
    var found = false;
    var j = -1;
    while ((found === false) && (j < person.length - 1)) {
        j += 1;
        if (person[j].person_id === personid) {
            found = true;
        }
    }
    if (found === true) {
        var personimage = person[j].image;
	    var editPerson = {person_id: personid, last_name: lastname, first_name: firstname, middle_name: middlename, title: persontitle, lk_gender: gender, birth_date: birthdate, lk_user_role: personrole, lk_person_type: persontype, lk_person_status: personstatus, lk_religion: religion, note: personnote, image:personimage};
        person[j] = editPerson;
        res.redirect("/person/" + personid);
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Person Not Found!</h1></body></html>'");
    }
});


// DELETE SPECIFIC PERSON
app.delete("/person/:person_id", function(req, res){
    res.redirect("/");    
//    res.send("'<html><head></head><body><h1>Delete Specific Person</h1></body></html>'");
});





// *************  ORGANIZATION SCREEN ***************************************************

// DISPLAY ORGANIZATION INPUT FORM
app.get("/organization", function(req, res){
    res.render("organization/index1");
});


// CREATE ORGANIZATION
app.post("/organization", function(req, res){
    var orgname = req.body.organizationname;
    var orgwebsite = req.body.organizationwebsite;
    var orgrole = req.body.organizationrole;
    var orgtype = req.body.organizationtype;
    var orgstatus = req.body.organizationrolestatus;
    var orgnote = req.body.organizationnote;
    var j = organization.length - 1;
    if (j >= 0) {
        var organizationid = parseInt(organization[j].organization_id,10) + 1;
        organizationid = organizationid.toString();
    } else {
        organizationid = "1";
    }    
	var newOrganization = {organization_id: organizationid, organization_name: orgname, organization_website: orgwebsite, lk_user_role: orgrole, lk_organization_type: orgtype,  lk_organization_status: orgstatus, note: orgnote};
    organization.push(newOrganization);
    res.redirect("/organization/" + organizationid);
});


// DISPLAY SPECIFC ORGANIZATION
app.get("/organization/:organization_id", function(req, res){
    var organizationid = req.params.organization_id;
    var found = false;
    var found_phone = "";
    var found_email = "";
    var found_fax =  "";
    var j = -1;
    while ((found === false) && (j < organization.length - 1)) {
        j += 1;
        if (organization[j].organization_id === organizationid) {
            found = true;
        }
    }
    if (found === true) {
        org_contact_phone = [];
        found_phone = thisOrgContactsExists(contact_phone, "organization_id", organization[j].organization_id, "person_id");
        if (found_phone !== null) {
            for (var i = 0; i < contact_phone.length; i += 1) {
                if ((contact_phone[i].organization_id === organizationid) && (contact_phone[i].person_id === "")) {
                    org_contact_phone.push(contact_phone[i]);
                }
            }
        }
        org_contact_email = [];
        found_email = thisOrgContactsExists(contact_email, "organization_id", organization[j].organization_id, "person_id");
        if (found_email !== null) {
            for (var i = 0; i < contact_email.length; i += 1) {
                if ((contact_email[i].organization_id === organizationid) && (contact_email[i].person_id === "")) {
                    org_contact_email.push(contact_email[i]);
                }
            }
        }
        org_contact_fax = [];
        found_fax = thisOrgContactsExists(contact_fax, "organization_id", organization[j].organization_id, "person_id");
        if (found_fax !== null) {
            for (var i = 0; i < contact_fax.length; i += 1) {
                if ((contact_fax[i].organization_id === organizationid) && (contact_fax[i].person_id === "")) {
                    org_contact_fax.push(contact_fax[i]);
                }
            }
        }
        org_contact_media = [];
        for (i = 0; i < contact_media.length; i += 1) {
            if (contact_media[i].organization_id === organizationid) {
                org_contact_media.push(contact_media[i]);
            }
        }
        org_contact_address = [];
        found_address = thisOrgContactsExists(contact_address, "organization_id", organization[j].organization_id, "person_id");
        if (found_address !== null) {
            for (var i = 0; i < contact_address.length; i += 1) {
                if ((contact_address[i].organization_id === organizationid) && (contact_address[i].person_id === "")) {
                    org_contact_address.push(contact_address[i]);
                }
            }
        }
        updateOrgPeopleRelationships(organizationid);
        updateOrganizationRelationships(organizationid);
        updateThisOrgAssignments(organizationid)
        res.render("organization/index2",{thisorg:organization[j], organization:organization, cases:cases, person:person, org_contact_phone:org_contact_phone, org_contact_email:org_contact_email, org_contact_fax:org_contact_fax, org_contact_media:org_contact_media, org_contact_address:org_contact_address, personorg_relationship:personorg_relationship, organization_relationship:organization_relationship, my_cases:my_cases});
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Organization Not Found!</h1></body></html>'");
    }
});


// EDIT SPECIFIC ORGANIZATION
app.put("/organization/:organization_id", function(req, res){
    var organizationid = req.params.organization_id;
    var orgname = req.body.organizationname;
    var orgwebsite = req.body.organizationwebsite;
    var orgrole = req.body.organizationrole;
    var orgtype = req.body.organizationtype;
    var orgstatus = req.body.organizationrolestatus;
    var orgnote = req.body.organizationnote;
    var found = false;
    var j = -1;
    while ((found === false) && (j < organization.length - 1)) {
        j += 1;
        if (organization[j].organization_id === organizationid) {
            found = true;
        }
    }
    if (found === true) {
	    var editOrganization = {organization_id: organizationid, organization_name: orgname, organization_website: orgwebsite, lk_user_role: orgrole, lk_organization_type: orgtype,  lk_organization_status: orgstatus, note: orgnote};
        organization[j] = editOrganization;
        res.redirect("/organization/" + organizationid);
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Organization Not Found!</h1></body></html>'");
    }
});


// DELETE SPECIFIC ORGANIZATION
app.delete("/organization/:organization_id", function(req, res){
    res.redirect("/");    
//    res.send("'<html><head></head><body><h1>Delete Specific Organization</h1></body></html>'");
});



// *************  TASKS SCREEN ***************************************************

app.get("/tasks", function(req, res){
    updateTasksListing();
    overdueTasks();
    res.render("tasks/index", {taskslisting:taskslisting, person:person, cases:cases, overdue_tasks:overdue_tasks});
});

app.post("/tasks", function(req, res){
    updateTasksListing();
    overdueTasks();
    res.render("tasks/index", {taskslisting:taskslisting, person:person, cases:cases, overdue_tasks:overdue_tasks});
});


//CREATE TASK
app.post("/task", function(req, res){
    var tasksubject = req.body.tasksubject;
    var tasktype = req.body.tasktype;
    var taskpriority = req.body.taskpriority;
    var taskstartdate = req.body.taskstartdate;
    var taskduedate = req.body.taskduedate;
    var taskcompletedate = req.body.taskcompletedate;
    var taskstatus = req.body.taskstatus;
    var taskassignedperson = req.body.taskassignedperson;
    var taskcaseid = req.body.taskcaseid;
    var tasknote = req.body.tasknote;
    var j = tasks.length - 1;
    if (j >= 0) {
        var taskid = parseInt(tasks[j].task_id,10) + 1;
        taskid = taskid.toString();
    } else {
        taskid = "1";
    }       
    var newTask = {task_id: taskid, subject: tasksubject, type: tasktype, priority: taskpriority, person_id: taskassignedperson, case_id: taskcaseid, start_date: taskstartdate, due_date: taskduedate, complete_date: taskcompletedate, status: taskstatus, note: tasknote};
    tasks.push(newTask);
    res.redirect("back");
});


//EDIT TASK
app.put("/task/:task_id", function(req, res){
    var taskid = req.params.task_id;
    var tasksubject = req.body.tasksubject;
    var tasktype = req.body.tasktype;
    var taskpriority = req.body.taskpriority;
    var taskstartdate = req.body.taskstartdate;
    var taskduedate = req.body.taskduedate;
    var taskcompletedate = req.body.taskcompletedate;
    var taskstatus = req.body.taskstatus;
    var taskassignedperson = req.body.taskassignedperson;
    var taskcaseid = req.body.taskcaseid;
    var tasknote = req.body.tasknote;
    var found = false;
    var j = -1;
    while ((found === false) && (j < tasks.length - 1)) {
        j += 1;
        if (tasks[j].task_id === taskid) {
            found = true;
        }
    }
    if (found === true) {
        var editTask = {task_id: taskid, subject: tasksubject, type: tasktype, priority: taskpriority, person_id: taskassignedperson, case_id: taskcaseid, start_date: taskstartdate, due_date: taskduedate, complete_date: taskcompletedate, status: taskstatus, note: tasknote};
        tasks[j] = editTask;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Task Not Found!</h1></body></html>'");        
    }
});


function updateTasksListing() {
    var person_name = "";
    var found_person = false;
    var found_case = false;
    var j = -1;
    var listing = {};
    taskslisting = [];
    for (var i = 0; i < tasks.length; i += 1) {
        found_person = false;
        j = -1;
        while ((found_person === false) && (j < person.length - 1)) {
            j += 1;
            if (tasks[i].person_id === person[j].person_id) {
                person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                found_person = true;
            }
        }
        if (found_person === true) {
            found_case = false;
            j = -1;
            while ((found_case === false) && (j < cases.length - 1)) {
                j += 1;
                if (tasks[i].case_id === cases[j].case_id) {
                    found_case = true;
                }
            }
        }
        if ((found_person === true) && (found_case === true)) {
            listing = {task_id:tasks[i].task_id, subject:tasks[i].subject, type:tasks[i].type, priority:tasks[i].priority, person_id:tasks[i].person_id, person_name:person_name, case_id:tasks[i].case_id, case_title:cases[j].case_title, start_date:tasks[i].start_date, due_date:tasks[i].due_date, complete_date:tasks[i].complete_date, status:tasks[i].status, note:tasks[i].note};
            taskslisting.push(listing);
        }
    }
    return(taskslisting);
}




// CREATE CASE PERSON
app.post("/caseperson", function(req, res){
    var caseid = req.body.caseperson_caseid;
    var personid = req.body.caseperson_personid;
    var found_case = false;
    var i = -1;
    while ((found_case === false) && (i < cases.length - 1)) {
        i += 1;
        if (cases[i].case_id === caseid) {
            found_case = true;
        }
    }
    if (found_case === true) {
        cases[i].caseperson_id = personid;
    }
    res.redirect("back");
});



function updateThisCasePerson(caseid) {
    var caseid = caseid;
    var found_case = false;
    var found_person = false;
    var thisCasePerson = {};
    thiscaseperson = [];
    var i = -1;
    while ((found_case === false) && (i < cases.length - 1)) {
        i += 1;
        if (cases[i].case_id === caseid) {
            found_case = true;
        }
    }
    if ((found_case === true) && (cases[i].caseperson_id !== "")) {
        var j = -1;
        while ((found_person === false) && (j < person.length - 1)) {
            j += 1;
            if (cases[i].caseperson_id === person[j].person_id) {
                var personname = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                found_person = true;
            }
        }
        if (found_person === true) {
            var primary_phone = "";
            var this_phone = thisExists(contact_phone, "person_id", cases[i].caseperson_id);
            if (this_phone !== null) {     
                var primary_phone = contact_phone[this_phone].phone_number;
            }
            var primary_email = "";
            var this_email = thisExists(contact_email, "person_id", cases[i].caseperson_id);
            if (this_email !== null) {    
                primary_email = contact_email[this_email].email_address;
            }
            var primary_address = "";
            var primary_city = "";
            var primary_state = "";
            var primary_zipcode = "";
            var primary_statecode = "";
            var primary_countrycode = "";
            var this_address = thisExists(contact_address, "person_id", cases[i].caseperson_id);
            if (this_address !== null) {    
                primary_address = contact_address[this_address].address;
                primary_city = contact_address[this_address].city;
                primary_state = contact_address[this_address].lk_state;
                primary_zipcode = contact_address[this_address].zipcode;
                primary_statecode = contact_address[this_address].lk_statecode;
                primary_countrycode = contact_address[this_address].lk_countrycode;
            }
            thisCasePerson = {case_id:caseid, person_id:cases[i].caseperson_id, person_name:personname, gender:person[j].lk_gender, birthdate:person[j].birth_date, primary_phone:primary_phone, primary_email:primary_email, address:primary_address, city:primary_city, state:primary_state, zipcode:primary_zipcode, statecode:primary_statecode, countrycode:primary_countrycode};
            thiscaseperson.push(thisCasePerson);
        }
    }
    return(thiscaseperson);
}




function updateCasesPeople() {
    var caseid = "";
    var found_case = false;
    var person_id = "";
    var theseCasesPeople = {};
    thesecasespeople = [];
    for (var i = 0; i < cases.length; i += 1) {
        if (cases[i].caseperson_id !== "") {
            caseid = cases[i].case_id;
            var found_person = false;
            var personname = "";
            var persongender = "";
            var personbirthdate = "";
            var j = -1;
            while ((found_person === false) && (j < person.length - 1)) {
                j += 1;
                if (cases[i].caseperson_id === person[j].person_id) {
                    personname = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                    persongender = person[j].lk_gender;
                    personbirthdate = person[j].birth_date;
                    found_person = true;
                }
            }
            if (found_person === true) {
                theseCasesPeople = {case_id:caseid, person_id:cases[i].caseperson_id, person_name:personname, gender:persongender, birthdate:personbirthdate};
                thesecasespeople.push(theseCasesPeople);
            }
        }
    }
    return(thesecasespeople);
}





function updateThisCasesNeeds(caseid) {
    var caseid = caseid;
    var thisCasesNeed = {};
    this_cases_needs = [];
    for (var j = 0; j < cases_needs.length; j += 1) {
        if (cases_needs[j].case_id === caseid) {
            thisCasesNeed = {need_id:cases_needs[j].need_id, name:cases_needs[j].name, type:cases_needs[j].type, assessment_date:cases_needs[j].assessment_date, stage:cases_needs[j].stage, need_status:cases_needs[j].need_status, severity:cases_needs[j].severity, note:cases_needs[j].note, need_doc:cases_needs[j].need_doc};
            this_cases_needs.push(thisCasesNeed);
        }
    }
    return(this_cases_needs);
}


function updateThisCasesGoals(caseid) {
    var caseid = caseid;
    var thisCasesGoal = {};
    this_cases_goals = [];
    for (var j = 0; j < cases_goals.length; j += 1) {
        if (cases_goals[j].case_id === caseid) {
            var found_associatedneed = false;
            for (var i = 0; i < cases_needs.length; i += 1) {
                if (cases_goals[j].assocneed_id === cases_needs[i].need_id) {
                    var assocneedname = cases_needs[i].name;
                    found_associatedneed = true;
                }
            }
            if (found_associatedneed = true) {
                thisCasesGoal = {goal_id:cases_goals[j].goal_id, name:cases_goals[j].name, type:cases_goals[j].type, priority:cases_goals[j].priority, start_date:cases_goals[j].start_date, due_date:cases_goals[j].due_date, complete_date:cases_goals[j].complete_date, assocneed_id:cases_goals[j].assocneed_id, assocneed_name:assocneedname, assignedperson_id:cases_goals[j].assignedperson_id, note:cases_goals[j].note, goal_doc:cases_goals[j].goal_doc};
                this_cases_goals.push(thisCasesGoal);
            } else {
                res.send("'<html><head></head><body><h1>Eror, Associated Need Not Found!</h1></body></html>'");        
            }
        }
    }
    return(this_cases_goals);
}


function updateThisCasesPlans(caseid) {
    var caseid = caseid;
    var thisCasesPlan = {};
    this_cases_plans = [];
    for (var j = 0; j < cases_plans.length; j += 1) {
        if (cases_plans[j].case_id === caseid) {
            var found_associatedgoal = false;
            for (var i = 0; i < cases_goals.length; i += 1) {
                if (cases_plans[j].assocgoal_id === cases_goals[i].goal_id) {
                    var assocgoalname = cases_goals[i].name;
                    found_associatedgoal = true;
                }
            }
            if (found_associatedgoal = true) {
                thisCasesPlan = {plan_id:cases_plans[j].plan_id, name:cases_plans[j].name, type:cases_plans[j].type, priority:cases_plans[j].priority, start_date:cases_plans[j].start_date, due_date:cases_plans[j].due_date, complete_date:cases_plans[j].complete_date, assocgoal_id:cases_plans[j].assocgoal_id, assocgoal_name:assocgoalname, assignedperson_id:cases_plans[j].assignedperson_id, note:cases_plans[j].note, plan_doc:cases_plans[j].plan_doc};
                this_cases_plans.push(thisCasesPlan);
            } else {
                res.send("'<html><head></head><body><h1>Eror, Associated Goal Not Found!</h1></body></html>'");        
            }
        }
    }
    return(this_cases_plans);
}


function updateThisCasesActions(caseid) {
    var caseid = caseid;
    var thisCasesAction = {};
    this_cases_actions = [];
    for (var j = 0; j < cases_actions.length; j += 1) {
        if (cases_actions[j].case_id === caseid) {
            var found_associatedplan = false;
            for (var i = 0; i < cases_plans.length; i += 1) {
                if (cases_actions[j].assocplan_id === cases_plans[i].plan_id) {
                    var assocplanname = cases_plans[i].name;
                    found_associatedplan = true;
                }
            }
            if (found_associatedplan = true) {
                thisCasesAction = {action_id:cases_actions[j].action_id, name:cases_actions[j].name, type:cases_actions[j].type, priority:cases_actions[j].priority, start_date:cases_actions[j].start_date, due_date:cases_actions[j].due_date, complete_date:cases_actions[j].complete_date, assocplan_id:cases_actions[j].assocplan_id, assocplan_name:assocplanname, assignedperson_id:cases_actions[j].assignedperson_id, note:cases_actions[j].note, action_doc:cases_actions[j].action_doc};
                this_cases_actions.push(thisCasesAction);
            } else {
                res.send("'<html><head></head><body><h1>Eror, Associated Plan Not Found!</h1></body></html>'");        
            }
         }
    }
    return(this_cases_actions);
}


function updateThisCasesFiles(caseid) {
    var caseid = caseid;
    var thisCasesFile = {};
    this_cases_files = [];
    for (var j = 0; j < cases_casefiles.length; j += 1) {
        if (cases_casefiles[j].case_id === caseid) {
            thisCasesFile = {casefile_id: cases_casefiles[j].casefile_id, case_id: cases_casefiles[j].case_id, name:cases_casefiles[j].name, domain:cases_casefiles[j].domain, actiontype:cases_casefiles[j].actiontype, type:cases_casefiles[j].type, filedate:cases_casefiles[j].filedate, fileperson_id:cases_casefiles[j].fileperson_id, fileorg_id:cases_casefiles[j].fileorg_id, note:cases_casefiles[j].note, file_doc:cases_casefiles[j].file_doc};
            this_cases_files.push(thisCasesFile);
        }
    }
    return(this_cases_files);
}

function updateThisCasesNotes(caseid) {
    var caseid = caseid;
    var thisCasesNote = {};
    this_cases_notes = [];
    for (var j = 0; j < cases_casenotes.length; j += 1) {
        if (cases_casenotes[j].case_id === caseid) {
            thisCasesNote = {casenote_id: cases_casenotes[j].casenote_id, case_id: cases_casenotes[j].case_id, name:cases_casenotes[j].name, domain:cases_casenotes[j].domain, actiontype:cases_casenotes[j].actiontype, type:cases_casenotes[j].type, notedate:cases_casenotes[j].notedate, noteperson_id:cases_casenotes[j].noteperson_id, noteorg_id:cases_casenotes[j].noteorg_id, notetext:cases_casenotes[j].notetext};
            this_cases_notes.push(thisCasesNote);
        }
    }
    return(this_cases_files);
}




function updateTasksCaseListing(caseid) {
    var caseid = caseid;
    var found_case = false;
    var person_name = "";
    var found_person = false;
    var j = -1;
    var caselisting = {};
    taskscaselisting = [];
    for (var i = 0; i < tasks.length; i += 1) {
        found_case = false;
        j = -1;
        while ((found_case === false) && (j < cases.length - 1)) {
            j += 1;
            if ((tasks[i].case_id === caseid) && (cases[j].case_id === caseid)) {
                found_case = true;
            }
        }
        if (found_case === true) {
            found_person = false;
            j = -1;
            while ((found_person === false) && (j < person.length - 1)) {
                j += 1;
                if (tasks[i].person_id === person[j].person_id) {
                    person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                    found_person = true;
                }
            }
            if ((found_person === true) && (found_case === true)) {
                caselisting = {task_id:tasks[i].task_id, subject:tasks[i].subject, type:tasks[i].type, priority:tasks[i].priority, person_id:tasks[i].person_id, person_name:person_name, case_id:tasks[i].case_id, start_date:tasks[i].start_date, due_date:tasks[i].due_date, complete_date:tasks[i].complete_date, status:tasks[i].status, note:tasks[i].note};
                taskscaselisting.push(caselisting);
            }
        }
    }
    return(taskscaselisting);
}






//  ******************  RELATED CASES  *******************************


app.post("/relatedcase", function(req, res){
    var caseid1 = req.body.relatedcase_id1;
    var caseid2 = req.body.relatedcase_id2;
    if (caseid1 !== caseid2) {
        var relationexists = thisPairingExists(case_case_relationship, "case_id1", caseid1, "case_id2", caseid2);
        if (relationexists === null) {
            var relationshiptype = req.body.caserelationshiptype;
            var j = case_case_relationship.length - 1;
            if (j >= 0) {
                var caserelationshipid = (parseInt(case_case_relationship[j].case_relationship_id,10) + 1);
                caserelationshipid = caserelationshipid.toString();
            } else {
                caserelationshipid = "1";
            }
            var newRelatedCase = {case_relationship_id: caserelationshipid, lk_case_relationship_type: relationshiptype, case_id1: caseid1, case_id2: caseid2};
            case_case_relationship.push(newRelatedCase);
            res.redirect("back");
        } else {
            res.send("'<html><head></head><body><h1>Error: These cases are already related.</h1></body></html>'");                   
        }
     } else {
        res.send("'<html><head></head><body><h1>Error: A case may not be related to itself.</h1></body></html>'");        
    }
});



// ***********************  CASE ASSIGNMENTS  **************************************************

// CREATE PERSON CASE ASSIGNMENT

app.post("/personassignment", function(req, res){
    var caseid = req.body.personassign_caseid;
    var personid = req.body.personassignpersonid;
    var assignedrole = req.body.personassignrole;
    var assignmenttype = req.body.personassigntype;
    var has_assignment = thisAssignmentExists(case_assignment, "case_id", caseid, "person_id", personid, "lk_assigned_role", assignedrole, "lk_case_assignment_type", assignmenttype);
    if (has_assignment === null) {
        var start_date = new Date();
        var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
        var endreason = "";
        var enddate = "";
        var orgid = "";
        var j = case_assignment.length - 1;
        if (j >= 0) {
            var caseassignmentid = parseInt(case_assignment[j].case_assignment_id,10) + 1;
            caseassignmentid = caseassignmentid.toString();
        } else {
            caseassignmentid = "1";
        }
        var newCaseAssignment = {case_assignment_id:caseassignmentid, case_id:caseid, person_id:personid, organization_id:orgid, lk_assigned_role:assignedrole, lk_case_assignment_type:assignmenttype, start_date:startdate, end_reason:endreason, end_date:enddate};
        case_assignment.push(newCaseAssignment);
        res.redirect("/case/" + caseid);
    } else {
        res.send("'<html><head></head><body><h1>Error: Person assignment already exists!</h1></body></html>'");        
    }
});


// EDIT PERSON ASSIGNMENT

app.put("/personassignment/:case_assignment_id", function(req, res){
    var caseassignmentid = req.params.case_assignment_id;
    var caseid = req.body.personassign_caseid;
    var personid = req.body.personassignpersonid;
    var assignedrole = req.body.personassignrole;
    var assignmenttype = req.body.personassigntype;
    var orgid = "";
    var endreason = req.body.personassignmentendreason;
    var end_date = new Date();
    var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
    var found = false;
    var j = -1;
    while ((found === false) && (j < case_assignment.length - 1)) {
        j += 1;
        if (case_assignment[j].case_assignment_id === caseassignmentid) {
            found = true;
        }
    }
    if (found === true) {
        var startdate = case_assignment[j].start_date;
        var editCaseAssignment = {case_assignment_id:caseassignmentid, case_id:caseid, person_id:personid, organization_id:orgid, lk_assigned_role:assignedrole, lk_case_assignment_type:assignmenttype, start_date:startdate, end_reason:endreason, end_date:enddate};
        case_assignment[j] = editCaseAssignment;
        res.redirect("/case/" + caseid);
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Person Assignment Not Found!</h1></body></html>'");
    }
});


// CREATE ORGANIZATION CASE ASSIGNMENT

app.post("/organizationassignment", function(req, res){
    var caseid = req.body.organizationassign_caseid;
    var organizationid = req.body.organizationassignorgid;
    var assignedrole = req.body.organizationassignrole;
    var assignmenttype = req.body.organizationassigntype;
    var has_assignment = thisAssignmentExists(case_assignment, "case_id", caseid, "organization_id", organizationid, "lk_assigned_role", assignedrole, "lk_case_assignment_type", assignmenttype);
    if (has_assignment === null) {
        var start_date = new Date();
        var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
        var endreason = "";
        var enddate = "";
        var personid = "";
        var j = case_assignment.length - 1;
        if (j >= 0) {
            var caseassignmentid = parseInt(case_assignment[j].case_assignment_id,10) + 1;
            caseassignmentid = caseassignmentid.toString();
        } else {
            caseassignmentid = "1";
        }
        var newCaseAssignment = {case_assignment_id:caseassignmentid, case_id:caseid, person_id:personid, organization_id:organizationid, lk_assigned_role:assignedrole, lk_case_assignment_type:assignmenttype, start_date:startdate, end_reason:endreason, end_date:enddate};
        case_assignment.push(newCaseAssignment);
        res.redirect("/case/" + caseid);
    } else {
        res.send("'<html><head></head><body><h1>Error: Organization assignment already exists!</h1></body></html>'");
    }
});


// EDIT ORGANIZATION ASSIGNMENT

app.put("/organizationassignment/:case_assignment_id", function(req, res){
    var caseassignmentid = req.params.case_assignment_id;
    var caseid = req.body.organizationassign_caseid;
    var organizationid = req.body.organizationassignorgid;
    var assignedrole = req.body.organizationassignrole;
    var assignmenttype = req.body.organizationassigntype;
    var personid = "";
    var endreason = req.body.organizationassignmentendreason;
    var end_date = new Date();
    var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
    var found = false;
    var j = -1;
    while ((found === false) && (j < case_assignment.length - 1)) {
        j += 1;
        if (case_assignment[j].case_assignment_id === caseassignmentid) {
            found = true;
        }
    }
    if (found === true) {
        var startdate = case_assignment[j].start_date;
        var editCaseAssignment = {case_assignment_id:caseassignmentid, case_id:caseid, person_id:personid, organization_id:organizationid, lk_assigned_role:assignedrole, lk_case_assignment_type:assignmenttype, start_date:startdate, end_reason:endreason, end_date:enddate};
        case_assignment[j] = editCaseAssignment;
        res.redirect("/case/" + caseid);
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Organization Assignment Not Found!</h1></body></html>'");
    }
});





function thisExists(this_array, this_name, this_value) {
    for (var i = 0; i < this_array.length; i += 1) {
        if (this_array[i][this_name] === this_value) {
            return i;
        }
    }
    return null;
}



function updateRelatedCases(caseid) {
    var thiscaseid = caseid;
    var case_title = "";
    var found_case = "";
    var relatedCase = {};
    thisrelatedcase = [];
    var has_relationship = thisExists(case_case_relationship, "case_id1", thiscaseid);
    if (has_relationship === null) {
        has_relationship = thisExists(case_case_relationship, "case_id2", thiscaseid);
    }
    if (has_relationship !== null) {
        for (i = 0; i < case_case_relationship.length; i += 1) {
            found_case = false;
            case_title = "";
            j = -1;
            if (case_case_relationship[i].case_id1 === thiscaseid) {
                while ((found_case === false) && (j < cases.length - 1)) {
                    j += 1;
                    if (case_case_relationship[i].case_id2 === cases[j].case_id) {
                        found_case = true;
                    }
                }
            } else {
                if (case_case_relationship[i].case_id2 === thiscaseid) {
                    while ((found_case === false) && (j < cases.length - 1)) {
                        j += 1;
                        if (case_case_relationship[i].case_id1 === cases[j].case_id) {
                            found_case = true;
                        }
                    }
                }
            }
            if (found_case === true) {
                relatedCase = {thisrelatedcase_id:case_case_relationship[i].case_relationship_id, case_id1:thiscaseid, case_id2:cases[j].case_id, case_title:cases[j].case_title, lk_case_relationship_type:case_case_relationship[i].lk_case_relationship_type};
                thisrelatedcase.push(relatedCase);
            }
        }
    }
    return(thisrelatedcase);
}


function updateThisPersonImage(person_id) {
    var personid = person_id;
    var found_image = false;
    var personimage = "";
}


function updateThisPersonAssignments(person_id) {
    var personid = person_id;
    var j = -1;
    var found_case = false;
    var thisPersonAssignment = {};
    my_cases = [];
    for (var i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].person_id === personid) {
            found_case = false;
            j = -1;
            while ((found_case === false) && (j < cases.length - 1)) {
                j += 1;
                if (case_assignment[i].case_id === cases[j].case_id) {
                    found_case = true;
                }
            }
            if (found_case === true) {
                thisPersonAssignment = {case_id:cases[j].case_id, title:cases[j].case_title, duedate:cases[j].due_date, priority:cases[j].lk_case_priority, role:case_assignment[i].lk_assigned_role, startdate:case_assignment[i].start_date, enddate:case_assignment[i].end_date};
                my_cases.push(thisPersonAssignment);
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Case Not Found For Person Assignment!</h1></body></html>'");
            }
        }
    }
    return(my_cases);
}




function updateCasesPersonAssignments() {
    var caseid = "";
    var person_name = "";
    var person_status = "1";
    var i = 0;
    var j = -1;
    var found_person = false;
    var casesPersonAssignment = {};
    cases_person_assignment = [];
    for (i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].person_id !== "") {
            found_person = false;
            j = -1;
            while ((found_person === false) && (j < person.length - 1)) {
                j += 1;
                if (case_assignment[i].person_id === person[j].person_id) {
                    person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                    person_status = person[j].lk_person_status;
                    found_person = true;
                }
            }
            if (found_person === true) {
                casesPersonAssignment = {cases_person_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, person_id:case_assignment[i].person_id, person_name:person_name, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:person_status, start_date:case_assignment[i].start_date, end_date:case_assignment[i].end_date};
                cases_person_assignment.push(casesPersonAssignment);
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Person Not Found From Person Assignment!</h1></body></html>'");
            }
        }
    }
    return(cases_person_assignment);
}


function updateCasesOrgAssignments() {
    var caseid = "";
    var organization_name = "";
    var organization_status = "1";
    var i = 0;
    var j = -1;
    var found_organization = false;
    var casesOrgAssignment = {};
    cases_org_assignment = [];
    for (i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].organization_id !== "") {
            found_organization = false;
            j = -1;
            while ((found_organization === false) && (j < organization.length - 1)) {
                j += 1;
                if (case_assignment[i].organization_id === organization[j].organization_id) {
                    organization_name = organization[j].organization_name;
                    organization_status = organization[j].lk_organization_status;
                    found_organization = true;
                }
            }
            if (found_organization === true) {
                casesOrgAssignment = {cases_org_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, organization_id:case_assignment[i].organization_id, organization_name:organization_name, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:organization_status, start_date:case_assignment[i].start_date, end_date:case_assignment[i].end_date};
                cases_org_assignment.push(casesOrgAssignment);
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Organization Not Found From Person Assignment!</h1></body></html>'");
            }
        }
    }
    return(cases_org_assignment);
}


function updateThisOrgAssignments(organization_id) {
    var organizationid = organization_id;
    var j = -1;
    var found_case = false;
    var thisOrgAssignment = {};
    my_cases = [];
    for (var i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].organization_id === organizationid) {
            found_case = false;
            j = -1;
            while ((found_case === false) && (j < cases.length - 1)) {
                j += 1;
                if (case_assignment[i].case_id === cases[j].case_id) {
                    found_case = true;
                }
            }
            if (found_case === true) {
                thisOrgAssignment = {case_id:cases[j].case_id, title:cases[j].case_title, duedate:cases[j].due_date, priority:cases[j].lk_case_priority, role:case_assignment[i].lk_assigned_role, startdate:case_assignment[i].start_date, enddate:case_assignment[i].end_date};
                my_cases.push(thisOrgAssignment);
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Case Not Found For Organization Assignment!</h1></body></html>'");
            }
        }
    }
    return(my_cases);
}






function overdueCases() {
    var overduedate = new Date();
    var overdueCase = {};
    overdue_cases = [];
    for (var i = 0; i < cases.length; i += 1) {
        if (cases[i].due_date !== "") {
            var duedate = new Date(cases[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases[i].complete_date === "") && (overduedate > duedate)) {
                overdueCase = cases[i];
                overdue_cases.push(overdueCase);
            }
        }
    }
}


function overdueGoals() {
    var overduedate = new Date();
    var overdueGoal = {};
    overdue_goals = [];
    for (var i = 0; i < cases_goals.length; i += 1) {
        if (cases_goals[i].due_date !== "") {
            var duedate = new Date(cases_goals[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases_goals[i].complete_date === "") && (overduedate > duedate)) {
                overdueGoal = cases_goals[i];
                overdue_goals.push(overdueGoal);
            }
        }
    }
}


function overduePlans() {
    var overduedate = new Date();
    var overduePlan = {};
    overdue_plans = [];
    for (var i = 0; i < cases_plans.length; i += 1) {
        if (cases_plans[i].due_date !== "") {
            var duedate = new Date(cases_plans[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases_plans[i].complete_date === "") && (overduedate > duedate)) {
                overduePlan = cases_plans[i];
                overdue_plans.push(overduePlan);
            }
        }
    }
}


function overdueActions() {
    var overduedate = new Date();
    var overdueAction = {};
    overdue_actions = [];
    for (var i = 0; i < cases_actions.length; i += 1) {
        if (cases_actions[i].due_date !== "") {
            var duedate = new Date(cases_actions[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases_actions[i].complete_date === "") && (overduedate > duedate)) {
                overdueAction = cases_actions[i];
                overdue_actions.push(overdueAction);
            }
        }
    }
}



function overdueTasks() {
    var overduedate = new Date();
    var overdueTask = {};
    overdue_tasks = [];
    for (var i = 0; i < tasks.length; i += 1) {
        if (tasks[i].due_date !== "") {
            var duedate = new Date(tasks[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if (((tasks[i].complete_date === "") && (overduedate > duedate)) || (tasks[i].status === "5")) {
                overdueTask = tasks[i];
                overdue_tasks.push(overdueTask);
            }
        }
    }
}





function updatePersonAssignments(caseid) {
    var case_id = caseid;
    var person_name = "";
    var person_status = "1";
    var primary_phone = "";
    var primary_email = "";
    var i = 0;
    var j = -1;
    var found_person = false;
    var this_phone = "";
    var this_email = "";
    var personAssignment = {};
    person_assignment = [];
    for (i = 0; i < case_assignment.length; i += 1) {
        if ((case_assignment[i].case_id === case_id) && (case_assignment[i].person_id !== "")) {
            found_person = false;
            j = -1;
            while ((found_person === false) && (j < person.length - 1)) {
                j += 1;
                if (case_assignment[i].person_id === person[j].person_id) {
                    person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                    person_status = person[j].lk_person_status;
                    found_person = true;
                }
            }
            if (found_person === true) {
                primary_phone = "";
                this_phone = thisExists(contact_phone, "person_id", case_assignment[i].person_id);
                if (this_phone !== null) {       
                    primary_phone = contact_phone[this_phone].phone_number;
                }
                primary_email = "";
                this_email = thisExists(contact_email, "person_id", case_assignment[i].person_id);
                if (this_email !== null) {       
                    primary_email = contact_email[this_email].email_address;
                }
                personAssignment = {case_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, person_id:case_assignment[i].person_id, person_name:person_name, primary_phone:primary_phone, primary_email:primary_email, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:person_status, start_date:case_assignment[i].start_date, end_reason:case_assignment[i].end_reason, end_date:case_assignment[i].end_date};
                person_assignment.push(personAssignment);
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Person Not Found From Person Assignment!</h1></body></html>'");
            }
        }
    }
    return(person_assignment);
}



function thisAssignmentExists(this_array, this_caseid, this_case_value, this_assignee, this_assignee_value, this_role, this_role_value, this_type, this_type_value) {
    for (var i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_caseid] === this_case_value) && (this_array[i][this_assignee] === this_assignee_value) && (this_array[i][this_role] === this_role_value) && (this_array[i][this_type] === this_type_value)) {
            return i;
        }
    }
    return null;
}



function thisOrgExists(this_array, this_name, this_value, notthis_name) {
    for (var i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_name] === this_value) && (this_array[i][notthis_name] === "")) {
            return i;
        }
    }
    return null;
}


function updateOrganizationAssignments(caseid) {
    var case_id = caseid;
    var organization_name = "";
    var organization_status = "1";
    var primary_phone = "";
    var primary_email = "";
    var i = 0;
    var j = -1;
    var found_organization = false;
    var this_phone = "";
    var this_email = "";
    var organizationAssignment = {};
    organization_assignment = [];
    for (i = 0; i < case_assignment.length; i += 1) {
        if ((case_assignment[i].case_id === case_id) && (case_assignment[i].organization_id !== "")) {
            found_organization = false;
            j = -1;
            while ((found_organization === false) && (j < organization.length - 1)) {
                j += 1;
                if (case_assignment[i].organization_id === organization[j].organization_id) {
                    organization_name = organization[j].organization_name;
                    organization_status = organization[j].lk_organization_status;
                    found_organization = true;
                }
            }
            if (found_organization === true) {
                primary_phone = "";
                this_phone = thisOrgExists(contact_phone, "organization_id", case_assignment[i].organization_id, "person_id");
                if (this_phone !== null) {       
                    primary_phone = contact_phone[this_phone].phone_number;
                }
                primary_email = "";
                this_email = thisOrgExists(contact_email, "organization_id", case_assignment[i].organization_id, "person_id");
                if (this_email !== null) {       
                    primary_email = contact_email[this_email].email_address;
                }
                organizationAssignment = {case_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, organization_id:case_assignment[i].organization_id, organization_name:organization_name, primary_phone:primary_phone, primary_email:primary_email, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:organization_status, start_date:case_assignment[i].start_date, end_reason:case_assignment[i].end_reason, end_date:case_assignment[i].end_date};
                organization_assignment.push(organizationAssignment);
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Organization Not Found From Organization Assignment!</h1></body></html>'");
            }
        }
    }
    return(organization_assignment);
}









// CREATE PERSON IDENTIFICATION

app.post("/personidentification", function(req, res){
    var personid = req.body.identificationpersonid;
    var issuedbyorg = req.body.identificationorg;
    var identificationnumber = req.body.identificationnumber;
    var has_identification = thisGroupingExists(identification, "person_id", personid, "issuedby_org", issuedbyorg, "identification_number", identificationnumber);
    if (has_identification === null) {    
        var identificationtype = req.body.identificationtype;
        var issueddate = req.body.issueddate;
        var expirationdate = req.body.expirationdate;
        var identificationstatus = req.body.identificationstatus;
        var identificationnote = req.body.identificationnote;    
        var j = identification.length - 1;
        if (j >= 0) {
            var identificationid = parseInt(identification[j].identification_id,10) + 1;
            identificationid = identificationid.toString();
        } else {
            identificationid = "1";
        }       
        var newPersonIdentification = {identification_id: identificationid, person_id: personid, lk_identification_type: identificationtype, identification_number: identificationnumber, issuedby_org : issuedbyorg, issued_date: issueddate, expiration_date: expirationdate, identification_status: identificationstatus, note: identificationnote};
        identification.push(newPersonIdentification);
        res.redirect("/person/" + personid);
    } else {
        res.send("'<html><head></head><body><h1>Person Identification Already Exists!</h1></body></html>'");
    }
});


// EDIT PERSON IDENTIFICATION

app.put("/personidentification/:identification_id", function(req, res){
    var identificationid = req.params.identification_id;
    var personid = req.body.identificationpersonid;
    var identificationnumber = req.body.identificationnumber;
    var identificationtype = req.body.identificationtype;
    var issuedbyorg = req.body.identificationorg;
    var issueddate = req.body.issueddate;
    var expirationdate = req.body.expirationdate;
    var identificationstatus = req.body.identificationstatus;
    var identificationnote = req.body.identificationnote;    
    var found = false;
    var i = -1;
    while ((found === false) && (i < identification.length - 1)) {
        i += 1;
        if (identification[i].identification_id === identificationid) {
            found = true;
        }
    }
    if (found === true) {
        var editPersonIdentification = {identification_id: identificationid, person_id: personid, lk_identification_type: identificationtype, identification_number: identificationnumber, issuedby_org : issuedbyorg, issued_date: issueddate, expiration_date: expirationdate, identification_status: identificationstatus, note: identificationnote};
        identification[i] = editPersonIdentification;
        res.redirect("/person/" + personid);
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Person Identification Not Found!</h1></body></html>'");
    }
});











function thisOrgContactsExists(this_array, this_name, this_value, notthis_name) {
    for (var i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_name] === this_value) && (this_array[i][notthis_name] === "")) {
            return i;
        } else {
            return null;
        }
    }
}





// ***********************  RELATIONSHIPS  **************************************************


// CREATE PERSON PERSON RELATIONSHIP

app.post("/personrelationship", function(req, res){
    var personid1 = req.body.personrelonepersonid;
    var personid2 = req.body.personreltwopersonid;
    var contacttype = req.body.personcontacttype;
    if (personid1 !== personid2) {
        var relationexists = thisGroupingExists(person_person_relationship, "person_id1", personid1, "person_id2", personid2, "lk_contact_type", contacttype);
        if (relationexists === null) {       
            var relationshiptype = req.body.personrelationshiptype;
            var start_date = new Date();
            var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
            var endreason = "";
            var enddate = "";
            var j = person_person_relationship.length - 1;
            if (j >= 0) {
                var personrelationshipid = parseInt(person_person_relationship[j].person_relationship_id,10) + 1;
                personrelationshipid = personrelationshipid.toString();
            } else {
                personrelationshipid = "1";
            }           
            var newPersonRelationship = {person_relationship_id:personrelationshipid, person_id1:personid1, person_id2:personid2, lk_contact_type:contacttype, lk_person_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
            person_person_relationship.push(newPersonRelationship);
            res.redirect("back");
        } else {
            res.send("'<html><head></head><body><h1>Error: These people already this relationship contact type.</h1></body></html>'");           
        }
    } else {
        res.send("'<html><head></head><body><h1>Error: Same person.</h1></body></html>'");        
    }
});


// EDIT PERSON PERSON RELATIONSHIP

app.put("/personrelationship/:person_relationship_id", function(req, res){
    var personrelationshipid = req.params.person_relationship_id;
    var personid1 = req.body.personrelonepersonid;
    var personid2 = req.body.personreltwopersonid;
    var contacttype = req.body.personcontacttype;
    var relationshiptype = req.body.personrelationshiptype;
    var endreason = req.body.personrelationshipendreason;
    var end_date = new Date();
    var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
    var found = false;
    var j = -1;
    while ((found === false) && (j < person_person_relationship.length - 1)) {
        j += 1;
        if (person_person_relationship[j].person_relationship_id === personrelationshipid) {
            found = true;
        }
    }
    if (found === true) {
        var startdate = person_person_relationship[j].start_date;
        var editPersonRelationship = {person_relationship_id:personrelationshipid, person_id1:personid1, person_id2:personid2, lk_contact_type:contacttype, lk_person_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
        person_person_relationship[j] = editPersonRelationship;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Person Person Relationship Not Found!</h1></body></html>'");
    }
});



//Person Person Relationship
function updatePersonRelationships(personid) {
    var thispersonid = personid;
    var otherpersonid = "";
    var person_name = "";
    var person_status = "1";
    var person_contact_phone = "";
    var person_contact_email = "";
    var i = 0;
    var j = -1;
    var found_person = false;
    var has_person = -1;
    var found_phone = false;
    var has_phone = -1;
    var found_email = false;
    var has_email = -1;
    var personRelationship = {};
    person_relationship = [];
    var has_relationship = thisExists(person_person_relationship, "person_id1", thispersonid);
    if (has_relationship === null) {
        has_relationship = thisExists(person_person_relationship, "person_id2", thispersonid);
    }
    if (has_relationship !== null) {
        for (i = 0; i < person_person_relationship.length; i += 1) {
            found_person = false;
            person_name = "";
            person_status = "1";
            j = -1;
            if (person_person_relationship[i].person_id1 === thispersonid) {
                while ((found_person === false) && (j < person.length - 1)) {
                    j += 1;
                    if (person_person_relationship[i].person_id2 === person[j].person_id) {
                        found_person = true;
                    }
                }
            } else {
                if (person_person_relationship[i].person_id2 === thispersonid) {
                    while ((found_person === false) && (j < person.length - 1)) {
                        j += 1;
                        if (person_person_relationship[i].person_id1 === person[j].person_id) {
                            found_person = true;
                        }
                    }
                }
            }
            if (found_person === true) {
                otherpersonid = person[j].person_id;
                person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                person_status = person[j].lk_person_status;
                found_phone = false;
                person_contact_phone = "";
                has_phone = thisExists(contact_phone, "person_id", otherpersonid);
                if (has_phone !== null) {       
                    j = -1;
                    while ((found_phone === false) && (j < contact_phone.length - 1)) {
                        j += 1;
                        if (otherpersonid === contact_phone[j].person_id) {        
                            person_contact_phone = contact_phone[j].phone_number;
                            found_phone = true;
                        }
                    }
                }
                found_email = false;
                person_contact_email = "";
                has_email = thisExists(contact_email, "person_id", otherpersonid);
                if (has_email !== null) {       
                    j = -1;
                    while ((found_email === false) && (j < contact_email.length - 1)) {
                        j += 1;
                        if (otherpersonid === contact_email[j].person_id) {
                            person_contact_email = contact_email[j].email_address;
                            found_email = true;
                        }
                    }
                }
                personRelationship = {person_relationship_id:person_person_relationship[i].person_relationship_id, person_id1:thispersonid, person_id2:otherpersonid, person_name:person_name, primary_phone:person_contact_phone, primary_email:person_contact_email, lk_contact_type:person_person_relationship[i].lk_contact_type, lk_person_relationship_type:person_person_relationship[i].lk_person_relationship_type, lk_status:person_status, start_date:person_person_relationship[i].start_date, end_reason:person_person_relationship[i].end_reason, end_date:person_person_relationship[i].end_date};
                person_relationship.push(personRelationship);
            }
        }
        return(person_relationship);
    }
}







// CREATE PERSON ORGANIZATION RELATIONSHIP

app.post("/personorgrelationship", function(req, res){
    var personid = req.body.personorgpersonid;
    var organizationid = req.body.personorgorganizationid;
    var contacttype = req.body.personorgcontacttype;
//    var relationshipexists = thisPairingExists(person_organization_relationship, "person_id", personid, "organization_id", organizationid);
    var relationshipexists = thisGroupingExists(person_organization_relationship, "person_id", personid, "organization_id", organizationid, "lk_contact_type", contacttype);
    if (relationshipexists === null) {
        var relationshiptype = req.body.personorgrelationshiptype;
        var start_date = new Date();
        var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
        var endreason = "";
        var enddate = "";
        var j = person_organization_relationship.length - 1;
        if (j >= 0) {
            var personorganizationid = parseInt(person_organization_relationship[j].person_organization_id,10) + 1;
            personorganizationid = personorganizationid.toString();
        } else {
            personorganizationid = "1";
        }
        var newPersonOrgRelationship = {person_organization_id:personorganizationid, person_id:personid, organization_id:organizationid, lk_contact_type:contacttype, lk_person_organization_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
        person_organization_relationship.push(newPersonOrgRelationship);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Error. This person organization relationship contact type already exists!</h1></body></html>'");
    }
});


// EDIT PERSON ORGANIZATION RELATIONSHIP

app.put("/personorgrelationship/:person_organization_id", function(req, res){
    var personorganizationid = req.params.person_organization_id;
    var personid = req.body.personorgpersonid;
    var organizationid = req.body.personorgorganizationid;
    var contacttype = req.body.personorgcontacttype;
    var relationshiptype = req.body.personorgrelationshiptype;
    var endreason = req.body.personorgrelationshipendreason;
    var end_date = new Date();
    var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
    var found = false;
    var j = -1;
    while ((found === false) && (j < person_organization_relationship.length - 1)) {
        j += 1;
        if (person_organization_relationship[j].person_organization_id === personorganizationid) {
            found = true;
        }
    }
    if (found === true) {
        var startdate = person_organization_relationship[j].start_date;
        var editPersonOrgRelationship = {person_organization_id:personorganizationid, person_id:personid, organization_id:organizationid, lk_contact_type:contacttype, lk_person_organization_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
        person_organization_relationship[j] = editPersonOrgRelationship;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Person Organization Relationship Not Found!</h1></body></html>'");
    }
});



//Person Organization Relationship for PERSON
function updatePersonOrgRelationships(personid) {
    var person_id = personid;
    var organization_name = "";
    var organization_status = "1";
    var org_contact_phone = "";
    var org_contact_email = "";
    var i = 0;
    var j = -1;
    var found_org = false;
    var has_org = -1;
    var found_phone = false;
    var has_phone = -1;
    var found_email = false;
    var has_email = -1;
    var personOrgRelationship = {};
    personorg_relationship = [];
    var has_relationship = thisExists(person_organization_relationship, "person_id", person_id);
    if (has_relationship !== null) {
        for (i = 0; i < person_organization_relationship.length; i += 1) {
            if (person_organization_relationship[i].person_id === person_id) { 
                found_org = false;
                organization_name = ""; 
                has_org = thisExists(person_organization_relationship, "organization_id", person_organization_relationship[i].organization_id);
                if (has_org !== null) {       
                    j = -1;
                    while ((found_org === false) && (j < organization.length - 1)) {
                        j += 1;
                        if (person_organization_relationship[i].organization_id === organization[j].organization_id) {
                            organization_name = organization[j].organization_name;
                            organization_status = organization[j].lk_organization_status;
                            found_org = true;
                        }
                    }
                    if (found_org === true) {
                        found_phone = false;
                        org_contact_phone = "";
                        has_phone = thisExists(contact_phone, "organization_id", person_organization_relationship[i].organization_id);
                        if (has_phone !== null) {       
                            j = -1;
                            while ((found_phone === false) && (j < contact_phone.length - 1)) {
                                j += 1;
                                if (person_organization_relationship[i].organization_id === contact_phone[j].organization_id) {        
                                    org_contact_phone = contact_phone[j].phone_number;
                                    found_phone = true;
                                }
                            }
                        }
                        found_email = false;
                        org_contact_email = "";
                        has_email = thisExists(contact_email, "organization_id", person_organization_relationship[i].organization_id);
                        if (has_email !== null) {       
                            j = -1;
                            while ((found_email === false) && (j < contact_email.length - 1)) {
                                j += 1;
                                if (person_organization_relationship[i].organization_id === contact_email[j].organization_id) {
                                    org_contact_email = contact_email[j].email_address;
                                    found_email = true;
                                }
                            }
                        }
                        personOrgRelationship = {person_organization_id:person_organization_relationship[i].person_organization_id, person_id:person_organization_relationship[i].person_id, organization_id:person_organization_relationship[i].organization_id, organization_name:organization_name, primary_phone:org_contact_phone, primary_email:org_contact_email, lk_contact_type:person_organization_relationship[i].lk_contact_type, lk_person_organization_relationship_type:person_organization_relationship[i].lk_person_organization_relationship_type, lk_status:organization_status, start_date:person_organization_relationship[i].start_date, end_reason:person_organization_relationship[i].end_reason, end_date:person_organization_relationship[i].end_date};
                        personorg_relationship.push(personOrgRelationship);
                    }
                } else {
                    res.send("'<html><head></head><body><h1>Sorry, Organization Not Found For Person Org Relationship!</h1></body></html>'");
                }
            }
        }
        return(personorg_relationship);
    }
}


//Person Organization Relationship for ORGANIZATION
function updateOrgPeopleRelationships(organizationid) {
    var organization_id = organizationid;
    var person_name = "";
    var person_status = "1";
    var person_contact_phone = "";
    var person_contact_email = "";
    var i = 0;
    var j = -1;
    var found_person = false;
    var has_person = -1;
    var found_phone = false;
    var has_phone = -1;
    var found_email = false;
    var has_email = -1;
    var orgPersonRelationship = {};
    personorg_relationship = [];
    var has_relationship = thisExists(person_organization_relationship, "organization_id", organization_id);
    if (has_relationship !== null) {
        for (i = 0; i < person_organization_relationship.length; i += 1) {
            if (person_organization_relationship[i].organization_id === organization_id) {
                found_person = false;
                person_name = ""; 
                has_person = thisExists(person_organization_relationship, "person_id", person_organization_relationship[i].person_id);
                if (has_person !== null) {       
                    j = -1;
                    while ((found_person === false) && (j < person.length - 1)) {
                        j += 1;
                        if (person_organization_relationship[i].person_id === person[j].person_id) {
                            person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                            person_status = person[j].lk_person_status;
                            found_person = true;
                        }
                    }
                    if (found_person === true) {
                        found_phone = false;
                        person_contact_phone = "";
                        has_phone = thisExists(contact_phone, "person_id", person_organization_relationship[i].person_id);
                        if (has_phone !== null) {       
                            j = -1;
                            while ((found_phone === false) && (j < contact_phone.length - 1)) {
                                j += 1;
                                if (person_organization_relationship[i].person_id === contact_phone[j].person_id) {        
                                    person_contact_phone = contact_phone[j].phone_number;
                                    found_phone = true;
                                }
                            }
                        }
                        found_email = false;
                        person_contact_email = "";
                        has_email = thisExists(contact_email, "person_id", person_organization_relationship[i].person_id);
                        if (has_email !== null) {       
                            j = -1;
                            while ((found_email === false) && (j < contact_email.length - 1)) {
                                j += 1;
                                if (person_organization_relationship[i].person_id === contact_email[j].person_id) {
                                    person_contact_email = contact_email[j].email_address;
                                    found_email = true;
                                }
                            }
                        }
                        orgPersonRelationship = {person_organization_id:person_organization_relationship[i].person_organization_id, person_id:person_organization_relationship[i].person_id, organization_id:person_organization_relationship[i].organization_id, person_name:person_name, primary_phone:person_contact_phone, primary_email:person_contact_email, lk_contact_type:person_organization_relationship[i].lk_contact_type, lk_person_organization_relationship_type:person_organization_relationship[i].lk_person_organization_relationship_type, lk_status:person_status, start_date:person_organization_relationship[i].start_date, end_reason:person_organization_relationship[i].end_reason, end_date:person_organization_relationship[i].end_date};
                        personorg_relationship.push(orgPersonRelationship);
                    }
                } else {
                    res.send("'<html><head></head><body><h1>Sorry, Person Organization Relationship Not Found!</h1></body></html>'");
                }
            }
        }
        return(personorg_relationship);
    }
}




// CREATE ORGANIZATION RELATIONSHIP

app.post("/organizationrelationship", function(req, res){
    var organizationid1 = req.body.orgreloneorganizationid;
    var organizationid2 = req.body.orgreltwoorganizationid;
    var contacttype = req.body.organizationcontacttype;
    if (organizationid1 !== organizationid2) {
        var relationexists = thisGroupingExists(organization_organization_relationship, "organization_id1", organizationid1, "organization_id2", organizationid2, "lk_contact_type", contacttype);
        if (relationexists === null) {       
            var relationshiptype = req.body.organizationrelationshiptype;
            var start_date = new Date();
            var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
            var endreason = "";
            var enddate = "";
            var j = organization_organization_relationship.length - 1;
            if (j >= 0) {
                var organizationrelationshipid = parseInt(organization_organization_relationship[j].organization_relationship_id,10) + 1;
                organizationrelationshipid = organizationrelationshipid.toString();
            } else {
                organizationrelationshipid = "1";
            }            
            var newOrganizationRelationship = {organization_relationship_id:organizationrelationshipid, organization_id1:organizationid1, organization_id2:organizationid2, lk_contact_type:contacttype, lk_organization_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
            organization_organization_relationship.push(newOrganizationRelationship);
            res.redirect("back");
        } else {
            res.send("'<html><head></head><body><h1>Error: These organizations already have this relationship contact type.</h1></body></html>'");        
        }
    } else {
        res.send("'<html><head></head><body><h1>Error: Same organization.</h1></body></html>'");        
    }
});


// EDIT ORGANIZATION RELATIONSHIP

app.put("/organizationrelationship/:organization_relationship_id", function(req, res){
    var organizationrelationshipid = req.params.organization_relationship_id;
    var organizationid1 = req.body.orgreloneorganizationid;
    var organizationid2 = req.body.orgreltwoorganizationid;
    var contacttype = req.body.organizationcontacttype;
    var relationshiptype = req.body.organizationrelationshiptype;
    var endreason = req.body.organizationrelationshipendreason;
    var end_date = new Date();
    var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
    var found = false;
    var j = -1;
    while ((found === false) && (j < organization_organization_relationship.length - 1)) {
        j += 1;
        if (organization_organization_relationship[j].organization_relationship_id === organizationrelationshipid) {
            found = true;
        }
    }
    if (found === true) {
        var startdate = organization_organization_relationship[j].start_date;
        var editOrganizationRelationship = {organization_relationship_id:organizationrelationshipid, organization_id1:organizationid1, organization_id2:organizationid2, lk_contact_type:contacttype, lk_organization_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
        organization_organization_relationship[j] = editOrganizationRelationship;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Organizations Relationship Not Found!</h1></body></html>'");
    }
});


//Organization Relationship
function updateOrganizationRelationships(organizationid) {
    var thisorganization = organizationid;
    var otherorganization = "";
    var organization_name = "";
    var organization_status = "1";
    var org_contact_phone = "";
    var org_contact_email = "";
    var i = 0;
    var j = -1;
    var found_org = false;
    var has_org = -1;
    var found_phone = false;
    var has_phone = -1;
    var found_email = false;
    var has_email = -1;
    var organizationRelationship = {};
    organization_relationship = [];
    var has_relationship = thisExists(organization_organization_relationship, "organization_id1", thisorganization);
    if (has_relationship === null) {
        has_relationship = thisExists(organization_organization_relationship, "organization_id2", thisorganization);
    }
    if (has_relationship !== null) {
        for (i = 0; i < organization_organization_relationship.length; i += 1) {
            found_org = false;
            organization_name = "";
            organization_status = "1";
            j = -1;
            if (organization_organization_relationship[i].organization_id1 === thisorganization) {
                while ((found_org === false) && (j < organization.length - 1)) {
                    j += 1;
                    if (organization_organization_relationship[i].organization_id2 === organization[j].organization_id) {
                        found_org = true;
                    }
                }
            } else {
                if (organization_organization_relationship[i].organization_id2 === thisorganization) {
                    while ((found_org === false) && (j < organization.length - 1)) {
                        j += 1;
                        if (organization_organization_relationship[i].organization_id1 === organization[j].organization_id) {
                            found_org = true;
                        }
                    }
                }               
            }
            if (found_org === true) {
                otherorganization = organization[j].organization_id;
                organization_name = organization[j].organization_name;
                organization_status = organization[j].lk_organization_status;
                found_phone = false;
                org_contact_phone = "";
                has_phone = thisExists(contact_phone, "organization_id", otherorganization);
                if (has_phone !== null) {       
                    j = -1;
                    while ((found_phone === false) && (j < contact_phone.length - 1)) {
                        j += 1;
                        if (otherorganization === contact_phone[j].organization_id) {        
                            org_contact_phone = contact_phone[j].phone_number;
                            found_phone = true;
                        }
                    }
                }
                found_email = false;
                org_contact_email = "";
                has_email = thisExists(contact_email, "organization_id", otherorganization);
                if (has_email !== null) {       
                    j = -1;
                    while ((found_email === false) && (j < contact_email.length - 1)) {
                        j += 1;
                        if (otherorganization === contact_email[j].organization_id) {
                            org_contact_email = contact_email[j].email_address;
                            found_email = true;
                        }
                    }
                }
                organizationRelationship = {organization_relationship_id:organization_organization_relationship[i].organization_relationship_id, organization_id1:thisorganization, organization_id2:otherorganization, organization_name:organization_name, primary_phone:org_contact_phone, primary_email:org_contact_email, lk_contact_type:organization_organization_relationship[i].lk_contact_type, lk_organization_relationship_type:organization_organization_relationship[i].lk_organization_relationship_type, lk_status:organization_status, start_date:organization_organization_relationship[i].start_date, end_reason:organization_organization_relationship[i].end_reason, end_date:organization_organization_relationship[i].end_date};
                organization_relationship.push(organizationRelationship);
            }
        }
    }
    return(organization_relationship);
}






function thisPairingExists(this_array, this_name1, this_value1, this_name2, this_value2) {
    for (var i = 0; i < this_array.length; i += 1) {
        if (((this_array[i][this_name1] === this_value1) && (this_array[i][this_name2] === this_value2)) ||
            ((this_array[i][this_name1] === this_value2) && (this_array[i][this_name2] === this_value1))) {
            return i;
        }
    }
    return null;
}



function thisGroupingExists(this_array, this_name1, this_value1, this_name2, this_value2, this_name3, this_value3) {
    for (var i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_name1] === this_value1) && (this_array[i][this_name2] === this_value2) && (this_array[i][this_name3] === this_value3)) {
            return i;
        }
    }
    return null;
}



// ***********************  CONTACT PHONE  **************************************************8

// CREATE CONTACT PHONE

app.post("/contactphone", function(req, res){
    var personid = req.body.phonepersonid;
    var organizationid = req.body.phoneorgid;
    if (organizationid === "0") {
        organizationid = "";
    }
    var phonenumber = req.body.contactphonenumber;
    var has_phone = thisGroupingExists(contact_phone, "person_id", personid, "organization_id", organizationid, "phone_number", phonenumber);
    if (has_phone === null) {
        var phonetype = req.body.contactphonetype;
        var phonenote = req.body.phonenote;
        if (phonetype === "0") {
            phonetype = "";
        }
        if ((personid === null) || (personid === "")) {
            personid = "";
        }
        var j = contact_phone.length - 1;
        if (j >= 0) {
            var phoneid = parseInt(contact_phone[j].phone_id,10) + 1;
            phoneid = phoneid.toString();
        } else {
            phoneid = "1";
        }            
        var newContactPhone = {phone_id: phoneid, person_id: personid, organization_id: organizationid, lk_phone_type: phonetype, phone_number: phonenumber, note: phonenote};
        contact_phone.push(newContactPhone);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Contact Phone Already Exists!</h1></body></html>'");
    }
});


// EDIT CONTACT PHONE

app.put("/contactphone/:phone_id", function(req, res){
    var phoneid = req.params.phone_id;
    var personid = req.body.phonepersonid;
    var phonetype = req.body.contactphonetype;
    var phonenumber = req.body.contactphonenumber;
    var organizationid = req.body.phoneorgid;
    var phonenote = req.body.phonenote;
    if (phonetype === "0") {
        phonetype = "";
    }
    if ((personid === null) || (personid === "")) {
        personid = "";
    }
    if (organizationid === "0") {
        organizationid = "";
    }
    var found = false;
    var i = -1;
    while ((found === false) && (i < contact_phone.length - 1)) {
        i += 1;
        if (contact_phone[i].phone_id === phoneid) {
            found = true;
        }
    }
    if (found === true) {
        var editContactPhone = {phone_id: phoneid, person_id: personid, organization_id: organizationid, lk_phone_type: phonetype, phone_number: phonenumber, note: phonenote};
        contact_phone[i] = editContactPhone;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Contact Phone Not Found!</h1></body></html>'");
    }

});






// ***********************  CONTACT EMAIL  **************************************************8

// CREATE CONTACT EMAIL

app.post("/contactemail", function(req, res){
    var personid = req.body.emailpersonid;
    var organizationid = req.body.emailorgid;
    if (organizationid === "0") {
        organizationid = "";
    }
    var emailaddress = req.body.contactemailaddress;
    var has_email = thisGroupingExists(contact_email, "person_id", personid, "organization_id", organizationid, "email_address", emailaddress);
    if (has_email === null) {
        var emailtype = req.body.contactemailtype;
        var emailnote = req.body.emailnote;
        if (emailtype === "0") {
            emailtype = "";
        }
        if ((personid === null) || (personid === "")) {
            personid = "";
        }
        var j = contact_email.length - 1;
        if (j >= 0) {
            var emailid = parseInt(contact_email[j].email_id,10) + 1;
            emailid = emailid.toString();
        } else {
            emailid = "1";
        }       
        var contactEmail = {email_id: emailid, person_id: personid, organization_id: organizationid, lk_email_type: emailtype, email_address: emailaddress, note: emailnote};
        contact_email.push(contactEmail);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Contact Email Already Exists!</h1></body></html>'");        
    }
});


// EDIT CONTACT EMAIL

app.put("/contactemail/:email_id", function(req, res){
    var emailid = req.params.email_id;
    var personid = req.body.emailpersonid;
    var emailtype = req.body.contactemailtype;
    var emailaddress = req.body.contactemailaddress;
    var organizationid = req.body.emailorgid;
    var emailnote = req.body.emailnote;
    if (emailtype === "0") {
        emailtype = "";
    }
    if ((personid === null) || (personid === "")) {
        personid = "";
    }
    if (organizationid === "0") {
        organizationid = "";
    }
    var found = false;
    var i = -1;
    while ((found === false) && (i < contact_email.length - 1)) {
        i += 1;
        if (contact_email[i].email_id === emailid) {
            found = true;
        }
    }
    if (found === true) {
        var contactEmail = {email_id: emailid, person_id: personid, organization_id: organizationid, lk_email_type: emailtype, email_address: emailaddress, note: emailnote};
        contact_email[i] = contactEmail;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Contact Email Not Found!</h1></body></html>'");
    }
});
    




// ***********************  CONTACT FAX  **************************************************8

// CREATE CONTACT FAX

app.post("/contactfax", function(req, res){
    var personid = req.body.faxpersonid;
    var organizationid = req.body.faxorgid;
    if (organizationid === "0") {
        organizationid = "";
    }
    var faxnumber = req.body.contactfaxnumber;
    var has_fax = thisGroupingExists(contact_fax, "person_id", personid, "organization_id", organizationid, "fax_number", faxnumber);
    if (has_fax === null) {
        var faxtype = req.body.contactfaxtype;
        var faxnote = req.body.faxnote;
        if (faxtype === "0") {
            faxtype = "";
        }
        if ((personid === null) || (personid === "")) {
            personid = "";
        }
        var j = contact_fax.length - 1;
        if (j >= 0) {
            var faxid = parseInt(contact_fax[j].fax_id,10) + 1;
            faxid = faxid.toString();
        } else {
            faxid = "1";
        }       
        var newContactFax = {fax_id: faxid, person_id: personid, organization_id: organizationid, lk_fax_type: faxtype, fax_number: faxnumber, note: faxnote};
        contact_fax.push(newContactFax);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Contact Fax Already Exists!</h1></body></html>'");        
    }
});


// EDIT CONTACT FAX

app.put("/contactfax/:fax_id", function(req, res){
    var faxid = req.params.fax_id;
    var personid = req.body.faxpersonid;
    var faxtype = req.body.contactfaxtype;
    var faxnumber = req.body.contactfaxnumber;
    var organizationid = req.body.faxorgid;
    var faxnote = req.body.faxnote;
    if (faxtype === "0") {
        faxtype = "";
    }
    if ((personid === null) || (personid === "")) {
        personid = "";
    }
    if (organizationid === "0") {
        organizationid = "";
    }
    var found = false;
    var i = -1;
    while ((found === false) && (i < contact_fax.length - 1)) {
        i += 1;
        if (contact_fax[i].fax_id === faxid) {
            found = true;
        }
    }
    if (found === true) {
        var editContactFax = {fax_id: faxid, person_id: personid, organization_id: organizationid, lk_fax_type: faxtype, fax_number: faxnumber, note: faxnote};
        contact_fax[i] = editContactFax;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Contact Fax Not Found!</h1></body></html>'");
    }
});





// ***********************  CONTACT SOCIAL MEDIA  **************************************************8

// CREATE CONTACT SOCIAL MEDIA

app.post("/contactmedia", function(req, res){
    var personid = req.body.mediapersonid;
    var organizationid = req.body.mediaorgid;
    var mediahandle = req.body.contactmediahandle;
    var has_media = thisGroupingExists(contact_media, "person_id", personid, "organization_id", organizationid, "media_handle", mediahandle);
    if (has_media === null) {
        var mediatype = req.body.contactmediatype;
        var medianote = req.body.medianote;
        if (mediatype === "0") {
            mediatype = "";
        }
        var j = contact_media.length - 1;
        if (j >= 0) {
            var mediaid = parseInt(contact_media[j].media_id,10) + 1;
            mediaid = mediaid.toString();
        } else {
            mediaid = "1";
        }     
        var newContactMedia = {media_id: mediaid, person_id: personid, organization_id: organizationid, lk_media_type: mediatype, media_handle: mediahandle, note: medianote};
        contact_media.push(newContactMedia);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Contact Social Media Already Exists!</h1></body></html>'");        
    }
});



// EDIT CONTACT SOCIAL MEDIA

app.put("/contactmedia/:media_id", function(req, res){
    var mediaid = req.params.media_id;
    var personid = req.body.mediapersonid;
    var organizationid = req.body.mediaorgid;
    var mediatype = req.body.contactmediatype;
    var mediahandle = req.body.contactmediahandle;
    var medianote = req.body.medianote;
    if (mediatype === "0") {
        mediatype = "";
    }
    var found = false;
    var i = -1;
    while ((found === false) && (i < contact_media.length - 1)) {
        i += 1;
        if (contact_media[i].media_id === mediaid) {
            found = true;
        }
    }
    if (found === true) {
        var editContactMedia = {media_id: mediaid, person_id: personid, organization_id: organizationid, lk_media_type: mediatype, media_handle: mediahandle, note: medianote};
        contact_media[i] = editContactMedia;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Contact Sodial Media Not Found!</h1></body></html>'");
    }
});





// ***********************  CONTACT ADDRESS  **************************************************8

// CREATE CONTACT ADDRESS

app.post("/contactaddress", function(req, res){
    var personid = req.body.addresspersonid;
    var organizationid = req.body.addressorgid;
    if (organizationid === "0") {
        organizationid = "";
    }
    var street = req.body.contactstreet;
    var has_address = thisGroupingExists(contact_address, "person_id", personid, "organization_id", organizationid, "address", street);
    if (has_address === null) {
        var addresstype = req.body.contactaddresstype;
        var city = req.body.contactcity;
        var state = req.body.contactstate;
        var zipcode = req.body.contactzipcode;
        var statecode = req.body.contactstatecode;
        var countrycode = req.body.contactcountrycode;
        var addressnote = req.body.addressnote;
        if (addresstype === "0") {
            addresstype = "";
        }
        if ((personid === null) || (personid === "")) {
            personid = "";
        }
        var j = contact_address.length - 1;
        if (j >= 0) {
            var addressid = parseInt(contact_address[j].address_id,10) + 1;
            addressid = addressid.toString();
        } else {
            addressid = "1";
        }       
        var newContactAddress = {address_id: addressid, person_id: personid, organization_id: organizationid, lk_address_type: addresstype, address: street, city: city, lk_state: state, zipcode: zipcode, lk_statecode: statecode, lk_countrycode: countrycode, note: addressnote};
        contact_address.push(newContactAddress);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Contact Street Address Already Exists!</h1></body></html>'");        
    }
});


// EDIT CONTACT ADDRESS

app.put("/contactaddress/:address_id", function(req, res){
    var addressid = req.params.address_id;
    var personid = req.body.addresspersonid;
    var organizationid = req.body.addressorgid;
    var addresstype = req.body.contactaddresstype;
    var street = req.body.contactstreet;
    var city = req.body.contactcity;
    var state = req.body.contactstate;
    var zipcode = req.body.contactzipcode;
    var statecode = req.body.contactstatecode;
    var countrycode = req.body.contactcountrycode;
    var addressnote = req.body.addressnote;
    if (addresstype === "0") {
        addresstype = "";
    }
    var found = false;
    var i = -1;
    while ((found === false) && (i < contact_address.length - 1)) {
        i += 1;
        if (contact_address[i].address_id === addressid) {
            found = true;
        }
    }
    if (found === true) {
        var editContactAddress = {address_id: addressid, person_id: personid, organization_id: organizationid, lk_address_type: addresstype, address: street, city: city, lk_state: state, zipcode: zipcode, lk_statecode: statecode, lk_countrycode: countrycode, note: addressnote};
        contact_address[i] = editContactAddress;
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Sorry, Contact Address Not Found!</h1></body></html>'");
    }
});






// ******************* CASE - Needs  ************************************

var storageNeedFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/assets2/needfiles');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var uploadNeedFile = multer({ storage : storageNeedFile}).single('userNeedFile');


// CREATE NEED

app.post("/need", function(req, res) {
    uploadNeedFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Need File');
            return res.end("Error uploading Need File.");
        } else {
            var caseid = req.body.needcaseid;
            var needname = req.body.needname;
            var needtype = req.body.needtype;
            var needdate = req.body.needdate;
            var needstage = req.body.needstage;
            var needstatus = req.body.needstatus;
            var needseverity = req.body.needseverity;
            var neednote = req.body.neednote;
            var needdoc = req.body.needdocattachment;
            var j = cases_needs.length - 1;
            if (j >= 0) {
                var needid = parseInt(cases_needs[j].need_id,10) + 1;
                needid = needid.toString();
            } else {
                needid = "1";
            }
            var newCasesNeed = {need_id: needid, case_id: caseid, name:needname, type:needtype, assessment_date:needdate, stage:needstage, need_status:needstatus, severity:needseverity, note:neednote, need_doc:needdoc};
            cases_needs.push(newCasesNeed);
            res.redirect("back");
        }
    });
});


// EDIT NEED

app.put("/need/:need_id", function(req, res) {
    uploadNeedFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Need File');
            return res.end("Error uploading Need File.");
        } else {
            var needid = req.params.need_id;
            var caseid = req.body.needcaseid;
            var needname = req.body.needname;
            var needtype = req.body.needtype;
            var needdate = req.body.needdate;
            var needstage = req.body.needstage;
            var needstatus = req.body.needstatus;
            var needseverity = req.body.needseverity;
            var neednote = req.body.neednote;
            var needdoc = req.body.needdocattachment;
            var found = false;
            var i = -1;
            while ((found === false) && (i < cases_needs.length - 1)) {
                i += 1;
                if (cases_needs[i].need_id === needid) {
                    found = true;
                }
            }
            if (found === true) {
                if (needdoc !== "") {
                    uploadNeedFile(req, res, function(err) {
                        if(err) {
                            console.log('Error uploading Need File');
                            return res.end("Error uploading Need File.");
                        }
                    });
                }
                var editCasesNeed = {need_id: needid, case_id: caseid, name:needname, type:needtype, assessment_date:needdate, stage:needstage, need_status:needstatus, severity:needseverity, note:neednote, need_doc:needdoc};
                cases_needs[i] = editCasesNeed;
                res.redirect("back");
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Case Need Not Found!</h1></body></html>'");        
            }
        }
    });
});




// ******************* CASE - Goals  ************************************

var storageGoalFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/assets2/goalfiles');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var uploadGoalFile = multer({ storage : storageGoalFile}).single('userGoalFile');


// CREATE GOAL

app.post("/goal", function(req, res) {
    uploadGoalFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading GoalFile');
            return res.end("Error uploading Goal File.");
        } else {
            var caseid = req.body.goalcaseid;
            var goalname = req.body.goalname;
            var goaltype = req.body.goaltype;
            var goalpriority = req.body.goalpriority;
            var goalstartdate = req.body.goalstartdate;
            var goalduedate = req.body.goalduedate;
            var goalcompletedate = req.body.goalcompletedate;
            var assocneedid = req.body.assocneedid;
            var goalassignedpersonid = req.body.goalassignedpersonid;
            var goalnote = req.body.goalnote;
            var goaldoc = req.body.goaldocattachment;
            var j = cases_goals.length - 1;
            if (j >= 0) {
                var goalid = parseInt(cases_goals[j].goal_id,10) + 1;
                goalid = goalid.toString();
            } else {
                goalid = "1";
            }
            var newCasesGoal = {goal_id: goalid, case_id: caseid, name:goalname, type:goaltype, priority:goalpriority, start_date:goalstartdate, due_date:goalduedate, complete_date:goalcompletedate, assocneed_id:assocneedid, assignedperson_id:goalassignedpersonid, note:goalnote, goal_doc:goaldoc};
            cases_goals.push(newCasesGoal);
            res.redirect("back");
        }
    });
});


// EDIT GOAL

app.put("/goal/:goal_id", function(req, res) {
    uploadGoalFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading GoalFile');
            return res.end("Error uploading Goal File.");
        } else {
            var goalid = req.params.goal_id;
            var caseid = req.body.goalcaseid;
            var goalname = req.body.goalname;
            var goaltype = req.body.goaltype;
            var goalpriority = req.body.goalpriority;
            var goalstartdate = req.body.goalstartdate;
            var goalduedate = req.body.goalduedate;
            var goalcompletedate = req.body.goalcompletedate;
            var assocneedid = req.body.assocneedid;
            var goalassignedpersonid = req.body.goalassignedpersonid;
            var goalnote = req.body.goalnote;
            var goaldoc = req.body.goaldocattachment;
            var found = false;
            var i = -1;
            while ((found === false) && (i < cases_goals.length - 1)) {
                i += 1;
                if (cases_goals[i].goal_id === goalid) {
                    found = true;
                }
            }
            if (found === true) {
                var editCasesGoal = {goal_id: goalid, case_id: caseid, name:goalname, type:goaltype, priority:goalpriority, start_date:goalstartdate, due_date:goalduedate, complete_date:goalcompletedate, assocneed_id:assocneedid, assignedperson_id:goalassignedpersonid, note:goalnote, goal_doc:goaldoc};
                cases_goals[i] = editCasesGoal;
                res.redirect("back");
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Case Goal Not Found!</h1></body></html>'");        
            }
        }
    });
});





// ******************* CASE - Plans  ************************************

var storagePlanFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/assets2/planfiles');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var uploadPlanFile = multer({ storage : storagePlanFile}).single('userPlanFile');


// CREATE PLAN

app.post("/plan", function(req, res) {
    uploadPlanFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Plan File');
            return res.end("Error uploading Plan File.");
        } else {
            var caseid = req.body.plancaseid;
            var planname = req.body.planname;
            var plantype = req.body.plantype;
            var planpriority = req.body.planpriority;
            var planstartdate = req.body.planstartdate;
            var planduedate = req.body.planduedate;
            var plancompletedate = req.body.plancompletedate;
            var assocgoalid = req.body.assocgoalid;
            var planassignedpersonid = req.body.planassignedpersonid;
            var plannote = req.body.plannote;
            var plandoc = req.body.plandocattachment;
            var j = cases_plans.length - 1;
            if (j >= 0) {
                var planid = parseInt(cases_plans[j].plan_id,10) + 1;
                planid = planid.toString();
            } else {
                planid = "1";
            }
            var newCasesPlan = {plan_id: planid, case_id: caseid, name:planname, type:plantype, priority:planpriority, start_date:planstartdate, due_date:planduedate, complete_date:plancompletedate, assocgoal_id:assocgoalid, assignedperson_id:planassignedpersonid, note:plannote, plan_doc:plandoc};
            cases_plans.push(newCasesPlan);
            res.redirect("back");
        }
    });
});


// EDIT PLAN

app.put("/plan/:plan_id", function(req, res) {
    uploadPlanFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Plan File');
            return res.end("Error uploading Plan File.");
        } else {
            var planid = req.params.plan_id;
            var caseid = req.body.plancaseid;
            var planname = req.body.planname;
            var plantype = req.body.plantype;
            var planpriority = req.body.planpriority;
            var planstartdate = req.body.planstartdate;
            var planduedate = req.body.planduedate;
            var plancompletedate = req.body.plancompletedate;
            var assocgoalid = req.body.assocgoalid;
            var planassignedpersonid = req.body.planassignedpersonid;
            var plannote = req.body.plannote;
            var plandoc = req.body.plandocattachment;
            var found = false;
            var i = -1;
            while ((found === false) && (i < cases_plans.length - 1)) {
                i += 1;
                if (cases_plans[i].plan_id === planid) {
                    found = true;
                }
            }
            if (found === true) {
                var editCasesPlan = {plan_id: planid, case_id: caseid, name:planname, type:plantype, priority:planpriority, start_date:planstartdate, due_date:planduedate, complete_date:plancompletedate, assocgoal_id:assocgoalid, assignedperson_id:planassignedpersonid, note:plannote, plan_doc:plandoc};
                cases_plans[i] = editCasesPlan;
                res.redirect("back");
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Case Plan Not Found!</h1></body></html>'");        
            }
        }
    });
});




// ******************* CASE - Actions  ************************************

var storageActionFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/assets2/actionfiles');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var uploadActionFile = multer({ storage : storageActionFile}).single('userActionFile');


// CREATE ACTION

app.post("/action", function(req, res) {
    uploadActionFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Action File');
            return res.end("Error uploading Action File.");
        } else {
            var caseid = req.body.actioncaseid;
            var actionname = req.body.actionname;
            var actiontype = req.body.actiontype;
            var actionpriority = req.body.actionpriority;
            var actionstartdate = req.body.actionstartdate;
            var actionduedate = req.body.actionduedate;
            var actioncompletedate = req.body.actioncompletedate;
            var assocplanid = req.body.assocplanid;
            var actionassignedpersonid = req.body.actionassignedpersonid;
            var actionnote = req.body.actionnote;
            var actiondoc = req.body.actiondocattachment;
            var j = cases_actions.length - 1;
            if (j >= 0) {
                var actionid = parseInt(cases_actions[j].action_id,10) + 1;
                actionid = actionid.toString();
            } else {
                actionid = "1";
            }
            var newCasesAction = {action_id: actionid, case_id: caseid, name:actionname, type:actiontype, priority:actionpriority, start_date:actionstartdate, due_date:actionduedate, complete_date:actioncompletedate, assocplan_id:assocplanid, assignedperson_id:actionassignedpersonid, note:actionnote, action_doc:actiondoc};
            cases_actions.push(newCasesAction);
            res.redirect("back");
        }
    });
});


// EDIT ACTION

app.put("/action/:action_id", function(req, res) {
    uploadActionFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Action File');
            return res.end("Error uploading Action File.");
        } else {
            var actionid = req.params.action_id;
            var caseid = req.body.actioncaseid;
            var actionname = req.body.actionname;
            var actiontype = req.body.actiontype;
            var actionpriority = req.body.actionpriority;
            var actionstartdate = req.body.actionstartdate;
            var actionduedate = req.body.actionduedate;
            var actioncompletedate = req.body.actioncompletedate;
            var assocplanid = req.body.assocplanid;
            var actionassignedpersonid = req.body.actionassignedpersonid;
            var actionnote = req.body.actionnote;
            var actiondoc = req.body.actiondocattachment;
            var found = false;
            var i = -1;
            while ((found === false) && (i < cases_actions.length - 1)) {
                i += 1;
                if (cases_actions[i].action_id === actionid) {
                    found = true;
                }
            }
            if (found === true) {
                var editCasesAction = {action_id: actionid, case_id: caseid, name:actionname, type:actiontype, priority:actionpriority, start_date:actionstartdate, due_date:actionduedate, complete_date:actioncompletedate, assocplan_id:assocplanid, assignedperson_id:actionassignedpersonid, note:actionnote, action_doc:actiondoc};
                cases_actions[i] = editCasesAction;
                res.redirect("back");
            } else {
                res.send("'<html><head></head><body><h1>Sorry, Case Action Not Found!</h1></body></html>'");        
            }
        }
    });
});









// ******************* CASE FILES  ************************************

var storageCaseFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads/assets2/casefiles');
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  }
});

var uploadCaseFile = multer({ storage : storageCaseFile}).single('userCaseFile');


// CREATE CASE FILE

app.post("/casefile", function(req, res) {
    uploadCaseFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Case File');
            return res.end("Error uploading Case File.");
        } else {
            var filedoc = req.body.casefiledocattachment;
            if ((filedoc !== "") && (filedoc !== null)) {
                var caseid = req.body.casefilecaseid;
                var casefilename = req.body.casefilename;
                var filedomain = req.body.casefilecasedomain;
                var fileactiontype = req.body.casefileactiontype;
                var filetype = req.body.casefiletype;
                var filedate = new Date();
                filedate = (filedate.getMonth() + 1) + "/" + filedate.getDate() + "/" + filedate.getFullYear() + " at " + filedate.getHours() + ":" + filedate.getMinutes() + ":" + filedate.getSeconds();
                var filepersonid = req.body.casefilepersonid;
                var fileorgid = req.body.casefileorgid;
                var filenote = req.body.casefilenote;
                var j = cases_casefiles.length - 1;
                if (j >= 0) {
                    var casefileid = parseInt(cases_casefiles[j].casefile_id,10) + 1;
                    casefileid = casefileid.toString();
                } else {
                    casefileid = "1";
                }
                var newCasesFile = {casefile_id: casefileid, case_id: caseid, name:casefilename, domain:filedomain, actiontype:fileactiontype, type:filetype, filedate:filedate, fileperson_id:filepersonid, fileorg_id:fileorgid, note:filenote, file_doc:filedoc};
                cases_casefiles.push(newCasesFile);
                res.redirect("back");
            } else {
                res.send("'<html><head></head><body><h1>Error, Upload Case File Required!</h1></body></html>'");        
            }
        }
    });
});


// EDIT CASE FILE

app.put("/casefile/:casefile_id", function(req, res) {
    uploadCaseFile(req, res, function(err) {
        if(err) {
            console.log('Error uploading Case File');
            return res.end("Error uploading Case File.");
        } else {
            var filedoc = req.body.casefiledocattachment;
            if ((filedoc !== "") && (filedoc !== null)) {
                var casefileid = req.params.casefile_id;
                var caseid = req.body.casefilecaseid;
                var casefilename = req.body.casefilename;
                var filedomain = req.body.casefilecasedomain;
                var fileactiontype = req.body.casefileactiontype;
                var filetype = req.body.casefiletype;
                var filedate = new Date();
                filedate = (filedate.getMonth() + 1) + "/" + filedate.getDate() + "/" + filedate.getFullYear() + " at " + filedate.getHours() + ":" + filedate.getMinutes() + ":" + filedate.getSeconds();
                var filepersonid = req.body.casefilepersonid;
                var fileorgid = req.body.casefileorgid;
                var filenote = req.body.casefilenote;
                var filedoc = req.body.casefiledocattachment; 
                var found = false;
                var i = -1;
                while ((found === false) && (i < cases_casefiles.length - 1)) {
                    i += 1;
                    if (cases_casefiles[i].casefile_id === casefileid) {
                        found = true;
                    }
                }
                if (found === true) { 
                    var editCasesFile = {casefile_id: casefileid, case_id: caseid, name:casefilename,  domain:filedomain, actiontype:fileactiontype, type:filetype, filedate:filedate, fileperson_id:filepersonid, fileorg_id:fileorgid, note:filenote, file_doc:filedoc};
                    cases_casefiles[i] = editCasesFile;
                    res.redirect("back");
                } else {
                    res.send("'<html><head></head><body><h1>Sorry, Case File Not Found!</h1></body></html>'");        
                }
            } else {
                res.send("'<html><head></head><body><h1>Error, Upload Case File Required!</h1></body></html>'");        
            }
        }
    });
});




//********************************** CASE NOTE  ***********************************

// CREATE CASE NOTE

app.post("/casenote", function(req, res) {
    var notetext = req.body.casenotetext;
    if ((notetext !== "") && (notetext !== null)) {
        var caseid = req.body.casenotecaseid;
        var notename = req.body.casenotename;
        var notedomain = req.body.casenotecasedomain;
        var noteactiontype = req.body.casenoteactiontype;
        var notetype = req.body.casenotetype;
        var notedate = new Date();
        notedate = (notedate.getMonth() + 1) + "/" + notedate.getDate() + "/" + notedate.getFullYear() + " at " + notedate.getHours() + ":" + notedate.getMinutes() + ":" + notedate.getSeconds();
        var notepersonid = req.body.casenotepersonid;
        var noteorgid = req.body.casenoteorgid;
        var j = cases_casenotes.length - 1;
        if (j >= 0) {
            var casenoteid = parseInt(cases_casenotes[j].casenote_id,10) + 1;
            casenoteid = casenoteid.toString();
        } else {
            casenoteid = "1";
        }
        var newCasesNote = {casenote_id: casenoteid, case_id: caseid, name:notename, domain:notedomain, actiontype:noteactiontype, type:notetype, notedate:notedate, noteperson_id:notepersonid, noteorg_id:noteorgid, notetext:notetext};
        cases_casenotes.push(newCasesNote);
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Error, Case Note Required!</h1></body></html>'");        
    }
});


// EDIT CASE NOTE

app.put("/casenote/:casenote_id", function(req, res) {
    var notetext = req.body.casenotetext;
    if ((notetext !== "") && (notetext !== null)) {
        var casenoteid = req.params.casenote_id;
        var caseid = req.body.casenotecaseid;
        var notename = req.body.casenotename;
        var notedomain = req.body.casenotecasedomain;
        var noteactiontype = req.body.casenoteactiontype;
        var notetype = req.body.casenotetype;
        var notedate = new Date();
        notedate = (notedate.getMonth() + 1) + "/" + notedate.getDate() + "/" + notedate.getFullYear() + " at " + notedate.getHours() + ":" + notedate.getMinutes() + ":" + notedate.getSeconds();
        var notepersonid = req.body.casenotepersonid;
        var noteorgid = req.body.casenoteorgid;
        var found = false;
        var i = -1;
        while ((found === false) && (i < cases_casenotes.length - 1)) {
            i += 1;
            if (cases_casenotes[i].casenote_id === casenoteid) {
                found = true;
            }
        }
        if (found === true) {
            var editCasesNote = {casenote_id: casenoteid, case_id: caseid, name:notename, domain:notedomain, actiontype:noteactiontype, type:notetype, notedate:notedate, noteperson_id:notepersonid, noteorg_id:noteorgid, notetext:notetext};
            cases_casenotes[i] = editCasesNote;
            res.redirect("back");
        }
    } else {
        res.send("'<html><head></head><body><h1>Error, Case Note not found!</h1></body></html>'");        
    }
});






//**********************************   PERSON IMAGE   *************************************************

var storagePersonImageFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './public/assets/images');
  },
  filename: function (req, file, callback) {
    callback(null, req.params.person_id + '_personimage.jpg');
  }
});
var uploadPersonImageFile = multer({ storage : storagePersonImageFile}).single('userPersonImageFile');


app.post('/personimage/:person_id', function(req, res){
    uploadPersonImageFile(req, res, function(err) {
        if(err) {
            console.log("Error uploading Person Image File.");
            return res.end("Error uploading Person Image File.");
        } else {
            var personid = req.params.person_id;
            var personimage = req.body.personbrowsebtn;
            var found = false;
            var j = -1;
            while ((found === false) && (j < person.length - 1)) {
                j += 1;
                if (person[j].person_id === personid) {
                    found = true;
                }
            }
            if (found === true) {
                if (personimage !== "") {
                    person[j].image = personid + "_personimage.jpg";
                } else {
                    person[j].image = "noimage_lg.jpg";
                }
                res.redirect("back");
            } else {
                res.send("'<html><head></head><body><h1>Error, Person not found!</h1></body></html>'");        
            }                  
        }
    });
});

app.post('/personnoimage/:person_id', function(req, res){
    var personid = req.params.person_id;
    var found = false;
    var j = -1;
    while ((found === false) && (j < person.length - 1)) {
        j += 1;
        if (person[j].person_id === personid) {
            found = true;
        }
    }
    if (found === true) {
        person[j].image = "noimage_lg.jpg";
        res.redirect("back");
    } else {
        res.send("'<html><head></head><body><h1>Error, Person not found!</h1></body></html>'");        
    }                  
});

//**** DOWNLOAD FILE **********************************************

app.get('/download/:section/:urlfile', function(req, res) {
//  var section = req.query.section;
  var section = req.params.section;
  var urlfile = req.params.urlfile;
  var file = __dirname + '/uploads/assets2/' + section + "/" + urlfile;
  res.download(file);
});



app.get("*", function(req, res) {
    res.send("Sorry, page not found.");
});


app.listen(port);