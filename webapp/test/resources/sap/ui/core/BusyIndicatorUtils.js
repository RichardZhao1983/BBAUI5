/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./BlockLayerUtils',"sap/ui/thirdparty/jquery"],function(B,q){"use strict";var a=function(){};a.getElement=function(s){var S="sapUiLocalBusyIndicatorSizeMedium";if(s==="Large"){S="sapUiLocalBusyIndicatorSizeBig";}var c=document.createElement("div");c.className="sapUiLocalBusyIndicator "+S+" sapUiLocalBusyIndicatorFade";B.addAriaAttributes(c);b(c);return c;};function b(c,s){s=s||"sapUiLocalBusyIndicatorAnimStandard";var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core"),t=r.getText("BUSY_TEXT");c.setAttribute("title",t);var A=document.createElement("div");A.className="sapUiLocalBusyIndicatorAnimation "+s;A.appendChild(document.createElement("div"));A.appendChild(document.createElement("div"));A.appendChild(document.createElement("div"));c.appendChild(A);}function h(o,s){var p=o.$parent.get(0),c=o.$blockLayer.get(0);var A=c.children[0],w=A.offsetWidth;if(p.offsetWidth<w){A.className="sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimSmall";}}a.addHTML=function(o,s){var S="sapUiLocalBusyIndicatorSizeMedium",A;switch(s){case sap.ui.core.BusyIndicatorSize.Small:S="sapUiLocalBusyIndicatorSizeMedium";A="sapUiLocalBusyIndicatorAnimSmall";break;case sap.ui.core.BusyIndicatorSize.Large:S="sapUiLocalBusyIndicatorSizeBig";A="sapUiLocalBusyIndicatorAnimStandard";break;case sap.ui.core.BusyIndicatorSize.Auto:S="sapUiLocalBusyIndicatorSizeMedium";A="sapUiLocalBusyIndicatorAnimStandard";break;default:S="sapUiLocalBusyIndicatorSizeMedium";A="sapUiLocalBusyIndicatorAnimStandard";break;}var p=o.$parent.get(0),c=o.$blockLayer.get(0);p.className+=" sapUiLocalBusy";c.className+=" sapUiLocalBusyIndicator "+S+" sapUiLocalBusyIndicatorFade";b(c,A);if(s===sap.ui.core.BusyIndicatorSize.Auto){h(o);}q(p).attr('aria-busy',true);};a.animateIE9={start:function(){},stop:function(){}};return a;},true);
