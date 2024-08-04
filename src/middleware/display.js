document.getElementById("uploadForm").addEventListener("submit", function (event) {
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
        // Tampilkan modal setelah upload berhasil
        const modal = document.getElementById("upload-success-modal");
        const closeModalButton = document.getElementById("close-upload-success-modal");

        modal.style.display = "block";

        closeModalButton.onclick = () => {
          modal.style.display = "none";
        };

        window.onclick = (event) => {
          if (event.target == modal) {
            modal.style.display = "none";
          }
        };

        // Kosongkan input form setelah berhasil upload
        document.getElementById("senderName").value = "";
        document.getElementById("image").value = "";
        loadImages(); // Muat ulang gambar setelah unggahan berhasil
        viewImages(); // Muat ulang gambar setelah unggahan berhasil
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
        img.src = `/api/images/${image.id}`;
        img.alt = image.sender_name;
        img.style.width = "100px";
        img.style.height = "100px";
        tdImg.appendChild(img);

        const tdName = document.createElement("td");
        tdName.textContent = image.sender_name;

        const tdDate = document.createElement("td");
        tdDate.textContent = new Date(image.upload_date).toLocaleString();
        tr.appendChild(tdImg);
        tr.appendChild(tdName);
        tr.appendChild(tdDate);

        if (role === "admin") {
          const tdAction = document.createElement("td");
          const deleteButton = document.createElement("button");
          deleteButton.className = "button small red modal-trigger";
          deleteButton.setAttribute("data-target", "delete-modal");
          deleteButton.type = "button";

          const iconSpan = document.createElement("span");
          iconSpan.className = "icon";
          const icon = document.createElement("i");
          icon.className = "mdi mdi-trash-can";
          iconSpan.appendChild(icon);

          deleteButton.appendChild(iconSpan);

          deleteButton.onclick = () => {
            const modal = document.getElementById("delete-modal");
            const confirmButton = document.getElementById("confirm-delete");
            const cancelButton = document.getElementById("cancel-delete");

            modal.style.display = "block";

            confirmButton.onclick = async () => {
              await fetch(`/api/images/${image.id}`, { method: "DELETE" });
              modal.style.display = "none";
              loadImages(); // Muat ulang gambar setelah menghapus
            };

            cancelButton.onclick = () => {
              modal.style.display = "none";
            };

            window.onclick = (event) => {
              if (event.target == modal) {
                modal.style.display = "none";
              }
            };
          };

          tdAction.appendChild(deleteButton);
          tr.appendChild(tdAction);
        }
        imageTableBody.appendChild(tr);
      });
    })
    .catch((error) => console.error("Error:", error));
}

// Muat gambar saat halaman dimuat
loadImages();

function viewImages() {
  fetch("/api/images")
    .then((response) => response.json())
    .then((images) => {
      if (images.length > 0) {
        const latestImage = images[0]; // Mengambil gambar terbaru (diasumsikan gambar pertama dalam array adalah yang terbaru)
        const imageTableBody = document.getElementById("imageTableBodyView");
        imageTableBody.innerHTML = ""; // Kosongkan tabel

        const tr = document.createElement("tr");

        const tdImg = document.createElement("td");
        const img = document.createElement("img");
        img.src = `/api/images/${latestImage.id}`;
        img.alt = latestImage.sender_name;
        img.style.width = "200px";
        img.style.height = "100px";
        tdImg.appendChild(img);

        const tdName = document.createElement("td");
        tdName.textContent = latestImage.sender_name;

        const tdDate = document.createElement("td");
        tdDate.textContent = new Date(latestImage.upload_date).toLocaleString();
        tr.appendChild(tdImg);
        tr.appendChild(tdName);
        tr.appendChild(tdDate);

        
        imageTableBody.appendChild(tr);
      }
    })
    .catch((error) => console.error("Error:", error));
}

// Muat gambar saat halaman dimuat
viewImages();


let role = "";

async function fetchData() {
  const response = await fetch("/admin/data/user/json");
  if (response.ok) {
    const { username, role: userRole } = await response.json();
    document.getElementById("userDisplay").textContent = `${username}`;
    document.getElementById(
      "roleDisplay"
    ).textContent = `Hallo!! ${userRole}`;
    role = userRole; // Simpan role untuk digunakan di loadImages
    if (role === "admin") {
      var dashboardButton = document.createElement("button");
      dashboardButton.textContent = "Go to Dashboard";
      dashboardButton.onclick = function () {
        window.location.href = "/admin/dashboard";
      };
      document.getElementById("dashboardButton").appendChild(dashboardButton);
    } else {
      document.getElementById("dashboardButton").style.display = "none";
    }
    loadImages(); // Muat gambar setelah mendapatkan data
  } else {
    document.getElementById("roleDisplay").textContent = `Your Visitor`;
    document.getElementById("userDisplay").textContent = ``;
  }
}

fetchData();
