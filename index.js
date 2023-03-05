var challenge = new Uint8Array(32);
window.crypto.getRandomValues(challenge);

let credentialId;
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
    credentialId = newCredentialInfo.rawId;
    let bufferToString = new TextDecoder();
    console.log(
      "ClientDataJSON: ",
      bufferToString.decode(newCredentialInfo.response.clientDataJSON)
    );
    let attestationObject = CBOR.decode(
      newCredentialInfo.response.attestationObject
    );
    console.log("AttestationObject: ", attestationObject);
    let authData = bufferToString.decode(attestationObject.authData);
    console.log("AuthData: ", authData);
    login();
  })
  .catch((error) => {
    console.log("FAIL", error);
  });

function login() {
  var publicKey = {
    challenge: challenge,

    allowCredentials: [{ type: "public-key", id: credentialId }],
  };
  navigator.credentials
    .get({ publicKey: publicKey })
    .then((getAssertionResponse) => {
      alert("SUCCESSFULLY GOT AN ASSERTION! Open your browser console!");
      console.log("SUCCESSFULLY GOT AN ASSERTION!", getAssertionResponse);
    })
    .catch((error) => {
      alert("Open your browser console!");
      console.log("FAIL", error);
    });
}
