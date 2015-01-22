
//定义变量
var g_blinkid = 0;
var g_blinkswitch = 0;
var g_blinktitle = document.title;
var CurrentActive = true;

//新消息提示，就是闪动浏览器标题
function blinkNewMsg()
{
	 document.title = g_blinkswitch % 2==0 ? "【　　　】 - " + g_blinktitle : "【新消息】 - " + g_blinktitle;
	 g_blinkswitch++; 
}

//判断是否应该启动新消息提示方法
function newMsgNotice() {
	//事故高发路段预警
	//Firefox曾经在第二个if处反应错误，将false判断为正确执行进入了大括号，
	//怀疑是onfocus多次监听导致，没有验证，立此存疑
	if(!CurrentActive){
		if(!g_blinkid){
			g_blinkid = setInterval(blinkNewMsg, 1000);
		}
	}
}
 
//结束新消息提示
function stopBlinkNewMsg()
{
    if (g_blinkid)
    {
        clearInterval(g_blinkid);
        g_blinkid = 0;
        document.title = g_blinktitle;
    }
}

//窗体激活时 结束提醒
window.onfocus = function() {
        CurrentActive = true;
		stopBlinkNewMsg();
}
window.onblur = function() {
        CurrentActive = false;
}