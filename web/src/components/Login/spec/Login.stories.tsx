import React from 'react';
import { Story,Meta } from '@storybook/react/types-6-0';
import {Login,LoginProp} from '..';

const Template: Story<LoginProp> = (args:LoginProp) => <Login {...args} />

export default {
	title: 'components/Login',
	component: Login,
	decorators: [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta<LoginProp>;

export const Default = Template.bind({});
Default.args = {

}