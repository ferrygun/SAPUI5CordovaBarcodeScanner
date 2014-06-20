sap.ui.jsview("view.Homepage", {

	getControllerName: function () {
		return "view.Homepage";
	},
	
	createContent: function (oController) {
		
		var Homepage = new sap.m.Page( {
			showHeader: true,
			title: "{i18n>appTitle}",
			icon: "{img>/icon/barcodescan}", 
			content: [
				new sap.m.List({
					items : [
						new sap.m.StandardListItem({
							title: "{i18n>barcodescan}", 
							type: "Navigation", 
							icon: "{img>/icon/barcodescan}", 
							tap: function() {oController.doNavOnSelect();}
						}),
						
					]
				}) 
			],
			

			footer : new sap.m.Bar({
				contentLeft : new sap.m.Image({
					src: "{img>/icon/barcodescan}",
					height: "34px",
					width: "34px",	
				}).addStyleClass('margin'),
				contentMiddle : new sap.m.Label({
					text: "{i18n>footer}", 
					design: sap.m.LabelDesign.Bold
				}),
				
			})
				
			
		});
		
		return Homepage;
	}

});
