/**
 * Navigation: transparent→solid header on scroll (front page), off-canvas
 * hamburger menu, and accessible dropdowns (hover/focus on desktop,
 * tap-to-expand accordions on mobile).
 */
(function () {
	'use strict';

	var header = document.getElementById('site-header');
	var toggle = document.getElementById('nav-toggle');
	var nav = document.getElementById('primary-nav');
	var mq = window.matchMedia('(max-width: 880px)');

	// Transparent header solidifies after a small scroll.
	if (header && header.classList.contains('site-header--transparent')) {
		var onScroll = function () {
			header.classList.toggle('is-solid', window.scrollY > 40);
		};
		window.addEventListener('scroll', onScroll, { passive: true });
		onScroll();
	}

	// Hamburger / off-canvas.
	if (toggle && nav) {
		toggle.addEventListener('click', function () {
			var open = nav.classList.toggle('is-open');
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
			toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
		});

		document.addEventListener('keydown', function (e) {
			if (e.key === 'Escape' && nav.classList.contains('is-open')) {
				nav.classList.remove('is-open');
				toggle.setAttribute('aria-expanded', 'false');
				toggle.focus();
			}
		});
	}

	// Dropdown parents: on mobile, first tap expands the submenu.
	var parents = document.querySelectorAll('.primary-nav .menu-item-has-children');
	parents.forEach(function (item) {
		var link = item.querySelector(':scope > a');
		if (!link) {
			return;
		}
		link.setAttribute('aria-haspopup', 'true');
		link.setAttribute('aria-expanded', 'false');

		link.addEventListener('click', function (e) {
			if (mq.matches && !item.classList.contains('is-open')) {
				e.preventDefault();
				parents.forEach(function (other) {
					if (other !== item) {
						other.classList.remove('is-open');
						var l = other.querySelector(':scope > a');
						if (l) { l.setAttribute('aria-expanded', 'false'); }
					}
				});
				item.classList.add('is-open');
				link.setAttribute('aria-expanded', 'true');
			}
		});

		// Keyboard: ArrowDown/Enter open on desktop too.
		link.addEventListener('keydown', function (e) {
			if (e.key === 'ArrowDown') {
				e.preventDefault();
				item.classList.add('is-open');
				link.setAttribute('aria-expanded', 'true');
				var first = item.querySelector('.sub-menu a');
				if (first) { first.focus(); }
			}
		});

		item.addEventListener('keydown', function (e) {
			if (e.key === 'Escape') {
				item.classList.remove('is-open');
				link.setAttribute('aria-expanded', 'false');
				link.focus();
			}
		});

		// Close when focus leaves the item (desktop).
		item.addEventListener('focusout', function () {
			window.setTimeout(function () {
				if (!item.contains(document.activeElement)) {
					item.classList.remove('is-open');
					link.setAttribute('aria-expanded', 'false');
				}
			}, 0);
		});
	});
})();
