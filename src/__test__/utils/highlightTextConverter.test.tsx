import { highlightTextConverter } from "@/utils";

describe('highlightTextConverter ', () => {

    it('should return the correct text for "alert"', () => {
        expect(highlightTextConverter('alert')).toBe('* Meta longe de ser batida');

    });

    it('should return the correct text for "success"', () => {
        expect(highlightTextConverter('success')).toBe('* A Meta do mês foi batida! Parabéns!');

    });

    it('should return the correct text for "warning"', () => {
        expect(highlightTextConverter('warning')).toBe('* Falta pouco, Vamos lá!');

    });
    it('should return the correct text for unknown input', () => {
        expect(highlightTextConverter('un')).toBe('*Sem dados no momento');

    });


})
