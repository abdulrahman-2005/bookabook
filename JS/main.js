const container = document.getElementById("container");
let searchBox = document.getElementById("search-box");
const searchButton = document.getElementById("search");
let template = ``;

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
			    غير متاح   <button >بادل</button>
            </div>
			<a href="contributers/${by}.html" target="_blank"><span>${books[book]["by"]}</span></a>
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

function search() {
	query = searchBox.value;
	container.innerHTML = "";
	Object.entries(books).forEach(([k]) => {
		if (k.includes(query)) {
			searchBox.style.border = "3px solid lightgreen";
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
                        <a href="contributers/${by}.html" target="_blank"><span>${books[book]["by"]}</span></a>
                        غير متاح   <button >تشارك</button>
                    </div>
                </div>`;
		}
	});
	if (container.innerHTML === "") {
		searchBox.style.border = "3px solid red";
		CreateBookTemplate();
	}
}
searchButton.addEventListener("click", search);
searchBox.addEventListener("keyup", () => {
	searchBox.style.border = "3px solid yellow";
});
searchBox.addEventListener("keyup", () => {
	search();
});
