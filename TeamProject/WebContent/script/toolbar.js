
var messageOpen = false;
var messageCnt = 0;
var currentPage=1;
var myID=0;


$(document).ready(function() {


		ws.onmessage=function(message){
 		if(message.data==$('#memberID').val()){
 			$.ajax({
 				url:"/TeamProject/message/page",
 				type:"post",
 				data:{
 					currentNum:currentPage,
 					type:"select"
 				},
 				success:function(data){
 					console.log(data);
 					$('.user').remove();
 					$.each(data.list, function(index, item) {
 						messageCnt++;
 						
 						let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
 						let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
// 						$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
 						$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
 						$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
 						$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
 						let text0=item['content'];
 						let text1=text0.split(' ');
 						if(text1[0]=='<div'){
 							text0=$.parseHTML(text0);
 							console.log(text1[1]);
 							if(text1[1].trim()=="id='"+"invite'"){
 								$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
 								$('<div>', {id : "content",html: text0}).appendTo(ul);
 							}
 							else if(text1[1].trim()=="id='"+"request'"){
 								console.log("d");
 								$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
 								$('<div>', {id : "content",html: text0}).appendTo(ul);
 							}
 							else{
 								$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
 								$('<div>', {id : "content",html: text0}).appendTo(ul);
 							}
 						}
 						else{
 							text0=item['content'];
 							console.log(text0);
 							$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
 							if(item["content"].length>30){
 								$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
 							}
 							else{
 								$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
 							}
 						}
 						console.log(text0);
 						
 						
 						if(item["isNotRead"]==1){
 							console.log(item['isNotRead']);
 							$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
 						}
 						
 						$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
 						messageCnt++;
 					});
 					$('.user').css('display','block');	
// 					let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
// 					$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
// 					$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
// 					for(let i =1;i<=5;i++){
// 						$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
// 					}
// 					$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
// 					$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
 					let j=1;
 					for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
 						$("#milestone"+eval("'"+j+"'")).css("display","inline");
 						$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
 						j++;
 					}
 					while(j!=6){
 						$("#milestone"+eval("'"+j+"'")).css("display","none");
 						j++;
 					}
 					currentPage=currentP;
 					$('.count').text(data.num[0].isNotReadTotal);
 				}
 			})
 		}
	}
	
 	$('#SuperBox').css("width", "100px");
	$('#SuperBox').css("max-height", "400px");
	$('#SuperBox').css("height", "20px");
	$.ajax({
		url:"/TeamProject/message/page",
		type:"post",
		data:{
			currentNum:'',
			type:'first'
		},
		success:function(data){
			console.log(data);
			$.each(data.list, function(index, item) {
				messageCnt++;
				
				let ul = $('<div>', {class:"user",id : item["sender"]}).appendTo($("#SuperBox"));
				let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//				$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
				$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
				$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
				$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
				let text0=item['content'];
				let text1=text0.split(' ');
				if(text1[0]=='<div'){
					text0=$.parseHTML(text0);
					console.log(text1[1]);
					if(text1[1].trim()=="id='"+"invite'"){
						$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
						$('<div>', {id : "content",html: text0}).appendTo(ul);
					}
					else if(text1[1].trim()=="id='"+"request'"){
						console.log("d");
						$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
						$('<div>', {id : "content",html: text0}).appendTo(ul);
					}
					else{
						$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
						$('<div>', {id : "content",html: text0}).appendTo(ul);
					}
				}
				else{
					text0=item['content'];
					console.log(text0);
					$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
					if(item["content"].length>30){
						$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
					}
					else{
						$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
					}
				}
				console.log(text0);
				
				
				if(item["isNotRead"]==1){
					console.log(item['isNotRead']);
					$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
				}
				
				$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
				messageCnt++;
			});
			let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
			$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
			$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
			let j=1;
			for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
				$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
				$(".milestone"+i).css("display","inline");
				j++;
			}
			while(j!=6){
				$("#milestone"+eval("'"+j+"'")).css("display","none");
				j++;
			}
			$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
			$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
			messageOpen = false;
			$('.count').text(data.num[0].isNotReadTotal);
		}
	})
	
	
	
