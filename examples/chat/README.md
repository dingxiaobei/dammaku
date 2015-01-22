
# Socket.IO Chat
本身就是官方的示例，我修改了一下
A simple chat demo for socket.io

## How to use
下面就是使用说明了，启动后监听了80端口，直接可以访问自己ip，跟局域网的其他人一起测试。
```
$ cd socket.io
$ npm install
$ cd examples/chat
$ npm install
$ node .
```

And point your browser to `http://localhost`. Optionally, specify
a port by supplying the `PORT` env variable.

## Features

- Multiple users can join a chat room by each entering a unique username
on website load.
- Users can type chat messages to the chat room.
- A notification is sent to all users when a user joins or leaves
the chatroom.
