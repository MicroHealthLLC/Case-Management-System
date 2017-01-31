var express = require("express");
var fs = require("fs");
var mkdirp = require("mkdirp");
var multer = require("multer");
var app = express();
var bodyParser = require("body-parser");
var passport = require("passport");
var methodOverride = require("method-override");
var localStrategy = require("passport-local");
var flash = require("connect-flash");
var Enum = require("enum");

var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public/assets"));
app.use(express.static(__dirname + "/uploads/assets2"));
app.use(methodOverride("_method"));
app.use(flash());


//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "mountains half grassy, half snow-capped.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//passport.use(new localStrategy(User.authenticate()));
//passport.serializeUser(User.serializeUser());
//passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});



//TEMP ENUMERATIONS  *****************************************

var enumRequired = {
    top_userRole: "0",
    top_userRoleStatus: "2",
    top_caseDomain: "0",
    top_caseCategory: "0",
    top_caseStatus: "2",
    top_caseSeverity: "0",
    top_casePriority: "0",
    top_assignedRole: "1",
    top_assignmentType: "0",
    top_goalType: "0",
    top_planType: "0",
    top_actionType: "0",
    top_caseFileType: "0",
    top_caseNoteType: "0",
    top_questionnaireType: "0",
    top_questAssociatedWith: "3",
    top_questionnaireStatus: "4",
    top_taskType: "0",
    top_taskStatus: "0",
    top_personGender: "2",
    top_personType: "0",
    top_personReligion: "0",
    top_identificationType: "4",
    top_identificationStatus: "2",
    top_organizationType: "0",
    top_caseCaseRelationship: "0",
    top_personPersonRelationship: "0",
    top_personOrganizationRelationship: "0",
    top_organizationOrganizationRelationship: "0",
    top_contactPhoneType: "3",
    top_contactEmailType: "2",
    top_contactFaxType: "2",
    top_contactMediaType: "2",
    top_contactAddressType: "2",
    top_contactStateCode: "0",
    top_contactCountryCode: "1"
};

var enumFreeze = {
    top_userRole: "0",
    top_userRoleStatus: "2",
    top_caseDomain: "0",
    top_caseCategory: "0",
    top_caseStatus: "2",
    top_caseSeverity: "0",
    top_casePriority: "0",
    top_assignedRole: "1",
    top_assignmentType: "0",
    top_goalType: "0",
    top_planType: "0",
    top_actionType: "0",
    top_caseFileType: "0",
    top_caseNoteType: "0",
    top_questionnaireType: "0",
    top_questAssociatedWith: "3",
    top_questionnaireStatus: "4",
    top_taskType: "0",
    top_taskStatus: "0",
    top_personGender: "2",
    top_personType: "0",
    top_personReligion: "0",
    top_identificationType: "4",
    top_identificationStatus: "2",
    top_organizationType: "0",
    top_caseCaseRelationship: "0",
    top_personPersonRelationship: "0",
    top_personOrganizationRelationship: "0",
    top_organizationOrganizationRelationship: "0",
    top_contactPhoneType: "3",
    top_contactEmailType: "2",
    top_contactFaxType: "2",
    top_contactMediaType: "2",
    top_contactAddressType: "2",
    top_contactStateCode: "0",
    top_contactCountryCode: "1"
};

var userRole = ['User Role 1', 'User Role 2', 'User Role 3'];

var userRoleStatus = ['Active', 'Inactive'];

var caseDomain = ['Domain 1', 'Domain 2', 'Domain 3'];

var caseCategory = ['Medical', 'Non-Medical'];

var caseStatus = ['Active', 'Inactive', 'On Hold', 'Canceled'];

var caseSeverity = ['Low', 'Medium', 'High'];

var casePriority = ['Yellow', 'Blue', 'Green', 'Red'];

var assignedRole = ['Case Person', 'Assigned Role 2', 'Assigned Role 3'];

var assignmentType = ['Assignment Type 1', 'Assignment Type 2', 'Assignment Type 3'];

var goalType = ['Goal Type 1', 'Goal Type 2', 'Goal Type 3'];

var planType = ['Plan Type 1', 'Plan Type 2', 'Plan Type 3'];

var actionType = ['Action Type 1', 'Action Type 2', 'Action Type 3'];

var caseFileType = ['Case File Type 1', 'Case File Type 2', 'Case File Type 3'];

var caseNoteType = ['Case Note Type 1', 'Case Note Type 2', 'Case Note Type 3'];

var questionnaireType = ['Questionnaire Type 1', 'Questionnaire Type 2', 'Questionnaire Type 3'];

var questAssociatedWith = ['Goal', 'Plan', 'Action'];

var questionnaireStatus = ['Not Started', 'Started', 'Complete', 'Canceled'];

var taskType = ['Task Type 1', 'Task Type 2', 'Task Type 3'];

var taskStatus = ['Task Status 1', 'Task Status 2', 'Task Status 3'];

var personGender = ['Male', 'Female', 'Unknown'];

var personType = ['Person Type 1', 'Person Type 2', 'Person Type 3'];

var personReligion = ['Christian', 'Jewish', 'Muslim', 'Other'];

var identificationType = ['Drivers License', 'Social Security Card', 'Passport', 'Birth Certificate'];

var identificationStatus = ['Active', 'Inactive'];

var organizationType = ['Organization Type 1', 'Organization Type 2', 'Organization Type 3'];

var caseCaseRelationship = ['Case Case Relationship 1', 'Case Case Relationship 2', 'Case Case Relationship 3'];

var personPersonRelationship = ['Person Person Relationship 1', 'Person Person Relationship 2', 'Person Person Relationship 3'];

var personOrganizationRelationship = ['Person Org Relationship 1', 'Person Org Relationship 2', 'Person Org Relationship 3'];

var organizationOrganizationRelationship = ['Org Org Relationship 1', 'Org Org Relationship 2', 'Org Org Relationship 3'];

var contactType = ['Case Support', 'Family Support', 'External Support'];

var contactPhoneType = ['Home', 'Business', 'Mobile', 'Other'];

var contactEmailType = ['Personal', 'Business', 'Other'];

var contactFaxType = ['Home', 'Business', 'Other'];

var contactMediaType = ['Personal', 'Business', 'Other'];

var contactAddressType = ['Home', 'Business', 'Other'];

var contactStateCode = ['VA', 'GA', 'CA', 'NY', 'FL'];

var contactCountryCode = ['USA'];





//********************************************************************************************************

var person = [
	{person_id: "1", last_name: "Doe", first_name: "John", middle_name: "Mark", title: "CEO", lk_gender: "1", birth_date: "10/12/1990", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "1", note: "Is hearing impaired.", image: "person_1_Doe_John.jpg"},
	{person_id: "2", last_name: "Johnson", first_name: "Beth", middle_name: "Sue", title: "Assistant", lk_gender: "2", birth_date: "2/30/1995", lk_user_role: "2", lk_person_type: "2", lk_person_status: "1", lk_religion: "2", note: "Blah Blah Blah.", image: "person_2_Johnson_Beth.jpg"},
	{person_id: "3", last_name: "Albertson", first_name: "Michael", middle_name: "", title: "", lk_gender: "1", birth_date: "7/20/1998", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "0", note: "", image: "noimage_lg.jpg"},
	{person_id: "4", last_name: "Richardson", first_name: "Mary", middle_name: "", title: "Manager", lk_gender: "2", birth_date: "3/22/1974", lk_user_role: "1", lk_person_type: "2", lk_person_status: "1", lk_religion: "1", note: "", image: "noimage_lg.jpg"},
	{person_id: "5", last_name: "Parker", first_name: "Donna", middle_name: "Ray", title: "", lk_gender: "2", birth_date: "5/08/1980", lk_user_role: "2", lk_person_type: "1", lk_person_status: "1", lk_religion: "1", note: "", image: "noimage_lg.jpg"},
	{person_id: "6", last_name: "Michaels", first_name: "Laura", middle_name: "Sue", title: "", lk_gender: "2", birth_date: "6/20/1999", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "0", note: "", image: "noimage_lg.jpg"},
	{person_id: "7", last_name: "McDonald", first_name: "Julie", middle_name: "Ann", title: "", lk_gender: "2", birth_date: "1/23/1997", lk_user_role: "1", lk_person_type: "1", lk_person_status: "1", lk_religion: "0", note: "", image: "noimage_lg.jpg"}
];
var thisperson = [];

var identification = [
    {identification_id: "1", person_id: "1", lk_identification_type: "1", identification_number: "123456789000", issuedby_org: "DMV - Richmond, VA", issued_date: "4/19/2012", expiration_date: "4/19/2022", identification_status: "1", note: ""},
    {identification_id: "2", person_id: "2", lk_identification_type: "1", identification_number: "897543654335", issuedby_org: "Passport USA", issued_date: "11/10/2014", expiration_date: "11/10/2024", identification_status: "1", note: ""},
    {identification_id: "3", person_id: "3", lk_identification_type: "2", identification_number: "432844966", issuedby_org: "Social Security Services, USA", issued_date: "8/05/1980", expiration_date: "", identification_status: "1", note: ""}
];
var person_identification = [];

var organization = [
	{organization_id: "1", organization_name: "Organization Name 1", organization_website: "www.organizationone.com", lk_user_role: "1", lk_organization_type: "1",  lk_organization_status: "1", note: ""},
	{organization_id: "2", organization_name: "Organization Name 2", organization_website: "www.organizationtwo.net", lk_user_role: "2", lk_organization_type: "2",  lk_organization_status: "1", note: ""},
	{organization_id: "3", organization_name: "Organization Name 3", organization_website: "www.organization3.org", lk_user_role: "2", lk_organization_type: "2",  lk_organization_status: "1", note: ""}
];
var thisorg = [];

var cases = [
	{case_id: "1", case_title: "Case Title 1", case_description: "medical info info info", lk_case_domain: "1", lk_case_category: "1", lk_case_type: "1",  lk_case_status: "1", lk_case_severity: "2", lk_case_priority: "2",
    start_date: "10/23/2016", due_date: "1/18/2017", complete_date: "1/15/2017"},
	{case_id: "2", case_title: "Case Title 2", case_description: "info2 info2 info2", lk_case_domain: "3", lk_case_category: "2", lk_case_type: "1",  lk_case_status: "1", lk_case_severity: "1", lk_case_priority: "1",
    start_date: "11/20/2016", due_date: "1/18/2017", complete_date: "1/18/2017"},
	{case_id: "3", case_title: "Case Title 3", case_description: "blah blah blah", lk_case_domain: "1", lk_case_category: "2", lk_case_type: "2",  lk_case_status: "1", lk_case_severity: "2", lk_case_priority: "1",
    start_date: "12/10/2016", due_date: "6/16/2017", complete_date: ""}
];
var thiscase = [];
var overdue_cases = [];
var thiscaseperson = [];


var case_case_relationship = [
    {case_relationship_id: "1", lk_case_relationship_type: "1", case_id1: "2", case_id2: "1"}
];
var thisrelatedcase = [];

var case_assignment = [
    {case_assignment_id: "1", case_id: "1", person_id: "1", organization_id: null, lk_assigned_role: "2", lk_case_assignment_type: "1", start_date: "9/20/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "2", case_id: "2", person_id: "2", organization_id: null, lk_assigned_role: "3", lk_case_assignment_type: "2", start_date: "11/27/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "3", case_id: "1", person_id: "5", organization_id: null, lk_assigned_role: "1", lk_case_assignment_type: "2", start_date: "6/22/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "4", case_id: "1", person_id: null, organization_id: "1", lk_assigned_role: "2", lk_case_assignment_type: "1", start_date: "9/20/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "5", case_id: "2", person_id: "1", organization_id: null, lk_assigned_role: "2", lk_case_assignment_type: "1", start_date: "11/10/2015", end_reason: "", end_date: ""},
    {case_assignment_id: "6", case_id: "3", person_id: "1", organization_id: null, lk_assigned_role: "2", lk_case_assignment_type: "1", start_date: "12/12/2016", end_reason: "", end_date: ""},
    {case_assignment_id: "7", case_id: "2", person_id: "6", organization_id: null, lk_assigned_role: "1", lk_case_assignment_type: "2", start_date: "11/27/2016", end_reason: "", end_date: ""},
    {case_assignment_id: "8", case_id: "2", person_id: "7", organization_id: null, lk_assigned_role: "1", lk_case_assignment_type: "2", start_date: "11/27/2016", end_reason: "", end_date: ""}
];
var cases_person_assignment = [];
var cases_org_assignment = [];
var person_assignment = [];
var organization_assignment = [];
var my_cases = [];

var cases_goals = [
    {goal_id: "1", case_id: "1", name: "Goal 1 - Medical", type: "1", priority: "2", start_date: "10/23/2016", due_date: "1/10/2017", complete_date: "1/09/2017", assignedperson_id: "1", note: "", goal_doc: ["1300236542221_Case_1__Goal_1.docx"]},
    {goal_id: "2", case_id: "1", name: "Goal 2 - Financial", type: "2", priority: "1", start_date: "11/27/2016", due_date: "12/08/2016", complete_date: "12/07/2016", assignedperson_id: "4", note: "", goal_doc: []},
    {goal_id: "3", case_id: "1", name: "Goal 3 - Social", type: "1", priority: "1", start_date: "11/04/2016", due_date: "12/09/2016", complete_date: "12/08/2016", assignedperson_id: "2", note: "", goal_doc: []},
    {goal_id: "4", case_id: "2", name: "Goal 4 - Social", type: "2", priority: "3", start_date: "11/21/2016", due_date: "1/18/2017", complete_date: "1/17/2017", assignedperson_id: "1", note: "", goal_doc: []},
    {goal_id: "5", case_id: "3", name: "Goal 5 - Financial", type: "3", priority: "1", start_date: "12/22/2016", due_date: "3/15/2017", complete_date: "", assignedperson_id: "1", note: "", goal_doc: []}
];

var this_cases_goals = [];
var overdue_goals = [];

var cases_plans = [
    {plan_id: "1", case_id: "1", name: "Plan 1 - Medical", type: "1", priority: "2", start_date: "10/27/2016", due_date: "11/10/2016", complete_date: "11/10/2016", assocgoal_id: "1", assignedperson_id: "1", note: "", plan_doc: ["1341002233276_Case_1__Plan_1.docx"]},
    {plan_id: "2", case_id: "1", name: "Plan 1A - Medical", type: "2", priority: "1", start_date: "11/27/2016", due_date: "1/09/2017", complete_date: "1/06/2017", assocgoal_id: "1", assignedperson_id: "1", note: "", plan_doc: []},
    {plan_id: "3", case_id: "1", name: "Plan 2 - Financial", type: "2", priority: "1", start_date: "11/28/2016", due_date: "12/07/2016", complete_date: "12/06/2016", assocgoal_id: "2", assignedperson_id: "4", note: "", plan_doc: []},
    {plan_id: "4", case_id: "1", name: "Plan 3 - Social", type: "1", priority: "1", start_date: "11/05/2016", due_date: "12/03/2016", complete_date: "12/03/2016", assocgoal_id: "3", assignedperson_id: "1", note: "", plan_doc: []},
    {plan_id: "5", case_id: "2", name: "Plan 4 - Social", type: "2", priority: "3", start_date: "11/22/2016", due_date: "1/17/2017", complete_date: "1/16/2017", assocgoal_id: "4", assignedperson_id: "1", note: "", plan_doc: []},
    {plan_id: "6", case_id: "3", name: "Plan 5 - Financial", type: "3", priority: "1", start_date: "12/23/2016", due_date: "1/19/2017", complete_date: "", assocgoal_id: "5", assignedperson_id: "1", note: "", plan_doc: []}
];

var this_cases_plans = [];
var overdue_plans = [];


var cases_actions = [
    {action_id: "1", case_id: "1", name: "Action 1 - Medical", type: "1", priority: "2", start_date: "10/28/2016", due_date: "11/01/2016", complete_date: "10/30/2016", assocplan_id: "1", assignedperson_id: "1", note: "", action_doc: ["1341007793231_Case_1__Action_1.docx","1341457823236_Case_1__Action_2.docx"]},
    {action_id: "2", case_id: "1", name: "Action 1A - Medical", type: "2", priority: "1", start_date: "11/30/2016", due_date: "12/23/2016", complete_date: "12/23/2016", assocplan_id: "2", assignedperson_id: "1", note: "", action_doc: []},
    {action_id: "3", case_id: "1", name: "Action 1B - Medical", type: "3", priority: "2", start_date: "12/03/2016", due_date: "1/06/2017", complete_date: "1/05/2017", assocplan_id: "2", assignedperson_id: "1", note: "", action_doc: []},
    {action_id: "4", case_id: "1", name: "Action 2 - Financial", type: "2", priority: "1", start_date: "11/29/2016", due_date: "12/06/2016", complete_date: "12/05/2016", assocplan_id: "3", assignedperson_id: "4", note: "", action_doc: []},
    {action_id: "5", case_id: "1", name: "Action 1 - Social", type: "1", priority: "1", start_date: "11/06/2016", due_date: "11/27/2016", complete_date: "11/27/2016", assocplan_id: "4", assignedperson_id: "1", note: "", action_doc: []},
    {action_id: "6", case_id: "1", name: "Action 1A - Social", type: "2", priority: "3", start_date: "11/18/2016", due_date: "11/30/2016", complete_date: "11/29/2016", assocplan_id: "4", assignedperson_id: "1", note: "", action_doc: []},
    {action_id: "7", case_id: "2", name: "Action 3 - Social", type: "1", priority: "1", start_date: "11/23/2016", due_date: "12/17/2016", complete_date: "12/15/2016", assocplan_id: "5", assignedperson_id: "1", note: "", action_doc: []},
    {action_id: "8", case_id: "2", name: "Action 3A - Social", type: "2", priority: "2", start_date: "12/27/2016", due_date: "1/15/2017", complete_date: "1/15/2017", assocplan_id: "5", assignedperson_id: "1", note: "", action_doc: []}
];

