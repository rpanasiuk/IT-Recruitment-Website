function header() {
    const $header = $('.page-header');
    $(window).on('scroll', function(e) {
        if (this.pageYOffset >= 100) {
            $header.addClass('sticky');
        } else {
            $header.removeClass('sticky');
        }
    })

    $('.nav a').on('click', function(e) {
        e.preventDefault();
        const href = $(this).attr('href');
        const $target = $(href);

        $('html, body').animate({
            scrollTop : $target.offset().top
        }, 1000)
    })
}

export { header }