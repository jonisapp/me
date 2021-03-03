var form = document.getElementById('contact_form');
form.addEventListener('submit', function (event) {
	event.preventDefault();

	var formData = new FormData(form);
	var xhr = new XMLHttpRequest();
	xhr.open('POST', form.action, true);
	xhr.addEventListener('load', function () {
		var res = JSON.parse(xhr.response);
		console.log(res);
	});
	xhr.send(formData);
});
