const Toaster = (() => ({
  makeNewToast(type) {
    // prettier-ignore
    const newToastInnerHTML = `
    <div class="toast success">
      <h4 class="toast-title">Well done!</h4>
      <div class="toast-message">
        <svg width="24" height="24">
          <use xlink:href=#success />
        </svg>
        <p>${type === "signin" ? "Signin" : "Signup"} successfully</p>
      </div>
      <a class="toast-close">&times;</a>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', newToastInnerHTML);

    const $newToast = document.body.lastElementChild;
    $newToast.style.bottom = 0;
    setTimeout(() => Toaster.removeToast($newToast), 3000);

    document.querySelector('.toast-close').addEventListener('click', () => Toaster.removeToast($newToast));
  },

  removeToast(toast) {
    document.body.removeChild(toast);
  },
}))();

export default Toaster;
