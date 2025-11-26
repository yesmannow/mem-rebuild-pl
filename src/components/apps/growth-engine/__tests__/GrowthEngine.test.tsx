import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import GrowthEngine from '../../GrowthEngine';

describe('GrowthEngine', () => {
  it('renders and allows generating a quote without crashing', async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    const { findByRole } = render(<GrowthEngine />);

    const generateButton = await findByRole('button', { name: /generate quote/i });
    await user.click(generateButton);

    expect(alertSpy).toHaveBeenCalled();
    alertSpy.mockRestore();
  });
});
