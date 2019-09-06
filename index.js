const modal = document.querySelector(".modal_background");
modal.addEventListener("click", () => {
	modal.classList.add("hide");
})


fetch("http://kea-alt-del.dk/t5/api/categories")
	.then(function (response) {
		return response.json()
	}).then(function (data) {
		data.forEach(buildCategory);
		getProducts();
	})

function buildCategory(data) {
	//	console.log(data)
	const section = document.createElement("section");
	const header = document.createElement("h1");
	header.textContent = data;
	section.setAttribute("id", data);
	section.appendChild(header);

	document.querySelector("main").appendChild(section);
	console.log(data);
}

function getProducts() {

	fetch("https://kea-alt-del.dk/t5/api/productlist")
		.then(function (response) {
			return response.json()
		}).then(function (data) {
			data.forEach(showCourse)
		})

}

function showCourse(course) {
	console.log(course)

	const template = document.querySelector("template").content;
	const myCopy = template.cloneNode("true");
	myCopy.querySelector(".data_img").src = "imgs/imgs/large/" + course.image + ".jpg";

	myCopy.querySelector(".data_name").textContent = course.name;
	myCopy.querySelector(".data_price").textContent = course.price;
	if (course.discount) {
		myCopy.querySelector(".data_price").classList.add("discount");
		myCopy.querySelector(".data_discount").textContent = Math.round(course.price - course.discount / 100 * course.price)

	} else {
		myCopy.querySelector(".data_discount").remove();
	}

	if (!course.soldout) {
		myCopy.querySelector("article").classList.remove("soldOut");
	}


	myCopy.querySelector("button").addEventListener("click", () => {
		fetch(`https://kea-alt-del.dk/t5/api/product?id=${course.id}`)
			.then(res => res.json())
			.then(showDetails);

	});
		document.querySelector(`#${course.category}`).appendChild(myCopy);


}

	function showDetails(data){
		modal.querySelector(".modalName").textContent = data.name;

		modal.querySelector(".modal_image").src = "imgs/imgs/small/" + data.image + "-sm.jpg";

		modal.querySelector(".description").textContent = data.shortdescription;

		modal.querySelector(".modalPrice").textContent = data.price;

		modal.querySelector(".containAlcohol").textContent = "Alcohol:"+data.alcohol+"%;";



		modal.querySelector(".vegeterian").textContent = data.vegetarian;

		modal.classList.remove("hide");

}





function addCopy() {
	const myTemplate = document.querySelector("template").content;
	const myCopy = myTemplate.cloneNode(true);
	const main = document.querySelector("aside");
	aside.appendChild(myCopy);
}
