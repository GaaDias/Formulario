function permitirApenasNumeros(element) {
    element.value = element.value.replace(/[^0-9]/g, '');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneNumber = phone.replace(/\D/g, '');
    return phoneNumber.length === 11;
}

const volumeInput = document.getElementById('volume');
const plusButton = document.querySelector('.volume-btn.plus');
const minusButton = document.querySelector('.volume-btn.minus');

plusButton.addEventListener('click', () => {
    if (volumeInput.value === '') {
        volumeInput.value = 0;
    }
    volumeInput.value = parseInt(volumeInput.value) + 1;
});

volumeInput.addEventListener('input', () => {
    permitirApenasNumeros(volumeInput);
});

minusButton.addEventListener('click', () => {
    if (volumeInput.value > 0) {
        volumeInput.value = parseInt(volumeInput.value) - 1;
    }
});

// Adicionando evento para a opção dos radio buttons
document.addEventListener("DOMContentLoaded", function() {
    const opcao1 = document.getElementById('op1');
    const opcao2 = document.getElementById('op2');
    const perguntaCheckbox = document.querySelector('.pergunta-checkbox')
    const opcoes1 = document.querySelector('.opcoes-1');
    const opcoes2 = document.querySelector('.opcoes-2');
    const caixaTexto = document.getElementById('caixa-texto');

    opcao1.addEventListener('change', function() {
        if (this.checked) {
            perguntaCheckbox.style.display = 'block';
            opcoes1.style.display = 'block';
            opcoes2.style.display = 'none';
            caixaTexto.removeAttribute('required');
            caixaTexto.value = '';
        }
    });

    opcao2.addEventListener('change', function() {
        if (this.checked) {
            opcoes2.style.display = 'block';
            opcoes1.style.display = 'none';
            perguntaCheckbox.style.display = 'none';
            caixaTexto.setAttribute('required', '');
        }
    });
});

const form = document.querySelector('.formulario');

form.addEventListener('submit', (event) => {
    // Checando os campos 'require'
    const requiredFields = form.querySelectorAll('.required');
    let anyEmpty = false;
    requiredFields.forEach(field => {
        if (!field.value && field.offsetParent !== null) { // checando se o campo ta visivel
            anyEmpty = true;
            field.classList.add('error');
            alert('Preencha o campo aleatório');
        } else {
            field.classList.remove('error');
        }
    });

    // Checando se pelo menos um ta selecionado
    const radio1 = document.getElementById('op1');
    const radio2 = document.getElementById('op2');
    if (!radio1.checked && !radio2.checked) {
        anyEmpty = true;
        alert('Selecione uma opção (1 ou 2)!');
    }

    // Checando se o usuario aceitou os termos/politica
    const checkbox16 = document.getElementById('checkbox16');
    if (!checkbox16.checked) {
        anyEmpty = true;
        checkbox16.classList.add('error');
    } else {
        checkbox16.classList.remove('error');
    }

    // se o primeiro radio estiver selecionado
    if (radio1.checked) {
        // Checando se pelo menos uma checkbox ta selecionada
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        let anyChecked1to15 = false;
        checkboxes.forEach(checkbox => {
            if (checkbox.checked && checkbox.id !== 'checkbox16') { // exclui a checkbox 16 pois ela representa a politica
                anyChecked1to15 = true;
                return;
            }
        });

        if (!anyChecked1to15) {
            anyEmpty = true;
            alert('Selecione pelo menos uma opção (1-15)!');
        }
    }

    // Checando se o email e telefone são validos
    const emailField = document.getElementById('email');
    const phoneField = document.getElementById('telefone');
    if (emailField.value && !isValidEmail(emailField.value)) {
        emailField.classList.add('error');
        anyEmpty = true;
    } else {
        emailField.classList.remove('error');
    }

    if (phoneField.value && !isValidPhone(phoneField.value)) {
        phoneField.classList.add('error');
        anyEmpty = true;
        alert('Digite um número de telefone válido')
    } else {
        phoneField.classList.remove('error');
    }

    // Checando se a caixa de texto está vazia
    const caixaTexto = document.getElementById('caixa-texto');
    if (radio2.checked && !caixaTexto.value) {
        anyEmpty = true;
        caixaTexto.classList.add('error');
    } else {
        caixaTexto.classList.remove('error');
    }

    // não deixa enviar o formulario se algum campo necessário estiver vazio
    if (anyEmpty) {
        event.preventDefault();
    }
});
