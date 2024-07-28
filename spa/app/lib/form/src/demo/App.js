import { jsx as _jsx } from "react/jsx-runtime";
import Form from '@/Form';
import './app.css';
export default function App() {
	return (_jsx("div", {
		className: "dark",
		children: _jsx(
			Form,
			{
				properties: [{
					type: 'text',
					name: 'name',
					label: 'Name',
					required: true,
				},{
					type: "select",
					name: "select5",
					label: "select",
					options: [['option 1', 'option 1'], ['option 2', 'option 2'], ['option 3', 'option 3']],
				}, {
					type: 'email',
					name: 'email',
					label: 'Email',
					required: true,
				}, {
					type: 'group',
					name: 'contacts2',
					label: 'Contacts',
					direction: "horizontal",
					model: [{
						type: 'iterable-group',
						name: 'friends',
						label: 'Friends',
						model: [{
							type: "text",
							name: "name",
							label: "Name",
							required: true,
						}, {
							type: "email",
							name: "email",
							label: "Email",
							required: true,
						}, {
							type: 'radio',
							name: 'select0',
							label: 'select',
							multiple: false,
							options: [['あいうえお', 'option 1'], ['Option 2', 'option 2'], ['option 3', 'option 3']],
						}, {
							type: 'radio',
							name: 'muliple_select',
							label: 'Multiple select',
							multiple: true,
							options: [['option 1', 'option 1'], ['option 2', 'option 2'], ['option 3', 'option 3']],
						}]
					}, {
						type: 'iterable-group',
						name: "workplace",
						label: "Workplace",
						model: [{
							type: "text",
							name: "name",
							label: "Name",
							required: true,
						}, {
							type: "email",
							name: "email",
							label: "Email",
							required: true,
						},],
					}, {
						type: 'iterable-group',
						name: "community",
						label: "Community",
						model: [{
							type: "text",
							name: "name",
							label: "Name",
							required: true,
						}, {
							type: "email",
							name: "email",
							label: "Email",
							required: true,
						},],
					}, {
						type: 'iterable-group',
						name: "family",
						label: "family",
						model: [{
							type: "text",
							name: "name",
							label: "Name",
							required: true,
						}, {
							type: "email",
							name: "email",
							label: "Email",
							required: true,
						},],
					}],
				}, {
					type: 'iterable-group',
					name: 'others',
					label: 'Others',
					model: [{
						type: "textarea",
						name: "textarea",
						label: "textarea",
					}, {
						type: "group",
						name: "group3",
						label: "group3",
						direction: "horizontal",
						model: [{
							type: "select",
							name: "select1",
							label: "select",
							multiple: true,
							options: [['option 1', 'option 1'], ['option 2', 'option 2'], ['option 3', 'option 3']],
						}, {
							type: "select",
							name: "select2",
							label: "select",
							options: [['option 1', 'option 1'], ['option 2', 'option 2'], ['option 3', 'option 3']],
						}, {
							type: "select",
							name: "select3",
							label: "select",
							options: [['option 1', 'option 1'], ['option 2', 'option 2'], ['option 3', 'option 3']],
						},]
					}, {
						type: 'group',
						name: 'groupA',
						label: 'groupA',
						direction: "vertical",
						model: [{
							type: "date",
							name: "date",
							label: "date",
						}, {
							type: "time",
							name: "time",
							label: "time",
						}, {
							type: "group",
							name: "group5",
							label: "group",
							direction: "horizontal",
							model: [{
								type: "radio",
								name: "radio5",
								label: "radio",
								direction: "horizontal",
								options: [["hi", "hi"], ["bye", "bye"]]
							},]
						},
						]
					},]
				}],
				actions: [{ label: "submit", onClick: (data) => { alert(JSON.stringify(data)); } }]
			})
	}));
}