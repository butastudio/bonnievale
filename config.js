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
    { id: "hero", title: "Quảng trường Meowmont", src: "video/hero_bg.mp4", poster: "video/hero_bg.jpg" },
    { id: "plaza", title: "Meowmont đông người", src: "video/hero.mp4", poster: "video/hero.jpg", grid: false },
    { id: "farm", title: "Gieo, tưới, thu hoạch", src: "video/farm.mp4", poster: "video/farm.jpg" },
    { id: "fair", title: "Đua Lá ở Hội Chợ Quả Sồi", src: "video/fair.mp4", poster: "video/fair.jpg" },
    { id: "barkridge", title: "Barkridge mùa tuyết", src: "video/barkridge.mp4", poster: "video/barkridge.jpg" },
    { id: "deepwell", title: "Đi thang xuống Giếng Sâu", src: "video/deepwell.mp4", poster: "video/deepwell.jpg" },
    { id: "party", title: "Tổ bốn người đánh Hộ Vệ", src: "video/party.mp4", poster: "video/party.jpg" },
    { id: "boss", title: "Hạ Khổng Lồ Nứt Vỡ", src: "video/boss.mp4", poster: "video/boss.jpg" },
  ],

  // Ghi chú phiên bản, bản mới nhất ở trên cùng (giọng ấm, ngắn, ghi điều người chơi thấy).
  // { version, date, intro, fixed: [], changed: [], todo: [] }
  news: [],
};
