function form() {
    const $form = $('#mainForm');
    const $inputs = $form.find('input[required], textarea[required]');
    const url = '';


    $inputs.on('input', function() {

        if (!this.checkValidity()) {
            $(this).addClass('form__control-error');
        } else {
            $(this).removeClass('form__control-error');
        }
    })

    $form.attr('novalidate', true);
    $form.on('submit', function(e) {
        e.preventDefault();
        const $btn = $form.find('button:submit');

        let formHasError = false;
        $inputs.each(function() {
            if (!this.checkValidity()) {
                $(this).addClass('form__control-error');
                formHasError = true;
            } else {
                $(this).removeClass('form__control-error');
            }
        })

        if (!formHasError) {
            $btn.addClass('loading');
            $btn.prop('disabled', true);

            $.ajax({
                url : url,
                method : $form.attr('method'),
                dataType : 'json',
                data : $form.serialize()
            })
                .done(response => {

                    $form.find('.form__message').remove()
                    if (response.status === "ok") {
                        $form.find('button:submit').after('<div class="form__message">Message has been sent.</div>');
                    } else if (response.status==="error") {
                        $form.find('button:submit').after('<div class="form__message">Something went wrong.</div>');
                    }

                    if (response.errors) {
                        response.errors.forEach(el => {
                            $form.find(`[name="${el}"]`).addClass('form__control-error');
                        });
                    }
                })
                .fail(() => {
                    $form.find('.form__message').remove()
                    $form.find('button:submit').after('<div class="form-message">Connection error.</div>');
                })
                .always(() => {
                    $btn.removeClass('loading');
                    $btn.prop('disabled', false);
                })
        }
    });
}

export { form }