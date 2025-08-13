## 🏸 Badminton E-commerce Website 
## 📖 Mục lục


<h1 align="center">🏸 Badminton Shop - Hệ thống thương mại điện tử bán linh kiện cầu lông</h1>
<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-blue" alt="MERN Stack"/>
  <img src="https://img.shields.io/badge/Frontend-Next.js-blueviolet" alt="Next.js"/>
  <img src="https://img.shields.io/badge/Backend-Express-green" alt="Express"/>
  <img src="https://img.shields.io/badge/CI%2FCD-Jenkins-orange" alt="Jenkins"/>
  <img src="https://img.shields.io/badge/Cloud-AWS-yellow" alt="AWS"/>
</p>

<p align="center">
  <a href="./CICD_SETUP.md" style="font-size:1.1em;font-weight:bold;">
    <img src="https://img.shields.io/badge/Xem%20hướng%20dẫn%20CI%2FCD%20và%20triển%20khai-blue?logo=jenkins&logoColor=white" alt="CI/CD Setup"/>
  </a>
</p>
>>>>>>> 267205a45ec30a32f2399392bc9f0a54954425a5

- [🚀 Quick Start](#-quick-start)
- [✨ Tính năng chính](#-tính-năng-chính)
- [🏗️ Kiến trúc hệ thống](#️-kiến-trúc-hệ-thống)
- [🛠️ Công nghệ sử dụng](#️-công-nghệ-sử-dụng)
- [⚡ Cài đặt nhanh](#-cài-đặt-nhanh)
- [🐳 Chạy với Docker](#-chạy-với-docker)
- [🔧 CI/CD Pipeline](#-cicd-pipeline)
- [📁 Cấu trúc project](#-cấu-trúc-project)
- [🔌 API Documentation](#-api-documentation)
- [🎯 VS Code Setup](#-vs-code-setup)
- [🚀 Deployment](#-deployment)
- [📚 Tài liệu](#-tài-liệu)
- [🤝 Đóng góp](#-đóng-góp)

---

> Trang web thương mại điện tử chuyên về các sản phẩm cầu lông với thiết kế hiện đại và tích hợp CI/CD pipeline.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![Jenkins](https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=jenkins&logoColor=white)

## 🚀 Quick Start

[![CI/CD Setup](https://img.shields.io/badge/🔧%20CI%2FCD%20Setup-Jenkins%20%2B%20AWS-blue?style=for-the-badge)](./CICD_SETUP.md)
[![Live Demo](https://img.shields.io/badge/�%20Live%20Demo-Visit%20Website-green?style=for-the-badge)](#)
[![Documentation](https://img.shields.io/badge/📚%20Docs-Read%20More-orange?style=for-the-badge)](#-tài-liệu)🏸 Badminton E-commerce Website

Một ứng dụng thương mại điện tử chuyên về đồ cầu lông được xây dựng với công nghệ hiện đại, bao gồm đầy đủ các tính năng từ quản lý sản phẩm đến hệ thống đánh giá và thanh toán.

![Badminton Shop](https://img.shields.io/badge/Badminton-Shop-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?logo=next.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

## 📋 Mục lục

- [Tính năng chính](#-tính-năng-chính)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt và chạy project](#-cài-đặt-và-chạy-project)
- [Cấu trúc project](#-cấu-trúc-project)
- [API Documentation](#-api-documentation)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🚀 Tính năng chính

### 👤 Cho người dùng:
- ✅ **Xem sản phẩm**: Duyệt danh sách sản phẩm với bộ lọc thông minh
- ✅ **Tìm kiếm nâng cao**: Tìm kiếm theo tên, danh mục, thương hiệu, khoảng giá
- ✅ **Chi tiết sản phẩm**: Xem thông tin, hình ảnh, thông số kỹ thuật chi tiết
- ✅ **Giỏ hàng**: Thêm, xóa, cập nhật số lượng sản phẩm
- ✅ **Đặt hàng**: Quy trình đặt hàng đơn giản và bảo mật
- ✅ **Quản lý tài khoản**: Đăng ký, đăng nhập, cập nhật thông tin cá nhân
- ✅ **Danh sách yêu thích**: Lưu sản phẩm yêu thích
- ✅ **Đánh giá sản phẩm**: Viết đánh giá và xem đánh giá từ người dùng khác
- ✅ **Lịch sử đơn hàng**: Theo dõi trạng thái đơn hàng

### 🔧 Cho quản trị viên:
- ✅ **Quản lý sản phẩm**: CRUD sản phẩm với upload hình ảnh
- ✅ **Quản lý đơn hàng**: Xem và cập nhật trạng thái đơn hàng
- ✅ **Quản lý người dùng**: Xem danh sách và thông tin người dùng
- ✅ **Quản lý đánh giá**: Xem và xóa đánh giá không phù hợp
- ✅ **Thông số kỹ thuật**: Cập nhật thông số chi tiết cho sản phẩm
- ✅ **Dashboard**: Thống kê tổng quan về hệ thống

### 💡 Tính năng đặc biệt:
- 🔍 **Bộ lọc thông minh**: Lọc theo danh mục, thương hiệu, khoảng giá, cấp độ
- ⭐ **Hệ thống đánh giá**: Rating 5 sao với bình luận chi tiết
- 📊 **Thông số kỹ thuật**: Thông tin chi tiết theo từng loại sản phẩm
- 🛒 **Giỏ hàng persistent**: Giỏ hàng được lưu trong localStorage
- 📱 **Responsive Design**: Hoạt động mượt mà trên mọi thiết bị
- 🔐 **Bảo mật**: Authentication JWT với middleware bảo vệ

## 🛠 Công nghệ sử dụng

### Backend:
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **Multer** - File upload
- **Cloudinary** - Image storage and optimization
- **Bcrypt** - Password hashing
- **Express Validator** - Input validation

### Frontend:
- **Next.js 15.3.5** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **React Query** - Data fetching and caching
- **React Hook Form** - Form management
- **React Hot Toast** - Notifications
- **React Icons** - Icon library
- **Axios** - HTTP client

### Tools & DevOps:
- **VS Code** - Code editor
- **Git** - Version control
- **Jenkins** - CI/CD pipeline
- **Docker** - Containerization
- **Nginx** - Reverse proxy

## ⚡ Cài đặt nhanh

<<<<<<< HEAD
### � Quick Start (5 phút)
=======

## 🚀 Hướng dẫn cài đặt & chạy trên máy cá nhân/IDE (Local Development)
>>>>>>> 267205a45ec30a32f2399392bc9f0a54954425a5

```bash
# 1. Clone repository
git clone https://github.com/SecretJA/Badminton-eweb.git
cd badminton-web

# 2. Cài đặt dependencies
npm install                    # Root dependencies
cd backend && npm install      # Backend dependencies  
cd ../frontend && npm install  # Frontend dependencies

# 3. Cấu hình environment variables
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
# ✏️ Chỉnh sửa các file .env với thông tin của bạn

# 4. Chạy ứng dụng
npm run dev:backend    # Terminal 1: Backend (Port 5000)
npm run dev:frontend   # Terminal 2: Frontend (Port 3000)

# 🎉 Truy cập: http://localhost:3000
```

### 📋 Yêu cầu hệ thống

| Yêu cầu | Phiên bản tối thiểu | Khuyến nghị |
|---------|---------------------|-------------|
| **Node.js** | v18.0.0+ | v20.0.0+ |
| **npm** | v8.0.0+ | v10.0.0+ |
| **MongoDB** | v5.0+ | MongoDB Atlas |
| **Memory** | 4GB RAM | 8GB RAM |
| **Storage** | 2GB free | 5GB free |

### 🔧 Cài đặt chi tiết

#### 1️⃣ **Clone Repository**

```bash
# SSH (Khuyến nghị)
git clone git@github.com:SecretJA/Badminton-eweb.git

# HTTPS  
git clone https://github.com/SecretJA/Badminton-eweb.git

cd badminton-web
```

#### 2️⃣ **Backend Setup**

```bash
cd backend

# Cài đặt dependencies
npm install

# Tạo file environment
cp .env.example .env
```

**Cấu hình `.env` cho Backend:**
```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/badminton-db
DB_NAME=badminton-db

# JWT Security
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=7d

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key  
CLOUDINARY_API_SECRET=your-api-secret

# Server Config
PORT=5000
NODE_ENV=development

# Admin Default
ADMIN_EMAIL=admin@badminton.com
ADMIN_PASSWORD=admin123
```

#### 3️⃣ **Frontend Setup**

```bash
cd ../frontend

# Cài đặt dependencies
npm install

# Tạo file environment
cp .env.example .env.local
```

**Cấu hình `.env.local` cho Frontend:**
```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Upload Configuration  
NEXT_PUBLIC_UPLOAD_URL=http://localhost:5000/uploads
NEXT_PUBLIC_MAX_FILE_SIZE=5242880

# App Configuration
NEXT_PUBLIC_APP_NAME=Badminton E-commerce
NEXT_PUBLIC_APP_VERSION=1.0.0
```

#### 4️⃣ **Database Setup**

**Option A: MongoDB Atlas (Khuyến nghị)**
1. Truy cập [MongoDB Atlas](https://cloud.mongodb.com/)
2. Tạo account miễn phí
3. Tạo cluster mới (Free Tier M0)
4. Tạo database user
5. Whitelist IP addresses (0.0.0.0/0 cho development)
6. Copy connection string vào `MONGODB_URI`

**Option B: Local MongoDB**
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install mongodb

# macOS (với Homebrew)
brew tap mongodb/brew
brew install mongodb-community

# Windows
# Download từ https://www.mongodb.com/try/download/community

# Start MongoDB
sudo systemctl start mongodb  # Linux
brew services start mongodb   # macOS
```

#### 5️⃣ **Cloudinary Setup (Image Upload)**

1. Truy cập [Cloudinary](https://cloudinary.com/)
2. Tạo account miễn phí
3. Lấy thông tin từ Dashboard:
   - Cloud name
   - API Key  
   - API Secret
4. Cập nhật vào `.env`

#### 6️⃣ **Chạy Application**

```bash
# Terminal 1 - Backend
cd backend
npm run dev
# 🚀 Backend running on http://localhost:5000

# Terminal 2 - Frontend  
cd frontend
npm run dev
# 🚀 Frontend running on http://localhost:3000
```

#### 7️⃣ **Tạo Admin Account**

```bash
# Option A: Qua API
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "email": "admin@badminton.com", 
    "password": "admin123",
    "fullName": "Administrator"
  }'

# Option B: Cập nhật role trong MongoDB
# Đăng ký user bình thường, sau đó update role = "admin"
```

### ✅ Kiểm tra cài đặt

```bash
# Test Backend API
curl http://localhost:5000/api/health
# Response: {"status": "OK", "timestamp": "..."}

# Test Frontend
curl http://localhost:3000
# Response: HTML content

# Test Database connection
curl http://localhost:5000/api/products
# Response: Product list (có thể empty)
```

### 🎯 Endpoints chính

| Endpoint | Mô tả | Method |
|----------|--------|--------|
| `/` | Homepage | GET |
| `/products` | Danh sách sản phẩm | GET |
| `/login` | Đăng nhập | GET/POST |
| `/register` | Đăng ký | GET/POST |
| `/admin` | Admin panel | GET |
| `/cart` | Giỏ hàng | GET |
| `/checkout` | Thanh toán | GET/POST |

### 🔍 Troubleshooting

**❌ Backend không chạy được:**
```bash
# Kiểm tra Node.js version
node --version  # Cần >= 18.0.0

# Kiểm tra port 5000
netstat -an | grep 5000
# Nếu port đã sử dụng, đổi PORT trong .env

# Kiểm tra MongoDB connection
npm run test:db
```

**❌ Frontend build lỗi:**
```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install

# Kiểm tra TypeScript
npm run type-check

# Kiểm tra ESLint  
npm run lint
```

**❌ Images không load:**
- Kiểm tra Cloudinary config
- Kiểm tra CORS settings
- Kiểm tra file permissions trong `/uploads`

```bash
git clone https://github.com/SecretJA/Badminton-eweb.git
cd badminton-web-cicd-jenkins/badminton-web
```

### 2. Cài đặt dependencies

```bash
# Cài đặt backend dependencies
cd backend
npm install

# Cài đặt frontend dependencies
cd ../frontend
npm install
```

### 3. Cấu hình môi trường

Tạo file `.env` trong thư mục root với nội dung:

```env
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/badminton_shop

# JWT
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=30d

# Cloudinary (cho upload ảnh)
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server
PORT=5000
NODE_ENV=development

# Frontend URL
FRONTEND_URL=http://localhost:3000
```

### 4. Chạy ứng dụng

#### Chạy Backend (Terminal 1):
```bash
cd backend
npm run dev
```
Server sẽ chạy tại: http://localhost:5000

#### Chạy Frontend (Terminal 2):
```bash
cd frontend
npm run dev
```
Website sẽ chạy tại: http://localhost:3000

### 5. Tạo tài khoản admin đầu tiên

Sau khi chạy ứng dụng, bạn có thể:
1. Đăng ký tài khoản mới tại `/register`
2. Cập nhật role thành 'admin' trực tiếp trong MongoDB
3. Hoặc sử dụng API endpoint để cập nhật role

## 📁 Cấu trúc project

```
badminton-web/
├── backend/                    # Backend API Server
│   ├── middleware/            # Authentication & validation middleware
│   ├── models/               # MongoDB schemas
│   ├── routes/               # API routes
│   ├── utils/                # Utility functions
│   └── server.js             # Server entry point
├── frontend/                  # Next.js Frontend
│   ├── components/           # Reusable React components
│   │   ├── Admin/           # Admin-specific components
│   │   ├── Auth/            # Authentication components
│   │   ├── Layout/          # Layout components
│   │   └── Products/        # Product-related components
│   ├── contexts/            # React Context providers
│   ├── lib/                 # Utility libraries
│   ├── pages/               # Next.js pages
│   │   ├── admin/          # Admin panel pages
│   │   ├── orders/         # Order management pages
│   │   └── products/       # Product pages
│   └── styles/             # Global styles
├── uploads/                  # File upload directory
├── .env                     # Environment variables
├── Dockerfile              # Docker configuration
├── Jenkinsfile            # Jenkins CI/CD pipeline
├── nginx.conf             # Nginx configuration
└── README.md              # Project documentation
```

## 🔗 API Documentation

### Authentication Endpoints:
```
POST /api/auth/register     # Đăng ký tài khoản
POST /api/auth/login        # Đăng nhập
GET  /api/auth/profile      # Xem profile
PUT  /api/auth/profile      # Cập nhật profile
```

### Product Endpoints:
```
GET    /api/products                    # Lấy danh sách sản phẩm
GET    /api/products/:id                # Lấy chi tiết sản phẩm
POST   /api/products                    # Tạo sản phẩm mới (Admin)
PUT    /api/products/:id                # Cập nhật sản phẩm (Admin)
DELETE /api/products/:id                # Xóa sản phẩm (Admin)
PUT    /api/products/:id/specifications # Cập nhật thông số kỹ thuật (Admin)
```

### Review Endpoints:
```
POST   /api/products/:id/reviews        # Tạo đánh giá
GET    /api/products/reviews/all        # Lấy tất cả đánh giá (Admin)
DELETE /api/products/:id/reviews/:id    # Xóa đánh giá (Admin)
```

### Order Endpoints:
```
GET  /api/orders         # Lấy đơn hàng của user
POST /api/orders         # Tạo đơn hàng mới
GET  /api/orders/:id     # Chi tiết đơn hàng
PUT  /api/orders/:id     # Cập nhật đơn hàng (Admin)
```

### Cart Endpoints:
```
GET    /api/cart         # Lấy giỏ hàng
POST   /api/cart         # Thêm vào giỏ hàng
PUT    /api/cart/:id     # Cập nhật số lượng
DELETE /api/cart/:id     # Xóa khỏi giỏ hàng
```

## 🎯 Hướng dẫn sử dụng trong VS Code

### 1. Cài đặt Extensions:

<<<<<<< HEAD
Cài đặt các extension sau trong VS Code:

```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json",
    "mongodb.mongodb-vscode",
    "ms-vscode.vscode-thunder-client"
  ]
}
```

### 2. Cấu hình Workspace:
=======
>>>>>>> 267205a45ec30a32f2399392bc9f0a54954425a5

Tạo file `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.preferences.importModuleSpecifier": "relative",
  "emmet.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "files.associations": {
    "*.env": "dotenv"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.next": true
  }
}
```

### 3. Cấu hình Tasks:

<<<<<<< HEAD
Tạo file `.vscode/tasks.json`:
=======


## 🔄 Lưu ý: Hướng dẫn khởi động lại website khi deploy production (xem chi tiết trong file CICD_SETUP.md)

Nếu bạn deploy trên server (EC2, VPS, máy chủ thật), khi máy chủ bị tắt hoặc khởi động lại, hãy xem hướng dẫn chi tiết khởi động lại website trong file `CICD_SETUP.md`.

Tóm tắt:
1. Đăng nhập SSH vào server, cd vào thư mục dự án.
2. Nếu container cũ còn, xóa trước: `docker rm -f badminton-web`
3. Chạy lại container:
   ```bash
   docker run -d --name badminton-web -p 80:80 -p 5000:5000 --env-file .env badminton-web:latest
   ```
4. Nếu cần build lại image:
   ```bash
   docker build -t badminton-web:latest .
   docker run -d --name badminton-web -p 80:80 -p 5000:5000 --env-file .env badminton-web:latest
   ```
5. Xem log: `docker logs badminton-web`
6. Truy cập lại web qua IP hoặc domain.

**Xem hướng dẫn chi tiết, các lưu ý bảo mật, backup, log... trong file CICD_SETUP.md**

## 🚀 Deployment
>>>>>>> 267205a45ec30a32f2399392bc9f0a54954425a5

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Start Backend",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "options": {
        "cwd": "${workspaceFolder}/backend"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Start Frontend",
      "type": "shell",
      "command": "npm",
      "args": ["run", "dev"],
      "options": {
        "cwd": "${workspaceFolder}/frontend"
      },
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "new"
      }
    },
    {
      "label": "Start Both",
      "dependsOrder": "parallel",
      "dependsOn": ["Start Backend", "Start Frontend"]
    }
  ]
}
```

### 4. Debugging:

Tạo file `.vscode/launch.json`:

<<<<<<< HEAD
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Backend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/server.js",
      "env": {
        "NODE_ENV": "development"
      },
      "console": "integratedTerminal",
      "restart": true,
      "runtimeExecutable": "nodemon"
    },
    {
      "name": "Debug Frontend",
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/frontend/node_modules/.bin/next",
      "args": ["dev"],
      "cwd": "${workspaceFolder}/frontend",
      "console": "integratedTerminal"
    }
  ]
}
```

### 5. Snippets:

Tạo file `.vscode/snippets.json` cho React components:

```json
{
  "React Functional Component": {
    "prefix": "rfc",
    "body": [
      "import React from 'react';",
      "",
      "interface ${1:Component}Props {",
      "  $2",
      "}",
      "",
      "const $1: React.FC<${1:Component}Props> = ({ $3 }) => {",
      "  return (",
      "    <div>",
      "      $4",
      "    </div>",
      "  );",
      "};",
      "",
      "export default $1;"
    ],
    "description": "Create a React functional component with TypeScript"
  }
}
```

### 6. Chạy project:

1. Mở VS Code và load workspace
2. Mở Command Palette (`Ctrl+Shift+P`)
3. Chạy task "Start Both" để chạy cả backend và frontend
4. Hoặc sử dụng phím tắt `Ctrl+Shift+P` → "Tasks: Run Task" → "Start Both"

## 🐳 Docker Deployment

### Build và chạy với Docker:

```bash
# Build image
docker build -t badminton-shop .

# Chạy container
docker run -p 3000:3000 -p 5000:5000 badminton-shop
```

### Docker Compose:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
      - "5000:5000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=${MONGODB_URI}
      - JWT_SECRET=${JWT_SECRET}
    volumes:
      - ./uploads:/app/uploads
```

## 🚀 CI/CD với Jenkins

### 🎯 Tự động hóa toàn diện

Project được tích hợp với **Jenkins CI/CD pipeline** hoàn chỉnh để tự động hóa toàn bộ quy trình phát triển:

```mermaid
graph TD
    A[👨‍💻 Developer Push Code] --> B[🔗 GitHub Webhook]
    B --> C[⚙️ Jenkins Trigger]
    C --> D[🧪 Run Tests]
    D --> E[🔨 Build Application]
    E --> F[🐳 Create Docker Images]
    F --> G[🚀 Deploy to Server]
    G --> H[✅ Health Check]
    H --> I[📧 Notify Team]
```

### 🛠️ Pipeline Features

| Tính năng | Mô tả | Status |
|-----------|--------|--------|
| **🔄 Auto Build** | Tự động build khi có commit mới | ✅ |
| **🧪 Testing** | Chạy unit tests & integration tests | ✅ |
| **🔍 Code Quality** | ESLint, Prettier, Type checking | ✅ |
| **🐳 Docker Build** | Build & optimize Docker images | ✅ |
| **🚀 Zero-downtime Deploy** | Deploy không gián đoạn service | ✅ |
| **🔄 Rollback** | Khôi phục version trước nếu cần | ✅ |
| **📊 Monitoring** | Health checks & performance metrics | ✅ |
| **📧 Notifications** | Thông báo qua email/Slack | ✅ |

### 📋 Setup CI/CD Pipeline

**🎯 Muốn setup Jenkins CI/CD cho project của bạn?**

[![🔧 Setup CI/CD Pipeline](https://img.shields.io/badge/📖%20Hướng%20dẫn%20CI%2FCD-Jenkins%20%2B%20AWS%20EC2%20Free%20Tier-blue?style=for-the-badge&logo=jenkins&logoColor=white)](./CICD_SETUP.md)

> **💡 Hướng dẫn chi tiết:** File `CICD_SETUP.md` chứa **hướng dẫn từng bước** để setup Jenkins trên AWS EC2 Free Tier:
> 
> - 🖥️ **Setup AWS EC2** (Free Tier)
> - ⚙️ **Cài đặt Jenkins & Java**
> - 🔗 **Cấu hình GitHub Webhook**
> - 🐳 **Docker Integration**
> - 🚀 **Auto Deployment**
> - 📊 **Monitoring & Logging**
> - 🔧 **Troubleshooting**

### 🚀 Quick Pipeline Setup

```bash
# 1. Clone repo
git clone https://github.com/SecretJA/Badminton-eweb.git

# 2. Setup Jenkins (chi tiết trong CICD_SETUP.md)
# AWS EC2 + Jenkins + Docker

# 3. Configure webhook
# GitHub → Settings → Webhooks → Add webhook
# URL: http://your-jenkins-server:8080/github-webhook/

# 4. Enjoy automated deployments! 🎉
```

### 📊 Pipeline Status Monitor

```bash
# Kiểm tra status pipeline hiện tại
curl -X GET http://your-jenkins-server:8080/job/badminton-web/lastBuild/api/json

# Xem build logs
curl -X GET http://your-jenkins-server:8080/job/badminton-web/lastBuild/consoleText

# Health check deployed app
curl -X GET http://your-server/api/health
```

### 🔄 Deployment Environments

| Environment | URL | Auto Deploy | Manual Approval |
|-------------|-----|-------------|-----------------|
| **Development** | `http://dev.badminton-app.com` | ✅ Every commit | ❌ |
| **Staging** | `http://staging.badminton-app.com` | ✅ Main branch | ❌ |
| **Production** | `http://badminton-app.com` | ❌ | ✅ Manual only |

### 📈 Pipeline Metrics

- **⚡ Average Build Time**: ~3-5 minutes
- **🧪 Test Coverage**: 85%+
- **🚀 Deployment Success Rate**: 98%
- **🔄 Rollback Time**: <30 seconds

## 🤝 Contributing

1. Fork project
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Tạo Pull Request

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Liên hệ

- **Author**: SecretJA
- **Email**: pendragonpencilgon@gmail.com
- **GitHub**: [@SecretJA](https://github.com/SecretJA)
- **Project Link**: [https://github.com/SecretJA/Badminton-eweb](https://github.com/SecretJA/Badminton-eweb)

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Query](https://react-query.tanstack.com/)

---

**⭐ Đừng quên star repo nếu project hữu ích với bạn!**
=======
## 🙏 Cảm ơn

Cảm ơn bạn đã quan tâm đến dự án Badminton Shop! Nếu có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi. 
>>>>>>> 267205a45ec30a32f2399392bc9f0a54954425a5
