// 安装express基础版本
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('../..')(server);
var port = process.env.PORT || 80;

// 加载File System读写模块
var fs = require('fs');
// 加载编码转换模块
var iconv = require('iconv-lite'); 

// 写日志方法
var writeFile = function (str){
	
	var nowDate = new Date();
	var fileName = nowDate.getFullYear()+''+(nowDate.getMonth()+1)+''+nowDate.getDate()+'.log';
    // 把中文转换成字节数组
    var arr = iconv.encode(nowDate.toLocaleTimeString()+'\t'+str+'\r\n', 'gbk');
    
    // appendFile，如果文件不存在，会自动创建新文件
    // 如果用writeFile，那么会删除旧文件，直接写新文件
    fs.appendFile(fileName, arr, function(err){
        if(err)
            console.log("fail " + err);
    });
}

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// 路由路径
app.use(express.static(__dirname + '/public'));

// 聊天室

// 当前在线的用户
var usernames = {};
var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  // 客户端发起'new message'时的监听
  socket.on('new message', function (data) {
    // 广播告诉客户端执行'new message'
    socket.broadcast.emit('new message', {
      username: socket.username,
      message: data
    });
	writeFile(socket.username+':'+data);
  });

  // 客户端发起'add user'时的监听
  socket.on('add user', function (username) {
    // 把客户端的昵称存到socket的session
    socket.username = username;
    // 把新用户的昵称加入全局列表
    usernames[username] = username;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    // 把有人新上线的信息回显给全员（每一个在线用户）
    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    });
  });

  // 当一个用户触发'typing'时,把消息广播给其他人'XX 正在输入'
  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username
    });
  });

  // 当一个用户触发'stop typing'时,把消息广播给其他人,隐藏'XX 正在输入'
  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username
    });
  });

  // 有人离线时的'disconnect'监听
  socket.on('disconnect', function () {
    // 从全局列表里移除该人
    if (addedUser) {
      delete usernames[socket.username];
      --numUsers;

      // 广播告诉全员这个人离线了
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});
