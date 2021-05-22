let download = document.querySelector(".download");
let open = document.querySelector(".open");
let input = document.querySelector(".file-taker");
let newBt = document.querySelector(".new");
let fileNameContainer = document.querySelector(".file_name_container");
let Save = document.querySelector(".Save");
let Cancel = document.querySelector(".Cancel");
let fileName = document.querySelector("#file_name");
console.log(fileName);
download.addEventListener("click", function () {

    fileNameContainer.style.display="block";
    let name = fileName.value;
    console.log(name);
    Save.addEventListener("click",function()
    {
        console.log(name);
        if(name=="")
        {
            alert("Enter Name of the File");
        }
        else{
            let a = document.createElement("a");
            // json -> xlsx -> excel
            let url = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sheetListArr));
            a.setAttribute("href", url);
            a.setAttribute("download", name+".json");
            a.click();
            a.remove();
            fileNameContainer.style.display="none";
            fileName.value="";
        }
    })
    Cancel.addEventListener("click",function()
    {
        fileNameContainer.style.display="none";
        fileName.value="";
    })
    // sheetListArr
    
})
open.addEventListener("click", function () {
    // input type file
    input.click();
    // select file
    input.addEventListener("change", function () {
        // file obj arr
        let filesArr = input.files;
        let fileObj = filesArr[0];
        console.log(fileObj);
        console.log("Done");
        // frontend api -> file reader 
        let fr = new FileReader();
        fr.readAsText(fileObj);
        fr.addEventListener("load", function () {
            let stringData = fr.result
            sheetListArr = JSON.parse(stringData);
            sheetArr = sheetListArr[0];
            setUIs(sheetArr);
            console.log("UI Done");
            for (let i = 0; i < sheetListArr.length-1; i++) {
                iconContainer.click();
            }
        })
    })
})


function setUIs(sheetArr) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let cellElem = document.querySelector(`.grid_cell[rid="${i}"][cid="${j}"]`);
            let cellObj = sheetArr[i][j];
            cellElem.innerText = cellObj.value;
            cellElem.style.fontWeight = cellObj.isBold == true ? "bold" : "normal";
            cellElem.style.fontSize = cellObj.fontSize + "px";
        }
    }
    document.querySelector(`.grid_cell[rid="${0}"][cid="${0}"]`).click();
}



newBt.addEventListener("click",function()
{
    initUI();
    sheetArr = sheetListArr[0];
    setDB(sheetArr);
    let allSheets = document.querySelectorAll(".sheet");
    console.log(allSheets.length);
    for(let i=allSheets.length-1;i>=1;i--)
    {
        allSheets[i].remove();
    }
})


function setDB(sheetArr) {
    for (let i = 0; i <rows; i++) {
        for(let j=0;j<columns;j++){
            //create cell obj
            cellObj = sheetArr[i][j];
            cellObj.isBold=false;
            cellObj.isItalic=false;
            cellObj.isUnderline=false;
            cellObj.halign="left";
            cellObj.fontFamily="Arial";
            cellObj.fontSize="16px";
            cellObj.color="black";
            cellObj.bgcolor="white";
            cellObj.value="";
            cellObj.formula="";
            cellObj.children=[];
        }
}
}