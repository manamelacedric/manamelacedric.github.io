// define vars
const menuBtn = document.querySelector('.menu-btn')
const form = document.querySelector('form')
const nav = document.querySelector('nav')
const year = document.querySelector('.year')
let menuOpen = false

// form elements
const formMessage = document.querySelector('#form-message')
const name = form.elements['name']
const cellphone = form.elements['cellphone']
const email = form.elements['email']
const message = form.elements['message']
const submit = form.elements['submit']
/*
const header = document.querySelector('.main-header');

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  if(scrollPos > 10){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
})
*/
year.textContent = new Date().getFullYear()
ScrollReveal({ reset: true, delay: 300 })
ScrollReveal().reveal('.intro')
ScrollReveal().reveal('.work')
ScrollReveal().reveal('.projects')
ScrollReveal().reveal('.skills')
ScrollReveal().reveal('.about')
ScrollReveal().reveal('.contact')

// Register Service Worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', function () {
		navigator.serviceWorker
			.register('/sw.js')
			.then((res) => console.log('service worker registered'))
			.catch((err) => console.log(err))
	})
}

menuBtn.addEventListener('click', () => {
	if (!menuOpen) {
		menuBtn.classList.add('menu-open')
		nav.classList.add('nav-open')
		menuOpen = true
	} else {
		menuBtn.classList.remove('menu-open')
		nav.classList.remove('nav-open')
		menuOpen = false
	}
})

form.addEventListener('submit', async (event) => {
	event.preventDefault()
	// TODO: Do validations
	

	const params = {
		name: name.value,
		cellphone: cellphone.value,
		email: email.value,
		message: message.value,
	}

	const headers = {
		'x-api-key': '1234567890',
		'Content-Type': 'application/json',
	}

	// disable the form fields
	setFormDisabled()

	// post form data in a json format
	await fetch('https://ced-bot.herokuapp.com', {
		method: 'post',
		body: JSON.stringify(params),
		headers,
	})
		.then((res) => res.json())
		.then(setFormSuccess)
		.catch(setFormError)
		.finally(() => {
			setTimeout(() => {
				// remove form response
				formMessage.classList.remove(...formMessage.classList)
				formMessage.textContent = ''

				// enable form elements
				setFormDisabled(false)
			}, 8000)
		})
})

/**
 * Enable / disable form elements
 * @param {boolean} disbled 
 */
function setFormDisabled(disbled = true) {
	submit.disabled = disbled
	name.disabled = disbled
	cellphone.disabled = disbled
	email.disabled = disbled
	message.disabled = disbled
	name.value = ''
	cellphone.value = ''
	email.value = ''
	message.value = ''
}

/**
 * Set form success message
 * @param {{}} param0 
 */
function setFormSuccess({ success, error, data }) {
	console.log('success', success)
	const className = success ? 'form-success' : 'form-error'
	formMessage.classList.add(className)
	formMessage.textContent = success ? data.message : error.message
}

/**
 * Set form error message
 * @param {{}} param0 
 */
function setFormError(err) {
	console.log('Submit form error:', err)
			formMessage.classList.add('form-error')
			formMessage.textContent = 'An unexpected error occcured while sending your message, please try again later'
}

const observer = new IntersectionObserver(test, {})

function test() {}
