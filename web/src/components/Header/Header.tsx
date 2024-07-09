import { FC, useState, useEffect, useReducer, useRef } from 'react';
import useStyles from './useStyles';
import { HeaderProp } from './propType';

import {Link} from "react-router-dom";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';

import {AccountMenu} from "./AccountMenu";

export const Header: FC<HeaderProp> = (props) => {
	const {user, style}=props;
	const styles = useStyles(style);
	
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const toggle=()=> setAnchorEl(null);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	  };

	return (
		<div aria-label='header' className={props?.className} style={styles.base} >
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position="static">
					<Toolbar>
						<IconButton
							size="large"
							edge="start"
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							account system
						</Typography>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleClick}
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						<AccountMenu anchorEl={anchorEl} toggle={toggle} user={user} />
					</Toolbar>
				</AppBar>
			</Box>

		</div>
	);
};
