const layerControlPanel = document.querySelector(".layer-control-panel")
const closeButton = layerControlPanel.querySelector('.header > .close-button ')

function hide() {
    layerControlPanel.parentElement.classList.remove('active')
}
function show() {
    layerControlPanel.parentElement.classList.add('active')
}

export default function initLayerControlPanel() {

    closeButton.addEventListener('click', hide)
    
    return {
        ref: layerControlPanel, hide, show
    }
}