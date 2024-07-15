import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import NavBar from "~/components/layouts/NavBar";
import type { LinksFunction } from "@remix-run/node";
import stylesheet from "~/index.css?url";

import Contexts from './contexts/Contexts';

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: stylesheet },
];

export function Layout({ children, title }: { children: React.ReactNode; title?: string; }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<Contexts>
					<NavBar />
					<div className="max-w-[95vw] mx-auto my-4">
						{children}
					</div>
				</Contexts>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}

export function HydrateFallback() {
	return <p>Loading...</p>;
}
