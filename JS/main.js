const container = document.getElementById("container");
let searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-settings");
let template = ``;
const pop = document.getElementById("sPop");
let pointer = "";

let poped = 0;
const choices = {
	title: "عنوان",
	author: "مؤلف",
	publisher: "ناشر",
	isbn: "ISBN",
	pages: "عدد صفحات",
	by: "مشارك",
};

let option = "title";
function searchSet(choice = option) {
	switch (poped) {
		case 1:
			pop.style.zIndex = "-10";
			poped = 0;
			break;
		case 0:
			pop.style.zIndex = "10";
			poped = 1;
			break;
		default:
			break;
	}
	searchBox.placeholder = `ابحث عن ${choices[choice]}`;
	option = choice;
}

function CreateBookTemplate() {
	let keys = [];
	for (let key in books) {
		keys.push(key);
	}

	container.innerHTML = "";
	for (book in books) {
		let by = people[books[book]["by"]];
		template = `
        <div class="card">
				<img src="assets/front/${books[book]["title"]}.jpg" alt="">
				<img src="assets/backward/${books[book]["title"]}.jpg" style="left: 59%" alt="">
				<div class="info-container">
					<p >العنوان: ${books[book]["title"]}</p>
					<p >المؤلف: ${books[book]["author"]}</p>
					<p >دار النشر: ${books[book]["publisher"]}</p>
					<p >الترقيم الدولي: ${books[book]["ISBN"]}</p>
					<p >عدد الصفحات: ${books[book]["pages"]}</p>
					<button style="color: ${books[book]["availability"][1]}; ${books[book]["availability"][1] == "green"? "cursor: pointer;" : ""}" 
					${books[book]["availability"][0] == "غير متاح" ? "onclick='ANA()'": ""}>بادل</button>
				</div>
				<a href="contributers/${by}.html" target="_blank"><span>${
				books[book]["by"]
			}</span></a>
			</div>`;
		container.innerHTML += template;
	}
}

function up() {
	container.scrollBy(0, -350);
}

function down() {
	container.scrollBy(0, 350);
}

CreateBookTemplate();

function fixSearch(text) {
	text = text.replace("أ", "ا");
	return text;
}

function condition(opt, th, q) {
	if (opt === "pages") {
		return th === q;
	} else {
		return th.includes(q);
	}
}

function search() {
	query = searchBox.value;
	query = fixSearch(query);
	container.innerHTML = "";
	let thing;
	Object.entries(books).forEach(([k]) => {
		thing = books[k][option];

		if (condition(option, thing, query)) {
			searchBox.style.border = "3px solid green";
			let by = people[books[k]["by"]];
			container.innerHTML += `
			<div class="card">
					<img src="assets/front/${books[book]["title"]}.jpg" alt="">
					<img src="assets/backward/${books[book]["title"]}.jpg" style="left: 59%" alt="">
					<div class="info-container">
						<p >العنوان: ${books[book]["title"]}</p>
						<p >المؤلف: ${books[book]["author"]}</p>
						<p >دار النشر: ${books[book]["publisher"]}</p>
						<p >الترقيم الدولي: ${books[book]["ISBN"]}</p>
						<p >عدد الصفحات: ${books[book]["pages"]}</p>
						<button style="color: ${books[book]["availability"][1]}; ${books[book]["availability"][1] == "green"? "cursor: pointer;" : ""}" 
						${books[book]["availability"][0] == "غير متاح" ? "onclick='ANA()'": ""}>بادل</button>
					</div>
					<a href="contributers/${by}.html" target="_blank"><span>${
					books[book]["by"]
				}</span></a>
				</div>`;
		}
	});
	if (container.innerHTML === "") {
		searchBox.style.border = "3px solid red";
		CreateBookTemplate();
	}
}

searchBox.addEventListener("keyup", () => {
	searchBox.style.border = "3px solid yellow";
	search();
});

function ANA() {
	alert("هذا الكتاب غير متاح حاليا")
}