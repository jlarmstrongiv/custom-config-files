require('jest-extended');
jest.spyOn(global.console, 'error').mockImplementation(() => jest.fn());
