import bcrypt from "bcryptjs"; //to encrypt the password
import jwt from "jsonwebtoken"; //to store the users for some period of time
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body; //in the body we have these email & body which are being deconstructed

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(200).json({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    ); //the hashed password has to be compared using bcrypt
    if (!isPasswordCorrect)
      return res.status(200).json({ message: "Invalid Credentials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.SECRET,
      { expiresIn: "1h" }
    ); //'test' is a secret which should be safe to somehere else like in env process file
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    //if user already exists
    if (existingUser) console.log("user controllerr> signup: line:31 ");
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });
    //if user doesn't exist
    //if password and confirmPassword don't match

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Passwords don't match" });
    const hashPassword = await bcrypt.hash(password, 12); // hashing the password

    const result = await User.create({
      email,
      password: hashPassword,
      name: `${firstName.replace(
        /^./,
        firstName[0].toUpperCase()
      )} ${lastName.replace(/^./, lastName[0].toUpperCase())}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ result: result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
