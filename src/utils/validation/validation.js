export const required = value => {
	if (value) return undefined

	return 'Field is required!'
}

export const isQute = value => {
	if (value.includes("'")) return `You use "'" symbol which is prohibited`;

	return undefined
}

export const maxLengthCreator = maxLength => value => {
	if (value.length > maxLength) return `Max length is ${maxLength} symbols`;

	return undefined
}