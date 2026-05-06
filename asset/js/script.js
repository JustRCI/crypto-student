// Fungsi ini dipanggil pas tombol "Login" ditekan di HTML lu
async function kirimDataLogin(emailInput, passwordInput) {
    try {
        // 1. Panggil pelayan buat pergi ke loket dapur (Backend lu)
        // Ganti baris fetch lu jadi ini:
const response = await fetch('/api/signin', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: emailInput,
        password: passwordInput
    })
});

        // 3. Baca balasan dari Kepala Koki
        const hasil = await response.json();

        // 4. Cek apakah Kepala Koki bilang error (Ditolak)
        if (!response.ok) {
            alert("Gagal Login: " + hasil.error);
        } else {
            // Kalau sukses, kasih selamat dan pindahin ke halaman Dashboard!
            alert("Mantap: " + hasil.message);
            window.location.href = "dashboard.html"; // Ganti sama nama file dashboard lu
        }
    } catch (err) {
        // Ini kalau server Node.js lu lupa dinyalain
        console.error("Wah, dapurnya tutup bang:", err);
        alert("Server lagi mati, coba lagi nanti!");
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambil semua elemen yang dibutuhin
    const rootElement = document.getElementById('root'); 
    const themeToggle = document.getElementById('theme-toggle');
    const themeLabel = document.getElementById('theme-label');
    
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-btn');

    // 2. LOGIC TEMA DARK/LIGHT
    if (rootElement && themeToggle && themeLabel) {
        
        // A. Cek ingatan pas web di-refresh
        if (localStorage.getItem('theme') === 'dark') {
            rootElement.classList.add('dark');
            themeLabel.classList.add('switched');
            themeToggle.checked = true; // Centang checkboxnya
        }

        // B. Pas label diklik / checkbox berubah
        themeToggle.addEventListener('change', (e) => {
            const isDark = e.target.checked;
            
            if (isDark) {
                rootElement.classList.add('dark');      // Ubah warna web
                themeLabel.classList.add('switched');   // Geser animasi slider
                localStorage.setItem('theme', 'dark');  // Simpen memori
            } else {
                rootElement.classList.remove('dark');
                themeLabel.classList.remove('switched');
                localStorage.setItem('theme', 'light');
            }
        });
    } else {
        console.error("Gagal load fitur tema: Ada ID yang typo di HTML!");
    }

    // 3. LOGIC SIDEBAR MENGECIL (Shrink)
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('shrink');
        });
    }
});
