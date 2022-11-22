//middleware to control the like and delete operation depending on the log in user's rights

import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  //next means do something and move to the next thing
  try {
    const token = req.headers.authorization.split(" ")[1]; //getting the token
    const isCustomAuth = token.length < 500; //if token length is greater than 500 that is google auth

    let decodedData;

    if (token && isCustomAuth) {
      //if custom auth
      decodedData = jwt.verify(token, process.env.SECRET);

      req.userId = decodedData?.id;
    } else {
      //if google auth
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub; //for google auth id is linked with the sub property
    }
    next(); //next the opertion will be to like i.e. redirecting to like controller by adding this middleware on the routes where verifications needed
  } catch (error) {
    console.log(error);
  }
};

export default auth;
