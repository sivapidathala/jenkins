pipeline {
  agent any
  tools {
    nodejs "node-20"    // optional if you configured Jenkins NodeJS tool; otherwise use shell install
  }
  environment {
    ARTIFACT_NAME = "artifact-${env.BUILD_NUMBER}.zip"
  }
  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }
    stage('Lint (optional)') {
      steps {
        // if you have eslint configured
        sh 'if [ -f package.json ]; then npx eslint . || true; fi'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test -- --ci || true'
      }
      post {
        always {
          // collect test results (if using JUnit XML)
          junit 'tests/*.xml'
        }
      }
    }
    stage('Build / Package') {
      steps {
        sh 'mkdir -p build && zip -r build/${ARTIFACT_NAME} src package.json'
        archiveArtifacts artifacts: 'build/**', fingerprint: true
      }
    }
  }
  post {
    success {
      echo "Build succeeded: ${env.BUILD_URL}"
    }
    failure {
      echo "Build failed: ${env.BUILD_URL}"
    }
    always {
      // workspace cleanup, notifications, etc.
    }
  }
}
