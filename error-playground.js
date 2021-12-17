const sum = (a, b) => {
    if(a&&b) {
        return a + b
    }
    throw new Error("Invalid value")
}
// try {
//     let ab = sum(8)
//     console.log(ab)

// } catch(err) {
//     console.log("Loi tu CATCH: ")
//     // console.log("Loi tu CATCH: ", err)
// }
console.log(sum(1))
console.log("THuc thi tiep")
