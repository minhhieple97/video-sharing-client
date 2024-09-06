import { renderHook, act } from '@testing-library/react-hooks';
import { useLogout } from '../hooks/useLogout';
import { removeUserFromStorage } from '../utils/helper';

jest.mock('../hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));

jest.mock('../utils/helper', () => ({
  removeUserFromStorage: jest.fn(),
}));

import { useAuth } from '../hooks/useAuth';

describe('useLogout', () => {
  const mockSetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ setUser: mockSetUser });
  });

  it('should call removeUserFromStorage and setUser(null) when logout is called', () => {
    const { result } = renderHook(() => useLogout());

    act(() => {
      result.current.logout();
    });

    expect(removeUserFromStorage).toHaveBeenCalled();
    expect(mockSetUser).toHaveBeenCalledWith(null);
  });
});
