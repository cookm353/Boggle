const $tds = $("td");

$("table").on("click", "td", evt => {
    console.log(evt.target)
})