import {
   dealsArr,
   filterArr,
   searchArr,
   changeArr,
   dealContainer,
   checkEmptyArr,
   searchInput,
} from "./variables.js";
const clearBtn = document.querySelector(".clear-filter");
const filterContainer = document.querySelector(".filter");
const filterImportanceChildren = document.querySelectorAll(
   ".filter__importance label"
);

const filterAcceptBtn = document.querySelector(".accept-filter-btn");
setTimeout(() => {
   document.querySelector(".filter-btn").addEventListener("click", () => {
      filterContainer.classList.add("active");
   });
}, 100);

filterContainer.addEventListener("click", (e) => {
   if (e.target === filterContainer) {
      filterContainer.classList.remove("active");
   }
});

// при нажатии на отмеченный радио инпут, он перестает быть отеченным
filterImportanceChildren.forEach((el) => {
   el.addEventListener("click", function (e) {
      if (e.target.previousElementSibling.checked) {
         setTimeout(() => {
            e.target.previousElementSibling.checked = false;
         }, 10);
      }
   });
});

// очистка фильтра
clearBtn.addEventListener("click", () => {
   filterContainer.querySelectorAll("input").forEach((el) => {
      el.removeAttribute("checked");
   });
});

// применение фильтра
filterAcceptBtn.addEventListener("click", acceptFilter);
const descendingInput = document.getElementById("descending"),
   increaseInput = document.getElementById("increase");
function acceptFilter() {
   if (searchInput.value) {
      searchInput.value = "";
      changeArr(searchArr, filterArr);
   }
   let selectedCategories = [];
   document.querySelectorAll(".filter__category input").forEach((el) => {
      if (el.checked) {
         selectedCategories.push(el.id);
      }
   });
   if (selectedCategories.length) {
      let copy = dealsArr.filter((el) =>
         selectedCategories.includes(el.category)
      );
      filterArr.length = 0;
      for (let elem of copy) {
         filterArr.push(elem);
      }
   } else {
      let copy = dealsArr.slice();
      filterArr.length = 0;
      for (let elem of copy) {
         filterArr.push(elem);
      }
   }
   if (descendingInput.checked) {
      filterArr.sort((a, b) => b.importance - a.importance);
   } else if (increaseInput.checked) {
      filterArr.sort((a, b) => a.importance - b.importance);
   }
   let str = "";
   filterArr.forEach((el) => {
      str += el.htmlElem;
   });
   dealContainer.innerHTML = str;
   checkEmptyArr();
   filterContainer.classList.remove("active");
   Array.prototype.forEach.call(dealContainer.children, (el) => {
      el.addEventListener("animationend", function () {
         this.style.animation = "none";
         this.style.opacity = 1;
      });
   });
}
