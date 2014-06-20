sap.ui.controller("view.Homepage", {

	onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },
    
	doNavOnSelect: function(event) {
		
        this.bus.publish("nav", "to", {
            id: 'barcodescan'
        });
    },

      
	onNavButtonTap: function(evt) {
		app.ref.AppView.splitApp.backMaster();
	},
 
});  

