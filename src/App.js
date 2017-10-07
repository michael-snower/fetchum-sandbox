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
        return (
                <div>
                    <Menu 
                        menu={this.state.menu.menu}
                    />
                </div>
            );
    }
}

export default App;
