class FormHelper {
    static resetForm(formId) {
        const form = document.querySelector(`form[id=${formId}]`);
        if (form) {
            form.querySelectorAll('.input-error').forEach(element => {
                element.classList.remove('input-error');
            });

            form.querySelectorAll('.label-text-error').forEach(element => {
                element.parentElement.classList.add('hidden');
                element.textContent = '';
            });
        }
    }

    static handleErrors(formId, errors) {
        const form = document.querySelector(`form[id=${formId}]`);
        if (form) {
            // Loop through the errors object
            for (const [key, message] of Object.entries(errors)) {
                const inputElement = form.querySelector(`input[id=${key}-input]`);
                const errorElement = form.querySelector(`span[id=${key}-error]`);

                if (inputElement && errorElement) {
                    // Add error class to input
                    inputElement.classList.add('input-error');

                    // // Display the error message
                    errorElement.textContent = message;
                    errorElement.parentElement.classList.remove('hidden');
                }
            }
        }
    }
}

export default FormHelper;