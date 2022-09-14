const apiData = []

const fetchNews = () => {

    const apiEndpoint = 'https://api.mediehuset.net/sdg/goals';

    // endpoint er den url jeg far data fra
    fetch(apiEndpoint)
    //response er serverns response til mig i fald det lykkes () at nå mit endpoint
    .then((response) => {
        if(response.status == 200) {
            return response.json();
        }
    })

    // data er det json jeg har returneret ud fra mit response
    .then((data) => {
        // console.log(data.articles);
        apiData.push(data.items);
    })
    // catch er hvis mit promise bliver rejected
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        // er når alt foregående er lykkes
        // console.log("awega");

        apiData[0].map((news) => createCards(news));
        
    })

};

const createCards = (data) => {

    document.getElementById("art1").innerHTML += `
    <figure class="card" style="background-color:#${data.color};" > <a href=${data.url} target="_blank"> 
    <div class="icon" >
    ${data.icon}
    </div>
    <article class="container" >
    <h2> <a href=${data.url} target="_blank" > ${data.title} </a> </h2>

    </article>
    </a></figure>
    `
    
}

fetchNews();