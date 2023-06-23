const xmlAlerts = "https://alerts.weather.gov/cap/ok.php?x=0";

const getWxAlerts = () => {
    fetch(xmlAlerts)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        // console.log(data);
        const entries = data.querySelectorAll("entry");
        entries.forEach(entry => {
            let title = entry.querySelector("title").innerHTML;
            let link = entry.querySelector("link").getAttribute('href');
            let summary = entry.querySelector("summary").innerHTML;            
            console.log(title);
            console.log(link);
            console.log(summary);
            console.log("###");
        });
    })
}


getWxAlerts();