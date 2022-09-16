const singinUserId = document.querySelector('#signin-userid');
const signinPassword = document.querySelector('#signin-password');

let [isValidID, isValidPWD] = [false, false];

function toggleSubmitBtn() {
  if (isValidID && isValidPWD) document.querySelector('.signin button').removeAttribute('disabled');
  else document.querySelector('.signin button').setAttribute('disabled', '');
}

singinUserId.addEventListener(
  'keyup',
  _.debounce(() => {
    const emailRegexr = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
    isValidID = emailRegexr.test(singinUserId.value);

    document.querySelector('#signin-userid ~ .error').innerHTML = isValidID ? '' : '이메일 형식에 맞게 입력해 주세요.';
    document.querySelector('#signin-userid ~ .icon-error').classList.toggle('hidden', isValidID);
    document.querySelector('#signin-userid ~ .icon-success').classList.toggle('hidden', !isValidID);
    toggleSubmitBtn();
  }, 200)
);

signinPassword.addEventListener(
  'keyup',
  _.debounce(() => {
    const passwordRegexr = /^[A-Za-z0-9]{6,12}$/;
    isValidPWD = passwordRegexr.test(signinPassword.value);

    document.querySelector('#signin-password ~ .error').innerHTML = isValidPWD
      ? ''
      : '영문 또는 숫자를 6~12자 입력해 주세요.';
    document.querySelector('#signin-password ~ .icon-error').classList.toggle('hidden', isValidPWD);
    document.querySelector('#signin-password ~ .icon-success').classList.toggle('hidden', !isValidPWD);
    toggleSubmitBtn();
  }, 200)
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
    <p>Signin Successfully</p>
  </div>
  <a class="toast-close">&times;</a>
  `;
document.querySelector('body').appendChild($newToast);
$newToast.style.bottom = 0;

document.querySelector('.signin button').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.toast').classList.remove('hidden');
  setTimeout(() => document.querySelector('.toast').classList.add('hidden'), 3000);

  document
    .querySelector('.toast-close')
    .addEventListener('click', () => document.querySelector('.toast').classList.add('hidden'));
});

console.log(document.querySelector('.signin .link a'));

document.querySelector('.signin .link a').addEventListener('click', e => {
  console.log(e.target);
  document.querySelector('.form signin').classList.add('hidden');
  document.querySelector('.form signup').classList.remove('hidden');
});
