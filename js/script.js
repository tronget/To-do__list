// 'use strict';
import {
   dealsArr,
   dealContainer,
   noDeals,
   categoryCounter,
   filterCategoryContainer,
	pushToArrs,
	deleteDeal
} from "./variables.js";
import { search, searchInput } from "./search.js";
import { inputForm, rangeInput, rangeInputValue } from "./form.js";
import { modal } from "./modal.js";
const categories = document.querySelectorAll(".category-item");

const dealBtn = document.querySelector(".deal-form__btn");

const dealForm = document.querySelector(".modal-container");
categories.forEach((i) =>
   i.addEventListener("click", (e) => {
      if (e.target.classList.contains("select")) {
         return;
      }
      categories.forEach((i) => i.classList.remove("select"));
      e.target.classList.add("select");
   })
);

dealContainer.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete-btn')) {
		deleteDeal(e);
	}
});
dealBtn.addEventListener("click", () => {
   if (searchInput.value) {
      searchInput.value = "";
      search();
   }
   if (inputForm.value === "") {
      inputForm.style.backgroundColor = "#ff8484";
      inputForm.style.color = "#fff";
		dealForm.scrollTo({
			top: 0,
			behavior: "smooth"
		});
      return;
   }
   noDeals.style.opacity = "0";
   modal.classList.remove("active");
   let selectedCategoryElements = Array.prototype.find.call(
      categories,
      (el) => {
         return el.classList.contains("select");
      }
   ).children;
   let newDeal = new Deal(
      inputForm.value,
      rangeInputValue.textContent,
      selectedCategoryElements[1].textContent,
      selectedCategoryElements[0].outerHTML
   );
   pushToArrs(newDeal);
   dealContainer.insertAdjacentHTML("beforeend", dealsArr.at(-1).htmlElem);
   dealContainer.lastChild.addEventListener("animationend", function () {
      this.style.animation = "none";
      this.style.opacity = 1;
   });
   addCategory(newDeal.category, newDeal.categoryImg);
   clearForm();
});

function Deal(text, importance, category, categoryImg) {
   this.text = text[0].toUpperCase() + text.slice(1).toLowerCase();
   this.importance = importance;
   this.category = category;
   this.categoryImg = categoryImg;
   this.id = localStorage.cntId++;
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
   inputForm.value = "";
   inputForm.previousElementSibling.classList.remove("active");
   categories.forEach((i) => i.classList.remove("select"));
   categories[0].classList.add("select");
   rangeInput.value = 50;
   rangeInputValue.textContent = 5;
   dealForm.scrollTop = 0;
   inputForm.style.backgroundColor = "#efeff7";
   inputForm.style.color = "#000";
}

setTimeout(() => {
   document.querySelectorAll(".cross").forEach((el) => {
      el.addEventListener("click", function () {
         this.closest(".close").classList.remove("active");
      });
   });
}, 100);





// добавление категории и ее подсчет в фильтр
function addCategory(categ, img) {
   if (categoryCounter.hasOwnProperty(categ)) {
      categoryCounter[categ]++;
      filterCategoryContainer.querySelector(
         `label[for="${categ}"] span:last-child`
      ).textContent = `(${categoryCounter[categ]})`;
   } else {
      categoryCounter[categ] = 1;
      filterCategoryContainer.insertAdjacentHTML(
         "beforeend",
         `<div class="filter__category">
				<input type="checkbox" id="${categ}">
				<label for="${categ}">
					${img}<span>${categ}</span><span>(1)</span>
				</label>
			</div>`
      );
   }
}

