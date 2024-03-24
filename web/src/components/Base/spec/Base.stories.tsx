import React from 'react';
import { Story,Meta } from '@storybook/react/types-6-0';
import {Base,BaseProp} from '..';

const Template: Story<BaseProp> = (args:BaseProp) => <Base {...args} />

export default {
	title: 'components/Base',
	component: Base,
	decorators: [(Story) => <div style={{ margin: '3em' }}><Story/></div>]
} as Meta<BaseProp>;

export const Default = Template.bind({});
Default.args = {

}