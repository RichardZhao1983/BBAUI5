pipeline {
    agent any
 
    stages {
        stage("Checkout") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GITHUB_ACCOUNT', url: 'https://github.com/RichardZhao1983/BBAUI5.git']]])   
            }
        }

        stage("Build") {
            steps {
                nodejs('NodeJs') {
                }
                sh 'npm install -g grunt-cli'
                sh 'npm install node-rfc@next'
                sh 'npm install grunt --no-color default'    
            }
        }
    }
 
    post {
        always {
            sh 'Hello World'
        }
    }
}