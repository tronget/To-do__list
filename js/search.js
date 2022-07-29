const searchInput = document.querySelector(".search-input");
searchInput.addEventListener('input', search)

function search() {
	searchArr = filterArr.filter((el) => {
		return el.text.toLowerCase().includes(searchInput.value.toLowerCase());
	})
	let str = '';
	searchArr.forEach((el) => {
		str += el.htmlElem;
	})
	dealContainer.innerHTML = str;
	checkEmptyArr();
	for (let el of dealContainer.children) {
		el.style.opacity = 1;
		el.style.animation = 'none';
	}
	setTimeout(() => {
		document.querySelectorAll(".delete-btn").forEach((el) => {
			el.addEventListener('click', deleteDeal);
		})
	}, 100);
}