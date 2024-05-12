import initEditor from "./initEditor/index.js"
import initTopToolbar from "./initTopToolbar.js";
export var isMobile = window.innerWidth < 750;
export var isCanvasBlank = true;
var topToolbar;
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
      topToolbar.setVisibility();
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
    topToolbar.setVisibility();
  }
}



window.addEventListener('resize', () => {
  isMobile = window.innerWidth < 750;
  topToolbar.setVisibility();
});

window.addEventListener('load', () => {
  initOpenImageLabel();
  initEditor();
  topToolbar = initTopToolbar() 
});
