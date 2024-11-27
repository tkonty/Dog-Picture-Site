

async function getDogBreeds() {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const data = await response.json();
    const dogBreeds = data.message;
    console.log(dogBreeds);

    getDogPicture(Object.keys(dogBreeds)[1]);
    
}

async function getDogPicture(breed){
    let response = await fetch(`https://dog.ceo/api/breed/${breed}/images/random`);
    const data = await response.json();
    console.log(data.message);
}

getDogBreeds();