import React, { Component } from 'react';
import './App.css';
import Menu from './menu';
import * as MenuAPI from './menuAPI.js';

class App extends Component {
    state = {
        menu: {'menu': []},
    }
    componentDidMount() {
        MenuAPI.getMenu().then((menu) => {
            this.setState({
                menu: menu,
            });
        })
    }
    render() {
        console.log(this.state.menu);
        return (
                <div className='menu-container'>
                    <div className='navbar'>Fetchum</div>
                    <Menu 
                        menu={this.state.menu.menu}
                        editMenu={true}
                        vendor_id={'rg7SuZjxSSSrv6erWCLgxOSWSKw2'}
                    />
                </div>
            );
    }
}

export default App;
