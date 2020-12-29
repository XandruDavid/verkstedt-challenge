import React from 'react';
import './ReposTable.css';

type ReposTableProps = {
    repos: Array<any>
}

export class ReposTable extends React.Component<ReposTableProps> {

    handleSave = (id: string, event: React.MouseEvent<HTMLTableCellElement, MouseEvent>) => {
        try {
            if (localStorage.getItem(id)) {
                localStorage.removeItem(id)
            } else {
                localStorage.setItem(id, "saved")
            }
            (event.target as Element).classList.toggle('selected'); // Why have to cast?...
        } catch (e) {
            console.error("Error accessing local storage", e);
        }
    }

    render() {
        return (
            this.props.repos.length > 0 ?
                <table className="ReposTable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Author</th>
                            <th>Stars</th>
                            <th>GitHub link</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.repos.map(repo =>
                            <tr key={repo.id}>
                                <td className={`ReposTable-star ${localStorage.getItem(repo.id) ? 'selected' : ''}`} onClick={this.handleSave.bind(this, repo.id)} data-testid="star">★</td>
                                <td>{repo.name}</td>
                                <td>{repo.owner.login}</td>
                                <td>{repo.stargazers_count}</td>
                                <td><a href={repo.html_url}>{repo.html_url}</a></td>
                            </tr>
                        )}
                    </tbody>
                </table>
                :
                <div>No repositories..</div>
        )
    }

}