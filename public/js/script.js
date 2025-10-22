const socket = io();

if (navigator.geolocation) {
    navigator.geolocation.watchPosition((position) => {
        const { latitude, longitude } = position.coords;

        socket.emit('sending-location', { latitude, longitude });
    });
    (error) => {
        console.error("Geolocation error:", error);

        console.error("error");
    },
    {
        enableHighAccuracy: true,
        timeout: 3000,
        maximumAge: 0,
    }


};

const map = L.map("map").setView([0, 0], 10);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

const marker = {}; // Object to hold markers for each user


socket.on("spreading-location", (data) => {
    console.log("Location data received:", data); // Debug log for received location data

    const { id, latitude, longitude } = data;
    map.setView([latitude, longitude]);
    if (marker[id]) {
        marker[id].setLatLng([latitude, longitude]);
    } else {
        marker[id] = L.marker([latitude, longitude]).addTo(map);
    }
});


socket.on("user-disconnected", (id) => {
    if (marker[id]) {
        map.removeLayer(marker[id]);
        delete marker[id];}
});