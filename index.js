const signup = async (publicKeyCredential) => {
  console.log(
    "🚀 ~ file: index.js:2 ~ signup ~ publicKeyCredential:",
    publicKeyCredential,
    typeof publicKeyCredential
  );
  const bodyData = new formData();
  bodyData.append(
    "authenticatorAttachement",
    JSON.stringify(publicKeyCredential.authenticatorAttachement)
  );
  bodyData.append("id", JSON.stringify(publicKeyCredential.id));
  bodyData.append("rawId", new Blob(publicKeyCredential.rawId));
  bodyData.append(
    "attestationObject",
    new Blob(publicKeyCredential.response.attestationObject)
  );
  bodyData.append(
    "clientDataJSON",
    new Blob(publicKeyCredential.response.clientDataJSON)
  );
  bodyData.append("type", new Blob(publicKeyCredential.response.type));

  const response = await fetch(
    "https://5fe6-2401-4900-563e-7e07-817e-dd0c-a4e5-601c.ngrok-free.app/api/signup",
    {
      method: "POST",
      // mode: "cors",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: bodyData,
    }
  );
  console.log("🚀 ~ file: api.js:8 ~ signup ~ response:", response);
};

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
    signup(newCredentialInfo);
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
    console.log("AuthData: ", parseAuthData(authData));
    sessionStorage.setItem("authData", parseAuthData(authData));
    // login();
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

function parseAuthData(data) {
  // let buffer = new ArrayBuffer(data);
  // console.log(buffer);
  let byteArray = new Uint8Array(data);
  console.log(byteArray);
  let charArray = Array.from(byteArray, (byte) => String.fromCharCode(byte));
  console.log(charArray);
  const binaryString = charArray.join("");
  console.log(binaryString);
  return binaryString;
}
