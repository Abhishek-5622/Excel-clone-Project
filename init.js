// ******************************************JAVASCRIPT CODE for Grid and database**************************************************

//*************************Store Reference**********************************
let topRow = document.querySelector(".top_row");
let leftCol = document.querySelector(".left_col");
let grid = document.querySelector(".grid");

// **************************************************************************

//set column no. and row number
let columns = 26;
let rows = 100;

//Append columns to topRow(A B C D E F ......Z)
for (let i = 0; i < columns; i++) {
    //Create div
    let div = document.createElement("div");
    //set text
    div.innerText = String.fromCharCode(65 + i);
    //set attribute
    div.setAttribute("class", "col_container");
    // append 
    topRow.appendChild(div);
}

//Append row to leftRow(1 2 3 4......100)
for (let i = 0; i < rows; i++) {
    //Create div
    let div = document.createElement("div");
    //set text
    div.innerText = i+1;
    //set attribute
    div.setAttribute("class", "row_container");
    // append 
    leftCol.appendChild(div);
}




//create database of all sheets
sheetListArr = [];

//function that is used to create sheet database for one sheet
function initCurrentSheetDb() {
//create sheetArr that contain information of all cell of sheet
let sheetArr = [];
//Create grid(100*26)
for (let i = 0; i <rows; i++) {
    
    //Create div
    let row = document.createElement("div");
    //create row array
    let rowArr = [];
    //set attribute
    row.setAttribute("class", "row");

    for (let j = 0; j < columns; j++) {
        //Create div
        let cell = document.createElement("div");
        //set attribute
        cell.setAttribute("class", "grid_cell");
        cell.setAttribute("rid", i);
        cell.setAttribute("cid", j);
        //type in cell
        cell.setAttribute("contenteditable", "true");
        //append
        row.appendChild(cell);
        //create object of each cell
        let cellObj = {
            isBold: false,
            isItalic:false,
            isUnderline:false,
            halign:"left",
            fontFamily:"Arial",
            fontSize:16,
            color:"black",
            bgcolor:"white",
            value:"",
            formula:"",
            children:[]
        }
        //push cell object in rowArr
        rowArr.push(cellObj);
    }
    //append row in grid
    grid.appendChild(row);
    //push rowArr in sheetArr
    sheetArr.push(rowArr);
    
}
//add sheet database to all sheet database
sheetListArr.push(sheetArr);
}

// create new sheet grid with all default values of cell. 
initCurrentSheetDb();
