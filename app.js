var test = document.querySelectorAll('input');

var buttonhook = document.querySelector('#enterdata');
var placeholder = document.querySelector('#placeholder');

var todolist = [];

// This function didn't work for some reason. I need to put it through the dev tools
// function arrayToString(array){
//     array.join(" ");
// }

function addlistelement(){
    //Use the .length value to just add the last element to the page
    //console.log(todolist.length);
    
    var myarray = todolist.map(function(cur,i,arr){
        return "<li>" + cur.reminder + "</li>";
    });

    return myarray.join(" ");
    
}
function getReminderValues(){
    todolist.push({reminder:test[0].value, date:test[1].value});
    placeholder.innerHTML = addlistelement();
} 

buttonhook.addEventListener('click', getReminderValues,false);
