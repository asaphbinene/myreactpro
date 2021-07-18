import React, { Component } from 'react';

export class DoBanner extends Component {

    render = () => 
        <h4 className="bg-primary text-white text-center p-2">
            { this.props.name }'s Do List
            ({ this.props.tasks.filter(t => !t.done).length } items to do)
        </h4>
}