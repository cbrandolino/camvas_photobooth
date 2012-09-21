var FM = {
  pixLum: function(r,g,b) {
    return r*0.34 + g*0.5 + b*0.16
  },
  apply: function(canvas, outputCtx, hiddenCtx, filter) {
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
    var pixAvg = (r+g+b) / 3
    return [result, result, result]
  },
  niceGreyScale: function(r,g,b) {
    var pixLum = r*0.34 + g*0.5 + b*0.16
    return [pixLum, pixLum, pixLum]
  },
  invert: function(r,g,b) {
    return [255 - r, 255 - b, 255 - g]
  },
  cheapVignette: function(r,g,b) {
    if (FM.pixLum(r,g,b) < 50)
      return [0,0,0]
    else
      return [r,g,b]
  },
  nouvelleVagueBillboard: function(r,g,b) {
    var pixLum = FM.pixLum(r,g,b)
    if (pixLum < 50)
      return [0,0,0]
    if (pixLum < 100)
      return [80, 80, 80]
    if (pixLum < 150)
      return [130, 130, 130]
    if (pixLum < 200)
      return [180, 180, 180]
    else
      return [240, 240, 240]
  },
  bloodBath: function(r,g,b) {
    var pixLum = FM.pixLum(r,g,b)
    if (pixLum < 80)
      return [r+40, 0, 0]
    return [r+40,pixLum-5,pixLum-5]
  }
}



window.onload = function(){
  var canvas = document.getElementById('output-canvas')
  var outputCtx = canvas.getContext('2d')
  var hiddenCtx = document.getElementById('process-canvas').getContext('2d')
  var draw = function(video, dt) {
    hiddenCtx.drawImage(video, 0, 0)
    var filters = 'bloodBath'
    var filteredImageData = FM.apply(canvas, outputCtx, hiddenCtx, filters)
  }
  var myCamvas = new camvas(outputCtx, draw)
}
