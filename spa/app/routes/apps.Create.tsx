import { type MouseEvent as ReactMouseEvent, type FormEvent, useRef, useState, ChangeEvent } from 'react';
import useApp from '~/hooks/App/useApp';
import AppEditHeader from '~/components/App/Edit/AppEditHeader';
import AppRepository from '~/repository/App';
import NewApp from '~/model/App/NewApp';
import NewView from '~/model/App/View/NewView';
import Widget from '~/model/App/View/Widget';
import useViewContent from '~/hooks/App/useViewContent';
import Button from '~/components/common/Button/Button';
import Input from '~/components/common/Input/Input';
import Columns from '~/model/App/Columns';
import Column from '~/model/App/Column';
import Modal from '~/components/common/Modal';
import CircleButton from '~/components/common/Button/CircleButton';
import { FiX } from '@react-icons/all-files/fi/FiX';
import EditColumns from '~/components/App/Edit/EditColumns';
import AppEdit from '~/components/App/Edit/AppEdit';

export default function Create() {

	return <>
		<AppEdit app={null} view={null}/>
	</>;
}
