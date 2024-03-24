import {backendUrl as _backendUrl} from 'config/backend';


export async function login(userInput:{email:string,password:string},userSetter:(user:unknown)=>void,navigator:any,redirectTo="/",backendUrl=_backendUrl) {
		fetch(`http://${backendUrl}/login?email=${userInput.email}&password=${userInput.password}`, {
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
		.then(res =>res.json())
		.then((user)=> {
			console.log({user});
			userSetter(user);
			navigator(redirectTo);
		});
	}
