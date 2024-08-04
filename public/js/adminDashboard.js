// Mengambil data gambar dari server dan menampilkannya
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
      const actionCell = row.insertCell(3);

      // Menampilkan gambar
      const img = document.createElement('img');
      img.src = `/images/${image.id}`;
      img.style.width = '100px'; // Ukuran gambar yang sesuai
      imgCell.appendChild(img);

      // Menampilkan nama pengirim
      senderCell.textContent = image.sender_name;

      // Menampilkan tanggal unggah
      dateCell.textContent = new Date(image.upload_date).toLocaleString();

      // Menambahkan tombol hapus
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = async () => {
        if (confirm('Are you sure you want to delete this image?')) {
          await fetch(`/images/${image.id}`, { method: 'DELETE' });
          row.remove();
        }
      };
      actionCell.appendChild(deleteButton);
    });
  }

  loadImages(); // Muat data gambar saat halaman dimuat