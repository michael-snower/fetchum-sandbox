let accessForm = new FormData();

accessForm.append('vendor_id', '1');

export const getMenu = () => 
	fetch('', {
            method: 'POST',
            body: JSON.stringify({}),
        }).then(response => response.json());

