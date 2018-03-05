const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')


function getVideo() {
  navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
  })
  .then(localStreamMedia => {
    video.src = window.URL.createObjectURL(localStreamMedia)
    video.play()
  })
}

getVideo()

const frames = []

function painToCanvas() {
  const width = video.videoWidth
  const height = video.videoHeight

  canvas.width = width
  canvas.height = height


  setInterval(() => {
  
    ctx.drawImage(video, 0, 0, width, height)
    let imageData = ctx.getImageData(0, 0, width, height)
    frames.push(imageData)
    frames.splice(-6, frames.length - 5)
    ctx.globalAlpha = 0.2
    // ctx.globalCompositeOperation = 'difference'

    const pixels = frames[0].data

    // for (let i = 0; i < pixels.length; i+=4) {
    //     pixels[i] = pixels[i] + 200
    //     pixels[i + 1] = pixels[i + 1] - 200
    //     pixels[i + 2] = pixels[i + 2] - 100
    //     pixels[i + 3] = pixels[i + 3] * 0.1
    // }
    
    ctx.putImageData(frames[0], 0, 0)
    ctx.putImageData(imageData, 0, 0)
    // ctx.drawImage(video, 0, 0, width, height)
  }, 100)



}

video.addEventListener('canplay', painToCanvas)