pipeline {
    agent any
    
    environment {
        DOCKER_IMAGE = 'badminton-web'
        DOCKER_TAG = 'latest'
        // Các biến môi trường đúng với file .env thực tế
        PORT = '5000'
        NODE_ENV = 'production'
        MONGODB_URI = credentials('MONGODB_URI')
        JWT_SECRET = credentials('JWT_SECRET')
        ENCRYPTION_KEY = credentials('ENCRYPTION_KEY')
        CLOUDINARY_CLOUD_NAME = credentials('CLOUDINARY_CLOUD_NAME')
        CLOUDINARY_API_KEY = credentials('CLOUDINARY_API_KEY')
        CLOUDINARY_API_SECRET = credentials('CLOUDINARY_API_SECRET')
        FRONTEND_URL = credentials('FRONTEND_URL')
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
                    // Tạo file .env đúng chuẩn dự án từ Jenkins credentials
                    sh '''
cat > .env <<EOL
PORT=${PORT}
NODE_ENV=${NODE_ENV}
MONGODB_URI=${MONGODB_URI}
JWT_SECRET=${JWT_SECRET}
ENCRYPTION_KEY=${ENCRYPTION_KEY}
CLOUDINARY_CLOUD_NAME=${CLOUDINARY_CLOUD_NAME}
CLOUDINARY_API_KEY=${CLOUDINARY_API_KEY}
CLOUDINARY_API_SECRET=${CLOUDINARY_API_SECRET}
FRONTEND_URL=${FRONTEND_URL}
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
                        # Đợi 45 giây cho ứng dụng khởi động (tăng delay)
                        sleep 45

                        # Kiểm tra frontend (in log nếu lỗi)
                        if curl -f http://localhost:80 >/dev/null 2>&1; then
                            echo "Frontend is running"
                        else
                            echo "Frontend health check failed"
                            echo "==== NGINX LOG ===="
                            docker logs ${DOCKER_IMAGE} || true
                            exit 1
                        fi

                        # Kiểm tra backend
                        if curl -f http://localhost:5000/api/health >/dev/null 2>&1; then
                            echo "Backend is running"
                        else
                            echo "Backend health check failed"
                            docker logs ${DOCKER_IMAGE} || true
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
