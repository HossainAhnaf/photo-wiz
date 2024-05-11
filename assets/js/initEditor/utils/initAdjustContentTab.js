function initFilter(filterRef,contentTab,adjustData){
  const adjustName = filterRef.getAttribute('data-adjust-name');
  const valueInput = filterRef.querySelector('.heading > .value-input');
  const rangeInput = filterRef.querySelector(
    ".range-wrapper > input[type='range']"
  );

  // value input handlers
  valueInput.onclick = () => {
    valueInput.removeAttribute('readonly');
  };
  valueInput.oninput = (e) => {
    const value = Number(valueInput.value);
    const validValue =
      value < 0 ? Math.max(value, -100) : Math.min(value, 100);
    rangeInput.value = validValue;
    if (!contentTab.classList.contains('updated'))
      contentTab.classList.add('updated');
  };
  valueInput.onblur = () => {
    const value = Number(valueInput.value);
    const validValue =
      value < 0 ? Math.max(value, -100) : Math.min(value, 100);
    valueInput.value = validValue;
    valueInput.setAttribute('readonly', 'true');
  };
  //range input handlers
  rangeInput.oninput = () => {
    valueInput.value = rangeInput.value;
  };
  rangeInput.onchange = () => {
    adjustData[adjustName] = rangeInput.value;
    if (!contentTab.classList.contains('updated'))
      contentTab.classList.add('updated');
  };
  //storing to array
 return {
   valueInput,
  rangeInput
 }
}

function initDesktop(contentTab,adjustData) {
  const valueInputsArray = [];
  const rangeInputsArray = [];
  const cancelButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .cancel-button'
  );

  contentTab.querySelectorAll('.desktop > .filter').forEach((filterRef) => {
  const {valueInput,rangeInput} = initFilter(filterRef,contentTab,adjustData)
  valueInputsArray.push(valueInput)
  rangeInputsArray.push(rangeInput)
  });
  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    for (const valueInput of valueInputsArray) {
      valueInput.value = 0;
    }
    for (const rangeInput of rangeInputsArray) {
      rangeInput.value = 0;
    }
    for (const key in adjustData) {
      adjustData[key] = '0';
    }
    contentTab.classList.remove('updated');
  });
}

export default function initAdjustContentTab(contentTab, toolbar) {
  const adjustData = {};
  const adjustButtons = [];
  let selectedAdjustName = '';

  const valueNameElementRef = contentTab.querySelector(
    '.primary > .selected-adjust-control-panel > .value-wrapper > .name'
  );
  const valueElementRef = contentTab.querySelector(
    '.primary > .selected-adjust-control-panel > .value-wrapper > .value'
  );
  const rangeInput = contentTab.querySelector(
    ".primary > .selected-adjust-control-panel > .range-wrapper > input[type='range']"
  );
  const applyButton = contentTab.querySelector('.secondary > .apply-button');
  const cancelButton = contentTab.querySelector('.secondary > .cancel-button');
  //storing the adjust button and data
  contentTab
    .querySelectorAll('.primary > .adjust-buttons-wrapper > button')
    .forEach((btn) => {
      const adjustName = btn.getAttribute('data-adjust-name');
      adjustData[adjustName] = btn.value;
      if (btn.classList.contains('active')) selectedAdjustName = adjustName;
      adjustButtons.push(btn);
    });
  // adjustButtons click handler
  adjustButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const previousActiveBtn = adjustButtons.find((btn) =>
        btn.classList.contains('active')
      );
      previousActiveBtn.classList.remove('active');
      btn.classList.add('active');
      selectedAdjustName = btn.getAttribute('data-adjust-name');
      valueNameElementRef.textContent =
        selectedAdjustName[0].toUpperCase() + selectedAdjustName.slice(1);
      valueElementRef.textContent = adjustData[selectedAdjustName];
      rangeInput.value = adjustData[selectedAdjustName];
    });
  });
  // range input handlers
  rangeInput.oninput = () => {
    valueElementRef.textContent = rangeInput.value;
  };
  rangeInput.onchange = () => {
    adjustData[selectedAdjustName] = rangeInput.value;
  };

  //apply and cancel handler
  cancelButton.addEventListener('click', () => {
    valueElementRef.textContent = 0;
    rangeInput.value = 0;
    for (const key in adjustData) {
      adjustData[key] = '0';
    }
    contentTab.classList.remove('active');
    toolbar.parentElement.style.display = 'unset';
  });

  initDesktop(contentTab,adjustData);

}