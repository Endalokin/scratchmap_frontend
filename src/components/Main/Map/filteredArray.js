export default function filteredArray (array, filterArgument) {
    let newArray = []
    if (array) {
        if (filterArgument == 0) {
            newArray = [...array]
        } else {
            newArray = []
            if (filterArgument.includes("season-winter")) {
                newArray = [...newArray, ...array.filter(me => ["12", "01", "02"].includes(me.date.split("-")[1]))]
            }
            if (filterArgument.includes("season-spring")) {
                newArray = [...newArray, ...array.filter(me => ["03", "04", "05"].includes(me.date.split("-")[1]))]
            }
            if (filterArgument.includes("season-summer")) {
                newArray = [...newArray, ...array.filter(me => ["06", "07", "08"].includes(me.date.split("-")[1]))]
            }
            if (filterArgument.includes("season-autumn")) {
                newArray = [...newArray, ...array.filter(me => ["09", "10", "11"].includes(me.date.split("-")[1]))]
            }
        }
    }
    return newArray
}