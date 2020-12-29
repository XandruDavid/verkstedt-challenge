import React from 'react';
import { render } from '@testing-library/react';
import { ReposTable } from './ReposTable';
import { act } from 'react-dom/test-utils';

const reposMock: Array<any> = [{
    "id": 319029846,
    "name": "Depix",
    "owner": {
        "login": "beurtschipper"
    },
    "html_url": "https://github.com/beurtschipper/Depix",
    "stargazers_count": 13854,
}];

describe('ReposTable testing', () => {

    test('renders without content', () => {
        const repos: Array<any> = [];
        render(<ReposTable repos={repos} />);
    });

    test('renders with content', () => {
        render(<ReposTable repos={reposMock} />);
    });

    test('toggles save on click', async () => {
        const wrapper = render(<ReposTable repos={reposMock} />);
        const starElement = await wrapper.findByTestId('star');
        const isSelectedBefore: boolean = starElement.classList.contains('selected');
        act(() => {
            starElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        })
        const isSelectedAfter: boolean = starElement.classList.contains('selected');
        expect(isSelectedAfter != isSelectedBefore).toBe(true);
    });

})
