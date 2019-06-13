/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Component","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/thirdparty/hasher","sap/base/Log","sap/base/util/UriParameters","sap/base/util/uid","sap/base/strings/formatMessage","sap/ui/base/ManagedObject","sap/ui/core/mvc/View"],function(q,C,B,h,L,U,u,f,M,V){"use strict";var l=["VENDOR","PARTNER","CUSTOMER_BASE","CUSTOMER","USER"];var m={};l.forEach(function(s,i){m[s]=i;});var a={_aLayers:l,_mLayersIndex:m,_sTopLayer:l[l.length-1],_sMaxLayer:l[l.length-1],DEFAULT_APP_VERSION:"DEFAULT_APP_VERSION",APP_ID_AT_DESIGN_TIME:"${pro"+"ject.art"+"ifactId}",log:{error:function(s,d,c){L.error(s,d,c);},warning:function(s,d,c){L.warning(s,d,c);},debug:function(s,d,c){L.debug(s,d,c);},info:function(s,d,c){L.info(s,d,c);}},formatAndLogMessage:function(s,b,v,c){var d=b.join(' ');d=f(d,v);this.log[s](d,c||"");},getXSRFTokenFromControl:function(c){var o;if(!c){return"";}if(c&&typeof c.getModel==="function"){o=c.getModel();return a._getXSRFTokenFromModel(o);}return"";},_getXSRFTokenFromModel:function(o){var H;if(!o){return"";}if(typeof o.getHeaders==="function"){H=o.getHeaders();if(H){return H["x-csrf-token"];}}return"";},getComponentClassName:function(c){var A;if(c){A=this.getAppComponentForControl(c);if(A){var v=this._getComponentStartUpParameter(A,"sap-app-id");if(v){return v;}if(A.getManifestEntry("sap.ui5")&&A.getManifestEntry("sap.ui5").appVariantId){return A.getManifestEntry("sap.ui5").appVariantId;}}}return a.getComponentName(A);},isVariantByStartupParameter:function(c){if(c){var A=this.getAppComponentForControl(c);if(A){return!!this._getComponentStartUpParameter(A,"sap-app-id");}}return false;},getAppComponentClassNameForComponent:function(c){return a.getComponentClassName(c);},getAppDescriptor:function(c){var o=null,b=null,d=null;if(c){b=this.getAppComponentForControl(c);if(b&&b.getMetadata){d=b.getMetadata();if(d&&d.getManifest){o=d.getManifest();}}}return o;},getSiteId:function(c){var s=null,A=null;if(c){A=this.getAppComponentForControl(c);if(A){s=this._getComponentStartUpParameter(A,"hcpApplicationId");}}return s;},getSiteIdByComponentData:function(c){var s=null;s=this._getStartUpParameter(c,"hcpApplicationId");return s;},isAppVariantMode:function(c){return(a.isVendorLayer()&&a.isApplicationVariant(c));},isBinding:function(p){var i=false;if(p&&typeof p==="string"&&p.substring(0,1)==="{"&&p.slice(-1)==="}"){i=true;}return i;},isVendorLayer:function(){if(a.getCurrentLayer(false)==="VENDOR"){return true;}return false;},isApplicationVariant:function(c){var F=a.getComponentClassName(c);var A=a.getAppComponentForControl(c);var s=a.getComponentName(A);return F!==s;},setMaxLayerParameter:function(s){this._sMaxLayer=s||this._sTopLayer;},getLayerIndex:function(s){return this._mLayersIndex[s];},isOverMaxLayer:function(s){return(this.getLayerIndex(s)>this.getLayerIndex(this._sMaxLayer));},compareAgainstCurrentLayer:function(s,c){var b=c||a.getCurrentLayer(false);if((this.getLayerIndex(b)>this.getLayerIndex(s))||!s){return-1;}else if(this.getLayerIndex(b)===this.getLayerIndex(s)){return 0;}else{return 1;}},isLayerFilteringRequired:function(){return!(this._sTopLayer===this._sMaxLayer);},_getComponentStartUpParameter:function(c,p){var s=null;if(p){if(c&&c.getComponentData){s=this._getStartUpParameter(c.getComponentData(),p);}}return s;},_getStartUpParameter:function(c,p){if(c&&c.startupParameters&&p){if(Array.isArray(c.startupParameters[p])){return c.startupParameters[p][0];}}},getComponentName:function(c){var s="";if(c){s=c.getMetadata().getName();}if(s.length>0&&s.indexOf(".Component")<0){s+=".Component";}return s;},_getComponent:function(c){var o;if(c){o=C.get(c);}return o;},_getComponentIdForControl:function(c){var s=a._getOwnerIdForControl(c);if(!s){if(c&&typeof c.getParent==="function"){return a._getComponentIdForControl(c.getParent());}}return s||"";},getComponentForControl:function(c){return a._getComponentForControl(c);},getAppComponentForControl:function(c){var o=c instanceof C?c:this._getComponentForControl(c);return this._getAppComponentForComponent(o);},_getComponentForControl:function(c){var o=null;var s=null;if(c){s=a._getComponentIdForControl(c);if(s){o=a._getComponent(s);}}return o;},_getAppComponentForComponent:function(c){var s=null;if(c&&c.getAppComponent){return c.getAppComponent();}if(c&&c.oComponentData&&c.oComponentData.appComponent){return c.oComponentData.appComponent;}if(c&&c.getManifestEntry){s=c.getManifestEntry("sap.app");}else{return c;}if(s&&s.type&&s.type!=="application"){if(c instanceof C){c=this._getComponentForControl(c);}return this.getAppComponentForControl(c);}return c;},getViewForControl:function(c){return a.getFirstAncestorOfControlWithControlType(c,sap.ui.core.mvc.View);},getFirstAncestorOfControlWithControlType:function(c,b){if(c instanceof b){return c;}if(c&&typeof c.getParent==="function"){c=c.getParent();return a.getFirstAncestorOfControlWithControlType(c,b);}},hasControlAncestorWithId:function(c,A){var o;if(c===A){return true;}o=sap.ui.getCore().byId(c);while(o){if(o.getId()===A){return true;}if(typeof o.getParent==="function"){o=o.getParent();}else{return false;}}return false;},_isView:function(c){return c instanceof V;},_getOwnerIdForControl:function(c){return C.getOwnerIdFor(c);},getCurrentLayer:function(i){var o,b;if(i){return"USER";}o=this._getUriParameters();b=o.mParams["sap-ui-layer"];if(b&&b.length>0){return b[0];}return"CUSTOMER";},doesSharedVariantRequirePackage:function(){var c;c=a.getCurrentLayer(false);if((c==="VENDOR")||(c==="PARTNER")||(c==="CUSTOMER_BASE")){return true;}return false;},getClient:function(){var o,c;o=this._getUriParameters();c=o.mParams["sap-client"];if(c&&c.length>0){return c[0];}return undefined;},_getUriParameters:function(){return new U(window.location.href);},isHotfixMode:function(){var o,i,I;o=this._getUriParameters();i=o.mParams["hotfix"];if(i&&i.length>0){I=i[0];}return(I==="true");},convertBrowserLanguageToISO639_1:function(b){if(!b||typeof b!=="string"){return"";}var n=b.indexOf("-");if((n<0)&&(b.length<=2)){return b.toUpperCase();}if(n>0&&n<=2){return b.substring(0,n).toUpperCase();}return"";},getCurrentLanguage:function(){var s=sap.ui.getCore().getConfiguration().getLanguage();return a.convertBrowserLanguageToISO639_1(s);},getControlType:function(c){var o;if(c&&typeof c.getMetadata==="function"){o=c.getMetadata();if(o&&typeof o.getElementName==="function"){return o.getElementName();}}},asciiToString:function(b){var c=b.split(",");var p="";q.each(c,function(i,d){p+=String.fromCharCode(d);});return p;},stringToAscii:function(s){var b="";for(var i=0;i<s.length;i++){b+=s.charCodeAt(i)+",";}b=b.substring(0,b.length-1);return b;},checkControlId:function(c,A,s){if(!A){c=c instanceof M?c:sap.ui.getCore().byId(c);A=a.getAppComponentForControl(c);}return B.checkControlId(c,A,s);},hasLocalIdSuffix:B.hasLocalIdSuffix,_getAllUrlParameters:function(){return window.location.search.substring(1);},getTechnicalParametersForComponent:function(c){return c&&c.getComponentData&&c.getComponentData()&&c.getComponentData().technicalParameters;},getParsedURLHash:function(){var o=a.getUshellContainer();if(o){var b=o.getService("URLParsing");var p=b.parseShellHash(h.getHash());return p?p:{};}return{};},setTechnicalURLParameterValues:function(c,p,v){var P=a.getParsedURLHash(p);if(P.params){h.changed.active=false;var t=a.getTechnicalParametersForComponent(c);if(!t){this.log.warning("Component instance not provided, so technical parameters in component data and browser history remain unchanged");}if(v.length===0){delete P.params[p];t&&delete t[p];}else{P.params[p]=v;t&&(t[p]=v);}h.replaceHash(a.getUshellContainer().getService("URLParsing").constructShellHash(P));h.changed.active=true;}},isDebugEnabled:function(){var o=this._getUriParameters();var d=o.get("sap-ui-debug")||"";if(sap.ui.getCore().getConfiguration().getDebug()||d==="true"){return true;}var D=d.split(",");return D.indexOf("sap/ui/fl")!==-1||D.indexOf("sap/ui/fl/")!==-1;},getUrlParameter:function(p){return new U(window.location.href).get(p);},getUshellContainer:function(){return sap.ushell&&sap.ushell.Container;},createDefaultFileName:function(n){var F=u().replace(/-/g,"_");if(n){F+='_'+n;}return F;},createNamespace:function(p,s){var r=p.reference.replace('.Component','');var n='apps/'+r+"/"+s+"/";return n;},buildLrepRootNamespace:function(b,s,p){var r="apps/";var e=new Error("Error in sap.ui.fl.Utils#buildLrepRootNamespace: ");if(!b){e.message+="for every scenario you need a base ID";throw e;}switch(s){case sap.ui.fl.Scenario.AppVariant:if(!p){e.message+="in an app variant scenario you additionaly need a project ID";throw e;}r+=b+"/appVariants/"+p+"/";break;case sap.ui.fl.Scenario.AdaptationProject:if(!p){e.message+="in a adaptation project scenario you additionaly need a project ID";throw e;}r+=b+"/adapt/"+p+"/";break;case sap.ui.fl.Scenario.FioriElementsFromScratch:case sap.ui.fl.Scenario.UiAdaptation:default:r+=b+"/";}return r;},isApplication:function(o){return(o&&o.getEntry&&o.getEntry("sap.app")&&o.getEntry("sap.app").type==="application");},isEmbeddedComponent:function(c){return c instanceof C&&!!c.getManifestEntry("sap.app")&&c.getManifestEntry("sap.app").type==="component";},getFlexReference:function(o){if(o){if(o.getEntry("sap.ui5")){if(o.getEntry("sap.ui5").appVariantId){return o.getEntry("sap.ui5").appVariantId;}if(o.getEntry("sap.ui5").componentName){return o.getEntry("sap.ui5").componentName+".Component";}}if(o.getEntry("sap.app")&&o.getEntry("sap.app").id){var A=o.getEntry("sap.app").id;if(A===a.APP_ID_AT_DESIGN_TIME&&o.getComponentName){A=o.getComponentName();}return A+".Component";}}this.log.warning("No Manifest received.");return"";},getAppVersionFromManifest:function(o){var v="";if(o){var s=(o.getEntry)?o.getEntry("sap.app"):o["sap.app"];if(s&&s.applicationVersion&&s.applicationVersion.version){v=s.applicationVersion.version;}}else{this.log.warning("No Manifest received.");}return v;},getODataServiceUriFromManifest:function(o){var s="";if(o){var S=(o.getEntry)?o.getEntry("sap.app"):o["sap.app"];if(S&&S.dataSources&&S.dataSources.mainService&&S.dataSources.mainService.uri){s=S.dataSources.mainService.uri;}}else{this.log.warning("No Manifest received.");}return s;},isCorrectAppVersionFormat:function(v){v=v.replace(/\s/g,"");var r=/\b\d{1,5}(.\d{1,5}){0,2}/g;var R=/\b\d{1,5}(\.\d{1,5}){0,2}/g;var n=v.match(r)?v.match(r)[0].length:0;var b=v.match(R)?v.match(R)[0].length:0;if(b<1||b!=n){return false;}if(b&&v!=v.substr(0,b)){var c=v.substr(b,1);var o=/^[0-9.]$/;if(o.test(c)){return false;}}var d=v.substr(0,b).split(".");if(d.length>3){return false;}if(!d.every(function(p){return p.length<=5;})){return false;}return true;},isCustomerDependentLayer:function(s){return(["CUSTOMER","CUSTOMER_BASE"].indexOf(s)>-1);},indexOfObject:function(A,o){var O=-1;A.some(function(b,i){var k,K;if(!b){k=[];}else{k=Object.keys(b);}if(!o){K=[];}else{K=Object.keys(o);}var s=k.length===K.length;var c=s&&!k.some(function(d){return b[d]!==o[d];});if(c){O=i;}return c;});return O;},execPromiseQueueSequentially:function(p,t,A){if(p.length===0){if(A){return Promise.resolve();}return new a.FakePromise();}var P=p.shift();if(typeof P==="function"){try{var r=P();}catch(e){r=Promise.reject(e);}return r.then(function(){if(!A&&r instanceof Promise){A=true;}}).catch(function(e){var E="Error during execPromiseQueueSequentially processing occured";E+=e?": "+e.message:"";this.log.error(E);if(t){throw new Error(E);}}.bind(this)).then(function(){return this.execPromiseQueueSequentially(p,t,A);}.bind(this));}else{this.log.error("Changes could not be applied, promise not wrapped inside function.");return this.execPromiseQueueSequentially(p,t,A);}},FakePromise:function(i,e,I){a.FakePromise.fakePromiseIdentifier="sap.ui.fl.Utils.FakePromise";this.vValue=i;this.vError=e;this.bContinueWithFakePromise=arguments.length<3||(I===a.FakePromise.fakePromiseIdentifier);a.FakePromise.prototype.then=function(b){if(!this.bContinueWithFakePromise){return Promise.resolve(b(this.vValue));}if(!this.vError){try{this.vValue=b(this.vValue,a.FakePromise.fakePromiseIdentifier);}catch(E){this.vError=E;this.vValue=null;return this;}if(this.vValue instanceof Promise||this.vValue instanceof a.FakePromise){return this.vValue;}}return this;};a.FakePromise.prototype.catch=function(b){if(!this.bContinueWithFakePromise){return Promise.reject(b(this.vError));}if(this.vError){try{this.vValue=b(this.vError,a.FakePromise.fakePromiseIdentifier);}catch(E){this.vError=E;this.vValue=null;return this;}this.vError=null;if(this.vValue instanceof Promise||this.vValue instanceof a.FakePromise){return this.vValue;}}return this;};if(this.vValue instanceof Promise||this.vValue instanceof a.FakePromise){return this.vValue;}},getChangeFromChangesMap:function(c,s){var r;Object.keys(c).forEach(function(b){c[b].some(function(o){if(o.getId()===s){r=o;return true;}});});return r;}};return a;},true);
