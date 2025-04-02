import { asyncHandler } from "../src/utils/asyncHandler.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import ApiError from "../../../Vidit/src/utils/ApiError.js";

//register user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user)
      throw new ApiError(
        400,
        "User already exists with this email, please login instead"
      );
    user = new User({ name, email, password });
    await user.save();

    //create a jwt payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    //sign and return the token with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;

        // return the user data and token in the response
        res.status(201).json({
          message: "User registered successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error", error);
  }
});

//user login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      throw new ApiError(400, "User not found with this email please register");
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    //create a jwt payload
    const payload = {
      user: {
        id: user._id,
        role: user.role,
      },
    };

    //sign and return the token with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;

        //return the user data and token in the response
        res.json({
          message: "Logged in successfully",
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error", error);
  }
});

//get logged user profile
//this route will be protected
const getUserProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});



export { getUserProfile };
