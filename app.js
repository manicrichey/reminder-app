var test = document.querySelectorAll('input');
var errormsg = document.querySelector('#errormsg');

var setter = [];

var buttonhook = document.querySelector('#enterdata');
var placeholder = document.querySelector('#placeholder tbody');
//console.log(placeholder);

var todolist = [];

//Object Constructor
function reminderObject(reminderText, reminderDate){
    this.id = todolist.length+1;
    this.reminder = reminderText;
    this.date = reminderDate;
    this.timestamp = Date.now();
    };

//reminder:test[0].value, date:test[1].value
function getReminderValues(){

    if((test[0].value === "Enter a reminder" || test[0].value === "Add another item" || test[0].value === ' ' || test[1].value === '')){
        errormsg.textContent = "You have to fill out both fields"
    } else {
        errormsg.textContent = " ";
        todolist.push(new reminderObject(test[0].value, test[1].value));

    // CAll function to add list items to the DOM
    
    placeholder.insertAdjacentHTML('beforeend', addlistelement());
    setter = getels()
    removals();
    addition();
    test[0].value = "Add another item";
    test[1].value = "";
    //console.log(todolist);
    var deletekey = document.querySelectorAll('tr td[data-test]');
    for(i=0; i < deletekey.length; i++){ 
        //console.log(deletekey[i].getAttribute('data-test'));
    };
    //console.log(document.querySelectorAll('tr td[data-test]'));
    }

    
} 

//Add items to the DOM
function addlistelement(){
    
    var myarray = todolist.map(function(cur,i,arr){
        if(i == todolist.length-1){
            return "<tr class='dynamic'>" + "<td>" + cur.id + "</td>" + "<td>" + cur.reminder + "</td>" + "<td>" + cur.date + "</td>" + "<td data-test='" + (cur.id-1) + "'>" + "Delete" + "</td>" +"</tr>";
        }
        
    });

    // myarray.unshift("<tr>");
    // myarray.push("</tr>");
    //console.log(myarray);
    
    return myarray.join(" ");
    
    
}

function redrawTable(){
    var myredrawnArray = todolist.map(function(cur,i,arr){
        
            return "<tr class='dynamic'>" + "<td>" + cur.id + "</td>" + "<td>" + cur.reminder + "</td>" + "<td>" + cur.date + "</td>" + "<td data-test='" + (cur.id-1) + "'>" + "Delete" + "</td>" +"</tr>";
        
        
    });
    return myredrawnArray.join(" ");
}


//Event listener for 'submit' button
buttonhook.addEventListener('click', getReminderValues,false);

//Event listener for 'imput focus'
test[0].addEventListener('focus', function(){
   // console.log("in focus");
    test[0].value = " ";
})

//var testclick = document.querySelectorAll('tr td[data-test]');

//var testclick = document.querySelectorAll('tr td[data-test]');

function getels(){
    return document.querySelectorAll('tr td[data-test]');
}

function logger(){
    //This removes the item from the dom and the item from the todolist
    console.log("about to parse ", parseInt(this.getAttribute('data-test')));
    todolist.splice(parseInt(this.getAttribute('data-test')),1);
    var top = this.parentNode.parentNode;
    var nest = this.parentNode;
    top.removeChild(nest);
    console.table(todolist);

    

}

function removals(){
    setter.forEach(function(item, index){
        item.removeEventListener('click', logger)
    });
}

function addition(){
    setter.forEach(function(item, index){
        item.addEventListener('click', logger)
    });
}





//Event listener for delete


//sconsole.log("date = " + test[1].value);

