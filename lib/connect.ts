/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose from 'mongoose';

const DATABASE_URL = process.env.DATABASE_URL || '';

if (!DATABASE_URL) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    );
}

// @ts-ignore
let cached = global.mongoose;

if (!cached) {
    // @ts-ignore
    cached = global.mongoose = { conn: null, promise: null };
}

async function connect() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(DATABASE_URL).then(mongoose => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connect;
