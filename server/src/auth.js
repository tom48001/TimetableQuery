import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import pool from './db.js';

dotenv.config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,  // ✅ Gets from .env
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // ✅ Gets from .env
    callbackURL: process.env.GOOGLE_CALLBACK_URL  // ✅ Ensure it's correct
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let [user] = await pool.query("SELECT * FROM user WHERE google_id = ?", [profile.id]);

        if (user.length === 0) {
            const [result] = await pool.query(
                "INSERT INTO user (google_id, user_name, email, role) VALUES (?, ?, ?, 'teacher')",
                [profile.id, profile.displayName, profile.emails[0].value]
            );
            user = { user_id: result.insertId, google_id: profile.id, user_name: profile.displayName, email: profile.emails[0].value, role: "teacher" };
        }

        return done(null, user);
    } catch (error) {
        return done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
    const [user] = await pool.query("SELECT * FROM user WHERE user_id = ?", [id]);
    done(null, user[0]);
});

export default passport;

