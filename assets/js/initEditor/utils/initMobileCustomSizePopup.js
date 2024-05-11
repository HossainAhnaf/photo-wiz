

export default function initMobileCustomSizePopup(
  inputValidHandler,
  hideCropErrorEffect,
  swapButtonClickHandler,
  onApply
) {
  const mobileCustomSizePopup = document.querySelector(
    '.mobile-custom-crop-size-popup'
  );
  const sizeFieldsWrapper = mobileCustomSizePopup.querySelector(
    '.size-fields-wrapper'
  );
  const messageElm = mobileCustomSizePopup.querySelector('.message');
  const applyButton = mobileCustomSizePopup.querySelector('.apply-button');
  const cancelButton = mobileCustomSizePopup.querySelector('.cancel-button');
  let currentCropWidth = null;
  let currentCropHeight = null;

  // size fields input handling
  sizeFieldsWrapper.querySelectorAll('input').forEach((input) => {
    const isWidthInput = input.classList.contains('width-input');
    input.oninput = () => {
      inputValidHandler(input, messageElm, input.value, isWidthInput);
      if (isWidthInput) currentCropWidth = input.value;
      else currentCropHeight = input.value;
    };
    input.onblur = () => {
      if (input.classList.contains('invalid'))
        hideCropErrorEffect(input, messageElm);
    };
    //paste bug fix
    input.onpaste = (e) => {
      e.preventDefault();
      const pasteValue = Number(
        (e.clipboardData || window.clipboardData).getData('text')
      );
      if (pasteValue === 0 || pasteValue)
        inputValidHandler(input, pasteValue, isWidthInput);
      if (isWidthInput) currentCropWidth = input.value;
      else currentCropHeight = input.value;
    };
  });
  sizeFieldsWrapper
    .querySelector('.swap-button')
    .addEventListener('click', () => {
      swapButtonClickHandler(...sizeFieldsWrapper.querySelectorAll('input'));
    });
  // apply and cancel  button click handler
  applyButton.addEventListener('click', () => {
    if (onApply) onApply(currentCropWidth, currentCropHeight);
  });
  cancelButton.addEventListener('click', () => {
    mobileCustomSizePopup.parentElement.classList.remove('active');
  });
  return {
    mobileCustomSizePopup,
    showPopup: () =>
      mobileCustomSizePopup.parentElement.classList.add('active'),
  };
}
