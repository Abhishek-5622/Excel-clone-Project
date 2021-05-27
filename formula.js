// ******************************************JAVASCRIPT FOR FORMULA*******************************************

//all cells
for (let i = 0; i < Allcells.length; i++) {
    // add event listener of blur
    // focus => present cell
    // blur => previous cell
    Allcells[i].addEventListener("blur", function () {
        //get rid and cid from address
        let { rid, cid } = getRIdIdfromAddress();
        //create cell object
        let cellObj = sheetArr[rid][cid];
        //if cell value and cell object value is same => not need to do any thing
        if (cellObj.value == Allcells[i].innerText) {
            return;
        }
        //set in cell object
        cellObj.value = Allcells[i].innerText;
        // telling children to reevaluate and update
        updateChildren(cellObj);

        // isformulacyclic
        
        //if formula is present in cell object => or tab bhi we click on formula bar => 2 possibilty occur
        // 1. we want to chnage formula
        // 2 we want to remove formula from formula bar 
        if (cellObj.formula) {
            removeFormula(addressElem.value, cellObj);
        }
    }
    )
}

// function that is used to show effect of chnaging a cell value to other cellls.
// eg:
//    A1=20   B1=A1*2
//    if A1 value get change => B1 should also change
// this function is used to solve this problem.  A1 has children=[B1] . so A1 knows that b1 uses its value.
function updateChildren(cellObj) {
    //get children
    let children = cellObj.children;
    //all children
    for (let i = 0; i < children.length; i++) {
        //get child
        let child = children[i];
        //get column id
        let cCid = Number(child.charCodeAt(0)) - 65;
        //get row id
        let cRid = Number(child.slice(1)) - 1;
        // get formula
        let cFormula = sheetArr[cRid][cCid].formula;
        //get value from formula
        let value = evaluateFormula(cFormula);
        //set value in UI and DB
        setCell(value, cRid, cCid, cFormula);
        //recursion => sometimes, child is also a parents of some cell. thats why we call same function of child.
        // base case is not present because in some cases there is empty children Array.In that case it get stop .
        updateChildren(sheetArr[cRid][cCid]);
    }
}

//function is used to remove child from children array of parent.
function removeFormula(myName, cellObj) {
    //get formula
    let cFormula = cellObj.formula;
    //split formula
    let formulaTokens = cFormula.split(" ");
    //traverse formula
    for (let i = 0; i < formulaTokens.length; i++) {
        //get first character
        let ascii = formulaTokens[i].charCodeAt(0);
        // check if first character is in range of 65 to 90 => alpabet
        if (ascii >= 65 && ascii <= 90) {
            // valid cell
            let parentCell = formulaTokens[i];
            //set row id and column id
            let pCid = Number(parentCell.charCodeAt(0)) - 65;
            let pRid = Number(parentCell.slice(1)) - 1;
            //get parent object
            let parentObj = sheetArr[pRid][pCid]
            //get idx of address name present in children array
            let idx = parentObj.children.indexOf(myName);
            //remove idx position value
            parentObj.children.splice(idx, 1);

        }
    }
    //set formula to empty
    cellObj.formula = "";
}

//add  event listener on formula bar
formulabar.addEventListener("keydown", function (e) {
    //if we press enter and formula bar is not empty.
    if (e.key == "Enter" && formulabar.value != "") {
        //get formula

        let cFormula = formulabar.value;
        //get row id and column id
        let { rid, cid } = getRIdIdfromAddress();
        //create cell object
        let cellObj = sheetArr[rid][cid];
        let oldFormula =cellObj.formula;
        //if formula present in formula bar is same as formula present cell object => nothing to do.
        if(cellObj.formula==cFormula){
            return;
        }
setFormula(cFormula, addressElem.value)
        // isformulaCylic
//if cycle detected remove new formula and add old formula

// if (isCycle(addressElem.value, cFormula)) {
//     removeFormula(addressElem.value, cellObj);

//     //set old formula
//     setFormula(oldFormula, addressElem.value)
//     cellObj.formula = oldFormula;
//     formulabar.value = oldFormula;

//     alert("cycle detected, formula didn't update");
//     return;
// }

        //if formula is present in cell object => or tab bhi we click on formula bar => 2 possibilty occur
        // 1. we want to chnage formula
        // 2 we want to remove formula from formula bar
        if (cellObj.formula) {
            removeFormula(addressElem.value, cellObj);
        }
        //get value
        let val = evaluateFormula(cFormula);
        //set value in ui and db
        setCell(val, rid, cid, cFormula);
        // parent
        setFormula(cFormula, addressElem.value);
    }
})

//Function is used to solve formula expression and get value.
function evaluateFormula(cFormula) {
    //split the formula on the bases of space
    let formulaTokens = cFormula.split(" ");
    //traverse the array
    for (let i = 0; i < formulaTokens.length; i++) {
        //get first character 
        let ascii = formulaTokens[i].charCodeAt(0);
        //check first character is in range of 65 to 90
        if (ascii >= 65 && ascii <= 90) {
            // valid cell
            let parentCell = formulaTokens[i];
            //get row id and column id
            let pCid = Number(parentCell.charCodeAt(0)) - 65;
            let pRid = Number(parentCell.slice(1)) - 1;
            //get value from db 
            // eg : if formula is ( A1 * 2)
            // get value of A1  from db
            let pValue = sheetArr[pRid][pCid].value;
            //set value of cell(A1) in formula
            formulaTokens[i] = pValue;
        }
    }
    //join array on the base of space
    let finalFormula = formulaTokens.join(" ");
    //return value that calculated by formula
    //eval is predefine function = > but not use because anyone can change eval function easily.
    // return eval(finalFormula);

    //infixEval is used to find value of formula
    let value = infixEval(finalFormula);
    return value;


}

