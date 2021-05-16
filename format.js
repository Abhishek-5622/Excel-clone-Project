// ******************************************Formatting JAVASCRIPT CODE**********************************************

//**********************Store reference*******************************
let Allcells = document.querySelectorAll(".grid_cell");
let addressElem = document.querySelector(".address_bar");
let bold = document.querySelector(".fa-bold");
let italic = document.querySelector(".fa-italic");
let underline = document.querySelector(".fa-underline");
let leftBtn = document.querySelector("#left");
let rightBtn = document.querySelector("#right");
let centerBtn = document.querySelector("#center");
let align = document.querySelectorAll(".align");
let fontSizeBtn = document.querySelector(".font_size");
let fontFamilyBtn =  document.querySelector(".font_family");
let color = document.querySelector(".color");
let bgcolor = document.querySelector(".bgcolor");
let formulabar = document.querySelector(".formula_bar");

// *********************************************************************

//add event listener when we click on bold
bold.addEventListener("click", function () {
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //if isbold is true => BOLD button is already click
    if (cellObj.isBold == true) {
        //remove bold style
        uiCell.style.fontWeight = "normal";//add feature/effect
        //remove active class
        bold.classList.remove("menu_active");//add effect on ui
        //set false in cellobj
        cellObj.isBold = false;//add on db
    } else {
        //set bold
        uiCell.style.fontWeight = "bold";
        //add class
        bold.classList.add("menu_active");
        //set in cellObj
        cellObj.isBold = true;
    }
})

//add event listener when we click on italic
italic.addEventListener("click", function () {
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //if isitalic is true
    if (cellObj.isItalic == true) {
        //remove italic
        uiCell.style.fontStyle = "normal";///add feature
        //remove active class
        italic.classList.remove("menu_active");//add effect on ui
        //set false in cellobj
        cellObj.isItalic = false;//add on db
    } else {
        //set italic
        uiCell.style.fontStyle = "italic";
        //add cactive class
        italic.classList.add("menu_active");
        //set in cellObj
        cellObj.isItalic = true;
    }
})

//add event listener when we click on underline
underline.addEventListener("click", function () {
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //if isunderline is true
    if (cellObj.isUnderline == true) {
        //remove underline
        uiCell.style.textDecoration = "none";///add feature
        //remove active class
        underline.classList.remove("menu_active");//add effect on ui
        //set false in cellobj
        cellObj.isUnderline = false;//add on db
    } else {
        //set underline
        uiCell.style.textDecoration = "underline";
        //add class
        underline.classList.add("menu_active");
        //set in cellObj
        cellObj.isUnderline = true;
    }
})
//add event listener when we click on alignment
for(let i=0;i<align.length;i++)
{
    align[i].addEventListener("click",function(e)
    {
        //get current target
        let alignBtn = e.currentTarget;
        //get attribute
        let currAlign = alignBtn.getAttribute("id");
        // get row id and column id from address and get cell
        let uiCell = getcell();
        //get row id and column id
        let { rid, cid } = getRIdIdfromAddress();
        // create cell object
        let cellObj = sheetArr[rid][cid];
        //remove active class from all align box
        for(let j=0;j<align.length;j++)
        {
            align[j].classList.remove("menu_active");
        }
        
        if(cellObj.halign==currAlign)
        {
            //default behaviour (left)
            uiCell.style.textAlign="left";
            cellObj.halign="left";
        }
       
        else{
            //set alignment
            uiCell.style.textAlign=currAlign;
            //set in cell object
            cellObj.halign=currAlign;
            //add active class
            alignBtn.classList.add("menu_active");
        }

    })
}

//add event listener when we select font family
fontFamilyBtn.addEventListener("change", function () {
    //get value
    let fontFamilyValue = fontFamilyBtn.value;
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //set font family in ui
    uiCell.style.fontFamily=fontFamilyValue;
    //set font family in db
    cellObj.fontFamily = fontFamilyValue;//add on db   
})

//add event listener when we select size
fontSizeBtn.addEventListener("change", function () {
    //get value
    let fontSizeValue = fontSizeBtn.value;
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //set font size in ui
    uiCell.style.fontSize=fontSizeValue+"px";
    //set font size in db
    cellObj.fontSize = fontSizeValue;//add on db
    
})
//add event listener when we select color
color.addEventListener("change", function () {
    //get value
    let colorValue = color.value;
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //set font color in ui
    uiCell.style.color=colorValue;
    //set font color in db
    cellObj.color = colorValue;//add on db
    
})
//add event listener when we select bgcolor
bgcolor.addEventListener("change", function () {
    //get value
    let bgcolorValue = bgcolor.value;
    // get row id and column id from address and get cell
    let uiCell = getcell();
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress();
    // create cell object
    let cellObj = sheetArr[rid][cid];
    //set font bgcolor in ui
    uiCell.style.backgroundColor=bgcolorValue;
    //set font bgcolor in db
    cellObj.bgcolor = bgcolorValue;//add on db
    
})
// get cell
function getcell() {
    //get address
    let address = addressElem.value;
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress(address);
    //return cell
    return document.querySelector(`.grid_cell[rid="${rid}"][ cid="${cid}"]`)
}

//function that is used to get row id and column id from address
function getRIdIdfromAddress() {
    //get address
    let address = addressElem.value;
    //get column id
    let cid = Number(address.charCodeAt(0)) - 65;
    // get row id
    let rid = Number(address.slice(1)) - 1;
    //return rid and cid
    return { cid, rid };
}

//all cells
for (let i = 0; i < Allcells.length; i++) {
    //click on any cell
    Allcells[i].addEventListener("click", function () {
        //fetch attribute
        let cid = Allcells[i].getAttribute("cid");
        let rid = Allcells[i].getAttribute("rid");
        //convert into number
        cid = Number(cid);
        rid = Number(rid);
        //set value on address bar
        addressElem.value = `${String.fromCharCode(65 + cid)}${rid + 1}`;
        //create cell obj
        let cellObj = sheetArr[rid][cid];
        //check that cell is bold or not
        if (cellObj.isBold==true) {
            bold.classList.add("menu_active");
        }else{
            bold.classList.remove("menu_active"); 
        }

        //check that cell is italic or not
        if (cellObj.isItalic==true) {
            italic.classList.add("menu_active");
        }else{
            italic.classList.remove("menu_active"); 
        }

        //check that cell is underline or not
        if (cellObj.isUnderline==true) {
            underline.classList.add("menu_active");
        }else{
            underline.classList.remove("menu_active"); 
        }

        //For Alignment
        //remove active class
        for (let i = 0; i < align.length; i++) {
            align[i].classList.remove("menu_active");
        }
        //For Left alignment
        if (cellObj.halign == "left") {
            leftBtn.classList.add("menu_active")
        //For right alignment
        } else if (cellObj.halign == "right") {
            rightBtn.classList.add("menu_active")
        //For center alignment
        } else if (cellObj.halign == "center") {
            centerBtn.classList.add("menu_active")
        }
        
        //For Font Family
        fontFamilyBtn.value=cellObj.fontFamily;

        //For Font Size
        fontSizeBtn.value=cellObj.fontSize;

        //For Font color
        color.value=cellObj.color;

        //For background
        bgcolor.value=cellObj.bgcolor;

        //for formula bar
        formulabar.value=cellObj.formula;
    }
    )
}
//click 
Allcells[0].click();
