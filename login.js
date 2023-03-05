let newCredentialInfo = JSON.parse(sessionStorage.getItem("newCredentialInfo"));
let credentialId = newCredentialInfo.id;
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
