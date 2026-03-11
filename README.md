# User and Role Management API

API quản lý User và Role với MongoDB và Express.js

## Cài đặt

```bash
npm install
```

## Cấu hình

Chỉnh sửa file `.env`:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/user-role-db
```

## Chạy ứng dụng

```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### User Endpoints

#### 1. Tạo User mới
```http
POST /api/users
Content-Type: application/json

{
  "username": "johndoe",
  "password": "password123",
  "email": "john@example.com",
  "fullName": "John Doe",
  "role": "role_id_here"
}
```

#### 2. Lấy tất cả Users
```http
GET /api/users
```

#### 3. Lấy User theo ID
```http
GET /api/users/:id
```

#### 4. Cập nhật User
```http
PUT /api/users/:id
Content-Type: application/json

{
  "fullName": "John Doe Updated"
}
```

#### 5. Xóa mềm User
```http
DELETE /api/users/:id
```

#### 6. Enable User
```http
POST /api/users/enable
Content-Type: application/json

{
  "email": "john@example.com",
  "username": "johndoe"
}
```

#### 7. Disable User
```http
POST /api/users/disable
Content-Type: application/json

{
  "email": "john@example.com",
  "username": "johndoe"
}
```

### Role Endpoints

#### 1. Tạo Role mới
```http
POST /api/roles
Content-Type: application/json

{
  "name": "Admin",
  "description": "Administrator role"
}
```

#### 2. Lấy tất cả Roles
```http
GET /api/roles
```

#### 3. Lấy Role theo ID
```http
GET /api/roles/:id
```

#### 4. Cập nhật Role
```http
PUT /api/roles/:id
Content-Type: application/json

{
  "description": "Updated description"
}
```

#### 5. Xóa mềm Role
```http
DELETE /api/roles/:id
```

#### 6. Lấy tất cả Users có Role cụ thể
```http
GET /api/roles/:id/users
```

## Schema Models

### User Model
- `username`: String (unique, required)
- `password`: String (required)
- `email`: String (unique, required)
- `fullName`: String (default: "")
- `avatarUrl`: String (default: "https://i.sstatic.net/l60Hf.png")
- `status`: Boolean (default: false)
- `role`: ObjectID (ref: Role)
- `loginCount`: Number (default: 0, min: 0)
- `isDeleted`: Boolean (default: false) - cho soft delete
- `timestamps`: createdAt, updatedAt

### Role Model
- `name`: String (unique, required)
- `description`: String (default: "")
- `isDeleted`: Boolean (default: false) - cho soft delete
- `timestamps`: createdAt, updatedAt

## Tính năng

- ✅ CRUD đầy đủ cho User và Role
- ✅ Soft delete (xóa mềm) thay vì xóa cứng
- ✅ Enable/Disable user với email và username
- ✅ Lấy danh sách users theo role ID
- ✅ Populate role information khi lấy user
- ✅ Validation và error handling
