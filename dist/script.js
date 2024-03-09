const formIds = ['personalDataForm', 'projectDetailsForm', 'termsAndConditionsForm'];

function submitForm() {
    formIds.forEach(formId => {
        const form = document.getElementById(formId);
        const inputs = form.querySelectorAll('input, textarea, select');

        // Verificar si el formulario está completo
        const isFormComplete = Array.from(inputs).every(input => input.value.trim() !== '');

        if (!isFormComplete) {
            inputs.forEach(input => {
                if (input.value.trim() === '') {
                    input.classList.add('invalid'); // Agregar clase Bootstrap para resaltar
                } else {
                    input.classList.remove('is-invalid'); // Eliminar la clase Bootstrap si el campo es válido
                }
            });

            appendAlert('Por favor, completa todos los campos.', 'danger');

            return;
        }
        appendAlert('El formulario se ha enviado correctamente.', 'success');
        return;
        // Código adicional para enviar el formulario
    });
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
    alertPlaceholder.innerHTML = ''; // Limpiar alertas previas
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