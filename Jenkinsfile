// Powered by Infostretch 

timestamps {

node () {

	stage ('AI_nw.epm.refapps.ext.shop_master - Checkout') {
 	 checkout([$class: 'GitSCM', branches: [[name: '*/master']], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: 'GITHUB_ACCOUNT', url: 'https://github.com/RichardZhao1983/BBAUI5.git']]]) 
	}
	stage ('AI_nw.epm.refapps.ext.shop_master - Build') {
 	
// Unable to convert a build step referring to "hudson.plugins.ws__cleanup.PreBuildCleanup". Please verify and convert manually if required.
// Unable to convert a build step referring to "EnvInjectPasswordWrapper". Please verify and convert manually if required.
// Unable to convert a build step referring to "jenkins.plugins.nodejs.NodeJSBuildWrapper". Please verify and convert manually if required.		// Shell build step
sh """ 
export PATH=/usr/local/bin:/path/to/node:/path/to/node_bin:$PATH;
npm install -g grunt-cli
npm install node-rfc@next 
 """		// Shell build step
sh """ 
npm install
grunt --no-color default 
 """		// Shell build step
sh """ 
npm install
grunt --no-color --gruntfile Gruntfile_ABAP.js createZip uploadToABAP:$TRANSPORT_REQUEST 
 """ 
	}
}
}