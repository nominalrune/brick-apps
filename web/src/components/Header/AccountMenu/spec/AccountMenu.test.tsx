import React from 'react';
import { cleanup, render, fireEvent, waitFor, screen } from '@testing-library/react';
import {renderHook, act} from '@testing-library/react-hooks';
import {AccountMenu,AccountMenuProp} from '..';

// beforeAll(() => { })
// afterEach(()=>{ })
// afterAll(() => { })

describe("basic render test",()=>{
	test('labeled component should be rendered', async () => {
		const args:AccountMenuProp = {};
		render(<AccountMenu {...args} />);
		expect(screen.getByLabelText('accountmenu')).toBeDefined();
	})
});
