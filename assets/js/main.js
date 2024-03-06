"use stric"


//----------------------HTML ELEMENTS
const cardWrap = $('.card-wrapper');
const searchInput = $('#search-input');
const resaltBooks = $('#result-books');
const darcBtn = $('#darcmod-btn');
const logo = $('#logo');
const searchIcon =$('.bi-search');
const bookmarcWrap = $(".bookmark-list");
const toogleMenu = $('.toogle-menu');
const toogleTitle = $('#toogl-title');
const toogleMenuBtn = $('#toogl-menu-btn');
const toogleMenuInfo = $('.toogl-menu-info');





//--------------------GLOBOL VERAEBLIS
let besUrl = 'https://www.googleapis.com/books/v1';

let bookmarkList =JSON.parse(localStorage.getItem('bookmark')) ? JSON.parse(localStorage.getItem('bookmark')) : []


let classCard = 'card w-[280px]  shadow-lg p-2 rounded-md border';
let bookmarkListClassName="w-full p-4 rounded-lg mb-3  cursor-pointer   bg-indigo-50 flex items-center gap-2 justify-between";



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
    let respons = await fetch(url+"/volumes?q=harry&startIndex=1");
    let result = await respons.json();
    let data = await  result.items;
    renderData (data)
}
responsDat(besUrl);


