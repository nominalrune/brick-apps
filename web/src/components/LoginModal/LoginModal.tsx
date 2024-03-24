import {FC, useState, useEffect, useReducer, useRef} from 'react';
import useStyles from './useStyles';
import {LoginModalProp} from './propType'

export const LoginModal: FC<LoginModalProp> =(props) => {
	const { children, ...attr } = props;
	const styles = useStyles(attr?.style);

	return (
			<div aria-label='loginmodal' className={attr?.className} style={styles.base} >
				{children}
			</div>
	);
};