//GET DOM ELEMENTS TO WORK WITH

//Get all the form input boxes
const inputTextBoxes = document.querySelectorAll('input');
//Use this to display an message when form fields are left empty
const errormsg = document.querySelector('#errormsg');
//This is the button used to 'submit' a new reminder
const buttonhook = document.querySelector('#enterdata');
//This is the place in the DOM to append a new reminder
const placeholder = document.querySelector('#placeholder tbody');

//initialise todolist array
var todolist = [];
//initialise setter array
var setter = [];

//Object Constructor (template) for a reminder item
function reminderObject(reminderText, reminderDate){
    this.id = todolist.length+1;
    this.reminder = reminderText;
    this.date = reminderDate;
    this.timestamp = Date.now();
};

//reminder:test[0].value, date:test[1].value
function getReminderValues(){

    if((inputTextBoxes[0].value === "Enter a reminder" || inputTextBoxes[0].value === "Add another item" || inputTextBoxes[0].value === ' ' || inputTextBoxes[1].value === '')){
        errormsg.textContent = "You have to fill out both fields"
    } else {
        errormsg.textContent = " ";
        todolist.push(new reminderObject(inputTextBoxes[0].value, inputTextBoxes[1].value));

    // CAll function to add list items to the DOM
    placeholder.insertAdjacentHTML('beforeend', addlistelement());
    setter = getels()
    removals();
    addition();
    inputTextBoxes[0].value = "Add another item";
    inputTextBoxes[1].value = "";
    var deletekey = document.querySelectorAll('tr td[data-test]');

    }
    
} 

//Add items to the DOM using array.map to add html tags
function addlistelement(){
    
    var myarray = todolist.map(function(cur,i,arr){
        if(i == todolist.length-1){
            return "<tr class='dynamic'>" + "<td>" + cur.id + "</td>" + "<td>" + cur.reminder + "</td>" + "<td>" + cur.date + "</td>" + "<td data-test='" + (cur.id-1) + "'>" + "Delete" + "</td>" +"</tr>";
        }     
    });

    return myarray.join(" ");
    
}

//Recreates a new list after an item is deleted
function redrawTable(){
    var myredrawnArray = todolist.map(function(cur,i,arr){
        
            return "<tr class='dynamic'>" + "<td>" + cur.id + "</td>" + "<td>" + cur.reminder + "</td>" + "<td>" + cur.date + "</td>" + "<td data-test='" + (cur.id-1) + "'>" + "Delete" + "</td>" +"</tr>";

    });
    return myredrawnArray.join(" ");
}

//EVENT LISTENERS

//Event listener for 'submit' button
buttonhook.addEventListener('click', getReminderValues,false);

//Event listener for 'imput focus'
inputTextBoxes[0].addEventListener('focus', function(){
   inputTextBoxes[0].value = " ";
})


function getels(){
    return document.querySelectorAll('tr td[data-test]');
}

//Delete a reminder item from the array and remove the item from the DOM
function deleteReminder(){
    //This removes the item from the dom and the item from the todolist

    //console.log("about to parse ", parseInt(this.getAttribute('data-test')));
    todolist.splice(parseInt(this.getAttribute('data-test')),1);
    var top = this.parentNode.parentNode;
    var nest = this.parentNode;
    top.removeChild(nest);
    console.table(todolist);
}

//remove/unset event listener for all 'Delete' bottons
function removals(){
    setter.forEach(function(item, index){
        item.removeEventListener('click', deleteReminder);
    });
}

//add event listeners for all 'Delete' buttons
function addition(){
    setter.forEach(function(item, index){
        item.addEventListener('click', deleteReminder);
    });
}

