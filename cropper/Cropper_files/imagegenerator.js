$(function(){

    // 颜色选择器
    var color = $('#color_d');
    var currentTarget = '';
    var colorArray = {};
    window.colorArray = colorArray;

    color.bind('change', function(){
      if (currentTarget) {
        currentTarget.css('color', this.value);
        var type = currentTarget.attr('type');
        colorArray[type] = this.value;
        //titleInfos[index][titleIndex].color = this.value;
      }
    });
    color.cxColor(function(api){
      $('.img-container').on('click', '.crop-title', function(e){
        var target = e.target;
        currentTarget = $(target);
        api.show();
      })
    });
    var oneLineLayout = 1;
    var twoLineLayout = 2;

    var bannerSizes = ['480*152', '720*228', '300*300'];
    var bannerImgsUrls = ['images/picture.jpg', 'images/picture2.jpg', 'images/picture3.jpg'];
    bannerWidth = bannerSizes[0].split('*')[0];
    bannerHeight = bannerSizes[0].split('*')[1];

    var oneLineConfig = [
      {
        title: '主标题主标题主标题主标题one',
        top: '84px',
        left: '10px',
        type: 'main',
        color: 'red',
        fontSize: '20px',
        fontFamily: 'HanSansCN',
        fontWeight: 'bold'
      },
      {
        title: '副标题副标题副标题副标题one',
        top: '140px',
        left: '10px',
        type: 'sub',
        color: 'aquamarine',
        ffontSize: '16px',
        fontFamily: 'HanSansCN',
        fontWeight: 'normal'
      }
    ]
    var twoLineConfig = [
      { title: '主标题主标题主标题主标题',
        top: '50px',
        left: '10px',
        type: 'main',
        color: 'red',
        fontSize: '10px',
        fontFamily: '',
        fontWeight: ''
      },
      {
        title: '主标题主标题主标题主标题222',
        top: '100px',
        left: '10px',
        type: 'mainSub',
        color: 'red',
        fontSize: '10px',
        fontFamily: '',
        fontWeight: ''
      },
      {
        title: '副标题副标题副标题副标题',
        top: '154px',
        left: '10px',
        type: 'sub',
        color: 'red',
        fontSize: '10px',
        fontFamily: '',
        fontWeight: ''
      }
    ];

    var titleConfig = {
      oneLineConfig: oneLineConfig,
      twoLineConfig: twoLineConfig
    }
    window.titleConfig = titleConfig;

    var titleInfos = [
      [
        {
          title: '主标题主标题主标题主标题',
          top: '50px',
          left: '50px',
          type: 'main',
          color: 'red',
          fontSize: '20px',
          fontFamily: 'HanSansCN',
          fontWeight: 'bold'
        },
        {
          title: '主标题主标题主标题主标题副',
          top: '50px',
          left: '50px',
          type: 'mainSub',
          color: 'pink',
          ffontSize: '16px',
          fontFamily: 'HanSansCN',
          fontWeight: 'normal'
        },
        {
          title: '副标题副标题副标题副标题',
          top: '50px',
          left: '50px',
          type: 'sub',
          color: 'black',
          ffontSize: '14px',
          fontFamily: 'HanSansCN',
          fontWeight: '500'
        }
      ]
    ];
    var leftInfos = [
      {
        type: 'left',
        value: '10px',
        tagInfo: "adfs"
      },
      {
        type: 'center',
        tagInfo: {
          title: '标签标签中',
          top: '10px',
          left: '10px',
          type: 'tag',
          color: 'red',
          fontSize: '10px',
          fontFamily: '',
          fontWeight: '',
          backgroundColor: '',
          opacity: ''
        }
      },
      {
        type: 'farLeft',
        value: '280px',
        tagInfo: {
          title: '标签右',
          top: '10px',
          left: '10px',
          type: 'tag',
          color: 'red',
          fontSize: '10px',
          fontFamily: '',
          fontWeight: '',
          backgroundColor: '',
          opacity: ''
        }
      }
    ];
    window.leftInfos = leftInfos;

    var $image = $('#image');
    var widthRate = NaN;
    var heightRate = NaN;

    var maxLineText = 8;
    init();

    function init(){
      initCropper(bannerSizes, 0, bannerImgsUrls[0]);
      initTabs(bannerSizes);
      // 初始化left位置选择信息
      initLineSelector(titleConfig);
      initLeftSelector(leftInfos);
      //initTabContainer(bannerSizes);
      initEvents();
    }

    // 初始化布局选择器
    function initLineSelector(titleConfig) {
      if (!titleConfig) {
        return;
      }
      var leftSelector = $('.lineSelector');
      var html = '';
      if (titleConfig.oneLineConfig && titleConfig.oneLineConfig.length > 0) {
        html += '<option value="' + oneLineLayout + '">' + '单排布局' + '</option>';
      }
      if (titleConfig.twoLineConfig && titleConfig.twoLineConfig.length > 0) {
        html += '<option value="' + twoLineLayout + '">' + '两排布局' + '</option>';
      }
      leftSelector.html(html);
    }
    // 初始化左边距选择器
    function initLeftSelector(leftInfos) {
      if (!leftInfos || leftInfos.length <= 0) {
        return;
      }
      var leftSelector = $('.leftSelector');
      var html = '';

      for (var i = 0; i < leftInfos.length; i++) {
        var item = leftInfos[i];
        var txt = '';
        var val = '';
        if (item.type != 'center') {
          txt = item.value;
          val = item.value;
        }
        else {
          txt = '居中';
          val = 'center';
        }
        html += '<option value="' + val + '" type="' + item.type + '">' + txt + '</option>';
      }
      leftSelector.html(html);
    }

    // 初始化标签信息
    function initTags(type) {
      if (!type || type == 'left') {
        return;
      }
      else {
        for (var i = 0; i < leftInfos.length; i++) {
          var item = leftInfos[i];
          if (item.type == type) {
            var tagInfo = item.tagInfo;
            setCropperTitles(tagInfo, 'tag');
          }
        }
      }
    }

    //初始化事件
    function initEvents (){
      //
      //切换left值选项
      $(".leftSelector")
      .change(function(e){
        var val = $(this).val();
        var type = $(this).find("option:selected").attr('type');
        $('.crop-title.tag').remove();
        initTags(type);

        // 居中处理的特殊逻辑
        if (val == 'center') {
          var cropBoxWidth = $('.cropper-crop-box').width();
          var titles = $('.crop-title').not('.tag');
          for (var i = 0; i < titles.length; i++) {
            var titleWidth = $(titles[i]).width();
            var leftPos = (cropBoxWidth - titleWidth)/2;
            $(titles[i]).css('left', leftPos);
          }
        }
        else {
            var leftVal = parseInt(val, 10);
            if (leftVal) {
              $('.crop-title').not('.tag').css('left', leftVal*widthRate);
            }
        }
        console.log(val);
      });
      // 切换布局选项
      $('.lineSelector')
      .change(function(){
        var val = $(this).val();
        // 单行布局
        var titles = '';
        if (val == oneLineLayout) {
          titles = titleConfig.oneLineConfig;
          $('.crop-title').remove();
          setCropperTitles(titles);
        }
        else if (val == twoLineLayout){
          titles = titleConfig.twoLineConfig;
          $('.crop-title').remove();
          setCropperTitles(titles);
        }
      });

      // 保存
      $('#save').click(function(){
        var base64code = $('#downloadT').attr('href');
      })
      // 提交
      $('#submit').click(function(){

      })
    }

    function saveImage(base64code, isSave) {
      var url = '/xxx/xxx';
      var devicePixelRate = window.devicePixelRatio;
      var scale = 2 * devicePixelRate;

      var data = {
        base64code: '####',
        scale: 2,
        size: 420*180,
        isSave: false
      };
      var request = $.ajax({
        url: url,
        method: "POST",
        data: data,
        dataType: "json"
      });

      request.done(function( msg ) {

      });

      request.fail(function( jqXHR, textStatus ) {

      });
    }

    function resetTitleWidth(text, type) {
      var titleTemp = '<span class="crop-title temp" style="visibility:hidden">' + text + '</span>';
      $('.cropper-crop-box').append(titleTemp);

      var width = $('.crop-title.temp').width();
      $('.crop-title.' + type).css('width', width*widthRate);

      $('.crop-title.temp').remove();
    }

    function initCropper(bannerSizes, index, imgUrl) {

      //$image.cropper('destroy');
      console.log('in ......index:' + index);

      var bannerSize = bannerSizes[index];
      if (!bannerSize) {
        return;
      }
      bannerWidth = bannerSize.split('*')[0];
      bannerHeight = bannerSize.split('*')[1];

      $('#bannerWidth').val(bannerWidth);
      $('#bannerHeight').val(bannerHeight);

      var aspectRatio = bannerWidth/bannerHeight;
      var options = {
          //aspectRatio: NaN
          aspectRatio: aspectRatio
      };
      $image.cropper('destroy').attr('src', imgUrl);
      // remove
      $image.unbind("ready");

      // Cropper
      $image.on({
          ready: function (e) {
            console.log(e.type + 'index:' + index);
            //var titles = titleInfos[index];
            var titles = [];
            if (titleConfig.oneLineConfig && titleConfig.oneLineConfig.length > 0) {
              titles = titleConfig.oneLineConfig;
            }
            else if (titleConfig.twoLineConfig && titleConfig.twoLineConfig.length > 0) {
              titles = titleConfig.twoLineConfig;
            }

            $('.crop-title').remove();

            var initData = $(this).cropper('getData', "");
            var bannerOption = { width: bannerWidth, height: bannerHeight };
            var bannerData = $.extend(initData, bannerOption);
            $(this).cropper('setData', bannerData);
            if (titles && titles.length > 0) {
              setCropperTitles(titles);
            }
          }
        }).cropper(options);
		}
		
		function setCropperTitles(titles,type){
			console.log(titles,type)

			if(titles){
				var i;
				var l= titles.length;
				for(i=0;i<l;i++){
					var item = titles[i];
					console.log(item)
				}
			}
		}

    function setCropperTitles_old(titles, type) {
      if (!titles) {
        return;
      }
      var cropMoveWidth = $('.cropper-move').width();
      var cropMoveHeight = $('.cropper-move').height();

      var $titleHeader = '';
      var thWidth = '';
      var thHeight = '';
      var thTop = '';
      var thLeft = '';

      widthRate = cropMoveWidth/bannerWidth;
      heightRate = cropMoveHeight/bannerHeight;

      if (type == 'tag') {
        var item = titles;
        var titleHeader = '<span class="crop-title ' + type + '" type="' + item.type + '" style="top:' + item.top + ';left:' + item.left + ';">' + item.title + '</span>';
        $('.cropper-crop-box').append(titleHeader);
        $titleHeader = $('.crop-title.' + type);
        thWidth = $titleHeader.width();
        thHeight = $titleHeader.height();
        thTop = parseInt($titleHeader.css('top'), 10);
        thLeft = parseInt($titleHeader.css('left'), 10);
        $titleHeader.css('width', widthRate*thWidth + 'px');
        $titleHeader.css('height', heightRate*thHeight + 'px');
        $titleHeader.css('top', heightRate*thTop);
        $titleHeader.css('left', heightRate*thLeft);
      }
      else {
        for (var i = 0; i < titles.length; i++) {
          var item = titles[i];
          var styleHtml = '';
          if (item.color) {
            styleHtml += 'color:' + item.color + ';';
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
          var titleHeader = '<span class="crop-title title-'+ i +' ' + item.type + '" type="' + item.type + '" style="top:' + item.top + ';left:' + item.left + ';' +styleHtml + '">' + item.title + '</span>';
          $('.cropper-crop-box').append(titleHeader);

          $titleHeader = $('.crop-title.title-' + i);
          thWidth = $titleHeader.width();
          thHeight = $titleHeader.height();
          thTop = parseInt($titleHeader.css('top'), 10);
          thLeft = parseInt($titleHeader.css('left'), 10);

          $titleHeader.css('width', widthRate*thWidth + 'px');
          $titleHeader.css('height', heightRate*thHeight + 'px');
          $titleHeader.css('line-height', heightRate*thHeight + 'px');
          $titleHeader.css('top', heightRate*thTop);
          $titleHeader.css('left', heightRate*thLeft);
          $titleHeader.addClass('justify');
        }
      }
    }
    function initTabs(bannerSizes) {
      var $myTab = $('#myTab');
      // tab 切换
      for (var i = 0; i < bannerSizes.length; i++) {
        var tabTagert = bannerSizes[i];

        var tabItem = '<li class="nav-item">'
              + '<a class="nav-link" id="' + i + '-tab" data-toggle="tab" href="#' + i + '" role="tab" aria-controls="home" aria-selected="false">' + tabTagert + '</a>'
              + '</li>';
        $myTab.append(tabItem);
      }

      $('#myTab a:first').tab('show');

      $('#myTab a').on('click', function (e) {
        var id = $(e.target).attr('id').substr(0,1);
        initCropper(bannerSizes, id, bannerImgsUrls[id]);
        //$image.attr('src', bannerImgsUrls[id]);
      })
    }

    // 初始化标签换行事件
    function initTitleSelectorEvents() {
      $(".titleSelector")
      .change(function() {
        var val = $(this).val();
        var type = '';
        if ($(this).hasClass('main')) {
          type = 'main';
        }
        else if ($(this).hasClass('sub')) {
          type = 'sub';
        }

        var text = $('.crop-title.' + type).text();
        var len = text.length;

        // 选择双排
        if (val == 2 ) {
          if (len > maxLineText){
            console.log('text length = ' + len);
            var newTxt = text.substr(0, maxLineText) + '</br>' + text.substr(maxLineText, len);
            $('.crop-title.' + type).html(newTxt);
            resetTitleWidth(text.substr(0, maxLineText), type);
          }
        }
        else if (val == 1){
          $('.crop-title.' + type).html(text);
          resetTitleWidth(text, type);
        }
      });
    }

    // function initTabContainer(bannerSizess) {
    //   var $myTabContainer = $('#myTabContainer');
    //   var act = '';
    //   // tab 切换
    //   for (var i = 0; i < bannerSizes.length; i++) {
    //     var tabTagert = bannerSizes[i];
    //     if (i == 0) {
    //       act = 'active';
    //     }
    //     else {
    //       act = '';
    //     }
    //     var tabItem = '<div class="tab-pane ' + act + '" id="' + i + '" role="tabpanel" aria-labelledby="' + i + '-tab">' + bannerSizes[i] + '</div>';
    //     $myTabContainer.append(tabItem);
    //   }
    // }

});
