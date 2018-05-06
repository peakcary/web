$(function () {
	// $("#img").rotate(45);

	var rotateTimeOut = function () {
		$('#img').rotate({
			angle: 0,
			animateTo: 3160,
			duration: 8000,
			callback: function () {
				alert('网络超时，请检查您的网络设置！');
			}
		});
	};

	$('#img').click(function () {
		rotateTimeOut();
	});


});