//	ws.onmessage=function(message){
//	      if(message==myID){
//	         //만약 나에게 보낸 메세지라면 쪽지함을 다시 갱신해야 함.(쪽지함이 꺼져 있을때는 상관이 없는데
//	         // 켜져 있는 경우에는 가시적으로 추가되는 것이 눈에 보여야 한다.
//	      }   
//	   }
	$(document).on('mousedown','.milestone',function(){
		currentP=$(this).text();
		console.log(currentP);
		$.ajax({
			url:"/TeamProject/message/page",
			type:"post",
			data:{
				currentNum:currentP,
				type:"select"
			},
			success:function(data){
				console.log(data);
				$('.user').remove();
				$.each(data.list, function(index, item) {
					messageCnt++;
					
					let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
					let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//					$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
					$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
					$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
					$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
					let text0=item['content'];
					let text1=text0.split(' ');
					if(text1[0]=='<div'){
						text0=$.parseHTML(text0);
						console.log(text1[1]);
						if(text1[1].trim()=="id='"+"invite'"){
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else if(text1[1].trim()=="id='"+"request'"){
							console.log("d");
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else{
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
					}
					else{
						text0=item['content'];
						console.log(text0);
						$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
						if(item["content"].length>30){
							$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
						}
						else{
							$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
						}
					}
					console.log(text0);
					
					
					if(item["isNotRead"]==1){
						console.log(item['isNotRead']);
						$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
					}
					
					$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
					messageCnt++;
				});
				$('.user').css('display','block');	
//				let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
//				$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
//				$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
//				for(let i =1;i<=5;i++){
//					$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
//				}
//				$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
//				$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
				let j=1;
				for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
					$("#milestone"+eval("'"+j+"'")).css("display","inline");
					$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
					j++;
				}
				while(j!=6){
					$("#milestone"+eval("'"+j+"'")).css("display","none");
					j++;
				}
				currentPage=currentP;
				$('.count').text(data.num[0].isNotReadTotal);
			}
		})
	})
	$(document).on('mousedown','.milestoneFirst',function(){
		
		$.ajax({
			url:"/TeamProject/message/page",
			type:"post",
			data:{
				currentNum:'',
				type:'first'
			},
			success:function(data){
				console.log(data);
				$('.user').remove();
				$.each(data.list, function(index, item) {
					messageCnt++;
					
					let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
					let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//					$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
					$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
					$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
					$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
					let text0=item['content'];
					let text1=text0.split(' ');
					if(text1[0]=='<div'){
						text0=$.parseHTML(text0);
						console.log(text1[1]);
						if(text1[1].trim()=="id='"+"invite'"){
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else if(text1[1].trim()=="id='"+"request'"){
							console.log("d");
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else{
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
					}
					else{
						text0=item['content'];
						console.log(text0);
						$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
						if(item["content"].length>30){
							$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
						}
						else{
							$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
						}
					}
					console.log(text0);
					
					
					if(item["isNotRead"]==1){
						console.log(item['isNotRead']);
						$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
					}
					
					$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
					messageCnt++;
				});
				$('.user').css('display','block');	
//				let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
//				$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
//				$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
				let j=1;
				for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
//					$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
					$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
					$(".milestone"+i).css("display","inline");
					j++;
				}
				while(j!=6){
					$("#milestone"+eval("'"+j+"'")).css("display","none");
					j++;
				}
//				$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
//				$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
				messageOpen = false;
				currentPage=1;
				$('.count').text(data.num[0].isNotReadTotal);
			}
		})
	})
	$(document).on('mousedown','.milestoneBefore',function(){
		console.log(currentPage);
		$.ajax({
			url:"/TeamProject/message/page",
			type:"post",
			data:{
				currentNum:currentPage,
				type:"before"
			},
			success:function(data){
				console.log(data);
				$('.user').remove();
				$.each(data.list, function(index, item) {
					messageCnt++;
					
					let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
					let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//					$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
					$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
					$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
					$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
					let text0=item['content'];
					let text1=text0.split(' ');
					if(text1[0]=='<div'){
						text0=$.parseHTML(text0);
						console.log(text1[1]);
						if(text1[1].trim()=="id='"+"invite'"){
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else if(text1[1].trim()=="id='"+"request'"){
							console.log("d");
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else{
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
					}
					else{
						text0=item['content'];
						console.log(text0);
						$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
						if(item["content"].length>30){
							$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
						}
						else{
							$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
						}
					}
					console.log(text0);
					
					
					if(item["isNotRead"]==1){
						console.log(item['isNotRead']);
						$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
					}
					
					$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
					messageCnt++;
				});
				$('.user').css('display','block');
//				let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
//				$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
//				$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
//				for(let i =1;i<=5;i++){
//					$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
//				}
//				$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
//				$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
				let j=1;
				for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
					$("#milestone"+eval("'"+j+"'")).css("display","inline");
					$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
					console.log(j);
					j++;
				}
				while(j!=6){
					$("#milestone"+eval("'"+j+"'")).css("display","none");
					j++;
				}
				if(currentPage<=1){
					currentPage=1;
					return;
				}else{
					currentPage=currentPage-1;
				}
				$('.count').text(data.num[0].isNotReadTotal);
			}
		})
	})
	$(document).on('mousedown','.milestoneNext',function(){
		$.ajax({
			url:"/TeamProject/message/page",
			type:"post",
			data:{
				currentNum:currentPage,
				type:"next"
			},
			success:function(data){
				console.log(data);
				$('.user').remove();
				$.each(data.list, function(index, item) {
					messageCnt++;
					
					let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
					let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//					$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
					$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
					$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
					$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
					let text0=item['content'];
					let text1=text0.split(' ');
					if(text1[0]=='<div'){
						text0=$.parseHTML(text0);
						console.log(text1[1]);
						if(text1[1].trim()=="id='"+"invite'"){
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else if(text1[1].trim()=="id='"+"request'"){
							console.log("d");
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else{
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
					}
					else{
						text0=item['content'];
						console.log(text0);
						$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
						if(item["content"].length>30){
							$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
						}
						else{
							$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
						}
					}
					console.log(text0);
					
					
					if(item["isNotRead"]==1){
						console.log(item['isNotRead']);
						$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
					}
					
					$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
					messageCnt++;
				});
				$('.user').css('display','block');
//				let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
//				$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
//				$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
//				for(let i =1;i<=5;i++){
//					$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
//				}
//				$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
//				$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
				let j=1;
				for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
					$("#milestone"+eval("'"+j+"'")).css("display","inline");
					$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
					j++;
				}
				while(j!=6){
					$("#milestone"+eval("'"+j+"'")).css("display","none");
					j++;
				}
				if(currentPage>=data.num[0].endNum){
					currentPage=data.num[0].endNum;
				}else{
					currentPage=currentPage+1;
				}
				$('.count').text(data.num[0].isNotReadTotal);
			}
		})
	})
	$(document).on('mousedown','.milestoneLast',function(){
		$.ajax({
			url:"/TeamProject/message/page",
			type:"post",
			data:{
				currentNum:'',
				type:"last"
			},
			success:function(data){
				console.log(data);
				$('.user').remove();
				$.each(data.list, function(index, item) {
					messageCnt++;
					
					let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
					let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//					$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
					$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
					$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
					$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
					let text0=item['content'];
					let text1=text0.split(' ');
					if(text1[0]=='<div'){
						text0=$.parseHTML(text0);
						console.log(text1[1]);
						if(text1[1].trim()=="id='"+"invite'"){
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else if(text1[1].trim()=="id='"+"request'"){
							console.log("d");
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
						else{
							$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
							$('<div>', {id : "content",html: text0}).appendTo(ul);
						}
					}
					else{
						text0=item['content'];
						console.log(text0);
						$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
						if(item["content"].length>30){
							$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
						}
						else{
							$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
						}
					}
					console.log(text0);
					
					
					if(item["isNotRead"]==1){
						console.log(item['isNotRead']);
						$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
					}
					
					$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
					messageCnt++;
				});
				$('.user').css('display','block');
//				let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
//				$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
//				$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
//				for(let i =1;i<=5;i++){
//					$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
//				}
//				$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
//				$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
				let j=1;
				for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
					$("#milestone"+eval("'"+j+"'")).css("display","inline");
					$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
					j++;
				}
				while(j!=6){
					$("#milestone"+eval("'"+j+"'")).css("display","none");
					j++;
				}
				currentPage=data.num[0].endNum;
				$('.count').text(data.num[0].isNotReadTotal);
			}
		})
	})
	$(document).on('mousedown','.out',function(){
		if(!messageOpen){
			return;
		}
		$('#searchList').css("display","none");	
		$('#SuperBox').css("overflow", "hidden");
		$('.out').remove();
		$('.user').css('display','none');
		$('#SuperBox').css("width", "100px");
		$('#SuperBox').css("height", "20px");
		$(this).test1();
		messageOpen = false;
		
		//61
	})
	$(document).on('mousedown','.delete',function(e){
		e.stopPropagation();
		messageCnt--;
		mCode=$(this).closest('.user').find('.messageCode').text();
	      instance=$(this).closest('.user');
	      $.ajax({
	    	  url:"/TeamProject/message/delete",
	          type:"post",
	          data:{
	             messageCode:mCode//숨겨놓은 메세지 코드 넣으라능,
	          },
	          success:function(data){
	        	 console.log(data);
	        	 if(data.trim()=='yes'){
	        		 instance.remove();
	        		 
	        	 }
	             //암것도 안들어옴 데이터베이스 확인하셈 ㅇㅅㅇ
	          },
	          fail:function(data){
	        	  return;
	          }
	       })
	       console.log(currentPage);
	       $.ajax({
				url:"/TeamProject/message/page",
				type:"post",
				data:{
					currentNum:currentPage,
					type:"select"
				},
				success:function(data){
					console.log(data);
					$('.user').remove();
					if(data.list.length==0){
						currentPage=currentPage-1;
					}
					$.ajax({
						url:"/TeamProject/message/page",
						type:"post",
						data:{
							currentNum:currentPage,
							type:"select"
						},
						success:function(data){
							console.log(data);
							$('.user').remove();
							$.each(data.list, function(index, item) {
								let ul = $('<div>', {class:"user",id : item["senderID"]}).insertBefore($(".milestones"));
								let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//								$('<button>', {class: "reply", id:item["senderID"], text:"답장하기"}).appendTo(div);
								$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
								$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
								$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
								if(item["isNotRead"]==1){
									$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
								}
								if(item["content"].length>30){
									$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
								}
								else{
									$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
								}
								$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
								messageCnt++;
								if(item["isNotRead"]==1){
									$((eval("'#"+item["messageCode"]+"'"))).closest('.user').css("background-","rgb(243, 248, 216)");
								}
							});
							$('.user').css('display','block');	
//							let ul = $('<div>', {class:"milestones"}).appendTo($("#SuperBox"));
//							$('<span>',{class:"milestoneFirst",text:"<<"}).appendTo(ul);
//							$('<span>',{class:"milestoneBefore",text:"<"}).appendTo(ul);
//							for(let i =1;i<=5;i++){
//								$('<span>',{class:"milestone",id:"milestone"+i,text:i}).appendTo(ul);
//							}
//							$('<span>',{class:"milestoneNext",text:">"}).appendTo(ul);
//							$('<span>',{class:"milestoneLast",text:">>"}).appendTo(ul);
							let j=1;
							for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
								$("#milestone"+eval("'"+j+"'")).css("display","inline");
								$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
								j++;
							}
							while(j!=6){
								$("#milestone"+eval("'"+j+"'")).css("display","none");
								j++;
							}
							currentPage=currentPage;
							$('.count').text(data.num[0].isNotReadTotal);
						}
					})
				}
			})
	       
		if(messageCnt==0) {
			$('<div>', {class: "user",text: "수신한 메시지가 없습니다."}).appendTo('.Message');
		}
		
	})
	
	$(document).on('mousedown', '.reply', function() {
		$('.replyBox').css("display", "block");
		$('#receiver').val($(this).closest('.user').attr("id"));
		$('#replyView').val("");
	})
	
	$(document).on('click', '#SuperBox', function() {
		
		if (messageOpen) {
			return;
		}
		else {
			$('#searchList').css("display","none");	
			$('#SuperBox').css("overflow", "auto");
			$('#SuperBox').css("width", "300px");
			$('#SuperBox').css("max-height", "400px");
			$('#SuperBox').css("height", "auto");
			$('.user').css('display','block');
			$('<button>',{class:"out",text:"나가기"}).appendTo($("<div>",{class:"outDiv"}).prependTo(".Message"));
			messageOpen=true;
		}
		
		if(messageCnt==0) {
			$('<div>', {class:"user",text: "수신한 메시지가 없습니다."}).appendTo('.Message');
		}
	});	
	
	$(document).on('click', ".user", function(e) {
		  e.stopPropagation();
	      $('.viewBox').css("display", "inline-block");
	      $('#sender').val($(this).attr("id"));
	      $('#receiveDate').val($(this).children('#date').text());
	      $('#messageView').val($(this).children('.real').text());
	      let str=$(this).children('#userName').text().split(":");
	      let str1=str[1];
	      mCode:$(this).find('.messageCode').text();
	      instance=$(this);
	      $.ajax({
	          url:"/TeamProject/message/isRead",
	          type:"post",
	          data:{
	             messageCode:$(this).find('.messageCode').text()//숨겨놓은 메세지 코드 넣으라능,
	          },
	          success:function(data){
	        	 if(instance.find('.isNotRead').text()=='0'){
	        		 instance.find('.isNotRead').text('1');
	        		 instance.css('background-color','rgb(243, 248, 216)');
	        		 $('.count').text();
	        		 $('.count').text(eval("'"+$('.count').text()+"'")-1);
	        
	        	 }
	             //암것도 안들어옴 데이터베이스 확인하셈 ㅇㅅㅇ
        		 $('#sender').val(str[1]);
	          }
	       })
	})
	
	
	 $(document).on('change','.searchCategory',function(){
		  $('#searchList').css("display","none");
	 })
	 $(document).on('keyup','#searchByCategory',function(key) {
      let selectOption=$('.searchCategory option:selected').val();
      $('#searchList').empty();
      if(selectOption=="byName"){
         $.ajax({
            url: "/TeamProject/member/searchByID",
            type: 'post',
            data:{
               selectOption:$(".searchCategory option:selected").val(),
               keyword:$('#searchByCategory').val()
            },
            success: function(data){
            	console.log(data);
               if(data.length<3){
                  $('#searchList').css("display","none");
                        return ;
                    }
               else{
                  $('#searchList').css("display","block");
                  $('#searchList').empty();
                  $(this).test1();
                  let div = $('<div>').appendTo($('#searchList'));
                  let searchByIDList = $('<div>',{class:"ManList"}).appendTo(div);
                  $('<span>',{id:'leader',text:data}).appendTo(searchByIDList)
                  $('<button>',{id:"invite",text:"초대"}).appendTo(searchByIDList);
                  $('<button>',{id:"whisper",text:"쪽지"}).appendTo(searchByIDList);
                  
               }
            }
         });
         
         
      
         
      }else if(selectOption=="byGroup"){
         console.log("그룹");
         let keyword =$('#searchByCategory').val()
         $.ajax({
            url:"/TeamProject/Group/search",
            type:'post',
            data:{
               groupName:keyword
            },
            success:function(data){
            	console.log(data);
               if(data.leaderNameList.length==0){
                  $('#searchList').css("display","none");
                  return;
               }
               else{
                  $('#searchList').css("display","block");
                  $('#searchList').empty();
                  $(this).test1();
                  for(let i=0;i<data.leaderNameList.length;i++){
                  let div = $('<div>').appendTo($('#searchList'));
                  let searchByGroupList = $('<div>',{class:"ManList"}).appendTo(div);
                  $('<span>',{id:"NameOfGroup",text:keyword}).appendTo(searchByGroupList);
                  $('<span>',{id:'leader',text:data.leaderNameList[i].name}).appendTo(searchByGroupList)
                  $('<button>',{id:"request",text:"가입요청"}).appendTo(searchByGroupList);
                  $('<button>',{id:"whisper",text:"쪽지"}).appendTo(searchByGroupList);
                  }
               }
            }
         })
      } 
    });
	 $(document).on('focus','#searchByCategory',function(key) {
	      let selectOption=$('.searchCategory option:selected').val();
	      $('#searchList').empty();
	      if(selectOption=="byName"){
	         $.ajax({
	            url: "/TeamProject/member/searchByID",
	            type: 'post',
	            data:{
	               selectOption:$(".searchCategory option:selected").val(),
	               keyword:$('#searchByCategory').val()
	            },
	            success: function(data){
	            	console.log(data);
	               if(data.length<3){
	                  $('#searchList').css("display","none");
	                        return ;
	                    }
	               else{
	                  $('#searchList').css("display","block");
	                  $('#searchList').empty();
	                  $(this).test1();
	                  let div = $('<div>').appendTo($('#searchList'));
	                  let searchByIDList = $('<div>',{class:"ManList"}).appendTo(div);
	                  $('<span>',{id:'leader',text:data}).appendTo(searchByIDList)
	                  $('<button>',{id:"invite",text:"초대"}).appendTo(searchByIDList);
	                  $('<button>',{id:"whisper",text:"쪽지"}).appendTo(searchByIDList);
	                  
	               }
	            }
	         });
	         
	         
	      
	         
	      }else if(selectOption=="byGroup"){
	         console.log("그룹");
	         let keyword =$('#searchByCategory').val()
	         $.ajax({
	            url:"/TeamProject/Group/search",
	            type:'post',
	            data:{
	               groupName:keyword
	            },
	            success:function(data){
	            	console.log(data);
	               if(data.leaderNameList.length==0){
	                  $('#searchList').css("display","none");
	                  return;
	               }
	               else{
	                  $('#searchList').css("display","block");
	                  $('#searchList').empty();
	                  $(this).test1();
	                  for(let i=0;i<data.leaderNameList.length;i++){
	                  let div = $('<div>').appendTo($('#searchList'));
	                  let searchByGroupList = $('<div>',{class:"ManList"}).appendTo(div);
	                  $('<span>',{id:"NameOfGroup",text:keyword}).appendTo(searchByGroupList);
	                  $('<span>',{id:'leader',text:data.leaderNameList[i].name}).appendTo(searchByGroupList)
	                  $('<button>',{id:"request",text:"가입요청"}).appendTo(searchByGroupList);
	                  $('<button>',{id:"whisper",text:"쪽지"}).appendTo(searchByGroupList);
	                  }
	               }
	            }
	         })
	      } 
	    });	
	
	
	
	
var ID;


$(document).on('click','#replyAtReply',function(){
 	 let con=$(this).closest('.replyBox').find('.replyView').val();
 	 console.log(ID);
 	 console.log(con);
 	 $.ajax({
 			url:"/TeamProject/message/send",
 			type:"post",
 			data:{
 				receiverID:ID, //받는 사람이요!
 				content:con,//내용적어주세요 ><
 				type:'normal'

 			},
 			success:function(data){
 				console.log(data);
 				if(data.trim()=='yes'){ 	
 					ws.send(ID);
 				}
 			}

 		})
  });
	$(document).on('mousedown','#whisper',function(e){

		e.preventDefault();
		e.stopPropagation();
		ID=$(this).siblings('#leader').text().trim();
		console.log(ID);
		$('.replyBox').css('display','block')
		$('#receiver').val(ID);


	})
   
//------------------------------------------------------
	$(document).on('click','#inviteAcceptBtn',function(e){
		e.preventDefault();
		e.stopPropagation();
		let instance=$(this).closest('.user');
		let text1=$(this).closest('.user').find('#userName').text().split(':');
		let ID=text1[1];
		let text2=instance.find('#content').text().split("'");
		let gName=text2[3];
		let mCode=instance.find('.messageCode').text()
		console.log(ID);
		console.log(gName);
		console.log(mCode);
		$.ajax({
			url:"/TeamProject/message/send",
			type:"post",
			data:{
				receiverID:ID, //받는 사람이요!
				groupName:gName,
				type:'inviteAccept',     
				messageCode:mCode

			},
			success:function(data){
				if(data='yes'){
					$.ajax({
						url:"/TeamProject/message/page",
						type:"post",
						data:{
							currentNum:currentPage,
							type:"select"
						},
						success:function(data){
							console.log(data);
							$('.user').remove();
							$.each(data.list, function(index, item) {
								messageCnt++;
								
								let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
								let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//								$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
								$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
								$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
								$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
								let text0=item['content'];
								let text1=text0.split(' ');
								if(text1[0]=='<div'){
									text0=$.parseHTML(text0);
									console.log(text1[1]);
									if(text1[1].trim()=="id='"+"invite'"){
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else if(text1[1].trim()=="id='"+"request'"){
										console.log("d");
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else{
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
								}
								else{
									text0=item['content'];
									console.log(text0);
									$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
									if(item["content"].length>30){
										$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
									}
									else{
										$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
									}
								}
								console.log(text0);
								
								
								if(item["isNotRead"]==1){
									console.log(item['isNotRead']);
									$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
								}
								
								$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
								messageCnt++;
							});
							$('.user').css('display','block');
							let j=1;
							for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
								$("#milestone"+eval("'"+j+"'")).css("display","inline");
								$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
								j++;
							}
							while(j!=6){
								$("#milestone"+eval("'"+j+"'")).css("display","none");
								j++;
							}
							$('.count').text(data.num[0].isNotReadTotal);
						}
					})
					ws.send(ID);
				}
			}
		})
	})
	$(document).on('click','#inviteRefuseBtn',function(e){
		e.preventDefault();
		e.stopPropagation();
		let instance=$(this).closest('.user');
		let text1=$(this).closest('.user').find('#userName').text().split(':');
		let ID=text1[1];
		let text2=instance.find('#content').text().split("'");
		let gName=text2[3];
		let mCode=instance.find('.messageCode').text()
		console.log(ID);
		console.log(gName);
		console.log(mCode);
		$.ajax({
			url:"/TeamProject/message/send",
			type:"post",
			data:{
				receiverID:ID, //받는 사람이요!
				groupName:gName,
				type:'inviteRefuse',    
				messageCode:mCode

			},
			success:function(data){
				console.log(data);
				if(data='yes'){
					$.ajax({
						url:"/TeamProject/message/page",
						type:"post",
						data:{
							currentNum:currentPage,
							type:"select"
						},
						success:function(data){
							console.log(data);
							$('.user').remove();
							$.each(data.list, function(index, item) {
								messageCnt++;
								
								let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
								let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//								$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
								$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
								$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
								$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
								let text0=item['content'];
								let text1=text0.split(' ');
								if(text1[0]=='<div'){
									text0=$.parseHTML(text0);
									console.log(text1[1]);
									if(text1[1].trim()=="id='"+"invite'"){
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else if(text1[1].trim()=="id='"+"request'"){
										console.log("d");
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else{
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
								}
								else{
									text0=item['content'];
									console.log(text0);
									$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
									if(item["content"].length>30){
										$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
									}
									else{
										$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
									}
								}
								console.log(text0);
								
								
								if(item["isNotRead"]==1){
									console.log(item['isNotRead']);
									$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
								}
								
								$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
								messageCnt++;
							});
							$('.user').css('display','block');
							let j=1;
							for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
								$("#milestone"+eval("'"+j+"'")).css("display","inline");
								$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
								j++;
							}
							while(j!=6){
								$("#milestone"+eval("'"+j+"'")).css("display","none");
								j++;
							}
							$('.count').text(data.num[0].isNotReadTotal);
						}
					})
					ws.send(ID);
				}
			}
		})
	})
	$(document).on('click','#requestAcceptBtn',function(e){
		e.preventDefault();
		e.stopPropagation();
		let instance=$(this).closest('.user');
		let text1=$(this).closest('.user').find('#userName').text().split(':');
		let ID=text1[1];
		let text2=instance.find('#content').text().split("'");
		let gName=text2[3];
		let mCode=instance.find('.messageCode').text()
		console.log(ID);
		console.log(gName);
		console.log(mCode);
		$.ajax({
			url:"/TeamProject/message/send",
			type:"post",
			data:{
				receiverID:ID, //받는 사람이요!
				groupName:gName,
				type:'requestAccept',    
				messageCode:mCode

			},
			success:function(data){
				if(data='yes'){
					$.ajax({
						url:"/TeamProject/message/page",
						type:"post",
						data:{
							currentNum:currentPage,
							type:"select"
						},
						success:function(data){
							console.log(data);
							$('.user').remove();
							$.each(data.list, function(index, item) {
								messageCnt++;
								
								let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
								let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//								$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
								$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
								$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
								$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
								let text0=item['content'];
								let text1=text0.split(' ');
								if(text1[0]=='<div'){
									text0=$.parseHTML(text0);
									console.log(text1[1]);
									if(text1[1].trim()=="id='"+"invite'"){
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else if(text1[1].trim()=="id='"+"request'"){
										console.log("d");
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else{
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
								}
								else{
									text0=item['content'];
									console.log(text0);
									$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
									if(item["content"].length>30){
										$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
									}
									else{
										$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
									}
								}
								console.log(text0);
								
								
								if(item["isNotRead"]==1){
									console.log(item['isNotRead']);
									$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
								}
								
								$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
								messageCnt++;
							});
							$('.user').css('display','block');
							let j=1;
							for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
								$("#milestone"+eval("'"+j+"'")).css("display","inline");
								$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
								j++;
							}
							while(j!=6){
								$("#milestone"+eval("'"+j+"'")).css("display","none");
								j++;
							}
							$('.count').text(data.num[0].isNotReadTotal);
						}
					})
					ws.send(ID);
				}	
			}
		})
	})
	$(document).on('click','#requestRefuseBtn',function(e){
		e.preventDefault();
		e.stopPropagation();
		let instance=$(this).closest('.user');
		let text1=$(this).closest('.user').find('#userName').text().split(':');
		let ID=text1[1];
		let text2=instance.find('#content').text().split("'");
		let gName=text2[3];
		let mCode=instance.find('.messageCode').text()
		console.log(ID);
		console.log(gName);
		console.log(mCode);
		$.ajax({
			url:"/TeamProject/message/send",
			type:"post",
			data:{
				receiverID:ID, //받는 사람이요!
				groupName:gName,
				type:'requestRefuse',     
				messageCode:mCode

			},
			success:function(data){
				if(data='yes'){
					$.ajax({
						url:"/TeamProject/message/page",
						type:"post",
						data:{
							currentNum:currentPage,
							type:"select"
						},
						success:function(data){
							console.log(data);
							$('.user').remove();
							$.each(data.list, function(index, item) {
								messageCnt++;
								
								let ul = $('<div>', {class:"user",id : item["sender"]}).insertBefore($(".milestones"));
								let div = $('<div>', {id : "userName",text: "작성자 :"+ item["senderID"]}).appendTo(ul);
//								$('<button>', {class: "reply", id:item["sender"], text:"답장하기"}).appendTo(div);
								$('<button>',{class:"delete",id:item["senderID"],text:"삭제하기"}).prependTo(div);
								$('<span>',{class:"messageCode",id:"messageCode"+item["messageCode"],text:item["messageCode"]}).appendTo(ul);
								$('<span>',{class:"isNotRead",id:"isNotRead"+item["messageCode"],text:item["isNotRead"]}).appendTo(ul);
								let text0=item['content'];
								let text1=text0.split(' ');
								if(text1[0]=='<div'){
									text0=$.parseHTML(text0);
									console.log(text1[1]);
									if(text1[1].trim()=="id='"+"invite'"){
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else if(text1[1].trim()=="id='"+"request'"){
										console.log("d");
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
									else{
										$('<span>',{class:"real",id:"real"+item["messageCode"],html:text0}).appendTo(ul);
										$('<div>', {id : "content",html: text0}).appendTo(ul);
									}
								}
								else{
									text0=item['content'];
									console.log(text0);
									$('<span>',{class:"real",id:"real"+item["messageCode"],text:text0}).appendTo(ul);
									if(item["content"].length>30){
										$('<div>', {id : "content",text: item["content"].substring(0,30)+"..."}).appendTo(ul);
									}
									else{
										$('<div>', {id : "content",text: item["content"]}).appendTo(ul);
									}
								}
								console.log(text0);
								
								
								if(item["isNotRead"]==1){
									console.log(item['isNotRead']);
									$((eval("'#isNotRead"+item["messageCode"]+"'"))).closest('.user').css("background-color","rgb(243, 248, 216)");
								}
								
								$('<div>', {id : "date",text: item["date"]}).appendTo(ul);
								messageCnt++;
							});
							$('.user').css('display','block');
							let j=1;
							for(let i=data.num[0].startNum;i<=data.num[0].endNum;i++){
								$("#milestone"+eval("'"+j+"'")).css("display","inline");
								$("#milestone"+eval("'"+j+"'")).text(eval("'"+i+"'"));
								j++;
							}
							while(j!=6){
								$("#milestone"+eval("'"+j+"'")).css("display","none");
								j++;
							}
							$('.count').text(data.num[0].isNotReadTotal);
						}
					})
					ws.send(ID);
				}
			}
		})
	})
//-------------------------------------------------------	
	
	
	
	
	
	
	
	$(document).on('mousedown','#request',function(){
		let ID=$(this).siblings('#leader').text();
		let NOG=$(this).siblings('#NameOfGroup').text();
		console.log(ID);
		console.log(NOG);
		$.ajax({
			   url:"/TeamProject/message/send",
			   type:"post",
			   data:{
			      receiverID:ID, //받는 사람이요!
			      groupName:NOG,
			      type:'request'     

			   },
			   success:function(data){
				  console.log(data);
			      if(data='yes'){
			         ws.send(ID);
			      }
			      else{
			         //자기 자신에게 가입을 요청할 수 없습니다. 창 띄우기 확인 누르면 탈출
			      }
			   }
		})
	})
   $(document).on('click','#searchBtn',function(key) {
      if($(".searchCategory option:selected").val()==null){
         return; 
      }
       $.ajax({
         url: "/TeamProject/member/searchByID",
         type: 'post',
         data:{
            selectOption:$(".searchCategory option:selected").val(),
            keyword:$('#searchByCategory').val()
         },
         success: function(data){
            console.log(data);
            if(data==''){
               console.log(data);
               return;
            }
            else{
               $('#searchList').empty();
               $(this).test1();
               let div = $('<div>').appendTo($('#searchList'));
               let searchByIDList = $('<div>',{class:"ManList",text:data}).appendTo(div);
               $('<button>',{id:"invite",text:"초대"}).appendTo(searchByIDList);
               $('<button>',{id:"whisper",text:"쪽지"}).appendTo(searchByIDList);
            }
         }
      });
        
    });

	
	 $.fn.test1=function(){  
         let hei =$('.searchCategory').offset().top;
         let wid =$('.searchCategory').offset().left;
         $('#searchList').offset( { left: wid+135, top: hei+24} );
         $('#searchList').css("display","block");
 
     }  
	 $.fn.test2=function(){  
         let hei =$('.searchCategory').offset().top;
         let wid =$('.searchCategory').offset().left;
         $('#searchList').offset( { left: wid+335, top: hei+24} );
         $('#searchList').css("display","block");
	 }

	 $(document).on('click', '#invite', function() {
		 let receiverID1 = $('#searchByCategory').val();
         $('#dynamicMessage').empty();
         $('.indexPopup').css("display", "block");
         $('<li>', {text:"초대하실 그룹명을 입력하시오"}).appendTo('#dynamicMessage');
         $('#indexPopupCancelBtn').one("mousedown",function(){
        	 $('#indexPopupOkayBtn').off("mousedown");
         })
         $('#indexPopupOkayBtn').one("mousedown",function() {
             console.log($('.searchCategory option:selected').val().trim()!='byGroup');
//             if($('.searchCategory option:selected').val().trim()!='byGroup'){
//             	return;
//             }
             let group = $('#indexPopupText').val();
             console.log(group);
             console.log(receiverID1);
             $.ajax ({
                url: '/TeamProject/message/searchLeaderGroup',
                type: "post",
                data: {
                   groupName: group 
                },
                success: function(data) {
                   console.log(data);
                   if(data.trim()=="yes") {
                 	
           			$.ajax({
         				url:"/TeamProject/message/send",
         				type:"post",
         				data:{
         					receiverID :receiverID1, //받는 사람이요!
         					groupName:group,// 	
         					type:'invite'
         				},
         				success:function(data){
         					console.log(data);
         					if(data.trim()=="yes"){
         						console.log(1);
         						$('.indexPopup').css("display", "none");
         					 	ws.send(receiverID1);
         					}else{
             					console.log(2);
         				        $('#dynamicMessage2').empty();
         		                 $('<li>', {text:"자기 자신에게 가입을 요청할 수 없습니다."}).appendTo('#dynamicMessage2');
         		                 $('.indexMessagePopup').css("display", "block");
         						
         					}
         				}
         			
         			})
                   }
                   else if (data.trim()=="no") {
                      $('#dynamicMessage2').empty();
                      $('<li>', {text:"해당 그룹에 속해있지 않거나 그룹이 존재하지 않습니다."}).appendTo('#dynamicMessage2');
                      $('.indexMessagePopup').css("display", "block");
                   }
                }
             })
          })

  
     })
 

})
