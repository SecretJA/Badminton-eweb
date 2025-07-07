pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'badminton-web'
        DOCKER_TAG = 'latest'
        // Định nghĩa các credentials được cấu hình trong Jenkins
        MONGODB_CREDS = credentials('mongodb-credentials')
        CLOUDINARY_CREDS = credentials('cloudinary-credentials')
        JWT_SECRET = credentials('jwt-secret')
        ENCRYPTION_KEY = credentials('encryption-key')
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Checkout code từ GitHub repository
                checkout scm
            }
        }
        
        stage('Create Environment File') {
            steps {
                script {
                    // Tạo file .env với các biến môi trường từ Jenkins credentials
                    sh '''
                        cat > .env << EOL
PORT=5000
NODE_ENV=production
MONGODB_URI=${MONGODB_CREDS_PSW}
JWT_SECRET=${JWT_SECRET}
ENCRYPTION_KEY=${ENCRYPTION_KEY}
CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CREDS_USR}
CLOUDINARY_API_KEY=${CLOUDINARY_CREDS_PSW}
CLOUDINARY_API_SECRET=${CLOUDINARY_CREDS}
FRONTEND_URL=https://your-domain.com
EOL
                    '''
                }
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    // Build Docker image
                    docker.build("${DOCKER_IMAGE}:${DOCKER_TAG}")
                }
            }
        }
        
        stage('Deploy to EC2') {
            steps {
                script {
                    // Stop và xóa container cũ nếu tồn tại
                    sh '''
                        if docker ps -a | grep -q ${DOCKER_IMAGE}; then
                            docker stop ${DOCKER_IMAGE}
                            docker rm ${DOCKER_IMAGE}
                        fi
                    '''
                    
                    // Chạy container mới
                    sh '''
                        docker run -d \
                            --name ${DOCKER_IMAGE} \
                            -p 80:80 \
                            -p 5000:5000 \
                            --env-file .env \
                            ${DOCKER_IMAGE}:${DOCKER_TAG}
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    // Kiểm tra health của ứng dụng
                    sh '''
                        # Đợi 30 giây cho ứng dụng khởi động
                        sleep 30
                        
                        # Kiểm tra frontend
                        if curl -f http://localhost:80 >/dev/null 2>&1; then
                            echo "Frontend is running"
                        else
                            echo "Frontend health check failed"
                            exit 1
                        fi
                        
                        # Kiểm tra backend
                        if curl -f http://localhost:5000/api/health >/dev/null 2>&1; then
                            echo "Backend is running"
                        else
                            echo "Backend health check failed"
                            exit 1
                        fi
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
        always {
            // Cleanup old images
            sh 'docker system prune -f'
        }
    }
}
