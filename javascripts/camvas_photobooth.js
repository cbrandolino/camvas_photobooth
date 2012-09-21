var FM = {
  apply: function(canvas, outputCtx, hiddenCtx, filters) {
    if (filters.perPixel) 
      FM.applyPerPx(canvas, outputCtx, hiddenCtx, filters.perPixel)
  },
  applyPerPx: function(canvas, outputCtx, hiddenCtx, filter) {
    var imageData = hiddenCtx.getImageData(0, 0, canvas.width, canvas.height)
    var pixels = imageData.data
    for (var i = 0, n = pixels.length; i <= n; i += 4) {
      var filtered = FM[filter](pixels[i], pixels[i+1], pixels[i+2], pixels[i+3])
      pixels[i] = filtered[0]
      pixels[i+1] = filtered[1]
      pixels[i+2] = filtered[2] 
      if (filtered[3])
        pixels[i+3] = filtered[3]
    }
    imageData.data = pixels
    outputCtx.putImageData(imageData, 0, 0)
  },
  cheapGreyScale: function(r,g,b) {
    var result = (r+g+b) / 3
    return [250,result,result]
  }
}



window.onload = function(){
  var canvas = document.getElementById('output-canvas')
  var outputCtx = canvas.getContext('2d')
  var hiddenCtx = document.getElementById('process-canvas').getContext('2d')
  var draw = function(video, dt) {
    hiddenCtx.drawImage(video, 0, 0)
    var filters = {perPixel: 'cheapGreyScale'}
    var filteredImageData = FM.apply(canvas, outputCtx, hiddenCtx, filters)
  }
  var myCamvas = new camvas(outputCtx, draw)
}
