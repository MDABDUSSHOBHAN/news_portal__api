let fecthData =[];
function fetchCategory(){

    const url=`https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(response => response.json())
    .then(data =>  
     {
      fetchDisplay(data.data)
      fecthData= data.data;


     }
    
    
    
    )
}

const fetchDisplay = (data) => {

console.log(data);
 
// data.news_category.forEach(user =>{

//     categories_containers .innerHTML+=`
    
//     <a href="">${user.data.category_name}</a>
    
    
//     `
  

// })
data.news_category.forEach(element => {
   //  console.log(element);

    const categories_containers1 = document.getElementById('categories_containers');
    categories_containers1.innerHTML+=`
    
     <a  onclick="display('${element.category_id}','${element.category_name}')" href="#">${element.category_name}</a>
    
    `;
    
});






}
const display = (category_id,category_name) =>{
 
    const url= `https://openapi.programming-hero.com/api/news/category/${category_id}`
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => displayMore(data.data,category_name))
}
 function displayMore(data,category_name){

    const counts= document.getElementById('countsCategory');
    const element= document.getElementById('newCounts');
   element.innerText=data.length;
    counts.innerText= category_name ;
    const news= document.getElementById('all_news');
    news.innerHTML='';

   data.forEach( value => {
      // console.log(value._id);
  const newElement= document.createElement('div');
  newElement.innerHTML=`
  
  <div class="card mb-3" >
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${value.image_url}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8 d-flex flex-column">
      <div class="card-body">
        <h5 class="card-title">${value.title}</h5>
        <p class="card-text">${value.details.slice(1, 190)+ '...'}</p>
        
      </div>

      <div class="card-footer border-0 bg-body justify-content-between d-flex">
      <div class="d-flex gap-2">
      <img src="${value.author.img}" class="img-fluid rounded-start rounded-circle" style="width: 40px; height: 40px;" alt="..." >
      <div class="mx-2">
      <p class="m-0 p-0">${value.author.name}</p>
      <p class="m-0 p-0" >${value.author.published_date}</p>
      </div>
      </div>
      <div class="d-flex align-items-center gap-2">
      <i class="fa-solid fa-eye"></i>
      <p class="m-0 p-0 ">${value.total_view}</p>
      </div>
      <div class="d-flex align-items-center">
      <i class="fa-solid fa-star"></i>
      <i class="fa-solid fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      <i class="fa-regular fa-star"></i>
      </div>
      <div class="d-flex align-items-center">
      <button  onclick="newsDetails('${value._id}')" type="button" style="border:none;" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i  class="fa-sharp fa-solid fa-arrow-right fa-lg"></i>
</button>
      </div>


       </div>
    </div>
  </div>
</div>
  
  
  `;
  news.appendChild(newElement);
   console.log(value);
   


   })

    // console.log(data);
 }

function newsDetails(id){
  const url1= `https://openapi.programming-hero.com/api/news/${id}`
  fetch(url1)
  .then(response => response.json())
  .then( data => displaymodal(data.data))


}
function displaymodal(data){
  //  console.log(data[0].image_url);
const modalContent= document.getElementById('modalContent');
modalContent.innerHTML='';

const div= document.createElement('div');

div.innerHTML=`
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content" >
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal ${data[0].author.name}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <img class="img-fluid" src="${data[0].image_url}" alt="">
        <h5>${data[0].title} <span class="badge text-bg-warning">${data[0].others_info.is_trending?'Trending':'Not Trending'}</span> </h5>
        <p>${data[0].details}</p>
       
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          
        </div>
      </div>
    </div>
  </div>

`;
modalContent.appendChild(div);
console.log(data);


}

function trending(){

  displayMore(fecthData, 'Random')
  console.log(fecthData);
}