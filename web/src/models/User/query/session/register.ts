import {backendUrl as _backendUrl} from 'config/backend';
export async function register(userInput:{name:string,email:string,password:string},userSetter:(user:unknown)=>void,navigator:(url:string)=>void,redirectTo="/",backendUrl=_backendUrl) {
		fetch(`http://${backendUrl}/register?name=${userInput.name}&email=${userInput.email}&password=${userInput.password}`, {
			method: "POST",
			mode: 'cors',
			headers: new Headers({
				"Access-Control-Allow-Origin": backendUrl,
				"Cross-Origin-Resource-Policy": "cross-origin",
				"Content-Security-Policy": "cross-origin",
				'Accept': 'application/json',
			}),
			referrerPolicy: 'no-referrer',
			credentials: "include"
		})
		.then(res =>res.json()).then((user)=> {
			console.log({user});
			userSetter(user);
			
			navigator(redirectTo)
		});
	}
