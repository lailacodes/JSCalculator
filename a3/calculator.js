// status of calculator being open
let open = true;

// table variables
let tbl, tblHead, tblHeader, tblBody,tblRow, tblData;
let rowCount = headerCount = tblCount = 0;
let tblResults = new Array(); // table for results
let tblResults2 = new Array(); // table for results that don't include null values

// functions to create table
function createTable(){
    tbl = document.createElement("table");
    tblHead = document.createElement("thead");
    tblBody = document.createElement("tbody");

    tblCount++;
    tbl.id = "table" + tblCount;

    // styling
    tbl.style.border = "2px solid black";
    tbl.style.width = "100%";
    tbl.style.padding = "5px";
    tbl.style.textAlign = "center";
    tblHead.style.backgroundColor = "orange";

    tbl.appendChild(tblHead);
    tbl.appendChild(tblBody);
    document.body.appendChild(tbl);
}

// add header section to table
function createHeader(){
    tblHeader = document.createElement("th");
    tblHead.appendChild(tblHeader);

    headerCount++;
    tblHeader.id = "header" + headerCount;

    //styling
    tblHeader.style.border = "2px solid black";
    tblHeader.style.padding = "5px";
}

// add rows into table
function createRow(){
    tblRow = document.createElement("tr");
    tblBody.appendChild(tblRow);

    rowCount++;
    tblRow.id = "row" + rowCount;
}

// add data to rows of table
function addData(userInput){
    tblData = document.createElement("td");
    tblData.textContent = userInput;
    tblRow.appendChild(tblData);

    //styling
    tblData.style.border = "2px solid black";
    tblData.style.padding = "5px";
}

// compute results for result column of table
function computeResult(inputX,operator,inputY){
    let result = null;

    // check if input is a number and if operator is valid
    if(isNaN(inputX||inputY) || ((inputX||inputY)===null)){
        addData("wrong number input");
    } else{
        let result = "null";
        switch (operator){
            case "+":
                result = Number(inputX) + Number(inputY);
                addData(result);
                break;
            case "-":
                result = Number(inputX) - Number(inputY);
                addData(result);
                break;
            case "*":
                result = Number(inputX) * Number(inputY);
                addData(result);
                break;
            case "/":
                result = Number(inputX) / Number(inputY);
                addData(result);
                break;
            case "%":
                result = Number(inputX) % Number(inputY);
                addData(result);
                break;
            default:
                    addData("computation error")
        }
        tblResults.push(result);
    }
}

// Functions for calculations on results
function getAvg(inputArray){
    let arrLength = inputArray.length;
    return getTotal(inputArray)/arrLength;
}

function getTotal(inputArray){
    let total = 0;
    for(let i in inputArray){
        total += inputArray[i];
    }
    return total;
}

// create first table for input data
createTable();
for (let i = 0; i < 4; i++){
    createHeader();
}
document.getElementById("header1").innerHTML = "X";
document.getElementById("header2").innerHTML = "OP";
document.getElementById("header3").innerHTML = "Y";
document.getElementById("header4").innerHTML = "Result";

// run the loop as long as user chooses to continue
do{
    // add row to table for user entries
    createRow()

    // ask users for two numbers and an arithmetic operator
    let x = prompt("Value of X");
    addData(x);
    let operator = prompt("Operator");
    addData(operator)
    let y = prompt("Value of Y")
    addData(y)

    // add data values to table
    computeResult(x,operator,y)
    let cont = confirm("Continue?");

    // exit the loop if user clicks cancel
    if(cont !== true){
        open = false;
    }
} while(open == true)

// filter null results from original array of table results for second array
for (let i = 0; i < tblResults.length; i++){
    if (!(isNaN(tblResults[i]))) tblResults2.push(tblResults[i]);
}

// create second table with calculations related to results of table one
createTable()
for (let i = 0; i < 4; i++){
    createHeader();
}
document.getElementById("header5").innerHTML = "Min";
document.getElementById("header6").innerHTML = "Max";
document.getElementById("header7").innerHTML = "Average";
document.getElementById("header8").innerHTML = "Total";
createRow();
if(tblResults2.length==0){ //empty array indicates user entered no values for calculation
    for(let i = 0; i < 4; i++) addData("null")
} else {
    addData(Math.min.apply(null,tblResults2));
    addData(Math.max.apply(null,tblResults2));
    addData(getAvg(tblResults2));
    addData(getTotal(tblResults2));
}