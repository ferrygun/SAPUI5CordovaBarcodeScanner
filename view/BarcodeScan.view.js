sap.ui.jsview("view.BarcodeScan", {

	getControllerName : function() {
		return "view.BarcodeScan";
	},

	createContent : function(oController) {
		
		
		var oPage = new sap.m.Page( {
			   title: "Barcode Scanner",
			   showNavButton: true,
			   navButtonTap: [oController.onNavButtonTap],
			   content: [
				this.oScanPullToRefresh,
				this.oScanHeader,
				this.oScanList,
				new sap.ui.core.HTML({content: '<br>'}),
				new sap.m.Button({
						text: "Scan", 
						type: sap.m.ButtonType.Emphasized,						
						press: function () {oController.doScan();}
						}).addStyleClass('margin')
			   ]
		});
		
		return oPage;
	},
});   
