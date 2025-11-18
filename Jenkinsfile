pipeline {
    agent any
    
    environment {
        IMAGE_NAME = 'myapp'
        IMAGE_TAG = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Image') {
            steps {
                script {
                    sh """
                        docker build -t ${IMAGE_NAME}:${IMAGE_TAG} .
                        docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest
                    """
                }
            }
        }
        
        stage('Deploy') {
            steps {
                script {
                    sh """
                        docker compose -f docker-compose.app.yml down || true
                        docker compose -f docker-compose.app.yml up -d
                        sleep 5
                    """
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sh """
                        curl -f http://localhost || exit 1
                    """
                }
            }
        }
        
        stage('Cleanup Old Images') {
            steps {
                script {
                    sh """
                        docker image prune -af --filter "until=24h"
                    """
                }
            }
        }
    }
    
    post {
        success {
            echo '✅ Deployment successful!'
        }
        failure {
            echo '❌ Deployment failed!'
            sh 'docker compose -f docker-compose.app.yml down || true'
        }
    }
}