$(document).ready(function() {
    var collectionItem = {};
    var collectionItemPrice = {};
    var taxRate = 0.1;

    // Menambahkan item ke keranjang
    // Menambahkan item ke keranjang
$('.card').on('click', function() {
    var productName = $(this).find('.product-name').text();
    var productPriceText = $(this).find(".product-price").text();
    var productPrice = parseFloat(productPriceText.replace('Rp. ', '').replace('.', '').replace(',', ''));
    var productNameKey = productName.replace(/\s+/g, '_').toLowerCase();

    if (!collectionItem[productNameKey]) {
        collectionItem[productNameKey] = 1;
        collectionItemPrice[productNameKey] = productPrice;

        var newElement =
            `<div class="item-in-cart ${sanitizeClassName(productNameKey)}"> 
                <p class="name-food">${productName}</p> 
                <p class="total-price"><span class="right">Rp. ${productPrice.toLocaleString('id-ID')}</span></p>
                <p class="unit-price">Unit price <span class="right">Rp. ${productPrice.toLocaleString('id-ID')}</span></p>
                <p class="quantity">Quantity: <span class="right" id="total-quantity">1</span></p>
                <div class="item-in-troll-image" data-product="${sanitizeClassName(productNameKey)}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" style="fill: rgba(0, 0, 0, 1);">
                        <path d="M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z"></path>
                        <path d="M9 10h2v8H9zm4 0h2v8h-2z"></path>
                    </svg>
                </div>
            </div>`;
        $(newElement).hide().appendTo(".detile-content").slideDown();  // Tambahkan ke .detile-content
    } else {
        collectionItem[productNameKey]++;
        var totalPrice = collectionItem[productNameKey] * collectionItemPrice[productNameKey];
        $(`.${sanitizeClassName(productNameKey)} .quantity span`).text(collectionItem[productNameKey]);
        $(`.${sanitizeClassName(productNameKey)} .total-price span`).text("Rp. " + totalPrice.toLocaleString('id-ID'));
    }
    totalAmount();
});


    // Menghapus item dari keranjang
    $('.detile').on('click', '.item-in-troll-image', function() {
        var productNameKey = $(this).data('product');
        if (collectionItem[productNameKey] > 1) {
            collectionItem[productNameKey]--;
            var totalPrice = collectionItem[productNameKey] * collectionItemPrice[productNameKey];
            $(`.${sanitizeClassName(productNameKey)} .quantity span`).text(collectionItem[productNameKey]);
            $(`.${sanitizeClassName(productNameKey)} .total-price span`).text("Rp. " + totalPrice.toLocaleString('id-ID'));
        } else {
            $(`.${sanitizeClassName(productNameKey)}`).slideUp(function() {
                $(this).remove();
            });
            delete collectionItem[productNameKey];
            delete collectionItemPrice[productNameKey];
        }
        totalAmount();
    });

    // Fungsi untuk membersihkan nama produk agar valid sebagai kelas CSS
    function sanitizeClassName(name) {
        return name.replace(/[^a-zA-Z0-9]/g, '_');
    }

    // Fungsi untuk menghitung total harga
    function totalAmount() {
        var subtotal = Object.values(collectionItem).reduce((acc, quantity, index) => {
            var itemName = Object.keys(collectionItem)[index];
            return acc + quantity * collectionItemPrice[itemName];
        }, 0);

        var tax = subtotal * taxRate;
        var totalAmount = subtotal + tax;

        // Update elemen total amount dan tax
        $('.total p').text("Total Amount: Rp. " + totalAmount.toLocaleString('id-ID'));
        $('.detile-barang p').eq(1).text("Tax: Rp. " + tax.toLocaleString('id-ID'));

        // Tampilkan Rp. 0 jika tidak ada item
        if (subtotal === 0) {
            $('.total p').text("Total Amount: Rp. 0");
            $('.detile-barang p').eq(1).text("Tax: Rp. 0");
        }
    }

    // Pastikan Total Amount selalu ada dan di-inisialisasi ke Rp. 0 di awal
    totalAmount();
});
