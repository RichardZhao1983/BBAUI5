/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Input','./Tokenizer','./Token','./library','sap/ui/core/EnabledPropagator','sap/ui/base/ManagedObjectMetadata','sap/ui/Device','./Popover','./Button','./ToggleButton','./List','./Title','./Bar','./Toolbar','sap/ui/core/ResizeHandler','sap/ui/core/IconPool','./MultiInputRenderer',"sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/control"],function(I,T,a,l,E,M,D,P,B,b,L,c,d,f,R,g,h,j,K,q){"use strict";var k=l.PlacementType,m=l.ListMode;var n=I.extend("sap.m.MultiInput",{metadata:{library:"sap.m",designtime:"sap/m/designtime/MultiInput.designtime",properties:{enableMultiLineMode:{type:"boolean",group:"Behavior",defaultValue:false},maxTokens:{type:"int",group:"Behavior"}},aggregations:{tokens:{type:"sap.m.Token",multiple:true,singularName:"token"},tokenizer:{type:"sap.m.Tokenizer",multiple:false,visibility:"hidden"}},events:{tokenChange:{parameters:{type:{type:"string"},token:{type:"sap.m.Token"},tokens:{type:"sap.m.Token[]"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}},tokenUpdate:{allowPreventDefault:true,parameters:{type:{type:"string"},addedTokens:{type:"sap.m.Token[]"},removedTokens:{type:"sap.m.Token[]"}}}}}});E.apply(n.prototype,[true]);var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");n.prototype.init=function(){this._bShowListWithTokens=false;I.prototype.init.call(this);this._bIsValidating=false;this._tokenizer=new T();this._tokenizer._setAdjustable(true);this.setAggregation("tokenizer",this._tokenizer);this._tokenizer.attachTokenChange(this._onTokenChange,this);this._tokenizer.attachTokenUpdate(this._onTokenUpdate,this);this._tokenizer._handleNMoreIndicatorPress(this._handleIndicatorPress.bind(this));this._tokenizer.addEventDelegate({onThemeChanged:this._handleInnerVisibility.bind(this)},this);this.setShowValueHelp(true);this.setShowSuggestion(true);this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);this.attachValueHelpRequest(function(){this._bValueHelpOpen=true;},this);this._getValueHelpIcon().setProperty("visible",true,true);this._modifySuggestionPicker();};n.prototype.exit=function(){I.prototype.exit.call(this);if(this._oSelectedItemPicker){this._oSelectedItemPicker.destroy();this._oSelectedItemPicker=null;}if(this._getReadOnlyPopover()){var o=this._getReadOnlyPopover();o.destroy();o=null;}this._deregisterResizeHandler();};n.prototype.onAfterRendering=function(){this._tokenizer.scrollToEnd();this._registerResizeHandler();this._tokenizer.setMaxWidth(this._calculateSpaceForTokenizer());this._handleInnerVisibility();I.prototype.onAfterRendering.apply(this,arguments);};n.prototype._handleInnerVisibility=function(){if(this._oReadOnlyPopover&&!this.getEditable()){var H=this._tokenizer._hasMoreIndicator();this[H?"_setValueInvisible":"_setValueVisible"].call(this);}};n.prototype.oninput=function(e){I.prototype.oninput.call(this,e);this._manageListsVisibility(false);this._getSelectedItemsPicker().close();};n.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){this._iResizeHandlerId=R.register(this,this._onResize.bind(this));}};n.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){R.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null;}};n.prototype._onResize=function(){this._deregisterResizeHandler();this._tokenizer.setMaxWidth(this._calculateSpaceForTokenizer());this._handleInnerVisibility();this._registerResizeHandler();};n.prototype._onTokenChange=function(e){this.fireTokenChange(e.getParameters());this.invalidate();var F=j(this.getDomRef(),document.activeElement);if(e.getParameter("type")==="tokensChanged"&&e.getParameter("removedTokens").length>0&&F){this.focus();}if(e.getParameter("type")==="removed"){this._tokenizer._useCollapsedMode(false);this.focus();}};n.prototype._onTokenUpdate=function(e){var i=this.fireTokenUpdate(e.getParameters());if(!i){e.preventDefault();}else{this.invalidate();}if(this._bUseDialog){this._fillList();this._manageListsVisibility(true);}};n.prototype._onSuggestionItemSelected=function(e){var i=null,t=null,o=this,O=this._tokenizer.getTokens().length;if(this.getMaxTokens()&&O>=this.getMaxTokens()||this._bValueHelpOpen){return;}if(this._hasTabularSuggestions()){i=e.getParameter("selectedRow");}else{i=e.getParameter("selectedItem");if(i){t=new a({text:i.getText(),key:i.getKey()});}}if(i){var p=this.getValue();this._tokenizer._addValidateToken({text:p,token:t,suggestionObject:i,validationCallback:function(v){if(v){o.setValue("");}}});}if(this._bUseDialog){var N=this._tokenizer.getTokens().length;if(O<N){this.setValue("");}if(this._getSuggestionsList()instanceof sap.m.Table){this._getSuggestionsList().addStyleClass("sapMInputSuggestionTableHidden");}else{this._getSuggestionsList().destroyItems();}var s=this._oSuggestionPopup.getScrollDelegate();if(s){s.scrollTo(0,0,0);}this._oSuggPopover._oPopupInput.focus();}};n.prototype._onLiveChange=function(e){this._tokenizer._removeSelectedTokens();};n.prototype._setValueInvisible=function(){this.$("inner").css("opacity","0");};n.prototype._setValueVisible=function(){this.$("inner").css("opacity","1");};n.prototype._calculateSpaceForTokenizer=function(){if(this.getDomRef()){var w=this.getDomRef().offsetWidth,v=this.getDomRef("vhi")?parseInt(this.getDomRef("vhi").offsetWidth,10):0,i=parseInt(this.$().find(".sapMInputBaseInner").css("min-width"),10)||0;return w-(v+i)+"px";}else{return null;}};n.prototype.setEnableMultiLineMode=function(e){return this.setProperty("enableMultiLineMode",e,true);};n.prototype.onmousedown=function(e){if(e.target==this.getDomRef('content')){e.preventDefault();e.stopPropagation();}};n.prototype._openMultiLineOnDesktop=function(){};n.prototype.openMultiLine=function(){};n.prototype.closeMultiLine=function(){};n.prototype.getScrollDelegate=function(){return this._tokenizer._oScroller;};n.prototype.onBeforeRendering=function(){var t=this.getAggregation("tokenizer");if(t){t.toggleStyleClass("sapMTokenizerEmpty",t.getTokens().length===0);}I.prototype.onBeforeRendering.apply(this,arguments);this._deregisterResizeHandler();};n.prototype.addValidator=function(v){this._tokenizer.addValidator(v);};n.prototype.removeValidator=function(v){this._tokenizer.removeValidator(v);};n.prototype.removeAllValidators=function(){this._tokenizer.removeAllValidators();};n.prototype.onsapnext=function(e){if(e.isMarked()){return;}var F=q(document.activeElement).control()[0];if(!F){return;}if(this._tokenizer===F||this._tokenizer.$().find(F.$()).length>0){this._scrollAndFocus();}};n.prototype.onsapbackspace=function(e){if(this.getCursorPosition()>0||!this.getEditable()||this.getValue().length>0){return;}T.prototype.onsapbackspace.apply(this._tokenizer,arguments);e.preventDefault();e.stopPropagation();};n.prototype.onsapdelete=function(e){if(!this.getEditable()){return;}if(this.getValue()&&!this._completeTextIsSelected()){return;}T.prototype.onsapdelete.apply(this._tokenizer,arguments);};n.prototype.onkeydown=function(e){if(e.which===K.TAB){this._tokenizer._changeAllTokensSelection(false);}if((e.ctrlKey||e.metaKey)&&e.which===K.A){if(this._tokenizer.getTokens().length>0){this._tokenizer.focus();this._tokenizer._changeAllTokensSelection(true);e.preventDefault();}}if((e.ctrlKey||e.metaKey)&&(e.which===K.C||e.which===K.INSERT)){this._tokenizer._copy();}if(((e.ctrlKey||e.metaKey)&&e.which===K.X)||(e.shiftKey&&e.which===K.DELETE)){if(this.getEditable()){this._tokenizer._cut();}else{this._tokenizer._copy();}}};n.prototype.onpaste=function(e){var o,i,v=[],A=[];if(this.getValueHelpOnly()){return;}if(window.clipboardData){o=window.clipboardData.getData("Text");}else{o=e.originalEvent.clipboardData.getData('text/plain');}var s=this._tokenizer._parseString(o);if(s.length<=1){return;}setTimeout(function(){if(s){if(this.fireEvent("_validateOnPaste",{texts:s},true)){var p="";for(i=0;i<s.length;i++){if(s[i]){var t=this._convertTextToToken(s[i],true);if(t){v.push(t);}else{p=s[i];}}}this.updateDomValue(p);for(i=0;i<v.length;i++){if(this._tokenizer._addUniqueToken(v[i])){A.push(v[i]);}}if(A.length>0){this.fireTokenUpdate({addedTokens:A,removedTokens:[],type:T.TokenUpdateType.Added});}}if(A.length){this.cancelPendingSuggest();}}}.bind(this),0);};n.prototype._convertTextToToken=function(t,C){var e=null,i=null,o=null,O=this._tokenizer.getTokens().length;if(!this.getEditable()){return null;}t=t.trim();if(!t){return null;}if(this._getIsSuggestionPopupOpen()||C){if(this._hasTabularSuggestions()){i=this._oSuggestionTable._oSelectedItem;}else{i=this._getSuggestionItem(t);}}if(i&&i.getText&&i.getKey){o=new a({text:i.getText(),key:i.getKey()});}var p=this;e=this._tokenizer._validateToken({text:t,token:o,suggestionObject:i,validationCallback:function(v){p._bIsValidating=false;if(v){p.setValue("");if(p._bUseDialog&&p._isMultiLineMode&&p._oSuggestionTable.getItems().length===0){var N=p._tokenizer.getTokens().length;if(O<N){p._oSuggPopover._oPopupInput.setValue("");}p._setAllTokenVisible();}}}});return e;};n.prototype.onsapprevious=function(e){if(this._getIsSuggestionPopupOpen()){return;}if(this.getCursorPosition()===0){if(e.srcControl===this){T.prototype.onsapprevious.apply(this._tokenizer,arguments);e.preventDefault();}}};n.prototype._scrollAndFocus=function(){this._tokenizer.scrollToEnd();this.$().find("input").focus();};n.prototype.onsaphome=function(e){if(this._tokenizer._checkFocus()){T.prototype.onsaphome.apply(this._tokenizer,arguments);}};n.prototype.onsapend=function(e){if(this._tokenizer._checkFocus()){T.prototype.onsapend.apply(this._tokenizer,arguments);e.preventDefault();}};n.prototype.onsapenter=function(e){if(I.prototype.onsapenter){I.prototype.onsapenter.apply(this,arguments);}var v=true;if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){if(this._hasTabularSuggestions()){v=!this._oSuggestionTable.getSelectedItem();}else{v=!this._getSuggestionsList().getSelectedItem();}}if(v){this._validateCurrentText();}this.focus();};n.prototype._checkFocus=function(){return this.getDomRef()&&j(this.getDomRef(),document.activeElement);};n.prototype.onsapfocusleave=function(e){var p=this._oSuggestionPopup,s=this._oSelectedItemPicker,N=false,i=false,o=this._checkFocus(),t,F;if(p instanceof sap.m.Popover){if(e.relatedControlId){t=sap.ui.getCore().byId(e.relatedControlId).getFocusDomRef();N=j(p.getFocusDomRef(),t);i=j(this._tokenizer.getFocusDomRef(),t);if(s){F=j(s.getFocusDomRef(),t);}}}if(!i&&!N){this._tokenizer.scrollToEnd();}I.prototype.onsapfocusleave.apply(this,arguments);if(this._bIsValidating||this._bValueHelpOpen){return;}if(!this._bUseDialog&&!N&&e.relatedControlId!==this.getId()&&e.relatedControlId!==this._tokenizer.getId()){this._validateCurrentText(true);}if(!this._bUseDialog&&this.getEditable()){if(o||N){return;}}if(!F&&!i){this._tokenizer._useCollapsedMode(true);this._tokenizer._getIndicatorVisibility()&&this._setValueInvisible();}if(this._oReadOnlyPopover&&this._oReadOnlyPopover.isOpen()&&!i){this._oReadOnlyPopover.close();}};n.prototype._onDialogClose=function(){this._validateCurrentText();this.setAggregation("tokenizer",this._tokenizer);this._tokenizer.setReverseTokens(false);this._tokenizer.invalidate();};n.prototype.ontap=function(e){if(document.activeElement===this._$input[0]||document.activeElement===this._tokenizer.getDomRef()){this._tokenizer.selectAllTokens(false);}if(e&&e.isMarked("tokenDeletePress")){return;}I.prototype.ontap.apply(this,arguments);};n.prototype._onclick=function(e){};n.prototype.onfocusin=function(e){this._bValueHelpOpen=false;if(e.target===this.getFocusDomRef()){I.prototype.onfocusin.apply(this,arguments);}if(this.getEditable()&&(!e.target.classList.contains("sapMInputValHelp")&&!e.target.classList.contains("sapMInputValHelpInner"))){if(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()){return;}this._tokenizer._useCollapsedMode(false);this._setValueVisible();this._tokenizer.scrollToEnd();}};n.prototype.onsapescape=function(e){this._tokenizer.selectAllTokens(false);this.selectText(0,0);I.prototype.onsapescape.apply(this,arguments);};n.prototype._validateCurrentText=function(e){var t=this.getValue();if(!t||!this.getEditable()){return;}t=t.trim();if(!t){return;}var i=null;if(e||this._getIsSuggestionPopupOpen()){if(this._hasTabularSuggestions()){i=this._oSuggestionTable._oSelectedItem;}else{i=this._getSuggestionItem(t,e);}}var o=null;if(i&&i.getText&&i.getKey){o=new a({text:i.getText(),key:i.getKey()});}var p=this;if(!this.getMaxTokens()||this.getTokens().length<this.getMaxTokens()){this._bIsValidating=true;this._tokenizer._addValidateToken({text:t,token:o,suggestionObject:i,validationCallback:function(v){p._bIsValidating=false;if(v){p.setValue("");}}});}};n.prototype.getCursorPosition=function(){return this._$input.cursorPos();};n.prototype._completeTextIsSelected=function(){var i=this._$input[0];if(i.selectionStart!==0){return false;}if(i.selectionEnd!==this.getValue().length){return false;}return true;};n.prototype._getIsSuggestionPopupOpen=function(){return this._oSuggPopover&&this._oSuggPopover._oPopover.isOpen();};n.prototype.setEditable=function(e){e=this.validateProperty("editable",e);var t=this._getTokensList();if(e===this.getEditable()){return this;}if(I.prototype.setEditable){I.prototype.setEditable.apply(this,arguments);}this._tokenizer.setEditable(e);if(e){if(this._bUseDialog){this._oSuggPopover._oPopover.addContent(t);}else{this._getSelectedItemsPicker().addContent(t);}t.setMode(m.MultiSelect);}else{t.setMode(m.None);this._getReadOnlyPopover().addContent(t);}return this;};n.prototype._findItem=function(t,e,o,G){if(!t){return;}if(!(e&&e.length)){return;}t=t.toLowerCase();var p=e.length;for(var i=0;i<p;i++){var s=e[i];var u=G(s);if(!u){continue;}u=u.toLowerCase();if(u===t){return s;}if(!o&&u.indexOf(t)===0){return s;}}};n.prototype._getSuggestionItem=function(t,e){var o=null;var p=null;if(this._hasTabularSuggestions()){o=this.getSuggestionRows();p=this._findItem(t,o,e,function(s){var u=s.getCells();var v=null;if(u){var i;for(i=0;i<u.length;i++){if(u[i].getText){v=u[i].getText();break;}}}return v;});}else{o=this.getSuggestionItems();p=this._findItem(t,o,e,function(p){return p.getText();});}return p;};n.getMetadata().forwardAggregation("tokens",{getter:function(){return this._tokenizer;},aggregation:"tokens",forwardBinding:true});n.prototype.clone=function(){var C,t;this.detachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.detachLiveChange(this._onLiveChange,this);this._tokenizer.detachTokenChange(this._onTokenChange,this);this._tokenizer.detachTokenUpdate(this._onTokenUpdate,this);C=I.prototype.clone.apply(this,arguments);C.destroyAggregation("tokenizer");C._tokenizer=null;t=this._tokenizer.clone();C._tokenizer=t;C.setAggregation("tokenizer",t,true);this._tokenizer.attachTokenChange(this._onTokenChange,this);this._tokenizer.attachTokenUpdate(this._onTokenUpdate,this);C._tokenizer.attachTokenChange(C._onTokenChange,C);C._tokenizer.attachTokenUpdate(C._onTokenUpdate,C);C._tokenizer._handleNMoreIndicatorPress(C._handleIndicatorPress.bind(C));this.attachSuggestionItemSelected(this._onSuggestionItemSelected,this);this.attachLiveChange(this._onLiveChange,this);return C;};n.prototype.getPopupAnchorDomRef=function(){return this.getDomRef("content");};n.prototype.setTokens=function(t){var v,V=[],i;if(Array.isArray(t)){for(i=0;i<t.length;i++){v=this.validateAggregation("tokens",t[i],true);M.addAPIParentInfoBegin(t[i],this,"tokens");V.push(v);}this._tokenizer.setTokens(V);for(i=0;i<t.length;i++){M.addAPIParentInfoEnd(t[i]);}}else{throw new Error("\""+t+"\" is of type "+typeof t+", expected array for aggregation tokens of "+this);}return this;};n.TokenChangeType={Added:"added",Removed:"removed",RemovedAll:"removedAll",TokensChanged:"tokensChanged"};n.WaitForAsyncValidation="sap.m.Tokenizer.WaitForAsyncValidation";n.prototype.getDomRefForValueStateMessage=n.prototype.getPopupAnchorDomRef;n.prototype.updateInputField=function(N){I.prototype.updateInputField.call(this,N);this.setDOMValue('');};n.prototype.getAccessibilityInfo=function(){var t=this.getTokens().map(function(o){return o.getText();}).join(" ");var i=I.prototype.getAccessibilityInfo.apply(this,arguments);i.type=r.getText("ACC_CTR_TYPE_MULTIINPUT");i.description=((i.description||"")+" "+t).trim();return i;};n.prototype._modifySuggestionPicker=function(){var t=this;if(!this._bUseDialog){return;}this._bShowSelectedButton=this._createFilterSelectedButton();this._oSuggPopover._oPopover.addContent(this._getTokensList());this._oSuggPopover._oPopover.attachBeforeOpen(function(){t._manageListsVisibility(t._bShowListWithTokens);t._fillList();t._updatePickerHeaderTitle();}).attachAfterClose(function(){t._tokenizer._useCollapsedMode(true);t._bShowListWithTokens=false;});this._oSuggPopover._oPopover.setCustomHeader(new d({contentMiddle:[new c()],contentRight:new B({icon:g.getIconURI("decline"),press:function(){t._oSuggPopover._oPopover.close();}})}));this._oSuggPopover._oPopover.setSubHeader(new f({content:[this._oSuggPopover._oPopupInput,this._bShowSelectedButton]}));this._oSuggPopover._oPopupInput.onsapenter=function(e){t._validateCurrentText();t._setValueInvisible();t.onChange(e,null,this.getValue());};this._oSuggPopover._oPopupInput.attachLiveChange(function(){if(t._bShowListWithTokens){t._filterTokens(this.getValue());}t._manageListsVisibility(t._bShowListWithTokens);});};n.prototype._createFilterSelectedButton=function(){var i=g.getIconURI("multiselect-all"),t=this;return new b({icon:i,press:function(e){t._bShowListWithTokens=e.getSource().getPressed();t._manageListsVisibility(t._bShowListWithTokens);}});};n.prototype._onBeforeOpenTokensPicker=function(){var p=this._getSelectedItemsPicker(),o=this.getDomRef(),w;this._setValueInvisible();this._fillList();if(o&&p){w=(o.offsetWidth/parseFloat(l.BaseFontSize))+"rem";p.setContentMinWidth(w);}};n.prototype._onAfterCloseTokensPicker=function(){if(this._oSuggPopover&&!this.getValue()){this._tokenizer._useCollapsedMode(true);this._setValueInvisible();}};n.prototype.getDialogTitle=function(){var p=this._oSuggPopover._oPopover,H=p&&p.getCustomHeader();if(H){return H.getContentMiddle()[0];}return null;};n.prototype._updatePickerHeaderTitle=function(){var o,e;e=this.getLabels();if(e.length){o=e[0];if(o&&(typeof o.getText==="function")){this.getDialogTitle().setText(o.getText());}}else{this.getDialogTitle().setText(r.getText("COMBOBOX_PICKER_TITLE"));}};n.prototype._openSelectedItemsPicker=function(){if(this._bUseDialog){this._oSuggPopover._oPopover.open();}else{var p=this._getSelectedItemsPicker();if(p){p.open();}}this._manageListsVisibility(true);this._setValueVisible();return this;};n.prototype._getTokensList=function(){if(!this._oSelectedItemsList){this._oSelectedItemsList=this._createTokensList();}return this._oSelectedItemsList;};n.prototype._getSuggestionsList=function(){return this._oSuggPopover&&this._oSuggPopover._oList;};n.prototype._createTokensList=function(){return new L({width:"auto",mode:m.MultiSelect,includeItemInSelection:true,rememberSelections:false}).attachBrowserEvent("tap",this._handleItemTap,this).attachSelectionChange(this._handleSelectionLiveChange,this);};n.prototype._filterTokens=function(v){this._getTokensList().getItems().forEach(function(i){if(i.getTitle().toLowerCase().indexOf(v)>-1){i.setVisible(true);}else{i.setVisible(false);}});};n.prototype._manageListsVisibility=function(s){this._getTokensList().setVisible(s);this._getSuggestionsList()&&this._getSuggestionsList().setVisible(!s);if(this._bUseDialog){this._bShowSelectedButton.setPressed(s);}};n.prototype._mapTokenToListItem=function(t){if(!t){return null;}var o=new sap.m.StandardListItem({selected:true,title:t.getText()});o.data("key",t.getKey());o.data("text",t.getText());o.data("tokenId",t.getId());return o;};n.prototype._fillList=function(){var t=this.getTokens(),o;if(!t){return;}this._getTokensList().removeAllItems();for(var i=0,e=t.length;i<e;i++){var p=t[i],o=this._mapTokenToListItem(p);this._getTokensList().addItem(o);}};n.prototype._handleIndicatorPress=function(){this._bShowListWithTokens=true;if(this.getEditable()){this._openSelectedItemsPicker();}else{this._fillList();this._getReadOnlyPopover().openBy(this._tokenizer._oIndicator[0]);}};n.prototype._handleItemTap=function(e){if(q(e.target).hasClass("sapMCbMark")){return;}if(this._bUseDialog){this._oSuggPopover._oPopover.close();}else if(this._oReadOnlyPopover&&this._oReadOnlyPopover.isOpen()){this._oReadOnlyPopover.close();}else{this._getSelectedItemsPicker().close();}};n.prototype._handleSelectionLiveChange=function(e){var o=e.getParameter("listItem"),i=e.getParameter("selected");this._syncTokensWithSelection(o,i);};n.prototype._syncTokensWithSelection=function(i,s){if(s){var t=new a({text:i.data("text"),key:i.data("key")});i.data("tokenId",t.getId());this.addToken(t);this.fireTokenUpdate({addedTokens:[t],removedTokens:[],type:T.TokenUpdateType.Added});}else{var S=i.data("tokenId");this.getTokens().some(function(t){if(t.getId()===S){this._tokenizer._onTokenDelete(t);return true;}}.bind(this));}};n.prototype._getSelectedItemsPicker=function(){if(this._oSelectedItemPicker){return this._oSelectedItemPicker;}this._oSelectedItemPicker=this._createDropdown();if(!this._bUseDialog){this._oSelectedItemPicker.setHorizontalScrolling(false).attachBeforeOpen(this._onBeforeOpenTokensPicker,this).attachAfterClose(this._onAfterCloseTokensPicker,this).addContent(this._getTokensList());}return this._oSelectedItemPicker;};n.prototype._createDropdown=function(){var o=new P(this._getDropdownSettings());o.setInitialFocus(this);this._decoratePopover(o);return o;};n.prototype._getReadOnlyPopover=function(){if(!this._oReadOnlyPopover){this._oReadOnlyPopover=this._createReadOnlyPopover();}return this._oReadOnlyPopover;};n.prototype._createReadOnlyPopover=function(){return new P({showArrow:true,placement:k.Auto,showHeader:false,contentMinWidth:"auto"}).addStyleClass("sapMMultiInputReadOnlyPopover").setInitialFocus(this);};n.prototype._decoratePopover=function(p){var t=this;p.open=function(){return this.openBy(t);};};n.prototype._getDropdownSettings=function(){return{showArrow:false,showHeader:false,placement:k.VerticalPreferredBottom,offsetX:0,offsetY:0,bounce:false};};return n;});
