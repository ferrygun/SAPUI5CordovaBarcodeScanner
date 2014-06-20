sap.ui.controller("view.BarcodeScan", {

	onInit: function() {
        this.bus = sap.ui.getCore().getEventBus();
    },
    
	
	onNavButtonTap: function(evt) {
		var bindingContext = evt.getSource().getBindingContext(); 

		var bus = sap.ui.getCore().getEventBus();
		bus.publish("nav", "to", { 
			id : "homepage",
			data : {
				context : bindingContext
			}
		});
	},
  

	doScan: function() {
		cordova.plugins.barcodeScanner.scan(
				function (result) {
					jQuery.sap.require("sap.ui.model.odata.datajs");
					OData.request ({
			             requestUri: "http://sapgatewayserver.com/sap/opu/odata/sap/ZGW_MATERIAL_SRV/Materials('" + result.text +"')",
			             method: "GET",
						 user : 'user',
			             password : 'password',
			             headers: {     
			            	 	"X-Requested-With": "XMLHttpRequest",
			                    "Content-Type": "application/atom+xml",
			                    "DataServiceVersion": "2.0",       
			                    "X-CSRF-Token":"Fetch"   
			              }           
			        	}, function (data, response) {
								  
							var oMatID = []; var oMatDescr=[];
							oMatID.push(data.Material);
							oMatDescr.push(data.MatlDesc);
									
							var data = [];
							for(var i = 0; i < oMatID.length; i++) {
								data.push({"MatID": oMatID[i], "MatDescr": oMatDescr[i]});
							}
							var oModel1 = new sap.ui.model.json.JSONModel({ "zgwmat": data });
							sap.ui.getCore().setModel(oModel1, "zgwmatmodel");
										
							var bus = sap.ui.getCore().getEventBus();
								bus.publish("nav", "to", { 
								id : "scanresult",
						
							});
								
			            },
			            function (err) {
			                var request = err.request; 
			                var response = err.response; 
			                alert("Error in Get -- Request "+request+" Response "+response);
			            }
					);

			      }, 
			    function (error) {
			       alert("Scanning failed: " + error);
			   }
		);
		
	}	
	
});  

