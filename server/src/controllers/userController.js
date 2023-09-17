import * as userServices from "../services/userServices.js";

/**
 * Description: User Login Controller
 */
export const login = async (req, res) => {
  const data = await userServices.login(req.body);
  res.status(200).send({ ...data, message: "User Logged-In Successfully" });
};

export const signup = async (req, res) => {
  const data = await userServices.signup(req.body);
  res.status(200).send({ ...data, message: "User Sign up successfully" });
};