var this_cases_actions = [];
var overdue_actions = [];

var cases_casefiles = [
    {casefile_id: "1", case_id: "1", name: "Case_1__File_1", domain: "2", actiontype: "1", type: "1", filedate: "11/04/2016 at 10:41:53", fileperson_id: "1", fileorg_id: "1", note: "", file_doc: ["1479140876936_Case_1__File_1.docx","1479312575247_CMS_questions.docx"]}
];
var this_cases_files = [];

var cases_casenotes = [
    {casenote_id: "1", case_id: "1", name: "Case_1__Note_1", domain: "1", actiontype: "2", type: "2", notedate: "11/12/2016 at 14:22:16", noteperson_id: "1", noteorg_id: "0", note_text: ["note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 note 1 "]}
];
var this_cases_notes = [];

var contact_phone = [
	{phone_id: "1", person_id: null, organization_id: "1", lk_phone_type: "2", phone_number: "642-562-1198", note: ""},
	{phone_id: "2", person_id: "1", organization_id: "1", lk_phone_type: "2", phone_number: "642-562-1197", note: "Extension 384"},
	{phone_id: "3", person_id: "3", organization_id: "1", lk_phone_type: "2", phone_number: "642-562-1197", note: "Extension 390"},
	{phone_id: "4", person_id: null, organization_id: "2", lk_phone_type: "2", phone_number: "534-833-0000", note: ""},
	{phone_id: "5", person_id: "2", organization_id: "2", lk_phone_type: "2", phone_number: "534-833-0001", note: "Extension 8745"},
	{phone_id: "6", person_id: "1", organization_id: null, lk_phone_type: "1", phone_number: "123-999-7777", note: ""},
	{phone_id: "7", person_id: "1", organization_id: null, lk_phone_type: "1", phone_number: "123-977-7000", note: "Weeknights and weekends."},
	{phone_id: "8", person_id: "2", organization_id: null, lk_phone_type: "1", phone_number: "427-456-5555", note: ""},
	{phone_id: "9", person_id: null, organization_id: "1", lk_phone_type: "1", phone_number: "642-562-0000", note: ""},
	{phone_id: "10", person_id: "5", organization_id: null, lk_phone_type: "1", phone_number: "456-987-5566", note: ""},
	{phone_id: "11", person_id: "6", organization_id: null, lk_phone_type: "1", phone_number: "674-900-3344", note: ""},
	{phone_id: "12", person_id: "7", organization_id: null, lk_phone_type: "3", phone_number: "674-910-3877", note: ""}
];
var person_contact_phone = [];
var org_contact_phone = [];

var contact_email = [
	{email_id: "1", person_id: null, organization_id: "1", lk_email_type: "2", email_address: "info@organizationone.com", note: ""},
	{email_id: "2", person_id: "1", organization_id: "1", lk_email_type: "2", email_address: "person1.lastname@organizationone.com", note: ""},
	{email_id: "3", person_id: "3", organization_id: "1", lk_email_type: "2", email_address: "person3.lastname@organizationone.com", note: ""},
	{email_id: "4", person_id: null, organization_id: "2", lk_email_type: "2", email_address: "info@organizationtwo.net", note: ""},
	{email_id: "5", person_id: "2", organization_id: "2", lk_email_type: "2", email_address: "person2.lastname@organizationtwo.net", note: ""},
	{email_id: "6", person_id: "1", organization_id: null, lk_email_type: "1", email_address: "person1name@gmail.com", note: "Only when status is Inactive."},
	{email_id: "7", person_id: "2", organization_id: null, lk_email_type: "1", email_address: "person2name@yahoo.com", note: "Use only for emergencies when there is no response after 1 hour from sending business email."},
	{email_id: "8", person_id: "5", organization_id: null, lk_email_type: "1", email_address: "donna.parker@gmail.com", note: ""},
	{email_id: "9", person_id: "6", organization_id: null, lk_email_type: "1", email_address: "laurasue.michaels@gmail.com", note: ""},
	{email_id: "10", person_id: "7", organization_id: null, lk_email_type: "1", email_address: "julieann.mcdonald12@gmail.com", note: ""}
];

var person_contact_email = [];
var org_contact_email = [];


var contact_fax = [
	{fax_id: "1", person_id: null, organization_id: "1", lk_fax_type: "2", fax_number: "642-562-2198", note: ""},
	{fax_id: "2", person_id: "1", organization_id: "1", lk_fax_type: "2", fax_number: "642-562-2197", note: ""}
];
var person_contact_fax = [];
var org_contact_fax = [];


var contact_media = [
	{media_id: "1", person_id: "1", organization_id: null, lk_media_type: "1", media_handle: "person1@facebook.com", note: ""},
	{media_id: "2", person_id: null, organization_id: "1", lk_media_type: "1", media_handle: "organization1@facebook.com", note: ""}
];
var person_contact_media = [];
var org_contact_media = [];


var contact_address = [
	{address_id: "1", person_id: null, organization_id: "1", lk_address_type: "2", address: "234 Anywhere Street", city: "Richmond", lk_state: "Virginia", zipcode: "11111", lk_statecode: "1", lk_countrycode: "1", note: ""},
	{address_id: "2", person_id: "1", organization_id: "1", lk_address_type: "2", address: "234 Anywhere Street", city: "Richmond", lk_state: "Virginia", zipcode: "11111", lk_statecode: "1", lk_countrycode: "1", note: ""},
	{address_id: "3", person_id: "5", organization_id: null, lk_address_type: "1", address: "733 Patient Avenue", city: "Atlanta", lk_state: "Georgia", zipcode: "11177", lk_statecode: "2", lk_countrycode: "1", note: ""}
];
var person_contact_address = [];
var org_contact_address = [];


var person_organization_relationship = [
    {person_organization_id: "1", person_id: "1", organization_id: "1", lk_contact_type: "1", lk_person_organization_relationship_type: "1", start_date: "6/15/2015", end_reason: "", end_date: ""},
    {person_organization_id: "2", person_id: "1", organization_id: "3", lk_contact_type: "3", lk_person_organization_relationship_type: "2", start_date: "7/22/2016", end_reason: "", end_date: ""},
    {person_organization_id: "3", person_id: "2", organization_id: "1", lk_contact_type: "3", lk_person_organization_relationship_type: "2", start_date: "3/07/2016", end_reason: "", end_date: ""}
];
var personorg_relationship = [];

var person_person_relationship = [
    {person_relationship_id: "1", person_id1: "1", person_id2: "2", lk_contact_type: "1", lk_person_relationship_type: "1", start_date: "2/19/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "2", person_id1: "1", person_id2: "2", lk_contact_type: "2", lk_person_relationship_type: "1", start_date: "1/22/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "3", person_id1: "1", person_id2: "3", lk_contact_type: "1", lk_person_relationship_type: "1", start_date: "3/27/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "4", person_id1: "1", person_id2: "4", lk_contact_type: "1", lk_person_relationship_type: "2", start_date: "8/18/2016", end_reason: "", end_date: ""},
    {person_relationship_id: "5", person_id1: "1", person_id2: "3", lk_contact_type: "3", lk_person_relationship_type: "2", start_date: "7/25/2016", end_reason: "", end_date: ""}
];
var person_relationship = [];

var organization_organization_relationship = [
    {organization_relationship_id: "1", organization_id1: "1", organization_id2: "2", lk_contact_type: "1", lk_organization_relationship_type: "1", start_date: "3/25/2016", end_reason: "", end_date: ""},
    {organization_relationship_id: "2", organization_id1: "1", organization_id2: "3", lk_contact_type: "3", lk_organization_relationship_type: "2", start_date: "4/01/2016", end_reason: "", end_date: ""}
];
var organization_relationship = [];

var tasks = [
    {task_id: "1", subject: "Start Case", type: "2", priority: "2", person_id: "1", case_id: "1", start_date: "4/12/2015", due_date: "4/19/2015", complete_date: "4/19/2015", task_status: "1", note: ""},
    {task_id: "2", subject: "Assign Person to Case", type: "1", priority: "1", person_id: "4", case_id: "2", start_date: "10/02/2016", due_date: "10/12/2016", complete_date: "", task_status: "5", note: "Call the client."},
    {task_id: "3", subject: "Assign Person to Case", type: "1", priority: "2", person_id: "2", case_id: "1", start_date: "10/09/2016", due_date: "11/19/2016", complete_date: "", task_status: "2", note: "Remind to submit results."}
];
var taskslisting = [];
var overdue_tasks = [];
var taskscaselisting = [];

var questionnaire = [
    {questionnaire_id: "1", name: "Questionnaire Name 1", quest_type: "1", date_created: "10/17/2016 at 11:25:33", date_updated: "", qa: [
        {question_id: "1", questtext: "Question 1 question 1 question 1 question 1 question 1.", questtype: "radio_input_lg", totalansw: "2", answers: ["No","Yes"]},
        {question_id: "2", questtext: "Question 2 question 2 question 2 question 2 question 2.", questtype: "radio", totalansw: "4", answers: ["Always","Most of the Time","Once in a While","Never"]},
        {question_id: "3", questtext: "Question 3 question 3 question 3 question 3 question 3.", questtype: "checkbox_input_sm", totalansw: "3", answers: ["Answer 3-1","Answer 3-2","Other"]},
        {question_id: "4", questtext: "Question 4 question 4 question 4 question 4 question 4.", questtype: "textarea", totalansw: "1", answers: []}
    ]},
    {questionnaire_id: "2", name: "Questionnaire Name 2", quest_type: "2", date_created: "5/11/2016 at 10:16:42", date_updated: "", qa: [
        {question_id: "1", questtext: "Question 1 question 1 question 1 question 1 question 1.", questtype: "radio", totalansw: "2", answers: ["True","False"]},
        {question_id: "2", questtext: "Question 2 question 2 question 2 question 2 question 2.", questtype: "checkbox", totalansw: "3", answers: ["Orange","Green","Pink"]},
        {question_id: "3", questtext: "Question 3 question 3 question 3 question 3 question 3.", questtype: "radio_input_sm", totalansw: "3", answers: ["Option 1","Option 2","Other"]},
        {question_id: "4", questtext: "Question 4 question 4 question 4 question 4 question 4.", questtype: "textbox", totalansw: "3", answers: []}
    ]},
    {questionnaire_id: "3", name: "Questionnaire Name 3", quest_type: "3", date_created: "5/11/2016 at 12:12:48", date_updated: "", qa: [
        {question_id: "1", questtext: "Question 1 question 1 question 1 question 1 question 1.", questtype: "radio", totalansw: "2", answers: ["No","Yes"]},
        {question_id: "2", questtext: "Question 2 question 2 question 2 question 2 question 2.", questtype: "textbox", totalansw: "4", answers: []},
        {question_id: "3", questtext: "Question 3 question 3 question 3 question 3 question 3.", questtype: "checkbox", totalansw: "4", answers: ["Yellow","White","Beige","Gray"]},
        {question_id: "4", questtext: "Question 4 question 4 question 4 question 4 question 4.", questtype: "textarea", totalansw: "1", answers: []}
    ]}
];
var questionnaireslisting = [];

var cases_questionnaires = [
    {casequest_id: "1", case_id: "1", assoc_with: "1", assocwith_nameid: "1", questionnaire_id: "1", date_administered: "11/12/2016 at 10:20:17", quest_status: "3", note: "Everyone should take this."},
    {casequest_id: "2", case_id: "1", assoc_with: "2", assocwith_nameid: "1", questionnaire_id: "2", date_administered: "11/27/2016 at 12:55:03", quest_status: "4", note: "Canceled for some reason."},
    {casequest_id: "3", case_id: "2", assoc_with: "1", assocwith_nameid: "1", questionnaire_id: "1", date_administered: "12/03/2016 at 12:30:36", quest_status: "1", note: ""}
];
var this_cases_questionnaires = [];
var questanswers = [
    {questanswer_id: "1", person_id: "1", casequest_id: "1", date_complete: "11/14/2016 at 12:25:03", quest_status: "3", answers: ['{"answer1_radio":"1","answer2_radio":"2","answer3-3_checkbox":"3","answer3-3_textbox":"User option input user option input user option input user option input user option input user option input.","answer4-1":"User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1. User answer 4-1."}']}
];
var this_person_questionnaires = [];
var my_cases_questionnaires = [];




function thisExists(this_array, this_name, this_value) {
    "use strict";
    var i;
    for (i = 0; i < this_array.length; i += 1) {
        if (this_array[i][this_name] === this_value) {
            return i;
        }
    }
    return null;
}


function thisPairingExists(this_array, this_name1, this_value1, this_name2, this_value2) {
    "use strict";
    var i;
    for (i = 0; i < this_array.length; i += 1) {
        if (((this_array[i][this_name1] === this_value1) && (this_array[i][this_name2] === this_value2)) ||
                ((this_array[i][this_name1] === this_value2) && (this_array[i][this_name2] === this_value1))) {
            return i;
        }
    }
    return null;
}


function thisGroupingExists(this_array, this_name1, this_value1, this_name2, this_value2, this_name3, this_value3) {
    "use strict";
    var i;
    for (i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_name1] === this_value1) && (this_array[i][this_name2] === this_value2) && (this_array[i][this_name3] === this_value3)) {
            return i;
        }
    }
    return null;
}


function thisOrgContactExists(this_array, this_name, this_value, notthis_name) {
    "use strict";
    var i;
    for (i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_name] === this_value) && (this_array[i][notthis_name] === null)) {
            return i;
        }
    }
    return null;
}






// *************  INDEX SCREEN   ********************************************

function updateCasesPersonAssignments() {
    "use strict";
    var casesPersonAssignment = {};
    cases_person_assignment = [];
    var i, j, person_name;
    for (i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].person_id !== null) {
            j = thisExists(person, "person_id", case_assignment[i].person_id);
            if (j !== null) {
                person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                casesPersonAssignment = {cases_person_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, person_id:case_assignment[i].person_id, person_name:person_name, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:person[j].lk_person_status, start_date:case_assignment[i].start_date, end_date:case_assignment[i].end_date};
                cases_person_assignment.push(casesPersonAssignment);
            } else {
                console.log("Sorry, Person Not Found From Person Assignment!");
            }
        }
    }
    return (cases_person_assignment);
}


function updateCasesOrgAssignments() {
    "use strict";
    var casesOrgAssignment = {};
    cases_org_assignment = [];
    var i, j;
    for (i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].organization_id !== null) {
            j = thisExists(organization, "organization_id", case_assignment[i].organization_id);
            if (j !== null) {
                casesOrgAssignment = {cases_org_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, organization_id:case_assignment[i].organization_id, organization_name:organization[j].organization_name, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:organization[j].lk_organization_status, start_date:case_assignment[i].start_date, end_date:case_assignment[i].end_date};
                cases_org_assignment.push(casesOrgAssignment);
            } else {
                console.log("Sorry, Organization Not Found From Person Assignment!");
            }
        }
    }
    return (cases_org_assignment);
}


function overdueCases() {
    "use strict";
    var overduedate = new Date();
    var overdueCase = {};
    var overdue_cases = [];
    var i, duedate;
    for (i = 0; i < cases.length; i += 1) {
        if (cases[i].due_date !== "") {
            duedate = new Date(cases[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases[i].complete_date === "") && (overduedate > duedate)) {
                overdueCase = cases[i];
                overdue_cases.push(overdueCase);
            }
        }
    }
}


function overdueGoals() {
    "use strict";
    var overduedate = new Date();
    var overdueGoal = {};
    var overdue_goals = [];
    var i, duedate;
    for (i = 0; i < cases_goals.length; i += 1) {
        if (cases_goals[i].due_date !== "") {
            duedate = new Date(cases_goals[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases_goals[i].complete_date === "") && (overduedate > duedate)) {
                overdueGoal = cases_goals[i];
                overdue_goals.push(overdueGoal);
            }
        }
    }
}


function overduePlans() {
    "use strict";
    var overduedate = new Date();
    var overduePlan = {};
    var overdue_plans = [];
    var i, duedate;
    for (i = 0; i < cases_plans.length; i += 1) {
        if (cases_plans[i].due_date !== "") {
            duedate = new Date(cases_plans[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases_plans[i].complete_date === "") && (overduedate > duedate)) {
                overduePlan = cases_plans[i];
                overdue_plans.push(overduePlan);
            }
        }
    }
}


