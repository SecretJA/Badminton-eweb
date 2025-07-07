
# CI/CD Setup Guide with Jenkins (AWS EC2 Free Tier)

## Prerequisites

1. AWS EC2 instance (Free Tier):
   - Ubuntu Server 22.04 LTS (khuyến nghị, nhẹ, ổn định)
   - 1 vCPU, 1GB RAM, 30GB storage (Free Tier)
   - Security group mở các port:
     - 22 (SSH)
     - 80 (HTTP)
     - 8080 (Jenkins)
     - 5000 (Backend API, nếu cần truy cập trực tiếp)

2. GitHub repository với mã nguồn project

## Installation Steps


### 1. Install Jenkins & Java (latest stable)

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install latest OpenJDK (JDK 21 LTS)
sudo apt install openjdk-21-jdk -y

# Verify Java version
java -version

# Add Jenkins repository
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null
echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Install Jenkins
sudo apt update
sudo apt install jenkins -y

# Start Jenkins
sudo systemctl start jenkins
sudo systemctl enable jenkins
```


### 2. Install Docker

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Add both ubuntu and jenkins user vào group docker (fix lỗi permission)
sudo usermod -aG docker ubuntu
sudo usermod -aG docker jenkins

# Đăng xuất SSH và đăng nhập lại để group có hiệu lực (hoặc reboot)
exit
# Sau đó SSH lại vào EC2

# Restart Jenkins để nhận quyền docker
sudo systemctl restart jenkins
```


### 3. Configure Jenkins

1. Truy cập Jenkins tại http://your-ec2-ip:8080
2. Lấy mật khẩu admin lần đầu:
   ```bash
   sudo cat /var/lib/jenkins/secrets/initialAdminPassword
   ```
3. Cài đặt plugin đề xuất
4. Tạo user admin
5. Cài thêm các plugin:
   - Docker Pipeline
   - GitHub Integration
   - Credentials Plugin

### 4. Configure Jenkins Credentials

1. Vào Jenkins Dashboard > Manage Jenkins > Manage Credentials
2. Thêm các credentials:
   - mongodb-credentials (Username with password)
     - ID: mongodb-credentials
     - Username: [MongoDB database name]
     - Password: [MongoDB connection string]
   - cloudinary-credentials (Secret text)
     - ID: cloudinary-credentials
     - Secret: [Cloudinary API Secret]
   - jwt-secret (Secret text)
     - ID: jwt-secret
     - Secret: [Your JWT secret key]
   - encryption-key (Secret text)
     - ID: encryption-key
     - Secret: [Your 64-character encryption key]

### 5. Configure GitHub Webhook

1. Go to your GitHub repository > Settings > Webhooks
2. Add webhook:
   - Payload URL: http://your-ec2-ip:8080/github-webhook/
   - Content type: application/json
   - Select: Just the push event
   - Active: ✓

### 6. Create Jenkins Pipeline

1. Go to Jenkins Dashboard > New Item
2. Enter name and select "Pipeline"
3. Configure:
   - GitHub project: [Your repository URL]
   - Build Triggers: GitHub hook trigger for GITScm polling
   - Pipeline: Pipeline script from SCM
   - SCM: Git
   - Repository URL: [Your repository URL]
   - Credentials: Add your GitHub credentials
   - Branch Specifier: */main
   - Script Path: Jenkinsfile

## Usage

1. The pipeline will automatically trigger when you push to the main branch
2. You can also trigger manually from Jenkins dashboard
3. Monitor the build process in Jenkins

## Troubleshooting

1. Nếu Jenkins không truy cập được Docker:
   ```bash
   # Đảm bảo cả user ubuntu và jenkins đều thuộc group docker
   sudo usermod -aG docker ubuntu
   sudo usermod -aG docker jenkins
   # Đăng xuất SSH và đăng nhập lại, hoặc reboot EC2
   sudo reboot
   ```

2. Nếu nginx config lỗi:
   ```bash
   docker exec -it [container-id] nginx -t
   ```

3. Xem log container:
   ```bash
   docker logs [container-id]
   ```

## Security Notes

1. Luôn dùng Jenkins credentials cho dữ liệu nhạy cảm
2. Thường xuyên update hệ thống bằng `sudo apt update && sudo apt upgrade -y`
3. Đặt mật khẩu mạnh cho tất cả dịch vụ
4. Có thể dùng AWS Secrets Manager cho production
5. Kiểm tra kỹ security group của EC2, chỉ mở port cần thiết

## Maintenance

1. Backup Jenkins:
   ```bash
   sudo tar -zcvf jenkins_backup.tar.gz /var/lib/jenkins
   ```

2. Xoá image Docker cũ:
   ```bash
   docker system prune -a
   ```

3. Kiểm tra dung lượng ổ đĩa:
   ```bash
   df -h
   ```
