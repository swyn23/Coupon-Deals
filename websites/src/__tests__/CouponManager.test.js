import { CouponManager } from '../script';

describe('CouponManager', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    test('fetchCoupons should handle successful API response', async () => {
        const mockCoupons = [
            { id: 1, code: 'TEST123', store: 'TestStore' }
        ];
        fetch.mockResponseOnce(JSON.stringify(mockCoupons));

        const coupons = await CouponManager.fetchCoupons();
        expect(coupons).toEqual(mockCoupons);
    });

    test('fetchCoupons should handle API errors', async () => {
        fetch.mockRejectOnce(new Error('API Error'));
        
        const coupons = await CouponManager.fetchCoupons();
        expect(coupons).toEqual(CouponManager.getDefaultCoupons());
    });
});