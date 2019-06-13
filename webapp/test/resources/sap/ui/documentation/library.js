/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'sap/ui/core/util/LibraryInfo',"sap/base/Log",'sap/ui/core/library','sap/m/library'],function(q,L,a){'use strict';sap.ui.getCore().initLibrary({name:'sap.ui.documentation',version:'1.60.10',dependencies:['sap.ui.core','sap.m'],types:[],interfaces:[],controls:["sap.ui.documentation.sdk.controls.Search","sap.ui.documentation.sdk.controls.ObjectPageSubSection","sap.ui.documentation.sdk.controls.LightTable","sap.ui.documentation.sdk.controls.Row"],elements:[],noLibraryCSS:true});var t=sap.ui.documentation;var _;t._getLicense=function(){var u="./LICENSE.txt";return q.ajax({url:u,dataType:"text"});};t._getAppInfo=function(c){var u=sap.ui.resource("","sap-ui-version.json");q.ajax({url:u,dataType:"json",error:function(x,s,e){a.error("failed to load library list from '"+u+"': "+s+", "+e);c(null);},success:function(A,s,x){if(!A){a.error("failed to load library list from '"+u+"': "+s+", Data: "+A);c(null);return;}c(A);}});};t._getLibraryInfoSingleton=function(){if(!_){_=new L();}return _;};t._loadAllLibInfo=function(A,I,r,c){if(typeof r==="function"){c=r;r=undefined;}var l=t._getLibraryInfoSingleton();var f=I=="_getLibraryInfoAndReleaseNotes";if(f){I="_getLibraryInfo";}t._getAppInfo(function(o){if(!(o&&o.libraries)){c(null,null);return;}var b=0,d=o.libraries,e=d.length,g={},h={},j=[],k,m;for(var i=0;i<e;i++){k=d[i].name;m=d[i].version;j.push(k);h[k]=m;l[I](k,function(E){var D=function(){b++;if(b==e){c(j,g,o);}};g[E.library]=E;if(!g[E.library].version){g[E.library].version=h[E.library];}if(f){if(!r){r=h[E.library];}l._getReleaseNotes(E.library,r,function(R){g[E.library].relnotes=R;D();});}else{D();}});}});};return t;});
