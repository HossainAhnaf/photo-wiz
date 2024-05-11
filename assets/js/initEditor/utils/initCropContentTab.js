import initMobileCustomSizePopup from "./initMobileCustomSizePopup.js"

function hideCropErrorEffect(input, messageElm) {
  input.classList.remove('invalid');
  messageElm.innerHTML = '&nbsp;';
}
function cropSizeChangeHandler(cropWidth, cropHeight,customSizeButton) {
customSizeButton.querySelector('.value').textContent = `${cropWidth} x ${cropHeight}`;
}
function swapButtonClickHandler(widthInput, heightInput) {
  const temp = widthInput.value;
  widthInput.value = heightInput.value;
  heightInput.value = temp;
}
  // function to validate input
 const inputValidHandler =  function () {
  const maxWidth = 1920;
  const maxHeight = 1080;
  const minWH = 20;
  let hideCropErrorEffectTimeOut = null;
 return (input, messageElm, newValue, isWidthInput)=>{
    const maxValue = isWidthInput ? maxWidth : maxHeight;
    if (newValue < minWH || newValue > maxValue) {
      const isSmallerSize = newValue < minWH;
      input.value = isSmallerSize ? minWH : maxValue;
      input.classList.add('invalid');
      messageElm.textContent = isSmallerSize
        ? `Size can not be smaller than ${minWH} x ${minWH}`
        : `Size can not exceed ${maxWidth} x ${maxHeight}`;
      if (hideCropErrorEffectTimeOut) clearTimeout(hideCropErrorEffectTimeOut);
      hideCropErrorEffectTimeOut = setTimeout(
        () => hideCropErrorEffect(input, messageElm),
        2000
      );
    }
  }
  }()
  

function initDesktopCustomSize(contentTab) {
  const sizeFieldsWrapper = contentTab.querySelector(
    '.desktop-custom-size-controler > .primary'
  );
  const swapButton = contentTab.querySelector(
    '.desktop-custom-size-controler > .primary > .swap-button'
  );
  const messageElm = contentTab.querySelector(
    '.desktop-custom-size-controler > .message'
  );
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
  swapButton.addEventListener('click', () =>
    swapButtonClickHandler(...sizeFieldsWrapper.querySelectorAll('input'))
  );
}

export default function initCropContentTab(contentTab, toolbar) {
  const cropSizeButtons = Array.from(
    contentTab.querySelectorAll(
      ':is(.crop-sizes-wrapper,.secondary-crop-sizes-wrapper) > button'
    )
  );
  const customSizeButton = contentTab.querySelector(
    '.secondary > .custom-size-button'
  );
  const applyButton = contentTab.querySelector('.secondary > .apply-button');
  const cancelButton = contentTab.querySelector('.secondary > .cancel-button');
  const { showPopup } = initMobileCustomSizePopup(
    inputValidHandler,
    hideCropErrorEffect,
    swapButtonClickHandler,
    (...args)=> cropSizeChangeHandler(...args,customSizeButton)
  );

  //custom size button click handler
  customSizeButton.addEventListener('click', showPopup);



  // crop size buttons click handler
  cropSizeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const previousActiveButton = cropSizeButtons.find((btn) =>
        btn.classList.contains('active')
      );
      previousActiveButton.classList.remove('active');
      btn.classList.add('active');
      const [aspectWidth, aspectHeight] = btn.value.split('x');
      console.log(aspectWidth, aspectHeight);
      //   cropSizeChangeHandler()
    });
  });

  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    //making starting active button again active
    contentTab.classList.remove('active');
    toolbar.parentElement.style.display = 'unset';
  });

  initDesktopCustomSize(contentTab);
 
}