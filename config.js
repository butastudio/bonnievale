// Cấu hình trang web Bonnievale Online - sửa file này khi có bản mới, link Discord, email liên hệ.
window.SITE = {
  // Bản tester hiện tại. Để downloadUrl rỗng ("") thì nút tải hiện "Sắp mở".
  version: "0.4.1.1",
  released: "21/10/2026",
  downloadUrl: "https://github.com/butastudio/bonnievale/releases/download/v0.4.1.1/Bonnievale_Tester_0.4.1.1.zip",
  downloadSize: "203 MB",

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
    { version: "0.4.1.1", date: "21/10/2026", intro: "Bản vá và bổ sung bạn bè. Tài khoản và bản lưu giữ nguyên. Mở game, nếu có bản mới thì bấm nút Cập nhật ngay trong game.",
      highlights: [
        "Bạn bè đầy đủ: cửa sổ Bạn bè riêng, hộp mời Đồng ý / Từ chối, thấy bạn đang chơi hay vắng và ở đâu, chat /f.",
        "Đổi mật khẩu ngay trong Cài đặt.",
        "HUD và mọi cửa sổ vừa khung từ 1024x768 tới 2560x1440, mọi tỉ lệ màn.",
        "Sửa kẹt truyện ở cửa Xưởng Đúc (Rivet)."
      ],
      sections: [
        { icon: "key", title: "Mới", items: [
          "Nút Nhắn riêng / Mời vào tổ / Viết thư trong cửa sổ Bạn bè; báo khi bạn vào/ra game (tắt được).",
          "Dân làng (tim NPC) tách riêng khỏi Bạn bè (người chơi).",
          "Biển chỉ dẫn mới: nhỏ gọn, chữ pixel tiếng Việt rõ dấu, đặt ở mép đường." ] },
        { icon: "key", title: "Giao diện", items: [
          "Túi đồ gọn hơn; đồ Cash nằm trong thẻ Cash riêng, mặc thẳng từ đó.",
          "Cửa hàng: cột số lượng / giá / nút thẳng hàng, không tràn chữ.",
          "Bong bóng chat tự xuống dòng; biển tên nhà không tràn; tên nhà trên bản đồ nhỏ không che biểu tượng.",
          "Nút Auto Q rõ hơn; Cài đặt cuộn được và hiện đúng độ phân giải." ] },
        { icon: "fix", title: "Sửa lỗi", items: [
          "Nông sản chín nằm trên vòi tưới / rương / vật đặt nay thu hoạch được.",
          "Hồ ở Mỏ Bậc Đồng đã có nước, câu cá được.",
          "Nhiệm vụ mang cuốc cho Lark: cuốc tốt hơn cuốc sắt cũng được nhận.",
          "Ngất không còn bỏ sót đồ ở các ô túi mua thêm.",
          "4 người ở Hội Chợ có quà thích thật; thêm bản Việt cho các thẻ Thích.",
          "Gợi ý tìm huy hiệu Corrick chỉ đúng nơi; thêm các câu còn thiếu tiếng Việt.",
          "Hình nhân vật không còn kẹt trên bản đồ sau khi người đó thoát.",
          "Death Mark của Sát thủ không còn hạ boss tức thì." ] }
      ], todo: [] },
    // M240 / R3-07 (QD-T104): NHÁP, chưa đăng. Câu chữ lấy từ support/SU_THAT_0.4.1.md mục 1. Đặt lại date đúng ngày phát bản trước khi deploy.
    { version: "0.4.1", date: "19/10/2026", intro: "Bản cập nhật lớn. Tài khoản và bản lưu giữ nguyên. Mở game, nếu có bản mới thì bấm nút Cập nhật ngay trong game.",
      highlights: [
        "Giao diện chính vẽ lại: túi đồ, sách kỹ năng, nhân vật, nhiệm vụ, cài đặt.",
        "Hướng dẫn cho mọi hệ thống, kèm các trang trong Cẩm Nang ngay trong game (bấm N).",
        "Khung nhìn Gần / Vừa / Xa và Phóng mượt trong Cài đặt.",
        "Truyện dày hơn: Biên Niên riêng cho Xứ Chó, bí ẩn Glow của Xứ Mèo, thêm 14 nhiệm vụ hỏi chuyện."
      ],
      sections: [
        { icon: "img/icons/world.png", title: "Hướng dẫn & Cẩm Nang", items: [
          "Hướng dẫn cho mọi hệ thống: mẹo hiện lần đầu, các trang trong Cẩm Nang (bấm N), chú thích khi rê chuột."
        ] },
        { icon: "img/icons/style.png", title: "Giao diện mới", items: [
          "Giao diện chính vẽ lại: túi đồ, sách kỹ năng, nhân vật, nhiệm vụ, cài đặt.",
          "Cửa sổ khác cỡ không còn bị lệch.",
          "Chữ ở thư, thẻ người chơi, màn đăng nhập và thoại dài không còn tràn khung.",
          "Chat đậm và dễ đọc hơn.",
          "Sửa giá tràn ô, danh sách dân làng bị cắt, tên tiệm tiếng Việt."
        ] },
        { icon: "img/icons/classes.png", title: "Khung nhìn & hiển thị", items: [
          "Cài đặt > Hiển thị có \"Khung nhìn\" Gần / Vừa / Xa và \"Phóng mượt\".",
          "Thanh trạng thái và cửa sổ giữ nguyên cỡ. \"Xa\" chỉ thấy rộng hơn trên màn lớn (từ 1920x1080).",
          "Bản đồ nhỏ của 12 map đã khớp map thật."
        ] },
        { icon: "img/icons/story.png", title: "Truyện & nhiệm vụ", items: [
          "Túi riêng cho đồ nhiệm vụ: không chiếm ô túi, không bán, không vứt được.",
          "Truyện Mèo: chuỗi Glow thành một bí ẩn; 57 nhiệm vụ có câu kết; 32 nhiệm vụ săn có đoạn kết.",
          "Truyện Chó: Biên Niên riêng cho Xứ Chó và ký ức boss.",
          "Thêm 14 nhiệm vụ hỏi chuyện; làm lại tiếng Việt khoảng 1.976 dòng.",
          "Không còn nhiệm vụ kẹt vĩnh viễn hay lặp vòng (đã quét 324 nhiệm vụ, sửa 13 lỗi kẹt). Sổ nhiệm vụ mở nhanh hơn nhiều.",
          "Chữ bãi săn đúng."
        ] },
        { icon: "img/icons/news_boss.png", title: "Chiến đấu & boss", items: [
          "Giữ chuột hoặc phím J để đánh liên tục. Bật ở Esc > Cài đặt > Lối chơi > \"Giữ nút để đánh liên tục\" (mặc định tắt).",
          "Đã sửa: quả cầu sét, Shadowstep (đáp xuyên tường, đánh trượt), quái mọc sát lối vào map hoặc đứng trong tường, quái thường rơi đồ bậc IV, nón mới không đổi hình.",
          "Boss Giếng Sâu rơi xu; dải cấp Cây Cổ Thụ đã chỉnh.",
          "Bộ đếm quà boss được lưu; boss không còn biến mất giữa trận; quái con không còn vô hình.",
          "Trận thử thách nghề Chó chạy đúng qua mạng."
        ] },
        { icon: "img/icons/news_key.png", title: "Tài khoản", items: [
          "Màn đăng nhập có nút \"Quên mật khẩu?\": bấm sẽ ra cách nhắn đội ngũ trên Discord chính thức. Đội ngũ cấp mật khẩu tạm, vào game bạn đặt mật khẩu mới ngay (tối thiểu 8 ký tự). Đội ngũ không bao giờ hỏi mật khẩu của bạn.",
          "Lời báo lỗi ở màn đăng nhập không còn đẩy lệch nút.",
          "Bản lưu cũ nạp đúng, không mất đồ nhiệm vụ hay bước đang làm."
        ] },
        { icon: "img/icons/fair.png", title: "Hội Chợ & thế giới", items: [
          "Hội Chợ vẽ lại, gỡ 15 vật cản vô hình. Mũi tên vàng ở Hội Chợ thấy được cả ban đêm.",
          "Biển chỉ đường nhỏ lại, không bị vật đè.",
          "Lửa, đèn, chảo lửa mới; 18 dòng nước chảy; icon cá đúng."
        ] },
        { icon: "img/icons/news_fix.png", title: "Sửa lỗi khác", items: [
          "Sửa lỗi chữ trong nhiệm vụ: nhiệm vụ mở quá sớm, bước còn ghi tên tiệm cũ, câu trái luật, thưởng trùng, 130 câu gợi ý bị che.",
          "Bỏ thông báo \"+N\" lặp lại.",
          "2 icon đã đúng hình đã duyệt."
        ] }
      ] },
    { version: "0.4.0.1", date: "14/10/2026", intro: "Bản vá. Tài khoản và nhân vật giữ nguyên trên máy chủ.",
      fixed: ["Mua Thép Cao Nguyên, Mật ong, Đá Tia Lửa không còn 0 xu.", "Bảng tỉ lệ ở Hội Chợ không còn làm rớt game.", "Vũ khí cầm bằng G tự mặc vào ô vũ khí và đánh trúng quái.", "Vá boss hang."],
      changed: ["Game tự lưu lên máy chủ mỗi phút, và lưu ngay khi xong bước nhiệm vụ, đổi đồ hay sang map.", "Bảng chọn lớp hiện đủ 4 lớp.", "Mũi tên chỉ đường về nông trại, Đá Đồng Cỏ và Hội Chợ.", "Quà khởi đầu thêm 3 Rễ Nắng.", "Cân lại kinh nghiệm quái; quái do boss gọi ra không cho kinh nghiệm, xu hay đồ."] },
    { version: "0.4.0", date: "12/10/2026", intro: "Bản tester online đầu tiên. Cần mạng và một mã mời để tạo tài khoản.",
      changed: ["Chơi chung với người khác: gặp nhau trên bản đồ, chat, lập tổ tới 4 người.", "Tài khoản và mã mời, ghi nhớ đăng nhập trên máy.", "Chọn quê Xứ Mèo hoặc Xứ Chó, mỗi xứ một cốt truyện.", "Boss cốt truyện đánh trong thế giới riêng của bạn và tổ đội.", "Sách Kỹ Năng (O), bản đồ thế giới mới, giờ trong game chạy theo máy chủ."] },
  ],
};
