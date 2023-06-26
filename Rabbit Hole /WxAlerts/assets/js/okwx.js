const apiAlerts = "https://api.weather.gov/alerts/active/area/OK";

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
                    html = html + `<div class="card-header text-white d-flex justify-content-between  align-items-center" style="background-color:${alertColor(item.properties.severity)};">`;
                    html = html + `<div><h5 class="m-0 p-0"><strong>${wxEventIcon(item.properties.event)} ${item.properties.event}</strong></h5></div><div>${item.properties.messageType} (${item.properties.severity})</div></div>`;
                    html = html + `<div class="card-body">`;                   
                    html = html + `<div class="card-text mb-3"><strong><em>${item.properties.headline}</em></strong></div>`;
                    if(item.properties.parameters) {
                        if(item.properties.parameters.NWSheadline) {
                            html = html + `<div class="card-text mb-3"><strong>${item.properties.parameters.NWSheadline}</strong></div>`;
                        }
                    }
                    html = html + `<div class="card-text mb-3"><strong>Area</strong><br>${item.properties.areaDesc}</strong></div>`;
					// html = html + `<div class="card-text">${item.properties.description.replace(new RegExp('\n', 'g'), '<br>')}</div>`;
                    html = html + `<div class="card-text mb-3"><strong>Description</strong><br>${item.properties.description.replace(new RegExp('\n', 'g'), ' ')}</div>`;   
                    if(item.properties.instruction) {
                        html = html + `<div class="card-text mb-3"><strong>Instructions</strong><br>${item.properties.instruction.replace(new RegExp('\n', 'g'), ' ')}</div>`;       
                    }                					
                    html = html + `<div class="card-text text-end"><i class="fa-solid fa-satellite-dish"></i> ${nwsWeb(item.properties.senderName)}</div>`;
                    html = html + `</div>`;
                    $('#wxAlerts').append(html);
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

const nwsWeb = (loc) => {
    var  nwsUrl = '<a href=\"https://www.weather.gov/\" target=\"_blank\">' + loc + '</a>';
    switch (loc) {
        case 'NWS Norman OK':
            nwsUrl = '<a href=\"https://www.weather.gov/oun/\" target=\"_blank\">NWS Norman OK</a> (Covers Western Oklahoma)';
            break;
        case 'NWS Tulsa OK':    
            nwsUrl = '<a href=\"https://www.weather.gov/tsa/\" target=\"_blank\">NWS Tulsa OK</a> (Covers Eastern Oklahoma)';
            break;
        case 'NWS Shreveport LA':
            nwsUrl = '<a href=\"https://www.weather.gov/shv/\" target=\"_blank\">NWS Shreveport LA</a> (Covers Southeastern Oklahoma)';
            break;
        case 'NWS Amarillo TX':
            nwsUrl = '<a href=\"https://www.weather.gov/ama/\" target=\"_blank\">NWS Amarillo TX</a> (Covers Oklahoma Panhandle)';
            break;
    }
    return nwsUrl
}

