import Sortablejs from 'https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/+esm'
import {isMobile} from "./app.js"
var layerControlPanel = {
    mobileRef:null,
    desktopRef:null
}


function hide() {
    const layerControlPanelRef = isMobile ? layerControlPanel.mobileRef : layerControlPanel.desktopRef 
    layerControlPanelRef.parentElement.classList.remove('active')
}
function show() {
    const layerControlPanelRef = isMobile ? layerControlPanel.mobileRef : layerControlPanel.desktopRef 
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
function initRightButtonsWrapper(){

}
function enableDragAndDrop(layerControlPanelRef){
    const layerImagesWrapper = layerControlPanelRef.querySelector(".layer-images-wrapper")
   new Sortablejs(layerImagesWrapper, {
    handle: ".right-buttons-wrapper > .move-button",
    draggable: ".layer-image",
    animation: 300,
    ghostClass: 'sortable-ghost',
  });
}

export default function initLayerControlPanel() {
    const mobileRef =  document.querySelector(".layer-control-panel[data-mobile='true']")
    const desktopRef = document.querySelector(".layer-control-panel[data-mobile='false']")
    layerControlPanel = {mobileRef,desktopRef}
   
    const showFullContainerButton = desktopRef.parentElement.querySelector(".show-full-container-button")
   const closeButton = mobileRef.querySelector('.header > .close-button ')
   
    showFullContainerButton.addEventListener('click', toggle)
    closeButton.addEventListener('click', hide)
    
    enableDragAndDrop(mobileRef)
    enableDragAndDrop(desktopRef)
    
    return {
        layerControlPanel: layerControlPanel, hide, show
    }
}