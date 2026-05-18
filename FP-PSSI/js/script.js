const activeClass =
  "tab-btn px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 bg-unusa-green text-white shadow-md shadow-green-900/20";
const inactiveClass =
  "tab-btn px-6 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 bg-white text-slate-600 border border-slate-200 hover:border-unusa-green hover:text-unusa-green";

async function loadPage(pageName) {
  const contentArea = document.getElementById("content-area");

  // Reset tombol
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.className = inactiveClass;
  });

  // Set tombol aktif
  const activeBtn = document.getElementById("btn-" + pageName);
  if (activeBtn) activeBtn.className = activeClass;

  try {
    // Ambil file HTML
    const response = await fetch(`pages/${pageName}.html`);

    if (!response.ok) {
      throw new Error(
        `Gagal memuat halaman (${response.status}). Pastikan Anda menggunakan Live Server.`,
      );
    }

    const htmlContent = await response.text();

    // Inject konten
    contentArea.innerHTML = htmlContent;
  } catch (error) {
    console.error("Fetch error:", error);
    contentArea.innerHTML = `
            <div class="text-center py-20">
                <p class="text-red-500 font-medium">Error: ${error.message}</p>
                <p class="text-slate-500 mt-2">Anda tidak bisa membuka file ini dengan klik ganda (file:///). Anda harus menggunakan ekstensi "Live Server" di VS Code.</p>
            </div>
        `;
  }
}

// Muat otomatis saat halaman selesai di-render
document.addEventListener("DOMContentLoaded", () => {
  loadPage("business-context");
});
