class RangeSliderWithIndicator {
  #marksDistance;
  #minValue;
  #maxValue;
  #valueRange;
  #valueDivision;
  #runnableTrack;  
  #runnableTrackRect;
  #completedTrack;
  #thumb;
  #thumbHalfWidth;
  constructor(element) {
    this.ref = element
    this.element = element;
    this.element.value = parseInt(this.element.getAttribute('data-value')) || 0;
    this.#marksDistance = parseInt(this.element.getAttribute('data-marks-distance')) || 10;
    this.#minValue = parseInt(this.element.getAttribute('data-min')) || 0;
    this.#maxValue = parseInt(this.element.getAttribute('data-max')) || 100;
    this.#valueRange = this.#maxValue - this.#minValue;

      this.#initUI();
  }

  #initUI() {
      this.element.innerHTML = `
    <div class="indicator"></div>
    <div class="slider">
      <div class="runnable-track">
        <div class="completed-track"></div>
        <div class="thumb"></div>
      </div>
    </div>
  `;
      this.#runnableTrack = this.element.querySelector('.slider > .runnable-track');
      this.#runnableTrackRect = this.#runnableTrack.getBoundingClientRect()
      this.#valueDivision = this.#runnableTrackRect.width / this.#valueRange;
      this.#completedTrack = this.#runnableTrack.querySelector('.completed-track');
      this.#thumb = this.#runnableTrack.querySelector('.thumb');
      this.#thumbHalfWidth = this.#thumb.getBoundingClientRect().width / 2;
      setInterval(() => {
          const { width, left } = this.#runnableTrack.getBoundingClientRect()
          if (this.#runnableTrackRect.width !== width || this.#runnableTrackRect.left !== left) {
              this.#initUI()
          }
      }, 1000)
      this.#setSliderControls();
      this.#setMarks();
  }

  #setSliderControls() {

 
    
      if (this.element.value === undefined) {
      this.element.value = this.#minValue;
      }
      let startX = 0;
      const initialCompletedWidth = this.#valueDivision * (this.element.value - this.#minValue);
      this.#setCompletedWidth(initialCompletedWidth)
      const thumbPointerMoveHandler = (e) => {
          const movePx = e.clientX - startX;
          const completedWidth = Math.max(0, Math.min(movePx, this.#runnableTrackRect.width));
          const newValue = Math.max(this.#minValue, Math.min(this.#maxValue, Math.round(this.#minValue + (movePx / this.#valueDivision))));
          if (newValue !== this.element.value) {
              this.element.value = newValue;
              this.element.dispatchEvent(new Event('r-s-w-i-input'));
          }
        this.#setCompletedWidth(completedWidth)
      };

      const thumbPointerUpHandler = (e) => {
          this.element.dispatchEvent(new Event('r-s-w-i-change'));
          document.removeEventListener('pointermove', thumbPointerMoveHandler);
          document.removeEventListener('pointerup', thumbPointerUpHandler);
      };

      this.#runnableTrack.addEventListener('pointerdown', (e) => {        
          const completedWidth = e.clientX - this.#runnableTrackRect.left;
          const newValue = Math.max(this.#minValue, Math.min(this.#maxValue, Math.round(this.#minValue + (completedWidth / this.#valueDivision))));
          if (newValue !== this.element.value) {
              this.element.value = newValue;
              this.element.dispatchEvent(new Event('r-s-w-i-input'));
          }
          this.#thumb.style.left = `${completedWidth - this.#thumbHalfWidth}px`;
          this.#completedTrack.style.width = `${completedWidth}px`;
          const { width } = this.#completedTrack.getBoundingClientRect();
          startX = (e.clientX - width);
          document.addEventListener('pointermove', thumbPointerMoveHandler);
          document.addEventListener('pointerup', thumbPointerUpHandler);
      });

      this.#thumb.ondragstart = (e) => e.preventDefault();
  }

  #setMarks() {

      const indicator = this.element.querySelector('.indicator');
      const marksTextArray = this.#getMarksText();

      for (let i = 0; i < marksTextArray.length; i++) {
          const marksText = document.createElement('div');
          const marksStop = document.createElement('div');
          marksText.classList.add('marks-text');
          marksText.innerText = marksTextArray[i]
          marksStop.classList.add('marks-stop');
          indicator.append(marksText, marksStop);
          const leftPx = (marksTextArray[i] - this.#minValue) * (this.#runnableTrackRect.width / this.#valueRange)
          const { width } = marksText.getBoundingClientRect()
          marksText.style.left = `${leftPx - width / 2}px`;
          marksStop.style.left = `${leftPx}px`;

      }
  }

  #getMarksText() {
      const marksTextArray = [];
      for (let i = this.#minValue; i <= this.#maxValue; i += this.#marksDistance) {
          marksTextArray.push(i);
      }
      return marksTextArray;
  }
  #setCompletedWidth(px){
    this.#thumb.style.left = `${px - this.#thumbHalfWidth}px`;
    this.#completedTrack.style.width = `${px}px`;
  }
  on(eventName,handler){
    this.element.addEventListener(`r-s-w-i-${eventName}`, handler);
  }
  setValue(value){
   this.#setCompletedWidth((value - this.#minValue) * this.#valueDivision)
    this.element.value = value
  }
}



