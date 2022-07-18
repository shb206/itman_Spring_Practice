let chart = null;
$(document).ready(function() {
	$("#chart_btn").on("click",function(event){
		if(chart !== null) {
			chart.destroy();
		}
		const el = document.getElementById('chart');
		const Chart = toastui.Chart;
		
		let checkList = grid.getCheckedRows();
		let list = [];
		checkList.forEach(e => {
			var data = {
				"idx" : e["IDX"],
				"name" : e["NAME"],
				"code" : e["CODE"],
				"score" : e["SCORE"] }
			list.push(data);
		});
		idx_list = []
		score_list = []
		list.forEach(e => {
			idx_list.push(e["idx"]);
			score_list.push(e["score"]);
		})
		
		const data = {
			categories: idx_list,
			series: [
				{
					name: 'Score',
					data: score_list
				}
			]
		}
		
		const options = {
		  chart: { width: 700, height: 400 },
		};
		
		//const chart = Chart.barChart({ el, data, options }); // 바 차트
		chart = Chart.lineChart({ el, data, options }); // 라인 차트
	});
})
