let accessForm = new FormData();

accessForm.append('vendor_id', '1');

export const getMenu = () => 
	fetch('', {
            method: 'POST',
            body: JSON.stringify({'vendor_id': '1'}),
        }).then(response => response.json());

