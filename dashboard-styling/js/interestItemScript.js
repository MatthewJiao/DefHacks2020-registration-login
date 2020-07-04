var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("#customUl");
var item = document.getElementsByTagName("li");




//LOAD INTERESTS FROM DB
const rawResponse = fetch('https://c206dc7845d4.ngrok.io/dashboard/load', {
	method: 'GET',
	headers: {
		'Accept': 'application/json'
	}
}).then(response => response.json())
	.then(data => {
		for(let i = 0; i < data.length; i++) {
			createListElement(data[i])
		}
	})




function inputLength(){
	return input.value.length;
} 

function listLength(){
	return item.length;
}

function createListElement(text=input.value) {
    var li = document.createElement("li"); // creates an element "li"
	li.id = "customLi"
	li.appendChild(document.createTextNode(text)); //makes text from input field the li text
	ul.appendChild(li); //adds li to ul
	if(text == input.value) {
		const rawResponse = fetch('https://c206dc7845d4.ngrok.io/dashboard/append', {
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({append: text})
		  }).then(response => console.log(response));
		  console.log("Append to Interests Request Sent")
	}

	input.value = ""; //Reset text input field


	//START STRIKETHROUGH
	// because it's in the function, it only adds it for new items
	function crossOut() {
		li.classList.toggle("done");
	}

	li.addEventListener("click",crossOut);
	//END STRIKETHROUGH


	// START ADD DELETE BUTTON
	var dBtn = document.createElement("button");
	dBtn.appendChild(document.createTextNode("X"));
	li.appendChild(dBtn);
	dBtn.addEventListener("click", deleteListItem);
	// END ADD DELETE BUTTON


	//ADD CLASS DELETE (DISPLAY: NONE)
	function deleteListItem(){
		const delItem = li.innerHTML.substring(0, li.innerHTML.indexOf('<')); //find item for deletion
		li.classList.add("delete") //delete from local list
		const rawResponse = fetch('https://c206dc7845d4.ngrok.io/dashboard/delete', { //send POST request to delete from db
			method: 'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({del: delItem})
		  }).then(response => console.log(response));
		  console.log("Delete Interests Update Sent")
	}
	//END ADD CLASS DELETE
}


function addListAfterClick(){
	if (inputLength() > 0) { //makes sure that an empty input field doesn't create a li
		createListElement();
	}
}

function addListAfterKeypress(event) {
	if (inputLength() > 0 && event.which ===13) { //this now looks to see if you hit "enter"/"return"
		//the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
		createListElement();
	} 
}

enterButton.addEventListener("click",addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

