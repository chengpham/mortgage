export const mapTime = timestamp =>{
    const seconds = Math.floor((new Date() - timestamp) /1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval > 1){ return `${interval} years` }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1){ return `${interval} months` }
    interval = Math.floor(seconds /86400)
    if (interval >1){ return `${interval} days` }
    interval = Math.floor(seconds /3600)
    if (interval >1){ return `${interval} hours` }
    interval=Math.floor(seconds / 60)
    if (interval > 1){ return `${interval} minutes` }
    return `${Math.floor(seconds)} seconds`
}
export const timeAgo = timestamp => {
    const times = [["second", 1], ["minute", 60], ["hour", 3600], ["day", 86400], ["week", 604800], ["month", 2592000], ["year", 31536000]] 
    let diff = Math.round((new Date() - timestamp) / 1000)
    for (let t = 0; t < times.length; t++) { 
        if (diff < times[t][1]) { 
            if(t === 0) { return "Just now" } else { 
             diff = Math.round(diff / times[t - 1][1]); return diff + " " + times[t - 1][0] + (diff === 1?" ago":"s ago") } 
         } 
    } 
}