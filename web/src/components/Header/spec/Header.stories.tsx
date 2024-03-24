import React from 'react';
import { Story,Meta } from '@storybook/react/types-6-0';
import {Header,HeaderProp} from '..';

const Template: Story<HeaderProp> = (args:HeaderProp) => <Header {...args} />

export default {
	title: 'components/Header',
	component: Header,
	decorators: [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta<HeaderProp>;

export const Default = Template.bind({});
Default.args = {

}