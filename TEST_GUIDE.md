# HƯỚNG DẪN TEST API# Hướng dẫn Test API
























































































































































































### Bước 7: Soft Delete User### Bước 6: Disable User### Bước 5: Update User### Bước 4: Lấy tất cả Users theo Role ID### Bước 3: Enable User### Bước 2: Tạo User với Role ID từ bước 1### Bước 1: Tạo Role## 5. Test Workflow Hoàn Chỉnh---```db.users.countDocuments()db.roles.countDocuments()# Đếm số lượngdb.users.find().pretty()# Xem tất cả usersdb.roles.find().pretty()# Xem tất cả rolesuse user-role-db# Chọn databasemongosh# Mở MongoDB shell (nếu đã cài MongoDB)```powershell### Xem dữ liệu trong MongoDB:## 4. Kiểm tra MongoDB---6. Click "Send"5. Với POST/PUT: Vào tab "Body" → chọn "JSON" → nhập data4. Nhập URL: `http://localhost:3000/api/roles`3. Chọn method (GET, POST, PUT, DELETE)2. Click "New Request"1. Click vào icon Thunder Client ở sidebar### Sử dụng:4. Click Install3. Tìm "Thunder Client"2. Vào Extensions (Ctrl+Shift+X)1. Mở VS Code### Cài đặt Thunder Client trong VS Code:## 3. Test bằng Postman hoặc Thunder Client (VS Code)---```  -d "{\"email\":\"john@example.com\",\"username\":\"johndoe\"}"  -H "Content-Type: application/json" ^curl -X POST http://localhost:3000/api/users/enable ^```bash### Enable User```  -d "{\"username\":\"johndoe\",\"password\":\"password123\",\"email\":\"john@example.com\",\"fullName\":\"John Doe\"}"  -H "Content-Type: application/json" ^curl -X POST http://localhost:3000/api/users ^```bash### Tạo User```  -d "{\"name\":\"Admin\",\"description\":\"Administrator role\"}"  -H "Content-Type: application/json" ^curl -X POST http://localhost:3000/api/roles ^```bash### Tạo Role## 2. Test bằng CURL (nếu đã cài)---```Invoke-RestMethod -Uri "http://localhost:3000/api/roles/YOUR_ROLE_ID/users" -Method GET```powershell#### Lấy tất cả Users theo Role ID```Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method DELETE```powershell#### Xóa mềm User```Invoke-RestMethod -Uri "http://localhost:3000/api/users/disable" -Method POST -Body $body -ContentType "application/json"} | ConvertTo-Json    username = "johndoe"    email = "john@example.com"$body = @{```powershell#### Disable User```Invoke-RestMethod -Uri "http://localhost:3000/api/users/enable" -Method POST -Body $body -ContentType "application/json"} | ConvertTo-Json    username = "johndoe"    email = "john@example.com"$body = @{```powershell#### Enable User```Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method PUT -Body $body -ContentType "application/json"} | ConvertTo-Json    fullName = "John Doe Updated"$body = @{```powershell#### Cập nhật User```Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method GET```powershell#### Lấy User theo ID```Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET```powershell#### Lấy tất cả Users```Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -Body $body -ContentType "application/json"} | ConvertTo-Json    role = "YOUR_ROLE_ID"    fullName = "John Doe"    email = "john@example.com"    password = "password123"    username = "johndoe"$body = @{```powershell#### Tạo User mới### Test User APIs---```Invoke-RestMethod -Uri "http://localhost:3000/api/roles/YOUR_ROLE_ID" -Method DELETE```powershell#### Xóa mềm Role```Invoke-RestMethod -Uri "http://localhost:3000/api/roles/YOUR_ROLE_ID" -Method PUT -Body $body -ContentType "application/json"} | ConvertTo-Json    description = "Updated admin role"$body = @{```powershell#### Cập nhật Role```Invoke-RestMethod -Uri "http://localhost:3000/api/roles/YOUR_ROLE_ID" -Method GET# Thay YOUR_ROLE_ID bằng ID thực tế```powershell#### Lấy Role theo ID```Invoke-RestMethod -Uri "http://localhost:3000/api/roles" -Method GET```powershell#### Lấy tất cả Roles```Invoke-RestMethod -Uri "http://localhost:3000/api/roles" -Method POST -Body $body -ContentType "application/json"} | ConvertTo-Json    description = "Administrator role"    name = "Admin"$body = @{```powershell#### Tạo Role mới### Test Role APIs## 1. Test bằng PowerShell (Windows)
## 1. Test bằng PowerShell (Windows)

