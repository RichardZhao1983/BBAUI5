#!groovy​
pipeline {
    //agent any
 	agent { label 'slave-linux' }
    stages {

        stage("Clean") {
            steps {
                cleanWs()
            }
        }

        stage("Checkout") {
            steps {
                checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GITHUB_ACCOUNT', url: 'https://github.com/RichardZhao1983/BBAUI5.git']]])   
            }
        }

        stage("Install") {
            steps {
                nodejs('NodeJs') {
                }
                sh 'npm --registry https://registry.npm.taobao.org install -g grunt-cli'
                sh 'npm --registry https://registry.npm.taobao.org install node-rfc@next'
                sh 'npm --registry https://registry.npm.taobao.org install @sap/grunt-sapui5-bestpractice-build'
                sh 'npm --registry https://registry.npm.taobao.org install grunt-zip'    
            }
        }

        stage("Build") {
            steps {
                sh 'grunt --no-color default'
            }
        }

        stage("Zip") {
            steps {
               sh 'grunt --no-color --gruntfile Gruntfile_ABAP.js createZip'
            }
        }

        stage("Deploy") {
            steps {
              sh 'grunt --no-color --gruntfile Gruntfile_ABAP.js uploadToABAP:$TRANSPORT_REQUEST' 
            }
        }
    }
 
    post {
        always {
            echo 'Testing..'        
        }
    }
}