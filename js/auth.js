const $signinUserId = document.querySelector('#signin-userid');
const $signinPassword = document.querySelector('#signin-password');
const $signupUserId = document.querySelector('#signup-userid');
const $signupPassword = document.querySelector('#signup-password');
const $signupName = document.querySelector('#signup-name');
const $signupConfirmPassword = document.querySelector('#signup-confirm-password');

let [isValidID, isValidPWD, isValidName, isSamePassword] = [false, false, false, false];

function toggleSubmitBtn() {
  if (isValidID && isValidPWD) document.querySelector('.signin button').removeAttribute('disabled');
  else document.querySelector('.signin button').setAttribute('disabled', '');
}

function toggleSignupBtn() {
  if (isValidID && isValidPWD && isValidName && isSamePassword)
    document.querySelector('.signup button').removeAttribute('disabled');
  else document.querySelector('.signup button').setAttribute('disabled', '');
}

function checkIsValidID(formElement) {
  const emailRegexr = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  isValidID = emailRegexr.test(formElement.querySelector('[id$="-userid"]').value);
  formElement.querySelector('.error').innerHTML = isValidID ? '' : '이메일 형식에 맞게 입력해 주세요.';
  formElement.querySelector('.icon-error').classList.toggle('hidden', isValidID);
  formElement.querySelector('.icon-success').classList.toggle('hidden', !isValidID);
  toggleSubmitBtn();
}

function checkIsValidPWD(formElement) {
  const passwordRegexr = /^[A-Za-z0-9]{6,12}$/;
  isValidPWD = passwordRegexr.test(formElement.querySelector('[id$="-password"]').value);

  formElement.querySelector('.error').innerHTML = isValidPWD ? '' : '영문 또는 숫자를 6~12자 입력해 주세요.';
  formElement.querySelector('.icon-error').classList.toggle('hidden', isValidPWD);
  formElement.querySelector('.icon-success').classList.toggle('hidden', !isValidPWD);
  toggleSubmitBtn();
}

function checkIsValidName(formElement) {
  const nameRegexr = /^[A-Za-z가-힣]+$/;
  isValidName = nameRegexr.test(formElement.querySelector('[id$="-name"]').value);

  formElement.querySelector('.error').innerHTML = isValidName ? '' : '올바른 형식의 이름을 입력해 주세요.';
  formElement.querySelector('.icon-error').classList.toggle('hidden', isValidName);
  formElement.querySelector('.icon-success').classList.toggle('hidden', !isValidName);

  toggleSignupBtn();
}

function checkIsSamePWD(formElement) {
  isSamePassword =
    formElement.previousElementSibling.querySelector('[id$="-password"]').value ===
    formElement.querySelector('[id$="-password"]').value;
  formElement.querySelector('.error').innerHTML = isSamePassword ? '' : '패스워드가 일치하지 않습니다.';
  formElement.querySelector('.icon-error').classList.toggle('hidden', isSamePassword);
  formElement.querySelector('.icon-success').classList.toggle('hidden', !isSamePassword);

  toggleSignupBtn();
}

$signinUserId.addEventListener(
  'keyup',
  _.debounce(() => checkIsValidID([...document.querySelectorAll('.form.signin .input-container')][0]), 200)
);

$signupUserId.addEventListener(
  'keyup',
  _.debounce(() => checkIsValidID([...document.querySelectorAll('.form.signup .input-container')][0]), 200)
);

$signinPassword.addEventListener(
  'keyup',
  _.debounce(() => checkIsValidPWD([...document.querySelectorAll('.form.signin .input-container')][1]), 200)
);

$signupPassword.addEventListener(
  'keyup',
  _.debounce(() => {
    checkIsValidPWD([...document.querySelectorAll('.form.signup .input-container')][2]);
    checkIsSamePWD([...document.querySelectorAll('.form.signup .input-container')][3]);
  }, 200)
);

$signupName.addEventListener(
  'keyup',
  _.debounce(() => checkIsValidName([...document.querySelectorAll('.form.signup .input-container')][1]), 200)
);

$signupConfirmPassword.addEventListener(
  'keyup',
  _.debounce(() => checkIsSamePWD([...document.querySelectorAll('.form.signup .input-container')][3]), 200)
);

// setInterval(() => console.log(isValidID, isValidPWD), 1000);

const $newToast = document.createElement('div');
$newToast.className = `toast success hidden`;
$newToast.innerHTML = `
  <h4 class="toast-title">Well done!</h4>
  <div class="toast-message">
    <svg width="24" height="24">
      <use xlink:href=#success />
    </svg>
    <p></p>
  </div>
  <a class="toast-close">&times;</a>
  `;
document.querySelector('body').appendChild($newToast);
$newToast.style.bottom = 0;

document.querySelector('.signin button').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.toast').classList.remove('hidden');
  setTimeout(() => document.querySelector('.toast').classList.add('hidden'), 3000);

  document.querySelector('.toast p').innerHTML = 'Signin successfully';

  document
    .querySelector('.toast-close')
    .addEventListener('click', () => document.querySelector('.toast').classList.add('hidden'));
});

document.querySelector('.signup button').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.toast').classList.remove('hidden');
  setTimeout(() => document.querySelector('.toast').classList.add('hidden'), 3000);
  document.querySelector('.toast p').innerHTML = 'Signup successfully';

  document
    .querySelector('.toast-close')
    .addEventListener('click', () => document.querySelector('.toast').classList.add('hidden'));
});

function resetForm() {
  [...document.querySelectorAll('form')].forEach(form => form.reset());
  [...document.querySelectorAll('.icon')].forEach(icon => icon.classList.add('hidden'));
  [...document.querySelectorAll('.error')].forEach(errorMsg => {
    errorMsg.innerHTML = '';
  });
  document.querySelector('.button').setAttribute('disabled', '');
}

document.querySelector('.signin .link a').addEventListener('click', () => {
  document.querySelector('.form.signin').classList.add('hidden');
  document.querySelector('.form.signup').classList.remove('hidden');
  resetForm();
});

document.querySelector('.signup .link a').addEventListener('click', () => {
  document.querySelector('.form.signin').classList.remove('hidden');
  document.querySelector('.form.signup').classList.add('hidden');
  resetForm();
});
