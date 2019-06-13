/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/core/library","sap/ui/model/ChangeReason","./TableGrouping","./TableColumnUtils","./TableMenuUtils","./TableBindingUtils","./library","sap/base/Log","sap/ui/thirdparty/jquery"],function(B,C,R,c,a,T,b,d,e,l,L,q){"use strict";var S=l.SelectionBehavior;var f=l.SelectionMode;var M=c.MessageType;var r;var g={DATACELL:1,COLUMNHEADER:2,ROWHEADER:4,ROWACTION:8,COLUMNROWHEADER:16};g.ANYCONTENTCELL=g.ROWHEADER|g.DATACELL|g.ROWACTION;g.ANYCOLUMNHEADER=g.COLUMNHEADER|g.COLUMNROWHEADER;g.ANYROWHEADER=g.ROWHEADER|g.COLUMNROWHEADER;g.ANY=g.ANYCONTENTCELL|g.ANYCOLUMNHEADER;var h=1;var D={sapUiSizeCozy:48,sapUiSizeCompact:32,sapUiSizeCondensed:24,undefined:32};var j={sapUiSizeCozy:D.sapUiSizeCozy+h,sapUiSizeCompact:D.sapUiSizeCompact+h,sapUiSizeCondensed:D.sapUiSizeCondensed+h,undefined:D.undefined+h};var k={Render:"Render",VerticalScroll:"VerticalScroll",FirstVisibleRowChange:"FirstVisibleRowChange",Unbind:"Unbind",Animation:"Animation",Resize:"Resize",Unknown:"Unknown"};for(var p in a){k[p]=a[p];}var I=":sapTabbable, .sapUiTableTreeIcon:not(.sapUiTableTreeIconLeaf)";var m={Grouping:T,Column:b,Menu:d,Binding:e,CELLTYPE:g,ROW_HORIZONTAL_FRAME_SIZE:h,DEFAULT_ROW_HEIGHT:j,RowsUpdateReason:k,INTERACTIVE_ELEMENT_SELECTORS:I,hasRowHeader:function(t){return(t.getSelectionMode()!==f.None&&t.getSelectionBehavior()!==S.RowOnly)||T.isGroupMode(t);},hasSelectAll:function(t){var s=t?t.getSelectionMode():f.None;return(s===f.Multi||s===f.MultiToggle)&&t.getEnableSelectAll();},hasRowHighlights:function(t){if(!t){return false;}var o=t.getRowSettingsTemplate();if(!o){return false;}var H=o.getHighlight();return o.isBound("highlight")||(H!=null&&H!==M.None);},getRowActionCount:function(t){var o=t.getRowActionTemplate();return o?o._getCount():0;},hasRowActions:function(t){var o=t.getRowActionTemplate();return o!=null&&(o.isBound("visible")||o.getVisible())&&m.getRowActionCount(t)>0;},isRowSelectionAllowed:function(t){return t.getSelectionMode()!==f.None&&(t.getSelectionBehavior()===S.Row||t.getSelectionBehavior()===S.RowOnly);},isRowSelectorSelectionAllowed:function(t){return t.getSelectionMode()!==f.None&&m.hasRowHeader(t);},areAllRowsSelected:function(t){if(!t){return false;}var s=t._getSelectableRowCount();return s>0&&s===t._getSelectedIndicesCount();},isNoDataVisible:function(t){if(!t.getShowNoData()){return false;}return!m.hasData(t);},hasData:function(t){var o=t.getBinding("rows");var i=t._getTotalRowCount();var H=i>0;if(o&&o.providesGrandTotal){var n=o.providesGrandTotal()&&o.hasTotaledMeasures();H=(n&&i>1)||(!n&&i>0);}return H;},isBusyIndicatorVisible:function(t){if(!t||!t.getDomRef()){return false;}return t.getDomRef().querySelector(".sapUiTableCnt > .sapUiLocalBusyIndicator")!=null;},hasPendingRequests:function(t){if(!t){return false;}if(m.canUsePendingRequestsCounter(t)){return t._iPendingRequests>0;}else{return t._bPendingRequest;}},canUsePendingRequestsCounter:function(t){var o=t?t.getBinding("rows"):null;if(m.isA(o,"sap.ui.model.analytics.AnalyticalBinding")){return o.bUseBatchRequests;}else if(m.isA(o,"sap.ui.model.TreeBinding")){return false;}return true;},isA:function(o,t){return B.isA(o,t);},toggleRowSelection:function(t,v,s,i){if(!t||!t.getBinding("rows")||t.getSelectionMode()===f.None||v==null){return false;}function n(A){if(!t._isRowSelectable(A)){return false;}t._iSourceRowIndex=A;var w=true;if(i){w=i(A,s);}else if(t.isIndexSelected(A)){if(s===true){return false;}t.removeSelectionInterval(A,A);}else{if(s===false){return false;}t.addSelectionInterval(A,A);}delete t._iSourceRowIndex;return w;}if(typeof v==="number"){if(v<0||v>=t._getTotalRowCount()){return false;}return n(v);}else{var $=q(v);var o=m.getCellInfo($[0]);var u=m.isRowSelectionAllowed(t);if(!m.Grouping.isInGroupingRow($[0])&&((o.isOfType(m.CELLTYPE.DATACELL|m.CELLTYPE.ROWACTION)&&u)||(o.isOfType(m.CELLTYPE.ROWHEADER)&&m.isRowSelectorSelectionAllowed(t)))){var A;if(o.isOfType(m.CELLTYPE.DATACELL)){A=t.getRows()[parseInt($.closest("tr",t.getDomRef()).attr("data-sap-ui-rowindex"),10)].getIndex();}else{A=t.getRows()[parseInt($.attr("data-sap-ui-rowindex"),10)].getIndex();}return n(A);}return false;}},getNoDataText:function(t){var n=t.getNoData();if(n instanceof C){return null;}else if(typeof n==="string"||t.getNoData()instanceof String){return n;}else{return m.getResourceText("TBL_NO_DATA");}},getVisibleColumnCount:function(t){return t._getVisibleColumns().length;},getHeaderRowCount:function(t){if(t._iHeaderRowCount===undefined){if(!t.getColumnHeaderVisible()){t._iHeaderRowCount=0;}else{var H=1;var n=t.getColumns();for(var i=0;i<n.length;i++){if(n[i].shouldRender()){H=Math.max(H,n[i].getMultiLabels().length);}}t._iHeaderRowCount=H;}}return t._iHeaderRowCount;},isVariableRowHeightEnabled:function(t){return t&&t._bVariableRowHeightEnabled&&t.getFixedRowCount()<=0&&t.getFixedBottomRowCount()<=0;},getTotalRowCount:function(t,i){var n=t._getTotalRowCount();if(i){n=Math.max(n,t.getVisibleRowCount());}return n;},getNonEmptyVisibleRowCount:function(t){return Math.min(t.getVisibleRowCount(),t._getTotalRowCount());},getFocusedItemInfo:function(t){var i=t._getItemNavigation();if(!i){return null;}return{cell:i.getFocusedIndex(),columnCount:i.iColumns,cellInRow:i.getFocusedIndex()%i.iColumns,row:Math.floor(i.getFocusedIndex()/i.iColumns),cellCount:i.getItemDomRefs().length,domRef:i.getFocusedDomRef()};},getRowIndexOfFocusedCell:function(t){var i=m.getFocusedItemInfo(t);return i.row-m.getHeaderRowCount(t);},isFixedColumn:function(t,i){return i<t.getComputedFixedColumnCount();},hasFixedColumns:function(t){return t.getComputedFixedColumnCount()>0;},focusItem:function(t,i,E){var o=t._getItemNavigation();if(o){o.focusItem(i,E);}},getCellInfo:function(o){var i;var $=q(o);var s;var n;var t;var u;var v;i={type:0,cell:null,rowIndex:null,columnIndex:null,columnSpan:null};if($.hasClass("sapUiTableTd")){s=$.data("sap-ui-colid");n=sap.ui.getCore().byId(s);i.type=m.CELLTYPE.DATACELL;i.rowIndex=parseInt($.parent().data("sap-ui-rowindex"),10);i.columnIndex=n.getIndex();i.columnSpan=1;}else if($.hasClass("sapUiTableCol")){t=/_([\d]+)/;s=$.attr("id");u=t.exec(s);v=u&&u[1]!=null?parseInt(u[1],10):0;i.type=m.CELLTYPE.COLUMNHEADER;i.rowIndex=v;i.columnIndex=parseInt($.data("sap-ui-colindex"),10);i.columnSpan=parseInt($.attr("colspan")||1,10);}else if($.hasClass("sapUiTableRowHdr")){i.type=m.CELLTYPE.ROWHEADER;i.rowIndex=parseInt($.data("sap-ui-rowindex"),10);i.columnIndex=-1;i.columnSpan=1;}else if($.hasClass("sapUiTableRowAction")){i.type=m.CELLTYPE.ROWACTION;i.rowIndex=parseInt($.data("sap-ui-rowindex"),10);i.columnIndex=-2;i.columnSpan=1;}else if($.hasClass("sapUiTableColRowHdr")){i.type=m.CELLTYPE.COLUMNROWHEADER;i.columnIndex=-1;i.columnSpan=1;}if(i.type!==0){i.cell=$;}i.isOfType=function(w){if(w==null){return false;}return(this.type&w)>0;};return i;},getRowColCell:function(t,n,o,s){var u=n>=0&&n<t.getRows().length?t.getRows()[n]:null;var v=s?t.getColumns():t._getVisibleColumns();var w=o>=0&&o<v.length?v[o]:null;var x=null;if(u&&w){if(s){if(w.shouldRender()){var V=t._getVisibleColumns();for(var i=0;i<V.length;i++){if(V[i]===w){x=u.getCells()[i];break;}}}}else{x=u.getCells()[o];}if(x&&x.data("sap-ui-colid")!=w.getId()){var y=u.getCells();for(var i=0;i<y.length;i++){if(y[i].data("sap-ui-colid")===w.getId()){x=y[i];break;}}}}return{row:u,column:w,cell:x};},getCell:function(t,E){if(!t||!E){return null;}var $=q(E);var n;var o=t.getDomRef();var s=[".sapUiTableTd",".sapUiTableCol",".sapUiTableRowHdr",".sapUiTableRowAction",".sapUiTableColRowHdr"];var u;for(var i=0;i<s.length;i++){u=s[i];n=$.closest(u,o);if(n.length>0){return n;}}return null;},getParentCell:function(t,E){var $=q(E);var i=m.getCell(t,E);if(!i||i[0]===$[0]){return null;}else{return i;}},registerResizeHandler:function(t,i,H,n){var o;if(typeof i=="string"){o=t.getDomRef(i);}else{L.error("sIdSuffix must be a string",t);return;}if(typeof H!=="function"){L.error("fnHandler must be a function",t);return;}m.deregisterResizeHandler(t,i);if(!t._mResizeHandlerIds){t._mResizeHandlerIds={};}if(n&&o){o=o.parentNode;}if(o){t._mResizeHandlerIds[i]=R.register(o,H);}return t._mResizeHandlerIds[i];},deregisterResizeHandler:function(t,v){var n;if(!t._mResizeHandlerIds){return;}if(typeof v=="string"){n=[v];}else if(v===undefined){n=[];for(var K in t._mResizeHandlerIds){if(typeof K=="string"&&t._mResizeHandlerIds.hasOwnProperty(K)){n.push(K);}}}else if(Array.isArray(v)){n=v;}for(var i=0;i<n.length;i++){var s=n[i];if(t._mResizeHandlerIds[s]){R.deregister(t._mResizeHandlerIds[s]);t._mResizeHandlerIds[s]=undefined;}}},isFirstScrollableRow:function(t,i){if(isNaN(i)){var $=q(i);i=parseInt($.add($.parent()).filter("[data-sap-ui-rowindex]").data("sap-ui-rowindex"),10);}var F=t.getFixedRowCount()||0;return i==F;},isLastScrollableRow:function(t,i){if(isNaN(i)){var $=q(i);i=parseInt($.add($.parent()).filter("[data-sap-ui-rowindex]").data("sap-ui-rowindex"),10);}var F=t.getFixedBottomRowCount()||0;return i==t.getVisibleRowCount()-F-1;},getContentDensity:function(o){var s;var n=["sapUiSizeCondensed","sapUiSizeCompact","sapUiSizeCozy"];var G=function(F,O){if(!O[F]){return;}for(var i=0;i<n.length;i++){if(O[F](n[i])){return n[i];}}};var $=o.$();if($.length>0){s=G("hasClass",$);}else{s=G("hasStyleClass",o);}if(s){return s;}var P=null;var t=o.getParent();if(t){do{s=G("hasStyleClass",t);if(s){return s;}if(t.getDomRef){P=t.getDomRef();}else if(t.getRootNode){P=t.getRootNode();}if(!P&&t.getParent){t=t.getParent();}else{t=null;}}while(t&&!P);}$=q(P||document.body);s=G("hasClass",$.closest("."+n.join(",.")));return s;},sanitizeSelectionMode:function(t,s){if(s===f.Multi){s=f.MultiToggle;L.warning("The selection mode 'Multi' is deprecated and must not be used anymore. Your setting was defaulted to selection mode 'MultiToggle'");}return s;},isVariableWidth:function(w){return!w||w=="auto"||w.toString().match(/%$/);},getFirstFixedButtomRowIndex:function(t){var F=t.getFixedBottomRowCount();var o=t.getBinding("rows");var i=-1;if(o&&F>0){var v=t.getVisibleRowCount();var n=t.getFirstVisibleRow();var s=t._getTotalRowCount();if(s>=v){i=v-F;}else{var u=s-F-n;if(u>=0&&(n+u)<s){i=u;}}}return i;},getResourceBundle:function(o){o=q.extend({async:false,reload:false},o);if(r&&o.reload!==true){if(o.async===true){return Promise.resolve(r);}else{return r;}}var v=sap.ui.getCore().getLibraryResourceBundle("sap.ui.table",o.async===true);if(v instanceof Promise){v=v.then(function(i){r=i;return r;});}else{r=v;}return v;},getResourceText:function(K,v){return r?r.getText(K,v):"";},dynamicCall:function(o,v,t){var O=o instanceof Function?o():o;if(!O||!v){return undefined;}t=t||O;if(v instanceof Function){v.call(t,O);return undefined;}else{var P;var i=[];for(var F in v){if(O[F]instanceof Function){P=v[F];i.push(O[F].apply(t,P));}else{i.push(undefined);}}if(i.length===1){return i[0];}else{return i;}}},throttle:function(i,o){o=Object.assign({wait:0,leading:true},o);o.maxWait=o.wait;o.trailing=true;o.requestAnimationFrame=false;return m.debounce(i,o);},debounce:function(i,o){o=Object.assign({wait:0,maxWait:null,leading:false,asyncLeading:false,trailing:true,requestAnimationFrame:false},o);var n=null;var t=null;var s=null;var u=o.maxWait!=null;o.wait=Math.max(0,o.wait);o.maxWait=u?Math.max(o.maxWait,o.wait):o.maxWait;function v(F,G,H){H=H===true;n=Date.now();if(G==null){return;}if(H){var P=Promise.resolve().then(function(){if(P.canceled){return;}s=null;i.apply(F,G);});P.cancel=function(){P.canceled=true;};s=P;}else{i.apply(F,G);}}function w(F,G){x();function _(O){O=O!==false;if(o.trailing){v(F,G);}if(O){z();}}if(o.requestAnimationFrame){t=window.requestAnimationFrame(function(){_();});}else{var N=Date.now();var H=n==null?0:N-n;var J=Math.max(0,u?Math.min(o.maxWait-H,o.wait):o.wait);var K=J<o.wait;t=setTimeout(function(){if(K){var O=Math.max(0,(Date.now()-N)-J);var P=o.wait-J;if(O>P){_();}else{t=setTimeout(z,P-O);_(false);}}else{_();}},J);}}function x(){if(o.requestAnimationFrame){window.cancelAnimationFrame(t);}else{clearTimeout(t);}t=null;}function y(){if(s){s.cancel();s=null;}}function z(){x();y();n=null;}function A(){return t!=null;}var E=function(){if(!A()&&!o.leading){v();}if(A()||!o.leading){w(this,arguments);}else if(o.asyncLeading){v(this,arguments,true);w();}else{w();v(this,arguments);}};E.cancel=z;E.pending=A;return E;},getInteractiveElements:function(o){if(!o){return null;}var $=q(o);var i=m.getCellInfo($);if(i.isOfType(g.DATACELL|g.ROWACTION)){var n=$.find(I);if(n.length>0){return n;}}return null;}};T.TableUtils=m;b.TableUtils=m;d.TableUtils=m;e.TableUtils=m;return m;},true);
