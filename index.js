const userName = document.getElementById("userName");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassWord = document.getElementById("confirmPassWord");
const form = document.querySelector("form");

const showError = (input, message) => {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  parent.classList.add("error");
  small.innerText = message;
};
// showError(userName, "Có lỗi xảy ra");
// showError(email, "Có lỗi xảy ra");
// showError(password, "Có lỗi xảy ra");
// showError(confirmPassWord, "Có lỗi xảy ra");

const showSuccess = (input) => {
  const parent = input.parentElement;
  const small = parent.querySelector("small");
  parent.classList.remove("error");
  small.innerText = "";
};

function checkEmptyInput(listCheck) {
  let isEmptyError = false;
  listCheck.map((input) => {
    input.value = input.value.trim();
    if (!input.value) {
      isEmptyError = true;
      showError(input, "Vui lòng nhập trường này");
    } else {
      showSuccess(input);
    }
    return isEmptyError;
  });
}

function checkEmailInput(input) {
  let isEmailError = false;
  const regex =
    /^("(?:[!#-\[\]-\u{10FFFF}]|\\[\t -\u{10FFFF}])*"|[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*)@([!#-'*+\-/-9=?A-Z\^-\u{10FFFF}](?:\.?[!#-'*+\-/-9=?A-Z\^-\u{10FFFF}])*|\[[!-Z\^-\u{10FFFF}]*\])$/;

  input.value = input.value.trim();

  if (regex.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, "Email error");
  }
  return isEmailError;
}

function checkLengthInputError(input, min, max) {
  input.value = input.value.trim();
  if (input.value.length < min) {
    showError(input, `Vui lòng nhập ít nhất ${min} ký tự`);
    return true;
  } else if (input.value.length > max) {
    showError(input, `Vui lòng nhập tối đa ${max} ký tự`);
    return true;
  }
  return false;
}

function checkConfirmPasswood(passwordInput, cfPasswordInput) {
  if (passwordInput.value !== cfPasswordInput.value) {
    showError(cfPasswordInput, "Mật khẩu không trùng khớp");
    return true;
  }
  return false;
}

form.addEventListener("submit", function () {
  isEmptyError = checkEmptyInput([userName, email, password, confirmPassWord]);
  isEmailError = checkEmailInput(email);
  const isUserNameLengthError = checkLengthInputError(userName, 6, 10);
  const isPasswordLengthError = checkLengthInputError(password, 6, 10);
  const isConfirmPassword = checkConfirmPasswood(password, confirmPassWord);
});