### Test 1: Tạo Role mới
```powershell
$body = @{
    name = "Admin"
    description = "Administrator role"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/roles" -Method POST -Body $body -ContentType "application/json"
```

### Test 2: Lấy tất cả Roles
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/roles" -Method GET
```

### Test 3: Tạo User mới (cần có role_id từ test 1)
```powershell
# Thay YOUR_ROLE_ID bằng ID từ test 1
$body = @{
    username = "johndoe"
    password = "password123"
    email = "john@example.com"
    fullName = "John Doe"
    role = "YOUR_ROLE_ID"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -Body $body -ContentType "application/json"
```

### Test 4: Lấy tất cả Users
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method GET
```

### Test 5: Enable User
```powershell
$body = @{
    email = "john@example.com"
    username = "johndoe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/enable" -Method POST -Body $body -ContentType "application/json"
```

### Test 6: Disable User
```powershell
$body = @{
    email = "john@example.com"
    username = "johndoe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/disable" -Method POST -Body $body -ContentType "application/json"
```

### Test 7: Lấy Users theo Role ID
```powershell
# Thay YOUR_ROLE_ID bằng ID thực tế
Invoke-RestMethod -Uri "http://localhost:3000/api/roles/YOUR_ROLE_ID/users" -Method GET
```

### Test 8: Update User (cần user_id)
```powershell
$body = @{
    fullName = "John Doe Updated"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method PUT -Body $body -ContentType "application/json"
```

### Test 9: Soft Delete User
```powershell
Invoke-RestMethod -Uri "http://localhost:3000/api/users/YOUR_USER_ID" -Method DELETE
```

---

## 2. Test bằng cURL (Command Line)

### Tạo Role
```bash
curl -X POST http://localhost:3000/api/roles ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Admin\",\"description\":\"Administrator role\"}"
```

### Lấy tất cả Roles
```bash
curl http://localhost:3000/api/roles
```

### Tạo User
```bash
curl -X POST http://localhost:3000/api/users ^
  -H "Content-Type: application/json" ^
  -d "{\"username\":\"johndoe\",\"password\":\"password123\",\"email\":\"john@example.com\",\"fullName\":\"John Doe\",\"role\":\"YOUR_ROLE_ID\"}"
```

### Enable User
```bash
curl -X POST http://localhost:3000/api/users/enable ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"john@example.com\",\"username\":\"johndoe\"}"
```

---

## 3. Test bằng Postman (Khuyến nghị)

### Bước 1: Cài đặt Postman
- Download tại: https://www.postman.com/downloads/

### Bước 2: Import Collection
1. Mở Postman
2. Click **Import**
3. Chọn file `postman_collection.json` (nếu có)

### Bước 3: Tạo Request thủ công

**Tạo Role:**
- Method: `POST`
- URL: `http://localhost:3000/api/roles`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "name": "Admin",
    "description": "Administrator role"
}
```

**Tạo User:**
- Method: `POST`
- URL: `http://localhost:3000/api/users`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
    "username": "johndoe",
    "password": "password123",
    "email": "john@example.com",
    "fullName": "John Doe",
    "role": "65f1a2b3c4d5e6f7g8h9i0j1"
}
```

---

## 4. Test bằng Thunder Client (VS Code Extension)

### Bước 1: Cài đặt Extension
1. Mở VS Code
2. Vào Extensions (Ctrl+Shift+X)
3. Tìm "Thunder Client"
4. Click Install

### Bước 2: Sử dụng
1. Click biểu tượng Thunder Client ở sidebar
2. Click "New Request"
3. Nhập URL và chọn method
4. Thêm body nếu cần

---

## 5. Script Test Tự động

### File: test-api.ps1
```powershell
Write-Host "=== Testing User & Role API ===" -ForegroundColor Green