const wxEventIcon = (event) => {
    var eventIcon = '<i class="fa-solid fa-circle-info"></i>';
    switch (event) {
        case 'Special Weather Statement':
            eventIcon = '<i class="fa-solid fa-circle-info"></i>';
            break;
        case 'Winter Storm Watch':
            eventIcon = '<i class="fa-solid fa-snowflake"></i>';
            break;
        case 'Blizzard Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-snowflake"></i> <i class="fa-solid fa-wind"></i>';
            break;
        case 'Winter Storm Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-snowflake"></i>';
            break;
        case 'Ice Storm Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-temperature-arrow-down"></i> <i class="fa-solid fa-cloud-showers-heavy"></i>';
            break;
        case 'Winter Weather Advisory':
            eventIcon = '<i class="fa-solid fa-snowflake"></i>';
            break;
        case 'Freeze Watch':
            eventIcon = '<i class="fa-solid fa-temperature-arrow-down"></i>';
            break;
        case 'Freeze Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-temperature-arrow-down"></i>';
            break;
        case 'Frost Advisory':
            eventIcon = '<i class="fa-solid fa-temperature-arrow-down"></i>';
            break;
        case 'Wind Chill Advisory':
            eventIcon = '<i class="fa-solid fa-temperature-arrow-down"></i> <i class="fa-solid fa-wind"></i>';
            break;
        case 'Wind Chill Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-temperature-arrow-down"></i> <i class="fa-solid fa-wind"></i>';
            break;
       
        case 'Fire Weather Watch':
            eventIcon = '<i class="fa-solid fa-fire"></i>';
            break;
        case 'Red Flag Warning': 
            eventIcon = '<i class="fa-solid fa-flag text-danger"></i>';
            break;
        
        case 'Dense Fog Advisory':
            eventIcon = '<i class="fa-solid fa-smog"></i>';
            break;
        case 'High Wind Watch':
            eventIcon = '<i class="fa-solid fa-wind"></i>';
            break;
        case 'High Wind Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-wind"></i>';
            break;
        case 'Wind Advisory':
            eventIcon = '<i class="fa-solid fa-wind"></i>';
            break;
        case 'Severe Thunderstorm Watch':
            eventIcon = '<i class="fa-solid fa-cloud-bolt"></i>';
            break;
        case 'Severe Thunderstorm Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-cloud-bolt"></i>';
            break;
        case 'Tornado Watch':
            eventIcon = '<i class="fa-solid fa-tornado"></i>';
            break;
        case 'Tornado Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-tornado"></i>';
            break;
        case 'Extreme Wind Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-wind"></i>';
            break;
        
        case 'Small Craft Advisory':
            eventIcon = '<i class="fa-solid fa-circle-info"></i> <i class="fa-solid fa-sailboat"></i>';
            break;
        case 'Gale Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-ship"></i> <i class="fa-solid fa-wind"></i>';
            break;
        case 'Storm Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-ship"></i> <i class="fa-solid fa-cloud-showers-water"></i>';
            break;
        case 'Hurricane Force Wind Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-ship"></i> <i class="fa-solid fa-hurricane"></i>';
            break;
        case 'Special Marine Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-ship"></i>';
            break;
                
        case 'Coastal Flood Watch':
            eventIcon = '<i class="fa-solid fa-water"></i>';
            break;
        case 'Coastal Flood Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-water"></i>';
            break;
        case 'Coastal Flood Advisory':
            eventIcon = '<i class="fa-solid fa-circle-info"></i> <i class="fa-solid fa-water"></i>';
            break;
        case 'Flash Flood Watch':
            eventIcon = '<i class="fa-solid fa-water"></i>';
            break;
        case 'Flash Flood Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-water"></i>';
            break;
        case 'Flood Advisory':
            eventIcon = '<i class="fa-solid fa-circle-info"></i> <i class="fa-solid fa-water"></i>';
            break;    
        case 'Flood Watch':
            eventIcon = '<i class="fa-solid fa-water"></i>';
            break;
        case 'Flood Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-water"></i>';
            break;
        case 'River Flood Watch':
            eventIcon = '<i class="fa-solid fa-water"></i>';
            break;
        case 'River Flood Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-water"></i>';
            break;
        
        case 'Excessive Heat Watch':
            eventIcon = '<i class="fa-solid fa-temperature-arrow-up"></i>';
            break;
        case 'Excessive Heat Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-temperature-arrow-up"></i>';
            break;
        case 'Heat Advisory':
            eventIcon = '<i class="fa-solid fa-circle-info"></i> <i class="fa-solid fa-temperature-arrow-up"></i>';
            break;
        
        case 'Tropical Storm Watch':
            eventIcon = '<i class="fa-solid fa-cloud-showers-water"></i>';
            break;
        case 'Tropical Storm Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-cloud-showers-water"></i>';
            break;
        case 'Hurricane Watch':
            eventIcon = '<i class="fa-solid fa-hurricane"></i>';
            break;
        case 'Hurricane Warning':
            eventIcon = '<i class="fa-solid fa-triangle-exclamation"></i> <i class="fa-solid fa-hurricane"></i>';
            break;
    }
    return eventIcon
}
