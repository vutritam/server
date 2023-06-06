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
    let arr =[]
    
    // connected
    io.on('connection', (socket) => {
        console.log('A client connected');    
        socket.on('myEvent', (data) => {
        // Lấy thời gian hiện tại
        var thoiGianHienTai = new Date()

        // Lấy giờ, phút và giây
        var gio = thoiGianHienTai.getHours()
        var phut = thoiGianHienTai.getMinutes()
        var giay = thoiGianHienTai.getSeconds()
        var gioPhutGiay = gio + ':' + phut + ':' + giay
        let response
           // Gửi phản hồi về cho khách hàng
            response = { noti:'Món của bạn đã đặt thành công', time: gioPhutGiay};
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
