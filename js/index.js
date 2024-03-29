const urls = {
    "cloudflare":"https://www.cloudflarestatus.com/api/v2/status.json",
    "discord":"https://discordstatus.com/api/v2/status.json",
    "twitch":"https://status.twitch.com/api/v2/status.json",
    "reddit":"https://www.redditstatus.com/api/v2/status.json",
    "twitter":"https://api.twitterstat.us/api/v2/status.json",
    "patreon":"https://status.patreon.com/api/v2/status.json",
    "linkedin":"https://www.linkedin-status.com/api/v2/status.json",
    
    // "mal":"https://status.myanimelist.net/r/2im0/ecxoe",
}

function xmlRequest(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            element = document.getElementById(id);
            data = JSON.parse(this.responseText);
            document.getElementById(`${id}Desc`).innerText = data["status"]["description"];
            if ("indicator" in data["status"]) {
                element.classList.remove("unresponsive");
                if (data["status"]["indicator"] === "none") {
                    element.classList.add("operational");
                } else {
                    element.classList.add(data["status"]["indicator"])
                }
            }
        }
    }
    xhttp.open("GET", urls[id], true);
    xhttp.send()
}

function load() {
    Array.from(document.getElementsByClassName("item")).forEach(element => {
        document.getElementById(`${element.id}Desc`).innerText = "Unable to reach status API";
        element.addEventListener("click", function(event) {
            window.open(urls[this.id].slice(0, urls[this.id].length-18), 'mywindow');
        })
        xmlRequest(element.id);
    })
}