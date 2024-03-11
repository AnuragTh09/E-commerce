import dotenv from 'dotenv';

dotenv.config({
})

const config = {
    PORT: process.env.PORT || 5000,
    // MONGODB_URL:

    JWT_SECRET: process.env.JWT_SECRET || "teramerajwttoken07",
    JWT_EXPIRY: process.env.JWT_EXPIRY || "30d"
}

export default config