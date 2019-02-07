import React, { Component } from 'react';
import { CollectionIcon } from './styled';


class History extends Component {

    state = {
        days: 0,
        hours: 0,
        minutes: 0
    }

    componentDidMount() {
        const createdTime = new Date(this.props.createdAt).getTime();
        this.calculateTimeDifference(createdTime);
        this.interval = setInterval(() => this.calculateTimeDifference(createdTime), 60000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    calculateTimeDifference = (createdTime) => {
        const timeNow = new Date().getTime();

        const timeDifference = timeNow - createdTime;

        let minutes = Math.floor(timeDifference / (1000 * 60) % 60);

        let hours = Math.floor(timeDifference / (1000 * 60 * 60) % 60);
        hours--;

        let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24) % 24);

        this.setState({ days, hours, minutes });
    }

    render() {

        const { movieName, collection, action, historyIcon, browseHistory } = this.props;
        const { days, hours, minutes } = this.state;
        let userAction, collectionName, conjunction, color;

        switch (collection) {
            case "must-watch":
                collectionName = "Must Watch Titles"
                color = "#e64c66";
                break;
            case "favourite":
                collectionName = "Favourite Titles"
                color = "#ffab00";
                break;
            case "watched":
                collectionName = "Watched Titles"
                color = "#00bfdd";
                break;
            case "maybe-later":
                collectionName = "Maybe Later Titles"
                color = "#7874cf";
                break;
            default:
                collectionName = "Non Collection"
        }

        switch (action) {
            case "add":
                userAction = "added"
                conjunction = "to"
                break;
            case "remove":
                userAction = "deleted"
                conjunction = "from"
                break;
            default:
                userAction = "no action"
        }

        return (
            <div className="history__notification">
                {historyIcon && <i className="fa fa-history"></i>}
                <div className="notification__description">
                    <div className="notification__text">{browseHistory && (action === "add" ? <i className="fa fa-plus-circle add"></i> : <i className="fa fa-minus-circle remove"></i>)}You {userAction} <span>{movieName}</span> {conjunction} your {browseHistory && <CollectionIcon color={color}></CollectionIcon>}<span>{collectionName}</span>.</div>
                    <div className="notification__time">{days > 0 ? `${days} days` : ''} {hours > 0 ? `${hours} hours and` : ''} {minutes > 0 ? `${minutes} minutes ago` : 'just now'}</div>
                </div>
            </div>
        );
    }
}

export default History;

