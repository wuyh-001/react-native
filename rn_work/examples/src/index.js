/**
 * Created by cherrybomb on 2017/11/16.
 */
import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';


import Button_Demo from './components/button/Button_Demo'
import Header_Demo from './components/header/Header_Demo'
import Picker_Demo from './components/picker/Picker_Demo'
import InformationContainer_Demo from './components/informationContainer/InformationContainer_Demo'

import CountDown_Demo from './components/countDown/CountDown_Demo';
import FolderContainer_Demo from './components/folderContainer/FolderContainer_Demo';
import SwipeAction_Demo from './components/swipeAction/SwipeAction_Demo';
import DetailsList_Demo from './components/detailsList/DetailsList_Demo';

storiesOf('Components', module)

    .add('header',()=><Header_Demo/>)
    .add('button', () => <Button_Demo/>)
    .add('picker', () => <Picker_Demo/>)
    .add('informationContainer', ()=><InformationContainer_Demo/>)
    .add('CountDown', ()=><CountDown_Demo/>)
    .add('folderContainer', ()=><FolderContainer_Demo/>)
    .add('swipeAction', ()=><SwipeAction_Demo/>)
    .add('detailsList', ()=><DetailsList_Demo/>)