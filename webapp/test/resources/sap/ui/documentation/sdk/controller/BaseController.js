/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/documentation/library","sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/Device","sap/m/library","sap/ui/documentation/sdk/controller/util/APIInfo"],function(l,C,H,D,m,A){"use strict";var S=m.SplitAppMode;return C.extend("sap.ui.documentation.sdk.controller.BaseController",{_oCore:sap.ui.getCore(),onInit:function(){if(D.system.phone||D.system.tablet){this.getOwnerComponent().loadVersionInfo();}},hideMasterSide:function(){var s=this.getSplitApp();s.setMode(S.HideMode);},showMasterSide:function(){var s=this.getSplitApp();s.setMode(S.ShowHideMode);},getSplitApp:function(){return this.getView().getParent().getParent();},getRouter:function(){return this.getOwnerComponent().getRouter();},getModel:function(n){return this.getView().getModel(n);},setModel:function(M,n){return this.getView().setModel(M,n);},getConfig:function(){return this.getOwnerComponent().getMetadata().getConfig();},onNavBack:function(e){var p=H.getInstance().getPreviousHash();if(p!==undefined){if(p.indexOf("search/")===0){this.getRouter().navTo("search",{searchParam:p.split("/")[1]},false);}else{history.go(-1);}}else{var c=window.location.hash;if(c.indexOf("#/topic/")==0){this.getRouter().navTo("topic",{},true);}else if(c.indexOf("#/api/")==0){this.getRouter().navTo("api",{},true);}}},searchResultsButtonVisibilitySwitch:function(b){var p=H.getInstance().getPreviousHash();if(p&&p.indexOf("search/")===0){b.setVisible(true);}else{b.setVisible(false);}},getRootView:function(){var c=this.getOwnerComponent();return c.byId(c.getManifestEntry("/sap.ui5/rootView").id);},onDisclaimerLinkPress:function(e){var s=e.getSource?e.getSource():e.target;if(!this.oDisclaimerPopover){sap.ui.core.Fragment.load({name:"sap.ui.documentation.sdk.view.LegalDisclaimerPopover"}).then(function(p){this.oDisclaimerPopover=p;p.openBy(s);}.bind(this));return;}else if(this.oDisclaimerPopover.isOpen()){this.oDisclaimerPopover.close();}this.oDisclaimerPopover.openBy(s);},_getControlComponent:function(c,o){var L=o.libComponentInfos,a=l._getLibraryInfoSingleton();return a._getActualComponent(L,c);},_onOrientationChange:function(e){if(D.system.phone){this.byId("phoneImage").toggleStyleClass("phoneHeaderImageLandscape",e.landscape);}},_registerOrientationChange:function(){D.orientation.attachHandler(this._onOrientationChange,this);},_deregisterOrientationChange:function(){D.orientation.detachHandler(this._onOrientationChange,this);},handleLandingImageLoad:function(){this.getView().byId("landingImageHeadline").setVisible(true);},getAPIReferenceCheckPromise:function(c){return A.getIndexJsonPromise().then(function(r){var f;f=r.filter(function(e){return e.name===c;});return f&&f.length>0;});}});});
