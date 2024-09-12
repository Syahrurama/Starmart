$(document).ready(function(){
    $('#searchIcon').on('click', function(){
        $('#searchInput').toggle(); // Menampilkan atau menyembunyikan input pencarian
    });

    $('#searchInput').on('input', function(){
        var search = $(this).val().toLowerCase(); // Mendapatkan nilai input pencarian

        $('.card').each(function() {
            var itemName = $(this).find('.product-name').text().toLowerCase(); // Mengambil nama produk

            if (itemName.includes(search)) {
                $(this).show(); // Menampilkan kartu jika nama produk cocok dengan pencarian
            } else {
                $(this).hide(); // Menyembunyikan kartu jika nama produk tidak cocok dengan pencarian
            }
        });
    });
});
