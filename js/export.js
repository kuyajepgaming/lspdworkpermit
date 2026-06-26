/*=========================================================
    LSPD WORK PERMIT GENERATOR
    export.js
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
        ELEMENTS
    =====================================================*/

    const permit = document.getElementById("permit");

    const downloadBtn =
        document.getElementById("downloadBtn");

    const downloadSidebar =
        document.getElementById("downloadSidebar");

    const statusBar =
        document.querySelector(".status-bar span");

    /*=====================================================
        STATUS
    =====================================================*/

    function setStatus(message){

        if(statusBar){

            statusBar.textContent = message;

        }

    }

    /*=====================================================
        SANITIZE FILE NAME
    =====================================================*/

    function sanitizeFileName(name){

        return name

            .replace(/[\\/:*?"<>|]/g,"")

            .trim();

    }

    /*=====================================================
        EXPORT
    =====================================================*/

    async function exportPermit(){

        try{

            downloadBtn.disabled = true;

            if(downloadSidebar){

                downloadSidebar.disabled = true;

            }

            setStatus("Generating permit...");

            permit.classList.add("exporting");

            const canvas = await html2canvas(permit,{

                backgroundColor:null,

                scale:4,

                useCORS:true,

                allowTaint:true,

                logging:false

            });

            const image = canvas.toDataURL(

                "image/png"

            );

            const applicant = document
                .getElementById("name")
                .value;

            let fileName =
                sanitizeFileName(applicant);

            if(fileName === ""){

                fileName = "LSPD Work Permit";

            }

            const link =
                document.createElement("a");

            link.download =
                fileName + ".png";

            link.href = image;

            link.click();

            setStatus("Permit downloaded.");

        }

            catch(error){

                console.error(error);

                alert(error.message);

                setStatus(error.message);

            }

        finally{

            permit.classList.remove("exporting");

            downloadBtn.disabled = false;

            if(downloadSidebar){

                downloadSidebar.disabled = false;

            }

            setTimeout(()=>{

                setStatus("Ready");

            },2000);

        }

    }

    /*=====================================================
        EVENTS
    =====================================================*/

    downloadBtn.addEventListener(

        "click",

        exportPermit

    );

    if(downloadSidebar){

        downloadSidebar.addEventListener(

            "click",

            exportPermit

        );

    }

});