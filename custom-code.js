<script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
<style>
	/* Add some basic styling */
	.autocomplete-items {
	  border: 1px solid #d4d4d4;
	  /*  border-bottom: none;
		border-top: none;*/
	  z-index: 9;
	  position: absolute;
	  background-color: #fff;
	  /*   max-height: 230px;*/
	  overflow-y: auto;
	  width: 100%;
	  border-radius: 0 0 10px 10px;
	  border-radius: 10px;
	  overflow: hidden;
	}
	.autocomplete-items:empty {
	  border: none;
	}

	.autocomplete-items div {
	  padding: 5px;
	  cursor: pointer;
	  font-size: 15px;
	  text-align: left;
	  border-bottom: 1px solid #d4d4d4;
	}
	.autocomplete-items div:last-child {
	  border-bottom: none;
	}

	.autocomplete-items div:hover {
	  background-color: #e9e9e9;
	}

	.div-block-13 .w-embed {
	  position: relative;
	}

</style>
<script>
	document.addEventListener('DOMContentLoaded', function () {
		const apiKey = 'EXATHOMES-eaa1-7372-b784-59363f0f0087';
		const apiUrl = 'https://api.realestateapi.com/v2/AutoComplete';
		const addressInput = document.getElementById('Property-Address');
		const autocompleteList = document.getElementById('autocomplete-list');

		addressInput.addEventListener('input', function () {
			const query = this.value;
			if (query.length < 3) {
				autocompleteList.innerHTML = '';
				return;
			}

			// Make the API request using Axios
			axios.post(apiUrl, {
				search: query
			}, {
				headers: {
					'x-api-key': apiKey
				}
			}).then((response) => {
				const results = response.data.data || [];
				autocompleteList.innerHTML = '';
				results.forEach(result => {
					if (result.searchType === 'A') {
						const item = document.createElement('div');
						item.textContent = result.address;
						item.addEventListener('click', function () {
							addressInput.value = result.address;
							autocompleteList.innerHTML = '';
						});
						autocompleteList.appendChild(item);
					}
				});
			}).catch((error) => {
				console.error(error);
			});
		});

		// Close the autocomplete list if the user clicks outside of it
		document.addEventListener('click', function (e) {
			if (!addressInput.contains(e.target)) {
				autocompleteList.innerHTML = '';
			}
		});
	});
</script>
