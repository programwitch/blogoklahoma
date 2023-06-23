const apiAlerts = "https://api.weather.gov/alerts/active?area=OK";

const getWxAlerts = () => {
    try {
        var html = '';
        $.ajax({
            type: 'GET',
            url: apiAlerts,
            dataType: 'json',
            success: (d) => {
                let alerts = d.features;                
                $(alerts).each((index, item) => {
                    html = `<div class="card mb-4" style="border-color:${alertColor(item.properties.severity)};">`;  
                    html = html + `<div class="card-header text-white  d-flex justify-content-between" style="background-color:${alertColor(item.properties.severity)};">`;
                    html = html + `<div>${item.properties.messageType}: <strong>${item.properties.event}</strong></div><div>(${item.properties.severity})</div></div>`;
                    html = html + `<div class="card-body">`;
                    html = html + `<div class="card-text mb-3 d-flex justify-content-between">`;
                    html = html + `<div>Effective: ${item.properties.effective}</div>`; 
                    html = html + `<div>Expires: ${item.properties.expires}</div>`;
                    html = html + `</div>`;   
					// html = html + `<div class="card-text">${item.properties.description.replace(new RegExp('\n', 'g'), '<br>')}</div>`;
                    html = html + `<div class="card-text">${item.properties.description.replace(new RegExp('\n', 'g'), ' ')}</div>`;                                    
					html = html + `</div>`;
                    html = html + `<div class="card-footer">${item.properties.senderName}</div>`;
                    html = html + `</div>`;
                    $('#wx').append(html);
                });
                
            }, // success
            fail: (err) => {
                console.log(err);
            }
        });
    } catch(err) {
        console.log(err);
    }
}

const alertColor = (severity) => {
    // Extreme, Severe, Moderate, Minor, Unknown
    let color = "#ced4da";
    switch (severity) {
        case 'Extreme':
            color = "#212529";
        case 'Severe':
            color = "#dc3545";
            break;
        case 'Moderate':    
            color = "#fd7e14";
            break;
        case 'Minor':    
            color = "#0dcaf0";
            break;
    }    
    return color 
}

