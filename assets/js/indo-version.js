const apiData = [];

const getData = () => {

    const endPoint = "https://api.mediehuset.net/sdg/goals";

    fetch(endPoint)
    .then((response) => {

        return response.json();
    })
    .then((data) => {
        // console.log("data", data.items);

        apiData.push(...data.items);
        // console.log("apiData", apiData);
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        apiData.map((card, i) => renderContent(card, i));
    })
}

const renderContent = (card, i) => {
    // console.log("goals", goals.color);

    document.getElementById("sec1").innerHTML += `
    <figure class="card" onclick='getDetail(${card.id})' style='background-color: #${card.color}'>
                <div class="icon">
                    <img src='data:image/svg+xml; utf8, ${card.icon}' alt='icon'>
                </div>
            <article class="container" >
            <h2>${card.title}</h2>
            </article>
    </figure>`;
};

getData();

const getDetail = (id) => {
    let idData = "";
    const endPoint = `https://api.mediehuset.net/sdg/goals/${id}`;

    fetch(endPoint)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        // console.log("data", data.item);
        idData = data.item;
    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        renderDetails(idData);
    })
}

const renderDetails = (detailData) => {
    
    const{byline, description, icon, image, title, color, targets} = detailData;
    
    document.getElementById("sec1").innerHTML = `
    <article class="card-detail" style='background-color: #${color}'>
        <h1>${title}</h1>
        <h2>${byline}</h2>
        <img src='data:image/svg+xml; utf8, ${icon}' alt='icon' class="icons">
        <img src="${image}" alt="image" class="images">
        <p>${description}</p>
        <ul class="targets">${targets.map((target) => renderTargets(target)).join('')}</ul>
    </article>
    `;
}

const renderTargets = (targets) => {
    // console.log("target", targets);
    const {title, description} = targets;
    return `
    <li>
    <h3>${title}</h3>
    <p>${description}</p>
    </li>
    `
}