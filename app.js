let user_input=document.querySelector("#user-input")
const add_task=document.querySelector("#add")
let full_list=document.querySelector(".todo-list")
let list_item=document.querySelector(".list_item")
let checkbox=document.querySelector("input[type=\"checkbox\"]")



// getting tasks fro local storage if any exist else set it 
if(localStorage.getItem("tasks")==="undefined"){
    let arr=[]
}
else if(localStorage.getItem("tasks")===null){
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
     full_list.appendChild(new_item)
    });
}


// 
if(localStorage.getItem("completed")==="undefined"){
    let arr2=[]
}
else if(localStorage.getItem("completed")===null){
    let arr2=[]
    localStorage.setItem("completed",JSON.stringify(arr2))
}
else{
    arr2=JSON.parse(localStorage.getItem("completed"))
    console.log(arr2)
    arr2.forEach(element => {
        let new_item= document.createElement("li")
        new_item.appendChild(document.createTextNode(element))
        new_item.innerHTML +=`<a href="#"><i class="far fa-trash-alt"></i></a>`
        new_item.setAttribute("class","strike ")
        full_list.appendChild(new_item)
    });
}


// adding task to a list
add_task.addEventListener("click",()=>{
    if(user_input.value===""){
        alert("please enter a task")
    }
    else{
        let new_item= document.createElement("li")
        new_item.appendChild(document.createTextNode(`${user_input.value}`))
        new_item.innerHTML +=`<input type="checkbox"><a href="#"><i class="far fa-trash-alt"></i></a>`
        new_item.childNodes[2].setAttribute("class","list_item ")
        full_list.appendChild(new_item)
        arr.push(user_input.value)
        localStorage.setItem("tasks",JSON.stringify(arr))
        window.location.reload()
    }
})

function run(){
    for( let i=0;i<arr2.length;i++){
        for(let j=0;j<arr.length;j++){
            if(arr2[i]===arr[j]){
                console.log(arr2[i])
                console.log( arr.splice(arr2[i]))
            }
        }
    }
}

// removing task from completed list
document.body.addEventListener("click",(e)=>{
    if(e.target.parentElement.parentElement.classList.contains("strike")){
    
        full_list.removeChild(e.target.parentElement.parentElement)
        // removing element from array after knowing it's index
        let idx = arr2.indexOf(e.target.parentElement.parentElement.innerText);
        if(idx !=-1){
            arr2.splice(idx,1)
        }
        
        localStorage.setItem("tasks",JSON.stringify(arr))
        localStorage.setItem("completed",JSON.stringify(arr2))
        
    }
})

// deleting task from list
document.body.addEventListener("click",(e)=>{
    
    if(e.target.parentElement.classList.contains("list_item")){
        run
        full_list.removeChild(e.target.parentElement.parentElement)
        // removing element from array after knowing it's index
        let idx = arr.indexOf(e.target.parentElement.parentElement.innerText);
        if(idx !=-1){
            arr.splice(idx,1)
        }
        
        localStorage.setItem("tasks",JSON.stringify(arr))
        localStorage.setItem("completed",JSON.stringify(arr2))
    }
})



// crossing the li and removing from local if the task is complete
document.body.addEventListener("click",(e)=>{
    if(e.target.checked){
        arr2.push(e.target.parentElement.innerText)
        let idx = arr.indexOf(e.target.parentElement.innerText);
        console.log(idx)
        if(idx !=-1){
            arr.splice(idx,1)
        }
        localStorage.setItem("tasks",JSON.stringify(arr))
        localStorage.setItem("completed",JSON.stringify(arr2))
        window.location.reload()
    }
    
    
})













