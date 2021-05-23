// *********************************************JAVASCRIPT CODE For ADD SHEETS****************************************************


//*************Store References*****************
let iconContainer = document.querySelector(".icon_container");
let sheetList = document.querySelector(".sheet_list");
let firstSheet = document.querySelector(".sheet");
let sheetArr = sheetListArr[0];
// *********************************************


//Add Event listener when we click on first sheet(Remove active class from all sheet and set active class to sheet which has been clicked)
firstSheet.addEventListener("click", handleClick);
// firstSheet.click();

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
    // create new sheet grid with all default values of cell. 
    initCurrentSheetDb();
    //get sheet database from worksheet database.
    sheetArr = sheetListArr[idx];
    // new page cell value get empty and get default formatting
    initUI();
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
    let sheet = e.currentTarget;
    let allSheets = document.querySelectorAll(".sheet");
    for (let i = 0; i < allSheets.length; i++) {
        allSheets[i].classList.remove("active");
    }
    sheet.classList.add("active");
    //get attribute of sheet idx
    let sheetIdx = sheet.getAttribute("idx");

    //get sheet database
    sheetArr = sheetListArr[sheetIdx - 1];
    initUI();
    // get data from database to ui
    setUI(sheetArr);
    sheet.addEventListener("dblclick",function()
    {
        sheet.remove();
    })

}

//function that used to set default formatting and content of all cells
function initUI() {
    for (let i = 0; i < Allcells.length; i++) {
        Allcells[i].style.fontWeight = "normal";
        Allcells[i].style.fontStyle = "normal";
        Allcells[i].style.textDecoration = "none";
        Allcells[i].style.fontFamily = "Arial";
        Allcells[i].style.fontSize = "16px";
        Allcells[i].style.textAlign = "left";
        Allcells[i].innerText = "";
    }
}

//function that is used to set content of database in UI
function setUI(sheetArr) {
    for (let i = 0; i < sheetArr.length; i++) {
        for (let j = 0; j < sheetArr[i].length; j++) {
            //exact cell
            let cell = document.querySelector(`.grid_cell[rid="${i}"][cid="${j}"]`);
            //get values from sheetArr
            let { isBold, isItalic, isUnderline, fontFamily, fontSize, halign, value } = sheetArr[i][j];
            //set style
            cell.style.fontWeight = isBold == true ? "bold" : "normal";
            cell.style.fontStyle = isItalic == true ? "italic" : "normal";
            cell.style.textDecoration = isUnderline == true ? "underline" : "none";
            cell.style.textAlign = halign == "left" ? "left" : "left";
            cell.style.textAlign = halign == "right" ? "right" : "left";
            cell.style.textAlign = halign == "center" ? "center" : "left";
            cell.innerText = value;
            cell.style.fontSize = fontSize + "px";
            cell.style.fontFamily=fontFamily;
            
        }
    }
}