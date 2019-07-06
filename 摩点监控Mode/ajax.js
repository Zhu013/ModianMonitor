function freshAjax(){
		    var dom = document.getElementById("container");
		    var myChart = echarts.init(dom);
		    var id=document.getElementById("pro_id").value;
		    option = null;
		    
		    function randomData(option){
		     $.ajax({
		               type : "post",
		               async : false, //同步执行
		               url:"https://zhongchou.modian.com/realtime/get_simple_product?jsonpcallback=jQuery1_1&ids="+id+"&if_all=1&_=2",
						data : {},
		               datatype : "json", //返回数据形式为json
		       		success : function(result) {
		       				if(result){
		       				
								re=result.substring(41,result.length-3);
								var parse_json_by_JSON_parse= function(str){
									console.log("sucsess");
								    return JSON.parse(str);
								}
								 json1 = parse_json_by_JSON_parse(re);
								console.log(json1.backer_money_rew);
								value=json1.backer_money_rew;
										}
			               		}
			               })
				now = new Date(+now + 1000);
		        return {
		            name: now.toString(),
		            value: [
		                now,
		                Math.round(value)
		            ]
		        }
		    }
		    var data = [];
		    var now = new Date();
		    var value = "";
		   var anchor = [
				    {name:new Date(+now + 1000), value:[new Date(+now + 1000), ]},
				    {name:new Date(+now + 60*60*1000), value:[new Date(+now + 60*60*1000), ]}
				    ]
		    
		    option = {
		        title: {
		            text: 'PK实时监控'
		        },
		        tooltip: {
		            trigger: 'axis',
		            formatter: function (params) {
		                params = params[0];
		                var date = new Date(params.name);
		                return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' : ' + params.value[1];
		            },
		            axisPointer: {
		                animation: false
		            }
		        },
		        legend:{
		        	data:['金额']
		        },
		        xAxis: {
		            type: 'time',
		            splitLine: {
		                show: false
		            }
		        },
		        yAxis: {
		            type: 'value',
		            boundaryGap: [0, '100%'],
		            splitLine: {
		                show: false
		            }
		        },
		        series: [{
		            name: '金额',
		            type: 'line',
		            showSymbol: false,
		            hoverAnimation: false,
		            data: data
		        },
		             {
					  name:'anchor',
					  type:'line', 
					  showSymbol:false, 
					  data:anchor,
					  itemStyle:{normal:{opacity:0}},
					  lineStyle:{normal:{opacity:0}}
					}
		        ]
		    };
		    setInterval(function () {
		            //data.shift();
		            data.push(randomData());
		            
		        myChart.setOption({
		            series: [{
		                data: data
		            }]
		        });
		    }, 1000);
		
		    ;
		    if (option && typeof option === "object") {
		        myChart.setOption(option, true);
		    }
}
