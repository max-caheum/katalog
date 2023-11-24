fetch("data.json").then(x => x.json()).then(x => pushKatalog(x));

const katalog = document.querySelector(".katalog .row");

function pushKatalog(data) {
    let card = "";
    for(let i = 0; i < data.length; i++) {
        card += elKatalog(data[i]);
    }
    katalog.innerHTML = card;
    detail();
}

function jenis(data) {
    let card = "";
    for(let i = 0; i < data.length; i++) {
        card += `<p class="card-text">${data[i]}</p>`
    }
    return card;
}

function detail() {
    const Allbtn = document.querySelectorAll(".detail");
    let btn = Array.from(Allbtn);
    btn.map(x => x.addEventListener("click", function() {
        getDataByProduk("data.json", this.dataset.produk, ubahDetailModal);
    }))
}

function elDetail(data) {
    return `
        <li class="list-group-item">${data}</li>
    `
}

function elKatalog(data) {
    return `
    <div class="col-md-3 mt-3">
        <div class="card h-100s">
            <img src="produk/${data.produk.toLowerCase()}.png" class="card-img-top img-thumbnail" alt="...">
            <div class="card-body">
            <h5 class="card-title">${data.produk}</h5>
            <a href="#detail" class="btn btn-primary detail" data-produk="${data.produk}" data-bs-toggle="modal" data-bs-target="#detail">Details</a>
            </div>
        </div>
    </div>
    `
}

function ubahDetailModal(data) {
    const titleProduk = document.querySelector(".modal-title");
        const listDetail = document.querySelector(".list-detail");
        titleProduk.innerHTML = data.produk;
        let card = "";
        data.jenis.forEach(i => card += elDetail(i));
        listDetail.innerHTML = card;
}

function getDataByProduk(file, produk, f) {
    // let data;
    fetch(file).then(x => x.json()).then(x => f(setDataProduk(x, produk)))
    // console.log(data);
}

function setDataProduk(data, produk) {
    let enData;
    for( let i=0; i<data.length; i++) {
        if(data[i].produk === produk) {
          enData = data[i];  
        }
    }
    return enData;
}