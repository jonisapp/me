const data = {
	slideshows_urls: {
		notacloud: [
			'images/notacloud/notacloudDashboard.png',
			'images/notacloud/notacloud_operations.png',
			'images/notacloud/notacloudAccountingAccounts.png',
		],
		cinetwork: [
			'images/cinetwork/movie_details.png',
			'images/cinetwork/movies.png',
			'images/cinetwork/movie.png',
		],
		planner: ['images/planner/planner.png', 'images/planner/zoom.gif'],
	},
};

const state = {
	menuIsOpen: false,
	scrollLiftIsOnTop: true,
	slideshows_indexes: {
		notacloud: 0,
		cinetwork: 0,
		planner: 0,
	},
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

// toggle avatar transition
_.winEvent('scroll', function () {
	const me_elm = _.get('me');
	const triggerHeight = me_elm.offsetHeight / 4;
	console.log(triggerHeight);
	if (state.scrollLiftIsOnTop !== window.pageYOffset <= triggerHeight) {
		state.scrollLiftIsOnTop = window.pageYOffset <= triggerHeight;
		_.get('me').classList[state.scrollLiftIsOnTop ? 'remove' : 'add'](
			'me-transition-out'
		);
	}
});

function slideshowsInit(
	slideshowName_strArr,
	duration_int,
	randomInterval_int
) {
	slideshowName_strArr.forEach(function (slideshowName_str) {
		_.get(
			`slideshow_${slideshowName_str}`
		).style.backgroundImage = `url("${data.slideshows_urls[slideshowName_str][0]}")`;

		setInterval(function () {
			state.slideshows_indexes[slideshowName_str] =
				state.slideshows_indexes[slideshowName_str] ===
				data.slideshows_urls[slideshowName_str].length - 1
					? 0
					: state.slideshows_indexes[slideshowName_str] + 1;
			_.get(`slideshow_${slideshowName_str}`).classList.remove('animate');
			setTimeout(function () {
				_.get(`slideshow_${slideshowName_str}`).classList.add('animate');
				_.get(`slideshow_${slideshowName_str}`).style.backgroundImage = `url("${
					data.slideshows_urls[slideshowName_str][
						state.slideshows_indexes[slideshowName_str]
					]
				}")`;
			}, 250);
		}, duration_int + Math.floor(Math.random() * randomInterval_int));
	});
}

// on page load
_.winEvent('load', function () {
	var menuButton = _.get('main-nav__menu-button');
	menuButton.addEventListener('click', toggleMenu);
	slideshowsInit(['notacloud', 'cinetwork', 'planner'], 4000, 1000);
});
