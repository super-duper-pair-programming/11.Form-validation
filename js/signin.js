import Toaster from './toaster.js';

const $signupPWD = document.querySelector('#signup-password');
const $signupConfirmPWD = document.querySelector('#signup-confirm-password');

const STATE = {
  currentPage: 'signin',
  isValid: { userid: false, password: false, name: false, samepassword: false },
};

const VALIDATION_DATA = {
  regExp: {
    userid: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
    password: /^[A-Za-z0-9]{6,12}$/,
    name: /^[A-Za-z가-힣]+$/,
  },
  errorMsg: {
    userid: '이메일 형식에 맞게 입력해 주세요.',
    password: '영문 또는 숫자를 6~12자 입력해 주세요.',
    name: '올바른 형식의 이름을 입력해 주세요.',
    samepassword: '패스워드가 일치하지 않습니다.',
  },
};

// prettier-ignore
const toggleSubmitBtn = () =>
  document.querySelector(`.${STATE.currentPage}.button`).toggleAttribute('disabled',
    !(STATE.isValid.userid && STATE.isValid.password &&
      (STATE.currentPage === 'signin' || (STATE.isValid.name && STATE.isValid.samepassword)))
  );

const renderCheckResult = (container, type) => {
  container.querySelector('.error').textContent = STATE.isValid[type] ? '' : VALIDATION_DATA.errorMsg[type];
  container.querySelector('.icon-error').classList.toggle('hidden', STATE.isValid[type]);
  container.querySelector('.icon-success').classList.toggle('hidden', !STATE.isValid[type]);

  toggleSubmitBtn();
};

const checkIsValid = (container, type) => {
  STATE.isValid[type] = VALIDATION_DATA.regExp[type].test(container.querySelector(`[id$="-${type}"]`).value);
  renderCheckResult(container, type);
};

const checkIsSamePWD = () => {
  if ($signupConfirmPWD.value === '') return;
  STATE.isValid.samepassword = $signupPWD.value === $signupConfirmPWD.value;
  renderCheckResult($signupConfirmPWD.parentNode, 'samepassword');
};

const resetForm = () => {
  document.querySelector(`.form.${STATE.currentPage}`).reset();
  [...document.querySelectorAll(`.${STATE.currentPage} .icon`)].forEach(icon => icon.classList.add('hidden'));
  [...document.querySelectorAll(`.${STATE.currentPage} .error`)].forEach(errorMsg => {
    errorMsg.textContent = '';
  });
  document.querySelector(`.${STATE.currentPage}.button`).setAttribute('disabled', '');
};

const printInputData = () =>
  console.log(
    [...document.querySelectorAll(`.${STATE.currentPage} input`)].map(input => `${input.id}: ${input.value}`).join('\n')
  );

document.body.addEventListener(
  'keyup',
  _.debounce(e => {
    if (e.target.matches(`[id$="-userid"]`)) checkIsValid(e.target.parentNode, 'userid');
    if (e.target.matches(`[id$="-name"]`)) checkIsValid(e.target.parentNode, 'name');
    if (e.target.matches(`[id$="confirm-password"]`)) checkIsSamePWD();
    else if (e.target.matches(`[id$="-password"]`)) {
      checkIsValid(e.target.parentNode, 'password');
      checkIsSamePWD();
    }
  }, 200)
);

document.body.addEventListener('submit', e => {
  e.preventDefault();
  printInputData();
  Toaster.makeNewToast(e.target.classList[1]);
});

document.body.addEventListener('click', e => {
  if (!e.target.matches('.link a')) return;
  document.querySelector(`.form.${STATE.currentPage}`).classList.add('hidden');
  resetForm();
  STATE.currentPage = STATE.currentPage === 'signin' ? 'signup' : 'signin';
  document.querySelector(`.form.${STATE.currentPage}`).classList.remove('hidden');
});
