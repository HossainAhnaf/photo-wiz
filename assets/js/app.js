import initEditor from "./initEditor/index.js"
export let isMobile = window.innerWidth < 750;
export let isCanvasBlank = true;

function setTopToolbarVisibility() {
  const topToolbarSelector = isMobile
    ? '.mobile-top-toolbar'
    : '.desktop-top-toolbar';
  const topToolbar = document.querySelector(topToolbarSelector);
  if (isCanvasBlank) {
    topToolbar.classList.remove('active');
  } else {
    topToolbar.classList.add('active');
  }
}

function initOpenImageLabel() {
  const openImageLabel = document.querySelector('.open-image-label');
  const canvas = document.getElementById('canvas');

  openImageLabel.addEventListener('drop', handleDrop);
  openImageLabel.addEventListener('dragover', handleDragOver);
  openImageLabel.addEventListener('dragleave', handleDragLeave);

  openImageLabel
    .querySelector('.open-image-input')
    .addEventListener('change', (e) => {
      canvas.classList.add('active');
      isCanvasBlank = false;
      setTopToolbarVisibility();
    });

  function handleDragOver(e) {
    e.preventDefault();
    openImageLabel.classList.add('dragover');
  }

  function handleDragLeave(e) {
    if (!openImageLabel.contains(e.relatedTarget)) {
      openImageLabel.classList.remove('dragover');
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    openImageLabel.classList.remove('dragover');
    const droppedFiles = Array.from(e.dataTransfer.files);
    canvas.classList.add('active');
    isCanvasBlank = false;
    setTopToolbarVisibility();
  }
}



window.addEventListener('resize', () => {
  isMobile = window.innerWidth < 750;
  setTopToolbarVisibility();
});

window.addEventListener('load', () => {
  initOpenImageLabel();
  initEditor();
});
