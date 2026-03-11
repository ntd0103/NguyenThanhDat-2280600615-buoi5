# HƯỚNG DẪN NHANH - TEST API BẰNG POSTMAN

## 📥 BƯỚC 1: CÀI POSTMAN
1. Vào: https://www.postman.com/downloads/
2. Tải và cài đặt Postman
3. Mở Postman lên

## 📂 BƯỚC 2: IMPORT COLLECTION
1. Trong Postman, click nút **Import** (góc trên bên trái)
2. Click **Upload Files**
3. Chọn file: **User_Role_API.postman_collection.json** (trong thư mục C:\user-role-api)
4. Click **Import**

✅ Bây giờ bạn sẽ thấy folder "User Role API" bên trái với 14 requests có sẵn!

## 🚀 BƯỚC 3: CHẠY SERVER (NẾU CHƯA CHẠY)
```powershell
cd C:\user-role-api
node app.js
```

## 🧪 BƯỚC 4: TEST TỪNG BƯỚC

### ✅ Test 1: Kiểm tra Server
- Folder: **Health Check**
- Request: **Check API Status**
- Click **Send**
- Nếu thấy JSON response → Server OK!

---

### ✅ Test 2: Tạo Role
- Folder: **Roles**
- Request: **1. Create Role**
- Body đã có sẵn:
```json
{
    "name": "Admin",
    "description": "Administrator role"
}
```
- Click **Send**
- **📋 COPY ID** từ response (dạng: `"_id": "65f8a1b2c3d4e5f6..."`)

---

### ✅ Test 3: Tạo User
- Folder: **Users**
- Request: **1. Create User**
- **SỬA** `"role"` trong body, paste ID từ Test 2:
```json
{
    "username": "johndoe",
    "password": "password123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "PASTE_ROLE_ID_Ở_ĐÂY"
}
```
- Click **Send**
- **📋 COPY user ID** từ response

---

### ✅ Test 4: Enable User
- Folder: **Users**
- Request: **5. Enable User**
- Body:
```json
{
    "email": "john@example.com",
    "username": "johndoe"
}
```
- Click **Send**
- Kết quả: `"status": true` ✅

---

### ✅ Test 5: Lấy tất cả Users
- Folder: **Users**
- Request: **2. Get All Users**
- Click **Send**
- Sẽ thấy danh sách users với role được populate

---

### ✅ Test 6: Lấy Users theo Role
- Folder: **Roles**
- Request: **6. Get Users by Role ID**
- Click tab **Params**
- Sửa value của `id` thành Role ID (từ Test 2)
- Click **Send**
- Kết quả: Danh sách users có role đó

---

### ✅ Test 7: Disable User
- Folder: **Users**
- Request: **6. Disable User**
- Click **Send**
- Kết quả: `"status": false` ❌

---

## 📝 GHI CHÚ QUAN TRỌNG

### ⚠️ Lưu ý khi test:
1. **MongoDB phải đang chạy** - Nếu không có MongoDB:
   - Dùng MongoDB Atlas (cloud, miễn phí): https://www.mongodb.com/atlas
   - Cập nhật `.env` với connection string từ Atlas

2. **Thay ID thực tế** - Đừng dùng ID mẫu `65f1a2b3...`
   - Copy ID từ response của Create requests
   - Paste vào Params hoặc Body

3. **Thứ tự test**:
   - Tạo Role trước → Copy ID
   - Tạo User với Role ID → Copy User ID
   - Các test còn lại dùng các ID này

### 💡 Tips:
- **Xem response đẹp**: Click tab **Pretty** trong Response
- **Lưu thay đổi**: Ctrl+S sau khi sửa Body/Params
- **Test nhanh**: Dùng phím tắt **Ctrl+Enter** để Send

---

## 🎯 WORKFLOW ĐẦY ĐỦ

```
1. Check API Status (GET /)
         ↓
2. Create Role (POST /api/roles)
         ↓ (copy role_id)
3. Create User (POST /api/users) ← paste role_id
         ↓ (copy user_id)
4. Enable User (POST /api/users/enable)
         ↓
5. Get All Users (GET /api/users)
         ↓
6. Get Users by Role (GET /api/roles/:id/users)
         ↓
7. Update User (PUT /api/users/:id)
         ↓
8. Disable User (POST /api/users/disable)
         ↓
9. Delete User (DELETE /api/users/:id)
```

---

## ❓ TROUBLESHOOTING

### Lỗi: "Could not send request"
→ Server chưa chạy. Chạy lại: `node app.js`

### Lỗi: "MongoDB connection timeout"
→ MongoDB chưa cài hoặc chưa chạy
→ Giải pháp: Dùng MongoDB Atlas (cloud)

### Lỗi: "Role not found" / "User not found"
→ Đang dùng ID mẫu thay vì ID thực
→ Copy ID từ response của Create request

---

## 📚 TÀI LIỆU THAM KHẢO

- Postman Learning Center: https://learning.postman.com/
- MongoDB Atlas Guide: https://www.mongodb.com/docs/atlas/getting-started/
- API Documentation: Xem file README.md trong project
