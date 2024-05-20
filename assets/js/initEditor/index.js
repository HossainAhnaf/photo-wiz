import {isMobile} from "../app.js" 

//utils
import initAdjustContentTab from "./utils/initAdjustContentTab.js"
import initCropContentTab from "./utils/initCropContentTab.js"
import initBlurContentTab from "./utils/initBlurContentTab.js"
import initRotateContentTab from "./utils/initRotateContentTab.js"
import initTextContentTab from "./utils/initTextContentTab.js"
export default function initEditor() {
  const editor = document.querySelector('.app .editor');
  const openContentButton = editor.querySelector('.show-full-container-button');
  const toolbar = document.querySelector('.app .editor .toolbar');
  const toolbarButtons = Array.from(toolbar.querySelectorAll('button'));
  const contentTabs = Array.from(editor.querySelectorAll('.content'));

  toolbarButtons.forEach((button) => {
    button.addEventListener('click', () => {
      //removing previous active button
      const previousActiveButton = toolbarButtons.find((b) =>
        b.classList.contains('active')
      );
      previousActiveButton?.classList.remove('active');
      //adding current active button
      button.classList.add('active');
      // closing toolbar if mobile
      if (isMobile) toolbar.parentElement.style.display = 'none';
      //  opening editor if desktop
      else editor.classList.add('active');
      openTab(button.getAttribute('name'));
    });
  });
  function openTab(tabName) {
    //closing previous tab
    const previousTab = contentTabs.find((tab) =>
      tab.classList.remove('active')
    );
    previousTab?.classList.remove('active');
    //opening new tab
    const currentTab = contentTabs.find(
      (tab) => tab.getAttribute('name') === tabName
    );
    currentTab?.classList.add('active');
  }

  //initialize all content tabs
  initAdjustContentTab(
    contentTabs.find((tab) => tab.getAttribute('name') === 'adjust'),
    toolbar
  );
  initCropContentTab(
    contentTabs.find((tab) => tab.getAttribute('name') === 'crop'),
    toolbar
  );
  initBlurContentTab(
    contentTabs.find((tab) => tab.getAttribute('name') === 'blur'),
    toolbar
  );
  initRotateContentTab(
    contentTabs.find((tab) => tab.getAttribute('name') === 'rotate'),
    toolbar
  );
  initTextContentTab(
    contentTabs.find((tab) => tab.getAttribute('name') === 'text'),
    toolbar
  );
  //
  openContentButton.addEventListener('click', () => {
    const activeContentTab = contentTabs.find((tab) =>
      tab.classList.contains('active')
    );
    if (activeContentTab) {
      editor.classList.toggle('active');
    } else toolbarButtons[0].click();
  });

  // Fixing resize bugs
  window.addEventListener('resize', () => {
    if (window.innerWidth < 750 && editor.classList.contains('active')) {
      editor.classList.remove('active');
      toolbar.parentElement.style.display = 'none';
    } else if (
      window.innerWidth > 750 &&
      !editor.classList.contains('active') &&
      contentTabs.find((tab) => tab.classList.contains('active'))
    ) {
      editor.classList.add('active');
      toolbar.parentElement.style.display = 'flex';
    }
  });
}