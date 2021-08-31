import React from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';

import Canary from "../components/Canary";

export default {
    title: 'Example/Canary',
    component: Canary,
} as ComponentMeta<typeof Canary>;

const Template: ComponentStory<typeof Canary> = (args) => <Canary/>;

export const Primary = Template.bind({})