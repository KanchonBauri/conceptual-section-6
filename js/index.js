const loadAllPhones = () => {
    console.log("wow 3 second gone");
document.getElementById("spinner").style.display = "none"
}

const handleSearch = () => {
    // console.log("search");
document.getElementById("spinner").style.display = "block "

    setTimeout(function () {
        loadAllPhones()
    }, 2000)
}