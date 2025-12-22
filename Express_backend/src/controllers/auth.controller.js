import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    const newUser = new User({
      name,
      email,
      password,
      friends: [],
    });

    if (newUser) {
      // generate jwt token here
      generateToken(newUser.email, res);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(user.password === password)) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    generateToken(user.email, res);

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      friends: user.friends || [],
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "none",
      secure: true,
      path: "/", // Ensure path matches
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const tomodachi = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.email;

    // self ko friend banana allow nahi
    if (userId.toString() === friendId) {
      return res
        .status(400)
        .json({ message: "You cannot add yourself as a friend" });
    }

    //  check friend exists
    const friendUser = await User.findOne({ email: friendId });
    if (!friendUser) {
      return res.status(404).json({ message: "User not found" });
    }

    //  logged-in user fetch
    const user = await User.findOne({ email: userId });

    //  already friends
    if (user.friends.includes(friendId)) {
      return res
        .status(400)
        .json({ message: "User is already your tomodachi" });
    }

    //  add friend (mutual)
    user.friends.push(friendId);
    friendUser.friends.push(userId);

    await user.save();
    await friendUser.save();

    res.status(200).json({
      message: "Tomodachi added successfully",
      friends: user.friends,
    });
  } catch (error) {
    console.log("Error in tomodachi controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const removeTomodachi = async (req, res) => {
  try {
    const { friendId } = req.body;
    const userId = req.user.email;

    const friendUser = await User.findOne({ email: friendId });
    if (!friendUser) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await User.findOne({ email: userId });

    if (!user.friends.includes(friendId)) {
      return res.status(400).json({ message: "User is not your friend" });
    }

    user.friends = user.friends.filter((email) => email !== friendId);
    friendUser.friends = friendUser.friends.filter((email) => email !== userId);

    await user.save();
    await friendUser.save();

    res.status(200).json({
      message: "Friend removed successfully",
      friends: user.friends,
    });
  } catch (error) {
    console.log("Error in removeTomodachi controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
