var test = document.querySelectorAll('input');
var errormsg = document.querySelector('#errormsg');



var buttonhook = document.querySelector('#enterdata');
var placeholder = document.querySelector('#placeholder tbody');
console.log(placeholder);

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
    setlistener();
    test[0].value = "Add another item";
    test[1].value = "";
    console.log(todolist);
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
            return "<tr>" + "<td>" + cur.id + "</td>" + "<td>" + cur.reminder + "</td>" + "<td>" + cur.date + "</td>" + "<td data-test='" + (cur.id-1) + "'>" + "Delete" + "</td>" +"</tr>";
        }
        
    });

    // myarray.unshift("<tr>");
    // myarray.push("</tr>");
    console.log(myarray);
    
    return myarray.join(" ");
    
    
}


//Event listener for 'submit' button
buttonhook.addEventListener('click', getReminderValues,false);

//Event listener for 'imput focus'
test[0].addEventListener('focus', function(){
    console.log("in focus");
    test[0].value = " ";
})

//var testclick = document.querySelectorAll('tr td[data-test]');


function setlistener(){
    var testclick = document.querySelectorAll('tr td[data-test]');
    testclick.forEach(function(item, index){
        item.addEventListener('click', function(){
            console.log(item.getAttribute('data-test'));
        })
    });
    console.log(document.querySelectorAll('tr td[data-test]'));
    // testclick.addEventListener('click', function(){
    //     console.log("clicked");
    // });
}



//Event listener for delete


//sconsole.log("date = " + test[1].value);

