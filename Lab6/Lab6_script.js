let content = document.getElementById("content");

let messages = JSON.parse(localStorage.getItem("gabeMessages")) || [];

const API_URL = "https://69c7ffd063393440b317571e.mockapi.io/gabe/mail/incoming_messages/gabe_mail";

async function loadSteamGames() {
    content.innerHTML = "<p>Загрузка...</p>";

    let steamGames = [
        { name: "Counter-Strike 2", appid: 730 },
        { name: "Dota 2", appid: 570 },
        { name: "PUBG", appid: 578080 },
        { name: "Apex Legends", appid: 1172470 },
        { name: "GTA V", appid: 271590 }
    ];

    let loaded = false;

    try {
        let results = [];

        for (let i = 0; i < steamGames.length; i++) {
            let game = steamGames[i];
            let steamUrl = "https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=" + game.appid;
            let proxyUrl = "https://api.allorigins.win/get?url=" + encodeURIComponent(steamUrl);

            let response = await fetch(proxyUrl);
            let wrapper = await response.json();
            let data = JSON.parse(wrapper.contents);

            results.push({ name: game.name, ccu: data.response.player_count });
        }

        results.sort((a, b) => b.ccu - a.ccu);

        let html = "<h2>Топ игр Steam</h2>";
        html += "<table border='1'>\n<thead>\n<tr><th>#</th><th>Игра</th><th>Онлайн</th></tr>\n</thead>\n<tbody>";

        for (let i = 0; i < results.length; i++) {
            html += "<tr><td>" + (i + 1) + "</td><td>" + results[i].name + "</td><td>" + results[i].ccu.toLocaleString("ru-RU") + "</td></tr>";
        }

        html += "</tbody>\n</table>";
        content.innerHTML = html;
        loaded = true;

    } catch (error) {
        console.log("Ошибка загрузки из Steam API");
    }

    if (!loaded) {
        try {
            let res = await fetch("games.json");
            let data = await res.json();
            let games = data.games || [];

            games.sort((a, b) => b.ccu - a.ccu);

            let html = "<h2>Топ игр Steam</h2>";
            html += "<table border='1'>\n<thead>\n<tr><th>#</th><th>Игра</th><th>Онлайн</th><th>Пик</th><th>Владельцев</th></tr>\n</thead>\n<tbody>";

            for (let i = 0; i < games.length; i++) {
                let g = games[i];
                html += "<tr><td>" + (i + 1) + "</td><td>" + g.name + "</td><td>" + g.ccu + "</td><td>" + g.peak_ccu + "</td><td>" + g.owners + "</td></tr>";
            }

            html += "</tbody>\n</table>";
            content.innerHTML = html;
        } catch (error) {
            content.innerHTML = "<p>Ошибка загрузки</p>";
        }
    }
}

async function loadRandomDog() {
    content.innerHTML = "<p>Загрузка...</p>";
    try {
        let res = await fetch("https://dog.ceo/api/breeds/image/random");
        let data = await res.json();

        content.innerHTML =
            "<h2>Собака Гейба</h2>" +
            "<img src='" + data.message + "' style='max-width:100%'><br>" +
            "<button onclick='loadRandomDog()'>Ещё собаку</button>";
    } catch (error) {
        content.innerHTML = "<p>Ошибка загрузки</p>";
    }
}

function showAddGameForm() {
    content.innerHTML =
        "<h2>Написать Гейбу</h2>" +
        "<p>Тема: <input id='addName' style='width:100%'></p>" +
        "<p>Текст: <textarea id='addCcu' style='width:100%' rows='5'></textarea></p>" +
        "<button onclick='addGame()'>Отправить</button>" +
        "<button onclick='loadMessages()'>Письма</button>";
}

async function addGame() {
    let name = document.getElementById("addName").value;
    let body = document.getElementById("addCcu").value;
    
    if (!name || !body) {
        content.innerHTML = "<h2>Ошибка</h2><p>Заполните все поля</p>";
        return;
    }
    
    content.innerHTML = "<p>Отправка...</p>";
    
    try {
        let response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: name,
                body: body
            })
        });
        
        if (!response.ok) {
            throw new Error("Ошибка");
        }
        
        let data = await response.json();
        
        content.innerHTML =
            "<h2>Письмо отправлено</h2>" +
            "<p>ID: " + data.id + "</p>" +
            "<button onclick='showAddGameForm()'>Написать ещё</button>" +
            "<button onclick='loadMessages()'>Письма</button>";
            
    } catch (error) {
        content.innerHTML = "<h2>Ошибка</h2><p>Не удалось отправить</p><button onclick='showAddGameForm()'>Назад</button>";
    }
}