//function that is used to add child in children array.
function setFormula(cFormula, myName) {
    //split the formula on the bases of space.
    let formulaTokens = cFormula.split(" ");
    //traverse array
    for (let i = 0; i < formulaTokens.length; i++) {
        //get first character of array element
        let ascii = formulaTokens[i].charCodeAt(0);
        // if first character is in range of 65 to 90 => it is alpabet
        if (ascii >= 65 && ascii <= 90) {
            // valid cell
            let parentCell = formulaTokens[i];
            //get row and column id
            let pCid = Number(parentCell.charCodeAt(0)) - 65;
            let pRid = Number(parentCell.slice(1)) - 1;
            //add child in children array.
            sheetArr[pRid][pCid].children.push(myName);
        }
    }
}

//function that is used to set value in UI and set/update value in DB.
function setCell(val, rid, cid, cFormula) {
    // get cell
    let uiCell = document.querySelector(`.grid_cell[rid="${rid}"][ cid="${cid}"]`);
    //set text
    uiCell.innerText = val;
    //create cell object
    let cellObj = sheetArr[rid][cid] ;
    //set value in db
    cellObj.value = val;
    //set formula in db
    cellObj.formula = cFormula;
}



//Create custom stack
class myStack {
    constructor() {
        this.arr = [];
        this.s = -1;
    }
    //push function is used to add integer
    push(x){
        this.arr.push(x);
        this.s++;
    }
    //pop function is used to remove integer
    pop(){
        if(this.s==-1)return "err";
        this.s--;
        return this.arr.pop();
    }
    //peek function is used to see top integer
    peek(){
        if(this.s==-1)return "err";
        return this.arr[this.s];
    }
    //size function is used to get size of stack
    size(){
        return this.s+1;
    }


}

//function is used to solve formula and get value
function infixEval(formula) {
    //split on the bases of space
    let exp = formula.split(" ");
    //create stack
    let operands = new myStack();
    let operators = new myStack();
    //traverse in exp array
    for (let i = 0; i < exp.length; i++) {
        //get items of array
        let ch = exp[i];

        if (ch == '(') {
            operators.push(ch);
        } 
        //check it is number or not
        else if (isNumber(ch)) {
            operands.push(parseInt(ch));
        } 

        else if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {

            while (operators.size() > 0 && operators.peek() != '(' && precedence(ch) <= precedence(operators.peek())) {
                let val2 = operands.pop();
                let val1 = operands.pop();
                let op = operators.pop();

                let opval = operation(val1, val2, op);
                operands.push(opval);
            }

            operators.push(ch);
        } else if (ch == ')') {
            while (operators.size() > 0 && operators.peek() != '(') {
                let val2 = operands.pop();
                let val1 = operands.pop();
                let op = operators.pop();

                let opval = operation(val1, val2, op);
                operands.push(opval);
            }

            if (operators.size() > 0) {
                operators.pop();
            }
        }
    }

    while (operators.size() > 0) {
        let val2 = operands.pop();
        let val1 = operands.pop();
        let op = operators.pop();

        let opval = operation(val1, val2, op);
        operands.push(opval);
    }

    let val = operands.pop();
    return val;
}

// function that given precedence value
function precedence(op) {
    if (op == '+') {
        return 1;
    } else if (op == '-') {
        return 1;
    } else if (op == '*') {
        return 2;
    } else {
        return 2;
    }
}

//function that solve operation
function operation(val1, val2, op) {
    if (op == '+') {
        return val1 + val2;
    } else if (op == '-') {
        return val1 - val2;
    } else if (op == '*') {
        return val1 * val2;
    } else {
        return val1 / val2;
    }
}

//check it is number or not
function isNumber(n) { 
    return !isNaN(parseInt(n)) 
}

// // isCycle(A1 , C1+1)
// let isCycle = function (cellID,formula) {
//     let formulaArr = formula.split(" ");
    
//     // console.log(cellID);//A1
    
//     let cell = getcellForFormula(cellID);
  
//     let rid = cell.getAttribute("rid");
//     let cid = cell.getAttribute("cid");
//     let cellObj = sheetArr[rid][cid];
//     let children = cellObj.children;//[b1]
    
//     for (let i = 0; i < children.length; i++) {
//         let childID = children[i];//b1
//         // console.log("child"+childID);
//         for (let j = 0; j < formulaArr.length; j++) {
//             let ascii = formulaArr[j].charCodeAt(0);
//             if (ascii >= 65 && ascii <= 90) {
//                 let parentCellID = formulaArr[j];//c1
//                 // console.log(parentCellID +" and " + childID);
//                 if (parentCellID==childID) {
//                     console.log("i have child");
//                     return true;
//                 }
//             }
//         }
// console.log("childId"+childID);//b1
//         cell = getcellForFormula(childID);
        
//     rid = cell.getAttribute("rid");
//     cid = cell.getAttribute("cid");
//     cellObj = sheetArr[rid][cid];
//     console.log("cellObj"+cellObj.formula);
// //     form= cellObj.formula;
// // console.log("form"+form);
//         return isCycle(childID,formula);
//     }

//     return false;
// };

function getcellForFormula(address) {
    
    //get row id and column id
    let { rid, cid } = getRIdIdfromAddress(address);
    //return cell
    return document.querySelector(`.grid_cell[rid="${rid}"][ cid="${cid}"]`)
}