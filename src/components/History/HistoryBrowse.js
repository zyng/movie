import React, { Component } from 'react';
import History from './History';
import * as movieApi from "../helpers/movieApi";
import Loading from "../Loading/Loading";

class HistoryBrowse extends Component {
    state = {
        historyList: [],
        isLoading: false,
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        movieApi.getHistory()
            .then(data => this.setState({ historyList: data, isLoading: false }))
    }
    render() {
        const historyList = this.state.historyList.map(history => (
            <History key={history.id}
                movieName={history.movie_name}
                collection={history.collection}
                action={history.action}
                createdAt={history.created_at}
                browseHistory
            />
        ))

        return (
            <>
                <div className="menu__history browse-history">
                    {(this.state.isLoading && <Loading isActive page />) || (historyList.length > 0 ? historyList : "No history of your activity.")}
                </div>
            </>
        );
    }
}

export default HistoryBrowse;