async function loadMessages() {
    content.innerHTML = "<p>Загрузка...</p>";
    
    try {
        let response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error("Ошибка");
        }
        
        let messages = await response.json();
        
        if (messages.length === 0) {
            content.innerHTML = "<h2>Писем нет</h2><button onclick='showAddGameForm()'>Написать</button>";
            return;
        }
        
        let html = "<h2>Все письма</h2>";
        html += "<button onclick='showAddGameForm()'>Написать</button>";
        
        for (let msg of messages) {
            html += "<div style='border:1px solid #ccc; margin:10px 0; padding:10px'>";
            html += "<strong>ID:</strong> " + msg.id + "<br>";
            html += "<strong>Тема:</strong> " + msg.title + "<br>";
            html += "<strong>Текст:</strong> " + msg.body + "<br>";
            if (msg.createdAt) {
                html += "<strong>Дата:</strong> " + new Date(msg.createdAt).toLocaleString("ru-RU") + "<br>";
            }
            html += "<button onclick='deleteSingleMessage(\"" + msg.id + "\")'>Удалить</button>";
            html += "</div>";
        }
        
        content.innerHTML = html;
        
    } catch (error) {
        content.innerHTML = "<h2>Ошибка</h2><p>Не удалось загрузить</p><button onclick='loadMessages()'>Повторить</button>";
    }
}

async function deleteSingleMessage(id) {
    if (!confirm("Удалить письмо #" + id + "?")) return;
    
    try {
        let response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });
        
        if (response.ok) {
            loadMessages();
        } else {
            throw new Error("Ошибка");
        }
    } catch (error) {
        alert("Ошибка удаления");
    }
}

function showUpdateGameForm() {
    content.innerHTML =
        "<h2>Редактирование</h2>" +
        "<p>ID: <input id='editId'></p>" +
        "<p>Тема: <input id='editName'></p>" +
        "<p>Текст: <textarea id='editCcu' rows='5'></textarea></p>" +
        "<button onclick='updateGame()'>Изменить</button>" +
        "<button onclick='loadMessages()'>Отмена</button>";
}

async function updateGame() {
    let id = document.getElementById("editId").value;
    let name = document.getElementById("editName").value;
    let body = document.getElementById("editCcu").value;
    
    if (!id || !name || !body) {
        content.innerHTML = "<h2>Ошибка</h2><p>Заполните все поля</p>";
        return;
    }
    
    content.innerHTML = "<p>Обновление...</p>";
    
    try {
        let response = await fetch(API_URL + "/" + id, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title: name,
                body: body
            })
        });
        
        if (!response.ok) {
            throw new Error("Ошибка");
        }
        
        let data = await response.json();
        
        content.innerHTML =
            "<h2>Изменено</h2>" +
            "<p>ID: " + data.id + "</p>" +
            "<button onclick='loadMessages()'>Письма</button>";
            
    } catch (error) {
        content.innerHTML = "<h2>Ошибка</h2><p>Не удалось изменить</p><button onclick='showUpdateGameForm()'>Назад</button>";
    }
}

function showDeleteGameForm() {
    content.innerHTML =
        "<h2>Удаление</h2>" +
        "<p>ID: <input id='deleteId'></p>" +
        "<button onclick='deleteGame()'>Удалить</button>" +
        "<button onclick='loadMessages()'>Отмена</button>";
}

async function deleteGame() {
    let id = document.getElementById("deleteId").value;
    
    if (!id) {
        content.innerHTML = "<h2>Ошибка</h2><p>Введите ID</p>";
        return;
    }
    
    if (!confirm("Удалить письмо #" + id + "?")) return;
    
    content.innerHTML = "<p>Удаление...</p>";
    
    try {
        let response = await fetch(API_URL + "/" + id, {
            method: "DELETE"
        });
        
        if (response.ok) {
            content.innerHTML =
                "<h2>Удалено</h2>" +
                "<p>ID " + id + " удалён</p>" +
                "<button onclick='loadMessages()'>Письма</button>";
        } else {
            throw new Error("Ошибка");
        }
    } catch (error) {
        content.innerHTML = "<h2>Ошибка</h2><p>Не удалось удалить</p><button onclick='showDeleteGameForm()'>Назад</button>";
    }
}