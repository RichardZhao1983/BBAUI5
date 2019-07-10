"use strict";

//var rfc = require("node-rfc");
var fs = require("fs");

module.exports = function(grunt) {

    // Project specific variables
    var abapDevelopmentUser = process.env.ABAP_DEVELOPMENT_USER;
    var abapDevelopmentPassword = process.env.ABAP_DEVELOPMENT_PASSWORD;
    var abapDevelopmentServer = process.env.ABAP_DEVELOPMENT_SERVER;
    var abapDevelopmentInstance = process.env.ABAP_DEVELOPMENT_INSTANCE;
    var abapDevelopmentClient = process.env.ABAP_DEVELOPMENT_CLIENT;
    var abapApplicationName = process.env.ABAP_APPLICATION_NAME;
    var abapApplicationDesc = process.env.ABAP_APPLICATION_DESC;
    var abapPackage = process.env.ABAP_PACKAGE;
    var jobURL = process.env.JOB_URL;
    var nexusSnapshotRepoURL = process.env.NEXUS_SNAPSHOT_REPO;
    var gitCommit = process.env.GIT_COMMIT;

    // Global Variables
    var zipDir = "dist";
    var zipFileSuffix = ".zip";
    var tmpDir = zipDir + "/tmp";

    // Project configuration.
    var abapConn = {
        user: abapDevelopmentUser,
        passwd: abapDevelopmentPassword,
        ashost: abapDevelopmentServer,
        sysnr: abapDevelopmentInstance,
        client: abapDevelopmentClient
    };

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        zip: {
            build: {
                cwd:  zipDir + "/",
                src:  zipDir + "/**/*",
                dest: zipDir + zipFileSuffix
            }
        },
        uploadToABAP: {
            options: {
                conn: abapConn,
                zipFileURL: zipDir + zipFileSuffix,
                codePage: "UTF8"
            }
        }
        
    });

    
    /*var rfcConnect = function(functionModule, importParameters, gruntContext) {
        return new Promise(function(resolve, reject) {
        var conn = gruntContext.options().conn;
        var client = new rfc.Client(conn);

        grunt.log.writeln("RFC client lib version:", client.getVersion());

        client.connect(function(err) {
            if (err) { // check for login/connection errors
                grunt.log.errorlns("could not connect to server", err);
                return reject();
            }
            // invoke remote enabled ABAP function module
            grunt.log.writeln("Invoking function module", functionModule);
            client.invoke(functionModule,
                importParameters,
                function(err, res) {
                    if (err) { // check for errors (e.g. wrong parameters)
                        grunt.log.errorlns("Error invoking", functionModule, err);
                        return reject();
                    }
                    client.close();
                    grunt.log.writeln("Messages:", res.EV_LOG_MESSAGES);
                    return resolve(res);
                });
            });
        });
    };*/

    grunt.loadNpmTasks("grunt-zip");

    grunt.registerTask("createZip", ["zip"]);

    grunt.registerTask("uploadToABAP", "Uploads the application to the ABAP System", function(transportRequest) {
        grunt.log.writeln("ConnInformation",this.options().conn);
        grunt.log.writeln("Uploading to ABAP");
        if (!transportRequest) {
            grunt.log.errorlns("No Transport request specified. Pass one explicitly or run createTransportRequest first.");
            return (false);
        }
        var url = this.options().zipFileURL;
        var importParameters = {
            IV_URL: url,
            IV_SAPUI5_APPLICATION_NAME: abapApplicationName,
            IV_SAPUI5_APPLICATION_DESC: abapApplicationDesc,
            IV_PACKAGE: abapPackage,
            IV_WORKBENCH_REQUEST: transportRequest,
            IV_TEST_MODE: "-",
            IV_EXTERNAL_CODE_PAGE: this.options().codePage
        };
        var done = this.async();
        grunt.log.writeln("Uploading application from", url);
       
        /*rfcConnect("/UI5/UI5_REPOSITORY_LOAD_HTTP", importParameters, this).then(
            function(returnValue) {
                if (returnValue.EV_SUCCESS == "E" || returnValue.EV_SUCCESS == "W") {
                    grunt.log.errorlns("Error invoking", "/UI5/UI5_REPOSITORY_LOAD_HTTP");
                    grunt.log.errorlns("Message Id:", returnValue.EV_MSG_ID);
                    grunt.log.errorlns("Message No:", returnValue.EV_MSG_NO);
                    grunt.log.errorlns("Messages:", returnValue.EV_LOG_MESSAGES);
                    done(false);
                    return;
                }
                grunt.log.writeln("Application uploaded.");
                done();
            },
            function() {
                done(false);
        });*/
    });
};