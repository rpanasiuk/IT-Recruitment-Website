import axios from 'axios';

class Container {
	constructor() {

		this.url = 'http://localhost:3050/api/';
		this.jobContainer = document.getElementById('jobContain');
		this.jobBoxes = this.jobContainer.getElementsByClassName('job-box');
		this.jobExpander = this.jobContainer.getElementsByClassName('job-expander');
		this.currentPage = 1;
		
		this.main();		
	}

	main(n=1) {

		this.initBoxes(n)
			.then(_ => {
				this.enableExpanders();
			});		
	}

	initBoxes(n) {

		return axios.get(this.url + 'page/', {
				params: {
					page: n
				}
			})
			.then((response) => {
				$('.contain').empty();

				return response;
			})
			.then(resp => {
				const boxes = document.createElement('div');
				boxes.innerHTML = resp.data;

				let i = 0;

				while (boxes.children.length) {
					i++;

					$(this.jobContainer).append(
						$(boxes.firstChild).css("opacity", "0")
					);

					$(boxes.firstChild).delay(50*i).animate({
						"opacity": 1
					}, 200);
				}				
			})
			.catch((error) => {
				console.warn('Axious error', error.message);
			});		
	}	

	enableExpanders() {

		$(this.jobBoxes).on('click', (e) => {

			const $target = $(e.currentTarget);
			const id = $target.attr('data-id');

			if ($(this.jobContainer).hasClass('processing')) {
				return;
			} else {

				$(this.jobContainer).addClass('processing');

				if (!$(this.jobBoxes).hasClass('show')) {
					this.showDoesNotExist($target, id);
					
				} else if ($target.hasClass('show')) {
					this.targetHasShow($target);

				} else {
					this.otherBoxHasShow($target, id);
				}				
			}
		})		
	}

	targetHasShow(box) {
		const $expanderElement = $(this.jobExpander[0]);		
		this.hideBoxExpander(box, $expanderElement);	
	}

	showDoesNotExist(box, id) {
		box.addClass('show');
		this.moveOrCreateExpander(box, id);			
	}

	otherBoxHasShow(box, id) {
		const $boxWithClass = $(this.jobBoxes).filter('.show');

		this.hideBoxExpander($boxWithClass, $(this.jobExpander[0]));
	}		

	indexFinder(val) {

		return this.checkWindowSize()
			.then((width) => {
				if (width === 'narrow') {
					return 1;
				} else if (width === 'wide') {
					return 2;
				} else {
					return 3;
				}
			})
			.then((formula) => {
				let int = 0;
				let n = 0;

				while (val > int) {
					int = formula * n;
					n++;
				}
				
				if (val == int) {return int + formula}

				return int;
			})
	}

	checkWindowSize() {

		return new Promise((resolve) => {
			if ( $(window).width() < 666 ) {
				return resolve("narrow");
			} else if ( $(window).width() >= 666 && $(window).width() <= 933 ) {
				return resolve("wide");
			} else {
				return resolve("very wide");
			}		
		})
	}

	getBoxExpander(box, id) {

		axios.get(this.url + 'expander/', {
				params: {
					_id: id
				}
			})
			.then(response => {
				const expander = document.createElement('div');
				expander.classList.add('hide');
				expander.innerHTML = response.data;	

				return expander;
			})
			.then((exp) => this.showBoxExpander(box, $(exp)))
			.catch((error) => {
				console.warn('Axious error', error.message);
			});
	}

	async showBoxExpander(box, expander) {
		const index = await this.indexFinder($(this.jobBoxes).index(box));		
		const jobBox = this.jobBoxes[index];

		if (jobBox) {
			$(jobBox).before(expander);
		} else {
			$(this.jobBoxes[this.jobBoxes.length - 1]).after(expander);
		}

		return Promise.resolve(expander)
			.then((exp) => {
				exp.attr('class', 'job-expander');

				return exp;
			})
			.then(exp => {
				this.$exit = exp.find('.exit').first();

				exp.slideDown( "slow", () => {
					this.startExpanderExitEvent(box, exp, this.$exit);
					this.startResizeEvent(exp);
					$(this.jobContainer).removeClass('processing');
				} );
			})
			.catch(_ => new Error('Error triggered showing box function.'));
	}

	hideBoxExpander(box, expander) {

		expander.slideUp( "slow", () => {

			return Promise.resolve(expander.attr('class', 'hide'))
				.then(() => {
					box.removeClass('show');
					box.append(expander);
				})
				.then(() => {
					this.endResizeEvent();
					this.endExpanderExitEvent(this.$exit);
				})
				.then(() => {
					$(this.jobContainer).removeClass('processing');
				});
		});		
	}

	moveOrCreateExpander(box, id) {
		if (box.children().hasClass('hide')) {
			const $expander = box.find('.hide').first();
			this.showBoxExpander(box, $expander);

		} else {
			this.getBoxExpander(box, id);
		}				
	}

	startResizeEvent(exp) {
	   $(window).on("resize.resizerEvent", () => {
	     const $boxWithClass = $(this.jobBoxes).filter('.show');

	     this.hideBoxExpander($boxWithClass, exp);
	   });
	}

	endResizeEvent() {
	   $(window).off("resize.resizerEvent");
	}

	startExpanderExitEvent(box, expander, exit) {
		exit.on('click.exitEvent', () => {
			this.hideBoxExpander(box, $(this.jobExpander[0]))
		})
	}

	endExpanderExitEvent(exit) {
		exit.off('click.exitEvent');
	}	

	makeButtons() {

		const $btnPrev = $('.main-job__btn .banner-prev');
		const $btnNext = $('.main-job__btn .banner-next');

		$btnPrev.on('click', () => {
			this.prevPage();
		});

		$btnNext.on('click', () => {
			this.nextPage();
		});
	}

	prevPage() {
		if (this.currentPage > 1) {
			this.currentPage--;
			this.main(this.currentPage);
		}
	}

	nextPage() {
		if (this.jobBoxes.length == 9) {
			this.currentPage++;
			this.main(this.currentPage);
		}	
	}
}

export { Container };