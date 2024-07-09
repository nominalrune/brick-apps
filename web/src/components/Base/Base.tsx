import { FC, useState, useEffect, useReducer, useRef } from 'react';
import { BaseProp } from './propType';
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import { useNavigate } from "react-router-dom";
export const Base: FC<BaseProp> = (props) => {
	const {user}=props;
	// const navigate=useNavigate();
	// useEffect(()=>{
	// 	if(!user){
	// 		navigate("/login",{replace:false})
	// 	}
	// },[user])
	return (
		<>
			<Header user={user} />
			<Outlet />
		</>
	);
};
