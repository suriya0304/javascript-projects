//selectors
const todoInput=document.querySelector('.todo-input')
const todoAddBtn=document.querySelector('.todo-add-btn')
const todoList=document.querySelector('.todo-list')
const filterOption = document.querySelector('.select')

//event listeners
todoAddBtn.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteOrCheckTask)
filterOption.addEventListener('click',filterToDo)


//functions
function addTodo(e){
    e.preventDefault();
    if(todoInput.value==''){
        return
    }
    const todoDiv=document.createElement('div');
    todoDiv.classList.add('todo');
    const newtodo=document.createElement('li') 
    newtodo.classList.add('todo-item')
    todoDiv.appendChild(newtodo)

    //setting value of list as input
    newtodo.innerText=todoInput.value

    //check button
    const completedbtn=document.createElement('button')
    completedbtn.classList.add('completed-btn')
    completedbtn.innerHTML='<i class="fa-solid fa-square-check"></i>'
    todoDiv.appendChild(completedbtn)

    //delete button 
    const trashbtn=document.createElement('button')
    trashbtn.classList.add('trash-btn')
    trashbtn.innerHTML='<i class="fa-solid fa-trash"></i>'
    todoDiv.appendChild(trashbtn)

    //append to todo List
    todoList.appendChild(todoDiv)

    //clear value from input field
    todoInput.value=''
}


function deleteOrCheckTask(e){

    //to delete a task
    const item = e.target;
    const todo = item.parentElement
    if(item.classList[0]==='trash-btn'){

        //animation
        todo.classList.add('fall')
        todo.addEventListener('transitionend',()=>todo.remove())
    }

    //to check a task
    if(item.classList[0]==='completed-btn'){
        todo.classList.toggle('checked')
    }
}


function filterToDo(e){
    const todos=todoList.childNodes
    todos.forEach(function(todo){
        switch(e.target.value){
            case 'all':
                todo.style.display='flex';
                break;
            case 'completed':
                if(!todo.classList.contains('checked')){
                    todo.style.display='none'
                }else{
                    todo.style.display='flex';
                }
                break;
            case 'uncompleted':
                if(todo.classList.contains('checked')){
                    todo.style.display='none'
                }else{
                    todo.style.display='flex';
                }
                break;
        }
    })
}