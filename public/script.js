document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('sender_name', document.getElementById('senderName').value);
    formData.append('image', document.getElementById('image').files[0]);

    fetch('/api/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Image uploaded successfully');
            loadImages(); // Muat ulang gambar setelah unggahan berhasil
        } else {
            alert('Failed to upload image');
        }
    })
    .catch(error => console.error('Error:', error));
});

function loadImages() {
    fetch('/api/images')
        .then(response => response.json())
        .then(images => {
            const imageList = document.getElementById('imageList');
            imageList.innerHTML = ''; // Kosongkan daftar gambar
            images.forEach(image => {
                const img = document.createElement('img');
                img.src = `/api/image/${image.id}`;
                img.alt = image.sender_name;
                imageList.appendChild(img);
            });
        })
        .catch(error => console.error('Error:', error));
}

// Muat gambar saat halaman dimuat
window.onload = loadImages;
