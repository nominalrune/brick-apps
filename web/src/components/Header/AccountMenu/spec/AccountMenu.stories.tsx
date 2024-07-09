import React from 'react';
import { Story,Meta } from '@storybook/react/types-6-0';
import {AccountMenu,AccountMenuProp} from '..';

const Template: Story<AccountMenuProp> = (args:AccountMenuProp) => <AccountMenu {...args} />

export default {
	title: 'Header/AccountMenu',
	component: AccountMenu,
	decorators: [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta<AccountMenuProp>;

export const Default = Template.bind({});
Default.args = {

}