var layerControlPanel,closeButton;

 

function hide() {
    layerControlPanel.parentElement.classList.remove('active')
}
function show() {
    layerControlPanel.parentElement.classList.add('active')
}

export default function initLayerControlPanel() {
    layerControlPanel = document.querySelector(".layer-control-panel")
    closeButton = layerControlPanel.querySelector('.header > .close-button ')

    closeButton.addEventListener('click', hide)

    return {
        ref: layerControlPanel, hide, show
    }
}