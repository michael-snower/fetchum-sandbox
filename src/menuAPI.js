let accessForm = new FormData();

export const getMenu = () => 
	fetch('https://api.fetchum.co/hub_get_vendor_menu/', {
            method: 'POST',
            body: JSON.stringify({'vendor_id': 'rg7SuZjxSSSrv6erWCLgxOSWSKw2'}), // rg7SuZjxSSSrv6erWCLgxOSWSKw2
        }).then(response => response.json());

export const itemAvailability = (itemInfo) =>
	fetch('https://api.fetchum.co/hub_change_item_availability/', {
		method: 'POST',
		body: JSON.stringify({'vendor_id': itemInfo.vendor_id, 
			'menuitem_id': itemInfo.menuitem_id,
			'is_available': itemInfo.is_available}),
	}).then(response => response.json());

