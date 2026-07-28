/**
 * Gallery lightbox: click to enlarge, ←/→ to navigate, Escape to close.
 * Focus is trapped inside the dialog and returned to the opening tile.
 */
(function () {
	'use strict';

	var tiles = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox-src]'));
	if (!tiles.length) {
		return;
	}

	// Build the lightbox once.
	var box = document.createElement('div');
	box.className = 'titan-lightbox';
	box.setAttribute('role', 'dialog');
	box.setAttribute('aria-modal', 'true');
	box.setAttribute('aria-label', 'Photo viewer');
	box.hidden = true;
	box.innerHTML =
		'<button type="button" class="titan-lightbox__btn titan-lightbox__close" aria-label="Close photo viewer">×</button>' +
		'<button type="button" class="titan-lightbox__btn titan-lightbox__prev" aria-label="Previous photo">‹</button>' +
		'<img class="titan-lightbox__img" src="" alt="">' +
		'<button type="button" class="titan-lightbox__btn titan-lightbox__next" aria-label="Next photo">›</button>' +
		'<p class="titan-lightbox__caption"></p>';
	document.body.appendChild(box);

	var img = box.querySelector('.titan-lightbox__img');
	var caption = box.querySelector('.titan-lightbox__caption');
	var closeBtn = box.querySelector('.titan-lightbox__close');
	var prevBtn = box.querySelector('.titan-lightbox__prev');
	var nextBtn = box.querySelector('.titan-lightbox__next');

	var current = -1;
	var opener = null;

	function show(index) {
		current = (index + tiles.length) % tiles.length;
		var tile = tiles[current];
		img.src = tile.getAttribute('data-lightbox-src');
		img.alt = tile.getAttribute('data-lightbox-alt') || '';
		caption.textContent = tile.getAttribute('data-lightbox-alt') || '';
	}

	function open(index, source) {
		opener = source;
		box.hidden = false;
		document.body.style.overflow = 'hidden';
		show(index);
		closeBtn.focus();
	}

	function close() {
		box.hidden = true;
		document.body.style.overflow = '';
		if (opener) {
			opener.focus();
			opener = null;
		}
	}

	tiles.forEach(function (tile, index) {
		tile.addEventListener('click', function () {
			open(index, tile);
		});
	});

	closeBtn.addEventListener('click', close);
	prevBtn.addEventListener('click', function () { show(current - 1); });
	nextBtn.addEventListener('click', function () { show(current + 1); });

	box.addEventListener('click', function (e) {
		if (e.target === box) {
			close();
		}
	});

	document.addEventListener('keydown', function (e) {
		if (box.hidden) {
			return;
		}
		if (e.key === 'Escape') {
			close();
		} else if (e.key === 'ArrowLeft') {
			show(current - 1);
		} else if (e.key === 'ArrowRight') {
			show(current + 1);
		} else if (e.key === 'Tab') {
			// Focus trap across the three buttons.
			var focusables = [closeBtn, prevBtn, nextBtn];
			var first = focusables[0];
			var last = focusables[focusables.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		}
	});
})();
