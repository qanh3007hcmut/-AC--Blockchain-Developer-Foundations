# 🧠 [My Document Tracking](https://docs.google.com/spreadsheets/d/1f7CexfK_gKPYhXfi2QLfbZIruIFyD44bZoZSIutBzmc/edit?gid=1299343303#gid=1299343303)

---

## 📚 Cấu trúc bài học

- `lessons/` – chứa từng bài học riêng biệt
- Mỗi bài gồm:
  - `problem.md` – mô tả đề bài
  - `solution.ts` – nơi bạn viết code
  - `test.ts` – file kiểm thử tự động

---

## ▶️ Cách chạy bài học

### Yêu cầu:
- Đã cài `node.js`
- Đã cài `ts-node` (nếu chưa, chạy lệnh sau):

```bash
npm install -g ts-node typescript
```

---

### Chạy nhanh bài học (khuyên dùng):

```bash
npx ts-node run.ts bai1_1
```

Hoặc:

```bash
ts-node run.ts bai1_1
```

---

### Chạy test thủ công (nếu cần):

```bash
cd lessons/bai1_1
ts-node test.ts
```

---

## ✅ Ghi chú

- Chỉ cần sửa `solution.ts`
- Không cần sửa `test.ts`
- Tất cả bài tập code là **tuỳ chọn**, nhưng khuyến khích làm nếu muốn hiểu sâu

---

