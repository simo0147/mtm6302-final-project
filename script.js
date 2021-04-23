const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
const monthOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
]
let intervalId
const date = new Date()
let hours = date.getHours()
let minute = date.getMinutes()
let seconds = date.getSeconds()
const currentTime = document.querySelector(".curr_time")
let is24Hour = false
let is12Hour = true
let curr_state = false


const getNewTime = () => {

    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()
    const newformat = hours >= 12 ?  `<font size="10">PM</font>` : '<font size="10">AM</font>'
    
    const greet = document.querySelector(".greet")
    if(hours < 12) {
        greet.innerHTML="good morning"
    }else if(hours < 18) {
        greet.innerHTML="good afternoon"
    }else {
        greet.innerHTML="good evening"
    }

    if (localStorage.getItem("hourClock") === "yes") {
        currentTime.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + " " + newformat
        is12Hour = false;
        is24Hour = true;
    } else {
        const newHour = (hours % 12) || 12
        currentTime.innerHTML = checkTime(newHour) + ":" + checkTime(minutes) + " " + newformat
        is12Hour = true;
        is24Hour = false;
    }

    if (localStorage.getItem("secondClock") === "yes") {
        if (is24Hour) {
            currentTime.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + ":" + checkTime(seconds) + " " + newformat
        } else {
            let newHour = (hours % 12) || 12;
            currentTime.innerHTML = checkTime(newHour) + ":" + checkTime(minutes) + ":" + checkTime(seconds) + " " + newformat
        }
    } else {
        if (is24Hour) {
            currentTime.innerHTML = checkTime(hours) + ":" + checkTime(minutes) + " " + newformat
        } else {
            let newHour = (hours % 12) || 12;
            currentTime.innerHTML = checkTime(newHour) + ":" + checkTime(minutes) + " " + newformat
        }
    }

    if (localStorage.getItem("currDate") === "yes") {
        const month = monthOfYear[date.getMonth()]
        const day = date.getUTCDate()
        const year = date.getFullYear()
        const getFullDate = month + " " + day + ", " + year
        document.querySelector(".curr_date").innerHTML = getFullDate
    } else {
        document.querySelector(".curr_date").innerHTML = ""
    }
}


const hourClock = document.querySelectorAll(".hourclock")
const secondClock = document.querySelectorAll(".seconds")
const currDate = document.querySelectorAll(".date")

document.querySelector(".save").addEventListener("click", () => {
    localStorage.setItem("curr_state", true)
    localStorage.setItem('hourClock', hourClock[0].checked ? "yes" : "no")
    localStorage.setItem("secondClock", secondClock[0].checked ? "yes" : "no")
    localStorage.setItem("currDate", currDate[0].checked ? "yes": "no")
    
    saved()
})

const saved = () => {
    clearInterval(intervalId)
    
    hourClock[0].checked = localStorage.getItem("hourClock") === "yes" ? true: false
    hourClock[1].checked = localStorage.getItem("hourClock") === "no" ? true: false
    
    secondClock[0].checked = localStorage.getItem("secondClock") === "yes" ? true : false
    secondClock[1].checked = localStorage.getItem("secondClock") === "no" ? true : false

    currDate[0].checked = localStorage.getItem("currDate") === "yes" ? true : false
    currDate[1].checked = localStorage.getItem("currDate") === "no" ? true : false
    getNewTime()
    intervalId = setInterval(() => getNewTime(), 500)
}


const getTime = () => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    let newHour = (hours % 12) || 12;
    const newformat = hours >= 12 ?  `<font size="10">PM</font>` : '<font size="10">AM</font>'

    currentTime.innerHTML = checkTime(newHour) + ":" + checkTime(minutes) + " " + newformat 
    const greet = document.querySelector(".greet")
    if(hours < 12) {
        greet.innerHTML="good morning"
    }else if(hours < 18) {
        greet.innerHTML="good afternoon"
    }else {
        greet.innerHTML="good evening"
    }
}


const checkTime = (i) => {
    if (i < 10) { i = "0" + i }
    return i;
}


window.addEventListener('load', async (e) => {
    const imageURL = await fetchImage()
    document.body.style.backgroundImage = `url(${imageURL})`
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundSize = "cover"
    document.body.style.backgroundPosition = "center"
    document.body.style.backgroundAttachment = "fixed"


    if(localStorage.getItem("curr_state",curr_state) === false || localStorage.getItem("curr_state",curr_state) === null) {
        getTime()
        localStorage.setItem('hourClock', hourClock[0].checked ? "yes" : "no")
        localStorage.setItem("secondClock", secondClock[0].checked ? "yes" : "no")
        localStorage.setItem("currDate", currDate[0].checked ? "yes": "no")
    
        intervalId = setInterval(getTime, 500)
    }else {
        saved()
    }
})

document.querySelector(".more_btn").addEventListener('click', () => {
    const moreInfo = document.querySelector(".more_info")
    moreInfo.classList.toggle("change")
    document.querySelector(".setting_morebtn").classList.toggle("change_btn_position")
    const button = document.querySelector(".more_btn")
    const setText = button.textContent === "More" ? "Less" : "More"
    button.textContent = setText
})

document.querySelector(".fas").addEventListener("click", () => {
    hourClock[0].checked = localStorage.getItem("hourClock") === "yes" ? true: false
    hourClock[1].checked = localStorage.getItem("hourClock") === "no" ? true: false
    
    secondClock[0].checked = localStorage.getItem("secondClock") === "yes" ? true : false
    secondClock[1].checked = localStorage.getItem("secondClock") === "no" ? true : false

    currDate[0].checked = localStorage.getItem("currDate") === "yes" ? true : false
    currDate[1].checked = localStorage.getItem("currDate") === "no" ? true : false
    const settings = document.querySelector(".setting_bar")
    settings.classList.toggle("change_settings")
    const main = document.querySelector(".main")
    const x = window.matchMedia("(min-width: 360px)")
    const y = window.matchMedia("(min-width: 320px)")
    const z = window.matchMedia("(max-width: 280px)")
    if (x.matches) {
        main.style.marginLeft = 0
        return
    }
    if (y.matches) {
        main.style.marginLeft = 0
        return
    }
    if (z.matches) {
        main.style.marginLeft = 0
        return
    }
    if (main.style.marginLeft === "12rem") {
        main.style.marginLeft = 0
    } else {
        main.style.marginLeft = "12rem"
    }
})

document.querySelector(".heading").addEventListener("click", () => {
    const settings = document.querySelector(".setting_bar")
    settings.classList.toggle("change_settings")
    const main = document.querySelector(".main")
    if (main.style.marginLeft === "12rem") {
        main.style.marginLeft = 0
    }
})


const oneJan = new Date(date.getFullYear(), 0, 1)
const numberOfDays = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000))
const weekOfYear = Math.ceil((date.getDay() + 1 + numberOfDays) / 7)
document.querySelector(".weekday").innerHTML = dayOfWeek[date.getDay()]
document.querySelector(".monthday").innerHTML = date.getDate()
document.querySelector(".yearday").innerHTML = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
document.querySelector(".weekyear").innerHTML = weekOfYear

const fetchImage = async () => {
    const data = await fetch("https://api.nasa.gov/planetary/apod?api_key=U3X2EZ4NIA8h8nCNWWf3SmtSLx2ELaZGaiyRq6RM")
    const json = await data.json()
    const imageURL = json.hdurl
    return imageURL
}