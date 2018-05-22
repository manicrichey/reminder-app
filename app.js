//GET DOM ELEMENTS TO WORK WITH

//Get all the form input boxes
const inputTextBoxes = document.querySelectorAll('input');
//Use this to display an message when form fields are left empty
const errormsg = document.querySelector('#errormsg');
//This is the button used to 'submit' a new reminder
const buttonhook = document.querySelector('#enterdata');
//This is the place in the DOM to append a new reminder as a <tr>
const tablehook = document.querySelector('#tablehook tbody');
console.log(tablehook.firstChild);
//initialise todolist array
var todolist = [];
//initialise deleteBottonNodeList array
var deleteBottonNodeList = [];

//Object Constructor (template) for a reminder item
function reminderObject(reminderText, reminderDate){
    this.id = todolist.length;
    this.reminder = reminderText;
    this.date = reminderDate;
    this.timestamp = Date.now();
};

function getReminderValues(){

    if((inputTextBoxes[0].value === "Enter a reminder" || inputTextBoxes[0].value === "Add another item" || inputTextBoxes[0].value === ' ' || inputTextBoxes[1].value === '')){
        errormsg.textContent = "You have to fill out both fields"
    } else {
        errormsg.textContent = " ";
        todolist.push(new reminderObject(inputTextBoxes[0].value, inputTextBoxes[1].value));

    } 
}

function getDeleteButtons(){
    return document.querySelectorAll('tr td[data-test]');
}

//Delete a reminder item from the array and remove the item from the DOM
function deleteReminder(){
    //This removes the item from the dom and the item from the todolist   
    console.log("deleting... ", parseInt(this.getAttribute('data-test')));
    todolist.splice(parseInt(this.getAttribute('data-test')),1);
    addNewReminder('nocheck');
}

function insertElement(){
    // CAll function to add list items to the DOM
    tablehook.insertAdjacentHTML('beforeend', addlistelement());
    //Reset the event listener
    deleteBottonNodeList = getDeleteButtons()
    removeDeleteButtonListener();
    addDeleteButtonListener();
    inputTextBoxes[0].value = "Add another item";
    inputTextBoxes[1].value = "";
    var deletekey = document.querySelectorAll('tr td[data-test]');
}

function addlistelement(){
    //Clear previous elements and render list 
    while (tablehook.childNodes.length > 1) {
        tablehook.removeChild(tablehook.lastChild);
    }
    //Map the todolist array and add html table tags
    var ArrayToHTML = todolist.map(function(cur,i,arr){
        
        return "<tr class='dynamic'>" + "<td>" + (i+1) + "</td>" + "<td>" + cur.reminder + "</td>" + "<td>" + cur.date + "</td>" + "<td data-test='" + (i) + "'>" + "<button>Delete</button>" + "</td>" +"</tr>";
      
    });

    return ArrayToHTML.join(" ");
       
}

function addNewReminder(nocheck){
    //Use this to enable form validation
    if(nocheck === true){
        getReminderValues();
    }
    insertElement();
    console.table(todolist);
}

//EVENT LISTENERS

//Event listener for 'submit' button
buttonhook.addEventListener('click', function(){
    addNewReminder(true);
},false);

//Event listener for 'imput focus'
inputTextBoxes[0].addEventListener('focus', function(){
   inputTextBoxes[0].value = " ";
})

//Event listener for leaving 'imput focus'
// inputTextBoxes[0].addEventListener('blur', function(){
//     inputTextBoxes[0].value = "Enter a reminder";
//  })

//remove/unset event listener for all 'Delete' bottons
function removeDeleteButtonListener(){
    deleteBottonNodeList.forEach(function(item, index){
        item.removeEventListener('click', deleteReminder);
    });
}

//add event listeners for all 'Delete' buttons
function addDeleteButtonListener(){
    deleteBottonNodeList.forEach(function(item, index){
        item.addEventListener('click', deleteReminder);
    });
}





