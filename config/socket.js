const socketIO = require('socket.io');
const { addNotificationData, addNotificationDataByUserRole, updateRecordConfirmOrderNotification, getNotificationDataBySocket } = require('../controllers/notifiController');
const { getAllByLocationSocket } = require('../controllers/orderController');
const { getWorkShiftByTime } = require('../controllers/workShifltController');

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
        socket.on('myEvent', async(data) => {
          var thoiGianHienTai = new Date()
           let responseEmployee = { 
              message: `Có một thông báo mới từ bàn số ${data.tableNumber}`, 
              dateTime: thoiGianHienTai,
              locationUser: data?.location
            };
            console.log(data,'dataConfirm');
            // let response = { message:'Món của bạn đã đặt thành công', dateTime: thoiGianHienTai};
            // await addNotificationDataByUserRole(data, `Có một thông báo mới từ bàn số ${data.tableNumber}`)
            await addNotificationData(data,`Đang chờ nhân viên xác nhận`)
           let result = await getNotificationDataBySocket(data?.location)
            io.to('room').emit('response', 'Đang chờ nhân viên xác nhận');
            io.to('room').emit('responseEmployee', result);
          
        });
        socket.on('getProductOrder', async(data) => {
          let result = await getAllByLocationSocket(data)
          io.to('room').emit('resProductOrder', result);
        })
        socket.on('getItemNotification', async(data) => {
          let result = await updateRecordConfirmOrderNotification(data.idItem, data)
          io.to('room').emit('resAllItemNotification', result);
        })
        socket.on('afterUserLogin', async(data) => {
          // data : userId: 123123123123, workShiftId: 2432423423, thời gian đăng nhập: 12:30, is_Page: 'user_login_workshift'
          // lấy tất cả các ca làm việc theo thời gian
          let resultAllWorkShift = await getWorkShiftByTime(data?.time) // { id, name: ca, starttime, endtime }
          if(resultAllWorkShift) {
            let newNoti = await addNotificationDataByUserRole({...data, workShiftId: resultAllWorkShift.id}, 'Có một thông báo mới')
            io.to('room').emit('ResponseAfterUserLogin', newNoti.data);
          }
        })
        // disconnected 
        socket.on('disconnect', () => {
            console.log('A client disconnected');
        });
        // Thêm sự kiện để gửi và nhận tin nhắn chat trong phòng
        socket.on('chatMessage', (messageData) => {
          // Lấy thông tin người gửi và tin nhắn
          const {  text } = messageData;
          console.log(messageData,'messageData');
          // Gửi tin nhắn đến tất cả các người dùng trong phòng
          io.to('room').emit('message', { text});
      });
        socket.join('room');
      });
};

module.exports = {
  init,
  io,
};
