/**
 * Shared enhancements: staggered scroll-reveals, stat count-ups, subtle
 * banner parallax, card tilt, and the hero particle field.
 * Progressive enhancement only. If this file never runs, everything is
 * fully visible and readable, and prefers-reduced-motion disables all of
 * it except instant stat values.
 */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

	/* ---------- Staggered scroll reveal ---------- */

	var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
	if (revealEls.length && 'IntersectionObserver' in window && !reduceMotion) {
		// Elements inside a .stagger container reveal one after another.
		document.querySelectorAll('.stagger').forEach(function (group) {
			Array.prototype.slice.call(group.querySelectorAll('.reveal')).forEach(function (el, i) {
				el.style.setProperty('--reveal-delay', Math.min(i * 90, 540) + 'ms');
			});
		});

		revealEls.forEach(function (el) {
			el.classList.add('reveal--pending');
		});
		var io = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					entry.target.classList.remove('reveal--pending');
					entry.target.classList.add('reveal--visible');
					io.unobserve(entry.target);
				}
			});
		}, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
		revealEls.forEach(function (el) {
			io.observe(el);
		});
	}

	/* ---------- Stat count-up (data-count) ---------- */

	var stats = Array.prototype.slice.call(document.querySelectorAll('[data-count]'));
	stats = stats.filter(function (el) {
		return el.getAttribute('data-count') !== '' && !isNaN(parseFloat(el.getAttribute('data-count')));
	});
	if (stats.length && 'IntersectionObserver' in window) {
		var animate = function (el) {
			var target = parseFloat(el.getAttribute('data-count'));
			var suffix = el.getAttribute('data-count-suffix') || '';
			if (reduceMotion) {
				el.textContent = target.toLocaleString() + suffix;
				return;
			}
			var duration = 1400;
			var start = null;
			var step = function (ts) {
				if (!start) {
					start = ts;
				}
				var progress = Math.min((ts - start) / duration, 1);
				var eased = 1 - Math.pow(1 - progress, 3);
				el.textContent = Math.round(target * eased).toLocaleString() + suffix;
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			};
			window.requestAnimationFrame(step);
		};

		var statIo = new IntersectionObserver(function (entries) {
			entries.forEach(function (entry) {
				if (entry.isIntersecting) {
					animate(entry.target);
					statIo.unobserve(entry.target);
				}
			});
		}, { threshold: 0.5 });

		stats.forEach(function (el) {
			statIo.observe(el);
		});
	}

	/* ---------- Subtle parallax on hero/banner media ---------- */

	if (!reduceMotion) {
		var parallaxEls = Array.prototype.slice.call(
			document.querySelectorAll('.home-hero__img, .page-banner__img')
		);
		if (parallaxEls.length) {
			parallaxEls.forEach(function (el) {
				el.classList.add('parallax-media');
			});
			var ticking = false;
			var onScroll = function () {
				if (ticking) {
					return;
				}
				ticking = true;
				window.requestAnimationFrame(function () {
					parallaxEls.forEach(function (el) {
						var rect = el.parentElement.getBoundingClientRect();
						if (rect.bottom > 0 && rect.top < window.innerHeight) {
							// Shift up to ±6% of the container height.
							var progress = rect.top / window.innerHeight;
							el.style.transform = 'translateY(' + (progress * -6).toFixed(2) + '%) scale(1.08)';
						}
					});
					ticking = false;
				});
			};
			window.addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		}
	}

	/* ---------- Card tilt (desktop pointers only) ---------- */

	if (!reduceMotion && finePointer) {
		document.querySelectorAll('.tilt').forEach(function (card) {
			card.addEventListener('mousemove', function (e) {
				var rect = card.getBoundingClientRect();
				var x = (e.clientX - rect.left) / rect.width - 0.5;
				var y = (e.clientY - rect.top) / rect.height - 0.5;
				card.style.transform =
					'perspective(700px) rotateX(' + (-y * 4).toFixed(2) + 'deg) rotateY(' + (x * 4).toFixed(2) + 'deg) translateY(-4px)';
			});
			card.addEventListener('mouseleave', function () {
				card.style.transform = '';
			});
		});
	}

	/* ---------- Hero particle field (gear dust) ---------- */

	var canvas = document.getElementById('hero-particles');
	if (canvas && !reduceMotion && window.requestAnimationFrame) {
		var ctx = canvas.getContext('2d');
		var particles = [];
		var mouse = { x: -9999, y: -9999 };
		var running = true;

		var resize = function () {
			canvas.width = canvas.offsetWidth;
			canvas.height = canvas.offsetHeight;
		};
		resize();
		window.addEventListener('resize', resize);

		var COUNT = Math.min(70, Math.floor(canvas.width / 22));
		for (var i = 0; i < COUNT; i++) {
			particles.push({
				x: Math.random() * canvas.width,
				y: Math.random() * canvas.height,
				r: 1 + Math.random() * 2.2,
				vx: (Math.random() - 0.5) * 0.25,
				vy: -0.1 - Math.random() * 0.3,
				a: 0.15 + Math.random() * 0.4
			});
		}

		// The hero section owns the pointer; the canvas itself is pointer-events: none.
		var hero = canvas.closest('.home-hero');
		if (hero && finePointer) {
			hero.addEventListener('mousemove', function (e) {
				var rect = canvas.getBoundingClientRect();
				mouse.x = e.clientX - rect.left;
				mouse.y = e.clientY - rect.top;
			});
			hero.addEventListener('mouseleave', function () {
				mouse.x = -9999;
				mouse.y = -9999;
			});
		}

		// Pause when the hero is off screen.
		if ('IntersectionObserver' in window) {
			new IntersectionObserver(function (entries) {
				running = entries[0].isIntersecting;
			}).observe(canvas);
		}

		var tick = function () {
			if (running) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				particles.forEach(function (p) {
					// Gentle drift upward, wrap around edges.
					p.x += p.vx;
					p.y += p.vy;
					if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
					if (p.x < -4) { p.x = canvas.width + 4; }
					if (p.x > canvas.width + 4) { p.x = -4; }

					// Ease away from the cursor.
					var dx = p.x - mouse.x;
					var dy = p.y - mouse.y;
					var dist = Math.sqrt(dx * dx + dy * dy);
					if (dist < 110 && dist > 0.01) {
						var push = (110 - dist) / 110 * 1.1;
						p.x += (dx / dist) * push;
						p.y += (dy / dist) * push;
					}

					ctx.beginPath();
					ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
					ctx.fillStyle = 'rgba(0, 180, 223, ' + p.a + ')';
					ctx.fill();
				});
			}
			window.requestAnimationFrame(tick);
		};
		tick();
	}
})();
