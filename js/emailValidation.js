var form = document.getElementById('contact-form');
var formMessage = document.getElementById('contact_message');
form.addEventListener('submit', function (event) {
	event.preventDefault();

	var formData = new FormData(form);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', form.action, true);
	xhr.addEventListener('load', function () {
		if (xhr.status === 200) {
			formMessage.innerHTML = 'Votre message a été transmis avec succès.';
			formMessage.style.color = '#007a0c';
		} else {
			formMessage.innerHTML =
				"Votre message n'a pas pu être envoyé, car une erreur est survenue.";
			formMessage.style.cololor = '#bc4747';
		}
		formMessage.style.display = 'block';
		setTimeout(function () {
			formMessage.style.display = 'none';
		}, 3000);
		form.reset();
	});
	xhr.send(formData);
});
