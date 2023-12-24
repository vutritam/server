const socketIO = require("socket.io");
const {
  addNotificationDataByUserRole
} = require("../controllers/notifiController");
const {
  getAllByLocationSocketController,
  getAllOrderByLocationSocketController,
  createNewOrderController,
} = require("../controllers/orderController");
const { getWorkShiftByTime } = require("../controllers/workShifltController");
const { ResponseType } = require("../constants/constantEnum");

let io;

// Hàm khởi tạo Socket.IO và lắng nghe kết nối
const init = (server) => {
  // handle cors
  const CLIENT_PORT = process.env.ENV_CLIENT_CONNECT
  const io = socketIO(server, {
    cors: {
      origin: CLIENT_PORT,
      methods: ["GET", "POST"],
    },
  });

  // connected
  io.on(ResponseType.Connection, (socket) => {
    socket.on(ResponseType.JoinRoom, (roomName) => {
      socket.join(roomName);
      console.log("Joined room:", roomName);
    });

    socket.on(ResponseType.MyEvent, async (data) => {
      const tableNumberlocationRoom = `room-${data.tableNumber}-${data?.location}`;
      const locationRoom = `room-${data?.location}`;

      let newData= await createNewOrderController(data);
    
      if(newData){
        let result = await getAllOrderByLocationSocketController(
          data.tableNumber,
          data?.location
        );
        let resultEmployee = await getAllByLocationSocketController(data);
        io.to(tableNumberlocationRoom).emit(ResponseType.ResponseUserOrder, result);
        io.to(locationRoom).emit(ResponseType.ResponseEmployee, resultEmployee);
      }
      
    });
    socket.on(ResponseType.GetAllOrderByStatus, async (data) => {
      const { tableNumber, location } = data;
      const roomName = `room-${tableNumber}-${location}`;
      const locationRoom = `room-${data?.location}`;
      let result = await getAllOrderByLocationSocketController(tableNumber, location);
      let resultEmployee = await getAllByLocationSocketController(data);
      io.to(roomName).emit(ResponseType.ResponseOrderStatus, result);
      io.to(locationRoom).emit(ResponseType.ResponseEmployee, resultEmployee);
    });
    socket.on(ResponseType.GetProductOrder, async (data) => {
      const locationRoom = `room-${data?.location}`;
      let result = await getAllByLocationSocketController(data);
      io.to(locationRoom).emit(ResponseType.ResProductOrder, result);
    });
    socket.on(ResponseType.AfterUserLogin, async (data) => {
      // data : userId: 123123123123, workShiftId: 2432423423, thời gian đăng nhập: 12:30, is_Page: 'user_login_workshift'
      // lấy tất cả các ca làm việc theo thời gian
      let resultAllWorkShift = await getWorkShiftByTime(data?.time); // { id, name: ca, starttime, endtime }
      if (resultAllWorkShift) {
        let newNoti = await addNotificationDataByUserRole(
          { ...data, workShiftId: resultAllWorkShift.id },
          "Có một thông báo mới"
        );
        io.to(ResponseType.Room).emit(ResponseType.ResponseAfterUserLogin, newNoti.data);
      }
    });
    // disconnected
    socket.on(ResponseType.Disconnect, () => {
      console.log("A client disconnected");
    });
  });
};

module.exports = {
  init,
  io,
};
