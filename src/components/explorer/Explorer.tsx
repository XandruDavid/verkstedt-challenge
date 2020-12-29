import React from 'react';
import { ReposTable } from '../reposTable/ReposTable';
import './Explorer.css';

type ExplorerState = {
    repos: Array<any>,
    loading: boolean,
    starredOnly: boolean
}

export class Explorer extends React.Component<{}, ExplorerState> {

    state = {
        repos: new Array<any>(),
        loading: true,
        starredOnly: false
    }

    async componentDidMount() {
        const url = 'https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc'; // Isn't idempotent but ok...
        const res = await fetch(url);
        const data = await res.json();
        this.setState({ repos: data.items, loading: false });
    }

    handleStarredOnlyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ starredOnly: event.target.checked })
    }

    filterRepos = () => {
        if (this.state.starredOnly) {
            return this.state.repos.filter(repo => {
                return localStorage.getItem(repo.id);
            })
        }
        return this.state.repos;
    }

    render() {
        return (
            <article className="Explorer">

                <section className="Explorer-filter">
                    <h3>
                        Filter repos
                    </h3>
                    <div>
                        <label>
                            <input type="checkbox" checked={this.state.starredOnly} onChange={this.handleStarredOnlyChange} />
                            Starred only
                    </label>
                    </div>
                </section>

                <hr />

                <section>
                    {this.state.loading ?
                        'Loading...'
                        :
                        <ReposTable repos={this.filterRepos()} />
                    }
                </section>

            </article>
        );
    }

}