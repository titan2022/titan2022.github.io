/**
 * Awards page: era accordion. Fully keyboard-operable — the toggles are
 * real <button>s, so Enter/Space work natively; ArrowUp/ArrowDown move
 * between era headers.
 */
(function () {
	'use strict';

	var accordion = document.getElementById('awards-accordion');
	if (!accordion) {
		return;
	}

	var toggles = Array.prototype.slice.call(accordion.querySelectorAll('.awards-era__toggle'));

	toggles.forEach(function (toggle, index) {
		toggle.addEventListener('click', function () {
			var era = toggle.closest('.awards-era');
			var panel = document.getElementById(toggle.getAttribute('aria-controls'));
			var open = toggle.getAttribute('aria-expanded') === 'true';

			toggle.setAttribute('aria-expanded', open ? 'false' : 'true');
			if (panel) {
				panel.hidden = open;
			}
			if (era) {
				era.classList.toggle('is-open', !open);
			}
		});

		toggle.addEventListener('keydown', function (e) {
			var target = null;
			if (e.key === 'ArrowDown') {
				target = toggles[index + 1] || toggles[0];
			} else if (e.key === 'ArrowUp') {
				target = toggles[index - 1] || toggles[toggles.length - 1];
			} else if (e.key === 'Home') {
				target = toggles[0];
			} else if (e.key === 'End') {
				target = toggles[toggles.length - 1];
			}
			if (target) {
				e.preventDefault();
				target.focus();
			}
		});
	});
})();
