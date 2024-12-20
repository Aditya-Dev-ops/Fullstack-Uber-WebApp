import mongoose from 'mongoose';

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400 // 24 hours in seconds
    }
});

// Create index on createdAt field for TTL
blacklistTokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 86400 });

const BlacklistToken = mongoose.model('BlacklistToken', blacklistTokenSchema);

export default BlacklistToken;
