// Cấu hình trang web Bonnievale Online - sửa file này khi có bản mới, link Discord, email liên hệ.
window.SITE = {
  // Bản tester hiện tại. Để downloadUrl rỗng ("") thì nút tải hiện "Sắp mở".
  version: "0.4.0",
  released: "12/10/2026",
  downloadUrl: "https://github.com/butastudio/bonnievale/releases/download/v0.4.0/Bonnievale_Tester_0.4.0.zip",
  downloadSize: "198 MB",

  // Link mời Discord của chủ game. Rỗng thì nút Join Discord ẩn.
  discordUrl: "https://discord.gg/7A4B6aYnDU",

  // Email nhận câu hỏi về dữ liệu cá nhân (trang Quyền riêng tư). Rỗng thì trang ghi "qua Discord".
  contactEmail: "friendsbuta@gmail.com",

  // Video gameplay (mục Video và tab hai xứ). src rỗng thì hiện ảnh poster kèm chữ "Đang quay".
  // hero: video nền đầu trang (tắt tiếng, lặp).
  videos: [
    { id: "plaza", title: "Meowmont đông người", src: "video/hero.mp4", poster: "video/hero.jpg", grid: false },
    { id: "farm", title: "Gieo, tưới, thu hoạch", src: "video/farm.mp4", poster: "video/farm.jpg" },
    { id: "fair", title: "Đua Lá ở Hội Chợ Quả Sồi", src: "video/fair.mp4", poster: "video/fair.jpg" },
    { id: "barkridge", title: "Barkridge mùa tuyết", src: "video/barkridge.mp4", poster: "video/barkridge.jpg" },
    { id: "deepwell", title: "Đi thang xuống Giếng Sâu", src: "video/deepwell.mp4", poster: "video/deepwell.jpg" },
    { id: "party", title: "Tổ bốn người đánh Hộ Vệ", src: "video/party.mp4", poster: "video/party.jpg" },
    { id: "boss", title: "Gã Khổng Lồ Đất Rạn", tag: "Sắp có (Vòng 2)", src: "video/boss.mp4", poster: "video/boss.jpg" },
  ],

  // Ghi chú phiên bản, bản mới nhất ở trên cùng (giọng ấm, ngắn, ghi điều người chơi thấy).
  // { version, date, intro, fixed: [], changed: [], todo: [] }
  news: [
    { version: "0.4.0", date: "12/10/2026", intro: "Bản tester online đầu tiên. Cần mạng và một mã mời để tạo tài khoản.",
      changed: ["Chơi chung với người khác: gặp nhau trên bản đồ, chat, lập tổ tới 4 người.", "Tài khoản và mã mời, ghi nhớ đăng nhập trên máy.", "Chọn quê Xứ Mèo hoặc Xứ Chó, mỗi xứ một cốt truyện.", "Boss cốt truyện đánh trong thế giới riêng của bạn và tổ đội.", "Sách Kỹ Năng (O), bản đồ thế giới mới, giờ trong game chạy theo máy chủ."] },
  ],
};
