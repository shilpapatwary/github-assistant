import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as React from 'react';
import { should } from 'chai';
import sinon from 'sinon';
import {Provider} from 'react-redux';
import { AnyAction, createStore } from 'redux';
import  SlackApp from './SlackApp';
import ChannelList from '../components/ChannelList/ChannelList';
import NewChannel from '../components/NewChannel/NewChannel';
import initialState from '../redux/test/initialState.json';
import { SlackActionTypes } from '../redux/types';

should();
 
Enzyme.configure({ adapter: new Adapter() });

describe('<SlackApp/ >', function() {
    it('should render Channels and Users', function() {
        const reducer = sinon.fake( (currState: any, action: AnyAction) => {
            return currState;
        });
        const state = JSON.parse(JSON.stringify(initialState));
        const store = createStore(reducer, state);
        const wrapper = mount(<Provider store={store}><SlackApp></SlackApp></Provider>);
        reducer.calledTwice.should.be.true;
    });

    it('should dispatch set selected current Channel action', function() {
        const reducer = sinon.fake( (currState: any, action: AnyAction) => {
            let called = 1;
            if(action.type.indexOf('@@redux/INIT') === 0){
                return currState;
            }
            const actions = [];
            actions.push(action.type);
            if(called == 4) actions.should.contain(SlackActionTypes.CHANGE_CURRENTCHANNEL);            //(action.type).should.equal(SlackActionTypes.GET_ALL_CHANNELS);
            called++;
            return currState;
        });
        const state = JSON.parse(JSON.stringify(initialState));
        const store = createStore(reducer, state);
        const wrapper = mount(<Provider store={store}><ChannelList/></Provider>);
        wrapper.find('.channel-name').first().simulate('click');
        reducer.callCount.should.equal(4);
    });
})