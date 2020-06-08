def check_runs = new main.script.buildGithubCheckScript()
pipeline {
    agent {
        kubernetes {
            label "GitHub-Check-Runs-${UUID.randomUUID().toString().substring(0,8)}"
            defaultContainer 'jnlp'
        }
    }
    //agent any
    stages {
        stage('Checkout') {
            steps {
                script {
                    git (credentialsId: 'github-token',
                    url: "https://github.com/MiliMR/jenkins-project",
                    branch: "**")
                }
            }
        }
        stage('Compile') {
            steps {
                dir('dotty-example-project'){
                    withCredentials([sshUserPrivateKey(credentialsId: '<credentialsId>', keyFileVariable: 'privateKey', passphraseVariable: '', usernameVariable: '')]) {
                        try {
                            build_command = sh(script: "sbt clean compile", returnStatus: true)
                            check_runs.buildGithubCheck(jenkins-project, $GIT_COMMIT, privateKey, 'success', "compile")
                        } catch(Exception e) {
                            check_runs.buildGithubCheck(jenkins-project, $GIT_COMMIT, privateKey, 'failure', "compile")
                            echo "Exception: ${e}"
                        }
                    }
                    /*sh 'pwd'
                    sh 'sbt clean compile'*/
                }
            }
        }
        stage('Create Result Dir') {
            steps {
                dir('dotty-example-project'){
                    withCredentials([sshUserPrivateKey(credentialsId: '<credentialsId>', keyFileVariable: 'privateKey', passphraseVariable: '', usernameVariable: '')]) {
                        try {
                            remove_command = sh(script: "rm -rf build/owasp", returnStatus: true)
                            create_dir_command = sh(script: "mkdir -p build/owasp", returnStatus: true)
                            check_runs.buildGithubCheck(jenkins-project, $GIT_COMMIT, privateKey, 'success', "create_dir")
                        } catch(Exception e) {
                            check_runs.buildGithubCheck(jenkins-project, $GIT_COMMIT, privateKey, 'failure', "create_dir")
                            echo "Exception: ${e}"
                        }
                    }
                }
            }
        }
        stage('Dependencies Check') {
            steps {
                dir('dotty-example-project'){
                    withCredentials([sshUserPrivateKey(credentialsId: '<credentialsId>', keyFileVariable: 'privateKey', passphraseVariable: '', usernameVariable: '')]) {
                        try {
                            dependencycheck additionalArguments: '--project dotty-example-project --scan . --out build/owasp/dependency-check-report.xml --format XML --noupdate', odcInstallation: 'Dependency Checker'
                            dependencyCheckPublisher pattern: 'build/owasp/dependency-check-report.xml'
                            check_runs.buildGithubCheck(jenkins-project, $GIT_COMMIT, privateKey, 'success', "dependency_check")
                        } catch(Exception e) {
                            check_runs.buildGithubCheck(jenkins-project, $GIT_COMMIT, privateKey, 'failure', "dependency_check")
                            echo "Exception: ${e}"
                        }
                    }
                    /*sh 'pwd'
                    sh 'sbt dependencyCheck'
                    sh 'rm -rf build/owasp'
                    sh 'mkdir -p build/owasp'
                    dependencycheck additionalArguments: '--project dotty-example-project --scan . --out build/owasp/dependency-check-report.xml --format XML --noupdate', odcInstallation: 'Dependency Checker'
                    sh 'ls -alh build/owasp'
                    dependencyCheckPublisher pattern: 'build/owasp/dependency-check-report.xml' */
                }
            }
        }

    }/*
    post{
        always{
            echo "FINISHED"
        }
    }
    post{
        success{
         sh 'curl "https://api.GitHub.com/repos/MiliMR/jenkins-project/statuses/$GIT_COMMIT?access_token=75520b18d757d8310464b1053a8ea4acf8b7ffa2" \
            -H "Content-Type: application/json" \
            -X POST \
            -d "{\"state\": \"success\",\"context\": \"check/jenkins\", \"description\": \"Another Jenkins\", \"target_url\": \"https://6d74e12b3b76.eu.ngrok.io/job/manage-pipeline/$BUILD_NUMBER/console\"}"'        }
        failure{
            sh 'curl "https://api.GitHub.com/repos/MiliMR/jenkins-project/statuses/$GIT_COMMIT?access_token=75520b18d757d8310464b1053a8ea4acf8b7ffa2" \
            -H "Content-Type: application/json" \
            -X POST \
            -d "{\"state\": \"failure\",\"context\": \"check/jenkins\", \"description\": \"Another Jenkins\", \"target_url\": \"https://6d74e12b3b76.eu.ngrok.io/job/manage-pipeline/$BUILD_NUMBER/console\"}"'
        }
    }*/
}
