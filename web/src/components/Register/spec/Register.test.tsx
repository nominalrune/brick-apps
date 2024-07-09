import React from 'react';
import { cleanup, render, fireEvent, waitFor, screen } from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import {Register,RegisterProp} from '..';

// beforeAll(() => { })
// afterEach(()=>{ })
// afterAll(() => { })

describe("basic render test",()=>{
	test('labeled component should be rendered', async () => {
		const args:RegisterProp = {};
		render(<Register {...args} />);
		expect(screen.getByLabelText('register')).toBeDefined();
	})
});
