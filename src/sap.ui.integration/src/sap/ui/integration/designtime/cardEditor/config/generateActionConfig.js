/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/base/util/restricted/_merge"
], function (
	_merge
) {
	"use strict";

	/**
	* Generate a customized configuration object for card actions.
	* @param {object} oCustomConfig - Object with the desired configuration customizations to be applied to the generated config.
	* @param {string} oCustomConfig.path - Action binding path
	* @param {string[]} [oCustomConfig.tags] - Property tags
	* @param {string|boolean} [oCustomConfig.visible] - Visibility condition expression
	* @param {number} [oCustomConfig.maxItems] - Maximum amount of actions
	* @returns {object} Card action configuration object
	* @function
	* @experimental
	* @private
	*/

	return function (oCustomConfig) {
		return _merge({}, {
			"label": "{i18n>CARD_EDITOR.ACTIONS}",
			"type": "array",
			"itemLabel": "{i18n>CARD_EDITOR.ACTION}",
			"template": {
				"enabled": {
					"label": "{i18n>CARD_EDITOR.ACTION.ENABLED}",
					"type": "boolean",
					"defaultValue": true,
					"path": oCustomConfig.path + "/:index/enabled"
				},
				"type": {
					"label": "{i18n>CARD_EDITOR.ACTION.TYPE}",
					"type": "enum",
					"enum": ["Navigation"],
					"defaultValue": "Navigation",
					"path": oCustomConfig.path + "/:index/type",
					"visible": false // Deactivated as Navigation is currently the only option
				},
				"service": {
					"label": "{i18n>CARD_EDITOR.ACTION.SERVICE}",
					"type": "string",
					"path": oCustomConfig.path + "/:index/service",
					"visible": false // Currently undocumented
				},
				// "parameters": {
				// 	"label": "{i18n>CARD_EDITOR.ACTION.PARAMETERS}",
				// 	"type": "parameters",
				// 	"path": oCustomConfig.path + "/:index/parameters"
				// },
				"target": {
					"label": "{i18n>CARD_EDITOR.ACTION.TARGET}",
					"type": "enum",
					"enum": [
						"_blank",
						"_self"
					],
					"defaultValue": "_blank",
					"path": oCustomConfig.path + "/:index/target"
				},
				"url": {
					"label": "{i18n>CARD_EDITOR.ACTION.URL}",
					"type": "string",
					"path": oCustomConfig.path + "/:index/url"
				}
			}
		}, oCustomConfig);
	};
});
