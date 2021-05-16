// ******************************************JAVASCRIPT CODE for Grid **************************************************

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
for (let i = 1; i <= rows; i++) {
    //Create div
    let div = document.createElement("div");
    //set text
    div.innerText = i
    //set attribute
    div.setAttribute("class", "row_container");
    // append 
    leftCol.appendChild(div);
}



//contain all cells info
let sheetArr = [];

//Create grid(100*26)
for (let i = 0; i <=rows; i++) {
    //Create div
    let row = document.createElement("div");
    //set attribute
    let rowArr = [];
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




