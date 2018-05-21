var test = document.querySelectorAll('input');


var buttonhook = document.querySelector('#enterdata');
var placeholder = document.querySelector('#placeholder');

var todolist = [];

//Object Constructor
function reminderObject(reminderText, reminderDate){
    this.reminder = reminderText;
    this.date = reminderDate;
    this.timestamp = Date.now();
    };

//reminder:test[0].value, date:test[1].value
function getReminderValues(){

    todolist.push(new reminderObject(test[0].value, test[1].value));

    // CAll function to add list items to the DOM
    placeholder.innerHTML = addlistelement();
    test[0].value = "Add another item";
    console.log(todolist);
} 

//Add items to the DOM
function addlistelement(){
    
    var myarray = todolist.map(function(cur,i,arr){
        return "<li>" + cur.reminder + "</li>";
    });

    return myarray.join(" ");
    
    
}


//Event listener for 'submit' button
buttonhook.addEventListener('click', getReminderValues,false);
test[0].addEventListener('focus', function(){
    console.log("in focus");
    test[0].value = " ";
})


