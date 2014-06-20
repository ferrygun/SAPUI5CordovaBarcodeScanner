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
					var sUrl = "http://sapgatewayserver.com:8000/sap/opu/odata/sap/ZGW_MATERIAL_SRV";
					var oModel = new sap.ui.model.odata.ODataModel(sUrl, true, "username", "password");
		 
					oModel.read(
						 "/Materials('" + result.text + "')", 
						 null,
						 null,
						 true, 
						 function(oData, response) { 
							
							 sap.ui.core.BusyIndicator.hide();
							 console.log(response.data.Material);
					 
							 var oMatID = []; var oMatDescr=[];
							oMatID.push(response.data.Material);
							oMatDescr.push(response.data.MatlDesc);
									
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
			            	 alert("Error in Get -- Request " + err.response.body);
			                 console.log(err.response.body);
			            }
					);

			      }, 
			    function (error) {
			       alert("Scanning failed: " + error);
			   }
		);
		
	},

});  

