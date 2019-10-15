/*!
 * ${copyright}
 */

sap.ui.define(["./MessageStripUtilities", "sap/ui/core/InvisibleText"],
	function (MSUtils, InvisibleText) {
	"use strict";

	/**
	 * MessageStrip renderer.
	 * @namespace
	 */
	var MessageStripRenderer = {
		apiVersion: 2
	};

	/**
	 * Renders the HTML for the given control, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm the RenderManager that can be used for writing to the render output buffer
	 * @param {sap.ui.core.Control} oControl an object representation of the control that should be rendered
	 */
	MessageStripRenderer.render = function(oRm, oControl) {
		this.startMessageStrip(oRm, oControl);
		this.renderAriaTypeText(oRm, oControl);

		if (oControl.getShowIcon()) {
			this.renderIcon(oRm, oControl);
		}

		this.renderTextAndLink(oRm, oControl);

		if (oControl.getShowCloseButton()) {
			this.renderCloseButton(oRm, oControl);
		}

		this.endMessageStrip(oRm);
	};

	MessageStripRenderer.startMessageStrip = function (oRm, oControl) {
		oRm.openStart("div", oControl);
		oRm.class(MSUtils.CLASSES.ROOT);
		oRm.class(MSUtils.CLASSES.ROOT + oControl.getType());

		oRm.attr(MSUtils.ATTRIBUTES.CLOSABLE, oControl.getShowCloseButton());
		oRm.accessibilityState(oControl, MSUtils.getAccessibilityState.call(oControl));
		oRm.openEnd();
	};

	MessageStripRenderer.renderAriaTypeText = function (oRm, oControl) {
		oRm.openStart("span");
		oRm.class("sapUiPseudoInvisibleText");
		oRm.openEnd();
		oRm.text(MSUtils.getAriaTypeText.call(oControl));
		oRm.close("span");
	};

	MessageStripRenderer.renderIcon = function (oRm, oControl) {
		oRm.openStart("div");
		oRm.class(MSUtils.CLASSES.ICON);
		oRm.openEnd();
		oRm.icon(MSUtils.getIconURI.call(oControl), null, {
			"title": null // prevent the icon title (icon is only decorative)
		});
		oRm.close("div");
	};

	MessageStripRenderer.renderTextAndLink = function (oRm, oControl) {
		var oFormattedText = oControl.getAggregation("_formattedText");

		oRm.openStart("div");
		oRm.class(MSUtils.CLASSES.MESSAGE);
		oRm.openEnd();

		// Determine if Formatted text control should be rendered or plain text control on "enableFormattedText" property
		if (oControl.getEnableFormattedText() && oFormattedText) {
			oRm.renderControl(oFormattedText);
		} else {
			oRm.renderControl(oControl.getAggregation("_text"));
		}

		oRm.renderControl(oControl.getLink());
		oRm.close("div");
	};

	MessageStripRenderer.renderCloseButton = function (oRm, oControl) {
		var oRb = sap.ui.getCore().getLibraryResourceBundle("sap.m");

		var MESSAGE_STRIP_CLOSE_BUTTON = oRb.getText("MESSAGE_STRIP_" + oControl.getType().toUpperCase() + "_CLOSE_BUTTON"),
			MESSAGE_STRIP_TITLE = oRb.getText("MESSAGE_STRIP_TITLE"),
			oAccText = new InvisibleText( {text: MESSAGE_STRIP_CLOSE_BUTTON})
				.toStatic().getId();

		oRm.openStart("button");
		oRm.class(MSUtils.CLASSES.CLOSE_BUTTON);
		oRm.attr("title", MESSAGE_STRIP_TITLE);
		oRm.attr("aria-labelledby", oAccText);
		oRm.openEnd();
		oRm.close("button");
	};

	MessageStripRenderer.endMessageStrip = function (oRm) {
		oRm.close("div");
	};

	return MessageStripRenderer;
}, /* bExport= */ true);
