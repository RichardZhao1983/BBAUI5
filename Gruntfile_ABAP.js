"use strict";

var rfc = require("node-rfc");
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
    var targetDir = "target";
    var zipFileSuffix = "-opt-static-abap.zip";
    var ctsDataFile = targetDir + "/CTS_Data.txt";
    var nexusGroupId = "com.yourcompany";

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
        uploadToABAP: {
            options: {
                conn: abapConn,
                zipFile: targetDir + "/<%= pkg.name %>" + zipFileSuffix,
                zipFileURL: nexusSnapshotRepoURL + "/" + nexusGroupId.replace(/\./g, "/") + "/<%= pkg.name %>/<%= pkg.version %>-SNAPSHOT/<%= pkg.name %>-<%= pkg.version %>-SNAPSHOT.zip",
                codePage: "UTF8"
            }
        }
        
    });

    grunt.registerTask("uploadToABAP", "Uploads the application to the ABAP System", function(transportRequest) {
        grunt.log.writeln("transportRequest",transportRequest);
        grunt.log.writeln("abapDevelopmentServer",abapDevelopmentServer);
        grunt.log.writeln("abapDevelopmentInstance",abapDevelopmentInstance);
        grunt.log.writeln("abapDevelopmentUser",abapDevelopmentUser);
        grunt.log.writeln("zipFile",this.options().zipFile);
        
    });
};