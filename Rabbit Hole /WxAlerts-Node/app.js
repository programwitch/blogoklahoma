// Edit config.json for your state and Mastdodon instance
const config = require('./config.json')

const nwsWeb = (loc) => {        
    let nws = config.Wx.regions.filter(item => item.nwsName === loc) 
    if(nws.length < 1) {
        nws = [{
            "nwsName": loc,
            "nwsUrl": "https://www.weather.gov/",
            "note": "Default"
        }]
    }  
    return nws
}

const nwsMsgType = (messageType, event) => {
    let msg = ' '
    switch (messageType) {
    case 'Alert':
        msg = ' issued '
        if(event.substr(0,1) == "A" || event.substr(0,1) == "E" || event.substr(0,1) == "I" || event.substr(0,1) == "O" || event.substr(0,1) == "U") {
            msg += 'an ' 
        } else {
            msg += 'a ' 
        }
        break
    case 'Update':
        msg = ' updated the '
        break
    case 'Cancel':
        msg = ' canceled the '
        break
    }
    return msg
}

const getWxAlerts = async () => {
    let url = config.Wx.apiAlertsArea + config.Wx.state
    if(config.Wx.apiUse == 'zone') {
        url = config.Wx.apiAlertsZone + config.Wx.zone
    }
    fetch(url)
    .then(res => res.json())
    .then(data => showWxAlerts(data))
    .catch(err => console.log('\x1b[31m' + err + '\x1b[0m'))
}

const showWxAlerts = (data) => {
    if(data.title !== 'Not Found') {
        let alerts = data.features;   
        let alertsLen = alerts.length 
        let nwsRegion = {}  
        let t = ''
        let t2 = ''
        let res = {}
        console.log(' ')
        console.log('\x1b[33m' + data.title + '\x1b[0m')
        console.log('\x1b[35m' + 'Updated: ' + (new Date(data.updated)).toLocaleString("en-US", {
            localeMatcher: "best fit",
            timeZoneName: "short"
          }) + '\x1b[0m')
        console.log(' ')
        alerts.forEach((item, index) => {             
            t = config.Mastodon.postLead
            nwsRegion = nwsWeb(item.properties.senderName)         
            t += nwsRegion[0].shortName + nwsMsgType(item.properties.messageType, item.properties.event)         
            t += item.properties.event 
            if(item.properties.messageType == 'alert') {              
                t += ' until ' + (new Date(item.properties.expires)).toLocaleString("en-US", {
                    localeMatcher: "best fit",
                    timeZoneName: "short"
                  })   
            }      
            t += ' for ' + item.properties.areaDesc                
            if(item.properties.parameters.NWSheadline) {
                t += ' [' + item.properties.parameters.NWSheadline + '] '
            }        
            if(t.length > config.Mastodon.postSize) {
                t2 = t.substring(config.Mastodon.postSize - 36)
                t2 = '(cont.) ' + t2 
                t2 += ' ' + nwsRegion[0].nwsUrl
                t = t.substring(0, config.Mastodon.postSize - 36) + ' (cont.)'            
            } else {
                t2 = ''
                t += ' ' + nwsRegion[0].nwsUrl
            }
            
            if(t2 == '') {
                console.log(t)       
                console.log(t.length)
                postMastodon(t)
                    .then( (d) => {
                        console.log("posted")
                    })
            } else {
                console.log('* SPLIT POST')
                console.log(t)       
                console.log(t.length)
                postMastodon(t)
                    .then((d) => {
                        console.log(t2)       
                        console.log(t2.length)
                        postMastodon(t2)
                            .then( (d) => {
                                console.log("2 posted")
                            })
                    })    
            }
                    
            if(index === alertsLen - 1) {
            console.log('\x1b[33mDONE\x1b[0m')
            }
        })
    } else {
        console.log('\x1b[31mNOT FOUND\x1b[0m')
    }
}

const postMastodon = async (post) => {
    fetch(config.Mastodon.url + config.Mastodon.apiPost, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'access_token':  config.Mastodon.token, 'status': post})
      })
      .then(resp => resp.json())
      .then(json => {return Promise.resolve(json)})
      .catch(err => {return Promise.resolve(err)})
}

getWxAlerts()
