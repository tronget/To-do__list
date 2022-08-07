import {filterArr, searchArr, searchInput,
	 dealContainer, checkEmptyArr, changeArr
} from './variables.js';
searchInput.addEventListener('input', search);

function search() {
	let copy = filterArr.filter((el) => {
		return el.text.toLowerCase().includes(searchInput.value.toLowerCase());
	});
	changeArr(searchArr, copy);
	let str = '';
	searchArr.forEach((el) => {
		str += el.htmlElem;
	});
	dealContainer.innerHTML = str;
	checkEmptyArr();
	for (let el of dealContainer.children) {
		el.style.opacity = 1;
		el.style.animation = 'none';
	}
}
export {searchInput, search};