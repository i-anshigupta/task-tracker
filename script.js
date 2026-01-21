let taskData={}

const todo=document.querySelector('#todo');
const progress=document.querySelector('#progress');
const done=document.querySelector('#done');
const columns=document.querySelectorAll('.task-column');
let dragElement=null;

function addTask(title,desc,column){
    const div=document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable","true");

    div.innerHTML=`<h2>${title}</h2>
    <p>${desc}</p>
    <button>Delete</button>
    `
    column.appendChild(div);

    div.addEventListener("drag",(e) =>{
        dragElement=div;
    })

    const deleteBtn=div.querySelector("button");
    deleteBtn.addEventListener("click",()=>{
        div.remove();
        updateTaskCount();
    })
    
    return div;
}

function updateTaskCount(){
    columns.forEach(col=>{
        const tasks=col.querySelectorAll('.task');
        const count=col.querySelector('.right');
        taskData[col.id]=Array.from(tasks).map(t=>{
            return{
                title:t.querySelector('h2').innerText,
                desc:t.querySelector('p').innerText
            }
        })
        localStorage.setItem("tasks",JSON.stringify(taskData));
        count.innerText=tasks.length;
    })
}

if(localStorage.getItem("tasks")){
    const data=JSON.parse(localStorage.getItem("tasks"));
    console.log(data);

    for(const col in data){
        const column=document.querySelector(`#${col}`);
        data[col].forEach(task=>{
            addTask(task.title,task.desc,column);
        }) 

    }
    updateTaskCount();

}

const tasks=document.querySelectorAll('.task');

tasks.forEach(task => {
    task.addEventListener("drag",(e) =>{
        //console.log("dragging",e);
        dragElement=task;
    })
})

function addDragEvent(column){
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave",(e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })
    column.addEventListener("dragover",(e)=>{
        e.preventDefault();
    })
    column.addEventListener("drop",(e)=>{
        e.preventDefault();
        column.appendChild(dragElement);
        column.classList.remove("hover-over");

        updateTaskCount();
    })

}

addDragEvent(todo);
addDragEvent(progress);
addDragEvent(done); 


/*Add new task modal functionality*/
const toogleTaskButton=document.querySelector('#toogle-task');
const addNewtaskBG=document.querySelector('.add-new-task .bg');
const addTaskButton=document.querySelector('.add-new-task');
const addTaskBtn=document.querySelector('#add-task');

toogleTaskButton.addEventListener("click",()=>{
    addTaskButton.classList.add("active");
})
addNewtaskBG.addEventListener("click",()=>{
    addTaskButton.classList.remove("active");
})  

addTaskBtn.addEventListener("click",()=>{
    const taskTitle=document.querySelector('#task-title-inp').value;
    const taskDesc=document.querySelector('#task-des-inp').value;

    addTask(taskTitle,taskDesc,todo);

    updateTaskCount();

    addTaskButton.classList.remove("active");

})
