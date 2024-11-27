let listItems = [];
const breedListElement = document.getElementById('breed-list');

async function getDogBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const dogBreeds = Object.keys(data.message);

    dogBreeds.forEach(breed => {
        const listItem = document.createElement('li');
        listItem.textContent = breed;
        listItem.id = breed;
        breedListElement.appendChild(listItem);
    });

    listItems = document.querySelectorAll('#breed-list li');
}

async function getDogPicture(breed){
    try {
        let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
        const data = await response.json();
        return data.message;
    } catch (error) {
        console.error(error);
    }
}

function displayDogPicture(url, liElement){
    const imageItem = document.createElement('img');
    imageItem.src = url;
    liElement.appendChild(imageItem);
}

getDogBreeds();


const searchBarElement = document.getElementById('breed-search');

searchBarElement.addEventListener('input', () => {
    const query = searchBarElement.value.toLowerCase();
    // const listItems = document.querySelectorAll('#breed-list li');

    listItems.forEach(item => {
        if (item.id.includes(query)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    })
})

breedListElement.addEventListener('click', async (event) => {
    let clickedBreed = event.target.id;
    let clickedBreedElement = event.target;

    const existingImage = breedListElement.querySelector('img');
    if (existingImage){
        existingImage.remove();
    }

    const imageUrl = await getDogPicture(clickedBreed);
    displayDogPicture(imageUrl, clickedBreedElement);
})



