export class Games {
    constructor(title, thumbnail, short_description, platform, genre) {
        this.title = title
        this.thumbnail = thumbnail
        this.short_description = short_description
        this.platform = platform
        this.genre = genre
    }


    async getGames(categoryName) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'cb68eff159mshc09c97bfd3a1b27p1a8f94jsnea48a846174a',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/games?category=${categoryName}`, options);
            const response = await api.json()
            let box = ''
            for (let i = 0; i < response.length; i++) {
                box += `
                <div class="col-lg-3 col-md-6">
                            <div class='game-info rounded-2 bg-dark text-white' getId="${response[i].id}">
                            <div class="image">
                                <img getId="${response[i].id}" src="${response[i].thumbnail}" alt="" class="w-100 rounded-2">
                            </div>
                            <div class="info p-3" getId="${response[i].id}">
                               <div class="head d-flex justify-content-between align-items-center" getId="${response[i].id}">
                                <h5 getId="${response[i].id}">${response[i].title}</h5>
                                <span getId="${response[i].id}" class='fs-5'>free</span>
                               </div>
                               <p class="text-center" getId="${response[i].id}">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</p>
                               <div class="foot d-flex justify-content-between align-items-center" getId="${response[i].id}">
                                <span getId="${response[i].id}">${response[i].platform}</span>
                                <span getId="${response[i].id}">${response[i].genre}</span>
                               </div>
                            </div>
                            </div>
                        </div>
                `
            }
            document.getElementById('gameOne').innerHTML = box
        } catch (error) {
            console.error(error);
        }
    }

}
export class Details extends Games {
    constructor(title, thumbnail, short_description, platform, genre, description, status, game_url) {
        super(title, thumbnail, short_description, platform, genre)
        this.description = description
        this.status = status
        this.game_url = game_url
    }
    async getDetails(idData) {
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '30907946d1msh67b34aa960c8ffbp19486fjsn129127cab9bf',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };


        try {
            const api = await fetch(`https://free-to-play-games-database.p.rapidapi.com/api/game?id=${idData}`, options);
            const response = await api.json()
            let box = `
        <div class="col-4">
                            <div class="image">
                                <img src="${response.thumbnail}" class="w-100" alt="">
                            </div>
                        </div>
                        <div class="col-8">
                            <h3>Title: ${response.title}</h3>
                            <p>Category: <span class='opt'>${response.genre}</span></p>
                            <p>Platform: <span class='opt'>${response.platform}</span></p>
                            <p>Status: <span class='opt'>Live</span></p>
                            <p>${response.description}</p>
                            <a class="btn btn-danger" href="${response.game_url}" target="_blank">show game</a>
                        </div>
        `
            document.getElementById('gameDetails').innerHTML = box
            let backGround = response.thumbnail.replace('thumbnail', 'background')
            document.querySelector('.parent').style.cssText = `
        background-image: linear-gradient(rgba(0,0,0,.8)50%,rgba(0,0,0,.8)100%),url(${backGround});
        background-size: cover;
        background-position: center center;
        `
        } catch (error) {
            console.error(error);
        }

    }
}