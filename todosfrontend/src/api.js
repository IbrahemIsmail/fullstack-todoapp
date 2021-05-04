const APIURL = 'https://container2otherport.run-ap-south1.goorm.io/api/todos';

export async function getTodos(){
	return fetch(APIURL, {mode: 'cors'})
	.then(res =>{
		if(!res.ok){
			if(res.status >=400 && res.status <500){
				return res.json().then(d =>{
					let err = {errorMessage: d.message};
					throw err;
				});
			} else {
				let err = {errorMessage: 'Please try again later'};
				throw err;
			}
		}
		return res.json();
	})
}

export async function createTodo(val){
	return fetch(APIURL, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({name: val}),
		mode: 'cors'
	})
	.then(res =>{
		if(!res.ok){
			if(res.status >=400 && res.status <500){
				return res.json().then(d =>{
					let err = {errorMessage: d.message};
					throw err;
				});
			} else {
				let err = {errorMessage: 'Please try again later'};
				throw err;
			}
		}
		return res.json();
	})
}

export async function deleteTodo(id){
	const delURL = `${APIURL}/${id}`;
	return fetch(delURL, {
		method: 'delete',
		mode: 'cors'
	})
	.then(res =>{
		if(!res.ok){
			if(res.status >=400 && res.status <500){
				return res.json().then(d =>{
					let err = {errorMessage: d.message};
					throw err;
				});
			} else {
				let err = {errorMessage: 'Please try again later'};
				throw err;
			}
		}
		return res.json();
	})
}

export async function toggleTodo(id, completed){
	const putURL = `${APIURL}/${id}`;
	return fetch(putURL, {
		method: 'put',
		headers: new Headers({
			'Content-Type': 'application/json'
		}),
		body: JSON.stringify({completed: !completed}),
		mode: 'cors'
	})
	.then(res =>{
		if(!res.ok){
			if(res.status >=400 && res.status <500){
				return res.json().then(d =>{
					let err = {errorMessage: d.message};
					throw err;
				});
			} else {
				let err = {errorMessage: 'Please try again later'};
				throw err;
			}
		}
		return res.json();
	})	
}