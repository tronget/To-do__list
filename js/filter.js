const clearBtn = document.querySelector(".clear-filter");
const filterContainer = document.querySelector(".filter");
const filterImportanceChildren = document.querySelectorAll(".filter__importance label");
const filterCategoryContainer = document.querySelector(".filter__category-container");
const filterAcceptBtn = document.querySelector(".accept-filter-btn");
setTimeout(() => {
	document.querySelector(".filter-btn").addEventListener("click", () => {
		filterContainer.classList.add('active');
	})
}, 100);

filterContainer.addEventListener('click', (e) => {
	if (e.target === filterContainer) filterContainer.classList.remove('active');
})

// при нажатии на отмеченный радио инпут, он перестает быть отеченным
filterImportanceChildren.forEach(el => {el.addEventListener('click', function(e) {
	if (!e.target.previousElementSibling.checked) return;
	setTimeout(() => {
		e.target.previousElementSibling.checked = false;
	}, 10)
})})

// добавление категории и ее подсчет в фильтр
function addCategory(categ, img) {
	if (categoryCounter.hasOwnProperty(categ)) {
		categoryCounter[categ]++;
		filterCategoryContainer.querySelector(`label[for="${categ}"] span:last-child`).textContent = `(${categoryCounter[categ]})`;
	} else {
		categoryCounter[categ] = 1;
		filterCategoryContainer.insertAdjacentHTML("beforeend", 
			`<div class="filter__category">
				<input type="checkbox" id="${categ}">
				<label for="${categ}">
					${img}<span>${categ}</span><span>(1)</span>
				</label>
			</div>`
		)
	}
}
// удаление категории
function deleteCategory(categ) {
	if (categoryCounter[categ] > 1) {
		categoryCounter[categ]--;
		filterCategoryContainer.querySelector(`label[for="${categ}"] span:last-child`).textContent = `(${categoryCounter[categ]})`;
	} else {
		delete categoryCounter[categ];
		filterCategoryContainer.removeChild(filterCategoryContainer.querySelector(`input[id="${categ}"]`).parentNode)
	}
}

// очистка фильтра
clearBtn.addEventListener("click", () => {
	filterContainer.querySelectorAll("input").forEach(el => {
		el.checked = false;
	})
})

// применение фильтра
filterAcceptBtn.addEventListener("click", acceptFilter)
const descendingInput = document.getElementById('descending'), increaseInput = document.getElementById('increase');
function acceptFilter() {
	let selectedCategories = [];
	document.querySelectorAll('.filter__category input').forEach(el => {
		if (el.checked) selectedCategories.push(el.id)
	})
	if (selectedCategories.length) {
		filterArr = dealsArr.filter(el => selectedCategories.includes(el.category));
	} else {filterArr = dealsArr.slice()}
	if (descendingInput.checked) {
		filterArr.sort((a, b) => b.importance - a.importance);
	} else if (increaseInput.checked) filterArr.sort((a, b) => a.importance - b.importance);
	let str = '';
	filterArr.forEach((el) => {
		str += el.htmlElem;
	})
	dealContainer.innerHTML = str;
	checkEmptyArr();
	setTimeout(() => {
		document.querySelectorAll(".delete-btn").forEach((el) => {
			el.addEventListener('click', deleteDeal);
		})
	}, 100);
	filterContainer.classList.remove('active');
	Array.prototype.forEach.call(dealContainer.children, el => {
		el.addEventListener('animationend', function() {
			this.style.animation = 'none';
			this.style.opacity = 1;
		});
	})
}