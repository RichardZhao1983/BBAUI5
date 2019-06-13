/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/TreeItemBase"],function(T){"use strict";return T.extend("sap.ui.documentation.sdk.controls.DemokitTreeItem",{metadata:{properties:{title:{type:"string",defaultValue:""},deprecated:{type:"boolean",defaultValue:false}}},init:function(){T.prototype.init.call(this);this.addStyleClass("sapDemokitTreeItem");}});});
