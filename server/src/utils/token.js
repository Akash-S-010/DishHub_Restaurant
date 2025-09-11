import jwt from "jsonwebtoken";

export default function generateToken(id, role = "user") {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const expiresIn = process.env.JWT_EXPIRES_IN || "30d"; 

    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn }
    );
}
