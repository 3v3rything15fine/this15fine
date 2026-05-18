// Simple per-section timer logic for MVP
let timers = []
let activeSlideIndex = 0
function setTimers() {
  // Simple: read data-timer attributes if needed
  const secs = 0
  timers = []
}
function startTimer(seconds, onEnd){
  if(!seconds || seconds<=0){ onEnd(); return; }
  let t = setTimeout(onEnd, seconds*1000)
  return t
}
// Hook into Reveal.js slidechanged to enforce click-to-advance after timer
Reveal.on('slidechanged', function(event){
  const index = event.indexh
  const slide = document.querySelectorAll('.slides section')[index]
  const dt = slide?.getAttribute('data-timer')
  if(dt){
    const sec = parseInt(dt,10)
    if(!isNaN(sec) && sec>0){
      // Show a manual advance notice and wait for click
      const btn = document.createElement('button')
      btn.textContent = 'Continue after timer'
      btn.style.position = 'fixed'
      btn.style.bottom = '20px'
      btn.style.right = '20px'
      btn.onclick = ()=>{ btn.remove(); Reveal.next(); }
      document.body.appendChild(btn)
      // start timer in background
      startTimer(sec, ()=>{ /* allow manual advance via button */ })
    }
  }
})
