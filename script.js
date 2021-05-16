// *********************************************JAVASCRIPT CODE For ADD SHEETS****************************************************

//*************Store References*****************
let iconContainer = document.querySelector(".icon_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet = document.querySelector(".sheet");

// *********************************************


//Add Event listener when we click on first sheet(Remove active class from all sheet and set active class to sheet which has been clicked)
firstSheet.addEventListener("click", handleClick);

//Add Event listener when click on icon container
iconContainer.addEventListener("click", function() {
    //create new div for sheet
    let newSheet = document.createElement("div");
    //Extract all sheets
    let allSheets = document.querySelectorAll(".sheet");
    //exact last sheet
    let lastSheet = allSheets[allSheets.length - 1];
    //exact idx ( idx is a attribute of sheet)
    let idx = lastSheet.getAttribute("idx");
    //convert into Number
    idx=Number(idx);
    //set content 
    newSheet.innerText = `Sheet- ${idx+ 1}`;
    //set idx and class attribute of new sheet
    newSheet.setAttribute("idx",idx+1);
    newSheet.setAttribute("class", "sheet");
    //append new sheet to sheetlist
    sheetList.appendChild(newSheet);
    //new sheetlist (it include new sheets also)
    allSheets = document.querySelectorAll(".sheet");
    //remove active class from all sheets and add active class to particular sheet which is newly created.
    setLastActive(allSheets);
    //Add event listener to new sheet
    newSheet.addEventListener("click", handleClick);
})

//function is used to remove active class from all sheets and add active class to particular sheet which is newly created.
function setLastActive(allSheets) {
    //Remove active class from all sheets
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    //Add active class to last sheet
    allSheets[allSheets.length - 1].classList.add("active");
}

// function that is used to set active class to particular sheet which has been clicked by user
function handleClick(e) {
    //e.currentTarget => jis par add event listener call hua h.
    let sheet = e.currentTarget;
    //extra all sheets
    let allSheets = document.querySelectorAll(".sheet");
    // remove active class
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    // set active class 
    sheet.classList.add("active");

}


