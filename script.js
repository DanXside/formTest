

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    const labelEmail = document.getElementById('email');
    const labelName = document.getElementById('name');
    const labelPhone = document.getElementById('phone');
    const labelText = document.getElementById('text');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);

        let formData = new FormData(form);

        if (error === 0) {
            let response = await fetch('mailer/smart.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                alert('Данные отправлены');
                removeErr(labelName, labelEmail, labelPhone, labelText);
                form.reset();
            } else {
                alert('Ошибка');
            }
        };
    };

    function formValidate() {
        let error = 0;
        let formReq = document.querySelectorAll('._req');        

        for (let index = 0; index < formReq.length; index++) {
            const input = formReq[index];
            const labelEmail = document.getElementById('email');
            const labelName = document.getElementById('name');
            const labelPhone = document.getElementById('phone');
            const labelText = document.getElementById('text');
            removeError(input);
            

            if (input.classList.contains('_email')) {
                if (validateEmail(input) || input.value === '') {
                    addError(input);
                    labelEmail.classList.add('_error');
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                addError(input);
                error++;
            } else if (input.classList.contains('_name')) {
                if (input.value === '') {
                    addError(input);
                    labelName.classList.add('_error');
                    error++;
                }
            } else if (input.classList.contains('_text')) {
                if (input.value === '') {
                    addError(input);
                    labelText.classList.add('_error');
                    error++;
                }
            } else if (input.classList.contains('_phone')) {
                if (input.value === '' || validatePhone(input)) {
                    addError(input);
                    labelPhone.classList.add('_error');
                    error++;
                }
            }
        };
        return error;
    };

    function removeErr(labelName, labelEmail, labelPhone, labelText) {
        labelName.classList.remove('_error');
        labelPhone.classList.remove('_error');
        labelText.classList.remove('_error');
        labelEmail.classList.remove('_error');
    }

    function addError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };

    function removeError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };

    function validatePhone (input) {
        return !/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/.test(input.value);
    };

    function validateEmail(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };
});