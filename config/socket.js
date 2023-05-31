const socketIO = require('socket.io');

let io;

// Hàm khởi tạo Socket.IO và lắng nghe kết nối
const init = (server) => {
    // handle cors
    const io = socketIO(server, {
        cors: {
          origin: "http://localhost:3000",
          methods: ["GET", "POST"]
        }
    });
    // connected
    io.on('connection', (socket) => {
        console.log('A client connected');
        socket.on('myEvent', (data) => {
          console.log('Received event from client:', data);
          let arr =[]
          let response
           // Gửi phản hồi về cho khách hàng
             response='Món của bạn đã đặt thành công';
            arr.push(response)
            socket.emit('response', arr);
        });

        // disconnected 
        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
      });
};

module.exports = {
  init,
  io,
};
