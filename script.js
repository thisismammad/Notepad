const $ = document;

const input = $.getElementById("input");
const colors = $.querySelectorAll(".color");
const addBtn = $.getElementById("addBtn");
const clearBtn = $.getElementById("clearBtn");
const error = $.getElementById("error");
const noteContainer = $.getElementById("note-container");

function getInputBg() {
	let inputBgColor = Array.from(input.classList).find((e) => {
		return e.includes("bg-");
	});
	return inputBgColor;
}

clearBtn.addEventListener("click", () => {
	input.value = "";
});

colors.forEach((item) => {
	item.addEventListener("click", () => {
		let color = Array.from(item.classList).find((e) => {
			return e.includes("bg-");
		});
		if (getInputBg) {
			input.classList.replace(getInputBg(), color);
		} else {
			input.classList.add(color);
		}
	});
});

addBtn.addEventListener("click", (e) => {
	e.preventDefault();
	addNeNote();
});

function addNeNote() {
	if (input.value) {
		const newNote = $.createElement("div");

		newNote.innerText = input.value.trim();
		input.value = "";
		if (getInputBg) {
			newNote.className = `${getInputBg()} note relative border border-gray-300 p-3 text-justify min-w-32 max-w-72 flex justify-center rounded-md`;
		} else {
			newNote.className =
				"note relative border bg-white border-gray-300 p-3 text-justify min-w-32 max-w-72 flex justify-center rounded-md";
		}
		newNote.addEventListener("click", (e) => {
			e.target.remove();
		});
		noteContainer.appendChild(newNote);
	} else {
		error.classList.remove("invisible");
	}
}

$.body.addEventListener("keydown", (e) => {
	if (e.key === "Enter" && input.selectionStart === input.value.length) {
		e.preventDefault();
		addNeNote();
	}
});

