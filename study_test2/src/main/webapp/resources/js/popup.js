function submit_btn(data) {
	switch(data) {
		case "select" :
			window.opener.selectPop();
			break;
		case "insert" :
			window.opener.insertPop();
			break;
		case "update" :
			window.opener.updatePop();
			break;
	}
}

function update_init() {
	$("#idx").val($(opener.document).find('#h_idx').val());
	$("#name").val($(opener.document).find('#h_name').val());
	$("#code").val($(opener.document).find('#h_code').val());
	$("#score").val($(opener.document).find('#h_score').val());
}


$(document).ready(function() {
	if($("#form_type").val() == "update") {
		update_init();
	}
    $("#test_btn").on("click",function(event){
		event.preventDefault();
		$(opener.document).find('#h_idx').val($("#idx").val());
		$(opener.document).find('#h_name').val($("#name").val());
		$(opener.document).find('#h_code').val($("#code").val());
		$(opener.document).find('#h_score').val($("#score").val());
		submit_btn($("#form_type").val());
		window.close();
	});
})


