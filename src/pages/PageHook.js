import React, { useState } from 'react';

export default function UsePagination(props) {
    let timmer = null;
    const total = props.total;
    let [activePage, setActivePage] = useState(props.page);
    let [pageSize, setPageSize] = useState(props.pageSize);
    let [pageLength, setPages] = useState(Math.ceil(total / pageSize));

    // 设置自定义间隔时间
    function   setTimmer(){
        clearInterval(timmer)
        timmer = setInterval(() => {
            if(activePage == pageLength) activePage = 0;
            next()
        }, props.interval)

    }

    setTimmer();
    
    function pre() {
        if (activePage > 1) {
            activePage--;
            changePage(activePage)
        }
    }
    function next() {
        if (activePage < pageLength) {
            activePage++;
            changePage(activePage)
        }
    }
    function setPage() {
        let pages = [];
        for (let i = 0; i < pageLength; i++) {
            pages.push(<li className={activePage == i + 1 ? "page active" : "page"} onClick={() => changePage(i + 1)}>{i + 1}</li>)
        }
        return (<ul>
            {pages}
        </ul>)
    }
    function changePage(val) {
        if (val < 1 || val > pageLength) {
            return;
        }
        setActivePage(val)
        setTimmer();
        props.onChange && props.onChange(val, pageSize)
    }
    function changePageSize(e) {
        pageSize = Number(e.target.value);
        setPageSize(pageSize)
        setPages(Math.ceil(total / pageSize))
        changePage(1)
        setTimmer();
    }

    return (
        <div className="pagination">
            <button onClick={pre}>上一页</button>
            {setPage()}
            <button onClick={next}>下一页</button>

            <select value={pageSize} onChange={changePageSize}>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
            </select>
        </div>
    )
}