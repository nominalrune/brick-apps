import React from 'react';
import { Story,Meta } from '@storybook/react/types-6-0';
import {LoginModal,LoginModalProp} from '..';

const Template: Story<LoginModalProp> = (args:LoginModalProp) => <LoginModal {...args} />

export default {
	title: 'components/LoginModal',
	component: LoginModal,
	decorators: [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta<LoginModalProp>;

export const Default = Template.bind({});
Default.args = {

}