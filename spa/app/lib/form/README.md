# React Structured Form

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Description

Form templating component for React.

## Table of Contents

1. [Description](#description)
1. [Table of Contents](#table-of-contents)
1. [Installation](#installation)
1. [Usage](#usage)
1. [TODOList](#todolist)
1. [License](#license)

## Installation

```sh
npm install react-structured-form -D
```

## Usage

```jsx
import {Form} from 'react-structured-form';

export default function App(){
	<Form
		properties={[{
			type: 'text',
			name: 'contacts-title',
			label: 'Title',
			required: true,
			max: 255,
		}, {
			type: 'group',
			name: 'contacts',
			label: 'Contacts',
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
				},]
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
			}],
		}, {
			type: 'checkbox',
			name: 'terms',
			suffix: 'Accept terms and conditions',
			required: true,
		}] as const}
		primary={{ 
		label: "submit", 
		onClick: (e) => { alert(`data:${JSON.stringify(e)}`); } 
		}}
	/>
};
```

## TODOList

Guidelines for contributing to your project.

## License

This project is licensed under the [MIT License](LICENSE).
