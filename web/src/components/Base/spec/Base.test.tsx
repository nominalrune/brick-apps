import React from 'react';
import { cleanup, render, fireEvent, waitFor, screen } from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import {Base,BaseProp} from '..';

// beforeAll(() => { })
// afterEach(()=>{ })
// afterAll(() => { })

describe("basic render test",()=>{
	test('labeled component should be rendered', async () => {
		const args:BaseProp = {};
		render(<Base {...args} />);
		expect(screen.getByLabelText('base')).toBeDefined();
	})
});
