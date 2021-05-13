// ******************************JS CODE for Grid **************************************

//set column no. and row number
let columns = 26;
let rows = 100;

//Store Reference
let topRow = document.querySelector(".top_row");
let leftCol = document.querySelector(".left_col");
let grid = document.querySelector(".grid");

//Append columns to topRow(A B C D E F ......Z)
for (let i = 0; i < columns; i++) {
    //Create div
    let div = document.createElement("div");
    //set text
    div.innerText = String.fromCharCode(65 + i);
    //set attribute
    div.setAttribute("class", "cell");
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
    div.setAttribute("class", "block");
    // append 
    leftCol.appendChild(div);
}

//Create grid(100*26)
for (let i = 1; i <=rows; i++) {
    //Create div
    let row = document.createElement("div");
    //set attribute
    row.setAttribute("class", "row");

    for (let j = 0; j < columns; j++) {
        //Create div
        let div = document.createElement("div");
        //set text
        div.innerText =
            `${i} ${String.fromCharCode(65 + j)}`;
        //set attribute
        div.setAttribute("class", "cell");
        //append
        row.appendChild(div);
    }
    //append rows to grid
    grid.appendChild(row);
}