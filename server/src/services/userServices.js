import cbor from "cbor";

export const login = async () => {};

export const signup = async (body) => {
  try {
    console.log("🚀 ~ file: userServices.js:6 ~ signup ~ body:", body);
    console.log("body.publicKeyCredential", body.publicKeyCredential);
    const decodeAttestationObj = await cbor.decodeFirst(
      body.publicKeyCredential.response.clientDataJSON,
      (error, obj) => {
        console.log("🚀 ~ file: userServices.js:9 ~ signup ~ obj:", obj);
        return {};
      }
    );
    console.log(
      "🚀 ~ file: userServices.js:8 ~ signup ~ decodeAttestationObj:",
      decodeAttestationObj
    );
  } catch (error) {
    console.log("error", error);
  }
};
