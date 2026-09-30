// Cấu hình trang web Bonnievale - sửa file này khi có bản mới hoặc đổi link tải.
// (Dữ liệu game như quái, lớp, NPC nằm ở data.js, được tạo tự động bằng tools/web_export.sh.)
window.SITE = {
  version: "0.3.1",
  released: "2026-10-01",

  // Link tải. Để url trống ("") thì nút hiện "Sắp có".
  downloads: [
    { id: "win", label: "Tải cho PC", note: "Windows 10/11 · 64-bit · file .zip · 70 MB", url: "https://github.com/butastudio/bonnievale/releases/download/v0.3.1/Bonnievale_Tester_0.3.1.zip" },
    { id: "android", label: "Android", note: "Đang làm", url: "" },
    { id: "mac", label: "macOS", note: "Đang làm", url: "" },
  ],

  // Liên hệ. Để trống thì mục đó không hiện.
  email: "",
  discord: "",
  facebook: "",

  // Tin tức, bản mới nhất ở trên cùng.
  news: [
    {
      version: "0.3.1", date: "2026-10-01", title: "Gọn hơn, ghi công tác giả đầy đủ",
      points: [
        "Game giờ là một file Bonnievale.exe duy nhất, file tải nhẹ hơn (70 MB).",
        "Kèm thư mục HINH_ANH_GIAY_PHEP_MO: hình ảnh dùng giấy phép mở cùng tên tác giả và giấy phép của từng gói.",
        "Nội dung game giống bản 0.3.0.",
      ],
    },
    {
      version: "0.3.0", date: "2026-10-01", title: "Cây Cổ Thụ làm lại hoàn toàn, mở đầu có tranh minh họa",
      points: [
        "Mở đầu game mới: 8 cảnh có tranh minh họa kể lại cốt truyện (Enter để sang, Esc để bỏ qua).",
        "Cây Cổ Thụ (lối vào là cái hốc dưới gốc cây khổng lồ, phía bắc Rừng Thì Thầm): 9 tầng và Ngọn Cây, mỗi tầng một cách di chuyển riêng, đom đóm dẫn đường, Thang Giỏ, trại căn cứ, phòng phục kích, kho báu, trang ghi chép của Rosalind và nhiều nhiệm vụ ẩn.",
        "Hộ Vệ mỗi tầng rất khó, hồi sinh mỗi sáng, mỗi lần hạ rơi 5 hạt giống và đồ quý; 10% rơi bùa riêng.",
        "Viên Đá Khứ Hồi (F) đưa bạn về nông trại ngay. Nhiệm vụ Chín Vụ Mùa mở kỹ năng ẩn (phím U).",
        "Nghề nông và bào chế có bậc, máy nông trại mới, Cân Đẩu Vân (phím L), vứt đồ trong túi (I).",
        "Đống lửa trại hồi đầy máu, mana và thể lực. Nên bắt đầu game mới để thấy đủ nội dung.",
      ],
    },
    {
      version: "0.2.1", date: "2026-09-30", title: "Bảng thông tin vật phẩm, nhà nào cũng vào được",
      points: [
        "Rê chuột lên bất kỳ món đồ nào để xem công dụng, chỉ số, độ bền, nơi kiếm và giá bán.",
        "Mở rộng túi đồ (24 lên 40 ô) và rương (12 lên 36 ô).",
        "Nhà nông trại làm lại cả trong lẫn ngoài; mọi ngôi nhà trong thị trấn đều vào được.",
        "Tiệm mới Purrfect Salon: đổi màu lông, kiểu lông, hoa văn, dáng người. Ngồi được lên ghế.",
        "Hiệu ứng kỹ năng, đạn bay và vòng cảnh báo đòn của boss dùng hình ảnh mới.",
      ],
    },
    {
      version: "0.2.0", date: "2026-09-30", title: "Nhạc, font mới, 12 nhánh chuyên sâu và bãi săn boss",
      points: [
        "Font chữ mới đọc tiếng Việt rõ hơn, nhạc nền từng vùng, nhạc chiến đấu, tiếng quái.",
        "Hình ảnh mới cho cây trồng, cây cối, vật phẩm, quái, boss, trạm chế tạo và hầm mỏ.",
        "Chiến đấu lên tới Lv 20. Ở Lv 10 chọn 1 trong 3 nhánh chuyên sâu, mỗi nhánh có vũ khí, đặc tính và 4 kỹ năng riêng.",
        "Hai bãi săn mới cho Lv 12-16: Hầm Mộ Chìm và Tổ Ong Gai Góc, mở bằng chuỗi manh mối ẩn.",
        "Bốn nhiệm vụ tìm mèo con bị lạc, bản đồ vùng vẽ lại có tên và cấp độ đề nghị.",
      ],
    },
    {
      version: "0.1.0", date: "2026-09-29", title: "Bản thử nghiệm đầu tiên",
      points: [
        "Toàn bộ cốt truyện Xứ Mèo \"Khế Ước Đèn Lồng\": 4 chương, khoảng 20-25 ngày trong game.",
        "Nông trại với tưới tự động, vườn cây ăn trái, chế tạo, câu cá, đào mỏ, 4 lớp chiến đấu và các boss đầu tiên.",
      ],
    },
  ],
};
