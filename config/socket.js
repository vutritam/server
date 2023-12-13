const socketIO = require("socket.io");
const {
  addNotificationData,
  addNotificationDataByUserRole,
  updateRecordConfirmOrderNotification,
  getNotificationDataBySocket,
} = require("../controllers/notifiController");
const {
  getAllByLocationSocket,
  getAllOrderByLocationSocket,
  createNewOrder,
} = require("../controllers/orderController");
const { getWorkShiftByTime } = require("../controllers/workShifltController");

let io;

// Hàm khởi tạo Socket.IO và lắng nghe kết nối
const init = (server) => {
  // handle cors
  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
    },
  });

  // connected
  io.on("connection", (socket) => {
    socket.on("joinRoom", (roomName) => {
      socket.join(roomName);
      console.log("Joined room:", roomName);
    });

    socket.on("myEvent", async (data) => {
      const tableNumberlocationRoom = `room-${data.tableNumber}-${data?.location}`;
      const locationRoom = `room-${data?.location}`;

      let newData= await createNewOrder(data);
    
      if(newData){
        let result = await getAllOrderByLocationSocket(
          data.tableNumber,
          data?.location
        );
        let resultEmployee = await getAllByLocationSocket(data);
        io.to(tableNumberlocationRoom).emit("response", result);
        io.to(locationRoom).emit("responseEmployee", resultEmployee);
      }
      
    });
    socket.on("getAllOrderByStatus", async (data) => {
      const { tableNumber, location } = data;
      const roomName = `room-${tableNumber}-${location}`;
      const locationRoom = `room-${data?.location}`;
      let result = await getAllOrderByLocationSocket(tableNumber, location);
      let resultEmployee = await getAllByLocationSocket(data);
      io.to(roomName).emit("resAllOrderByStatus", result);
      io.to(locationRoom).emit("responseEmployee", resultEmployee);
    });
    socket.on("getProductOrder", async (data) => {
      const locationRoom = `room-${data?.location}`;
      let result = await getAllByLocationSocket(data);
      io.to(locationRoom).emit("resProductOrder", result);
    });
    // socket.on("getItemNotification", async (data) => {
    //   let result = await updateRecordConfirmOrderNotification(
    //     data.idItem,
    //     data
    //   );
    //   io.to("room").emit("resAllItemNotification", result);
    // });
    socket.on("afterUserLogin", async (data) => {
      // data : userId: 123123123123, workShiftId: 2432423423, thời gian đăng nhập: 12:30, is_Page: 'user_login_workshift'
      // lấy tất cả các ca làm việc theo thời gian
      let resultAllWorkShift = await getWorkShiftByTime(data?.time); // { id, name: ca, starttime, endtime }
      if (resultAllWorkShift) {
        let newNoti = await addNotificationDataByUserRole(
          { ...data, workShiftId: resultAllWorkShift.id },
          "Có một thông báo mới"
        );
        io.to("room").emit("ResponseAfterUserLogin", newNoti.data);
      }
    });
    // disconnected
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
  });
};

module.exports = {
  init,
  io,
};
