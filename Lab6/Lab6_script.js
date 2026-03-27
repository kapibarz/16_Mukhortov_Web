let content = document.getElementById("content");

let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");

function saveFavorites() {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

async function loadSteamGames() {
    content.innerHTML = "Загрузка игр";
    try {
        let res = await fetch("games.json");
        let data = await res.json();
        let games = data.games || [];
        games.sort((a,b)=>b.ccu - a.ccu);

        let html = "<h2>Топ игр Steam</h2><table border='1' style='width:100%'><tr><th>#</th><th>Игра</th><th>Онлайн</th><th>Пик</th><th>Владельцев</th></tr>";
        for (let i=0; i<games.length; i++){
            let g = games[i];
            html += "<tr><td>"+(i+1)+"</td><td>"+g.name+"</td><td>"+g.ccu+"</td><td>"+g.peak_ccu+"</td><td>"+g.owners+"</td></tr>";
        }
        html += "</table>";
        content.innerHTML = html;

        showFavorites();
    } catch(e){
        content.innerHTML = "Ошибка: " + e;
    }
}

function showFavorites(){
    if(favorites.length == 0) return;
    let html = "<h3>Избранное</h3><ul>";
    for(let i=0; i<favorites.length; i++){
        let g = favorites[i];
        html += "<li>"+g.name+" - "+g.ccu+" <button onclick='editGame("+g.id+")'>Редактировать</button> <button onclick='deleteGame("+g.id+")'>Удалить</button></li>";
    }
    html += "</ul>";
    content.innerHTML += html;
}

function showAddGameForm(){
    content.innerHTML = `
        <h2>Добавить игру</h2>
        <input id="name" placeholder="Название"><br>
        <input id="ccu" placeholder="Онлайн"><br>
        <button onclick="addGame()">Добавить</button>
        <button onclick="loadSteamGames()">Назад</button>
    `;
}

function addGame(){
    let name = document.getElementById("name").value;
    let ccu = parseInt(document.getElementById("ccu").value) || 0;
    if(!name) { alert("Введите название!"); return; }
    favorites.push({id: Date.now(), name: name, ccu: ccu});
    saveFavorites();
    loadSteamGames();
}

function editGame(id){
    let game = favorites.find(g => g.id == id);
    if(!game) return;
    let newName = prompt("Название?", game.name);
    let newCcu = prompt("Онлайн?", game.ccu);
    if(newName) game.name = newName;
    if(newCcu) game.ccu = parseInt(newCcu);
    saveFavorites();
    loadSteamGames();
}

function deleteGame(id){
    if(confirm("Удалить?")){
        favorites = favorites.filter(g => g.id != id);
        saveFavorites();
        loadSteamGames();
    }
}

async function loadRandomDog(){
    content.innerHTML = "Загрузка";
    try{
        let res = await fetch("https://dog.ceo/api/breeds/image/random");
        let data = await res.json();
        content.innerHTML = "<h2>Собака Гейба</h2><img src='"+data.message+"' style='max-width:100%'><br><button onclick='loadRandomDog()'>Ещё</button>";
    } catch(e){
        content.innerHTML = "Ошибка: "+e;
    }
}