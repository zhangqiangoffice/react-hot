$(function() {
	$('#btn_submit').click(function(){
		var ctx = $(this).data('ctx');
		var id = $(this).data('id');
		var staffId = $(this).data('staffid');
		$.ajax({
			url: ctx + "/appZhongan/zhonganInsurance/accept_insurance_order",
			data: {"insuredId":id},
			type: "post",
			dataType: "json",
			success: function(msg){
				if (msg.result === 1){
					location.href =  ctx +"/appZhongan/app_order_list?staffId=" + staffId;
				} else {
					alert(msg.message);
				}
			}
		});
	});
})