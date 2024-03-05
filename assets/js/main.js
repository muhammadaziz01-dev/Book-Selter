"use stric"


//----------------------HTML ELEMENTS
const cardWrap = $('.card-wrapper');
const searchInput = $('#search-input');
const resaltBooks = $('#result-books');
const darcBtn = $('#darcmod-btn');
const logo = $('#logo');
const searchIcon =$('.bi-search');


//--------------------GLOBOL VERAEBLIS
let besUrel = 'https://www.googleapis.com/books/v1/volumes?q=harry&startIndex=1';

let classCard = 'card w-[280px]  shadow-lg p-2 rounded-md border';




//----------Funcsiya token bo'lmasa login pajga chiqarvoradi
(function (){
    let token = localStorage.getItem('token');
    if(!token){
      window.location.href = "../../pages/login.html";
    }
}())

function logiOut() {
      localStorage.removeItem('token');
      window.location.href = "../../pages/login.html";
}
//-----------------------------------------------------------



//---------------search book lionk   https://www.googleapis.com/books/v1/volumes?q=computer science&startIndex=0&maxResults=3
//--------respons data ----------------
async function responsDat(url) {
    cardWrap.innerHTML=`<span class="loader"></span>`;
    let respons = await fetch(url);
    let result = await respons.json();
    let data = await  result.items;
    renderData (data)
}
responsDat(besUrel);


//--------------Render card-----------------
function renderData (data){
     cardWrap.innerHTML = "";
     resaltBooks.textContent = `Showing ${data.length} Result(s)`
     data.forEach((el) => {
        let card = render ('div', `${classCard}` , `
        <div class="card-img grid place-content-center p-[5px] h-[200px]">
            <img src="${el.volumeInfo.imageLinks.smallThumbnail}" alt="icon" class ="w-full">
        </div>
        <div class="card__body p-2">
          <h3 class="text-[18px] font-bold mt-[20px]">${el.volumeInfo.title.length > 25 ? el.volumeInfo.title.slice(0,22)+'...': el.volumeInfo.title }</h3>
          <p class="text-[13px] text-gray-500 font-[500]">
            ${el.volumeInfo.authors}
          </p>
          <p class="text-[13px] text-gray-500 font-[500]">${el.volumeInfo.publishedDate}</p>
          <div class="mt-[10px] flex items-center justify-between">
            <button class="bg-yellow-400 font-bold text-[14px] py-2 px-5 rounded-sm">
              Bookmark
            </button>

            <button class="bg-blue-200 text-blue-500 font-bold text-[14px] py-2 px-12 rounded-sm">
              More
            </button>
          </div>
          <button
            class="bg-gray-400 text-white w-full mt-2 py-[5px] rounded-sm"
          >
            Read
          </button>
        </div>
        `);
         cardWrap.appendChild(card);
     });
}
//-----------------------------------------



//--------------SEARCH BOOKS-------
searchInput.addEventListener('keyup', (e)=>{
  if(e.keyCode == 13 && e.target.value.trim().length){
      let bookName = e.target.value;
      serchBook(bookName)
  }
})

async function serchBook(bookName) {
    cardWrap.innerHTML=`<span class="loader"></span>`
    let respons = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${bookName}&startIndex=0&maxResults=3`);
    let result = await respons.json();
    let books = await result.items
    renderData(books);
}
//-----------------------------------------------

console.log(document.body.style);

//--DARC mode----------
darcBtn.addEventListener('click' , ()=>{
    darcBtn.classList.toggle("darc-btn")
    if(darcBtn.classList.contains("darc-btn")){
        darcBtn.innerHTML = `<i class="bi bi-brightness-low-fill text-amber-300 text-[28px]"></i>`
        document.body.style.backgroundColor = `rgb(2, 2, 39)`;
        document.body.style.color = `#FFF`;
        logo.src=`./assets/images/logo.svg`;
        searchIcon.style.color = `#FFF`;

    }else{
        darcBtn.innerHTML = `<i class="bi bi-moon-stars-fill text-amber-300 text-[22px]"></i>`
        document.body.style.backgroundColor = `#FFF`;
        document.body.style.color = `#000`;
        logo.src=`./assets/images/logo2.svg`;
        searchIcon.style.color = `rgba(0,0,0,0.24)`;
    }
})





