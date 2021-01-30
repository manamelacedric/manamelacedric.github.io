// define vars
const menuBtn = document.querySelector('.menu-btn')
const form = document.querySelector('form')
const nav = document.querySelector('nav')
const year = document.querySelector('.year')
let menuOpen = false

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
ScrollReveal({ reset: true, delay: 600 })
ScrollReveal().reveal('.about')
ScrollReveal().reveal('.work')
ScrollReveal().reveal('.projects')

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
	const name = form.elements['name']
	const cellphone = form.elements['cellphone']
	const email = form.elements['email']
	const message = form.elements['message']

	const params = {
		name: name.value,
		cellphone: cellphone.value,
		email: email.value,
		message: message.value,
	}

	await fetch('https://ced-bot.herokuapp.com', { method: 'post', body: JSON.stringify(params), headers: { 'x-api-key': '1234567890'} })
		.then((res) => res.json())
		.then((json) => {
			console.log('json', json)
		})
		.catch((err) => {
			console.log('err', err)
		})
})

const observer = new IntersectionObserver(test, {})

function test() {}
