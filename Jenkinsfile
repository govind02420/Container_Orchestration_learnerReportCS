pipeline {
    agent any

    environment {
        REGISTRY      = "your-dockerhub-username"   // e.g. docker.io/nikhilp
        APP_NAME      = "learner-report"
        NAMESPACE     = "learner-report"
        CHART_PATH    = "charts/learner-report"
        BACKEND_IMG   = "${env.REGISTRY}/${env.APP_NAME}-backend"
        FRONTEND_IMG  = "${env.REGISTRY}/${env.APP_NAME}-frontend"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Images') {
            parallel {
                stage('Backend') {
                    steps {
                        script {
                            sh """
                              docker build -t ${BACKEND_IMG}:${BUILD_NUMBER} ./backend
                              docker push ${BACKEND_IMG}:${BUILD_NUMBER}
                            """
                        }
                    }
                }
                stage('Frontend') {
                    steps {
                        script {
                            sh """
                              docker build -t ${FRONTEND_IMG}:${BUILD_NUMBER} ./frontend
                              docker push ${FRONTEND_IMG}:${BUILD_NUMBER}
                            """
                        }
                    }
                }
            }
        }

        stage('Deploy with Helm') {
            steps {
                script {
                    sh """
                      helm upgrade --install learner ${CHART_PATH} \
                        --namespace ${NAMESPACE} --create-namespace \
                        --set backend.image.repository=${BACKEND_IMG} \
                        --set backend.image.tag=${BUILD_NUMBER} \
                        --set frontend.image.repository=${FRONTEND_IMG} \
                        --set frontend.image.tag=${BUILD_NUMBER}
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Build/Deploy failed. Check logs."
        }
    }
}
