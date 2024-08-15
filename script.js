const queue = [];
const HAIRCUT_DURATION = 20; // dalam menit
const BARBER_PHONE_NUMBER = '6289652264369'; // Nomor WhatsApp tujuan pesan dalam format internasional

function updateQueueInfo() {
    const queueTableBody = document.querySelector('#queue-table tbody');
    queueTableBody.innerHTML = '';

    queue.forEach((customer, index) => {
        const waitTime = index * HAIRCUT_DURATION;
        const row = `<tr>
                        <td>${index + 1}</td>
                        <td>${customer.name}</td>
                        <td>${waitTime} menit</td>
                    </tr>`;
        queueTableBody.innerHTML += row;
    });
}

function notifyBarber(customer, queueNumber) {
    const message = `Hallo, Saya\nNama pelanggan  : ${customer.name}\nNo.Antrian  : ${queueNumber}\nNo.Wa : ${customer.phone}`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${BARBER_PHONE_NUMBER}?text=${encodedMessage}`;

    // Check if the user is on a mobile device
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Open WhatsApp app on mobile devices
        window.location.href = url;
    } else {
        // Open WhatsApp web on desktop devices
        window.open(url, '_blank');
    }
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    
    const newCustomer = { name, phone };
    const queueNumber = queue.length + 1;

    // Menampilkan pesan WhatsApp kepada pengguna
    notifyBarber(newCustomer, queueNumber);

    // Menambahkan customer ke queue dan memperbarui daftar
    queue.push(newCustomer);
    updateQueueInfo();
    this.reset();
});

document.getElementById('toggle-queue').addEventListener('click', function() {
    const queueTableSection = document.getElementById('queue-table-section');
    queueTableSection.style.display = queueTableSection.style.display === 'none' ? 'block' : 'none';
    this.textContent = queueTableSection.style.display === 'none' ? 'Tampilkan Antrian' : 'Sembunyikan Antrian';
});

document.getElementById('barber-phone').textContent = `+${BARBER_PHONE_NUMBER}`;
