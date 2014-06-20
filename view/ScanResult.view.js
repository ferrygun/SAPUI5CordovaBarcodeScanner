sap.ui.jsview("view.ScanResult", {

	getControllerName : function() {
		return "view.ScanResult";
	},

	createContent : function(oController) {
		
		var oPage = new sap.m.Page({
			title:"Barcode Scan Result",
			showNavButton:true,
			enableScrolling: true,
			navButtonPress : [ oController.onNavButtonTap, oController ]
		});
		//Create a matrix layout with 2 columns
		var oMatrix = new sap.ui.commons.layout.MatrixLayout({layoutFixed: true, width: '320px', columns: 2});
		oMatrix.setWidths('150px', '170px');
		
		var oTableMat = new sap.m.Table("otablemat", {
	        inset: true,
	        headerText: "Scan Result",
	        columns: [
	            new sap.m.Column({ header: new sap.m.Label({ text: "Material ID"}),  width: '60%' }),
	            new sap.m.Column({ header: new sap.m.Label({ text: "Description" }), width: '20%' }),
	        ],
	    });
		
		oTableMat.bindAggregation("items", {
	        path: "zgwmatmodel>/zgwmat",
	        template: new sap.m.ColumnListItem({
	            cells: [
	                    new sap.m.Label({ text: "{zgwmatmodel>MatID}" }),
	                    new sap.m.Label({ text: "{zgwmatmodel>MatDescr}" }),
	            ]
	        })
	    });
	    
		oPage.addContent(oTableMat);
		
		this.addEventDelegate({
			onBeforeShow: function(evt) {
				this.setBindingContext(evt.data);
				this.setModel("zgwmatmodel", sap.ui.getCore().getModel('zgwmatmodel'));
			}
		}, this); 

		return oPage;
		
	},
});   
