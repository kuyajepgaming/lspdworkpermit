/*=========================================================
    LSPD WORK PERMIT GENERATOR
    clipboard.js
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================================
        ELEMENTS
    =====================================================*/

    const sidebarPhoto = document.getElementById("photoPreview");
    const permitPhoto = document.getElementById("permitPhoto");

    const PLACEHOLDER = "assets/placeholder.png";

    /*=====================================================
        SET PHOTO
    =====================================================*/

    function setApplicantPhoto(image){

        sidebarPhoto.src = image;
        permitPhoto.src = image;

    }

    /*=====================================================
        RESET PHOTO
    =====================================================*/

    window.resetApplicantPhoto = function(){

        setApplicantPhoto(PLACEHOLDER);

    };

    /*=====================================================
        INITIALIZE
    =====================================================*/

    resetApplicantPhoto();

    /*=====================================================
        PASTE IMAGE
    =====================================================*/

    document.addEventListener("paste",(event)=>{

        if(!event.clipboardData)
            return;

        const items = event.clipboardData.items;

        if(!items)
            return;

        for(const item of items){

            if(item.kind !== "file")
                continue;

            if(!item.type.startsWith("image/"))
                continue;

            const file = item.getAsFile();

            if(!file)
                continue;

            const reader = new FileReader();

            reader.onload = function(e){

                setApplicantPhoto(e.target.result);

            };

            reader.readAsDataURL(file);

            event.preventDefault();

            return;

        }

    });

});