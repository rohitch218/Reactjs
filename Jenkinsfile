pipeline {
    agent React-Dev-Node

    environment {
        IMAGE_NAME = "react-app"
        TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/rohitch218/Reactjs.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$TAG .'
            }
        }

        stage('Finish') {
            steps {
                echo "Docker Image Built Locally: $IMAGE_NAME:$TAG"
            }
        }
    }
}
