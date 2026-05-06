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
