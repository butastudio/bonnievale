// Cấu hình trang web Bonnievale Online - sửa file này khi có bản mới, link Discord, email liên hệ.
window.SITE = {
  // Bản tester hiện tại. Để downloadUrl rỗng ("") thì nút tải hiện "Sắp mở".
  version: "0.4.0.1",
  released: "14/10/2026",
  downloadUrl: "https://github.com/butastudio/bonnievale/releases/download/v0.4.0.1/Bonnievale_Tester_0.4.0.1.zip",
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
    // M240 / R3-07 (QD-T104): NHÁP, chưa đăng. Câu chữ lấy từ support/SU_THAT_0.4.1.md mục 1. Đặt lại date đúng ngày phát bản trước khi deploy.
    { version: "0.4.1", date: "ngày phát bản", intro: "Bản cập nhật. Tài khoản và bản lưu giữ nguyên. Mở game, nếu có bản mới thì bấm nút Cập nhật ngay trong game.",
      fixed: ["Boss không còn biến mất giữa trận; mở hang rồi vẫn thấy boss, boss tầng không hồi khi ra vào cửa.", "Đồ nhiệm vụ không còn bị giảm tỉ lệ rơi khi bạn cao cấp hơn map; ai đang kẹt thiếu đồ sẽ được trả lại khi vào map.", "Bảng nhận nhiệm vụ không còn mất nút Nhận khi chữ dài.", "Hội Chợ: bấm E ở chỗ chơi không còn văng game, đã vá; bảng huy chương Đua Lá Rơi ghi đúng 40 / 33 / 28 giây.", "Tưới nước không còn báo \"Ở đây đã trồng cây rồi\"; bấm chuột trồng đúng ô.", "Đạn quái bắn xa không còn xuyên tường.", "Biển chỉ đường không còn bị vật đè.", "Tên nhân vật có dấu cách hay gõ Telex không bị cắt; tên như \"Sigmund\" không còn bị chặn nhầm.", "Nhả phím khi game mất focus, nhân vật hết tự chạy về một phía.", "Brindle đã hiện lại ở lò rèn."],
      changed: ["Ban đêm bớt tối.", "Chat: gửi tin nhanh hơn, không còn khóa 30 giây. Vẫn tối đa 120 ký tự một câu, và câu giống hệt lần thứ ba liền nhau bị giữ lại. Chữ chat mờ dần sau 8 giây, chuột xuyên qua được, có nút thu.", "Bản đồ làm lại: biểu tượng NPC, danh sách NPC theo khu, bấm NPC để tự chạy tới.", "Nút \"Đi tới nhiệm vụ\": nhân vật tự chạy bộ tới chỗ làm bước. Có mũi tên dẫn từng bước của nhiệm vụ đang nhận.", "Khung theo dõi nhiệm vụ gọn hơn, có nút Bỏ ghim. Có nút Về nhà.", "Boss hang và boss săn hồi sau 3 giờ thật.", "Khiên và màu trạng thái (đóng băng, choáng, chậm, độc, cháy) của quái do chủ phòng điều khiển hiện trên máy mọi người; thú cưỡi hiện trên máy người khác.", "Đồ quái và boss rơi ra đất cho bạn nhặt.", "Câu cá: thanh chạy chậm với cá thường, càng hiếm càng nhanh; câu nhiều ở một map thì cá dè chừng rồi thôi cắn câu.", "Cây lớn nhanh gấp đôi, có dòng báo còn bao lâu.", "Cân bằng lại xu, vật liệu và các lớp nhân vật.", "Hình mới: túi hạt giống và 17 loại cây, 12 vũ khí bậc IV, ngọn lửa vẽ tay, biển chỉ đường, nhiều hình đồ và vật nhiệm vụ.", "Viết lại nhiều chữ tiếng Việt (vẫn còn một số chỗ).", "Thêm 14 nhiệm vụ điều tra bí ẩn cho hai xứ.", "Cài đặt: chỉnh tỉ lệ giao diện, đổi phím.", "Báo lỗi đăng nhập rõ từng loại."],
      todo: ["Chữ chat đậm hơn.", "Vài nhiệm vụ chưa có câu gợi ý từ dân làng.", "Hội Chợ vẽ lại quảng trường.", "Ngăn riêng cho đồ nhiệm vụ trong túi.", "Kéo thả thanh kỹ năng."] },
    { version: "0.4.0.1", date: "14/10/2026", intro: "Bản vá. Tài khoản và nhân vật giữ nguyên trên máy chủ.",
      fixed: ["Mua Thép Cao Nguyên, Mật ong, Đá Tia Lửa không còn 0 xu.", "Bảng tỉ lệ ở Hội Chợ không còn làm rớt game.", "Vũ khí cầm bằng G tự mặc vào ô vũ khí và đánh trúng quái.", "Vá boss hang."],
      changed: ["Game tự lưu lên máy chủ mỗi phút, và lưu ngay khi xong bước nhiệm vụ, đổi đồ hay sang map.", "Bảng chọn lớp hiện đủ 4 lớp.", "Mũi tên chỉ đường về nông trại, Đá Đồng Cỏ và Hội Chợ.", "Quà khởi đầu thêm 3 Rễ Nắng.", "Cân lại kinh nghiệm quái; quái do boss gọi ra không cho kinh nghiệm, xu hay đồ."] },
    { version: "0.4.0", date: "12/10/2026", intro: "Bản tester online đầu tiên. Cần mạng và một mã mời để tạo tài khoản.",
      changed: ["Chơi chung với người khác: gặp nhau trên bản đồ, chat, lập tổ tới 4 người.", "Tài khoản và mã mời, ghi nhớ đăng nhập trên máy.", "Chọn quê Xứ Mèo hoặc Xứ Chó, mỗi xứ một cốt truyện.", "Boss cốt truyện đánh trong thế giới riêng của bạn và tổ đội.", "Sách Kỹ Năng (O), bản đồ thế giới mới, giờ trong game chạy theo máy chủ."] },
  ],
};
