const multer = require('multer');

// Khởi tạo đối tượng multer
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // Giới hạn kích thước file
  fileFilter: (req, file, cb) => {
    // Kiểm tra loại file, ví dụ chỉ cho phép upload hình ảnh
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed'));
    }
  },
});

module.exports = upload;
