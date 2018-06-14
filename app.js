//Change these value to suite your HTML

var settings = {
        
    submitButton: "#submitButton",
    editButton: ".editButton",
    deleteButton: ".deleteButton",

    tableName: "#tablehook",
    reminderTextBox: "input.reminder",
    dateTextBox: "input.date"

};


//Editing Modal

const modal = document.getElementById('myModal'),
      btn = document.getElementById("myBtn"),
      span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Module
var reminder = (function(){

    let reminderList = [],
    
        //Make Public
        init,
        setConfig,
    
        addReminder,
        deleteReminder,
        editReminder,
    
        //Make private
    
        config = {
            //buttons
            submitButton: "",
            editButton: "",
            deleteButton: "",

            //Dom elements
            tableName: "",
            reminderTextBox: "",
            dateTextBox: ""
        }

    addReminder = function(){
        reminderList.push(
            {
                reminderText: document.querySelector('input.reminder').value,reminderDate: document.querySelector('input.date').value
            }
        );
        redrawReminders(reminderList, config.tableName);
        
    }

    deleteReminder = function(id){
        console.log("deleting... " + id);
        reminderList.splice(id,1);
        redrawReminders(reminderList, config.tableName);
    }

    editReminder = function(id){

            let editReminderText = document.querySelector('.editReminderText');
            let editReminderDate = document.querySelector('.editReminderDate');

            editReminderText.value = reminderList[id].reminderText;
            editReminderDate.value = reminderList[id].reminderDate;
            
            modal.style.display = "block";
            
        
    }

    redrawReminders = function(array,tableId){
    
        let tableInsertPoint = document.querySelector(tableId);

        while (tableInsertPoint.childNodes.length > 2) {
            tableInsertPoint.removeChild(tableInsertPoint.lastChild);
        }

        var ArrayToHTML = array.map(function(cur,i,arr){

            return `<td> ${(i+1)} </td>
                    <td class='editable'> ${cur.reminderText}</td>
                    <td class='editable'> ${cur.reminderDate}</td>
                    <td data-delete='${(i)}' class='deleteButton'><button>Delete</button></td>
                    <td data-edit='${i}'><button class='editButton'>Edit</button></td>`
            
        }).forEach(element => {
            let newTr = document.createElement('tr');
            newTr.innerHTML = element;
            tableInsertPoint.appendChild(newTr);
        });

        // Assign new event handlers
        dynamicEvents();
        
    }

    setConfig = function(settings){
        
        config.submitButton = settings.submitButton;
        config.editButton = settings.editButton;
        config.deleteButton = settings.deleteButton;
        config.tableName = settings.tableName;
        config.reminderTextBox = settings.reminderTextBox;
        config.dateTextBox = settings.dateTextBox;
    }

    // getConfig = function(){

    // }

    init = function(){

        let addButton = document.querySelector(config.submitButton);
        let clearDefault = document.querySelector('.reminder');
        let updateSubmit = document.querySelector('#updateReminder');
    
        addButton.addEventListener('click', function(){
            addReminder();   
        });

        //Clear placeholder text
        clearDefault.addEventListener('focus', function(){
            clearDefault.value = " ";
        })

        updateSubmit.addEventListener('click', function(){
            console.log('update clicked');
        })

    }

    function dynamicEvents(){
        
    
        let deleteButton = document.querySelectorAll(config.deleteButton);

        deleteButton.forEach(function(item){
            item.addEventListener('click',function(e){
                deleteReminder(e.target.parentElement.getAttribute('data-delete'));
            })
        })

        let editButton = document.querySelectorAll(config.editButton);

        editButton.forEach(function(item){
            item.addEventListener('click',function(e){
                editReminder(e.target.parentElement.getAttribute('data-edit'));
            })
        })
    }

    return {
        add: addReminder,
        delete: deleteReminder,
        edit: editReminder,

        setConfig: setConfig,
        // getConfig: getConfig,
        init: init
    }
})();



reminder.setConfig(settings);
reminder.init();


