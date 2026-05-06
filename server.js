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
    const { email, password, fullName } = req.body;
    
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: { full_name: fullName }
        }
    });

    if (error) return res.status(400).json({ error: error.message });
    
    res.json({ message: 'Silakan periksa email Anda untuk verifikasi akun.', data });
});

app.post('/api/signin', async (req, res) => {
    const { email, password } = req.body;
    
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) return res.status(400).json({ error: error.message });
    
    res.json({ message: 'Login Berhasil! Welcome back.', data });
});

app.listen(3000, () => {
    console.log('Server Backend lu udah jalan di http://localhost:3000 🔥');
});