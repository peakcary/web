$(function () {

  'use strict';

   var console = window.console || { log: function () {} };
   var URL = window.URL || window.webkitURL;
   var $image = $('#image');
   var $download = $('#download');
   var originalImageURL = $image.attr('src');
   var uploadedImageType = 'image/jpeg';
   var uploadedImageURL;
   var titleWrapVal = '2';
   var oneLineLayout = 1;
   var twoLineLayout = 2;

    // Tooltip
   $('[data-toggle="tooltip"]').tooltip();

  // Buttons
  if (!$.isFunction(document.createElement('canvas').getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop('disabled', true);
  }

  if (typeof document.createElement('cropper').style.transition === 'undefined') {
    $('button[data-method="rotate"]').prop('disabled', true);
    $('button[data-method="scale"]').prop('disabled', true);
  }


  // Download
  if (typeof $download[0].download === 'undefined') {
    $download.addClass('disabled');
  }


  // Options
  $('.docs-toggles').on('change', 'input', function () {
    var $this = $(this);
    var name = $this.attr('name');
    var type = $this.prop('type');
    var cropBoxData;
    var canvasData;

    if (!$image.data('cropper')) {
      return;
    }

    if (type === 'checkbox') {
      options[name] = $this.prop('checked');
      cropBoxData = $image.cropper('getCropBoxData');
      canvasData = $image.cropper('getCanvasData');

      options.ready = function () {
        $image.cropper('setCropBoxData', cropBoxData);
        $image.cropper('setCanvasData', canvasData);
      };
    } else if (type === 'radio') {
      options[name] = $this.val();
    }

    $image.cropper('destroy').cropper(options);
  });


  // Methods
  $('.docs-buttons').on('click', '[data-method]', function () {
    var $this = $(this);
    var data = $this.data();
    var $target;
    var result;

    if ($this.prop('disabled') || $this.hasClass('disabled')) {
      return;
    }

    if ($image.data('cropper') && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== 'undefined') {
        $target = $(data.target);

        if (typeof data.option === 'undefined') {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      switch (data.method) {
        case 'rotate':
          $image.cropper('clear');
          break;

        case 'getCroppedCanvas':
          if (uploadedImageType === 'image/jpeg') {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = '#fff';
            data.option.width = $('#bannerWidth').val();
            data.option.height = $('#bannerHeight').val();
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);

      switch (data.method) {
        case 'rotate':
          $image.cropper('crop');
          break;

        case 'scaleX':
        case 'scaleY':
          $(this).data('option', -data.option);
          break;

        case 'getCroppedCanvas':
          if (result) {
            // Bootstrap's Modal
            var $modalBody = $('#getCroppedCanvasModal').modal().find('.modal-body');
            $modalBody.parents('.modal-dialog').css('max-width', result.width);
            $modalBody.html(result);

            $modalBody.append(getModalBodyTitlesHtml(result.width));
            $modalBody.append(getModalBodyTagHtml());

            if (!$download.hasClass('disabled')) {
              $('#getCroppedCanvasModal').on('shown.bs.modal', function (e) {
                var leftVal = $('.leftSelector').val();
                if (leftVal == 'center') {
                  var modalBodyWidth = $modalBody.width();
                  var titles = $('.crop-title.model-title');

                  for (var i = 0; i < titles.length; i++) {
                        var cropTitleWidth = $('.crop-title.model-title-' + i).width();
                        var centerLeft = (modalBodyWidth - cropTitleWidth)/2;
                        $('.crop-title.model-title-' + i).css('left', centerLeft);
                  }
                }
                var devicePixelRate = window.devicePixelRatio;
                var scale = 2 * devicePixelRate;

                html2canvas($modalBody[0], {
                    scale: scale,
                    onrendered: function (canvas) {
                        $download.attr('href', canvas.toDataURL(uploadedImageType));
                    }
                });
              });
            }
          }

          break;

        case 'destroy':
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = '';
            $image.attr('src', originalImageURL);
          }

          break;

        case 'moveTitle':
          var titleAlign = data.option;
          moveTitleCrop(titleAlign);
        break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }

    }
  });
  //获取标签html
  function getModalBodyTagHtml() {
    var type = $(".leftSelector").find("option:selected").attr('type');
    var html = '';
    if (!type || type == 'left') {
      return;
    }
    else {
      for (var i = 0; i < window.leftInfos.length; i++) {
        var leftInfo = leftInfos[i];
        if (leftInfo.type == type) {
          var item = leftInfo.tagInfo;
          if (item) {
            var color = item.color;
            if (window.colorArray['tag']) {
              color = window.colorArray['tag'];
            }
            html = '<span class="crop-title ' + type + '" style="top:' + item.top + ';color:' + color + ';left:' + item.left + ';">' + item.title + '</span>';
          }
        }
      }
    }
    return html;
  }

  // 获取标题html
  function getModalBodyTitlesHtml(modelWidth){
    var titleConfig = window.titleConfig;
    var val = $('.lineSelector').val();

    // 单行布局
    var titles = '';
    if (val == oneLineLayout) {
      titles = titleConfig.oneLineConfig;
    }
    else if (val == twoLineLayout){
      titles = titleConfig.twoLineConfig;
    }
    var html = getModelTitles(titles, modelWidth);
    return html;
  }

  function getModelTitles(titles, modelWidth) {
    var html = '';
    if (!titles || titles.length <= 0) {
      return html;
    }
    var leftVal = $('.leftSelector').val();
    var itemLeft = 0;

    if (leftVal != 'center'){
      itemLeft = leftVal;
    }
    else if (leftVal == 'center'){
      itemLeft = modelWidth/2 + 'px';
    }
    for (var i = 0; i < titles.length; i++) {
      var item = titles[i];
      var color = item.color;
      if (window.colorArray[item.type]) {
        color = window.colorArray[item.type];
      }
      var styleHtml = '';
      if (item.color) {
        styleHtml += 'color:' + color + ';';
      }
      if (item.fontFamily) {
        styleHtml += 'font-family:' + item.fontFamily + ';';
      }
      if (item.fontSize) {
        styleHtml += 'font-size:' + item.fontSize + ';';
      }
      if(item.fontWeight) {
        styleHtml += 'font-weight:' + item.fontWeight + ';';
      }
      var titleHeader = '<span class="crop-title model-title model-title-'+ i +'" style="top:' + item.top + ';'  + 'left:' + itemLeft + ';' + styleHtml + '">' + item.title + '</span>';
      html += titleHeader;
    }
    return html;
  }

  // move title to direction
  function moveTitleCrop(titleAlign) {
    if (!titleAlign) {
      return;
    }
    switch (titleAlign) {
      case 'left':
        $('.crop-title').css('left', '0px');
        //resetTitlePostions(true, '', '0px');
      break;
      case 'center':
        var cropBoxWidth = $('.cropper-crop-box').width();
        var titles = $('.crop-title');
        for (var i = 0; i < titles.length; i++) {
          var titleWidth = $(titles[i]).width();
          var leftPos = (cropBoxWidth - titleWidth)/2;
          $(titles[i]).css('left', leftPos);
          //resetTitlePostions(false, i, leftPos);
        }
      break;
      case 'right':
        $('.crop-title').css('left', '');
        $('.crop-title').css('right', '0px');
        //resetTitlePostions(true, '', '', '0px');
      break;
      default:
    }
  }

  function resetTitlePostions(isAll, index, left, right) {
    if (isAll) {
      if (window.currentTitleInfos && window.currentTitleInfos.length > 0) {
        var titles = window.currentTitleInfos;
        for (var i = 0; i < titles.length; i++) {
          if (left) {
            titles[i].left = left;
          }
          else if (left == '' && right ){
            titles[i].left = '';
            titles[i].right = right;
          }

        }
      }
    }
    else {
      if (window.currentTitleInfos && window.currentTitleInfos.length > 0) {
        window.currentTitleInfos[index].left = left;
      }
    }

  }


  // Keyboard
  $(document.body).on('keydown', function (e) {

    if (!$image.data('cropper') || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper('move', -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper('move', 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper('move', 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper('move', 0, 1);
        break;
    }

  });


  // Import image
  var $inputImage = $('#inputImage');

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data('cropper')) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image.cropper('destroy').attr('src', uploadedImageURL).cropper(options);
          $inputImage.val('');
        } else {
          window.alert('Please choose an image file.');
        }
      }
    });
  } else {
    $inputImage.prop('disabled', true).parent().addClass('disabled');
  }

});
