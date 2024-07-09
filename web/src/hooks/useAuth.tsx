import React from 'react';
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryKey,
	UseQueryOptions,
	QueryFunction,
	MutationFunction,
	UseMutationOptions,
} from 'react-query';

import useApi from './useApi';
import { IUserData } from 'models/User';

// export interface ReactQueryAuthConfig<
// 	User,
// 	LoginCredentials,
// 	RegisterCredentials
// > {
// 	userFn: QueryFunction<User, QueryKey>;
// 	loginFn: MutationFunction<User, LoginCredentials>;
// 	registerFn: MutationFunction<User, RegisterCredentials>;
// 	logoutFn: MutationFunction<unknown, unknown>;
// 	userKey?: QueryKey;
// }

export interface AuthProviderProps {
	children: React.ReactNode;
}

export function configureAuth<
	User,
	Error,
	LoginCredentials,
	RegisterCredentials
>() {
	const userKey = ['auth']

	const useUser = (
		options?: Omit<
			UseQueryOptions<User, Error, User, QueryKey>,
			'queryKey' | 'queryFn'
		>
	) => useQuery(userKey, getUser, options);

	const useLogin = (
		options?: Omit<
			UseMutationOptions<User, Error, LoginCredentials>,
			'mutationFn'
		>
	) => {
		const queryClient = useQueryClient();

		const setUser = React.useCallback(
			(data: User) => queryClient.setQueryData(userKey, data),
			[queryClient]
		);

		return useMutation({
			mutationFn: login,
			...options,
			onSuccess: (user, ...rest) => {
				setUser(user);
				options?.onSuccess?.(user, ...rest);
			},
		});
	};

	const useRegister = (
		options?: Omit<
			UseMutationOptions<User, Error, RegisterCredentials>,
			'mutationFn'
		>
	) => {
		const queryClient = useQueryClient();

		const setUser = React.useCallback(
			(data: User) => queryClient.setQueryData(userKey, data),
			[queryClient]
		);

		return useMutation({
			mutationFn: register,
			...options,
			onSuccess: (user, ...rest) => {
				setUser(user);
				options?.onSuccess?.(user, ...rest);
			},
		});
	};

	const useLogout = (options?: UseMutationOptions<unknown, Error, unknown>) => {
		const queryClient = useQueryClient();

		const setUser = React.useCallback(
			(data: User | null) => queryClient.setQueryData(userKey, data),
			[queryClient]
		);

		return useMutation({
			mutationFn: logout,
			...options,
			onSuccess: (...args) => {
				setUser(null);
				options?.onSuccess?.(...args);
			},
		});
	};

	function AuthLoader({
		children,
		renderLoading,
		renderUnauthenticated,
		renderError = (error: Error) => <>{ JSON.stringify(error) } </>,
	}: {
		children: React.ReactNode;
		renderLoading: () => JSX.Element;
		renderUnauthenticated?: () => JSX.Element;
		renderError?: (error: Error) => JSX.Element;
	}) {
		const { isSuccess, isFetched, status, data, error } = useUser();

		if (isSuccess) {
			if (renderUnauthenticated && !data) {
				return renderUnauthenticated();
			}
			return <>{ children } </>;
		}

		if (!isFetched) {
			return renderLoading();
		}

		if (status === 'error') {
			return renderError(error);
		}

		return null;
	}

	return {
		useUser,
		useLogin,
		useRegister,
		useLogout,
		AuthLoader,
	};
}

function getUser(){
	const api = useApi();
	return api<IUserData>('/auth');
}

interface LoginCredentials {
	email: string;
	password: string;
}

function login(credentials: LoginCredentials, signal?: AbortSignal){
	const api = useApi();
	return api('/auth/login','POST', credentials, signal);
}

function logout(){
	const api = useApi();
	return api('/auth/logout');
}

function register(credentials: LoginCredentials){
	const api = useApi();
	return api('/auth/register','POST', credentials);
}
