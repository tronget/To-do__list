const newDealBtn = document.querySelector(".new-deal-aside__btn");
const modal = document.querySelector(".modal");
newDealBtn.addEventListener('click', () => {
	modal.classList.add('active');
})
modal.addEventListener('click', (e) => {
	if (e.target === modal) {
		modal.classList.remove('active');
	}
})