/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor",
	"sap/m/Input",
	"sap/ui/base/BindingParser",
	"sap/ui/core/format/NumberFormat"
], function (
	BasePropertyEditor,
	Input,
	BindingParser,
	NumberFormat
) {
	"use strict";

	/**
	 * @class
	 * Constructor for a new <code>NumberEditor</code>.
	 * This allows to set numeric values or binding paths for a specified property of a JSON object.
	 * The editor is rendered as a {@link sap.m.Input}, which prevents non-numeric user input unless it is a valid binding path.
	 * To get notified about changes made with the editor, you can use the <code>attachPropertyChanged</code> method,
	 * which passes the current property value as a number or binding string to the provided callback function when the state changes.
	 *
	 * @extends sap.ui.integration.designtime.baseEditor.propertyEditor.BasePropertyEditor
	 * @alias sap.ui.integration.designtime.baseEditor.propertyEditor.numberEditor.NumberEditor
	 * @author SAP SE
	 * @since 1.72
	 * @version ${version}
	 *
	 * @private
	 * @experimental
	 * @ui5-restricted
	 */
	var NumberEditor = BasePropertyEditor.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.numberEditor.NumberEditor", {
		constructor: function() {
			BasePropertyEditor.prototype.constructor.apply(this, arguments);
			this._oInput = new Input({value: "{value}"});
			this._oInput.attachLiveChange(function(oEvent) {
				var sInput = this._validate(this._oInput.getValue());
				if (sInput !== null) {
					this.firePropertyChanged(sInput);
				}
			}, this);
			this.addContent(this._oInput);
		},
		_validate: function(sValue) {
			try {
				var oParsed = BindingParser.complexParser(sValue);
				var nValue = NumberFormat.getFloatInstance().parse(sValue);
				if (!oParsed && sValue && isNaN(nValue)) {
					throw "NaN";
				}
				this._oInput.setValueState("None");
				return oParsed || !sValue ? sValue : nValue;
			} catch (vError) {
				this._oInput.setValueState("Error");
				this._oInput.setValueStateText(this.getI18nProperty("BASE_EDITOR.NUMBER.INVALID_BINDING_OR_NUMBER"));
				return null;
			}
		},
		renderer: BasePropertyEditor.getMetadata().getRenderer().render
	});

	return NumberEditor;
});
