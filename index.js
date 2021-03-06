// DOM ELEMENTS
const input = document.querySelector('#search')
const form = document.querySelector('#form')
const display1 = document.querySelector('.display1')
const display2 = document.querySelector('.display2')
const display3 = document.querySelector('.display3')
const modalContainer = document.querySelector('.modal-container')
const modalImg = document.querySelector('.modal-content')
const modalText = document.querySelector('.modal-caption')
const closeModal = document.querySelector('#close')
const dataLoading = document.querySelector('.loading')
const imageGallery = document.querySelector('.gallery')

//get data
function getPhotos(query){
    dataLoading.style.display = ('block')
    imageGallery.style.display = ('none')
    fetch(`https://api.unsplash.com/search/photos/?client_id=m21HoB-1I0YEuvvlFb1qyHbkZUvEYn6Z4Lbi1W7AOBc&query=${query}&per_page=9`)
    .then(res=> res.json())
    .then(data=>{ 
        if(data.results.length=== 0) {
                let emptySearch = document.createElement("h1")
                emptySearch.innerHTML = `Search Results for "${query}"`
                let emptyExp = document.createElement("h3")
                emptyExp.innerHTML = `Sorry, no items were found matching your search keyword`
                emptySearch.style.width = "800px"
                emptySearch.style.marginBottom = "100px"
                emptyExp.style.paddingLeft = '150px'
                emptyExp.style.width = '900px'
                display1.append(emptySearch);
                display1.append(emptyExp)
                console.log(emptyExp)
            }
    showGallery(data.results)
    })
    .finally(()=>{
        dataLoading.style.display = ('none')
    imageGallery.style.display = ('grid')
    })

    
}

//function to display data to DOM
function showGallery(arr){
    
    //looping through the results
    arr.forEach((image, index)=>{
    const pic = document.createElement('div')
    const imgTag = document.createElement('div')
    const imgText = document.createElement('div')
    imgTag.innerHTML =`<img class='img'
                        src=${image.urls.regular} 
                        alt=${image.alt_description} />`
    imgText.innerHTML =`<h3>${image.user.name} </h3>
                        <p>${image.user.location? image.user.location: ''} <p/>`
                        
    imgText.classList.add('img-text')                      
    pic.appendChild(imgTag)
    pic.appendChild(imgText)

    //condition to separate images to 3 separate divs
    if (index < 3) {
                display1.append(pic)
            }
    else if (index >=3 && index <6) {
                display2.append(pic)
            }
    else if (index >=6 ) {
                display3.append(pic)

                }

    //open modal eventlistener
    imgTag.addEventListener('click',()=>{
        modalContainer.classList.remove('hidden')
        modalImg.src = image.urls.regular
        modalText.innerHTML = `<h3>${image.user.name}</h3>
        <small>${image.user.location? image.user.location: ''}</small>`
        modalImg.style.opacity = ('1')

        
    })

    //close modal eventlistener
    closeModal.addEventListener('click', ()=>{
        modalContainer.classList.add('hidden')
    })
})  
}

    //search and fetch data from API
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        display1.innerHTML = ''
        display2.innerHTML = ''
        display3.innerHTML = ''
        input.placeholder = ''
        getPhotos(input.value);
        input.value = input.value
    });

   //webpage auto query
    window.onload = () => getPhotos('african')

