export default function filteredArray (array, displaySeasons = 0, displayDaytime = 0) {
    let newArray = []
    let newArray2 = []
    if (array) {
        if (displaySeasons == 0) {
            newArray = [...array]
        } else {
            newArray = []
            if (displaySeasons.includes("season-winter")) {
                newArray = [...newArray, ...array.filter(me => ["12", "01", "02"].includes(me.date.split("-")[1]))]
            }
            if (displaySeasons.includes("season-spring")) {
                newArray = [...newArray, ...array.filter(me => ["03", "04", "05"].includes(me.date.split("-")[1]))]
            }
            if (displaySeasons.includes("season-summer")) {
                newArray = [...newArray, ...array.filter(me => ["06", "07", "08"].includes(me.date.split("-")[1]))]
            }
            if (displaySeasons.includes("season-autumn")) {
                newArray = [...newArray, ...array.filter(me => ["09", "10", "11"].includes(me.date.split("-")[1]))]
            }
        }
        if (displayDaytime == 0) {
            newArray2 = [...newArray]
        } else {
            if (displayDaytime.includes("clock-night")) {
                newArray2 = [...newArray2, ...newArray.filter(me => me.date.split("T")[1].split(":")[0] < 6)]
            }
            if (displayDaytime.includes("clock-morning")) {
                newArray2 = [...newArray2, ...newArray.filter(me =>  6 < me.date.split("T")[1].split(":")[0] && me.date.split("T")[1].split(":")[0] < 12)]
            }
            if (displayDaytime.includes("clock-midday")) {
                newArray2 = [...newArray2, ...newArray.filter(me =>  12 < me.date.split("T")[1].split(":")[0] && me.date.split("T")[1].split(":")[0] < 18)]
            }
            if (displayDaytime.includes("clock-evening")) {
                newArray2 = [...newArray2, ...newArray.filter(me =>  18 < me.date.split("T")[1].split(":")[0])]
            }
        }
    }
    return newArray2
}