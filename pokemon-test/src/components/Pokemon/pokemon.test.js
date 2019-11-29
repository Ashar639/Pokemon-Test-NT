import {configure, shallow } from 'enzyme';
import Pokemon from './pokemon';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
configure({adapter: new Adapter()})
describe('<Pokemon/>', ()=>{
    it('should render list of <Pokemon/>',()=> {
        const wrapper = shallow(<Pokemon/>);
        wrapper.setProps({id: 1, title: 'BULBASAUR'});
    })
})