const dealsArr = [];
let filterArr = [];
let searchArr = [];
let categoryCounter = {};
let dealContainer = document.querySelector(".deals-container");
let searchInput = document.querySelector(".search-input");
let filterCategoryContainer = document.querySelector(".filter__category-container");
let noDeals = document.querySelector(".no-deals");
if (!localStorage.cntId) {localStorage.cntId = 1;} //счетчик дел (записывается в dataset у каждого дела)
function checkEmptyArr() {
	if (!filterArr.length || !searchArr.length) {
		noDeals.style.opacity = 1;
	} else {noDeals.style.opacity = 0;}
}
// Сохранение локальных данных
const p = new Promise((resolve) => {
	window.addEventListener('click', () => {
		setTimeout(() => {
			localStorage.setItem('documentHtml', document.documentElement.innerHTML);
			localStorage.setItem('filterArr', JSON.stringify(filterArr));
			localStorage.setItem('dealsArr', JSON.stringify(dealsArr));
			localStorage.setItem('searchArr', JSON.stringify(searchArr));
			localStorage.setItem('categoryCounter', JSON.stringify(categoryCounter));
			localStorage.setItem('searchInput', searchInput.value);
		}, 1000);
	});
	if (localStorage.getItem('documentHtml')) {
		document.documentElement.innerHTML = localStorage.documentHtml;
		filterArr = JSON.parse(localStorage.filterArr);
		searchArr = JSON.parse(localStorage.searchArr);
		changeArr(dealsArr, JSON.parse(localStorage.dealsArr));
		Object.assign(categoryCounter, JSON.parse(localStorage.categoryCounter));
		resolve();
	}
});
// В случае открытия страницы в следующие разы, пеерзаписываем значения переменных,
// т.к. documentElement изменяется вручную (перезаписывается);
p.then(() => {
	dealContainer = document.querySelector(".deals-container");
	searchInput = document.querySelector(".search-input");
	filterCategoryContainer = document.querySelector(".filter__category-container");
	noDeals = document.querySelector(".no-deals");
});


function deleteDeal(e) {
   let targetDeal = e.target.parentNode;
   let targetId = +targetDeal.dataset.id;
   let targetDealItem = dealsArr.find((el) => el.id === targetId); // удаляемый элемент из массива
   deleteCategory(targetDealItem.category);
   changeArrsById(targetId, dealsArr, filterArr, searchArr);
   targetDeal.style.opacity = 0;
   targetDeal.addEventListener("transitionend", function () {
      dealContainer.removeChild(this);
   });
   let deals = Array.prototype.slice.call(dealContainer.children);
   for (let i = deals.indexOf(targetDeal) + 1; i < deals.length; i++) {
      deals[i].style.transform = `translateY(-${
         targetDeal.clientHeight + 18
      }px)`;
      deals[i].addEventListener("transitionend", function () {
         this.style.transform = "translateY(0px)";
         this.style.transition = "none";
         setTimeout(() => {
            this.style.transition = "0.6s";
         }, 10);
      });
   }
   checkEmptyArr();
}
function changeArrsById(argId, ...arrs) {
   for (let arr of arrs) {
      let i = arr.findIndex((el) => el.id === argId);
      if (i === 0) {
         arr.splice(0, 1);
      } else {
         arr.splice(i, i);
      }
   }
}
function pushToArrs(value) {
	dealsArr.push(value);
	filterArr.push(value);
	searchArr.push(value);
}
// удаление категории
function deleteCategory(categ) {
   if (categoryCounter[categ] > 1) {
      categoryCounter[categ]--;
      filterCategoryContainer.querySelector(
         `label[for="${categ}"] span:last-child`
      ).textContent = `(${categoryCounter[categ]})`;
   } else {
      delete categoryCounter[categ];
      filterCategoryContainer.removeChild(
         filterCategoryContainer.querySelector(`input[id="${categ}"]`)
            .parentNode
      );
   }
}

function changeArr(arr, value) {
	arr.length = 0;
	for (let elem of value) {
		arr.push(elem);
	}
}
export {
	dealsArr, filterArr, searchArr,
	categoryCounter, dealContainer, searchInput,
	noDeals, pushToArrs, changeArr, deleteDeal,
	 checkEmptyArr, filterCategoryContainer
};