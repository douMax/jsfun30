

const synth = window.speechSynthesis
const shijus = Array.from(document.querySelectorAll('.shiju'))
const title = document.querySelector('.title')
const footer = document.querySelector('.footer')
const startingLine = title.getBoundingClientRect().bottom

shijuBase = shijus.map(s => {
  

})

shijus.forEach(s => s.style.color = `hsl(${randy(360)}, 60%, 80%)`)

function getVoice(lang) {
  const voices = synth.getVoices()
  return voices.filter(v => v.lang === lang)[0]
}

function randy(max, min = 0) {
  return Math.floor(Math.random() * (max - min)) + min
}

function yingshi(shiju) {
  let utterThis = new SpeechSynthesisUtterance(shiju)
  utterThis.voice = getVoice('zh-CN')
  // console.log(utterThis.voice.name)
  synth.speak(utterThis)
}

function mapTo(num, in_min, in_max, out_min, out_max) {
  return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
}

function shijuReveal() {
  
  console.log("starting:", startingLine)
 
  shijus.map(s => {
    const sCoords = s.getBoundingClientRect()
    const sTop = sCoords.top
    const num = startingLine - sTop
    // console.log(s.innerText, num)
    const op = mapTo(num, 0, sCoords.height, 0, 1)
    s.style.opacity = op

    const sBottom = sCoords.bottom
    // console.log(sBottom)
    if ( Math.abs(sTop + sCoords.height / 2 - startingLine) < 1.5 ) {
      // console.log(s.innerText)
      yingshi(s.innerText)
    } 

  })
}

window.addEventListener('scroll', shijuReveal)
footer.addEventListener('click', () => document.documentElement.scrollTop = 0)

