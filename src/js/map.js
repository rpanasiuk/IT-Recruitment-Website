function map() {
	const mymap = L.map('mainMap').setView([52.22, 21.01], 15);
	const accessToken = "pk.eyJ1IjoiZXJlc3RlIiwiYSI6ImNqaTUzZnM1eDBmdnkzcHFzcnF6dnFjcTMifQ.Gkz3gB7ArLsUA_YVZqfHAw";
	const marker = L.marker([52.22, 21.01]).addTo(mymap);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox.streets',
	    accessToken: accessToken
	}).addTo(mymap);
}

export { map } 