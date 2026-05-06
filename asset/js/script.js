async function kirimDataLogin(emailInput, passwordInput) {
    try {

        const response = await fetch('/api/signin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: emailInput, 
                password: passwordInput 
            })
        });

        const hasil = await response.json();

        if (!response.ok) {
            alert("Gagal Login: " + (hasil.error || "Cek email/password lu!"));
        } else {

            alert("Mantap! Login Berhasil.");

            localStorage.setItem('userSession', JSON.stringify(hasil.data.session));
            
            window.location.replace("/dashboard.html");
        }
    } catch (err) {
        console.error("Dapur Vercel Error:", err);
        alert("Server lagi pusing, coba lagi nanti!");
    }
}

async function kirimDataSignup(emailInput, passwordInput, nameInput) {
    try {
        const response = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                email: emailInput, 
                password: passwordInput,
                fullName: nameInput 
            })
        });

        const hasil = await response.json();

        if (!response.ok) {
            alert("Gagal Daftar: " + (hasil.error || "Data gak valid"));
        } else {
            alert("Berhasil Daftar! " + hasil.message);
            document.getElementById('signup-form').reset();
        }
    } catch (err) {
        console.error("Server Error:", err);
        alert("Gagal konek ke server!");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    
    const signinForm = document.getElementById('signin-form');
    if (signinForm) {
        signinForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const email = document.getElementById('signin-email').value.trim();
            const pass = document.getElementById('signin-password').value.trim();
            kirimDataLogin(email, pass);
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault(); 
            const name = document.getElementById('signup-name').value.trim();
            const email = document.getElementById('signup-email').value.trim();
            const pass = document.getElementById('signup-password').value.trim();
            kirimDataSignup(email, pass, name);
        });
    }

    const rootElement = document.getElementById('root'); 
    const themeToggle = document.getElementById('theme-toggle');

    if (rootElement && themeToggle) {
        if (localStorage.getItem('theme') === 'dark') {
            rootElement.classList.add('dark');
            themeToggle.checked = true;
        }

        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                rootElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                rootElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('shrink');
        });
    }
});