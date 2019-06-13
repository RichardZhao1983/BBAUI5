/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/TreeItemBaseRenderer','sap/ui/core/Renderer'],function(T,R){"use strict";var D=R.extend(T);D.renderLIContent=function(r,c){r.write('<span');r.addClass("sapDemokitTreeItemTitle");r.addClass("sapUiTinyMarginEnd");r.writeClasses();r.write('>');r.writeEscaped(c.getTitle());r.write('</span>');if(c.getDeprecated()){r.write('<span');r.addClass("sapDemokitTreeItemLabel");r.writeClasses();r.write('>');r.write("Deprecated");r.write('</span>');}};return D;},true);