# 1. Tạo Role
Write-Host "`n1. Creating Role..." -ForegroundColor Yellow
$roleBody = @{
    name = "Admin"
    description = "Administrator role"
} | ConvertTo-Json

$role = Invoke-RestMethod -Uri "http://localhost:3000/api/roles" -Method POST -Body $roleBody -ContentType "application/json"
$roleId = $role.data._id
Write-Host "✓ Role created: $roleId" -ForegroundColor Green

# 2. Lấy tất cả Roles
Write-Host "`n2. Getting all Roles..." -ForegroundColor Yellow
$roles = Invoke-RestMethod -Uri "http://localhost:3000/api/roles" -Method GET
Write-Host "✓ Found $($roles.count) roles" -ForegroundColor Green

# 3. Tạo User
Write-Host "`n3. Creating User..." -ForegroundColor Yellow
$userBody = @{
    username = "johndoe"
    password = "password123"
    email = "john@example.com"
    fullName = "John Doe"
    role = $roleId
} | ConvertTo-Json

$user = Invoke-RestMethod -Uri "http://localhost:3000/api/users" -Method POST -Body $userBody -ContentType "application/json"
$userId = $user.data._id
Write-Host "✓ User created: $userId" -ForegroundColor Green

# 4. Enable User
Write-Host "`n4. Enabling User..." -ForegroundColor Yellow
$enableBody = @{
    email = "john@example.com"
    username = "johndoe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/enable" -Method POST -Body $enableBody -ContentType "application/json"
Write-Host "✓ User enabled" -ForegroundColor Green

# 5. Lấy User theo ID
Write-Host "`n5. Getting User by ID..." -ForegroundColor Yellow
$userDetail = Invoke-RestMethod -Uri "http://localhost:3000/api/users/$userId" -Method GET
Write-Host "✓ User status: $($userDetail.data.status)" -ForegroundColor Green

# 6. Lấy Users theo Role
Write-Host "`n6. Getting Users by Role..." -ForegroundColor Yellow
$roleUsers = Invoke-RestMethod -Uri "http://localhost:3000/api/roles/$roleId/users" -Method GET
Write-Host "✓ Found $($roleUsers.count) users with role: $($roleUsers.role)" -ForegroundColor Green

# 7. Disable User
Write-Host "`n7. Disabling User..." -ForegroundColor Yellow
$disableBody = @{
    email = "john@example.com"
    username = "johndoe"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/users/disable" -Method POST -Body $disableBody -ContentType "application/json"
Write-Host "✓ User disabled" -ForegroundColor Green

Write-Host "`n=== All Tests Completed ===" -ForegroundColor Green
```

**Chạy script:**
```powershell
cd C:\user-role-api
.\test-api.ps1
```

---

## 6. Test với MongoDB không cần cài đặt

### Sử dụng MongoDB Atlas (Cloud - Miễn phí)
1. Đăng ký tại: https://www.mongodb.com/cloud/atlas/register
2. Tạo cluster miễn phí
3. Lấy connection string
4. Cập nhật `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user-role-db
```

---

## Lưu ý quan trọng

⚠️ **MongoDB phải đang chạy** để API hoạt động đầy đủ
- Nếu chưa cài MongoDB, server sẽ báo lỗi kết nối database
- Sử dụng MongoDB Atlas để test nhanh không cần cài đặt local

✅ **Kiểm tra server đang chạy:**
```powershell
Invoke-WebRequest -Uri http://localhost:3000 -UseBasicParsing
```

✅ **Xem log của server:**
- Check terminal đang chạy `node app.js`
- Sẽ thấy các request và response
