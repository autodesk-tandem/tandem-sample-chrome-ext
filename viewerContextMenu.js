class TandemAddressExtension extends Autodesk.Viewing.Extension {
	constructor(viewer) { super(viewer) }

    // dig out the address string from the Facility Properties
  getFacilityAddress() {
    if (window.DT_APP && window.DT_APP.currentFacility) {
      let addressStr = window.DT_APP.currentFacility.settings.props['Identity Data'].Address; //TBD: ugly accessor syntax
      let addressURL = encodeURIComponent(addressStr);  // maps wants encoded URI
      return addressURL;
    }
    return null;
  }

    // dig out the building name string from the Facility Properties
  getFacilityName() {
    if (window.DT_APP && window.DT_APP.currentFacility) {
      let nameStr = window.DT_APP.currentFacility.settings.props['Identity Data']['Building Name']; //TBD: ugly accessor syntax
      return nameStr;
    }
    return null;
  }

	load(viewer) {
		this.viewer.registerContextMenuCallback('TandemAddressMenu', ( menu, status ) => {

			menu.unshift({
				title: `Search Facility Name`,
				className: 'navbar',
				target: (e) => {
          let nameStr = this.getFacilityName();
          if (nameStr) {
					  window.open("http://www.google.com/search?q=" + nameStr);
          }
          else {
            window.alert("Can't find the building name!");
          }
				}
			});
			menu.unshift({
				title: `Map Facility Address`,
				className: 'navbar',
				target: (e) => {
          let addressURL = this.getFacilityAddress();
          if (addressURL) {
            window.open("https://www.google.com/maps/place/" + addressURL);
          }
          else {
            window.alert("Can't find the building address!");
          }
        }
			});
		})
		return true;
	}

	unload() {
		return true;
	}
}

Autodesk.Viewing.theExtensionManager.registerExtension('TandemAddressExtension', TandemAddressExtension);

if (window.NOP_VIEWER) {
  console.log("TANDEM_EXT:", "Loading TandemAddressExtension context menu for Viewer");
	NOP_VIEWER.loadExtension("TandemAddressExtension");
}
else {
  console.log("TANDEM_EXT:", "Could not load TandemAddressExtension for Viewer");
}
