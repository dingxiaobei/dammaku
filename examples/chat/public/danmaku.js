
//这就是弹幕管理器
var cm = new CommentManager($('commentCanvas'));
cm.init();

var tmr=0;
var start=0;
var playhead = 0;

//停止弹幕，暂时没用到
function stop(){
	cm.stopTimer();
	clearTimeout(tmr);
}

//启动弹幕程序
function resume(){
	cm.startTimer();
	start = new Date().getTime() - playhead;
	tmr = setInterval(function(){
		playhead = new Date().getTime() - start;
		cm.time(playhead);
	}, 10);
}

//Σ( ° △ °|||)︴ 这个我也不知道是什么方法，没理解，就从ccl组件里抄过来了
var how = function(a,b){if(a.bottom<b.bottom){return-1;}else if(a.bottom==b.bottom){return 0;}else{return 1;}};
//发送弹幕消息参数1是消息正文，参数2是用户对应的颜色
//还可以增加各种打着滚变着形的参数来启用高级弹幕哦
function sendMsg(text,color){
	var data = {};
	data.x=Math.random()*100;
	data.y=Math.random()*100;
	data.text =text;
	data.date =1307940958;
	data.mode =1;
	//data.pool =0;
	data.stime=1000;
	//data.duration=10000;
	//data.border=false;
	data.color=color;
	cm.timeline.binsert(data,how);
}

//烂尾现场
dmfmd = 'bilibili';
cm.clear();
start = 0;

try{
	clearTimeout(tmr);
}catch(e){}

//开始弹幕程序
resume();