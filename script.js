const items = [{
        title: "Парфюмерная вода",
        description: "ESSENTIAL PARFUMS PARIS fig infusion by nathalie lorson",
        tags: ["woman"],
        price: 277,
        img: "./img/1.png",
        rating: 4.4,
    },
    {
        title: "Одеколон",
        description: "CLINIQUE happy for men cologne spray",
        tags: ["man"],
        price: 224,
        img: "./img/2.png",
        rating: 3.1,
    },
    {
        title: "Туалетная вода",
        description: "VERSACE versense",
        tags: ["woman"],
        price: 109,
        img: "./img/3.png",
        rating: 5.0,
    },
    {
        title: "Парфюмерная вода",
        description: "YVES SAINT LAURENT libre",
        tags: ["woman"],
        price: 533,
        img: "./img/4.png",
        rating: 4.7,
    },
    {
        title: "Духи",
        description: "FRANCK BOCLET cocaine",
        tags: ["man"],
        price: 682,
        img: "./img/5.png",
        rating: 4.9,
    },
    {
        title: "Туалетная вода",
        description: "CAROLINA HERRERA ch men",
        tags: ["man"],
        price: 340,
        img: "./img/6.png",
        rating: 3.2,
    },
    {
        title: "Парфюмерная вода",
        description: "GIORGIO ARMANI my way",
        tags: ["woman"],
        price: 496,
        img: "./img/7.png",
        rating: 2.9,
    },
    {
        title: "Парфюмерная вода",
        description: "HUGO BOSS bottled",
        tags: ["man"],
        price: 533,
        img: "./img/8.png",
        rating: 3.4,
    },
    {
        title: "Парфюмерная вода",
        description: "DOLCE&GABBANA the only one",
        tags: ["woman"],
        price: 424,
        img: "./img/9.png",
        rating: 4.8,
    },
    {
        title: "Духи",
        description: "HERMÈS Terre d'Hermès Perfume",
        tags: ["man"],
        price: 740,
        img: "./img/10.png",
        rating: 3.2,
    },
    {
        title: "Туалетная вода",
        description: "LACOSTE l.12.12 pour lui magnetic",
        tags: ["man"],
        price: 457,
        img: "./img/11.png",
        rating: 3.7,
    },
    {
        title: "Духи",
        description: "TOM FORD black orchid parfum",
        tags: ["woman"],
        price: 818,
        img: "./img/12.png",
        rating: 4.1,
    },
];


let currentState = [...items];

const itemTemplate = document.querySelector('#item-template');
const searchInput = document.querySelector('#search-input');
const nothingFound = document.querySelector('#nothing-found');
const sortSelect = document.querySelector('#sort');
const container = document.querySelector('#shop-items');


sortSelect.addEventListener("change", (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case 'expensive':
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }
        case 'cheap':
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }
        case 'rating':
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }
        case 'alphabet':
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }
    renderItems();
});


const searchButton = document.querySelector('#search-btn');
searchButton.addEventListener('click', search);

searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

renderItems();


function prepareShopItem(title, description, tags, price, img, rating) {
    const shopItem = itemTemplate.content.cloneNode(true);

    shopItem.querySelector('h1').textContent = title;
    shopItem.querySelector('p').textContent = description;
    shopItem.querySelector('img').src = img;
    shopItem.querySelector('.price').textContent = `${price}BYN`;


    const ratingContainer = shopItem.querySelector('.rating');
    const roundedRating = Math.ceil(rating);

    for (let i = 0; i < roundedRating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }


    const tagsHolder = shopItem.querySelector('.tags');

    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
    });


    return shopItem;
};


function filterByTitle(arr, str) {
    const sentence = str.trim().toLowerCase();

    return arr.filter(item => {
        const title = item.title.trim().toLowerCase();

        return title.includes(sentence);
    });
};


function renderItems() {
    container.innerHTML = '';
    nothingFound.textContent = '';

    currentState.forEach((item) => {
        const arrContainer = prepareShopItem(item.title, item.description, item.tags, item.price, item.img, item.rating);
        container.append(arrContainer);
    });

    if (!currentState.length) {
        nothingFound.textContent = 'Ничего не найдено';
    }
};


function search() {
    const input = searchInput.value;
    const filter = filterByTitle(items, input);
    currentState = filter;
    sortSelect.selectedIndex = 0;
    renderItems();
};


function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    if (a.title === b.title) {
        return 0;
    }
};