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
    // Ambil file HTML dengan cache-busting ekstrem
    const timestamp = new Date().getTime();
    const response = await fetch(`pages/${pageName}.html?t=${timestamp}`, { cache: 'no-store' });

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
  loadPage("kelompok");
});

// Modal Kelompok Functions
async function loadModal(pageName) {
  let modalContainer = document.getElementById("modal-container");
  
  if (!modalContainer) {
    modalContainer = document.createElement("div");
    modalContainer.id = "modal-container";
    document.body.appendChild(modalContainer);
  }
  
  try {
    const response = await fetch(`pages/${pageName}.html`, { cache: 'no-store' });
    if (!response.ok) throw new Error("Gagal memuat modal");
    
    const htmlContent = await response.text();
    modalContainer.innerHTML = htmlContent;
  } catch (error) {
    console.error("Fetch modal error:", error);
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    setTimeout(() => {
      modal.remove();
    }, 200);
  }
}
