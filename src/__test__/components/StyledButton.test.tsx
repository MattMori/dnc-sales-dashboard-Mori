import { StyledButton } from '@/components/StyledButton'
import { render } from '@testing-library/react'
import { Theme } from '@/types/theme'
import { ThemeProvider } from 'styled-components'
import { themesList } from '@/resources/themesList'

describe('StyledButton', () => {
    const renderComponent = (theme: Theme, className?: string, props = {}) => render(
        <ThemeProvider theme={theme}>
            <StyledButton className={className} {...props} />
        </ThemeProvider>
    )

    themesList.forEach(({ name, theme }) => {
        describe(`${name}`, () => {

            it('should math the snapshot with alert class', () => {
                const { asFragment } = renderComponent(theme, 'alert')
                expect(asFragment()).toMatchSnapshot()
            })

            it('should math the snapshot with primary class', () => {
                const { asFragment } = renderComponent(theme, 'primary')
                expect(asFragment()).toMatchSnapshot()
            })

            it('should math the snapshot with bordeless-alert class', () => {
                const { asFragment } = renderComponent(theme, 'bordeless-alert')
                expect(asFragment()).toMatchSnapshot()
            })
            it('should math the snapshot disable status', () => {
                const { asFragment } = renderComponent(theme, 'primary', { disabled: true })
                expect(asFragment()).toMatchSnapshot()
            })

        })
    })

})