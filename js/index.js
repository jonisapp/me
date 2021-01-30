const state = {
	menuIsOpen: false,
	scrollLiftIsOnTop: true,
};

const _ = {
	get: function (elmId_str) {
		return document.getElementById(elmId_str);
	},
	winEvent: function (eventType_str, callback) {
		return window.addEventListener(eventType_str, callback);
	},
};

// toggle menu
function toggleMenu() {
	state.menuIsOpen = !state.menuIsOpen;
	_.get('mobile-menu').classList[state.menuIsOpen ? 'add' : 'remove'](
		'menu-show'
	);
	document.body.style.overflowY = state.menuIsOpen ? 'hidden' : 'scroll';
}

_.winEvent('load', function () {
	var menuButton = _.get('main-nav__menu-button');
	menuButton.addEventListener('click', toggleMenu);
});

// toggle #me transition
_.winEvent('scroll', function () {
	if (state.scrollLiftIsOnTop !== window.pageYOffset <= 150) {
		state.scrollLiftIsOnTop = window.pageYOffset <= 150;
		_.get('me').classList[state.scrollLiftIsOnTop ? 'remove' : 'add'](
			'me-transition-out'
		);
	}
});
