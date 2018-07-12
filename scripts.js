// JavaScript Document
$(function(){

  //ハンバーガーメニューの背景フィルターの設定
  $("body").append("<div id='glayLayer'></div>");

	//スライドギャラリーのページングマークリストの設定
	$("#slide li").each(function(){
		$("#paging").append($("<li></li>").attr("data-img",$("img",this).attr("src")));
	});
	$("#paging li:first-child").addClass("active");
	
	//自動スライドの実行
	var timerId = setInterval(function(){
		$("#nav .next").click();
	},3000);

  //スライドショーのマークリストをクリックでスライドが移動
  $("#paging li").click(function(){
		console.log("クリックされました！");
      while($("#slide li:first-child img").attr("src") != $(this).attr('data-img')){
        $("#nav .next").click();
      };
    });
  //ハンバーガーメニューの展開
  $('.nav_hanbarger').click(function(){
        $("#glayLayer").toggle();
        $('.hanbargar_list').toggleClass('hanbargar_list_open')
        $(this).toggleClass('hanbarger_active');
		});

  //ハンバーガーメニューの背景フィルターのクリックイベント
	$("#glayLayer").click(function(){
		$(this).hide();
		$('.hanbargar_list').toggleClass('hanbargar_list_open');
		$('.nav_hanbarger').toggleClass('hanbarger_active');
	})
	//右矢印ボタンが押された際の挙動
	$("#nav .next").click(function(){
		$("#slide:not(:animated)").animate({
			"margin-left" : -1*$("#slide li").width()
		},function(){
			$("#slide").css("margin-left","0");
			$("#slide li:first-child").appendTo('#slide');
			$("#paging li.active").removeClass("active");
			$("#paging li[data-img='"+$("#slide li:first-child img").attr("src")+"']").addClass("active")
		});
	});

	//左矢印ボタンが押された際の挙動
	$("#nav .prev").click(function(){
		$("#slide:not(:animated)")
			.css("margin-left",-1*$("#slide li").width());
			$("#slide li:last-child").prependTo('#slide');
		$("#slide:not(:animated)")
			.animate({
			"margin-left" : 0
		},function(){
			$("#paging li.active").removeClass("active");
			$("#paging li[data-img='"+$("#slide li:first-child img").attr("src")+"']").addClass("active")
		});
	});
	//スライドショーのレスポンシブ化
	var slide_img = document.getElementsByClassName('slide_img');
	for(var i in slide_img) {
    slide_img.item(i).setAttribute("width",window.innerWidth);
  }

	//アコーディオンの設定
	$('.shop_detail').hide();
	$('.shop h1').css('cursor','pointer');
	$('.shop h1').click(function(){
		if($(this).next().css("display")=="none"){
			$(".shop_detail").slideUp("slow");
			$(this).next().slideDown("slow");
			// $('+dd',this).show();
			$('.shop h1').css('cursor','pointer');
			$(this).css('cursor','default');
		}
	});

	//スクロールでナビゲーションが出現
		$(window).scroll(function () {
				if ($(this).scrollTop() > 150) {
						$('.moblie_nav,.to_top').fadeIn();
				} else {
						$('.moblie_nav,.to_top').fadeOut();
				}
		});
	//トップボタンクリックでヌルっとトップへ
  $('.to_top,.top_logo').click(function() {
    $('html,body').animate({scrollTop:0},500,'swing');
  });
	//モバイルナビボタンクリックでヌルっと移動
  $('.moblie_nav li:nth-child(1) a').click(function() {
    $('html,body').animate({scrollTop:0},500,'swing');
    return false;
  });
  $('.moblie_nav li:nth-child(2) a').click(function() {
    $('html,body').animate({scrollTop:$('.news_list').offset().top},500,'swing');
    return false;
  })
  $('.moblie_nav li:nth-child(3) a').click(function() {
    $('html,body').animate({scrollTop:$('.shop_top').offset().top},500,'swing');
    return false;
  })
  $('.moblie_nav li:nth-child(4) a').click(function() {
    $('html,body').animate({scrollTop:$('.online_top').offset().top},500,'swing');
    return false;
  })
});//jQuery終了

// リサイズ時のスライドショーのレスポンシブ化
(function () {
  var timer = 0;
  window.onresize = function () {
    if (timer > 0) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      var slide_img = document.getElementsByClassName('slide_img');
		//サイズの偏向
      for(var i in slide_img) {
       slide_img.item(i).setAttribute("width",window.innerWidth);
      }
    }, 200);
  };
}());

