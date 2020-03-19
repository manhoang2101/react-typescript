import React from 'react'
import AppButton from '../src/components/buttons/button.component'

export const Default = () => (
    <AppButton
        color={"default"}
        text="Default"
    >primary
    </AppButton>
);
export const Primary = () => (
    <AppButton
        color={"primary"}
        text="Primary"
    >primary
    </AppButton>
);
export const Inherit = () => (
    <AppButton
        color={"inherit"}
        text="Inherit"
    >primary
    </AppButton>
);
export const Secondary = () => (
    <AppButton
        color={"secondary"}
        text="Secondary"
    >primary
    </AppButton>
);
export default { title: 'Button' }