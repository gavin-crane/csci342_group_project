import React from 'react';
import './ThreadList.css';
import Thread from '../Thread/Thread';

class ThreadList extends React.Component{
    render(){
        return(
            <div className="ThreadList">
                {this.props.threads.map((thread) => (
                    <Thread postDetails = {thread} width={360} height={350} />
                ))}
            </div>
            
        )
    }
}

export default ThreadList;