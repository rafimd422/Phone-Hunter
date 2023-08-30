const loadPhone = async (searchText, isShowAll) => {
const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
const data = await res.json()
const dataInside = data.data;
displayPhones(dataInside, isShowAll)

if(searchText === '' && ' '){
  alert("please type a valid name");
  loadingSpinner(false)
}
}

const displayPhones = (info, isShowAll) =>{
const phoneContainer = document.getElementById('phoneContainer')
phoneContainer.textContent = ' ';


const showAllBtn = document.getElementById('showAll');
if(info.length > 10 && !isShowAll){
  showAllBtn.classList.remove('hidden')
} else {
  showAllBtn.classList.add('hidden');
}

let slicedInfo;
if(!isShowAll){
  slicedInfo = info.slice(0,10);
} else {
  slicedInfo = info;
}

slicedInfo.forEach(detail => {
const div = document.createElement('div')
div.classList = `card w-92 bg-base-100 shadow-xl`
div.innerHTML = `
<figure class="px-10 pt-10">
    <img src="${detail.image}" alt="Shoes" class="rounded-xl" />
  </figure>
  <div class="card-body items-center text-center">
    <h2 class="card-title">${detail.brand}</h2>
    <p>${detail.phone_name}</p>
    <h3>$999</h3>
    <div class="card-actions">
    <button onclick="showDetails('${detail.slug}'); spec.showModal()" class="btn btn-outline btn-primary">Show Details</button>
    </div>
  </div>
`
phoneContainer.appendChild(div)
loadingSpinner(false)
});
}
const searchcheak = (isShowAll) => {
  loadingSpinner(true)
const searchField = document.getElementById('searchField')
const searchValue = searchField.value;

loadPhone(searchValue,isShowAll)

}

const loadingSpinner = (isloading) => {
  const spinner = document.getElementById('spinner')
if(isloading){
spinner.classList.remove('hidden')
}else{
spinner.classList.add('hidden')
}
}

// handle show all 
const handleShowAll = () =>{
searchcheak(true)
}

const showDetails = async (id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json()

  
  const modalParent = document.getElementById('show-detail-container')
  modalParent.innerHTML = '';
  const form = document.createElement('form');
  form.setAttribute('method','dialog')
  form.classList.add('modal-box')
  form.innerHTML = `
  <figure class="px-10 pt-10">
  <img src="${data.data.image}" alt="Shoes" class="rounded-xl" />
</figure>
<div class="card-body items-start text-start">
  <h2 class="card-title">${data.data.name}</h2>
  <p><strong>Storage:</strong> ${data.data.mainFeatures.storage}</p>
  <p><strong>Display Size:</strong> ${data.data.mainFeatures.displaySize}</p>
  <p><strong>Chipset:</strong> ${data.data.mainFeatures.chipSet}</p>
  <p><strong>Memory:</strong> ${data.data.mainFeatures.memory}</p>
  <p><strong>Slug:</strong> ${data.data.slug}</p>
  <p><strong>Release Data:</strong> ${data.data.releaseDate}</p>
  <p><strong>Brand:</strong> ${data.data.brand}</p>
  <div class="modal-action">
    <button class="btn">Close</button>
  </div>
</div>
  `
  modalParent.appendChild(form)
console.log(data)
} 