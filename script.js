const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll(".container");


draggables.forEach(draggable => {
  draggable.addEventListener("dragstart", () =>{
    draggable.classList.add("dragging");
  })

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  })
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