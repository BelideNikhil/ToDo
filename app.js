let user_input=document.querySelector("#user-input")
const add_task=document.querySelector("#add")
let todo_list=document.querySelector(".todo-list") 
let list_item=document.querySelector(".list_item")
let checkbox=document.querySelector("input[type='checkbox']")

let no_data=document.querySelector("#error")

// getting tasks from local storage if any exist else set it 

if(localStorage.getItem("tasks")===null || localStorage.getItem("tasks")==="undefined"){
    let arr=[]
    localStorage.setItem("tasks",JSON.stringify(arr))
}
else{
    arr=JSON.parse(localStorage.getItem("tasks"))
    arr.forEach(element => {
     let new_item= document.createElement("li")
     new_item.appendChild(document.createTextNode(element))
     new_item.innerHTML +=`<input type="checkbox"><a href="#"><i class="far fa-trash-alt"></i></a>`
     new_item.childNodes[2].setAttribute("class","list_item")
     todo_list.appendChild(new_item)
    });
}

// getting completed tasks from local storage if any exist else set it 
if(localStorage.getItem("completed")===null || localStorage.getItem("completed")==="undefined"){
    let arr2=[]
    localStorage.setItem("completed",JSON.stringify(arr2))
}
else{
    arr2=JSON.parse(localStorage.getItem("completed"))
    arr2.forEach(element => {
        let new_item= document.createElement("li")
        new_item.appendChild(document.createTextNode(element))
        new_item.innerHTML +=`<a href="#"><i class="far fa-trash-alt"></i></a>`
        new_item.setAttribute("class","strike")
        todo_list.appendChild(new_item)
    });
}
// adding task to a list
add_task.addEventListener("click",()=>{
    if(user_input.value===""){
        no_data.style.display='block'
        no_data.innerHTML="Please enter data to add a task."
        setTimeout(()=>{
            no_data.style.display='none'
        },2000)
    }
    else{
        let new_item= document.createElement("li")
        new_item.appendChild(document.createTextNode(`${user_input.value}`))
        new_item.innerHTML +=`<input type="checkbox"><a href="#"><i class="far fa-trash-alt"></i></a>`
        new_item.childNodes[2].setAttribute("class","list_item")
        todo_list.appendChild(new_item)
        arr.push(user_input.value)
        localStorage.setItem("tasks",JSON.stringify(arr))
    }
    setter()
    user_input.value=""
})

document.body.addEventListener("click",(e)=>{
    // deleting task from list
    if(e.target.parentElement.classList.contains("list_item")){
        todo_list.removeChild(e.target.parentElement.parentElement)
        // removing element from array after knowing it's index
        let idx = arr.indexOf(e.target.parentElement.parentElement.innerText);
        if(idx !=-1){
            arr.splice(idx,1)
        }
    }
    if(e.target.parentElement.parentElement.classList.contains("strike")){
        todo_list.removeChild(e.target.parentElement.parentElement)
        let idx = arr2.indexOf(e.target.parentElement.parentElement.innerText);
        if(idx !=-1){
            arr2.splice(idx,1)
        }
    }
    // crossing the li and moving to another array
    if(e.target.checked){ 
        let idx = arr.indexOf(e.target.parentElement.innerText);
        if(idx !=-1){
            arr2.push(arr[idx])
            arr.splice(idx,1)
        }
        setter()
        setTimeout(window.location.reload(),1)
    }
    setter()
})

function setter(){
    localStorage.setItem("tasks",JSON.stringify(arr))
    localStorage.setItem("completed",JSON.stringify(arr2))
}








