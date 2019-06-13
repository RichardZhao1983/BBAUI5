/*
 * ! UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/model/Context','sap/ui/model/PropertyBinding','sap/ui/model/json/JSONModel','sap/ui/model/Filter','sap/ui/Device','sap/ui/core/InvisibleText','sap/ui/core/Control','sap/ui/core/Icon','sap/ui/layout/HorizontalLayout','sap/ui/layout/Grid','sap/m/SearchField','sap/m/RadioButton','sap/m/ColumnListItem','sap/m/Column','sap/m/Text','sap/m/Bar','sap/m/Table','sap/m/Page','sap/m/Toolbar','sap/m/ToolbarSpacer','sap/m/Button','sap/m/CheckBox','sap/m/Dialog','sap/m/Input','sap/m/Label','sap/m/Title','sap/m/ResponsivePopover','sap/m/SelectList','sap/m/ObjectIdentifier','sap/m/OverflowToolbar','sap/m/OverflowToolbarLayoutData','sap/m/VBox','sap/ui/fl/Utils','sap/ui/core/util/reflection/JsControlTreeModifier',"sap/ui/events/KeyCodes","sap/ui/core/library","sap/m/library"],function(C,P,J,F,D,I,a,b,H,G,S,R,c,d,T,B,f,g,h,i,j,k,l,m,L,n,o,p,O,q,r,V,s,t,K,u,v){"use strict";var w=v.OverflowToolbarPriority;var x=v.ButtonType;var y=v.PlacementType;var z=v.PopinDisplay;var A=v.ScreenSize;var E=u.ValueState;var M=u.TextAlign;var N=a.extend("sap.ui.fl.variants.VariantManagement",{metadata:{library:"sap.ui.fl",designtime:"sap/ui/fl/designtime/variants/VariantManagement.designtime",properties:{showExecuteOnSelection:{type:"boolean",group:"Misc",defaultValue:false},showSetAsDefault:{type:"boolean",group:"Misc",defaultValue:true},manualVariantKey:{type:"boolean",group:"Misc",defaultValue:false},inErrorState:{type:"boolean",group:"Misc",defaultValue:false},editable:{type:"boolean",group:"Misc",defaultValue:true},modelName:{type:"string",group:"Misc",defaultValue:null},updateVariantInURL:{type:"boolean",group:"Misc",defaultValue:false}},associations:{"for":{type:"sap.ui.core.Control",multiple:true}},events:{save:{parameters:{name:{type:"string"},overwrite:{type:"boolean"},key:{type:"string"},execute:{type:"boolean"},def:{type:"boolean"}}},manage:{},initialized:{},select:{parameters:{key:{type:"string"}}}}},renderer:function(e,Q){e.write("<div ");e.writeControlData(Q);e.addClass("sapUiFlVarMngmt");e.writeClasses();e.write(">");e.renderControl(Q.oVariantLayout);e.write("</div>");}});N.MODEL_NAME="$FlexVariants";N.INNER_MODEL_NAME="$sapUiFlVariants";N.MAX_NAME_LEN=100;N.COLUMN_FAV_IDX=0;N.COLUMN_NAME_IDX=1;N.prototype.init=function(){this._sModelName=N.MODEL_NAME;this.attachModelContextChange(this._setModel,this);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");this._createInnerModel();this.oVariantInvisibleText=new I({text:{parts:[{path:'currentVariant',model:this._sModelName},{path:"modified",model:this._sModelName}],formatter:function(Q,U){if(U){Q=this._oRb.getText("VARIANT_MANAGEMENT_SEL_VARIANT_MOD",[Q]);}else{Q=this._oRb.getText("VARIANT_MANAGEMENT_SEL_VARIANT",[Q]);}}.bind(this)}});this.oVariantText=new n(this.getId()+"-text",{text:{path:'currentVariant',model:this._sModelName,formatter:function(Q){var U=this.getSelectedVariantText(Q);return U;}.bind(this)}});this.oVariantText.addStyleClass("sapUiFlVarMngmtClickable");this.oVariantText.addStyleClass("sapUiFlVarMngmtTitle");if(D.system.phone){this.oVariantText.addStyleClass("sapUiFlVarMngmtTextPhoneMaxWidth");}else{this.oVariantText.addStyleClass("sapUiFlVarMngmtTextMaxWidth");}var e=new L(this.getId()+"-modified",{text:"*",visible:{path:"modified",model:this._sModelName,formatter:function(Q){return(Q===null||Q===undefined)?false:Q;}}});e.setVisible(false);e.addStyleClass("sapUiFlVarMngmtModified");e.addStyleClass("sapUiFlVarMngmtClickable");e.addStyleClass("sapMTitleStyleH4");this.oVariantPopoverTrigger=new j(this.getId()+"-trigger",{icon:"sap-icon://slim-arrow-down",type:x.Transparent});this.oVariantPopoverTrigger.addAriaLabelledBy(this.oVariantInvisibleText);this.oVariantPopoverTrigger.addStyleClass("sapUiFlVarMngmtTriggerBtn");this.oVariantPopoverTrigger.addStyleClass("sapMTitleStyleH4");this.oVariantLayout=new H({content:[this.oVariantText,e,this.oVariantPopoverTrigger,this.oVariantInvisibleText]});this.oVariantLayout.addStyleClass("sapUiFlVarMngmtLayout");this.addDependent(this.oVariantLayout);};N.prototype.getTitle=function(){return this.oVariantText;};N.prototype._createInnerModel=function(){var e=new J({showExecuteOnSelection:false,showSetAsDefault:true,editable:true,popoverTitle:this._oRb.getText("VARIANT_MANAGEMENT_VARIANTS")});this.setModel(e,N.INNER_MODEL_NAME);this._bindProperties();};N.prototype._bindProperties=function(){this.bindProperty("showExecuteOnSelection",{path:"/showExecuteOnSelection",model:N.INNER_MODEL_NAME});this.bindProperty("showSetAsDefault",{path:"/showSetAsDefault",model:N.INNER_MODEL_NAME});this.bindProperty("editable",{path:"/editable",model:N.INNER_MODEL_NAME});};N.prototype.getOriginalDefaultVariantKey=function(){var e=this.getModel(this._sModelName);if(e&&this.oContext){return e.getProperty(this.oContext+"/originalDefaultVariant");}return null;};N.prototype.setDefaultVariantKey=function(e){var Q=this.getModel(this._sModelName);if(Q&&this.oContext){Q.setProperty(this.oContext+"/defaultVariant",e);}};N.prototype.getDefaultVariantKey=function(){var e=this.getModel(this._sModelName);if(e&&this.oContext){return e.getProperty(this.oContext+"/defaultVariant");}return null;};N.prototype.setCurrentVariantKey=function(e){var Q=this.getModel(this._sModelName);if(Q&&this.oContext){Q.setProperty(this.oContext+"/currentVariant",e);}return this;};N.prototype.getCurrentVariantKey=function(){var e=this.getModel(this._sModelName);if(e&&this.oContext){return e.getProperty(this.oContext+"/currentVariant");}return null;};N.prototype._assignPopoverTitle=function(){var e,Q,U=this.getModel(this._sModelName);if(U&&this.oContext){e=U.getProperty(this.oContext+"/popoverTitle");}if(e!==undefined){Q=this.getModel(N.INNER_MODEL_NAME);if(Q){Q.setProperty("/popoverTitle",e);}}};N.prototype.getVariants=function(){return this._getItems();};N.prototype.setModified=function(e){var Q=this.getModel(this._sModelName);if(Q&&this.oContext){Q.setProperty(this.oContext+"/modified",e);}};N.prototype.getModified=function(){var e=this.getModel(this._sModelName);if(e&&this.oContext){return e.getProperty(this.oContext+"/modified");}return false;};N.prototype.getSelectedVariantText=function(e){var Q=this._getItemByKey(e);if(Q){return Q.title;}return"";};N.prototype.getStandardVariantKey=function(){var e=this._getItems();if(e&&e[0]){return e[0].key;}return null;};N.prototype.getShowFavorites=function(){var e=this.getModel(this._sModelName);if(e&&this.oContext){return e.getProperty(this.oContext+"/showFavorites");}return false;};N.prototype._clearDeletedItems=function(){this._aDeletedItems=[];};N.prototype._addDeletedItem=function(e){this._aDeletedItems.push(e);};N.prototype._getDeletedItems=function(e){return this._aDeletedItems;};N.prototype._getItems=function(){var e=[];if(this.oContext&&this.oContext.getObject()){e=this.oContext.getObject().variants.filter(function(Q){if(!Q.hasOwnProperty("visible")){return true;}return Q.visible;});}return e;};N.prototype._getItemByKey=function(e){var Q=null,U=this._getItems();U.some(function(W){if(W.key===e){Q=W;}return(Q!=null);});return Q;};N.prototype._rebindControl=function(e){this.oVariantInvisibleText.unbindProperty("text");this.oVariantInvisibleText.bindProperty("text",{parts:[{path:'currentVariant',model:this._sModelName},{path:"modified",model:this._sModelName}],formatter:function(Q,U){if(U){Q=this._oRb.getText("VARIANT_MANAGEMENT_SEL_VARIANT_MOD",[Q]);}else{Q=this._oRb.getText("VARIANT_MANAGEMENT_SEL_VARIANT",[Q]);}}.bind(this)});this.oVariantText.unbindProperty("text");this.oVariantText.bindProperty("text",{path:'currentVariant',model:this._sModelName,formatter:function(Q){var U=this.getSelectedVariantText(Q);return U;}.bind(this)});this.oVariantText.unbindProperty("visible",{path:"modified",model:this._sModelName,formatter:function(Q){return(Q===null||Q===undefined)?false:Q;}});};N.prototype.setModelName=function(e){if(this.getModelName()){this.oContext=null;}this.setProperty("modelName",e);this._sModelName=e;this._rebindControl();return this;};N.prototype._setBindingContext=function(){var e,Q;if(!this.oContext){e=this.getModel(this._sModelName);if(e){Q=this._getLocalId();if(Q){this.oContext=new C(e,"/"+Q);this.setBindingContext(this.oContext,this._sModelName);if(!this.getModelName()&&e.registerToModel){e.registerToModel(this);}this._assignPopoverTitle();this._registerPropertyChanges(e);this.fireInitialized();}}}};N.prototype._getLocalId=function(){if(this.getModelName()&&(this._sModelName!==N.MODEL_NAME)){return this.getId();}return t.getSelector(this,s.getAppComponentForControl(this)).id;};N.prototype._setModel=function(){this._setBindingContext();};N.prototype._registerPropertyChanges=function(e){var Q=new P(e,this.oContext+"/variantsEditable");Q.attachChange(function(U){if(U&&U.oSource&&U.oSource.oModel&&U.oSource.sPath){var W,X=U.oSource.oModel.getProperty(U.oSource.sPath);W=this.getModel(N.INNER_MODEL_NAME);if(W){W.setProperty("/editable",X);}}}.bind(this));};N.prototype.handleOpenCloseVariantPopover=function(){if(!this.bPopoverOpen){this._openVariantList();}else if(this.oVariantPopOver&&this.oVariantPopOver.isOpen()){this.oVariantPopOver.close();}else if(this.getInErrorState()&&this.oErrorVariantPopOver&&this.oErrorVariantPopOver.isOpen()){this.oErrorVariantPopOver.close();}};N.prototype.getFocusDomRef=function(){if(this.oVariantPopoverTrigger){return this.oVariantPopoverTrigger.getFocusDomRef();}};N.prototype.onclick=function(e){if(this.oVariantPopoverTrigger&&!this.bPopoverOpen){this.oVariantPopoverTrigger.focus();}this.handleOpenCloseVariantPopover();};N.prototype.onkeydown=function(e){if(e.which===K.F4||e.which===K.SPACE||e.altKey===true&&e.which===K.ARROW_UP||e.altKey===true&&e.which===K.ARROW_DOWN){this._openVariantList();}};N.prototype.onAfterRendering=function(){this.oVariantText.$().off("mouseover").on("mouseover",function(){this.oVariantPopoverTrigger.addStyleClass("sapUiFlVarMngmtTriggerBtnHover");}.bind(this));this.oVariantText.$().off("mouseout").on("mouseout",function(){this.oVariantPopoverTrigger.removeStyleClass("sapUiFlVarMngmtTriggerBtnHover");}.bind(this));};N.prototype._openInErrorState=function(){var Q;if(!this.oErrorVariantPopOver){Q=new V({fitContainer:true,alignItems:sap.m.FlexAlignItems.Center,items:[new b({size:"4rem",color:"lightgray",src:"sap-icon://message-error"}),new n({titleStyle:sap.ui.core.TitleLevel.H2,text:this._oRb.getText("VARIANT_MANAGEMENT_ERROR_TEXT1")}),new T({textAlign:sap.ui.core.TextAlign.Center,text:this._oRb.getText("VARIANT_MANAGEMENT_ERROR_TEXT2")})]});Q.addStyleClass("sapUiFlVarMngmtErrorPopover");this.oErrorVariantPopOver=new o(this.getId()+"-errorpopover",{title:{path:"/popoverTitle",model:N.INNER_MODEL_NAME},contentWidth:"400px",placement:y.Bottom,content:[new g(this.getId()+"-errorselpage",{showSubHeader:false,showNavButton:false,showHeader:false,content:[Q]})],afterOpen:function(){this.bPopoverOpen=true;}.bind(this),afterClose:function(){if(this.bPopoverOpen){setTimeout(function(){this.bPopoverOpen=false;}.bind(this),200);}}.bind(this),contentHeight:"300px"});this.oErrorVariantPopOver.attachBrowserEvent("keyup",function(e){if(e.which===32){this.oErrorVariantPopOver.close();}}.bind(this));}if(this.bPopoverOpen){return;}this.oErrorVariantPopOver.openBy(this.oVariantLayout);};N.prototype._createVariantList=function(){if(this.oVariantPopOver){return;}this.oVariantManageBtn=new j(this.getId()+"-manage",{text:this._oRb.getText("VARIANT_MANAGEMENT_MANAGE"),enabled:true,press:function(){this._openManagementDialog();}.bind(this),layoutData:new r({priority:w.Low})});this.oVariantSaveBtn=new j(this.getId()+"-mainsave",{text:this._oRb.getText("VARIANT_MANAGEMENT_SAVE"),press:function(){this._handleVariantSave();}.bind(this),enabled:{path:"modified",model:this._sModelName,formatter:function(Q){return Q;}},layoutData:new r({priority:w.Low})});this.oVariantSaveAsBtn=new j(this.getId()+"-saveas",{text:this._oRb.getText("VARIANT_MANAGEMENT_SAVEAS"),press:function(){this._openSaveAsDialog();}.bind(this),layoutData:new r({priority:w.Low})});this._oVariantList=new p(this.getId()+"-list",{selectedKey:{path:"currentVariant",model:this._sModelName},itemPress:function(Q){var U=null;if(Q&&Q.getParameters()){var W=Q.getParameters().item;if(W){U=W.getKey();}}if(U){this.setCurrentVariantKey(U);this.fireEvent("select",{key:U});this.oVariantPopOver.close();}}.bind(this)});this._oVariantList.setNoDataText(this._oRb.getText("VARIANT_MANAGEMENT_NODATA"));var e=new sap.ui.core.Item({key:'{'+this._sModelName+">key}",text:'{'+this._sModelName+">title}"});this._oVariantList.bindAggregation("items",{path:"variants",model:this._sModelName,template:e});this._oSearchField=new S(this.getId()+"-search");this._oSearchField.attachLiveChange(function(Q){this._triggerSearch(Q,this._oVariantList);}.bind(this));this.oVariantSelectionPage=new g(this.getId()+"-selpage",{subHeader:new h({content:[this._oSearchField]}),content:[this._oVariantList],footer:new q({content:[new i(this.getId()+"-spacer"),this.oVariantSaveBtn,this.oVariantSaveAsBtn,this.oVariantManageBtn]}),showNavButton:false,showHeader:false,showFooter:{path:"/editable",model:N.INNER_MODEL_NAME}});this.oVariantPopOver=new o(this.getId()+"-popover",{title:{path:"/popoverTitle",model:N.INNER_MODEL_NAME},contentWidth:"400px",placement:y.Bottom,content:[this.oVariantSelectionPage],afterOpen:function(){this.bPopoverOpen=true;}.bind(this),afterClose:function(){if(this.bPopoverOpen){setTimeout(function(){this.bPopoverOpen=false;}.bind(this),200);}}.bind(this),contentHeight:"300px"});this.oVariantPopOver.addStyleClass("sapUiFlVarMngmtPopover");if(this.oVariantLayout.$().closest(".sapUiSizeCompact").length>0){this.oVariantPopOver.addStyleClass("sapUiSizeCompact");}this.addDependent(this.oVariantPopOver);};N.prototype._openVariantList=function(){var e;if(this.getInErrorState()){this._openInErrorState();return;}if(this.bPopoverOpen){return;}if(!this.oContext){return;}this._createVariantList();this._oSearchField.setValue("");this._oVariantList.getBinding("items").filter(this._getFilters());this.oVariantSelectionPage.setShowSubHeader(this._oVariantList.getItems().length>9?true:false);this.oVariantSaveBtn.setEnabled(false);this.oVariantSaveAsBtn.setEnabled(true);if(this.getModified()){e=this._getItemByKey(this.getCurrentVariantKey());if(e&&e.change){this.oVariantSaveBtn.setEnabled(true);}}this.oVariantPopOver.openBy(this.oVariantLayout);};N.prototype._triggerSearch=function(e,Q){if(!e){return;}var U=e.getParameters();if(!U){return;}var W=U.newValue?U.newValue:"";var X=new F({path:"title",operator:sap.ui.model.FilterOperator.Contains,value1:W});Q.getBinding("items").filter(this._getFilters(X));};N.prototype._createSaveAsDialog=function(){if(!this.oSaveAsDialog){this.oInputName=new m(this.getId()+"-name",{liveChange:function(U){this._checkVariantNameConstraints(this.oInputName,this.oSaveSave);}.bind(this)});var e=new L(this.getId()+"-namelabel",{text:this._oRb.getText("VARIANT_MANAGEMENT_NAME"),required:true});e.setLabelFor(this.oInputName);this.oDefault=new k(this.getId()+"-default",{text:this._oRb.getText("VARIANT_MANAGEMENT_SETASDEFAULT"),visible:{path:"/showSetAsDefault",model:N.INNER_MODEL_NAME},width:"100%"});this.oExecuteOnSelect=new k(this.getId()+"-execute",{text:this._oRb.getText("VARIANT_MANAGEMENT_EXECUTEONSELECT"),visible:{path:"/showExecuteOnSelection",model:N.INNER_MODEL_NAME},width:"100%"});this.oInputManualKey=new m(this.getId()+"-key",{liveChange:function(U){this._checkVariantNameConstraints(this.oInputManualKey);}.bind(this)});this.oLabelKey=new L(this.getId()+"-keylabel",{text:this._oRb.getText("VARIANT_MANAGEMENT_KEY"),required:true});this.oLabelKey.setLabelFor(this.oInputManualKey);this.oSaveSave=new j(this.getId()+"-variantsave",{text:this._oRb.getText("VARIANT_MANAGEMENT_OK"),press:function(){this._bSaveCanceled=false;this._handleVariantSaveAs(this.oInputName.getValue());}.bind(this),enabled:true});var Q=new G({defaultSpan:"L12 M12 S12"});if(this.getShowSetAsDefault()){Q.addContent(this.oDefault);}if(this.getShowExecuteOnSelection()){Q.addContent(this.oExecuteOnSelect);}this.oSaveAsDialog=new l(this.getId()+"-savedialog",{title:this._oRb.getText("VARIANT_MANAGEMENT_SAVEDIALOG"),beginButton:this.oSaveSave,endButton:new j(this.getId()+"-variantcancel",{text:this._oRb.getText("VARIANT_MANAGEMENT_CANCEL"),press:function(){this._bSaveCanceled=true;this.oSaveAsDialog.close();}.bind(this)}),content:[e,this.oInputName,this.oLabelKey,this.oInputManualKey,Q],stretch:D.system.phone});this.oSaveAsDialog.addStyleClass("sapUiPopupWithPadding");this.oSaveAsDialog.addStyleClass("sapUiFlVarMngmtSaveDialog");if(this.oVariantLayout.$().closest(".sapUiSizeCompact").length>0){this.oSaveAsDialog.addStyleClass("sapUiSizeCompact");}this.addDependent(this.oSaveAsDialog);}};N.prototype._openSaveAsDialog=function(){this._createSaveAsDialog();this.oInputName.setValue(this.getSelectedVariantText(this.getCurrentVariantKey()));this.oSaveSave.setEnabled(false);this.oInputName.setEnabled(true);this.oInputName.setValueState(E.None);this.oInputName.setValueStateText(null);this.oDefault.setSelected(false);this.oExecuteOnSelect.setSelected(false);if(this.oVariantPopOver){this.oVariantPopOver.close();}if(this.getManualVariantKey()){this.oInputManualKey.setVisible(true);this.oInputManualKey.setEnabled(true);this.oInputManualKey.setValueState(E.None);this.oInputManualKey.setValueStateText(null);this.oLabelKey.setVisible(true);}else{this.oInputManualKey.setVisible(false);this.oLabelKey.setVisible(false);}this.oSaveAsDialog.open();};N.prototype._handleVariantSaveAs=function(e){var Q=null,U=e.trim(),W=this.oInputManualKey.getValue().trim();if(U==""){this.oInputName.setValueState(E.Error);this.oInputName.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_EMPTY"));return;}if(this.getManualVariantKey()){if(W==""){this.oInputManualKey.setValueState(E.Error);this.oInputManualKey.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_EMPTY"));return;}Q=W;}if(this.oSaveAsDialog){this.oSaveAsDialog.close();}if(this.oDefault.getSelected()){this.setDefaultVariantKey(Q);}this.setModified(false);this.fireSave({key:Q,name:U,overwrite:false,def:this.oDefault.getSelected(),execute:this.oExecuteOnSelect.getSelected()});};N.prototype._handleVariantSave=function(){var e=this._getItemByKey(this.getCurrentVariantKey());var Q=false;if(this.getDefaultVariantKey()===e.key){Q=true;}if(this.oVariantPopOver){this.oVariantPopOver.close();}this.fireSave({name:e.title,overwrite:true,key:e.key,def:Q});this.setModified(false);};N.prototype.openManagementDialog=function(e){if(e&&this.oManagementDialog){this.oManagementDialog.destroy();this.oManagementDialog=undefined;}this._openManagementDialog();};N.prototype._triggerSearchInManageDialog=function(e,Q){if(!e){return;}var U=e.getParameters();if(!U){return;}var W=U.newValue?U.newValue:"";var X=[this._getVisibleFilter(),new F({filters:[new F({path:"title",operator:sap.ui.model.FilterOperator.Contains,value1:W}),new F({path:"author",operator:sap.ui.model.FilterOperator.Contains,value1:W})],and:false})];Q.getBinding("items").filter(X);this._bDeleteOccured=true;};N.prototype._createManagementDialog=function(){if(!this.oManagementDialog){this.oManagementTable=new f(this.getId()+"-managementTable",{growing:true,columns:[new d({width:"3rem",visible:{path:"showFavorites",model:this._sModelName}}),new d({header:new T({text:this._oRb.getText("VARIANT_MANAGEMENT_NAME")}),width:"14rem"}),new d({header:new T({text:this._oRb.getText("VARIANT_MANAGEMENT_DEFAULT")}),width:"4rem",demandPopin:true,popinDisplay:z.Inline,minScreenWidth:A.Tablet,visible:{path:"/showSetAsDefault",model:N.INNER_MODEL_NAME}}),new d({header:new T({text:this._oRb.getText("VARIANT_MANAGEMENT_EXECUTEONSELECT")}),width:"6rem",hAlign:M.Center,demandPopin:true,popinDisplay:z.Inline,minScreenWidth:"800px",visible:{path:"/showExecuteOnSelection",model:N.INNER_MODEL_NAME}}),new d({header:new T({text:this._oRb.getText("VARIANT_MANAGEMENT_AUTHOR")}),width:"8rem",demandPopin:true,popinDisplay:z.Inline,minScreenWidth:"900px"}),new d({width:"2rem",hAlign:M.Center}),new d({visible:false})]});this.oManagementSave=new j(this.getId()+"-managementsave",{text:this._oRb.getText("VARIANT_MANAGEMENT_OK"),enabled:true,press:function(){this._handleManageSavePressed();}.bind(this)});this.oManagementCancel=new j(this.getId()+"-managementcancel",{text:this._oRb.getText("VARIANT_MANAGEMENT_CANCEL"),press:function(){this.oManagementDialog.close();this._handleManageCancelPressed();}.bind(this)});this.oManagementDialog=new l(this.getId()+"-managementdialog",{resizable:true,draggable:true,customHeader:new B(this.getId()+"-managementHeader",{contentMiddle:[new T(this.getId()+"-managementHeaderText",{text:this._oRb.getText("VARIANT_MANAGEMENT_MANAGEDIALOG")})]}),beginButton:this.oManagementSave,endButton:this.oManagementCancel,content:[this.oManagementTable],stretch:D.system.phone});this.oManagementDialog.isPopupAdaptationAllowed=function(){return false;};this._oSearchFieldOnMgmtDialog=new S();this._oSearchFieldOnMgmtDialog.attachLiveChange(function(Q){this._triggerSearchInManageDialog(Q,this.oManagementTable);}.bind(this));var e=new B(this.getId()+"-mgmHeaderSearch",{contentRight:[this._oSearchFieldOnMgmtDialog]});this.oManagementDialog.setSubHeader(e);if(this.oVariantLayout.$().closest(".sapUiSizeCompact").length>0){this.oManagementDialog.addStyleClass("sapUiSizeCompact");}this.addDependent(this.oManagementDialog);this.oManagementTable.bindAggregation("items",{path:"variants",model:this._sModelName,factory:this._templateFactoryManagementDialog.bind(this),filters:this._getVisibleFilter()});this._bDeleteOccured=false;}};N.prototype._setFavoriteIcon=function(e,Q){if(e){e.setSrc(Q?"sap-icon://favorite":"sap-icon://unfavorite");e.setTooltip(this._oRb.getText(Q?"VARIANT_MANAGEMENT_FAV_DEL_TOOLTIP":"VARIANT_MANAGEMENT_FAV_ADD_TOOLTIP"));}};N.prototype._templateFactoryManagementDialog=function(e,Q){var U=null,W,X,Y,Z=Q.getObject();if(!Z){return undefined;}var $=function(g1){this._checkVariantNameConstraints(g1.oSource,this.oManagementSave,g1.oSource.getBindingContext(this._sModelName).getObject().key);}.bind(this);var _=function(g1){this._handleManageTitleChanged(g1.oSource.getBindingContext(this._sModelName).getObject());}.bind(this);var a1=function(g1){if(g1.getParameters().selected===true){this._handleManageDefaultVariantChange(g1.oSource,g1.oSource.getBindingContext(this._sModelName).getObject());}}.bind(this);var b1=function(g1){this._handleManageExecuteOnSelectionChanged(g1.oSource.getBindingContext(this._sModelName).getObject());}.bind(this);var c1=function(g1){this._handleManageDeletePressed(g1.oSource.getBindingContext(this._sModelName).getObject());}.bind(this);var d1=function(g1){this._handleManageFavoriteChanged(g1.oSource,g1.oSource.getBindingContext(this._sModelName).getObject());}.bind(this);if(Z.rename){Y=new m({liveChange:$,change:_,value:'{'+this._sModelName+">title}"});}else{Y=new O({title:'{'+this._sModelName+">title}"});if(U){Y.setTooltip(U);}}W=new j({icon:"sap-icon://sys-cancel",enabled:true,type:x.Transparent,press:c1,tooltip:this._oRb.getText("VARIANT_MANAGEMENT_DELETE"),visible:Z.remove});this._assignColumnInfoForDeleteButton(W);X=this.oContext.getPath();var e1=new b({src:{path:"favorite",model:this._sModelName,formatter:function(g1){return g1?"sap-icon://favorite":"sap-icon://unfavorite";}},tooltip:{path:'favorite',model:this._sModelName,formatter:function(g1){return this._oRb.getText(g1?"VARIANT_MANAGEMENT_FAV_DEL_TOOLTIP":"VARIANT_MANAGEMENT_FAV_ADD_TOOLTIP");}.bind(this)},press:d1});e1.addStyleClass("sapUiFlVarMngmtFavColor");var f1=new c({cells:[e1,Y,new R({groupName:this.getId(),select:a1,selected:{path:X+"/defaultVariant",model:this._sModelName,formatter:function(g1){return(Z.key===g1)?true:false;}}}),new k({select:b1,selected:'{'+this._sModelName+">executeOnSelect}"}),new T({text:'{'+this._sModelName+">author}",textAlign:"Begin"}),W,new T({text:'{'+this._sModelName+">key}"})]});return f1;};N.prototype._openManagementDialog=function(){this._createManagementDialog();if(this.oVariantPopOver){this.oVariantPopOver.close();}this._clearDeletedItems();this.oManagementSave.setEnabled(false);this._oSearchFieldOnMgmtDialog.setValue("");if(this._bDeleteOccured){this._bDeleteOccured=false;this.oManagementTable.bindAggregation("items",{path:"variants",model:this._sModelName,factory:this._templateFactoryManagementDialog.bind(this),filters:this._getVisibleFilter()});}this.oManagementDialog.open();};N.prototype._assignColumnInfoForDeleteButton=function(e){if(!this._oInvisibleDeleteColumnName){this._oInvisibleDeleteColumnName=new I({text:this._oRb.getText("VARIANT_MANAGEMENT_ACTION_COLUMN")});this.oManagementDialog.addContent(this._oInvisibleDeleteColumnName);}if(this._oInvisibleDeleteColumnName){e.addAriaLabelledBy(this._oInvisibleDeleteColumnName);}};N.prototype._handleManageDefaultVariantChange=function(e,Q){var U=Q.key;if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}if(this.getShowFavorites()&&!Q.favorite&&e){Q.favorite=!Q.favorite;this._setFavoriteIcon(e.getParent().getCells()[N.COLUMN_FAV_IDX],Q.favorite);}this.setDefaultVariantKey(U);};N.prototype._handleManageCancelPressed=function(){var e,Q;this._getDeletedItems().forEach(function(U){U.visible=true;});this._getItems().forEach(function(U){U.title=U.originalTitle;U.favorite=U.originalFavorite;U.executeOnSelection=U.originalExecuteOnSelection;});e=this.getOriginalDefaultVariantKey();if(e!==this.getDefaultVariantKey()){this.setDefaultVariantKey(e);}Q=this.getModel(this._sModelName);if(Q){Q.checkUpdate();}};N.prototype._handleManageFavoriteChanged=function(e,Q){if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}if((this.getDefaultVariantKey()===Q.key)&&Q.favorite){return;}Q.favorite=!Q.favorite;this._setFavoriteIcon(e,Q.favorite);};N.prototype._handleManageDeletePressed=function(e){var Q,U=e.key;if(this.oManagementTable.getItems().length===1){return;}if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}e.visible=false;this._addDeletedItem(e);if((U===this.getDefaultVariantKey())){this.setDefaultVariantKey(this.getStandardVariantKey());}Q=this.getModel(this._sModelName);if(Q){Q.checkUpdate();}this.oManagementCancel.focus();};N.prototype._handleManageExecuteOnSelectionChanged=function(e){if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}};N.prototype._handleManageTitleChanged=function(e){if(!this._anyInErrorState(this.oManagementTable)){this.oManagementSave.setEnabled(true);}};N.prototype._handleManageSavePressed=function(){this._getDeletedItems().some(function(e){if(e.key===this.getCurrentVariantKey()){var Q=this.getStandardVariantKey();this.setModified(false);this.setCurrentVariantKey(Q);this.fireEvent("select",{key:Q});return true;}return false;}.bind(this));this.fireManage();this.oManagementDialog.close();};N.prototype._anyInErrorState=function(e){var Q,U,W=false;if(e){Q=e.getItems();Q.some(function(X){U=X.getCells()[N.COLUMN_NAME_IDX];if(U&&U.getValueState&&(U.getValueState()===E.Error)){W=true;}return W;});}return W;};N.prototype._getFilters=function(e){var Q=[];if(e){Q.push(e);}Q.push(this._getVisibleFilter());if(this.getShowFavorites()){Q.push(this._getFilterFavorites());}return Q;};N.prototype._getVisibleFilter=function(){return new F({path:"visible",operator:sap.ui.model.FilterOperator.EQ,value1:true});};N.prototype._getFilterFavorites=function(){return new F({path:"favorite",operator:sap.ui.model.FilterOperator.EQ,value1:true});};N.prototype._checkVariantNameConstraints=function(e,Q,U){if(!e){return;}var W=e.getValue();W=W.trim();if(!this._checkIsDuplicate(W,U)){if(W===""){e.setValueState(E.Error);e.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_EMPTY"));}else if(W.indexOf('{')>-1){e.setValueState(E.Error);e.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_NOT_ALLOWED_CHAR",["{"]));}else if(W.length>N.MAX_NAME_LEN){e.setValueState(E.Error);e.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_MAX_LEN",[N.MAX_NAME_LEN]));}else{e.setValueState(E.None);e.setValueStateText(null);}}else{e.setValueState(E.Error);e.setValueStateText(this._oRb.getText("VARIANT_MANAGEMENT_ERROR_DUPLICATE"));}if(Q){if(e.getValueState()===E.Error){Q.setEnabled(false);}else{Q.setEnabled(true);}}};N.prototype._checkIsDuplicate=function(e,Q){var U=false,W=this._getItems(),X=e.toLowerCase();W.some(function(Y){if(Y.title.toLowerCase()===X){if(Q&&(Q===Y.key)){return false;}U=true;}return U;});return U;};N.prototype.exit=function(){var e;if(this.oDefault&&!this.oDefault._bIsBeingDestroyed){this.oDefault.destroy();}this.oDefault=undefined;if(this.oExecuteOnSelect&&!this.oExecuteOnSelect._bIsBeingDestroyed){this.oExecuteOnSelect.destroy();}this.oExecuteOnSelect=undefined;this._oRb=undefined;this.oContext=undefined;this._oVariantList=undefined;this.oVariantSelectionPage=undefined;this.oVariantLayout=undefined;this.oVariantText=undefined;this.oVariantPopoverTrigger=undefined;this.oVariantInvisibleText=undefined;this._oSearchField=undefined;this._oSearchFieldOnMgmtDialog=undefined;e=this.getModel(N.INNER_MODEL_NAME);if(e){e.destroy();}};return N;},true);
