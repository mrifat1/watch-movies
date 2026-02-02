// import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import { prisma } from "../config/prisma.ts";
import { generateToken } from "../utils/generateToken.js";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  
  // Check if user already exists
  const userExists = await prisma.user.findUnique({
    where: { email: email },
  });

  if (userExists) {
    return res
      .status(400)
      .json({ error: "User already exists with this email" });
  }

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create User
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // Generate JWT Token
  const token = generateToken(user.id,user.role,res);

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        name: name,
        email: email,
        role: user.role,
      },
      token,
    },
    
  });
  } catch (error) {
    
  }
  
};
const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if user email exists in the table
  const user = await prisma.user.findUnique({
    where: { email: email },
  });

  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  // Generate JWT Token
  const token = generateToken(user.id, user.role, res);
  

  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: user.id,
        email: email,
        role: user.role
      },
      token,
    },
  });
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    const userId = req.user.id; // from auth middleware

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        error: "New password cannot be same as current password",
      });
    }

    // const passwordRegex =
    //   /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    // if (!passwordRegex.test(newPassword)) {
    //   return res.status(400).json({
    //     error:
    //       "Password must be at least 8 characters and include uppercase, number, and special character",
    //   });
    // }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);

    if (!isValid) {
      return res.status(401).json({ error: "Current password is incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const logout = async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};

export {register, login};