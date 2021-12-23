const container = document.getElementById("container");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-settings");
const pop = document.getElementById("sPop");
let template = ``;
let pointer = "";

const choices = {
	title: "عنوان",
	author: "مؤلف",
	publisher: "ناشر",
	isbn: "ISBN",
	pages: "عدد صفحات",
	by: "مشارك",
};

let poped = 0;
let option = "title";
function searchSet(choice = option) {
	switch (poped) {
		case 1:
			pop.style = `
			direction: rtl;
			position: fixed;
			padding-right: 10%;
			top: 0px;
			right: 0px;
			height: 1%;
			width: 1%;
			background-color: rgba(32, 24, 24, 0.952);
			color: silver;
			z-index: -10;`;
			pop.innerHTML = "";
			poped = 0;
			break;
		case 0:
			pop.style = `
			direction: rtl;
			position: fixed;
			padding-right: 10%;
			top: 0px;
			right: 0px;
			height: 100%;
			width: 50%;
			background-color: rgba(32, 24, 24, 0.952);
			color: silver;
			z-index: 10;`;
			pop.innerHTML = `
			<button onclick="searchSet()" style="height: 50px; width: 50px;font-family: helvetica; background-color: white; border-radius: 5px;">X</button><p> اعدادت البحث</p>
			<button id="title" onclick="searchSet('title')">🔍 ابحث عن عنوان</button>
			<button id="author" onclick="searchSet('author')">🔍 ابحث عن مؤلف</button>
			<button id="publisher" onclick="searchSet('publisher')" >🔍 ابحث عن ناشر</button>
			<button id="pages" onclick="searchSet('pages')" >🔍 ابحث عن صفحات</button>
			<button id="isbn" style="font-weight: normal;color: rgb(95, 13, 13); cursor: unset">X 🔍 ابحث عن ISBN</button>
			<button id="by"  onclick="searchSet('by')">🔍 ابحث عن مشارك</button>
		`;
			poped = 1;
			break;
		default:
			break;
	}
	searchBox.placeholder = `ابحث عن ${choices[choice]}`;
	option = choice;
}

function CreateBookTemplate() {
	searchBox.style.borderRadius = ".5vw"
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
					<button style="color: ${books[book]["availability"][1]}; ${
			books[book]["availability"][1] == "green" ? "cursor: pointer;" : ""
		}" 
					${
						books[book]["availability"][0] == "غير متاح"
							? "onclick='ANA()'"
							: ""
					}>بادل</button>
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
	if (searchBox.value === "") {
		searchBox.style.borderRadius = ".5vw"
	}
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
					<img src="assets/front/${books[k]["title"]}.jpg" alt="">
					<img src="assets/backward/${books[k]["title"]}.jpg" style="left: 59%" alt="">
					<div class="info-container">
						<p >العنوان: ${books[k]["title"]}</p>
						<p >المؤلف: ${books[k]["author"]}</p>
						<p >دار النشر: ${books[k]["publisher"]}</p>
						<p >الترقيم الدولي: ${books[k]["ISBN"]}</p>
						<p >عدد الصفحات: ${books[k]["pages"]}</p>
						<button style="color: ${books[k]["availability"][1]}; ${
				books[k]["availability"][1] == "green" ? "cursor: pointer;" : ""
			}" 
						${
							books[k]["availability"][0] == "غير متاح"
								? "onclick='ANA()'"
								: ""
						}>بادل</button>
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
	searchBox.style.borderRadius = "3vw"
	search();
});

function ANA() {
	alert(" عذرا، الخدمة متوقفة حاليا");
}
