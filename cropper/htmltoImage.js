$(function(){
  $(".getImage").click(function(){
    var w = $("#view").width();
    var h = $("#view").height();

    //要将 canvas 的宽高设置成容器宽高的 2 倍
    var canvas = document.createElement("canvas");
    canvas.width = w * 4;
    canvas.height = h * 4;
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    var context = canvas.getContext("2d");
    //然后将画布缩放，将图像放大两倍画到画布上
    context.scale(4,4);

    html2canvas(document.getElementById('view'), {
        canvas: canvas,
        onrendered: function(canvas) {
            document.body.appendChild(canvas);
            var uploadedImageType = 'image/jpeg';
            var imageData = canvas.toDataURL(uploadedImageType);
            console.log(imageData);
        }
      //  width: 320,
      //  height: 180
    });
  });

  $('.canvastoImage').click(function(){
    $('#backImage').attr('src', './Cropper_files/picture.jpg');
  });
})
