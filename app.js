let user_input=document.querySelector("#user-input")
const add_task=document.querySelector("#add")
let full_list=document.querySelector(".todo-list")
let list_item=document.querySelector(".list_item")


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
     new_item.innerHTML +=`<input type="checkbox"><a href="#"><i class="fas fa-trash-alt"></i></a>`
     new_item.childNodes[2].setAttribute("class","list_item")
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
        new_item.innerHTML +=`<input type="checkbox"><a href="#"><i class="fas fa-trash-alt"></i></a>`
        new_item.childNodes[2].setAttribute("class","list_item")
        full_list.appendChild(new_item)
        arr.push(user_input.value)
        localStorage.setItem("tasks",JSON.stringify(arr))
    }
})

// removing task from list
document.body.addEventListener("click",(e)=>{
    if(e.target.parentElement.classList.contains("list_item")){
        full_list.removeChild(e.target.parentElement.parentElement)
        // removing element from array after knowing it's index
        let idx = arr.indexOf(e.target.parentElement.parentElement.innerText);
        if(idx !=-1){
            arr.splice(idx,1)
        }
        localStorage.setItem("tasks",JSON.stringify(arr))
    }
})


// crossing the li and removing from local if the task is complete
document.body.addEventListener("click",(e)=>{
    if(e.target.checked){
        e.target.parentElement.setAttribute("class","checkbox")
    }

    if(e.target.parentElement.classList.contains("checkbox")){
        console.log(arr)
        let a= confirm("did you complete it?")
        if(a){
            let idx = arr.indexOf(e.target.parentElement.innerText);
            if(idx !=-1){
                arr.splice(idx,1)
            }
            localStorage.setItem("tasks",JSON.stringify(arr))
            setTimeout(()=>{
                window.location.reload()
            },1500)       
        }
        else{
            window.location.reload()
        }   
    }
})









