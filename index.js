var challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

var userID = "Kosv9fPtkDoh4Oz7Yq/pVgWHS8HhdlCto5cR0aBoVMw=";
var id = Uint8Array.from(window.atob(userID), (c) => c.charCodeAt(0));

var publicKey = {
  challenge: challenge,

  rp: {
    name: "EventPad CORP",
  },

  user: {
    id: id,
    name: "alice@example.com",
    displayName: "Alice Liddell",
  },

  pubKeyCredParams: [
    { type: "public-key", alg: -7 },
    { type: "public-key", alg: -257 },
  ],
};

navigator.credentials
  .create({ publicKey: publicKey })
  .then((newCredentialInfo) => {
    console.log("SUCCESS", newCredentialInfo);
    sessionStorage.setItems(
      "newCredentialInfo",
      JSON.stringify(newCredentialInfo)
    );
  })
  .catch((error) => {
    console.log("FAIL", error);
  });
