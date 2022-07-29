const inputForm = document.querySelector(".deal-form input[type='text']")
inputForm.onfocus = function() {
	this.previousElementSibling.classList.add('active')
}
inputForm.onblur = function() {
	this.previousElementSibling.classList.toggle('active', this.value !== '')
}


const rangeInput = document.querySelector("input[type='range']");
const rangeInputValue = document.querySelector("input[type='range']+span");
rangeInput.addEventListener('input', () => {
	rangeInputValue.textContent = Math.round(rangeInput.value / 10);
})