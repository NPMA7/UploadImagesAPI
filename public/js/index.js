document.getElementById("uploadForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(document.getElementById("uploadForm"));

  const response = await fetch("/images", {
    method: "POST",
    body: formData,
  });

  if (response.status === 201) {
    alert("Image uploaded successfully");
    document.getElementById("uploadForm").reset(); // Reset form
    loadImages(); // Refresh image list
  } else {
    alert("Upload failed");
  }
});

async function loadImages() {
  const response = await fetch('/images');
  const images = await response.json();

  const tableBody = document.getElementById('imageTable').getElementsByTagName('tbody')[0];
  tableBody.innerHTML = ''; // Kosongkan tabel sebelum menambah data baru

  images.forEach(image => {
    const row = tableBody.insertRow();
    const imgCell = row.insertCell(0);
    const senderCell = row.insertCell(1);
    const dateCell = row.insertCell(2);

    // Menampilkan gambar
    const img = document.createElement('img');
    img.src = `/images/${image.id}`;
    img.style.width = '100px'; // Ukuran gambar yang sesuai
    imgCell.appendChild(img);

    // Menampilkan nama pengirim
    senderCell.textContent = image.sender_name;

    // Menampilkan tanggal unggah
    dateCell.textContent = new Date(image.upload_date).toLocaleString();

  })  
}
// Fungsi untuk mendapatkan data peran dari server
async function fetchData() {
  const response = await fetch("/admin/data");
  if (response.ok) {
    const { username, role } = await response.json();
    document.getElementById("userDisplay").textContent = `Hello ${username} `;
    document.getElementById(
      "roleDisplay"
    ).textContent = `You are logged in as ${role} `;
    if (role === 'admin') {
      var dashboardButton = document.createElement('button');
      dashboardButton.textContent = 'Go to Dashboard';
      dashboardButton.onclick = function() {
          window.location.href = '/admin/dashboard';
      };
      document.getElementById('dashboardButton').appendChild(dashboardButton);

    } else {
      document.getElementById("adminDashboard").style = "none";
    }
  } else {
    document.getElementById("roleDisplay").textContent = `Your Visitor`;
    document.getElementById("userDisplay").textContent = ``;
  }
}

fetchData();

// Load images when page loads
window.onload = loadImages;
