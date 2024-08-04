document
  .getElementById("uploadForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("sender_name", document.getElementById("senderName").value);
    formData.append("image", document.getElementById("image").files[0]);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert("Image uploaded successfully");
          loadImages(); // Muat ulang gambar setelah unggahan berhasil
        } else {
          alert("Failed to upload image");
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  function loadImages() {
    fetch("/api/images")
      .then((response) => response.json())
      .then((images) => {
        const imageTableBody = document.getElementById("imageTableBody");
        imageTableBody.innerHTML = ""; // Kosongkan tabel
        images.forEach((image) => {
          const tr = document.createElement("tr");
  
          const tdImg = document.createElement("td");
          const img = document.createElement("img");
          img.src = `/api/image/${image.id}`;
          img.alt = image.sender_name;
          img.style.width = "100px";
          tdImg.appendChild(img);
  
          const tdName = document.createElement("td");
          tdName.textContent = image.sender_name;
  
          const tdDate = document.createElement("td");
          tdDate.textContent = new Date(image.upload_date).toLocaleString();
  
          tr.appendChild(tdImg);
          tr.appendChild(tdName);
          tr.appendChild(tdDate);
  
          // Hanya tambahkan tombol hapus jika role adalah admin
          if (role === "admin") {
            const tdAction = document.createElement("td");
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteImage(image.id);
            tdAction.appendChild(deleteButton);
            tr.appendChild(tdAction);
          }
  
          imageTableBody.appendChild(tr);
        });
      })
      .catch((error) => console.error("Error:", error));
  }
  

// Muat gambar saat halaman dimuat
window.onload = loadImages;


let role = '';

async function fetchData() {
  const response = await fetch("/admin/data");
  if (response.ok) {
    const { username, role: userRole } = await response.json();
    document.getElementById("userDisplay").textContent = `Hello ${username}`;
    document.getElementById("roleDisplay").textContent = `You are logged in as ${userRole}`;
    role = userRole; // Simpan role untuk digunakan di loadImages
    if (role === "admin") {
      var dashboardButton = document.createElement("button");
      dashboardButton.textContent = "Go to Dashboard";
      dashboardButton.onclick = function () {
        window.location.href = "/admin/dashboard";
      };
      document.getElementById("dashboardButton").appendChild(dashboardButton);
      document.getElementById("actionHeader").style.display = "block";
    } else {
      document.getElementById("dashboardButton").style.display = "none";
      document.getElementById("actionHeader").style.display = "none";
    }
    loadImages(); // Muat gambar setelah mendapatkan data
  } else {
    document.getElementById("roleDisplay").textContent = `Your Visitor`;
    document.getElementById("userDisplay").textContent = ``;
  }
}

fetchData();
