// *****************************************New Open Save JavaScript code*************************************

// **********Store Reference*******************
let download = document.querySelector(".download");
let open = document.querySelector(".open");
let input = document.querySelector(".file-taker");
let newBt = document.querySelector(".new");
let fileNameContainer = document.querySelector(".file_name_container");
let Save = document.querySelector(".Save");
let Cancel = document.querySelector(".Cancel");
let fileName = document.querySelector("#file_name");

// **********************************************

//click on download icon
download.addEventListener("click", function () {
    //display file name container
    fileNameContainer.style.display="block";
    
    //click on safe
    Save.addEventListener("click",function()
    {
        //get file name
        let Fname = fileName.value;
        //if file name is not enter => alert message come
        if(Fname=="")
        {
            alert("Enter Name of the File");
        }
        else{
            //create anchore tag
            let a = document.createElement("a");
            //create url
            let url = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(sheetListArr));
            //set attribute
            a.setAttribute("href", url);
            a.setAttribute("download", Fname+".json");
            //click on anchore tag
            a.click();
            //remove anchore tag
            a.remove();
            //file name container display none
            fileNameContainer.style.display="none";
            //set empty file name
            fileName.value="";
        }
    })
    //click on cancel
    Cancel.addEventListener("click",function()
    {
        //file name container display none
        fileNameContainer.style.display="none";
        //set empty file name
        fileName.value="";
    }) 
})

//click on open icon
open.addEventListener("click", function () {
    //click on input
    input.click();
    //select file
    input.addEventListener("change", function () {
        //file object array
        let filesArr = input.files;
        //get first file
        let fileObj = filesArr[0];
        // frontend api -> file reader 
        let fr = new FileReader();
        //read file
        fr.readAsText(fileObj);
        //load 
        fr.addEventListener("load", function () {
            let stringData = fr.result
            sheetListArr = JSON.parse(stringData);
            sheetArr = sheetListArr[0];
            setUIs(sheetArr);
            for (let i = 0; i < sheetListArr.length-1; i++) {
                iconContainer.click();
            }
        })
    })
})

//function that is use to set ui
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


//click on new btn
newBt.addEventListener("click",function()
{
    //set ui
    initUI();
    sheetArr = sheetListArr[0];
    //set database
    setDB(sheetArr);
    let allSheets = document.querySelectorAll(".sheet");
    //set no of sheet to 1
    for(let i=allSheets.length-1;i>=1;i--)
    {
        allSheets[i].remove();
    }
})

//set set Database
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