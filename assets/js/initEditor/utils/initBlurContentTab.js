
function initDesktop(blurTypeSelectButtons,desktopBlurTypeSelectButtons,contentTab) {
  const valueInput = contentTab.querySelector(
    ".desktop > .blur-control-panel > .value-wrapper > .value > input[type='text']"
  );
  const rangeInput = contentTab.querySelector(
    ".desktop > .blur-control-panel > .range-wrapper > input[type='range']"
  );
  const applyButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .apply-button'
  );
  const cancelButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .cancel-button'
  );

  //select blur type handler
  desktopBlurTypeSelectButtons.forEach((button, index) => {
    button.addEventListener('click', (e) => {
      desktopBlurTypeSelectButtons.forEach((btn) =>
        btn.classList.remove('active')
      );
      button.classList.add('active');
      blurTypeSelectButtons[index].click();
    });
  });
  // value input handlers
  valueInput.onclick = () => {
    valueInput.parentElement.classList.remove('readonly');
  };
  valueInput.onkeydown = (e) => {
    if (/^[a-zA-Z]$/.test(e.key)) e.preventDefault();
  };

  valueInput.oninput = (e) => {
    rangeInput.value = Math.min(Number(valueInput.value), 100);
    if (!contentTab.classList.contains('updated'))
      contentTab.classList.add('updated');
  };
  valueInput.onblur = () => {
    const validValue = Math.min(Number(valueInput.value), 100);
    valueInput.value = validValue;
    valueInput.parentElement.classList.add('readonly');
  };
  // range input handlers
  rangeInput.oninput = () => {
    valueInput.value = rangeInput.value;
  };
  rangeInput.onchange = () => {
    if (!contentTab.classList.contains('updated'))
      contentTab.classList.add('updated');
  };
  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    valueInput.value = '0';
    rangeInput.value = '0';
    contentTab.classList.remove('updated');
  });
}

export default function initBlurContentTab(contentTab, toolbar) {
  const valueElementRef = contentTab.querySelector(
    '.primary > .blur-control-panel > .value-wrapper > .value'
  );
  const rangeInput = contentTab.querySelector(
    ".primary > .blur-control-panel > .range-wrapper > input[type='range']"
  );
  const blurTypeSelectButtons = Array.from(
    contentTab.querySelectorAll('.primary > .blur-type-select > button')
  );
  const desktopBlurTypeSelectButtons = Array.from(
    contentTab.querySelectorAll('.desktop > .blur-type-select > button')
  );
  const applyButton = contentTab.querySelector('.secondary > .apply-button');
  const cancelButton = contentTab.querySelector('.secondary > .cancel-button');
  //select blur type handler
  blurTypeSelectButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const previousActiveButton = blurTypeSelectButtons.find((btn) =>
        btn.classList.contains('active')
      );
      previousActiveButton.classList.remove('active');
      button.classList.add('active');
      desktopBlurTypeSelectButtons[index].click();
    });
  });
  // range input handlers
  rangeInput.oninput = () => {
    valueElementRef.textContent = rangeInput.value;
  };

  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    valueElementRef.textContent = 0;
    rangeInput.value = 0;
    contentTab.classList.remove('active');
    toolbar.parentElement.style.display = 'unset';
  });
  
  initDesktop(blurTypeSelectButtons,desktopBlurTypeSelectButtons,contentTab);
}
