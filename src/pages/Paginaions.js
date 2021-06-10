import React from 'react';
import "./Paginaions.css"


class Paginations extends React.Component {
    timmer = null;
    constructor(props) {
        super(props)
        this.state = {
            activePage: this.props.page,
            pageSize: this.props.pageSize,
            total: this.props.total,
            interval: this.props.interval,
            pageLength: 1
        }
        this.timmer = null;
    }

    componentDidMount() {
        //自动切换
        this.setTimmer();
        this.getPageLength();
    }

    setTimmer(){
        clearInterval(this.timmer)
        this.timmer = setInterval(() => {
            if(this.state.activePage == this.state.pageLength) this.state.activePage = 0
            this.setState({
                activePage: this.state.activePage + 1
            })
        }, this.state.interval)

    }

    setInterPage() {
        setInterval(() => {
            this.changePage(this.state.activePage + 1)
        }, this.state.interval)
    }

    getPageLength() {
        this.setState({
            pageLength: Math.ceil(this.state.total / this.state.pageSize)
        })
    }

    changePage = (val) => {
        if (val < 1 || val > this.state.pageLength) {
            return;
        }
        this.setState({
            activePage: val
        })
        this.setTimmer();
        this.props.change && this.props.change(val)
    }

    pre = () => {
        if (this.state.activePage > 1) {
            this.changePage(this.state.activePage - 1)
        }
        this.setTimmer();
    }
    next = () => {
        if (this.state.activePage < this.state.pageLength) {
            this.changePage(this.state.activePage + 1)
        }
        this.setTimmer();
    }

    changePageSize = (e) => {
        this.setState({
            pageLength: Math.ceil(this.state.total / e.target.value),
            pageSize: e.target.value,
            activePage: 1
        })
        this.setTimmer();
    }

    render() {
        return (
            <div className="pagination">
                <button onClick={this.pre}>上一页</button>
                {this.setPages()}
                <button onClick={this.next}>下一页</button>

                <select value={this.state.pageSize} onChange={this.changePageSize}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                </select>
            </div>
        )
    }

    setPages() {
        let pages = [];
        for (let i = 0; i < this.state.pageLength; i++) {
            pages.push(<li className={this.state.activePage === i + 1 ? "page active" : "page"} onClick={this.changePage.bind(this, i + 1)}>{i + 1}</li>)
        }
        return (<ul>
            {pages}
        </ul>)
    }
}

export default Paginations