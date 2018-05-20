var test = document.querySelectorAll('input');

var buttonhook = document.querySelector('#enterdata');
var placeholder = document.querySelector('#placeholder');

var todolist = [{reminder:"billy", date:55}];

// function arrayToString(array){
//     array.join(" ");
// }

//console.log(arrayToString(todolist));

function addlistelement(){
    //console.log(todolist.length);
    //console.log(todolist);
    var myarray = todolist.map(function(cur,i,arr){
        return "<li>" + cur.reminder + "</li>";
        //console.log(cur.reminder);
        

    });

    return myarray.join(" ");
    //console.log(myarray.join(" "));
    //console.log(arrayToString(myarray));
}
function getReminderValues(){
    //console.log("button has been clicked - rg");
    placeholder.innerHTML = "button has been clicked";
    //console.log(test[0].value);
    todolist.push({reminder:test[0].value, date:test[1].value});
    
    console.log(addlistelement());
    placeholder.innerHTML = addlistelement();
    //console.log(test);


} 
buttonhook.addEventListener('click', getReminderValues,false);


//console.log(buttonhook);
//console.log(test);
