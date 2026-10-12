// Cấu hình trang web Bonnievale Online - sửa file này khi có bản mới, link Discord, email liên hệ.
window.SITE = {
  // Bản tester hiện tại. Để downloadUrl rỗng ("") thì nút tải hiện "Sắp mở".
  version: "",
  released: "",
  downloadUrl: "",
  downloadSize: "",

  // Link mời Discord của chủ game. Rỗng thì nút Join Discord ẩn.
  discordUrl: "https://discord.gg/7A4B6aYnDU",

  // Email nhận câu hỏi về dữ liệu cá nhân (trang Quyền riêng tư). Rỗng thì trang ghi "qua Discord".
  contactEmail: "",

  // Video gameplay (mục Video và tab hai xứ). src rỗng thì hiện ảnh poster kèm chữ "Đang quay".
  // hero: video nền đầu trang (tắt tiếng, lặp).
  videos: [
    { id: "hero", title: "Meowmont đông người", src: "", poster: "img/shots/hero_meowmont.png" },
    { id: "plaza", title: "Quảng trường Meowmont", src: "video/plaza.mp4", poster: "video/plaza.jpg", grid: false },
    { id: "farm", title: "Gieo, tưới, thu hoạch", src: "", poster: "img/shots/farm.png" },
    { id: "fair", title: "Hội Chợ Quả Sồi", src: "", poster: "img/shots/fair.png" },
    { id: "barkridge", title: "Barkridge mùa tuyết", src: "", poster: "img/shots/highroad.png" },
    { id: "deepwell", title: "Xuống Giếng Sâu", src: "", poster: "img/shots/deepwell.png" },
    { id: "party", title: "Tổ bốn người đánh Hộ Vệ", src: "", poster: "img/shots/party.png" },
    { id: "boss", title: "Boss săn chung", src: "", poster: "img/shots/heartwood5.png" },
  ],

  // Ghi chú phiên bản, bản mới nhất ở trên cùng (giọng ấm, ngắn, ghi điều người chơi thấy).
  // { version, date, intro, fixed: [], changed: [], todo: [] }
  news: [],
};
