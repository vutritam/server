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
const l10n = require("../L10N/en.json");
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
      const tableNumberlocationRoom = `room-${data.tableNumber}-${data?.locationId}`;
      const locationRoom = `room-${data?.locationId}`;
      let newData = await createNewOrderController(data);
      console.log(locationRoom,'newData');
      if(newData?.success){
        let result = await getAllOrderByLocationSocketController(
          data.tableNumber,
          data?.locationId
        );
        let resultEmployee = await getAllByLocationSocketController(data);
        io.to(tableNumberlocationRoom).emit(ResponseType.ResponseUserOrder, result);
        io.to(locationRoom).emit(ResponseType.ResponseEmployee, resultEmployee);
      } else {
        io.to(tableNumberlocationRoom).emit(ResponseType.ResponseUserOrder, {
            success: newData.success,
            statusCode: newData.statusCode,
            message: newData.message,
            data: [],
        });
      }
    });

    socket.on(ResponseType.GetAllOrderByStatus, async (data) => {
      const { tableNumber, locationId } = data;
      const roomName = `room-${tableNumber}-${locationId}`;
      const locationRoom = `room-${data?.locationId}`;
      let result = await getAllOrderByLocationSocketController(tableNumber, locationId);
      let resultEmployee = await getAllByLocationSocketController(data);
      io.to(roomName).emit(ResponseType.ResponseOrderStatus, result);
      io.to(locationRoom).emit(ResponseType.ResponseEmployee, resultEmployee);
    });

    socket.on(ResponseType.GetProductOrder, async (data) => {
      const locationRoom = `room-${data?.locationId}`;
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
          l10n['socket.message.HasNotification']
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
