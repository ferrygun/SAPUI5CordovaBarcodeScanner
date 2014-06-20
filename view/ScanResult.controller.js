sap.ui.controller("view.ScanResult", {

	onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },
    
	
	onNavButtonTap: function(evt) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "barcodescan",
			data : {
				context : bindingContext
			}
		});
	},

});  

