import React from 'react';
import './ThreadList.css';
import Thread from '../Thread/Thread';

class ThreadList extends React.Component{
    render(){
        return(
            <div className="ThreadList">
                {this.props.threads.map((thread) => (
                    <Thread postDetails = {thread} />
                ))}
            </div>
            
        )
    }
}

export default ThreadList;