import React from 'react';
import { Story,Meta } from '@storybook/react/types-6-0';
import {Register,RegisterProp} from '..';

const Template: Story<RegisterProp> = (args:RegisterProp) => <Register {...args} />

export default {
	title: 'components/Register',
	component: Register,
	decorators: [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta<RegisterProp>;

export const Default = Template.bind({});
Default.args = {

}