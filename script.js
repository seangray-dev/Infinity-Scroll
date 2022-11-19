const imageContainer = document.querySelector("#image-container");
const loader = document.querySelector("#loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true; 

// Unsplash API
const count = 5; 
const apiKey = 'm6dra-OIX64QleXVKGidy_Cg4UIoI1qsFzLdvEJYbKc'; 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded() {
    imagesLoaded++; 
    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
        initialLoad = false; 
        count = 30; 
    }
};

// Helper function to set Attributes on DOM elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create elements for links and images, Add to DOM
function displayPhotos() {
    imagesLoaded = 0; 
    totalImages = photosArray.length; 
    //Run function for each object in photos array
    photosArray.forEach((photo) => {
        // Create <a> element to link to Unsplash
        const item = document.createElement('a'); 

        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });

        // Create <img> element for images
        const img = document.createElement('img');

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each image is finished loading
        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a> element, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item)
    });
}

// Get photos from Unsplash API

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos()

    } catch (error) {

    }
}

// Check to see if scrolling near bottom of page, if so load more photos
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false; 
        getPhotos();
    }
});

getPhotos(); 