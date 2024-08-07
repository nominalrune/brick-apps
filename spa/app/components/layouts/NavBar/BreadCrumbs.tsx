import { useLocation, Link } from '@remix-run/react';
import ignoreList from './ignoreList.json';
import { Fragment } from 'react/jsx-runtime';

export default function BreadCrumbs({ url }: { url: string; }) {
	const parts = url.split('/').filter(i => i);
	return parts.length > 0 ? (<nav className='pl-4 py-1 h-6 border-b text-slate-700 flex gap-2'>
		{
			parts.map((part, i) => {
				if (ignoreList.includes(part)) { return <Fragment key={i}>{i !== 0 && ">"}{part}</Fragment>; }
				const path = parts.slice(0, i + 1).join('/');
				return <Fragment key={i}>
					<style>{`.crumb:not(:first)::before{--tw-content:hi;display:inline-block;content:'>';}`}</style>
					<Link to={path} className='crumb before:inline-block' >{part}</Link>
				</Fragment>;
			})
		}
	</nav>) : <></>;
}