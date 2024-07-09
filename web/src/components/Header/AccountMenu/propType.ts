import type {IUserData}from "User";
export type AccountMenuProp =
	React.HTMLAttributes<HTMLDivElement>
	& {user: IUserData|null, anchorEl:HTMLElement|null, toggle:()=>void};
