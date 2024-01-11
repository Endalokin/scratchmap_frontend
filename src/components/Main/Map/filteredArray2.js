export default function filteredArray2 (array, filterArgument = 0) {
    let newArray = []
    console.log(filterArgument)
    if (array) {
        if (filterArgument == 0) {
            newArray = [...array]
            console.log(array)
        } else {
            console.log(array[0])
/*             newArray = []
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
            } */
        }
    }
    return newArray
}