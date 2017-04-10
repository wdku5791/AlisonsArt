export function itemHasErrored (bool) {
  return {
  	type: 'ITEM_HAS_ERRORED',
  	hasErrored: bool
  };
}

export function itemIsLoading(bool){
	return {
		type: 'ITEM_IS_LOADING',
		isLoading: bool
	};
}

export function itemsFetchDataSuccess(items) {
  return {
  	type: 'ITEMS_FETCH_DATA_SUCCESS',
  	items
  };
}
