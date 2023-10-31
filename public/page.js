
//DOM VARIABLES DECLARATION 
const form = document.querySelector("#formulaire");
const formu = document.querySelector("#forme");
const formGroup = document.querySelector(".form-group");
const inputTache = document.querySelector("#tache");
const listItems = document.querySelector(".list-items");
const fakeItems= document.querySelector('.fake-items')
const desc = document.querySelector(".description");
const submitTache = document.querySelector(".btnSubmit");
const msgAlert = document.querySelector(".message");
const insideContainer = document.querySelector(".inside");
const myli = document.querySelectorAll("li");
const openTask = document.querySelector(".fa-eyed");
const noItemMessage = document.querySelector(".no-item-message");
const modalTitle= document.querySelector('.modal-title')
const modalDesc= document.querySelector('.modal-desc')

//URL FROM json server
const url = 'http://localhost:3000/todos'

//EVENT LISTENERS LOAD TODOS 
window.addEventListener('DOMContentLoaded',getTodos)

//EVENT LISTENERS (submit)
formu.addEventListener("submit", postTache);


//EVENT LISTENERS for CROSSING OUT TASK and updated on data base

listItems.addEventListener("click", async(e) => {
 let checked= 'unchecked'
  const li = e.target.tagName === "LI";
  if (li) {
    e.target.classList.toggle("checked");
    checked= 'checked'
  } if (e.target.classList.contains('checked')){
       const id = e.target.id
     const res= await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          checked: 'checked'
        })
      })
       await res.json()
    listItems.appendChild(e.target)
    displayAlertMsg('Tâche terminée avec succès','success')
  }
 
});

// FUNCTION CALL CREATE ElEMENT()
function postTache(e) {
          e.preventDefault();
          postTodos()
         
}
//GET TASK
      async function getTodos(){
      const response = await fetch(url, {
        method: 'GET',
      })
      const data = await response.json()
      data.forEach(item=>{
        const listElement = document.createElement("li");
        const attr = document.createAttribute("id");
        attr.value = item.id
        listElement.setAttributeNode(attr);

        
        listElement.innerHTML = `${item.title}
        
        <i class="fa-regular fa-eye fa-modal" data-bs-toggle="modal" data-bs-target="#taskModal"></i>
        <i class="fa-solid fa-xmark deleteBtn"></i>
        `;
    
   
   listItems.insertBefore(listElement, listItems.children[0]);
      //remain checked list on bottom list
        if (item.checked == 'checked') {
          listElement.classList.add("checked")
          listItems.appendChild(listElement)
        }

   //Open task details
        listElement.addEventListener("click", (e) => {
        if(e.target.classList.contains('fa-modal')){

        modalTitle.textContent = item.title
        modalDesc.textContent = item.description
        
      }
     
})
       
  })
 
}

//POST TASK
      const postTodos = async () => {
        const inputValue = inputTache.value;
        const describe = desc.value;
        if (inputValue !== "") {
          getTodos()
          displayAlertMsg("Tâche ajoutée avec succès", "success");
          setToDefault();
          
        await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            title: inputValue,
            description: describe,
            checked:'unchecked'
          })
       
        })
          window.location.reload()
        }
        else {
          displayAlertMsg("Le champ task title est requis", "danger");
        }
      }



//DELETE TASK
deleleTask()
 function deleleTask(){
  listItems.addEventListener('click',async (e)=>{
   
    const id = e.target.parentElement.id
    if (e.target.classList.contains('deleteBtn')) {
     
      await fetch(`${url}/${id}`, {
        method: 'DELETE'
      })
     
      displayAlertMsg('Tâche supprimé avec succès', 'danger')
     
    }
    
  })
   
 }

// FUNCTION DISPLAY ALERT MESSAGE with SET TIMEOUT

    /**
     * @param {string} text 
     * @param {string} color 
     */
    function displayAlertMsg(text, color) {
              msgAlert.textContent = text;
              msgAlert.classList.add(`alert-${color}`);

              setTimeout(() => {
                        msgAlert.textContent = "";
                        msgAlert.classList.remove(`alert-${color}`);
              }, 3000);
    }



      //EVENT LISTENERS to delete TASKS HARD CODED
      listItems.addEventListener("click", (e)=>{
        if(e.target.classList.contains('deleteBtn')){
          const element = e.target.parentElement;
          const id = element.id;
        listItems.removeChild(element);

        }

        if (listItems.children.length === 0) {
          noItemMessage.innerHTML = `<h4 class="text-center"> No task found</h4>`;
        }

      });

         

//FUNCTION TO SET DEFAULT ALL VARIABLES
function setToDefault() {
          inputTache.value = "";
          desc.value = "";
          noItemMessage.innerHTML = "";
          fakeItems.innerHTML= ""
        
      
}
