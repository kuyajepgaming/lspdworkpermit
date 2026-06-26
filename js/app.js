/*=========================================================
    LSPD WORK PERMIT GENERATOR
    app.js
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
        INPUT ELEMENTS
    =====================================================*/

    const nameInput = document.getElementById("name");
    const citizenIdInput = document.getElementById("citizenId");
    const dobInput = document.getElementById("dob");
    const citizenshipInput = document.getElementById("citizenship");

    const issueDateInput = document.getElementById("issueDate");
    const validityInput = document.getElementById("validity");
    const expirationInput = document.getElementById("expiration");
    const feeInput = document.getElementById("fee");

    const officerInput = document.getElementById("officer");
    const badgeInput = document.getElementById("badge");
    const signatureInput = document.getElementById("signatureInput");

    /*=====================================================
        PREVIEW ELEMENTS
    =====================================================*/

    const pName = document.getElementById("pName");
    const pCitizenId = document.getElementById("pCitizenId");
    const pDOB = document.getElementById("pDOB");
    const pCitizenship = document.getElementById("pCitizenship");

    const pIssueDate = document.getElementById("pIssueDate");
    const pValidity = document.getElementById("pValidity");
    const pExpiration = document.getElementById("pExpiration");
    const pFee = document.getElementById("pFee");

    const signature = document.getElementById("signature");
    const printedOfficer = document.getElementById("printedOfficer");
    const pBadge = document.getElementById("pBadge");

    /*=====================================================
        BUTTONS
    =====================================================*/

    const newPermitBtn = document.getElementById("newPermitBtn");
    const newPermitSidebar = document.getElementById("newPermitSidebar");

    /*=====================================================
        DEFAULT VALUES
    =====================================================*/

    function initializeDefaults(){

        validityInput.value = 14;

        feeInput.value = "$5,000";

        issueDateInput.valueAsDate = new Date();

    }

    /*=====================================================
        LOCAL STORAGE
    =====================================================*/

    function loadOfficer() {

        officerInput.value = localStorage.getItem("officerName") || "";
        signatureInput.value = localStorage.getItem("officerSignature") || "";
        badgeInput.value = localStorage.getItem("badgeNumber") || "";
    }

    function saveOfficer() {

        localStorage.setItem("officerName", officerInput.value);
        localStorage.setItem("officerSignature", signatureInput.value);
        localStorage.setItem("badgeNumber", badgeInput.value);
    }

    /*=====================================================
        DATE FORMAT
    =====================================================*/

    function formatDate(date){

        if(!date) return "";

        return new Date(date).toLocaleDateString("en-US",{

            year:"numeric",

            month:"long",

            day:"numeric"

        });

    }

    /*=====================================================
        EXPIRATION DATE
    =====================================================*/

    function calculateExpiration(){

        if(!issueDateInput.value){

            expirationInput.value = "";

            return;

        }

        let validity =
            parseInt(validityInput.value);

        if(isNaN(validity) || validity < 1){

            validity = 1;

            validityInput.value = 1;

        }

        const issue =
            new Date(issueDateInput.value);

        issue.setDate(
            issue.getDate() + validity
        );

        expirationInput.value =
            formatDate(issue);

    }

    /*=====================================================
        UPDATE PERMIT
    =====================================================*/

    function updatePermit(){

        calculateExpiration();

        pName.textContent =
            nameInput.value;

        pCitizenId.textContent =
            citizenIdInput.value;

        pDOB.textContent =
            formatDate(dobInput.value);

        pCitizenship.textContent =
            citizenshipInput.value;

        pIssueDate.textContent =
            formatDate(issueDateInput.value);

        pValidity.textContent =
            validityInput.value + " Days";

        pExpiration.textContent =
            expirationInput.value;

        pFee.textContent =
            feeInput.value;

        signature.textContent =
            signatureInput.value.trim();

        printedOfficer.textContent =
            officerInput.value.trim();

        pBadge.textContent =
            badgeInput.value;

        saveOfficer();

    }
        /*=====================================================
        INPUT LISTENERS
    =====================================================*/

    const liveInputs = [

        nameInput,
        citizenIdInput,
        dobInput,
        citizenshipInput,

        issueDateInput,
        validityInput,
        feeInput,

        officerInput,
        badgeInput

    ];

    liveInputs.forEach(input => {

    officerInput.addEventListener("input", updatePermit);

    badgeInput.addEventListener("input", updatePermit);
    
    signatureInput.addEventListener("input", updatePermit);

    });

    /*=====================================================
        NEW PERMIT
    =====================================================*/

    function newPermit(){

        /*---------------------------------------------
            Applicant Information
        ---------------------------------------------*/

        nameInput.value = "";

        citizenIdInput.value = "";

        dobInput.value = "";

        citizenshipInput.value = "";

        /*---------------------------------------------
            Permit Information
        ---------------------------------------------*/

        issueDateInput.valueAsDate = new Date();

        validityInput.value = 14;

        feeInput.value = "$5,000";

        /*---------------------------------------------
            Reset Applicant Photo
        ---------------------------------------------*/

        if(typeof window.resetApplicantPhoto === "function"){

            window.resetApplicantPhoto();

        }

        /*---------------------------------------------
            Update Preview
        ---------------------------------------------*/

        updatePermit();

        /*---------------------------------------------
            Ready for Next Permit
        ---------------------------------------------*/

        nameInput.focus();

    }

    /*=====================================================
        BUTTON EVENTS
    =====================================================*/

    if(newPermitBtn){

        newPermitBtn.addEventListener(

            "click",

            newPermit

        );

    }

    if(newPermitSidebar){

        newPermitSidebar.addEventListener(

            "click",

            newPermit

        );

    }

    /*=====================================================
        INITIALIZE APPLICATION
    =====================================================*/

    initializeDefaults();

    loadOfficer();

    updatePermit();

});