function overdueActions() {
    "use strict";
    var overduedate = new Date();
    var overdueAction = {};
    var overdue_actions = [];
    var i, duedate;
    for (i = 0; i < cases_actions.length; i += 1) {
        if (cases_actions[i].due_date !== "") {
            duedate = new Date(cases_actions[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if ((cases_actions[i].complete_date === "") && (overduedate > duedate)) {
                overdueAction = cases_actions[i];
                overdue_actions.push(overdueAction);
            }
        }
    }
}


app.get("/", function (req, res) {
    "use strict";
    updateCasesPersonAssignments();
    updateCasesOrgAssignments();
    overdueCases();
    overdueGoals();
    overduePlans();
    overdueActions();
    res.render("index", {cases:cases, organization:organization, cases_person_assignment:cases_person_assignment, cases_org_assignment:cases_org_assignment, overdue_cases:overdue_cases, overdue_goals:overdue_goals, overdue_plans:overdue_plans, overdue_actions:overdue_actions});
});


app.post("/", function (req, res) {
    "use strict";
    res.render("index", {cases:cases, organization:organization, cases_person_assignment:cases_person_assignment, cases_org_assignment:cases_org_assignment});
});




// *************  ENUMERATIONS SCREEN *********************************

//Display All Enumerations and Eumneration Form
app.get("/enumerations", function (req, res) {
    "use strict";
    res.render("enumerations/index",{enumRequired:enumRequired, enumFreeze:enumFreeze, caseDomain:caseDomain, caseCategory:caseCategory, caseStatus:caseStatus, caseSeverity:caseSeverity, casePriority:casePriority, taskType:taskType, taskStatus:taskStatus, questionnaireType:questionnaireType, questAssociatedWith:questAssociatedWith, questionnaireStatus:questionnaireStatus, caseCaseRelationship:caseCaseRelationship, assignedRole:assignedRole, assignmentType:assignmentType, goalType:goalType, planType:planType, actionType:actionType, caseFileType:caseFileType, caseNoteType:caseNoteType, userRole:userRole, userRoleStatus:userRoleStatus, personGender:personGender, personType:personType, personReligion:personReligion, identificationType:identificationType, identificationStatus:identificationStatus, organizationType:organizationType, personPersonRelationship:personPersonRelationship, personOrganizationRelationship:personOrganizationRelationship, organizationOrganizationRelationship:organizationOrganizationRelationship, contactType:contactType, contactPhoneType:contactPhoneType, contactEmailType:contactEmailType, contactFaxType:contactFaxType, contactMediaType:contactMediaType, contactAddressType:contactAddressType, contactStateCode:contactStateCode, contactCountryCode:contactCountryCode});
});


function updateEnums(enumfunctiontype, this_array, these_values) {
    "use strict";
    var i;
    if (enumfunctiontype !== "input") {
        this_array.length = 0;
    }
    for (i = 0; i < these_values.length; i += 1) {
        this_array.push(these_values[i]);
    }
    return;
}


//EDIT SPECIFIC ENUMERATION
app.post("/enumeration", function (req, res) {
    "use strict";
    var enumfunctiontype = req.body.enumfunctiontype;
    var totalenumvalues = req.body.totalenumvalues;
    var freezeenumvalues = req.body.freezeenumvalues;
    var enumname = req.body.enumname;
    var enumarray = [];
    var i;
    for (i = 1; i <= totalenumvalues; i += 1) {
        enumarray.push(req.body["userenumvalue" + i]);
    }
    if (enumname === "caseDomain") {          
        updateEnums(enumfunctiontype, caseDomain, enumarray);
        enumFreeze.top_caseDomain = freezeenumvalues;
    } else if (enumname === "caseCategory") {
        updateEnums(enumfunctiontype, caseCategory, enumarray);
        enumFreeze.top_caseCategory = freezeenumvalues;
    } else if (enumname === "caseStatus") {
        updateEnums(enumfunctiontype, caseStatus, enumarray);
        enumFreeze.top_caseStatus = freezeenumvalues;
    } else if (enumname === "caseSeverity") {
        updateEnums(enumfunctiontype, caseSeverity, enumarray);
        enumFreeze.top_caseSeverity = freezeenumvalues;
    } else if (enumname === "casePriority") {
        updateEnums(enumfunctiontype, casePriority, enumarray);
        enumFreeze.top_casePriority = freezeenumvalues;
    } else if (enumname === "caseCaseRelationship") {
        updateEnums(enumfunctiontype, caseCaseRelationship, enumarray);
        enumFreeze.top_caseCaseRelationship = freezeenumvalues;
    } else if (enumname === "personPersonRelationship") {
        updateEnums(enumfunctiontype, personPersonRelationship, enumarray);
        enumFreeze.top_personPersonRelationship = freezeenumvalues;
    } else if (enumname === "personOrganizationRelationship") {
        updateEnums(enumfunctiontype, personOrganizationRelationship, enumarray);
        enumFreeze.top_personOrganizationRelationship = freezeenumvalues;
    } else if (enumname === "organizationOrganizationRelationship") {
        updateEnums(enumfunctiontype, organizationOrganizationRelationship, enumarray);
        enumFreeze.top_organizationOrganizationRelationship = freezeenumvalues;
    } else if (enumname === "assignedRole") {
        updateEnums(enumfunctiontype, assignedRole, enumarray);
        enumFreeze.top_assignedRole = freezeenumvalues;
    } else if (enumname === "assignmentType") {
        updateEnums(enumfunctiontype, assignmentType, enumarray);
        enumFreeze.top_assignmentType = freezeenumvalues;
    } else if (enumname === "goalType") {
        updateEnums(enumfunctiontype, goalType, enumarray);
        enumFreeze.top_goalType = freezeenumvalues;
    } else if (enumname === "planType") {
        updateEnums(enumfunctiontype, planType, enumarray);
        enumFreeze.top_planType = freezeenumvalues;
    } else if (enumname === "taskType") {
        updateEnums(enumfunctiontype, taskType, enumarray);
        enumFreeze.top_taskType = freezeenumvalues;
    } else if (enumname === "taskStatus") {
        updateEnums(enumfunctiontype, taskStatus, enumarray);
        enumFreeze.top_taskStatus = freezeenumvalues;
    } else if (enumname === "actionType") {
        updateEnums(enumfunctiontype, actionType, enumarray);
        enumFreeze.top_actionType = freezeenumvalues;
    } else if (enumname === "caseFileType") {
        updateEnums(enumfunctiontype, caseFileType, enumarray);
        enumFreeze.top_caseFileType = freezeenumvalues;
    } else if (enumname === "caseNoteType") {
        updateEnums(enumfunctiontype, caseNoteType, enumarray);
        enumFreeze.top_caseNoteType = freezeenumvalues;
    } else if (enumname === "questionnaireType") {
        updateEnums(enumfunctiontype, questionnaireType, enumarray);
        enumFreeze.top_questionnaireType = freezeenumvalues;
    } else if (enumname === "questAssociatedWith") {
        updateEnums(enumfunctiontype, questAssociatedWith, enumarray);
        enumFreeze.top_questAssociatedWith = freezeenumvalues;
    } else if (enumname === "questionnaireStatus") {
        updateEnums(enumfunctiontype, questionnaireStatus, enumarray);
        enumFreeze.top_questionnaireStatus = freezeenumvalues;
    } else if (enumname === "personGender") {
        updateEnums(enumfunctiontype, personGender, enumarray);
        enumFreeze.top_personGender = freezeenumvalues;
    } else if (enumname === "userRole") {
        updateEnums(enumfunctiontype, userRole, enumarray);
        enumFreeze.top_userRole = freezeenumvalues;
    } else if (enumname === "userRoleStatus") {
        updateEnums(enumfunctiontype, userRoleStatus, enumarray);
        enumFreeze.top_userRoleStatus = freezeenumvalues;
    } else if (enumname === "personType") {
        updateEnums(enumfunctiontype, personType, enumarray);
        enumFreeze.top_personType = freezeenumvalues;
    } else if (enumname === "personReligion") {
        updateEnums(enumfunctiontype, personReligion, enumarray);
        enumFreeze.top_personReligion = freezeenumvalues;
    } else if (enumname === "organizationType") {
        updateEnums(enumfunctiontype, organizationType, enumarray);
        enumFreeze.top_organizationType = freezeenumvalues;
    } else if (enumname === "contactType") {
        updateEnums(enumfunctiontype, contactType, enumarray);
        enumFreeze.top_contactType = freezeenumvalues;
    } else if (enumname === "contactPhoneType") {
        updateEnums(enumfunctiontype, contactPhoneType, enumarray);
        enumFreeze.top_contactPhoneType = freezeenumvalues;
    } else if (enumname === "contactEmailType") {
        updateEnums(enumfunctiontype, contactEmailType, enumarray);
        enumFreeze.top_contactEmailType = freezeenumvalues;
    } else if (enumname === "contactFaxType") {
        updateEnums(enumfunctiontype, contactFaxType, enumarray);
        enumFreeze.top_contactFaxType = freezeenumvalues;
    } else if (enumname === "contactMediaType") {
        updateEnums(enumfunctiontype, contactMediaType, enumarray);
        enumFreeze.top_contactMediaType = freezeenumvalues;
    } else if (enumname === "contactAddressType") {
        updateEnums(enumfunctiontype, contactAddressType, enumarray);
        enumFreeze.top_contactAddressType = freezeenumvalues;
    } else if (enumname === "contactStateCode") {
        updateEnums(enumfunctiontype, contactStateCode, enumarray);
        enumFreeze.top_contactStateCode = freezeenumvalues;
    } else if (enumname === "contactCountryCode") {
        updateEnums(enumfunctiontype, contactCountryCode, enumarray);
        enumFreeze.top_contactCountryCode = freezeenumvalues;
    } else if (enumname === "identificationType") {
        updateEnums(enumfunctiontype, identificationType, enumarray);
        enumFreeze.top_identificationType = freezeenumvalues;
    } else {
        if (enumname === "identificationStatus") {
            updateEnums(enumfunctiontype, identificationStatus, enumarray);
            enumFreeze.top_identificationStatus = freezeenumvalues;
        }
    }   
    res.redirect("/enumerations");
});



// *************  CASE SCREEN *********************************

// DISPLAY CASE INPUT FORM
app.get("/case", function (req, res) {
    "use strict";
    res.render("case/index1",{caseDomain:caseDomain, caseCategory:caseCategory, caseStatus:caseStatus, caseSeverity:caseSeverity, casePriority:casePriority});
});


// CREATE CASE
app.post("/case", function (req, res) {
    "use strict";
    var title = (req.body.casetitle).trim();
    var description = (req.body.casedescription).trim();
    var domain = req.body.casedomain;
    var category = req.body.casecategory;
    var casetype = req.body.casetype;
    var casestatus = req.body.casestatus;
    var severity = req.body.caseseverity;
    var priority = req.body.casepriority;
    var startdate = req.body.casestartdate;
    var duedate = req.body.caseduedate;
//    if ((title !== "") && (domain !== "0") && (category !== "0") && (casetype !== "0") && (casestatus !== "0") && (severity !== "0") && (priority !== "0") && (startdate !== "") && (duedate !== "")) {
    if (title !== "") {
        var j = cases.length - 1;
        if (j >= 0) {
            var caseid = (parseInt(cases[j].case_id,10) + 1);
            caseid = caseid.toString();
        } else {
            caseid = "1";
        }
        var newCase = {case_id: caseid, case_title: title, case_description: description, lk_case_domain: domain, lk_case_category: category, lk_case_type: casetype,  lk_case_status: casestatus, lk_case_severity: severity, lk_case_priority: priority, 
        start_date: startdate, due_date: duedate, complete_date: ""};
        cases.push(newCase);
        mkdirp("uploads/assets2/case_" + caseid + "/goalfiles/", function (err) {
            if (err) {
                console.error(err);
            }
        });
        mkdirp("uploads/assets2/case_" + caseid + "/planfiles/", function (err) {
            if (err) {
                console.error(err);
            }
        });
        mkdirp("uploads/assets2/case_" + caseid + "/actionfiles/", function (err) {
            if (err) {
                console.error(err);
            }
        });
        mkdirp("uploads/assets2/case_" + caseid + "/casefiles/", function (err) {
            if (err) {
                console.error(err);
            }
        });
        res.redirect("/case/" + caseid);
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/case");
    }
});


function updateRelatedCases(caseid) {
    "use strict";
    var thiscaseid = caseid;
    var relatedCase = {};
    thisrelatedcase = [];
    var has_relationship = thisExists(case_case_relationship, "case_id1", thiscaseid);
    if (has_relationship === null) {
        has_relationship = thisExists(case_case_relationship, "case_id2", thiscaseid);
    }
    if (has_relationship !== null) {
        var i, j;
        for (i = 0; i < case_case_relationship.length; i += 1) {
            if (case_case_relationship[i].case_id1 === thiscaseid) {
                j = thisExists(cases, "case_id", case_case_relationship[i].case_id2);
            } else {
                if (case_case_relationship[i].case_id2 === thiscaseid) {
                    j = thisExists(cases, "case_id", case_case_relationship[i].case_id1);
                }
            }
            if (j !== null) {
                relatedCase = {thisrelatedcase_id:case_case_relationship[i].case_relationship_id, case_id1:thiscaseid, case_id2:cases[j].case_id, case_title:cases[j].case_title, lk_case_relationship_type:case_case_relationship[i].lk_case_relationship_type};
                thisrelatedcase.push(relatedCase);
            }
        }
    }
    return (thisrelatedcase);
}


function updatePersonAssignments(caseid) {
    "use strict";
    var case_id = caseid;
    var person_status = "1";
    var personAssignment = {};
    person_assignment = [];
    thiscaseperson = [];
    var thisCasePerson = {};
    var i, j, person_name, primary_phone, this_phone, primary_email, this_email;
    var primary_address, primary_city, primary_state, primary_zipcode, primary_statecode, primary_countrycode, this_address;
    for (i = 0; i < case_assignment.length; i += 1) {
        if ((case_assignment[i].case_id === case_id) && (case_assignment[i].person_id !== null)) {
            j = thisExists(person, "person_id", case_assignment[i].person_id);
            if (j !== null) {
                person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
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
                personAssignment = {case_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, person_id:case_assignment[i].person_id, person_name:person_name, primary_phone:primary_phone, primary_email:primary_email, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:person[j].lk_person_status, start_date:case_assignment[i].start_date, end_reason:case_assignment[i].end_reason, end_date:case_assignment[i].end_date};
                person_assignment.push(personAssignment);
                if (case_assignment[i].lk_assigned_role === "1") {
                    primary_address = "";
                    primary_city = "";
                    primary_state = "";
                    primary_zipcode = "";
                    primary_statecode = "";
                    primary_countrycode = "";
                    this_address = thisExists(contact_address, "person_id", case_assignment[i].person_id);
                    if (this_address !== null) {    
                        primary_address = contact_address[this_address].address;
                        primary_city = contact_address[this_address].city;
                        primary_state = contact_address[this_address].lk_state;
                        primary_zipcode = contact_address[this_address].zipcode;
                        primary_statecode = contact_address[this_address].lk_statecode;
                        primary_countrycode = contact_address[this_address].lk_countrycode;
                    }
                    thisCasePerson = {case_id:caseid, person_id:case_assignment[i].person_id, person_name:person_name, gender:person[j].lk_gender, birthdate:person[j].birth_date, primary_phone:primary_phone, primary_email:primary_email, address:primary_address, city:primary_city, state:primary_state, zipcode:primary_zipcode, statecode:primary_statecode, countrycode:primary_countrycode};
                    thiscaseperson.push(thisCasePerson);
                }
            } else {
                console.log("No Person Assignment!");
            }
        }
    }
    return (person_assignment, thiscaseperson);
}


function updateOrganizationAssignments(caseid) {
    "use strict";
    var case_id = caseid;
    var organization_status = "1";
    var organizationAssignment = {};
    organization_assignment = [];
    var i, j;
    var primary_phone, this_phone, primary_email, this_email;
    for (i = 0; i < case_assignment.length; i += 1) {
        if ((case_assignment[i].case_id === case_id) && (case_assignment[i].organization_id !== null)) {
            j = thisExists(organization, "organization_id", case_assignment[i].organization_id);
            if (j !== null) {
                primary_phone = "";
                this_phone = thisOrgContactExists(contact_phone, "organization_id", case_assignment[i].organization_id, "person_id");
                if (this_phone !== null) {       
                    primary_phone = contact_phone[this_phone].phone_number;
                }
                primary_email = "";
                this_email = thisOrgContactExists(contact_email, "organization_id", case_assignment[i].organization_id, "person_id");
                if (this_email !== null) {       
                    primary_email = contact_email[this_email].email_address;
                }
                organizationAssignment = {case_assignment_id:case_assignment[i].case_assignment_id, case_id:case_assignment[i].case_id, organization_id:case_assignment[i].organization_id, organization_name:organization[j].organization_name, primary_phone:primary_phone, primary_email:primary_email, lk_assigned_role:case_assignment[i].lk_assigned_role, lk_case_assignment_type:case_assignment[i].lk_case_assignment_type, lk_status:organization[j].lk_organization_status, start_date:case_assignment[i].start_date, end_reason:case_assignment[i].end_reason, end_date:case_assignment[i].end_date};
                organization_assignment.push(organizationAssignment);
            } else {
                console.log("Sorry, Organization Not Found From Organization Assignment!");
            }
        }
    }
    return (organization_assignment);
}


function updateThisCasesGoals(caseid) {
    "use strict";
    var caseid = caseid;
    this_cases_goals = [];
    var j;
    for (j = 0; j < cases_goals.length; j += 1) {
        if (cases_goals[j].case_id === caseid) {
            this_cases_goals.push(cases_goals[j]);
        }
    }
    return (this_cases_goals);
}


function updateThisCasesPlans(caseid) {
    "use strict";
    var caseid = caseid;
    this_cases_plans = [];
    var assocgoalname = "";
    var i, j, found_associatedgoal;
    for (j = 0; j < cases_plans.length; j += 1) {
        if (cases_plans[j].case_id === caseid) {
            if (cases_plans[j].assocgoal_id !== "0") {
                found_associatedgoal = false;
                for (i = 0; i < cases_goals.length; i += 1) {
                    if (cases_plans[j].assocgoal_id === cases_goals[i].goal_id) {
                        assocgoalname = cases_goals[i].name;
                        found_associatedgoal = true;
                    }
                }
                if (found_associatedgoal === true) {
                    this_cases_plans.push(cases_plans[j]);
                } else {
                    console.log("Eror, Associated Goal Not Found for " + cases_plans[j].plan_id + "!");        
                }
            } else {
                console.log("Eror, Plan " + cases_plans[j].plan_id + " does not have Associated Goal!");                        
            }
        }
    }
    return (this_cases_plans);
}


function updateThisCasesActions(caseid) {
    "use strict";
    var caseid = caseid;
    this_cases_actions = [];
    var assocplanname = "";
    var i, j, found_associatedplan;
    for (j = 0; j < cases_actions.length; j += 1) {
        if (cases_actions[j].case_id === caseid) {
            if (cases_actions[j].assocplan_id !== "0") {
                found_associatedplan = false;
                for (i = 0; i < cases_plans.length; i += 1) {
                    if (cases_actions[j].assocplan_id === cases_plans[i].plan_id) {
                        assocplanname = cases_plans[i].name;
                        found_associatedplan = true;
                    }
                }
                if (found_associatedplan = true) {
                    this_cases_actions.push(cases_actions[j]);
                } else {
                    console.log("Eror, Associated Plan Not Found for " + cases_actions[j].action_id + "!");        
                }
            } else {
                console.log("Eror, Action " + cases_actions[j].action_id + " does not have Associated Plan!");                        
            }
        }
    }
    return (this_cases_actions);
}


function updateTasksCaseListing(caseid) {
    "use strict";
    var caseid = caseid;
    var caselisting = {};
    taskscaselisting = [];
    var k = thisExists(cases, "case_id", caseid);
    var i, j, person_name;
    if (k !== null) {
        for (i = 0; i < tasks.length; i += 1) {
            k = thisExists(cases, "case_id", tasks[i].case_id);       
            if (k !== null) {
                j = thisExists(person, "person_id", tasks[i].person_id);
                if ((k !== null) && (j !== null)) {
                    person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                    caselisting = {task_id:tasks[i].task_id, subject:tasks[i].subject, type:tasks[i].type, priority:tasks[i].priority, person_id:tasks[i].person_id, person_name:person_name, case_id:tasks[i].case_id, start_date:tasks[i].start_date, due_date:tasks[i].due_date, complete_date:tasks[i].complete_date, task_status:tasks[i].task_status, note:tasks[i].note};
                    taskscaselisting.push(caselisting);
                }
            }
        }
        return (taskscaselisting);
    }
}


function updateThisCasesFiles(caseid) {
    "use strict";
    var caseid = caseid;
    this_cases_files = [];
    var j;
    for (j = 0; j < cases_casefiles.length; j += 1) {
        if (cases_casefiles[j].case_id === caseid) {
            this_cases_files.push(cases_casefiles[j]);
        }
    }
    return (this_cases_files);
}


function updateThisCasesNotes(caseid) {
    "use strict";
    var caseid = caseid;
    this_cases_notes = [];
    var j;
    for (j = 0; j < cases_casenotes.length; j += 1) {
        if (cases_casenotes[j].case_id === caseid) {
            this_cases_notes.push(cases_casenotes[j]);
        }
    }
    return (this_cases_notes);
}


function updateThisCasesQuestionnaires(caseid) {
    "use strict";
    var caseid = caseid;
    var caseQuestionnaire = {};
    this_cases_questionnaires = [];
    var i, j, k, found_questionnaire, totalquestassigned, startedquestusers, completedquestusers;
    for (i = 0; i < cases_questionnaires.length; i += 1) {
        if (cases_questionnaires[i].case_id === caseid) {
            found_questionnaire = false;
            j = -1;
            while ((found_questionnaire === false) && (j < questionnaire.length - 1)) {
                j += 1;
                totalquestassigned = 0;
                startedquestusers = 0;
                completedquestusers = 0;
                if (cases_questionnaires[i].questionnaire_id === questionnaire[j].questionnaire_id) {                    
                    found_questionnaire = true;
                    for (k = 0; k < questanswers.length; k += 1) {
                        if (questanswers[k].casequest_id === cases_questionnaires[i].casequest_id) {
                            totalquestassigned += 1;
                            if (questanswers[k].quest_status === "3") {
                                completedquestusers += 1;
                            } else {
                                startedquestusers += 1;
                            }
                        }
                    }
                }
            }
            if (found_questionnaire === true) {
                caseQuestionnaire = {casequest_id:cases_questionnaires[i].casequest_id, questionnaire_id:cases_questionnaires[i].questionnaire_id, quest_name:questionnaire[j].name, quest_type:questionnaire[j].quest_type, case_id:cases_questionnaires[i].case_id, assoc_with:cases_questionnaires[i].assoc_with, assocwith_nameid:cases_questionnaires[i].assocwith_nameid, date_administered:cases_questionnaires[i].date_administered, quest_status:cases_questionnaires[i].quest_status, note:cases_questionnaires[i].note, totalquestassigned:totalquestassigned, startedquestusers:startedquestusers, completedquestusers:completedquestusers};
                this_cases_questionnaires.push(caseQuestionnaire);
            } else {
                console.log("Questionnaire with ID " + cases_questionnaires[i].questionnaire_id + " not found!")
            }
        }
    }
    return (this_cases_questionnaires);
}


// DISPLAY SPECIFC CASE
app.get("/case/:case_id", function (req, res) {
    "use strict";
    var caseid = req.params.case_id;
    thiscaseperson = [];
    var j = thisExists(cases, "case_id", caseid);
    if (j !== null) {
        updateRelatedCases(caseid);
        updatePersonAssignments(caseid);
        updateOrganizationAssignments(caseid);
        updateThisCasesGoals(caseid);   
        updateThisCasesPlans(caseid);
        updateThisCasesActions(caseid);
        updateTasksCaseListing(caseid);
        updateThisCasesFiles(caseid);
        updateThisCasesNotes(caseid);
        updateThisCasesQuestionnaires(caseid);
        res.render("case/index2",{thiscase:cases[j], caseDomain:caseDomain, caseCategory:caseCategory, caseStatus:caseStatus, caseSeverity:caseSeverity, casePriority:casePriority, caseCaseRelationship:caseCaseRelationship, assignedRole:assignedRole, assignmentType:assignmentType, goalType:goalType, planType:planType, taskType:taskType, taskStatus:taskStatus, actionType:actionType, caseFileType:caseFileType, caseNoteType:caseNoteType, questionnaireType:questionnaireType, questAssociatedWith:questAssociatedWith, questionnaireStatus:questionnaireStatus, cases:cases, person:person, organization:organization, thiscaseperson:thiscaseperson, thisrelatedcase:thisrelatedcase, person_assignment:person_assignment, organization_assignment:organization_assignment, this_cases_goals:this_cases_goals, this_cases_plans:this_cases_plans, this_cases_actions:this_cases_actions, taskscaselisting:taskscaselisting, this_cases_files:this_cases_files, this_cases_notes:this_cases_notes, questionnaire:questionnaire, this_cases_questionnaires:this_cases_questionnaires});
    } else {
        req.flash("error", "Sorry, Case Not Found!");
        res.redirect("back");
    }
});


// EDIT SPECIFIC CASE
app.put("/case/:case_id", function (req, res) {
    "use strict";
    var caseid = req.params.case_id;
    var title = (req.body.casetitle).trim();
    var description = (req.body.casedescription).trim();
    var domain = req.body.casedomain;
    var category = req.body.casecategory;
    var casetype = req.body.casetype;
    var casestatus = req.body.casestatus;
    var severity = req.body.caseseverity;
    var priority = req.body.casepriority;
    var startdate = req.body.casestartdate;
    var duedate = req.body.caseduedate;
    var completedate = req.body.casecompletedate;
//    if ((title !== "") && (domain !== "0") && (category !== "0") && (casetype !== "0") && (casestatus !== "0") && (severity !== "0") && (priority !== "0") && (startdate !== "") && (duedate !== "")) {
    if (title !== "") {
        var j = thisExists(cases, "case_id", caseid);
        if (j !== null) {
            var editCase = {case_id: caseid, case_title: title, case_description: description, lk_case_domain: domain, lk_case_category: category, lk_case_type: casetype,  lk_case_status: casestatus, lk_case_severity: severity, lk_case_priority: priority, 
        start_date: startdate, due_date: duedate, complete_date: completedate};
            cases[j] = editCase;
            res.redirect("/case/" + caseid);
        } else {
            req.flash("error", "Sorry, error updating Case!");
            res.redirect("/case/" + caseid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/case/" + caseid);
    }
});


// DELETE SPECIFIC CASE
app.delete("/case/:case_id", function (req, res) {
    "use strict";
    res.redirect("/");    
});




// *************  TASKS SCREEN ***************************************************

function updateTasksListing() {
    "use strict";
    var listing = {};
    taskslisting = [];
    var i, j, k, person_name;
    for (i = 0; i < tasks.length; i += 1) {
        j = thisExists(person, "person_id", tasks[i].person_id);
        if (j !== null) {
            person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
            k = thisExists(cases, "case_id", tasks[i].case_id);
        }
        if ((j !== null) && (k !== null)) {
            listing = {task_id:tasks[i].task_id, subject:tasks[i].subject, type:tasks[i].type, priority:tasks[i].priority, person_id:tasks[i].person_id, person_name:person_name, case_id:tasks[i].case_id, case_title:cases[k].case_title, start_date:tasks[i].start_date, due_date:tasks[i].due_date, complete_date:tasks[i].complete_date, task_status:tasks[i].task_status, note:tasks[i].note};
            taskslisting.push(listing);
        }
    }
    return (taskslisting);
}


function overdueTasks() {
    "use strict";
    var overduedate = new Date();
    var overdueTask = {};
    overdue_tasks = [];
    var i, duedate;
    for (i = 0; i < tasks.length; i += 1) {
        if (tasks[i].due_date !== "") {
            duedate = new Date(tasks[i].due_date);
            duedate.setDate(duedate.getDate() + 1);
            if (((tasks[i].complete_date === "") && (overduedate > duedate)) || (tasks[i].task_status === "5")) {
                overdueTask = tasks[i];
                overdue_tasks.push(overdueTask);
            }
        }
    }
}


app.get("/tasks", function (req, res) {
    "use strict";
    updateTasksListing();
    overdueTasks();
    res.render("tasks/index", {taskslisting:taskslisting, person:person, cases:cases, overdue_tasks:overdue_tasks, taskType:taskType, taskStatus:taskStatus, casePriority:casePriority});
});


app.post("/tasks", function (req, res) {
    "use strict";
    updateTasksListing();
    overdueTasks();
    res.render("tasks/index", {taskslisting:taskslisting, person:person, cases:cases, overdue_tasks:overdue_tasks, taskType:taskType, taskStatus:taskStatus, casePriority:casePriority});
});


//CREATE TASK
app.post("/task", function (req, res) {
    "use strict";
    var tasksubject = (req.body.tasksubject).trim();
    var tasktype = req.body.tasktype;
    var taskpriority = req.body.taskpriority;
    var taskstartdate = req.body.taskstartdate;
    var taskduedate = req.body.taskduedate;
    var taskcompletedate = req.body.taskcompletedate;
    var taskstatus = req.body.taskstatus;
    var taskassignedperson = req.body.taskassignedperson;
    var taskcaseid = req.body.taskcaseid;
    var tasknote = (req.body.tasknote).trim();
//    if ((tasksubject !== "") && (tasktype !== "0") && (taskpriority !== "0") && (taskstartdate !== "") && (taskduedate !== "") && (taskassignedperson !== "0") && (taskcaseid !== "0") && (taskstatus !== "0")) {
    if (tasksubject !== "") {
        var j = tasks.length - 1;
        if (j >= 0) {
            var taskid = parseInt(tasks[j].task_id,10) + 1;
            taskid = taskid.toString();
        } else {
            taskid = "1";
        }       
        var newTask = {task_id: taskid, subject: tasksubject, type: tasktype, priority: taskpriority, person_id: taskassignedperson, case_id: taskcaseid, start_date: taskstartdate, due_date: taskduedate, complete_date: taskcompletedate, task_status: taskstatus, note: tasknote};
        tasks.push(newTask);
        res.redirect("back");
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


//EDIT TASK
app.put("/task/:task_id", function (req, res) {
    "use strict";
    var taskid = req.params.task_id;
    var tasksubject = (req.body.tasksubject).trim();
    var tasktype = req.body.tasktype;
    var taskpriority = req.body.taskpriority;
    var taskstartdate = req.body.taskstartdate;
    var taskduedate = req.body.taskduedate;
    var taskcompletedate = req.body.taskcompletedate;
    var taskstatus = req.body.taskstatus;
    var taskassignedperson = req.body.taskassignedperson;
    var taskcaseid = req.body.taskcaseid;
    var tasknote = (req.body.tasknote).trim();
//    if ((tasksubject !== "") && (tasktype !== "0") && (taskpriority !== "0") && (taskstartdate !== "") && (taskduedate !== "") && (taskassignedperson !== "0") && (taskcaseid !== "0") && (taskstatus !== "0")) {
    if (tasksubject !== "") {
        var j = thisExists(tasks, "task_id", taskid);
        if (j !== null) {
            var editTask = {task_id: taskid, subject: tasksubject, type: tasktype, priority: taskpriority, person_id: taskassignedperson, case_id: taskcaseid, start_date: taskstartdate, due_date: taskduedate, complete_date: taskcompletedate, task_status: taskstatus, note: tasknote};
            tasks[j] = editTask;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, error updating Task.");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});





//  ******************  RELATED CASES  *******************************

app.post("/relatedcase", function (req, res) {
    "use strict";
    var caseid1 = req.body.relatedcase_id1;
    var caseid2 = req.body.relatedcase_id2;
    if ((caseid1 !== "0") && (caseid2 !== "0")) {
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
                req.flash("error", "Error: These cases are already related.");
                res.redirect("back");
            }
        } else {
            req.flash("error", "Error: A case may not be related to itself.");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});



// ***********************  CASE ASSIGNMENTS  **************************************************

function thisAssignmentExists(this_array, this_caseid, this_case_value, this_assignee, this_assignee_value, this_role, this_role_value, this_type, this_type_value) {
    "use strict";
    var i;
    for (i = 0; i < this_array.length; i += 1) {
        if ((this_array[i][this_caseid] === this_case_value) && (this_array[i][this_assignee] === this_assignee_value) && (this_array[i][this_role] === this_role_value) && (this_array[i][this_type] === this_type_value)) {
            return i;
        }
    }
    return null;
}

// CREATE PERSON CASE ASSIGNMENT

app.post("/personassignment", function (req, res) {
    "use strict";
    var caseid = req.body.personassign_caseid;
    var personid = req.body.personassignpersonid;
    var assignedrole = req.body.personassignrole;
    var assignmenttype = req.body.personassigntype;
//    if ((personid !== "0") && (assignedrole !== "0") && (assignmenttype !== "0")) {
    if ((personid !== "0") && (assignedrole !== "0")) {
        var has_assignment = thisAssignmentExists(case_assignment, "case_id", caseid, "person_id", personid, "lk_assigned_role", assignedrole, "lk_case_assignment_type", assignmenttype);
        if (has_assignment === null) {
            var start_date = new Date();
            var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
            var endreason = "";
            var enddate = "";
            var orgid = null;
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
            req.flash("error", "Error: Person assignment already exists!");
            res.redirect("/case/" + caseid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// EDIT PERSON ASSIGNMENT

app.put("/personassignment/:case_assignment_id", function (req, res) {
    "use strict";
    var caseassignmentid = req.params.case_assignment_id;
    var caseid = req.body.personassign_caseid;
    var personid = req.body.personassignpersonid;
    var assignedrole = req.body.personassignrole;
    var assignmenttype = req.body.personassigntype;
    var orgid = null;
    var endreason = (req.body.personassignmentendreason).trim();
//    if ((personid !== "0") && (assignedrole !== "0") && (assignmenttype !== "0")) {
    if ((personid !== "0") && (assignedrole !== "0")) {
        var end_date = new Date();
        var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
        var j = thisExists(case_assignment, "case_assignment_id", caseassignmentid);
        if (j !== null) {
            var startdate = case_assignment[j].start_date;
            var editCaseAssignment = {case_assignment_id:caseassignmentid, case_id:caseid, person_id:personid, organization_id:orgid, lk_assigned_role:assignedrole, lk_case_assignment_type:assignmenttype, start_date:startdate, end_reason:endreason, end_date:enddate};
            case_assignment[j] = editCaseAssignment;
            res.redirect("/case/" + caseid);
        } else {
            req.flash("error", "Sorry, error updating Person Assignment.");
            res.redirect("/case/" + caseid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// CREATE ORGANIZATION CASE ASSIGNMENT

app.post("/organizationassignment", function (req, res) {
    "use strict";
    var caseid = req.body.organizationassign_caseid;
    var organizationid = req.body.organizationassignorgid;
    var assignedrole = req.body.organizationassignrole;
    var assignmenttype = req.body.organizationassigntype;
//    if ((organizationid !== "0") && (assignedrole !== "0") && (assignmenttype !== "0")) {
    if ((organizationid !== "0") && (assignedrole !== "0")) {
        var has_assignment = thisAssignmentExists(case_assignment, "case_id", caseid, "organization_id", organizationid, "lk_assigned_role", assignedrole, "lk_case_assignment_type", assignmenttype);
        if (has_assignment === null) {
            var start_date = new Date();
            var startdate = (start_date.getMonth() + 1) + "/" + start_date.getDate() + "/" + start_date.getFullYear();
            var endreason = "";
            var enddate = "";
            var personid = null;
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
            req.flash("error", "Organization assignment already exists!");
            res.redirect("/case/" + caseid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// EDIT ORGANIZATION ASSIGNMENT

app.put("/organizationassignment/:case_assignment_id", function (req, res) {
    "use strict";
    var caseassignmentid = req.params.case_assignment_id;
    var caseid = req.body.organizationassign_caseid;
    var organizationid = req.body.organizationassignorgid;
    var assignedrole = req.body.organizationassignrole;
    var assignmenttype = req.body.organizationassigntype;
    var personid = null;
    var endreason = (req.body.organizationassignmentendreason).trim();
//    if ((organizationid !== "0") && (assignedrole !== "0") && (assignmenttype !== "0")) {
    if ((organizationid !== "0") && (assignedrole !== "0")) {
        var end_date = new Date();
        var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
        var j = thisExists(case_assignment, "case_assignment_id", caseassignmentid);
        if (j !== null) {
            var startdate = case_assignment[j].start_date;
            var editCaseAssignment = {case_assignment_id:caseassignmentid, case_id:caseid, person_id:personid, organization_id:organizationid, lk_assigned_role:assignedrole, lk_case_assignment_type:assignmenttype, start_date:startdate, end_reason:endreason, end_date:enddate};
            case_assignment[j] = editCaseAssignment;
            res.redirect("/case/" + caseid);
        } else {
            req.flash("error", "Sorry, error updating Organization Assignment!");
            res.redirect("/case/" + caseid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});



// ****************** UPLOAD FILES ************************************************************************

var storageFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/assets2/");
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "_" + file.originalname);
  }
});

var uploadFile = multer({ storage : storageFile}).array("userFile",10);


//**** DOWNLOAD FILE **********************************************

app.get("/download/:case_id/:section/:urlfile", function (req, res) {
    "use strict";
    var caseid = req.params.case_id;
    var section = req.params.section;
    var urlfile = req.params.urlfile;
    var file = __dirname + "/uploads/assets2/case_" + caseid + "/" + section + "/" + urlfile;
    res.download(file);
});




// ******************* CASE - Goals  ************************************

// CREATE GOAL

app.post("/goal", function (req, res) {
    "use strict";
    var caseid = req.body.goalcaseid;
    var goalname = (req.body.goalname).trim();
    var goaltype = req.body.goaltype;
    var goalpriority = req.body.goalpriority;
    var goalstartdate = req.body.goalstartdate;
    var goalduedate = req.body.goalduedate;
    var goalassignedpersonid = req.body.goalassignedpersonid;
    var goalnote = (req.body.goalnote).trim();
//    if ((goalname !== "") && (goaltype !== "0") && (goalpriority !== "0") && (goalstartdate !== "") && (goalduedate !== "") && (goalassignedpersonid !== "0")) {
    if (goalname !== "") {
        var goalcompletedate = "";
        var goaldoc = [];
        var j = cases_goals.length - 1;
        if (j >= 0) {
            var goalid = parseInt(cases_goals[j].goal_id,10) + 1;
            goalid = goalid.toString();
        } else {
            goalid = "1";
        }
        var newCasesGoal = {goal_id: goalid, case_id: caseid, name:goalname, type:goaltype, priority:goalpriority, start_date:goalstartdate, due_date:goalduedate, complete_date:goalcompletedate, assignedperson_id:goalassignedpersonid, note:goalnote, goal_doc:goaldoc};
        cases_goals.push(newCasesGoal);
        res.redirect("back");
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// EDIT GOAL

app.put("/goal/:goal_id", function (req, res) {
    "use strict";
    var goalid = req.params.goal_id;
    var caseid = req.body.goalcaseid;
    var goalname = (req.body.goalname).trim();
    var goaltype = req.body.goaltype;
    var goalpriority = req.body.goalpriority;
    var goalstartdate = req.body.goalstartdate;
    var goalduedate = req.body.goalduedate;
    var goalcompletedate = req.body.goalcompletedate;
    var goalassignedpersonid = req.body.goalassignedpersonid;
    var goalnote = (req.body.goalnote).trim();
//    if ((goalname !== "") && (goaltype !== "0") && (goalpriority !== "0") && (goalstartdate !== "") && (goalduedate !== "") && (goalassignedpersonid !== "0")) {
    if (goalname !== "") {
        var i = thisExists(cases_goals, "goal_id", goalid);
        if (i !== null) {
            var goaldoc = cases_goals[i].goal_doc;
            var editCasesGoal = {goal_id: goalid, case_id: caseid, name:goalname, type:goaltype, priority:goalpriority, start_date:goalstartdate, due_date:goalduedate, complete_date:goalcompletedate, assignedperson_id:goalassignedpersonid, note:goalnote, goal_doc:goaldoc};
            cases_goals[i] = editCasesGoal;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, error updating Case Goal!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// UPLOAD GOAL DOC

app.post("/goal/upload/:goal_id", function (req, res) {
    "use strict";
    uploadFile(req, res, function (err) {
        if (err) {
            req.flash("error", "Error uploading File!");
            res.redirect("back");
        } else {
            var goalid = req.params.goal_id;
            var caseid = req.body.uploadgoalcase_id;
            var f;
            var i = thisExists(cases_goals, "goal_id", goalid);
            if (i !== null) {
                if (req.files.length < 1) {
                    req.flash("error", "No file submitted for upload!");
                    res.redirect("back");
                } else {
                    for (f = 0; f < req.files.length; f += 1) {
                        fs.rename("/node_exercises/CMS_demo/uploads/assets2/" + req.files[f].filename, "/node_exercises/CMS_demo/uploads/assets2/case_" + caseid + "/goalfiles/" + req.files[f].filename, function (err) {
                            if (err) {
                                req.flash("error", "File Directory Error!");
                                res.redirect("back");
                            }
                        });
                        cases_goals[i].goal_doc.push(req.files[f].filename);
                    }
                    res.redirect("back");                    
                }
            } else {
                req.flash("error", "Sorry, Case Goal Not Found!");
                res.redirect("back");
            }
        }
    });
});



// REMOVE GOAL DOC ---- UPDATE THIS FUNCTION for MySQL to handle goal_doc array !!!!!!!!!!!!!!!!!!!!

app.post("/goal/removedoc/:goal_id/:doc_position", function (req, res) {
    "use strict";
    var goalid = req.params.goal_id;
    var goaldocposition = req.params.doc_position;
    var i = thisExists(cases_goals, "goal_id", goalid);
    if (i !== null) {
        cases_goals[i].goal_doc.splice(goaldocposition, 1);
        res.redirect("back");
    } else {
        req.flash("error", "Sorry, Goal Doc Not Found!");
        res.redirect("back");
    }      
});



// ******************* CASE - Plans  ************************************

// CREATE PLAN

app.post("/plan", function (req, res) {
    "use strict";
    var caseid = req.body.plancaseid;
    var planname = (req.body.planname).trim();
    var plantype = req.body.plantype;
    var planpriority = req.body.planpriority;
    var planstartdate = req.body.planstartdate;
    var planduedate = req.body.planduedate;
    var assocgoalid = req.body.assocgoalid;
    var planassignedpersonid = req.body.planassignedpersonid;
    var plannote = (req.body.plannote).trim();
//    if ((planname !== "") && (plantype !== "0") && (planpriority !== "0") && (planstartdate !== "") && (planduedate !== "") && (assocgoalid !== "0") && (planassignedpersonid !== "0")) {
    if ((planname !== "") && (assocgoalid !== "0")) {
        var plancompletedate = "";
        var plandoc = [];
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
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// EDIT PLAN

app.put("/plan/:plan_id", function (req, res) {
    "use strict";
    var planid = req.params.plan_id;
    var caseid = req.body.plancaseid;
    var planname = (req.body.planname).trim();
    var plantype = req.body.plantype;
    var planpriority = req.body.planpriority;
    var planstartdate = req.body.planstartdate;
    var planduedate = req.body.planduedate;
    var plancompletedate = req.body.plancompletedate;
    var assocgoalid = req.body.assocgoalid;
    var planassignedpersonid = req.body.planassignedpersonid;
    var plannote = (req.body.plannote).trim();
//    if ((planname !== "") && (plantype !== "0") && (planpriority !== "0") && (planstartdate !== "") && (planduedate !== "") && (assocgoalid !== "0") && (planassignedpersonid !== "0")) {
    if ((planname !== "") && (assocgoalid !== "0")) {
        var i = thisExists(cases_plans, "plan_id", planid);
        if (i !== null) {
            var plandoc = cases_plans[i].plan_doc;
            var editCasesPlan = {plan_id: planid, case_id: caseid, name:planname, type:plantype, priority:planpriority, start_date:planstartdate, due_date:planduedate, complete_date:plancompletedate, assocgoal_id:assocgoalid, assignedperson_id:planassignedpersonid, note:plannote, plan_doc:plandoc};
            cases_plans[i] = editCasesPlan;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Case Plan Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// UPLOAD PLAN DOC

app.post("/plan/upload/:plan_id", function (req, res) {
    "use strict";
    uploadFile(req, res, function (err) {
        if (err) {
            req.flash("error", "Error Uploading File(s)!");
            res.redirect("back");
        } else {
            var planid = req.params.plan_id;
            var caseid = req.body.uploadplancase_id;
            var f;
            var i = thisExists(cases_plans, "plan_id", planid);
            if (i !== null) {
                if (req.files.length < 1) {
                    req.flash("error", "No file submitted for upload!");
                    res.redirect("back");
                } else {
                    for (f = 0; f < req.files.length; f += 1) {
                        fs.rename("/node_exercises/CMS_demo/uploads/assets2/" + req.files[f].filename, "/node_exercises/CMS_demo/uploads/assets2/case_" + caseid + "/planfiles/" + req.files[f].filename, function (err) {
                            if (err) {
                                req.flash("error", "File Directory Error!");
                                res.redirect("back");
                            }
                        });
                        cases_plans[i].plan_doc.push(req.files[f].filename);
                    }
                    res.redirect("back");                    
                }
            } else {
                req.flash("error", "Sorry, Not Found!");
                res.redirect("back");
            }
        }
    });
});


// REMOVE PLAN DOC ---- UPDATE THIS FUNCTION for MySQL to handle plan_doc array !!!!!!!!!!!!!!!!!!!!

app.post("/plan/removedoc/:plan_id/:doc_position", function (req, res) {
    "use strict";
    var planid = req.params.plan_id;
    var plandocposition = req.params.doc_position;
    var i = thisExists(cases_plans, "plan_id", planid);
    if (i !== null) {
        cases_plans[i].plan_doc.splice(plandocposition, 1);
        res.redirect("back");
    } else {
        req.flash("error", "Sorry, Plan Doc Not Found!");
        res.redirect("back");
    }      
});




// ******************* CASE - Actions  ************************************

// CREATE ACTION

app.post("/action", function (req, res) {
    "use strict";
    var caseid = req.body.actioncaseid;
    var actionname = (req.body.actionname).trim();
    var actiontype = req.body.actiontype;
    var actionpriority = req.body.actionpriority;
    var actionstartdate = req.body.actionstartdate;
    var actionduedate = req.body.actionduedate;
    var assocplanid = req.body.assocplanid;
    var actionassignedpersonid = req.body.actionassignedpersonid;
    var actionnote = (req.body.actionnote).trim();
//    if ((actionname !== "") && (actiontype !== "0") && (actionpriority !== "0") && (actionstartdate !== "") && (actionduedate !== "") && (assocplanid !== "0") && (actionassignedpersonid !== "0")) {
    if ((actionname !== "") && (assocplanid !== "0")) {
        var actioncompletedate = "";
        var actiondoc = [];
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
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// EDIT ACTION

app.put("/action/:action_id", function (req, res) {
    "use strict";
    var actionid = req.params.action_id;
    var caseid = req.body.actioncaseid;
    var actionname = (req.body.actionname).trim();
    var actiontype = req.body.actiontype;
    var actionpriority = req.body.actionpriority;
    var actionstartdate = req.body.actionstartdate;
    var actionduedate = req.body.actionduedate;
    var actioncompletedate = req.body.actioncompletedate;
    var assocplanid = req.body.assocplanid;
    var actionassignedpersonid = req.body.actionassignedpersonid;
    var actionnote = (req.body.actionnote).trim();
//    if ((actionname !== "") && (actiontype !== "0") && (actionpriority !== "0") && (actionstartdate !== "") && (actionduedate !== "") && (assocplanid !== "0") && (actionassignedpersonid !== "0")) {
    if ((actionname !== "") && (assocplanid !== "0")) {
        var i = thisExists(cases_actions, "action_id", actionid);
        if (i !== null) {
            var actiondoc = cases_actions[i].action_doc;
            var editCasesAction = {action_id: actionid, case_id: caseid, name:actionname, type:actiontype, priority:actionpriority, start_date:actionstartdate, due_date:actionduedate, complete_date:actioncompletedate, assocplan_id:assocplanid, assignedperson_id:actionassignedpersonid, note:actionnote, action_doc:actiondoc};
            cases_actions[i] = editCasesAction;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, error updating Case Action!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// UPLOAD ACTION DOC

app.post("/action/upload/:action_id", function (req, res) {
    "use strict";
    uploadFile(req, res, function (err) {
        if (err) {
            req.flash("error", "Error Uploading File(s)!");
            res.redirect("back");
        } else {
            var actionid = req.params.action_id;
            var caseid = req.body.uploadactioncase_id;
            var f;
            var i = thisExists(cases_actions, "action_id", actionid);
            if (i !== null) {
                if (req.files.length < 1) {
                    req.flash("error", "No file submitted for upload!");
                    res.redirect("back");
                } else {
                    for (f = 0; f < req.files.length; f += 1) {
                        fs.rename("/node_exercises/CMS_demo/uploads/assets2/" + req.files[f].filename, "/node_exercises/CMS_demo/uploads/assets2/case_" + caseid + "/actionfiles/" + req.files[f].filename, function (err) {
                            if (err) {
                                req.flash("error", "File Directory Error!");
                                res.redirect("back");
                            }
                        });
                        cases_actions[i].action_doc.push(req.files[f].filename);
                    }
                    res.redirect("back");                    
                }
            } else {
                req.flash("error", "Sorry, Not Found!");
                res.redirect("back");
            }
        }
    });
});


// REMOVE ACTION DOC ---- UPDATE THIS FUNCTION for MySQL to handle action_doc array !!!!!!!!!!!!!!!!!!!!

app.post("/action/removedoc/:action_id/:doc_position", function (req, res) {
    "use strict";
    var actionid = req.params.action_id;
    var actiondocposition = req.params.doc_position;
    var i = thisExists(cases_actions, "action_id", actionid);
    if (i !== null) {
        cases_actions[i].action_doc.splice(actiondocposition, 1);
        res.redirect("back");
    } else {
        req.flash("error", "Sorry, Action Doc Not Found!");
        res.redirect("back");
    }      
});



// ******************* CASE FILES  ************************************

// CREATE CASE FILE 

app.post("/casefile", function (req, res) {
    "use strict";
    uploadFile(req, res, function (err) {
        if(err) {
            req.flash("error", "Error Uploading File(s)!");
            res.redirect("back");
        } else {
            if (req.files.length < 1) {
                req.flash("error", "No file submitted for upload!");
                res.redirect("back");
            } else {
                var filedoc = [];
                var caseid = req.body.casefilecaseid;
                var casefilename = (req.body.casefilename).trim();
                var filedomain = req.body.casefilecasedomain;
                var fileactiontype = req.body.casefileactiontype;
                var filetype = req.body.casefiletype;
                var filedate = new Date();
                filedate = (filedate.getMonth() + 1) + "/" + filedate.getDate() + "/" + filedate.getFullYear() + " at " + filedate.getHours() + ":" + filedate.getMinutes() + ":" + filedate.getSeconds();
                var filepersonid = req.body.casefilepersonid;
                var fileorgid = req.body.casefileorgid;
                var filenote = (req.body.casefilenote).trim();
                var f;
                for (f = 0; f < req.files.length; f += 1) {
                    fs.rename("/node_exercises/CMS_demo/uploads/assets2/" + req.files[f].filename, "/node_exercises/CMS_demo/uploads/assets2/case_" + caseid + "/casefiles/" + req.files[f].filename, function (err) {
                        if (err) {
                            req.flash("error", "File Directory Error!");
                            res.redirect("back");
                        }
                    });
                    filedoc.push(req.files[f].filename);
                }
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
            }
        }
    });
});


// EDIT CASE FILE

app.put("/casefile/:casefile_id", function (req, res) {
    "use strict";
    var casefileid = req.params.casefile_id;
    var caseid = req.body.casefilecaseid;
    var casefilename = (req.body.casefilename).trim();
    var filedomain = req.body.casefilecasedomain;
    var fileactiontype = req.body.casefileactiontype;
    var filetype = req.body.casefiletype;
    var filedate = new Date();
    filedate = (filedate.getMonth() + 1) + "/" + filedate.getDate() + "/" + filedate.getFullYear() + " at " + filedate.getHours() + ":" + filedate.getMinutes() + ":" + filedate.getSeconds();
    var filepersonid = req.body.casefilepersonid;
    var fileorgid = req.body.casefileorgid;
    var filenote = (req.body.casefilenote).trim();
    var i = thisExists(cases_casefiles, "casefile_id", casefileid);
    if (i !== null) {
        var filedoc = cases_casefiles[i].file_doc;
        var editCasesFile = {casefile_id: casefileid, case_id: caseid, name:casefilename,  domain:filedomain, actiontype:fileactiontype, type:filetype, filedate:filedate, fileperson_id:filepersonid, fileorg_id:fileorgid, note:filenote, file_doc:filedoc};
        cases_casefiles[i] = editCasesFile;
        res.redirect("back");
    } else {
        req.flash("error", "Sorry, error updating Case File!");
        res.redirect("back");
    }
});


// UPLOAD CASE FILE DOC

app.post("/casefile/upload/:casefile_id", function (req, res, next) {
    "use strict";
    uploadFile(req, res, function (err) {
        if(err) {
            req.flash("error", "Error Uploading File(s)!");
            res.redirect("back");
        } else {
            var casefileid = req.params.casefile_id;
            var caseid = req.body.uploadfilecase_id;
            var f;
            var i = thisExists(cases_casefiles, "casefile_id", casefileid);
            if (i !== null) {
                if (req.files.length < 1) {
                    req.flash("error", "No file submitted for upload!");
                    res.redirect("back");
                } else {
                    for (f = 0; f < req.files.length; f += 1) {
                            fs.rename("/node_exercises/CMS_demo/uploads/assets2/" + req.files[f].filename, "/node_exercises/CMS_demo/uploads/assets2/case_" + caseid + "/casefiles/" + req.files[f].filename, function (err) {
                            if (err) {
                                req.flash("error", "File Directory Error!");
                                res.redirect("back");
                            }
                        });
                        cases_casefiles[i].file_doc.push(req.files[f].filename);
                    }
                    res.redirect("back");                    
                }
            } else {
                req.flash("error", "Sorry, error!");
                res.redirect("back");
            }
        }
    });
});


 
// REMOVE CASE FILE DOC ---- UPDATE THIS FUNCTION for MySQL to handle file_doc array !!!!!!!!!!!!!!!!!!!!

app.post("/casefile/removedoc/:casefile_id/:doc_position", function (req, res) {
    "use strict";
    var casefileid = req.params.casefile_id;
    var casefiledocposition = req.params.doc_position;
    var i = thisExists(cases_casefiles, "casefile_id", casefileid);
    if (i !== null) {
        if (cases_casefiles[i].file_doc.length > 1) {
        cases_casefiles[i].file_doc.splice(casefiledocposition, 1);
        res.redirect("back");
        } else {
            req.flash("error", "File not removed because at least one Case File required");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Sorry, Not Found!");
        res.redirect("back");
    }      
});



//********************************** CASE NOTE  ***********************************

// CREATE CASE NOTE

app.post("/casenote", function (req, res) {
    "use strict";
    var caseid = req.body.casenotecaseid;
    var notename = (req.body.casenotename).trim();
    var notedomain = req.body.casenotecasedomain;
    var noteactiontype = req.body.casenoteactiontype;
    var notetype = req.body.casenotetype;
    var notetext = (req.body.casenotetext).trim();
    var notepersonid = req.body.casenotepersonid;
    var noteorgid = req.body.casenoteorgid;
    if ((notename !== "") && (notetext !== "")) {
        var notedate = new Date();
        notedate = (notedate.getMonth() + 1) + "/" + notedate.getDate() + "/" + notedate.getFullYear() + " at " + notedate.getHours() + ":" + notedate.getMinutes() + ":" + notedate.getSeconds();
        var j = cases_casenotes.length - 1;
        if (j >= 0) {
            var casenoteid = parseInt(cases_casenotes[j].casenote_id,10) + 1;
            casenoteid = casenoteid.toString();
        } else {
            casenoteid = "1";
        }
        var note_text = [];
        note_text.push(notetext);
        var newCasesNote = {casenote_id: casenoteid, case_id: caseid, name:notename, domain:notedomain, actiontype:noteactiontype, type:notetype, notedate:notedate, noteperson_id:notepersonid, noteorg_id:noteorgid, note_text:note_text};
        cases_casenotes.push(newCasesNote);
        res.redirect("back");
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});


// EDIT CASE NOTE

app.put("/casenote/:casenote_id", function (req, res) {
    "use strict";
    var notename = (req.body.casenotename).trim();
    var notetext = (req.body.casenotetext).trim();
    if ((notename !== "") && (notetext !== "")) {
        var casenoteid = req.params.casenote_id;
        var caseid = req.body.casenotecaseid;
        var notedomain = req.body.casenotecasedomain;
        var noteactiontype = req.body.casenoteactiontype;
        var notetype = req.body.casenotetype;
        var notedate = new Date();
        notedate = (notedate.getMonth() + 1) + "/" + notedate.getDate() + "/" + notedate.getFullYear() + " at " + notedate.getHours() + ":" + notedate.getMinutes() + ":" + notedate.getSeconds();
        var notepersonid = req.body.casenotepersonid;
        var noteorgid = req.body.casenoteorgid;
        var i = thisExists(cases_casenotes, "casenote_id", casenoteid);
        if (i !== null) {
            var notetext1 = cases_casenotes[i].note_text[0];
            var note_text = [];
            if (notetext1 !== notetext) {
                cases_casenotes[i].note_text[0] = notetext;
            }
            note_text = cases_casenotes[i].note_text;
            var editCasesNote = {casenote_id: casenoteid, case_id: caseid, name:notename, domain:notedomain, actiontype:noteactiontype, type:notetype, notedate:notedate, noteperson_id:notepersonid, noteorg_id:noteorgid, note_text:note_text};
            cases_casenotes[i] = editCasesNote;
            res.redirect("back");
        } else {
            req.flash("error", "Error, Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }
});



//*************************   QUESTIONNAIRES   ************************************************************

function updateQuestionnairesInfo() {
    "use strict";
    questionnaireslisting = [];
    var thisQuestionnaire = {};
    var i, j, inuse;
    for (i = 0; i < questionnaire.length; i += 1) {
        j = thisExists(cases_questionnaires, "questionnaire_id", questionnaire[i].questionnaire_id);
        if (j !== null) {
            inuse = "yes";
        } else {
            inuse = "no";          
        }
        thisQuestionnaire = {questionnaire_id: questionnaire[i].questionnaire_id, name: questionnaire[i].name, quest_type: questionnaire[i].quest_type, date_created: questionnaire[i].date_created, date_updated: questionnaire[i].date_updated, inuse: inuse};
        questionnaireslisting.push(thisQuestionnaire);
    }
    return (questionnaireslisting);
}


app.get("/questionnaires", function (req, res) {
    "use strict";
    updateQuestionnairesInfo();
    res.render("questionnaire/index", {questionnaireslisting:questionnaireslisting});
});

// Display New Questionnaire Form
app.get("/questionnaire", function (req, res) {
    "use strict";
    res.render("questionnaire/newquest.ejs");
});

// Create Questionnaire
app.post("/questionnaire", function (req, res) {
    "use strict";
    var totalquestions = req.body.currquestno;
    var questionnairename = (req.body.questionnairename).trim();
    var questionnairetype = req.body.questionnairetype;
    var datecreated =  new Date();
    datecreated = (datecreated.getMonth() + 1) + "/" + datecreated.getDate() + "/" + datecreated.getFullYear() + " at " + datecreated.getHours() + ":" + datecreated.getMinutes() + ":" + datecreated.getSeconds();
    var dateupdated =  "";
    var i, j, thisanswer, qa = [], answers = [], questanswgroup = {};
    var questno, questtype, totalanswers, questtext;
    var q, questionnaireid;
    for (i = 1; i <= totalquestions; i += 1) {
        questno = req.body["question" + i];
        questtype = req.body["questtype" + i];
        totalanswers = req.body["totalanswers" + i];
        questtext = req.body["questtext" + i];
        answers = [];
        if ((questtype !== "textbox") && (questtype !== "textarea")) {
            for (j = 1; j <= totalanswers; j += 1) {
                thisanswer = req.body["answer" + i + "-" + j + "_textbox"];
                answers.push(thisanswer);
            }
        }
        questanswgroup = {question_id: questno, questtext: questtext, questtype: questtype, totalansw: totalanswers, answers: answers};
        qa.push(questanswgroup);           
    }
    q = questionnaire.length - 1;
    if (q >= 0) {
        questionnaireid = (parseInt(questionnaire[q].questionnaire_id,10) + 1);
        questionnaireid = questionnaireid.toString();
    } else {
        questionnaireid = "1";
    }
    var newQuestionnaire = {questionnaire_id: questionnaireid, name: questionnairename, quest_type: questionnairetype, date_created: datecreated, date_updated:dateupdated, qa: qa};
    questionnaire.push(newQuestionnaire);
    res.redirect("/questionnaires");    
});


// Display Specific Questionnaire in View Mode without Case and Person Info
app.get("/questionnaire/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    var i = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    if (i !== null) {
        res.render("questionnaire/displayquest",{questionnaire:questionnaire[i], cases_questionnaires:{}, cases:{}, person:{}, questanswers:[], viewmode:"0"});
    } else {
        req.flash("error", "Error, Not Found!");
        res.redirect("back");
    }
});


// Display Specific Questionnaire Form for Editing
app.post("/editquestionnaire/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    var q = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    if (q !== null) {
        res.render("questionnaire/editquest.ejs",{questionnaire:questionnaire[q]});
    } else {
        req.flash("error", "Error, Not Found!");
        res.redirect("back");
    }
});


//EDIT SPECIFIC QUESTIONNAIRE
app.put("/questionnaire/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    var dateupdated =  new Date();
    dateupdated = (dateupdated.getMonth() + 1) + "/" + dateupdated.getDate() + "/" + dateupdated.getFullYear() + " at " + dateupdated.getHours() + ":" + dateupdated.getMinutes() + ":" + dateupdated.getSeconds();
    var i, j, thisanswer, questno, questtype, totalanswers, questtext, answers = [], questanswgroup = {};
    var q = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    if (q !== null) {
        var totalquestions = req.body.currquestno;
        var questionnairename = (req.body.questionnairename).trim();
        var questionnairetype = req.body.questionnairetype;
        var qa = [];
        for (i = 1; i <= totalquestions; i += 1) {
            questno = req.body["question" + i];
            questtype = req.body["questtype" + i];
            totalanswers = req.body["totalanswers" + i];
            questtext = req.body["questtext" + i];
            answers = [];
            if ((questtype !== "textbox") && (questtype !== "textarea")) {
                for (j = 1; j <= totalanswers; j += 1) {
                    thisanswer = req.body["answer" + i + "-" + j + "_textbox"];
                    answers.push(thisanswer);
                }
            }
            questanswgroup = {question_id: questno, questtext: questtext, questtype: questtype, totalansw: totalanswers, answers: answers};
            qa.push(questanswgroup);           
        }
        var editQuestionnaire = {questionnaire_id: questionnaire[q].questionnaire_id, name: questionnairename, quest_type: questionnairetype, date_created:questionnaire[q].date_created, date_updated:dateupdated, qa: qa};
        questionnaire[q] = editQuestionnaire;
        res.redirect("/questionnaires");    
    } else {
        req.flash("error", "Error, Updating Questionnaire!");
        res.redirect("back");
    }
});


// Delete Specific Questionnaire
app.post("/deletequestionnaire/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    res.send("'<html><head></head><body><h1>Delete Questionnaire " + questionnaireid + "!</h1></body></html>'");                    
});


// Display Specific Questionnaire Info
app.post("/infoquestionnaire/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    casequestlisting = [];
    var personquestansw = [];
    var i = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    var j, q;
    if (i !== null) {
        for (j = 0; j < cases_questionnaires.length; j += 1) {
            if (cases_questionnaires[j].questionnaire_id === questionnaireid) {
                casequestlisting.push(cases_questionnaires[j]);
                for (q = 0; q < questanswers.length; q += 1) {
                    if (questanswers[q].casequest_id === cases_questionnaires[j].casequest_id) {
                        personquestansw.push(questanswers[q]);
                    }
                }
            }
        }
        res.render("questionnaire/infoquest",{questionnaire:questionnaire[i], casequestlisting:casequestlisting, personquestansw:personquestansw});
    } else {
        req.flash("error", "Error, Questionnaire Not Found!");
        res.redirect("back");
    }
});


//*********************   Case Questionnaires ********************************

// Create Case Questionnaire - Table Info
app.post("/casequestionnaire", function (req, res) {
    "use strict";
    var caseid = req.body.casequestcaseid;
    var questcaseassocwith = req.body.questcaseassocwith;
    var questassocwithname = req.body.questassocwithname;
    var questionnaireid = req.body.casequestionnairename;
    var dateadministered =  new Date();
    dateadministered = (dateadministered.getMonth() + 1) + "/" + dateadministered.getDate() + "/" + dateadministered.getFullYear() + " at " + dateadministered.getHours() + ":" + dateadministered.getMinutes() + ":" + dateadministered.getSeconds();
    var questnote = (req.body.questnote).trim();
    var queststatus = "1";
    var i = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    if (i !== null) {
        var j = cases_questionnaires.length - 1;
        if (j >= 0) {
            var casequestid = parseInt(cases_questionnaires[j].casequest_id,10) + 1;
            casequestid = casequestid.toString();
        } else {
            casequestid = "1";
        }
        var newCaseQuestionnaire = {casequest_id: casequestid, case_id: caseid, assoc_with: questcaseassocwith, assocwith_nameid: questassocwithname, questionnaire_id: questionnaireid, date_administered: dateadministered, quest_status: queststatus, note: questnote};
        cases_questionnaires.push(newCaseQuestionnaire);
        res.redirect("back");
    } else {
        req.flash("error", "Error, Questionnaire Not Found!");
        res.redirect("back");
    }
});


// EDIT Case Questionnaire - Table Info
app.put("/casequestionnaire/:casequest_id", function (req, res) {
    "use strict";
    var casequestid = req.params.casequest_id;
    var queststatus = req.body.casequeststatus;
    var questnote = (req.body.questnote).trim();
    var j = thisExists(cases_questionnaires, "casequest_id", casequestid);
    if (j !== null) {
        var caseid = cases_questionnaires[j].case_id;
        var questcaseassocwith = cases_questionnaires[j].assoc_with;
        var questassocwithname = cases_questionnaires[j].assocwith_nameid;
        var questionnaireid = cases_questionnaires[j].questionnaire_id;
        var dateadministered = cases_questionnaires[j].date_administered;
        var editCaseQuestionnaire = {casequest_id: casequestid, case_id: caseid, assoc_with: questcaseassocwith, assocwith_nameid: questassocwithname, questionnaire_id: questionnaireid, date_administered: dateadministered, quest_status: queststatus, note: questnote};
        cases_questionnaires[j] = editCaseQuestionnaire;
        res.redirect("/case/" + caseid);
    } else {
        req.flash("error", "Error, Case Questionnaire Not Found!");
        res.redirect("back");
    }
});


//  DISPLAY SPECIFIC QUESTIONNAIRE on Case Screen under Questionnaires Tab for Input or View
app.post("/questionnaire/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    var casequestid = req.body.linkcasequestid;
    var caseid = req.body.linkquestcaseid;
    var personid = req.body.linkquestpersonid;
    var noanswers = [];
    var i = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    if (i !== null) {
        var j = thisGroupingExists(cases_questionnaires, "casequest_id", casequestid, "questionnaire_id", questionnaireid, "case_id", caseid);
        if (j !== null) { 
            var k = thisExists(cases, "case_id", caseid);
            if (k !== null) {
                if ((cases_questionnaires[j].quest_status === "1") || (cases_questionnaires[j].quest_status === "3") || (cases_questionnaires[j].quest_status === "4")) {
                    res.render("questionnaire/displayquest",{questionnaire:questionnaire[i], cases_questionnaires:cases_questionnaires[j], cases:cases[k], person:{}, questanswers:[], viewmode:"1"});
                } else {
                    var m = thisExists(person, "person_id", personid);
                    if (m !== null) {
                        var w = thisPairingExists(questanswers, "person_id", personid, "casequest_id", casequestid);
                        if (w !== null) {
                            if (questanswers[w].quest_status === "2") {
                                res.render("questionnaire/displayquest",{questionnaire:questionnaire[i], cases_questionnaires:cases_questionnaires[j], cases:cases[k], person:person[m], questanswers:questanswers[w].answers, viewmode:"2"});
                            } else {
                                req.flash("error", "Error, Quest Answers already submitted for Person!");
                                res.redirect("back");
                            }
                        } else {
                             res.render("questionnaire/displayquest",{questionnaire:questionnaire[i], cases_questionnaires:cases_questionnaires[j], cases:cases[k], person:person[m], questanswers:[], viewmode:"2"});
                        }
                    } else {
                        req.flash("error", "Error, Person not found!");
                        res.redirect("back");
                    }
                }
            } else {
                req.flash("error", "Error, Case not found!");
                res.redirect("back");
            }
        } else {
            req.flash("error", "Error, Case Questionnaire not found!");
            res.redirect("back");
        }         
    } else {
        req.flash("error", "Error, Questionnaire Record not found!");
        res.redirect("back");
    }         
});


//**************************  Person Questionnaires *****************************

// INPUT and/or UPDATE PERSON ANSWERS TO SPECIFIC QUESTIONNAIRE
app.post("/personquestionnaire/:person_id/:casequest_id", function (req, res) {
    "use strict";
    var personid = req.params.person_id;
    var casequestid = req.params.casequest_id;
    var answers = req.body.answers;
    answers = "{" + answers.slice(0,-15) + "}";
    var finished = req.body.finished;
    var j = thisExists(cases_questionnaires, "casequest_id", casequestid);
    if (j !== null) {
        var found_questanswer = false;
        if (finished === "1") {
            var queststatus = "3";
            var datecomplete =  new Date();
            datecomplete = (datecomplete.getMonth() + 1) + "/" + datecomplete.getDate() + "/" + datecomplete.getFullYear() + " at " + datecomplete.getHours() + ":" + datecomplete.getMinutes() + ":" + datecomplete.getSeconds();           
        } else {
            var queststatus = "2";
            var datecomplete =  "";
        }
        var has_questanswer = thisGroupingExists(questanswers, "person_id", personid, "casequest_id", casequestid, "quest_status", "2");
        if (has_questanswer !== null) {
            var i = -1;
            while ((found_questanswer === false) && (i < questanswers.length)) {
                i += 1;
                if ((questanswers[i].person_id === personid) && (questanswers[i].casequest_id === casequestid) && (questanswers[i].quest_status === "2")) {
                    found_questanswer = true;
                }
            }
            if (found_questanswer === true) {
                var personQuestAnsw = {questanswer_id:questanswers[i].questanswer_id, person_id:personid, casequest_id:casequestid, date_complete:datecomplete, quest_status:queststatus, answers:[answers]};
                questanswers[i] = personQuestAnsw;
            } else {
                req.flash("error", "Error, Person Answer Quest not found!");
                res.redirect("back");
            }
        } else {
            var q = questanswers.length - 1;
            if (q >= 0) {
                var questanswerid = parseInt(questanswers[q].questanswer_id,10) + 1;
                questanswerid = questanswerid.toString();
            } else {
                questanswerid = "1";
            }
            var personQuestAnsw = {questanswer_id:questanswerid, person_id:personid, casequest_id:casequestid, date_complete:datecomplete, quest_status:queststatus, answers:[answers]};
            questanswers.push(personQuestAnsw);
        }
        res.redirect("/case/" + cases_questionnaires[j].case_id);
    } else {
        req.flash("error", "Error, Case Questionnaire not found!");
        res.redirect("back");
    }
});


//  DISPLAY SPECIFIC QUESTIONNAIRE RESULTS FOR PERSON
app.post("/questionnaireresults/:questionnaire_id", function (req, res) {
    "use strict";
    var questionnaireid = req.params.questionnaire_id;
    var casequestid = req.body.linkcasequestid;
    var questanswerid = req.body.linkquestanswerid;
    var i = thisExists(questionnaire, "questionnaire_id", questionnaireid);
    if (i !== null) {
        var j = thisExists(cases_questionnaires, "casequest_id", casequestid);
        if (j !== null) {
            var k = thisExists(cases, "case_id", cases_questionnaires[j].case_id);
            if (k !== null) {
                var w = thisExists(questanswers, "questanswer_id", questanswerid);
                if (w !== null) {
                    var m = thisExists(person, "person_id", questanswers[w].person_id);
                    if (m !== null) {
                        res.render("questionnaire/displayquest",{questionnaire:questionnaire[i], cases_questionnaires:cases_questionnaires[j], cases:cases[k], person:person[m], questanswers:questanswers[w].answers, viewmode:"3"});
                    } else {
                        req.flash("error", "Error, Person not found!");
                        res.redirect("back");
                    }
                } else {
                    req.flash("error", "Error, Person Quest Answers not found!");
                    res.redirect("back");
                }
            } else {
                req.flash("error", "Error, Case not found!");
                res.redirect("back");
            }
        } else {
            req.flash("error", "Error, Case Questionnaire not found!");
            res.redirect("back");
        }         
    } else {
        req.flash("error", "Error, Questionnaire Record not found!");
        res.redirect("back");
    }         
});





// *************  PERSON SCREEN ***************************************************

// DISPLAY PERSON INPUT FORM
app.get("/person", function (req, res) {
    "use strict";
    res.render("person/index1",{personGender:personGender, userRole:userRole, userRoleStatus:userRoleStatus, personType:personType, personReligion:personReligion});
});


// CREATE PERSON
app.post("/person", function (req, res) {
    "use strict";
    var lastname = (req.body.lastname).trim();
    var firstname = (req.body.firstname).trim();
    var middlename = (req.body.middlename).trim();
    var persontitle = (req.body.persontitle).trim();
    var gender = req.body.gender;
    var birthdate = (req.body.birthdate).trim();
    var personrole = req.body.personrole;
    var persontype = req.body.persontype;
    var personstatus = req.body.personrolestatus;
    var religion = req.body.religion;
    var personnote = (req.body.personnote).trim();
//    if ((lastname !== "") && (firstname !== "") && (gender !== "0") && (personrole !== "0") && (persontype !== "0") && (personstatus !== "0")) {  
    if ((lastname !== "") && (firstname !== "")) {  
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
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/person");        
    }
});


function updatePersonRelationships(personid) {
    "use strict";
    var thispersonid = personid;
    var personRelationship = {};
    person_relationship = [];
    var i, j, person_status, otherpersonid, person_name, p;
    var person_contact_phone, e, person_contact_email;
    var has_relationship = thisExists(person_person_relationship, "person_id1", thispersonid);
    if (has_relationship === null) {
        has_relationship = thisExists(person_person_relationship, "person_id2", thispersonid);
    }
    if (has_relationship !== null) {
        for (i = 0; i < person_person_relationship.length; i += 1) {
            person_status = "1";
            if (person_person_relationship[i].person_id1 === thispersonid) { 
                j = thisExists(person, "person_id", person_person_relationship[i].person_id2);
            } else {
                if (person_person_relationship[i].person_id2 === thispersonid) {
                    j = thisExists(person, "person_id", person_person_relationship[i].person_id1);
                }
            }
            if (j !== null) {
                otherpersonid = person[j].person_id;
                person_name = person[j].last_name + ", " + person[j].first_name + " " + person[j].middle_name;
                p = thisExists(contact_phone, "person_id", otherpersonid);
                if (p !== null) {       
                    person_contact_phone = contact_phone[p].phone_number;
                } else {
                    person_contact_phone = "";                        
                }
                e = thisExists(contact_email, "person_id", otherpersonid);
                if (e !== null) {       
                    person_contact_email = contact_email[e].email_address;
                } else {
                    person_contact_email = "";
                }
                personRelationship = {person_relationship_id:person_person_relationship[i].person_relationship_id, person_id1:thispersonid, person_id2:otherpersonid, person_name:person_name, primary_phone:person_contact_phone, primary_email:person_contact_email, lk_contact_type:person_person_relationship[i].lk_contact_type, lk_person_relationship_type:person_person_relationship[i].lk_person_relationship_type, lk_status:person[j].lk_person_status, start_date:person_person_relationship[i].start_date, end_reason:person_person_relationship[i].end_reason, end_date:person_person_relationship[i].end_date};
                person_relationship.push(personRelationship);
            }
        }
        return (person_relationship);
    }
}


function updatePersonOrgRelationships(personid) {
    "use strict";
    var person_id = personid;
    var organization_status = "1";
    var j = -1;
    var personOrgRelationship = {};
    personorg_relationship = [];
    var i, found_org, organization_name, has_org;
    var found_phone, org_contact_phone, has_phone;
    var found_email, org_contact_email, has_email;
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
                    console.log("Sorry, Organization Not Found For Person Org Relationship!");
                }
            }
        }
        return (personorg_relationship);
    }
}


function updateThisPersonAssignments(person_id) {
    "use strict";
    var personid = person_id;
    var thisPersonAssignment = {};
    my_cases = [];
    var i, j, k;
    for (i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].person_id === personid) {
            k = thisExists(person, "person_id", case_assignment[i].person_id);
            if (k !== null) {
                j = thisExists(cases, "case_id", case_assignment[i].case_id);
                if ((k !== null) && (j !== null)) {
                    thisPersonAssignment = {case_id:cases[j].case_id, title:cases[j].case_title, duedate:cases[j].due_date, priority:cases[j].lk_case_priority, role:case_assignment[i].lk_assigned_role, startdate:case_assignment[i].start_date, enddate:case_assignment[i].end_date};
                    my_cases.push(thisPersonAssignment);
                } else {
                    console.log("Sorry, Case Not Found For Person Assignment!");
                }
            }
        }
    }
    return (my_cases);
}


// DISPLAY SPECIFC PERSON
app.get("/person/:person_id", function (req, res) {
    "use strict";
    var personid = req.params.person_id;
    var i;
    var j = thisExists(person, "person_id", personid);
    if (j !== null) {
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
        res.render("person/index2",{thisperson:person[j], person:person, cases:cases, organization:organization, personGender:personGender, userRole:userRole, userRoleStatus:userRoleStatus, personType:personType, personReligion:personReligion, contactType:contactType, contactPhoneType:contactPhoneType, contactEmailType:contactEmailType, contactFaxType:contactFaxType, contactMediaType:contactMediaType, contactAddressType:contactAddressType, contactStateCode:contactStateCode, contactCountryCode:contactCountryCode, identificationType:identificationType, identificationStatus:identificationStatus, personPersonRelationship:personPersonRelationship, personOrganizationRelationship:personOrganizationRelationship, person_contact_phone:person_contact_phone, person_contact_email:person_contact_email, person_contact_fax:person_contact_fax, person_contact_media:person_contact_media, person_contact_address:person_contact_address, person_identification:person_identification, person_relationship:person_relationship, personorg_relationship:personorg_relationship, my_cases:my_cases});
    } else {
        req.flash("error", "Error, Person Not Found!");
        res.redirect("back");
    }
});


// EDIT SPECIFIC PERSON
app.put("/person/:person_id", function (req, res) {
    "use strict";
    var personid = req.params.person_id;
    var lastname = (req.body.lastname).trim();
    var firstname = (req.body.firstname).trim();
    var middlename = (req.body.middlename).trim();
    var persontitle = (req.body.persontitle).trim();
    var gender = req.body.gender;
    var birthdate = (req.body.birthdate).trim();
    var personrole = req.body.personrole;
    var persontype = req.body.persontype;
    var personstatus = req.body.personrolestatus;
    var religion = req.body.religion;
    var personnote = (req.body.personnote).trim();
//    if ((lastname !== "") && (firstname !== "") && (gender !== "0") && (personrole !== "0") && (persontype !== "0") && (personstatus !== "0")) {  
    if ((lastname !== "") && (firstname !== "")) {  
        var j = thisExists(person, "person_id", personid);
        if (j !== null) {
            var personimage = person[j].image;
            var editPerson = {person_id: personid, last_name: lastname, first_name: firstname, middle_name: middlename, title: persontitle, lk_gender: gender, birth_date: birthdate, lk_user_role: personrole, lk_person_type: persontype, lk_person_status: personstatus, lk_religion: religion, note: personnote, image:personimage};
            person[j] = editPerson;
            res.redirect("/person/" + personid);
        } else {
            req.flash("error", "Sorry, error updating person.");
            res.redirect("/person/" + personid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/person/" + personid);
    }
});


// DELETE SPECIFIC PERSON
app.delete("/person/:person_id", function (req, res) {
    "use strict";
    res.redirect("/");    
});



// CREATE PERSON IDENTIFICATION

app.post("/personidentification", function (req, res) {
    "use strict";
    var personid = req.body.identificationpersonid;
    var issuedbyorg = (req.body.identificationorg).trim();
    var identificationnumber = (req.body.identificationnumber).trim();
    var identificationtype = req.body.identificationtype;
    var issueddate = req.body.issueddate;
    var expirationdate = req.body.expirationdate;
    var identificationstatus = req.body.identificationstatus;
    var identificationnote = (req.body.identificationnote).trim();
    if ((identificationnumber !== "") && (identificationtype !== "0")) {
        var has_identification = thisGroupingExists(identification, "person_id", personid, "issuedby_org", issuedbyorg, "identification_number", identificationnumber);
        if (has_identification === null) {    
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
            req.flash("error", "Person Identification Already Exists!");
            res.redirect("/person/" + personid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/person/" + personid);
    }
});


// EDIT PERSON IDENTIFICATION

app.put("/personidentification/:identification_id", function (req, res) {
    "use strict";
    var identificationid = req.params.identification_id;
    var personid = req.body.identificationpersonid;
    var identificationnumber = (req.body.identificationnumber).trim();
    var identificationtype = req.body.identificationtype;
    var issuedbyorg = (req.body.identificationorg).trim();
    var issueddate = req.body.issueddate;
    var expirationdate = req.body.expirationdate;
    var identificationstatus = req.body.identificationstatus;
    var identificationnote = (req.body.identificationnote).trim();    
    if ((identificationnumber !== "") && (identificationtype !== "0")) {
        var i = thisExists(identification, "identification_id", identificationid);
        if (i !== null) {
            var editPersonIdentification = {identification_id: identificationid, person_id: personid, lk_identification_type: identificationtype, identification_number: identificationnumber, issuedby_org : issuedbyorg, issued_date: issueddate, expiration_date: expirationdate, identification_status: identificationstatus, note: identificationnote};
            identification[i] = editPersonIdentification;
            res.redirect("/person/" + personid);
        } else {
            req.flash("error", "Sorry, error updating!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/person/" + personid);
    }
});



//**********************************   PERSON IMAGE   *************************************************

var storagePersonImageFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/assets/images");
  },
  filename: function (req, file, callback) {
    callback(null, req.params.person_id + "_personimage.jpg");
  }
});

var uploadPersonImageFile = multer({ storage : storagePersonImageFile}).single("userPersonImageFile");

app.post("/personimage/:person_id", function (req, res) {
    "use strict";
    uploadPersonImageFile(req, res, function (err) {
        if (err) {
            req.flash("error", "Error Uploading Person Image!");
            res.redirect("back");
        } else {
            var personid = req.params.person_id;
            var j = thisExists(person, "person_id", personid);
            if (j !== null) {
                var lastname = person[j].last_name;
                var firstname = person[j].first_name;
                if (req.file !== undefined) {
                    fs.rename("/node_exercises/CMS_demo/public/assets/images/" + req.file.filename, "/node_exercises/CMS_demo/public/assets/images/person_" + personid + "_" + lastname + "_" + firstname + ".jpg", function (err) {
                        if (err) {
                            console.log("Error " + err);      
                        } else {
                            person[j].image = "person_" + personid + "_" + lastname + "_" + firstname + ".jpg";
                        }
                    });
                } else {
                    person[j].image = "noimage_lg.jpg";
                }
                res.redirect("back");
            } else {
                req.flash("error", "Error, Person not found!");
                res.redirect("back");
            }                  
        }
    });
});


app.post("/personnoimage/:person_id", function (req, res) {
    "use strict";
    var personid = req.params.person_id;
    var j = thisExists(person, "person_id", personid);
    if (j !== null) {
        person[j].image = "noimage_lg.jpg";
        res.redirect("back");
    } else {
        req.flash("error", "Error, Person not found!");
        res.redirect("back");
    }                  
});




// *************  ORGANIZATION SCREEN ***************************************************

// DISPLAY ORGANIZATION INPUT FORM
app.get("/organization", function (req, res) {
    "use strict";
    res.render("organization/index1",{userRole:userRole, organizationType:organizationType, userRoleStatus:userRoleStatus});
});


// CREATE ORGANIZATION
app.post("/organization", function (req, res) {
    "use strict";
    var orgname = (req.body.organizationname).trim();
    var orgwebsite = (req.body.organizationwebsite).trim();
    var orgrole = req.body.organizationrole;
    var orgtype = req.body.organizationtype;
    var orgstatus = req.body.organizationrolestatus;
    var orgnote = (req.body.organizationnote).trim();
//    if ((orgname !== "") && (orgrole !== "0") && (orgtype !== "0") && (orgstatus !== "0")) {
    if (orgname !== "") {
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
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/organization");
    }
});



function updateOrgPeopleRelationships(organizationid) {
    "use strict";
    var organization_id = organizationid;
    var person_status = "1";
    var orgPersonRelationship = {};
    personorg_relationship = [];
    var i, j, found_person, person_name, has_person;
    var found_phone, person_contact_phone, has_phone;
    var found_email, person_contact_email, has_email;
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
                    console.log("Sorry, Person Organization Relationship Not Found!");
                }
            }
        }
        return (personorg_relationship);
    }
}


function updateOrganizationRelationships(organizationid) {
    "use strict";
    var thisorganization = organizationid;
    var organizationRelationship = {};
    organization_relationship = [];
    var i, j, found_org, organization_name, organization_status;
    var otherorganization, found_phone, org_contact_phone, has_phone;
    var found_email, org_contact_email, has_email;
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
    return (organization_relationship);
}


function updateThisOrgAssignments(organization_id) {
    "use strict";
    var organizationid = organization_id;
    var thisOrgAssignment = {};
    my_cases = [];
    var i, j;
    for (i = 0; i < case_assignment.length; i += 1) {
        if (case_assignment[i].organization_id === organizationid) {
            j = thisExists(cases, "case_id", case_assignment[i].case_id);
            if (j !== null) {
                thisOrgAssignment = {case_id:cases[j].case_id, title:cases[j].case_title, duedate:cases[j].due_date, priority:cases[j].lk_case_priority, role:case_assignment[i].lk_assigned_role, startdate:case_assignment[i].start_date, enddate:case_assignment[i].end_date};
                my_cases.push(thisOrgAssignment);
            } else {
                console.log("Sorry, Case Not Found For Organization Assignment!");
            }
        }
    }
    return (my_cases);
}


// DISPLAY SPECIFC ORGANIZATION
app.get("/organization/:organization_id", function (req, res) {
    "use strict";
    var organizationid = req.params.organization_id;
    org_contact_phone = [];
    org_contact_email = [];
    org_contact_fax = [];
    org_contact_media = [];
    org_contact_address = [];
    var i;
    var j = thisExists(organization, "organization_id", organizationid);
    if (j !== null) {
        var found_phone = thisOrgContactExists(contact_phone, "organization_id", organization[j].organization_id, "person_id");
        if (found_phone !== null) {
            for (i = 0; i < contact_phone.length; i += 1) {
                if ((contact_phone[i].organization_id === organizationid) && (contact_phone[i].person_id === "")) {
                    org_contact_phone.push(contact_phone[i]);
                }
            }
        }
        var found_email = thisOrgContactExists(contact_email, "organization_id", organization[j].organization_id, "person_id");
        if (found_email !== null) {
            for (i = 0; i < contact_email.length; i += 1) {
                if ((contact_email[i].organization_id === organizationid) && (contact_email[i].person_id === "")) {
                    org_contact_email.push(contact_email[i]);
                }
            }
        }
        var found_fax = thisOrgContactExists(contact_fax, "organization_id", organization[j].organization_id, "person_id");
        if (found_fax !== null) {
            for (i = 0; i < contact_fax.length; i += 1) {
                if ((contact_fax[i].organization_id === organizationid) && (contact_fax[i].person_id === "")) {
                    org_contact_fax.push(contact_fax[i]);
                }
            }
        }
        for (i = 0; i < contact_media.length; i += 1) {
            if (contact_media[i].organization_id === organizationid) {
                org_contact_media.push(contact_media[i]);
            }
        }
        var found_address = thisOrgContactExists(contact_address, "organization_id", organization[j].organization_id, "person_id");
        if (found_address !== null) {
            for (i = 0; i < contact_address.length; i += 1) {
                if ((contact_address[i].organization_id === organizationid) && (contact_address[i].person_id === "")) {
                    org_contact_address.push(contact_address[i]);
                }
            }
        }
        updateOrgPeopleRelationships(organizationid);
        updateOrganizationRelationships(organizationid);
        updateThisOrgAssignments(organizationid)
        res.render("organization/index2",{thisorg:organization[j], organization:organization, cases:cases, person:person, userRole:userRole, userRoleStatus:userRoleStatus, organizationType:organizationType, contactType:contactType, contactPhoneType:contactPhoneType, contactEmailType:contactEmailType, contactFaxType:contactFaxType, contactMediaType:contactMediaType, contactAddressType:contactAddressType, contactStateCode:contactStateCode, contactCountryCode:contactCountryCode, personOrganizationRelationship:personOrganizationRelationship, organizationOrganizationRelationship:organizationOrganizationRelationship, org_contact_phone:org_contact_phone, org_contact_email:org_contact_email, org_contact_fax:org_contact_fax, org_contact_media:org_contact_media, org_contact_address:org_contact_address, personorg_relationship:personorg_relationship, organization_relationship:organization_relationship, my_cases:my_cases});
    } else {
        req.flash("error", "Sorry, Organization Not Found!");
        res.redirect("back");
    }
});


// EDIT SPECIFIC ORGANIZATION
app.put("/organization/:organization_id", function (req, res) {
    "use strict";
    var organizationid = req.params.organization_id;
    var orgname = (req.body.organizationname).trim();
    var orgwebsite = (req.body.organizationwebsite).trim();
    var orgrole = req.body.organizationrole;
    var orgtype = req.body.organizationtype;
    var orgstatus = req.body.organizationrolestatus;
    var orgnote = (req.body.organizationnote).trim();
//    if ((orgname !== "") && (orgrole !== "0") && (orgtype !== "0") && (orgstatus !== "0")) {
    if (orgname !== "") {
        var j = thisExists(organization, "organization_id", organizationid);
        if (j !== null) {
            var editOrganization = {organization_id: organizationid, organization_name: orgname, organization_website: orgwebsite, lk_user_role: orgrole, lk_organization_type: orgtype,  lk_organization_status: orgstatus, note: orgnote};
            organization[j] = editOrganization;
            res.redirect("/organization/" + organizationid);
        } else {
            req.flash("error", "Sorry, error updating organization.");
            res.redirect("/organization/" + organizationid);
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("/organization/" + organizationid);
    }
});


// DELETE SPECIFIC ORGANIZATION
app.delete("/organization/:organization_id", function (req, res) {
    "use strict";
    res.redirect("/");    
});




// ***********************  RELATIONSHIPS  **************************************************


// CREATE PERSON PERSON RELATIONSHIP

app.post("/personrelationship", function (req, res) {
    "use strict";
    var personid1 = req.body.personrelonepersonid;
    var personid2 = req.body.personreltwopersonid;
    var contacttype = req.body.personcontacttype;
    if ((personid2 !== "0") && (contacttype !== "0")) {
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
                req.flash("error", "Error: These people already this relationship contact type.");
                res.redirect("back");
                }
        } else {
            req.flash("error", "Error: Same person.");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }        
});


// EDIT PERSON PERSON RELATIONSHIP

app.put("/personrelationship/:person_relationship_id", function (req, res) {
    "use strict";
    var personrelationshipid = req.params.person_relationship_id;
    var personid1 = req.body.personrelonepersonid;
    var personid2 = req.body.personreltwopersonid;
    var contacttype = req.body.personcontacttype;
    var relationshiptype = req.body.personrelationshiptype;
    var endreason = (req.body.personrelationshipendreason).trim();
    if ((personid2 !== "0") && (contacttype !== "0")) {
        var end_date = new Date();
        var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
        var j = thisExists(person_person_relationship, "person_relationship_id", personrelationshipid);
        if (j !== null) {
            var startdate = person_person_relationship[j].start_date;
            var editPersonRelationship = {person_relationship_id:personrelationshipid, person_id1:personid1, person_id2:personid2, lk_contact_type:contacttype, lk_person_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
            person_person_relationship[j] = editPersonRelationship;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Person Person Relationship Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }        
});



// CREATE PERSON ORGANIZATION RELATIONSHIP

app.post("/personorgrelationship", function (req, res) {
    "use strict";
    var personid = req.body.personorgpersonid;
    var organizationid = req.body.personorgorganizationid;
    var contacttype = req.body.personorgcontacttype;
    if ((personid !== "0") && (organizationid !== "0") && (contacttype !== "0")) {
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
            req.flash("error", "Error. This person organization relationship contact type already exists!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }        
});


// EDIT PERSON ORGANIZATION RELATIONSHIP

app.put("/personorgrelationship/:person_organization_id", function (req, res) {
    "use strict";
    var personorganizationid = req.params.person_organization_id;
    var personid = req.body.personorgpersonid;
    var organizationid = req.body.personorgorganizationid;
    var contacttype = req.body.personorgcontacttype;
    var relationshiptype = req.body.personorgrelationshiptype;
    var endreason = (req.body.personorgrelationshipendreason).trim();
    if ((personid !== "0") && (organizationid !== "0") && (contacttype !== "0")) {
        var end_date = new Date();
        var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
        var j = thisExists(person_organization_relationship, "person_organization_id", personorganizationid);
        if (j !== null) {
            var startdate = person_organization_relationship[j].start_date;
            var editPersonOrgRelationship = {person_organization_id:personorganizationid, person_id:personid, organization_id:organizationid, lk_contact_type:contacttype, lk_person_organization_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
            person_organization_relationship[j] = editPersonOrgRelationship;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Person Organization Relationship Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }        
});



// CREATE ORGANIZATION RELATIONSHIP

app.post("/organizationrelationship", function (req, res) {
    "use strict";
    var organizationid1 = req.body.orgreloneorganizationid;
    var organizationid2 = req.body.orgreltwoorganizationid;
    var contacttype = req.body.organizationcontacttype;
    if ((organizationid2 !== "0") && (contacttype !== "0")) {
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
                req.flash("error", "Error: These organizations already have this relationship contact type!");
                res.redirect("back");
            }
        } else {
            req.flash("error", "Error: Same organization!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }        
});


// EDIT ORGANIZATION RELATIONSHIP

app.put("/organizationrelationship/:organization_relationship_id", function (req, res) {
    "use strict";
    var organizationrelationshipid = req.params.organization_relationship_id;
    var organizationid1 = req.body.orgreloneorganizationid;
    var organizationid2 = req.body.orgreltwoorganizationid;
    var contacttype = req.body.organizationcontacttype;
    var relationshiptype = req.body.organizationrelationshiptype;
    var endreason = (req.body.organizationrelationshipendreason).trim();
    if ((organizationid2 !== "0") && (contacttype !== "0")) {
        var end_date = new Date();
        var enddate = (end_date.getMonth() + 1) + "/" + end_date.getDate() + "/" + end_date.getFullYear();
        var j = thisExists(organization_organization_relationship, "organization_relationship_id", organizationrelationshipid);
        if (j !== null) {
            var startdate = organization_organization_relationship[j].start_date;
            var editOrganizationRelationship = {organization_relationship_id:organizationrelationshipid, organization_id1:organizationid1, organization_id2:organizationid2, lk_contact_type:contacttype, lk_organization_relationship_type:relationshiptype, start_date:startdate, end_reason:endreason, end_date:enddate};
            organization_organization_relationship[j] = editOrganizationRelationship;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Organizations Relationship Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");
    }        
});




// ***********************  CONTACT INFO  **************************************************8

// CREATE CONTACT PHONE

app.post("/contactphone", function (req, res) {
    "use strict";
    var personid = req.body.phonepersonid;
    var organizationid = req.body.phoneorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var phonenumber = (req.body.contactphonenumber).trim();
    var phonetype = req.body.contactphonetype;
    var phonenote = (req.body.phonenote).trim();
//    if ((phonenumber !== "") && (phonetype !== "0")) {
    if (phonenumber !== "") {
        var has_phone = thisGroupingExists(contact_phone, "person_id", personid, "organization_id", organizationid, "phone_number", phonenumber);
        if (has_phone === null) {
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
            req.flash("error", "Contact Already Exists!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// EDIT CONTACT PHONE

app.put("/contactphone/:phone_id", function (req, res) {
    "use strict";
    var phoneid = req.params.phone_id;
    var personid = req.body.phonepersonid;
    var organizationid = req.body.phoneorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var phonetype = req.body.contactphonetype;
    var phonenumber = (req.body.contactphonenumber).trim();
    var phonenote = (req.body.phonenote).trim();
//    if ((phonenumber !== "") && (phonetype !== "0")) {
    if (phonenumber !== "") {
        var i = thisExists(contact_phone, "phone_id", phoneid);
        if (i !== null) {
            var editContactPhone = {phone_id: phoneid, person_id: personid, organization_id: organizationid, lk_phone_type: phonetype, phone_number: phonenumber, note: phonenote};
            contact_phone[i] = editContactPhone;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Contact Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});



// CREATE CONTACT EMAIL

app.post("/contactemail", function (req, res) {
    "use strict";
    var personid = req.body.emailpersonid;
    var organizationid = req.body.emailorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var emailaddress = (req.body.contactemailaddress).trim();
    var emailtype = req.body.contactemailtype;
    var emailnote = (req.body.emailnote).trim();
//    if ((emailaddress !== "") && (emailtype !== "0")) {
    if (emailaddress !== "") {
        var has_email = thisGroupingExists(contact_email, "person_id", personid, "organization_id", organizationid, "email_address", emailaddress);
        if (has_email === null) {
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
            req.flash("error", "Contact Already Exists!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// EDIT CONTACT EMAIL

app.put("/contactemail/:email_id", function (req, res) {
    "use strict";
    var emailid = req.params.email_id;
    var personid = req.body.emailpersonid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var emailtype = req.body.contactemailtype;
    var emailaddress = (req.body.contactemailaddress).trim();
    var organizationid = req.body.emailorgid;
    var emailnote = (req.body.emailnote).trim();
//    if ((emailaddress !== "") && (emailtype !== "0")) {
    if (emailaddress !== "") {
        var i = thisExists(contact_email, "email_id", emailid);
        if (i !== null) {
            var contactEmail = {email_id: emailid, person_id: personid, organization_id: organizationid, lk_email_type: emailtype, email_address: emailaddress, note: emailnote};
            contact_email[i] = contactEmail;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Contact Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});
    

// CREATE CONTACT FAX

app.post("/contactfax", function (req, res) {
    "use strict";
    var personid = req.body.faxpersonid;
    var organizationid = req.body.faxorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var faxnumber = (req.body.contactfaxnumber).trim();
    var faxtype = req.body.contactfaxtype;
    var faxnote = (req.body.faxnote).trim();
//    if ((faxnumber !== "") && (faxtype !== "0")) {
    if (faxnumber !== "") {
        var has_fax = thisGroupingExists(contact_fax, "person_id", personid, "organization_id", organizationid, "fax_number", faxnumber);
        if (has_fax === null) {
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
            req.flash("error", "Contact Already Exists!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// EDIT CONTACT FAX

app.put("/contactfax/:fax_id", function (req, res) {
    "use strict";
    var faxid = req.params.fax_id;
    var personid = req.body.faxpersonid;
    var organizationid = req.body.faxorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var faxtype = req.body.contactfaxtype;
    var faxnumber = (req.body.contactfaxnumber).trim();
    var faxnote = (req.body.faxnote).trim();
//    if ((faxnumber !== "") && (faxtype !== "0")) {
    if (faxnumber !== "") {
        var i = thisExists(contact_fax, "fax_id", faxid);
        if (i !== null) {
            var editContactFax = {fax_id: faxid, person_id: personid, organization_id: organizationid, lk_fax_type: faxtype, fax_number: faxnumber, note: faxnote};
            contact_fax[i] = editContactFax;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Contact Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// CREATE CONTACT SOCIAL MEDIA

app.post("/contactmedia", function (req, res) {
    "use strict";
    var personid = req.body.mediapersonid;
    var organizationid = req.body.mediaorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var mediahandle = (req.body.contactmediahandle).trim();
    var mediatype = req.body.contactmediatype;
    var medianote = (req.body.medianote).trim();
//    if ((mediahandle !== "") && (mediatype !== "0")) {
    if (mediahandle !== "") {
        var has_media = thisGroupingExists(contact_media, "person_id", personid, "organization_id", organizationid, "media_handle", mediahandle);
        if (has_media === null) {
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
            req.flash("error", "Contact Already Exists!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// EDIT CONTACT SOCIAL MEDIA

app.put("/contactmedia/:media_id", function (req, res) {
    "use strict";
    var mediaid = req.params.media_id;
    var personid = req.body.mediapersonid;
    var organizationid = req.body.mediaorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var mediatype = req.body.contactmediatype;
    var mediahandle = (req.body.contactmediahandle).trim();
    var medianote = (req.body.medianote).trim();
//    if ((mediahandle !== "") && (mediatype !== "0")) {
    if (mediahandle !== "") {
        var i = thisExists(contact_media, "media_id", mediaid);
        if (i !== null) {
            var editContactMedia = {media_id: mediaid, person_id: personid, organization_id: organizationid, lk_media_type: mediatype, media_handle: mediahandle, note: medianote};
            contact_media[i] = editContactMedia;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Contact Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// CREATE CONTACT ADDRESS

app.post("/contactaddress", function (req, res) {
    "use strict";
    var personid = req.body.addresspersonid;
    var organizationid = req.body.addressorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var addresstype = req.body.contactaddresstype;
    var street = (req.body.contactstreet).trim();
    var city = (req.body.contactcity).trim();
    var state = (req.body.contactstate).trim();
    var zipcode = (req.body.contactzipcode).trim();
    var statecode = req.body.contactstatecode;
    var countrycode = req.body.contactcountrycode;
    var addressnote = (req.body.addressnote).trim();
//    if ((addresstype !== "0") && (street !== "") && (city !== "") && (state !== "") && (zipcode != "")) {
    if ((street !== "") && (city !== "") && (state !== "") && (zipcode != "")) {
        var has_address = thisGroupingExists(contact_address, "person_id", personid, "organization_id", organizationid, "address", street);
        if (has_address === null) {
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
            req.flash("error", "Contact Already Exists!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});


// EDIT CONTACT ADDRESS

app.put("/contactaddress/:address_id", function (req, res) {
    "use strict";
    var addressid = req.params.address_id;
    var personid = req.body.addresspersonid;
    var organizationid = req.body.addressorgid;
    if (personid === "") {
        personid = null;
    }
    if (organizationid === "0") {
        organizationid = null;
    }
    var addresstype = req.body.contactaddresstype;
    var street = (req.body.contactstreet).trim();
    var city = (req.body.contactcity).trim();
    var state = (req.body.contactstate).trim();
    var zipcode = (req.body.contactzipcode).trim();
    var statecode = req.body.contactstatecode;
    var countrycode = req.body.contactcountrycode;
    var addressnote = (req.body.addressnote).trim();
//    if ((addresstype !== "0") && (street !== "") && (city !== "") && (state !== "") && (zipcode != "")) {
    if ((street !== "") && (city !== "") && (state !== "") && (zipcode != "")) {
        var i = thisExists(contact_address, "address_id", addressid);
        if (i !== null) {
            var editContactAddress = {address_id: addressid, person_id: personid, organization_id: organizationid, lk_address_type: addresstype, address: street, city: city, lk_state: state, zipcode: zipcode, lk_statecode: statecode, lk_countrycode: countrycode, note: addressnote};
            contact_address[i] = editContactAddress;
            res.redirect("back");
        } else {
            req.flash("error", "Sorry, Contact Not Found!");
            res.redirect("back");
        }
    } else {
        req.flash("error", "Fill in required form elements, outlined in red.");
        res.redirect("back");       
    }
});




app.get("*", function (req, res) {
    "use strict";
    res.send("Sorry, page not found.");
});


app.listen(port);