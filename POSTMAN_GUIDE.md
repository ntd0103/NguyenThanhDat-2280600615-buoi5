# HƯỚNG DẪN SỬ DỤNG POSTMAN

## Bước 1: Cài đặt Postman

### Tải Postman:
- Website: https://www.postman.com/downloads/
- Chọn phiên bản Windows
- Cài đặt và mở Postman

## Bước 2: Import Collection vào Postman

### Cách 1: Import từ file
1. Mở Postman
2. Click nút **Import** ở góc trên bên trái
3. Click **Upload Files**
4. Chọn file: `User_Role_API.postman_collection.json`
5. Click **Import**

### Cách 2: Import bằng Drag & Drop
1. Mở Postman
2. Kéo file `User_Role_API.postman_collection.json` vào cửa sổ Postman
3. Collection sẽ tự động được import

## Bước 3: Sử dụng Collection

### Xem Collection:
- Bên trái Postman, bạn sẽ thấy folder **"User Role API"**
- Click vào để mở rộng và thấy các folder con:
  - **Health Check** (1 request)
  - **Roles** (6 requests)
  - **Users** (7 requests)

## Bước 4: Test API theo thứ tự

### 🔹 TEST 1: Kiểm tra Server đang chạy
```
GET http://localhost:3000/
```
1. Click vào "Health Check" → "Check API Status"
2. Click nút **Send** màu xanh
3. Kết quả: Sẽ thấy danh sách tất cả endpoints

---

### 🔹 TEST 2: Tạo Role mới
```
POST http://localhost:3000/api/roles
```
1. Click vào "Roles" → "1. Create Role"
2. Kiểm tra tab **Body** đã chọn **raw** và **JSON**
3. Body mẫu:
```json
{
    "name": "Admin",
    "description": "Administrator role"
}
```
4. Click **Send**
5. **QUAN TRỌNG**: Copy `_id` từ response để dùng cho bước tiếp theo
   - Ví dụ: `"_id": "65f8a1b2c3d4e5f6a7b8c9d0"`

---

### 🔹 TEST 3: Lấy tất cả Roles
```
GET http://localhost:3000/api/roles
```
1. Click vào "Roles" → "2. Get All Roles"
2. Click **Send**
3. Kết quả: Danh sách tất cả roles (bao gồm role vừa tạo)

---

### 🔹 TEST 4: Lấy Role theo ID
```
GET http://localhost:3000/api/roles/:id
```
1. Click vào "Roles" → "3. Get Role by ID"
2. Click tab **Params**
3. Thay giá trị `:id` bằng ID thực tế từ TEST 2
4. Click **Send**

---

### 🔹 TEST 5: Tạo User mới
```
POST http://localhost:3000/api/users
```
1. Click vào "Users" → "1. Create User"
2. Sửa body, **thay role ID** bằng ID từ TEST 2:
```json
{
    "username": "johndoe",
    "password": "password123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "65f8a1b2c3d4e5f6a7b8c9d0"
}
```
3. Click **Send**
4. **Copy user `_id`** từ response

---

### 🔹 TEST 6: Enable User
```
POST http://localhost:3000/api/users/enable
```
1. Click vào "Users" → "5. Enable User"
2. Body:
```json
{
    "email": "john@example.com",
    "username": "johndoe"
}
```
3. Click **Send**
4. Kết quả: `status: true`

---

### 🔹 TEST 7: Lấy tất cả Users
```
GET http://localhost:3000/api/users
```
1. Click vào "Users" → "2. Get All Users"
2. Click **Send**
3. Kết quả: Thấy user vừa tạo với `status: true`

---

### 🔹 TEST 8: Lấy Users theo Role ID
```
GET http://localhost:3000/api/roles/:id/users
```
1. Click vào "Roles" → "6. Get Users by Role ID"
2. Thay `:id` bằng Role ID (từ TEST 2)
3. Click **Send**
4. Kết quả: Danh sách users có role đó

---

### 🔹 TEST 9: Disable User
```
POST http://localhost:3000/api/users/disable
```
1. Click vào "Users" → "6. Disable User"
2. Click **Send**
3. Kết quả: `status: false`

---

### 🔹 TEST 10: Update User
```
PUT http://localhost:3000/api/users/:id
```
1. Click vào "Users" → "4. Update User"
2. Thay `:id` bằng User ID (từ TEST 5)
3. Sửa body:
```json
{
    "fullName": "John Doe Updated",
    "loginCount": 5
}
```
4. Click **Send**

---

### 🔹 TEST 11: Soft Delete User
```
DELETE http://localhost:3000/api/users/:id
```
1. Click vào "Users" → "7. Delete User (Soft)"
2. Thay `:id` bằng User ID
3. Click **Send**
4. Kết quả: User bị đánh dấu `isDeleted: true`

---

## Tips sử dụng Postman

### 💡 Lưu ID tự động (Variables):
1. Sau khi tạo Role, vào tab **Tests**
2. Thêm script:
```javascript
var jsonData = pm.response.json();
pm.environment.set("roleId", jsonData.data._id);
```
3. Trong các request khác, dùng `{{roleId}}` thay vì copy ID

### 💡 Xem Response đẹp hơn:
- Click tab **Pretty** hoặc **Preview** ở phần Response
- Chọn **JSON** để format đẹp

### 💡 Save Request:
- Sau khi sửa body hoặc params, nhớ click **Save** (Ctrl+S)

### 💡 Tạo Environment:
1. Click biểu tượng ⚙️ góc phải trên
2. Chọn **Add**
3. Đặt tên: "Local Development"
4. Thêm variable:
   - `baseUrl`: `http://localhost:3000`
5. Sử dụng: `{{baseUrl}}/api/users`

---

## Lỗi thường gặp

### ❌ Cannot connect to localhost:3000
**Nguyên nhân**: Server chưa chạy  
**Giải pháp**: 
```powershell
cd C:\user-role-api
node app.js
```

### ❌ MongoDB connection error
**Nguyên nhân**: MongoDB chưa cài hoặc chưa chạy  
**Giải pháp**: 
- Sử dụng MongoDB Atlas (cloud - free)
- Hoặc cài MongoDB local: https://www.mongodb.com/try/download/community

### ❌ User not found / Role not found
**Nguyên nhân**: Dùng ID mẫu thay vì ID thực tế  
**Giải pháp**: Copy ID từ response của Create request

---

## Video hướng dẫn (YouTube)
Tìm kiếm: "How to use Postman for REST API testing"

## Tài liệu chính thức
https://learning.postman.com/docs/getting-started/introduction/
