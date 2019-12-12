const emits = {
	setValue: (obj) => {
		uni.$emit('adds', {
			...obj
		})
	}
}

export default emits;
