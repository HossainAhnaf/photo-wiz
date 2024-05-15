import {isMobile} from "./app.js"
var layerControlPanel = {
    mobile:null,
    desktop:null
}


function hide() {
    const layerControlPanelRef = isMobile ? layerControlPanel.mobile : layerControlPanel.desktop 
    layerControlPanelRef.parentElement.classList.remove('active')
}
function show() {
    const layerControlPanelRef = isMobile ? layerControlPanel.mobile : layerControlPanel.desktop 
    layerControlPanelRef.parentElement.classList.add('active')
}
function toggle({currentTarget}){
    console.log(currentTarget);
  if (currentTarget.classList.contains("active")){
   currentTarget.classList.remove("active")
   hide()
  }else{
    currentTarget.classList.add("active")
    show()
  }

}
export default function initLayerControlPanel() {
    layerControlPanel.mobile = document.querySelector(".layer-control-panel[data-mobile='true']")
    layerControlPanel.desktop = document.querySelector(".layer-control-panel[data-mobile='false']")
   
    const showFullContainerButton = layerControlPanel.desktop.parentElement.querySelector(".show-full-container-button")
   const closeButton = layerControlPanel.mobile.querySelector('.header > .close-button ')
   
    showFullContainerButton.addEventListener('click', toggle)
    closeButton.addEventListener('click', hide)

    return {
        layerControlPanel: layerControlPanel, hide, show
    }
}