function initDesktop(rangeInput,straightenControlPanelRef,rangeSliderWithIndicator,contentTab) {
  const valueInput = straightenControlPanelRef.querySelector(
    ".desktop-header > input[type='number']"
  );
  const applyButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .apply-button'
  );
  const cancelButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .cancel-button'
  );
  // value input handlers
  valueInput.onclick = () => {
    valueInput.removeAttribute('readonly');
  };
  valueInput.oninput = (e) => {
    const value = Number(valueInput.value);
    rangeSliderWithIndicator.setValue(Math.max(-45, Math.min(value, 45)));
    if (!contentTab.classList.contains('updated'))
      contentTab.classList.add('updated');
  };
  valueInput.onblur = () => {
    const value = Number(valueInput.value);
    valueInput.value = Math.max(-45, Math.min(value, 45));
    valueInput.setAttribute('readonly', 'true');
  };
  //range input handlers
  rangeSliderWithIndicator.on('input', () => {
    valueInput.value = rangeInput.value;
  });


  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    valueInput.value = 0;
    rangeSliderWithIndicator.setValue(0);
    contentTab.classList.remove('updated');
  });
}

export default function initRotateContentTab(contentTab, toolbar) {
  const straightenControlPanelRef = contentTab.querySelector(
    '.straighten-control-panel'
  );
  const valueElementRef =
    straightenControlPanelRef.querySelector('.header > .value');
  const rangeInput = straightenControlPanelRef.querySelector(
    '.range-wrapper > .input'
  );
  const rangeSliderWithIndicator = new RangeSliderWithIndicator(rangeInput);
  const applyButton = contentTab.querySelector('.secondary > .apply-button');
  const cancelButton = contentTab.querySelector('.secondary > .cancel-button');
  // range input handlers

  rangeSliderWithIndicator.on('input', (e) => {
    valueElementRef.textContent = e.target.value;
  });
  rangeSliderWithIndicator.on('change', () => {
    contentTab.classList.add('updated');
  });
  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    valueElementRef.textContent = 0;
    rangeInput.value = 0;
    contentTab.classList.remove('active');
      contentTab.classList.remove('updated');
    toolbar.parentElement.style.display = 'unset';
  });
  initDesktop(rangeInput,straightenControlPanelRef,rangeSliderWithIndicator,contentTab);
  
}
