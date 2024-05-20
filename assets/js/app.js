try {}catch(e) {
  alert(e)
}
import initEditor from "./initEditor/index.js"
import initLayerControlPanel from "./initLayerControlPanel.js";
import initTopToolbar from "./initTopToolbar.js";
export var isMobile = window.innerWidth < 750;
export var isCanvasBlank = true;
export var layerControlPanel = null;
var topToolbar = null;
var canvas = null;

function initOpenImageLabel() {
  const openImageLabel = document.querySelector('.open-image-label');
  const canvasElm = document.getElementById('canvas');

  openImageLabel.addEventListener('drop', handleDrop);
  openImageLabel.addEventListener('dragover', handleDragOver);
  openImageLabel.addEventListener('dragleave', handleDragLeave);

  openImageLabel
  .querySelector('.open-image-input')
  .addEventListener('change', (e) => {
    canvasElm.classList.add('active');
    isCanvasBlank = false;
    topToolbar.setVisibility();
    const file = e.target.files[0]
    if (file) {
      canvas = new fabric.Canvas("canvas")
      /*
      const {
        width,
        height
      } = window.getComputedStyle(canvasElm.parentElement)
      */
      canvas.setWidth(window.innerWidth - 40)
      canvas.setHeight(window.innerHeight / 1.8)
      canvasElm.style.left = '20px'
      openImageLabel.style.display = 'none'

      const fileReader = new FileReader()
      fileReader.readAsDataURL(file)
      fileReader.onload = (e)=> {
        var imgElement = new Image()
        imgElement.src = fileReader.result
        imgElement.onload = () => {
          var imgInstance = new fabric.Image(imgElement, {
            width: canvas.width,
            height: canvas.height,
          });
          canvas.add(imgInstance);
        }
      }
      /*          if (imgInstance.width > canvas.width) {
            const scale = (imgInstance.width - canvas.width) / 1
            imgInstance.scaleToWidth(50, false)
          }*/

    }
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
    canvasElm.classList.add('active');
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
  layerControlPanel = initLayerControlPanel()
  topToolbar = initTopToolbar()

});