import { pxToRem } from "@/utils";


describe('pxToRem ', () => {

    it('should correctly convert to pixels to rem for positive value', () => {
        expect(pxToRem(16)).toBe('1rem');
        expect(pxToRem(32)).toBe('2rem');
        expect(pxToRem(8)).toBe('0.5rem');
    });
    it('should correctly convert to 0', () => {
        expect(pxToRem(0)).toBe('0rem');
    });

    it('should correctly convert to pixels to rem for negative value', () => {
        expect(pxToRem(-16)).toBe('-1rem');
        expect(pxToRem(-32)).toBe('-2rem');
        expect(pxToRem(-8)).toBe('-0.5rem');
    });


})
