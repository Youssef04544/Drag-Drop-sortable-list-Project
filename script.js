const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll(".container");
let checkboxes = document.querySelectorAll(".checkboxes");

checkboxes.forEach(checkbox => {
  checkbox.addEventListener("input",()=>{
    checkbox.parentElement.classList.toggle("checked");
  })
})


draggables.forEach(draggable => {
  addTheEventListeners(draggable);
})

containers.forEach(container => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const dragging = document.querySelector (".dragging"); //Get's the only element being currently dragged
    const afterEement = getAfterElement(container, e.clientY); // Find the Element that is just below our dragged Element
    
    if(afterEement == null) container.appendChild(dragging); // if no element below, adds it to the end of the list
    else container.insertBefore(dragging,afterEement);
    
  })
})

//adds a new input zone just below the draggable that called the event
function addNewInput(draggable){
  let newZone = document.createElement("div");
  newZone.classList.add("draggable");
  newZone.setAttribute("draggable","true");
  newZone.innerHTML ='<input type="checkbox" name="tick" class="checkboxes new"> <input type="text">';
  draggable.parentElement.insertBefore(newZone, draggable.nextSibling);
  addTheEventListeners(newZone);//makes sure the new element listens to the dragging events and enter press event
}

//adds all the neccessary events for the draggables : drag start & end and keyup enter
function addTheEventListeners(draggable) {
    draggable.addEventListener("dragstart", () =>{
      draggable.classList.add("dragging");
    })
  
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    })
  
    draggable.addEventListener("keyup", e => {
      if(e.keyCode === 13) {
        addNewInput(draggable);
        //makes sure all the new checkboxes are listening for input to tick the right text once validated
        let checkboxes = document.querySelectorAll(".checkboxes.new");//finds the new checkboxes
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener("input",()=>{
            checkbox.parentElement.classList.toggle("checked");
          })
        })
      }
    })
}

function getAfterElement(container, Y) {
  const elements = [...container.querySelectorAll(".draggable:not(.dragging)")];
  
  return elements.reduce((closest,element) => {
    const box = element.getBoundingClientRect();
    const offset = Y - box.top - box.height / 2; // gets the distance from the mouse to the center of the next element

    //checks if the element is below the current dragged one with offset < 0 and checks if it's closer than the closest element
    if(offset < 0 && offset > closest.offset){
      return closest = {offset, element};
    }else{
      return closest;
    }
  }, {offset: Number.NEGATIVE_INFINITY}).element;
}