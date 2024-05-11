function initTextEditorToolbar(){
  const toolbarOptions = [
    [{ 'font': [] },
    { 'size': ['small', false, 'large', 'huge'] },  
    'bold', 'italic', 'underline', 'strike',      
    { 'color': [] }, { 'background': [] },        
    { 'align': [] }],
  ];
  const textEditorToolbar = new Quill('.dummy-editor', {
  modules: {
   toolbar:toolbarOptions,
  },
  theme:"snow"
}); 
return textEditorToolbar.getModule("toolbar").container
}
function initDesktop(textEditorToolbar,addTextButton,contentTab, toolbar){
  const applyButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .apply-button'
  );
  const cancelButton = contentTab.querySelector(
    '.desktop-apply-cancel-buttons-wrapper > .cancel-button'
  );
      //apply and cancel handler
      cancelButton.addEventListener('click', () => {
        addTextButton.removeAttribute("disabled")
        addTextButton.classList.remove("active")
        textEditorToolbar.classList.remove("active")       
         contentTab.classList.remove('updated');
      });
}
    
export default function initTextContentTab(contentTab, toolbar){
  const textEditorToolbar = initTextEditorToolbar()
  const addTextButton = contentTab.querySelector(".secondary > .add-text-button")
  const applyButton = contentTab.querySelector(".secondary > .apply-button")
  const cancelButton = contentTab.querySelector(".secondary > .cancel-button")
  
  //add text button click handler
  addTextButton.addEventListener("click",()=>{
    addTextButton.setAttribute("disabled","true")
    addTextButton.classList.add("active")
    contentTab.classList.add("updated")
    textEditorToolbar.classList.add("active")
  })  
  //apply and cancel 
  cancelButton.addEventListener('click', () => {
    addTextButton.removeAttribute("disabled")
    addTextButton.classList.remove("active")
    textEditorToolbar.classList.remove("active")
    contentTab.classList.remove('active');
    contentTab.classList.remove("updated")
    toolbar.parentElement.style.display = 'unset';
  });

  initDesktop(textEditorToolbar,addTextButton,contentTab,toolbar)
}

