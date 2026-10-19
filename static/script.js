$(document).ready(function () {

    // Data awal keterampilan
    let dataKeahlian = [
        { id: 1, nama: "HTML", kategori: "web" },
        { id: 2, nama: "CSS", kategori: "web" },
        { id: 3, nama: "Bootstrap", kategori: "web" },
        { id: 4, nama: "JavaScript", kategori: "programming" },
        { id: 5, nama: "Python", kategori: "programming" },
        { id: 6, nama: "Microsoft Office", kategori: "office" }
    ];

    let idBerikutnya = 7;

    // Menampilkan notifikasi
    function tampilkanPesan(pesan, jenis) {
        const kelas = jenis === "sukses"
            ? "pesan-sukses"
            : "pesan-error";

        $("#notification")
            .stop(true, true)
            .hide()
            .removeClass("pesan-sukses pesan-error")
            .addClass(kelas)
            .text(pesan)
            .fadeIn(300)
            .delay(3000)
            .fadeOut(500);
    }

    // Mengubah kategori menjadi teks
    function namaKategori(kategori) {
        const kategoriMap = {
            web: "Web Development",
            programming: "Programming",
            office: "Office"
        };

        return kategoriMap[kategori] || kategori;
    }

    // Menampilkan keterampilan
    function tampilkanData() {
        const tabel = $("#skillTable");
        tabel.empty();

        const kataKunci = $("#searchSkill").val()
            .trim()
            .toLowerCase();

        const kategoriAktif = $("#filterSkill").val();

        const hasilFilter = dataKeahlian.filter(function (item) {
            const cocokNama = item.nama
                .toLowerCase()
                .includes(kataKunci);

            const cocokKategori =
                kategoriAktif === "all" ||
                item.kategori === kategoriAktif;

            return cocokNama && cocokKategori;
        });

        hasilFilter.forEach(function (item, index) {
            const baris = $("<tr>");

            $("<td>").text(index + 1).appendTo(baris);
            $("<td>").text(item.nama).appendTo(baris);
            $("<td>")
                .text(namaKategori(item.kategori))
                .appendTo(baris);

            const tombolHapus = $("<button>")
                .attr("type", "button")
                .addClass("btn btn-danger btn-sm")
                .attr("data-id", item.id)
                .text("Hapus");

            $("<td>")
                .append(tombolHapus)
                .appendTo(baris);

            tabel.append(baris);
        });

        if (hasilFilter.length === 0) {
            const barisKosong = $("<tr>");

            $("<td>")
                .attr("colspan", 4)
                .addClass("text-center")
                .text("Data keterampilan tidak ditemukan.")
                .appendTo(barisKosong);

            tabel.append(barisKosong);
        }
    }

    // Pencarian langsung ketika mengetik
    $("#searchSkill").on("input", function () {
        tampilkanData();
    });

    // Filter kategori
    $("#filterSkill").on("change", function () {
        tampilkanData();
    });

    // Tambah keterampilan
    $("#skillForm").on("submit", function (event) {
        event.preventDefault();

        const nama = $("#skillName").val().trim();
        const kategori = $("#skillCategory").val();

        if (nama === "") {
            tampilkanPesan(
                "Nama keterampilan wajib diisi.",
                "error"
            );
            return;
        }

        const sudahAda = dataKeahlian.some(function (item) {
            return item.nama.toLowerCase() === nama.toLowerCase();
        });

        if (sudahAda) {
            tampilkanPesan(
                "Keterampilan tersebut sudah ada.",
                "error"
            );
            return;
        }

        dataKeahlian.push({
            id: idBerikutnya,
            nama: nama,
            kategori: kategori
        });

        idBerikutnya++;

        this.reset();
        tampilkanData();

        tampilkanPesan(
            "Keterampilan berhasil ditambahkan.",
            "sukses"
        );
    });

    // Hapus keterampilan
    $("#skillTable").on("click", "button[data-id]", function () {
        const id = Number($(this).attr("data-id"));

        dataKeahlian = dataKeahlian.filter(function (item) {
            return item.id !== id;
        });

        tampilkanData();

        tampilkanPesan(
            "Keterampilan berhasil dihapus.",
            "sukses"
        );
    });

    // Ringkasan nilai contoh
    const nilaiMataKuliah = [85, 90, 88];

    const rataRata = nilaiMataKuliah.reduce(
        (total, nilai) => total + nilai,
        0
    ) / nilaiMataKuliah.length;

    $("#averageGrade").text(rataRata.toFixed(2));

    let predikat = "Perlu ditingkatkan";

    if (rataRata >= 85) {
        predikat = "Sangat Baik";
    } else if (rataRata >= 75) {
        predikat = "Baik";
    }

    $("#gradeLevel").text(predikat);

    // Menampilkan data pertama kali
    tampilkanData();

});
