const container = document.getElementById("container");
const searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search-settings");
const pop = document.getElementById("sPop");
let template = ``;
let pointer = "";

const colors = ["g", "o", "b", "p", "y"]

const choices = {
	title: "عنوان",
	author: "مؤلف",
	publisher: "ناشر",
	lang: "لغة",
	pages: "عدد صفحات",
	by: "مشارك",
};
function random(mn, mx) { 
	return Math.random() * (mx - mn) + mn; 
} 
function getRandomThing(things) {
	return things[Math.floor(random(0, things.length))]
}


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
			<button id="lang" onclick="searchSet('lang')">X 🔍 ابحث عن لغة</button>
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
	searchBox.style.borderRadius = ".5vw";
	let keys = [];
	for (let key in books) {
		keys.push(key);
	}

	container.innerHTML = "";
	for (book in books) {
		let by = people[books[book]["by"]];
		template = `
		<div class="card">
			<img src="assets/front/${books[book]["title"]}.jpg" alt="" />
			<img src="assets/backward/${books[book]["title"]}.jpg" style="left: 59%" alt=""/>
				<div class="info-container">
                    <p class="top"><span class="label o">العنوان</span> ${books[book]["title"]}</p>
                    <p><span class="label b">المؤلف</span> ${books[book]["author"]}</p>
                    <p><span class="label p">دار النشر</span> ${books[book]["publisher"]}</p>
                    <p><span class="label y">اللغة</span> ${books[book]["lang"]}</p>
                    <p><span class="label g">عدد الصفحات</span> ${books[book]["pages"]}</p>
					<button class="glow ${getRandomThing(colors)} " style="color: ${books[book]["availability"][1]}; ${
                        books[book]["availability"][1] == "green" ? "cursor: pointer;" : ""}; " 
                                ${books[book]["availability"][0] == "غير متاح" ? "onclick='ANA()'" : "" }>بادل</button>
				</div>
			<a href="../contributers/${by}.html" target=_blank><span class="span">${books[book]["by"]}</span><a>
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
		searchBox.style.borderRadius = ".5vw";
	}
	query = fixSearch(query);
	container.innerHTML = "";
	let thing;
	Object.entries(books).forEach(([k]) => {
		book = k
		thing = books[book][option]
		if (condition(option, thing, query)) {
			searchBox.style.border = "3px solid green";
			let by = people[books[k]["by"]];
			container.innerHTML += `
			
		<div class="card">
		<img src="assets/front/${books[book]["title"]}.jpg" alt="" />
		<img src="assets/backward/${books[book]["title"]}.jpg" style="left: 59%" alt=""/>
			<div class="info-container">
				<p class="top"><span class="label o">العنوان</span> ${books[book]["title"]}</p>
				<p><span class="label b">المؤلف</span> ${books[book]["author"]}</p>
				<p><span class="label p">دار النشر</span> ${books[book]["publisher"]}</p>
				<p><span class="label y">اللغة</span> ${books[book]["lang"]}</p>
				<p><span class="label g">عدد الصفحات</span> ${books[book]["pages"]}</p>
				<button class="${getRandomThing(colors)}" style="color: ${books[book]["availability"][1]}; ${
					books[book]["availability"][1] == "green" ? "cursor: pointer;" : ""}" 
							${books[book]["availability"][0] == "غير متاح" ? "onclick='ANA()'" : "" }>بادل</button>
			</div>
		<a href="../contributers/${by}.html" target=_blank><span class="span">${books[book]["by"]}</span><a>
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
	searchBox.style.borderRadius = "3vw";
	search();
});

function ANA() {
	alert(" عذرا، الخدمة متوقفة حاليا");
}
