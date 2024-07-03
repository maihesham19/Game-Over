import { Games, Details } from './display.js'
let allGames = new Games()
let allDetails = new Details()

let links = document.querySelectorAll('.nav-link')
links.forEach(function (e) {
    e.addEventListener('click', function () {
        document.querySelector('.navbar-nav .active').classList.remove('active')
        this.classList.add('active')
        let category = this.getAttribute('data-category')
        mainPage(category)
    })
})

async function mainPage(category = 'mmorpg') {
    let allData = await allGames.getGames(category)
    let all = document.querySelectorAll('.game-info');
    for (let i = 0; i < all.length; i++) {
        all[i].addEventListener('click', function (e) {
            let id = e.target.getAttribute('getId')
            detailsPage(id)
            document.querySelector('.parent').classList.replace('d-none', 'd-block')
        })
    }
    return allData
}


async function detailsPage(id) {
    let details = await allDetails.getDetails(id)
    document.getElementById('close').addEventListener('click', function () {
        document.querySelector('.parent').classList.replace('d-block', 'd-none')
    })
    document.addEventListener('keydown', function (e) {
        if (e.key == 'Escape') {
            document.querySelector('.parent').classList.replace('d-block', 'd-none')
        }
    })
    return details
}

mainPage()

