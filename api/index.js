require('dotenv').config(); 

const express = require('express'); 
const cors = require('cors');       
const { createClient } = require('@supabase/supabase-js'); 

const app = express();

app.use(cors()); 
app.use(express.json()); 

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY; 

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

app.post('/api/signup', async (req, res) => {
    try {
        const { email, password, fullName } = req.body;
        
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: { full_name: fullName }
            }
        });

        if (error) throw error;
        
        res.status(200).json({ 
            message: 'Pendaftaran berhasil! Silakan cek email lu buat verifikasi.', 
            data 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        });

        if (error) throw error;
        
        res.status(200).json({ 
            message: 'Login Berhasil!', 
            data 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = app;

if (process.env.NODE_ENV !== 'production') {
    app.listen(3000, () => console.log('Jalan di local port 3000'));
}