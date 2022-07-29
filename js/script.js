const categories = document.querySelectorAll(".category-item");
const dealContainer = document.querySelector(".deals-container");
const dealBtn = document.querySelector(".deal-form__btn");
const noDeals = document.querySelector(".no-deals");
const dealForm = document.querySelector(".modal-container");
let deleteBtns = document.querySelectorAll(".delete-btn");
categories.forEach(i => i.addEventListener('click', (e) => {
	if (e.target.classList.contains('select')) return;
	categories.forEach(i => i.classList.remove('select'));
	e.target.classList.add('select');
}))


const dealsArr = [];
let filterArr = [];
let searchArr = [];
const categoryCounter = {};

dealBtn.addEventListener('click', () => {
	if (searchInput.value) {
		searchInput.value = '';
		search();
	}
	if (inputForm.value === '') {
		inputForm.style.backgroundColor = '#ff8484';
		inputForm.style.color = '#fff';
		return;
	}
	noDeals.style.opacity = '0';
	modal.classList.remove('active');
	let selectedCategoryElements = Array.prototype.find.call(categories, (el) => {return el.classList.contains('select')}).children;
	let newDeal = new Deal(inputForm.value, rangeInputValue.textContent, selectedCategoryElements[1].textContent, selectedCategoryElements[0].outerHTML);
	dealsArr.push(newDeal);
	dealContainer.insertAdjacentHTML('beforeend', dealsArr.at(-1).htmlElem);
	dealContainer.lastChild.addEventListener('animationend', function() {
		this.style.animation = 'none';
		this.style.opacity = 1;
	})
	addCategory(newDeal.category, newDeal.categoryImg);
	filterArr.push(dealsArr.at(-1));
	searchArr.push(dealsArr.at(-1));
	clearForm();
	setTimeout(() => {
		const deleteBtn = document.querySelector(".deal:last-child .delete-btn");
		deleteBtn.addEventListener("click", deleteDeal)
	}, 100)
})

let cnt = 1;
function Deal(text, importance, category, categoryImg) {
	this.text = text[0].toUpperCase() + text.slice(1).toLowerCase();
	this.importance = importance;
	this.category = category;
	this.categoryImg = categoryImg;
	this.id = cnt++;
	this.htmlElem = `
	<div class="deal" data-id="${this.id}">
		<span class="deal__importance">Важность: <span class="deal__importance-value">${this.importance}</span></span>
		<div class="img-n-text">
			<div class="deal_img">
				${this.categoryImg}
			</div>
			<p class="deal__text">${this.text}</p>
		</div>
		<span class="delete-btn iconify" data-icon="ant-design:delete-filled"></span>
	</div>`;
}
function clearForm() {
	inputForm.value = ''
	inputForm.previousElementSibling.classList.remove('active');
	categories.forEach(i => i.classList.remove('select'));
	categories[0].classList.add('select');
	rangeInput.value = 50;
	rangeInputValue.textContent = 5;
	dealForm.scrollTop = 0;
	inputForm.style.backgroundColor = '#efeff7';
	inputForm.style.color = '#000';
}

setTimeout(() => {
	document.querySelectorAll('.cross').forEach(el => 
		{el.addEventListener('click', function() {
			this.closest('.close').classList.remove('active');
		})
	})
}, 100);



function deleteDeal(e) {
	let targetDeal = e.target.parentNode;
	let targetId = +targetDeal.dataset.id;
	let targetDealItem = dealsArr.find((el) => el.id === targetId); // удаляемый элемент из массива
	deleteCategory(targetDealItem.category);
	changeArrsById(targetId, dealsArr, filterArr, searchArr);
	targetDeal.style.opacity = 0;
	targetDeal.addEventListener("transitionend", function() {
		dealContainer.removeChild(this);
	});
	let deals = Array.prototype.slice.call(dealContainer.children);
	for (let i = deals.indexOf(targetDeal) + 1; i < deals.length; i++) {
		deals[i].style.transform = `translateY(-${targetDeal.clientHeight + 18}px)`;
		deals[i].addEventListener('transitionend', function() {
			this.style.transform = 'translateY(0px)';
			this.style.transition = 'none';
			setTimeout(() => {
				this.style.transition = '0.6s';
			}, 10)
		});
	}
	checkEmptyArr();
}



function changeArrsById(argId, ...arrs) {
	for (let arr of arrs) {
		let i = arr.findIndex((el) => el.id === argId);
		if (i === 0) arr.splice(0, 1);
		else arr.splice(i, i);
	}
}

function checkEmptyArr() {
	if (!filterArr.length || !searchArr.length) {
		noDeals.style.opacity = 1;
	} else noDeals.style.opacity = 0;
}