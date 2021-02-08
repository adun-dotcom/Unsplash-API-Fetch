
const input = document.querySelector('#search')
const form = document.querySelector('#form')
const display1 = document.querySelector('.display1')
const display2 = document.querySelector('.display2')
const display3 = document.querySelector('.display3')
const modalContainer = document.querySelector('.modal-container')
const modalImg = document.querySelector('.modal-content')
const modalText = document.querySelector('.modal-caption')
const closeModal = document.querySelector('#close')

//get data
function getPhotos(query){
    fetch(`https://api.unsplash.com/search/photos/?client_id=m21HoB-1I0YEuvvlFb1qyHbkZUvEYn6Z4Lbi1W7AOBc&query=${query}&per_page=10`)
    .then(res=> res.json())
    .then(data=>{ 
    showGallery(data.results)
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
    if (index % 3 === 1) {
                display1.append(pic)
            }
    else if (index % 2 === 0) {
                display2.append(pic)
            }
    else if (index === 0 || index % 2 === 1) {
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

