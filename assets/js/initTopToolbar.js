import {isCanvasBlank,isMobile,layerControlPanel} from "./app.js"

function changeCanvasImage(file){
 const fileReader = new FileReader()
 fileReader.readAsDataURL(file)
 fileReader.onload = (e)=>{
  const src = e.target.result
}
}

function changeImageButtonClickHandler (){
  const fileInput = document.createElement("input")
  fileInput.type = "file"
  fileInput.accept = "image/*"
  fileInput.hidden = true
  document.body.appendChild(fileInput)
  fileInput.click()
  fileInput.onchange = ()=> changeCanvasImage(fileInput.files[0])

}
function layerButtonClickHandler(){
 layerControlPanel.show()
}
export default function initTopToolbar(){
    const mobileTopToolbar = document.querySelector(".app > .main > .mobile-top-toolbar ")
    const changeImageButton = mobileTopToolbar.querySelector(".change-image-button")
    const layerButton = mobileTopToolbar.querySelector(".layer-button")
    const downloadButton = mobileTopToolbar.querySelector(".download-button")
    
    changeImageButton.addEventListener('click',changeImageButtonClickHandler)
    layerButton.addEventListener('click',layerButtonClickHandler)
    function setVisibility() {
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
   return {setVisibility}   
}