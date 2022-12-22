function format_date(date) {
	return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

module.exports = {
	format_date,
}
