class Slider {
	constructor(selector, opt = {}) {
		this.selector = selector;
		this.currentSlide = 0;

		this.$banner = $(this.selector);
		this.$slides = this.$banner.children();
		this.$slides.wrapAll('<div class="banner__slides-cnt"></div>');

		const defaultOptions = {
			pauseTime : 3000,
			dots : true,
			prevText : "Previous slide",
			nextText : "Next slide"
		};

		this.options = Object.assign({}, defaultOptions, opt);

		this.makeButtons();
		if (this.options.dots) {
			this.makePagination();
		}
		this.setSlide(this.currentSlide);

		this.time = setTimeout(() => {
			this.nextSlide();
		}, this.options.pauseTime)
	}

	makePagination() {
		this.$pagination = $('<ul class="banner__pagination"></ul>');
		this.$banner.append(this.$pagination);
		this.$slides.each((i) => {
			const $li = $(`<li><button>${i+1}</button></li>`);
			$li.on('click', (e) => {
				const index = this.$pagination.find('li').index($(e.currentTarget));
				this.setSlide(index);
				this.currentSlide = index;
			});

			this.$pagination.append($li);
		})
	}

	setSlide(nr) {
		this.currentSlide = nr;
		this.$slides.removeClass('active');
		this.$slides.eq(nr).addClass('active');
		if (this.options.dots) {
			this.$pagination.find('li').removeClass('active');
			this.$pagination.find('li').eq(this.currentSlide).addClass('active');
		}

		clearTimeout(this.time);
		this.time = setTimeout(() => {
			this.nextSlide();
		}, this.options.pauseTime);
	}

	prevSlide() {
		this.currentSlide--;
		if (this.currentSlide < 0) {
			this.currentSlide = this.$slides.length - 1;
		}
		this.setSlide(this.currentSlide);
	}

	nextSlide() {
		this.currentSlide++;
		if (this.currentSlide >= this.$slides.length) {
			this.currentSlide = 0;
		}
		this.setSlide(this.currentSlide);
	}

	makeButtons() {
		this.$btnPrev = $(`<button class="banner__prev">${this.options.prevText}</button>`);
		this.$btnNext = $(`<button class="banner__next">${this.options.nextText}</button>`);

		this.$btnPrev.on('click', () => {
			this.prevSlide();
		});

		this.$btnNext.on('click', () => {
			this.nextSlide();
		});

		this.$banner.append(this.$btnPrev);
		this.$banner.append(this.$btnNext);
	}
}

export { Slider }