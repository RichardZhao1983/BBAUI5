
/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/TreeItemBaseRenderer', 'sap/ui/core/Renderer'],
function(TreeItemBaseRenderer, Renderer) {
	"use strict";

	var DemokitTreeItemRender = Renderer.extend(TreeItemBaseRenderer);

	DemokitTreeItemRender.renderLIContent = function(oRm, oControl) {

		oRm.write('<span');
		oRm.addClass("sapDemokitTreeItemTitle");
		oRm.addClass("sapUiTinyMarginEnd");
		oRm.writeClasses();
		oRm.write('>');
		oRm.writeEscaped(oControl.getTitle());
		oRm.write('</span>');

		if (oControl.getDeprecated()) {
			oRm.write('<span');
			oRm.addClass("sapDemokitTreeItemLabel");
			oRm.writeClasses();
			oRm.write('>');
			oRm.write("Deprecated");
			oRm.write('</span>');
		}
	};

	return DemokitTreeItemRender;
}, /* bExport= */ true);
