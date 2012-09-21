window.onload = function(){
  var ctx = document.getElementsByTagName('canvas')[0].getContext('2d')
  var draw = function(video, dt) {
    ctx.drawImage(video, 0, 0)
  }
  var myCamvas = new camvas(ctx, draw)
}
