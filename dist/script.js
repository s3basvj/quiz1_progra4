const formIds = ['personalDataForm', 'projectDetailsForm', 'termsAndConditionsForm'];

function submitForm() {
    let isAnyFormInvalid = false;

    formIds.forEach(formId => {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input, textarea, select');
        
        const requiredFields = ['phone', 'projectBudget', 'numberId'];
        const isFormANumber = Array.from(inputs).every(input => requiredFields.includes(input.name) ? !isNaN(input.value) : true);
        const isFormComplete = Array.from(inputs).every(input => input.value.trim() !== '' && input.type !== 'checkbox' ? true : input.checked);
        let incompleteFields = [];

        if (!isFormANumber || !isFormComplete) {
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('invalid');
                    incompleteFields.push(input.id);
                } else {
                    input.classList.remove('invalid');
                }
            });

            let alertMessage = 'Por favor, completa los campos correctamente, revisa el captcha y los términos y condiciones.';
            if (!isFormANumber) {
                alertMessage += ' Los campos de teléfono, presupuesto e identificación deben ser números.';
            }
            if (incompleteFields.length > 0) {
                alertMessage += ` Los campos erróneos son: ${incompleteFields.join(', ')}.`;
            }
            appendAlert(alertMessage, 'danger');
            isAnyFormInvalid = true;
        }
    });

    if (!isAnyFormInvalid) {
        appendAlert('Todos los formularios se han enviado correctamente.', 'success');
    }
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    alertPlaceholder.innerHTML = ''; 
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
    const closeBtn = wrapper.querySelector('.btn-close');
    closeBtn.addEventListener('click', () => wrapper.remove());
}