const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const country = document.getElementById('country');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation();
});

function formValidation() {
  validateEmpty([username, email, password, password2, country]);
}

function validateEmpty(inputs) {
  inputs.forEach((element) => {
    if (element.hasAttribute('required') && element.value.trim() === '') {
      console.log('Empty:: ', element);
      showError(
        element,
        element.previousElementSibling.innerText + ' is Required'
      );
    } else {
      if (
        element.hasAttribute('minlength') &&
        element.hasAttribute('maxlength')
      ) {
        validateLength(element);
      }
      if (element.type === 'email') {
        validateEmail(email);
      }
      if (element.id === 'password2') validatePwd(password, password2);
      if (element.id === 'country') showSuccess(element);
    }
  });
}

function validateLength(element) {
  let elemValueLength = element.value.trim().length;
  let minLength = element.minLength;
  let maxLength = element.maxLength;
  if (elemValueLength < minLength || elemValueLength > maxLength) {
    showError(
      element,
      `${element.previousElementSibling.innerText} must have ${minLength} - ${maxLength} characters.`
    );
    console.log('length:: ', element);
  } else showSuccess(element);
}

function validateEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email.value.trim())) showSuccess(email);
  else {
    showError(email, 'Invalid Email');
    console.log('Email :: ', element);
  }
}

function validatePwd(pwd1, pwd2) {
  if (pwd1.value !== pwd2.value) showError(pwd2, 'Passwords are not matched');
  else showSuccess(pwd2);
}

function showError(input, message) {
  let formControl = input.parentElement;
  updateClassNames([
    {
      targetElement: formControl,
      actions: [
        { classNames: ['error'], type: 'add' },
        { classNames: ['success'], type: 'remove' },
      ],
    },
  ]);
  let errorMsg = formControl.querySelector('small');
  errorMsg.innerText = message;
}

function showSuccess(input) {
  let formControl = input.parentElement;
  updateClassNames([
    {
      targetElement: formControl,
      actions: [
        { classNames: ['success'], type: 'add' },
        { classNames: ['error'], type: 'remove' },
      ],
    },
  ]);
}

function updateClassNames(elements) {
  elements.forEach((elem) => {
    elem.actions.forEach((data) => {
      if (data.type.toLowerCase() === 'add')
        elem.targetElement.classList.add([...data.classNames]);
      else if (data.type.toLowerCase() === 'remove')
        elem.targetElement.classList.remove([...data.classNames]);
    });
  });
}