//--------------Render card-----------------
function renderData (data){
     cardWrap.innerHTML = "";
     resaltBooks.textContent = `Showing ${data.length} Result(s)`
     data.forEach((el) => {
        let card = render ('div', `${classCard}` , `
        <div class="card-img grid place-content-center p-[5px] h-[200px]">
            <img src="${el.volumeInfo.imageLinks.smallThumbnail}" alt="icon" class ="w-full h-full">
        </div>
        <div class="card__body p-2">
          <div class="h-[100px] overflow-y-hidden">
              <h3 class="text-[18px] font-bold mt-[20px]">${el.volumeInfo.title.length > 25 ? el.volumeInfo.title.slice(0,22)+'...': el.volumeInfo.title }</h3>
              <p class="text-[13px] text-gray-500 font-[500]">${el.volumeInfo.authors}</p>
              <p class="text-[13px] text-gray-500 font-[500]">${el.volumeInfo.publishedDate}</p>
          </div>
          <div class="mt-[10px] flex items-center justify-between">
            <button data-id="${el.id}" class="bg-yellow-400 bookmark font-bold text-[14px] py-2 px-5 rounded-sm">
              Bookmark
            </button>

            <button data-id="${el.id}" class="bg-blue-200 text-blue-500 book-more  font-bold text-[14px] py-2 px-12 rounded-sm">
              More
            </button>
          </div>
          <a href="${el.volumeInfo.previewLink}" class="bg-gray-400 text-white w-full mt-2 py-[5px] block text-center rounded-sm">
            Read
          </a>
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
    let respons = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${bookName}&startIndex=0&maxResults=30`);
    let result = await respons.json();
    let books = await result.items
    renderData(books);
}
//-----------------------------------------------



//---------------Bookmarkka qo'shish ------------
cardWrap.addEventListener("click" , (e)=>{
   if(e.target.classList.contains("bookmark")){
     let id = e.target.dataset.id;
     getDataById(id)
   }
});

async function getDataById(id) {
  try{
    let response = await fetch(`${besUrl}/volumes/${id}`);
    let resalt = await response.json()
    if(bookmarkList.length){
      let duplicate = bookmarkList.map((el)=> el.id);

      if(!duplicate.includes(id)){
         bookmarkList.push(resalt)
         localStorage.setItem("bookmark" , JSON.stringify(bookmarkList));
         renderBookmark()
         // toaster 

      }else{
        // toaster 
      }
    }else{
      bookmarkList.push(resalt);
      renderBookmark()
      // toaster 
    }
  }catch(err){
    console.log(err.masseg);
  }
}
//----------------------------------------------



//---------------Bookmarkka renderlash ------------
function renderBookmark() {
  bookmarcWrap.innerHTML='';
  bookmarkList.forEach((el)=>{
    let cantentLi = render("li", bookmarkListClassName , `
    <p class="flex flex-col">
        <strong class="text-[14px] font-semibold text-black">${el.volumeInfo.title}</strong>
        <span class="text-[13px] font-medium text-[rgba(117,120,129,1)]">${el.volumeInfo.authors}</span>
    </p>
    <span class="flex items-center gap-2">
        <a href="${el.volumeInfo.previewLink}" target="_blanc">
            <i class="bi bi-book text-[rgba(117,130,138,1)]"></i>
        </a>
        <button data-id="${el.id}" class="delete-book">
            <i data-id="${el.id}" class="bi bi-backspace text-red-600 delete-book"></i>
        </button>
    </span>
    `)
    bookmarcWrap.appendChild(cantentLi);
  })
}
renderBookmark()
//-------------------------------------------------




//--------------------Bookmarcdan o'chirish--------
bookmarcWrap.addEventListener("click", (e)=>{
  if(e.target.classList.contains('delete-book')){
    let deletBookId = e.target.dataset.id;
    console.log(deletBookId);
    let bookmarkFilter = bookmarkList.filter((el) => el.id != deletBookId);
    localStorage.setItem("bookmark" , JSON.stringify(bookmarkFilter));
    bookmarkList =JSON.parse(localStorage.getItem('bookmark'));
    renderBookmark()
    // window.location.reload()
  }
})
//-------------------------------------------------







//---------------Toogle menu function----------------------
cardWrap.addEventListener("click", (e)=>{
    if(e.target.classList.contains("book-more")){
      let id = e.target.dataset.id
      toogleMenu.classList.toggle('hide-toogle-menu')
      tooglInfo(id)
    }
})

async function tooglInfo(id) {
  try{
     let response = await fetch(`${besUrl}/volumes/${id}`);
     let result = await response.json()
     toogleMenuInfo.innerHTML=`<span class="loader"></span>`
     renderTooglInfo(result.volumeInfo);
  }catch(err){
     console.log(err.masseg);
  }
}
//-------------------------------------------------



//--Render toogle menu info------------------
function renderTooglInfo(obj) {
  toogleMenuInfo.textContent='';
  toogleTitle.textContent=`${obj.title.length > 35 ? obj.title.slice(0,32)+'...': obj.title }`
  let infoCantent = render('div' , '' , `
  <img src="${obj.imageLinks.thumbnail}" alt="img" class="mx-auto mb-[51px]">
  <p class="px-[40px] mb-[50px] text-[#58667E]">${obj.title}</p>
  <p class="px-[40px] flex items-center gap-4 mb-4">
      <strong  class="text-[#222531]">Author :</strong>
      <span class="text-[#0D75FF] py-[5px] px-5 bg-[rgba(13,117,255,0.09)] rounded-[30px]">${obj.authors}</span>
  </p>
  <p class="px-[40px] flex items-center gap-4 mb-4">
      <strong  class="text-[#222531]">Published : </strong>
      <span class="text-[#0D75FF] py-[5px] px-5 bg-[rgba(13,117,255,0.09)] rounded-[30px]">${obj.publishedDate}</span>
  </p>
  <p class="px-[40px] flex items-center gap-4 mb-4">
      <strong  class="text-[#222531]">Publishers:</strong>
      <span class="text-[#0D75FF] py-[5px] px-5 bg-[rgba(13,117,255,0.09)] rounded-[30px]">${obj.publisher}</span>
  </p>
  <p class="px-[40px] flex items-center gap-4 mb-4">
      <strong  class="text-[#222531]">Categories:</strong>
      <span class="text-[#0D75FF] py-[5px] px-5 bg-[rgba(13,117,255,0.09)] rounded-[30px]">${obj.categories}</span>
  </p>
  <p class="px-[40px] flex items-center gap-4 mb-4">
      <strong  class="text-[#222531]">Pages Count:</strong>
      <span class="text-[#0D75FF] py-[5px] px-5 bg-[rgba(13,117,255,0.09)] rounded-[30px]">${obj.printedPageCount}</span>
  </p>
  <div class="py-4 px-5  flex justify-end mt-[50px]">
      <a href="${obj.previewLink}" class="py-1 px-8 rounded-sm bg-[#75828A] text-white text-center">Read</a>
  </div>
  `)
  toogleMenuInfo.appendChild(infoCantent);
}
//-------------------------------------------


//---------------------Toogle menu btn ---------
toogleMenuBtn.addEventListener('click',()=>{
  toogleMenu.classList.toggle('hide-toogle-menu')
})
////--------------------------
















//--DARC mode---------------------
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
//------------------------------------






