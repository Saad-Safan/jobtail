let draggables = document.querySelectorAll(".draggable");
let containers = document.querySelectorAll(".category");

addEvent();

function addEvent() {
	draggables.forEach((draggable) => {
		draggable.addEventListener("dragstart", () => {
			draggable.classList.add("dragging");
		});

		draggable.addEventListener("dragend", () => {
			draggable.classList.remove("dragging");
		});
	});

	containers.forEach((category) => {
		category.addEventListener("dragover", (e) => {
			e.preventDefault();
			const afterElement = getDragAfterElement(category, e.clientY);
			const draggable = document.querySelector(".dragging");
			let id = draggable.id;
			if (afterElement == null) {
				category.appendChild(draggable);
				data[id].categories = `${category.id}`;
				localStorage.setItem("data", JSON.stringify(data));
			} else {
				category.insertBefore(draggable, afterElement);
				data[id].categories = `${category.id}`;
				localStorage.setItem("data", JSON.stringify(data));
			}
		});
	});
}

function getDragAfterElement(category, y) {
	const draggableElements = [
		...category.querySelectorAll(".draggable:not(.dragging)"),
	];

	return draggableElements.reduce(
		(closest, child) => {
			const box = child.getBoundingClientRect();
			const offset = y - box.top - box.height / 2;
			if (offset < 0 && offset > closest.offset) {
				return { offset: offset, element: child };
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).element;
}

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let companyInput = document.getElementById("companyInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let categories = document.getElementById("categories");
let category = document.querySelector(".category");
let add = document.getElementById("add");
let jobNum = 0;

form.addEventListener("submit", (e) => {
	acceptData();
});

let data = [];

let acceptData = () => {
	data.push({
		text: textInput.value,
		company: companyInput.value,
		date: dateInput.value,
		description: textarea.value,
		categories: categories.value,
	});

	localStorage.setItem("data", JSON.stringify(data));
	// createTasks();
	// console.log(data);
};

let createTasks = () => {
	// tasks.innerHTML = "";
	data.map((x, y) => {
		temp = x;
		category = document.getElementById(`${x.categories}`);
		category.innerHTML += `
    <div draggable="true" class="draggable card" id=${y}>
		  <spanwie class="mb-0 pb-0 ">Company:</spanwie>
          <p  class="h3 pt-0 mt-0">${x.company}</p>
		  <p class="mb-0 pb-0">Job Title:</p>
          <span class="h4">${x.text}</span>
          <span class="h6">${x.date}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class=" h6 fas fa-edit"></i>
            <i onClick ="deleteTask(this);" class="fas h6 fa-trash-alt"></i>
          </span>
    </div>
    `;
	});
	draggables = document.querySelectorAll(".draggable");
	addEvent();
	
	resetForm();
};

let resetForm = () => {
	companyInput.value = '';
	textInput.value = "";
	dateInput.value = "";
	textarea.value = "";
};

let deleteTask = (e) => {
	e.parentElement.parentElement.remove();
	
	data.splice(e.parentElement.parentElement.id, 1);
	

	localStorage.setItem("data", JSON.stringify(data));

	// console.log(data);
	// createTasks();
};

let editTask = (e) => {
	let selectedTask = e.parentElement.parentElement;

	companyInput.value = selectedTask.children[1].innerHTML;
	textInput.value = selectedTask.children[3].innerHTML;
	dateInput.value = selectedTask.children[4].innerHTML;
	textarea.value = selectedTask.children[5].innerHTML;
	deleteTask(e);
};

(() => {
	data = JSON.parse(localStorage.getItem("data")) || [];
	// console.log(data);
	createTasks();
})();