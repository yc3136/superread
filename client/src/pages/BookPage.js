import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import fallbackImg from "./image/fallback.png"

import {
    Table,
    Pagination,
    Row,
    Col,
    Divider,
    Descriptions,
    Image,
    Rate,
} from 'antd'

import { getBookPageInfo,getBookReviews,getSimilarBooks } from '../fetcher'
import MenuBar from '../components/MenuBar';

const { Column, ColumnGroup } = Table;
    


class BookPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedbookId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedBookDetails: null,
            selectedBookReviews: [],
            similarBooks: [],
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToBook = this.goToBook.bind(this)
        this.goToAuthor = this.goToAuthor.bind(this)

    }

    goToBook(book_id) {
        window.location = `/books?id=${book_id}`
    }

    goToAuthor(author_id) {
        window.location = `/authors?id=${author_id}`
    }

    updateSearchResults() {
        getBookPageInfo(this.state.selectedbookId).then(res => {
            this.setState({ selectedBookDetails: res.results[0] })
        })
    }

    componentDidMount() {
        getBookPageInfo(this.state.selectedbookId).then(res => {
            this.setState({ selectedBookDetails: res.results[0] })
        })

        getBookReviews(this.state.selectedbookId).then(res => {
            this.setState({ selectedBookReviews: res.results })
        })

        getSimilarBooks(this.state.selectedbookId).then(res => {
            this.setState({ similarBooks: res.results })
        })

    }

    render() {
        return (

            <div>

                <MenuBar />
                {this.state.selectedBookDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                        <CardBody>
                            <Row gutter='5' align='middle' justify='center'>
                                <h3>{this.state.selectedBookDetails.title}</h3>
                            </Row>
                            <Row>
                            <Col offset={1} span={17} style={{ textAlign: 'left' }}>
                                <Row gutter='5' align='left' justify='left' onClick={() => {this.goToAuthor(this.state.selectedBookDetails.authorId)}}>
                                    <p><b>Author: </b>{this.state.selectedBookDetails.name}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>ISBN: </b>{this.state.selectedBookDetails.isbn}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>Country: </b>{this.state.selectedBookDetails.country_code}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>Language: </b>{this.state.selectedBookDetails.language_code}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>eBook Indicator: </b>{this.state.selectedBookDetails.is_ebook}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>Format: </b>{this.state.selectedBookDetails.format}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>Publisher: </b>{this.state.selectedBookDetails.publisher}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>Number of Pages: </b>{this.state.selectedBookDetails.num_pages}</p>
                                </Row>
                                <Row gutter='5' align='left' justify='left'>
                                    <p><b>Publication Year: </b>{this.state.selectedBookDetails.publication_year}</p>
                                </Row>
                            </Col>
                            <Col offset={1} span={5} style={{ textAlign: 'right' }}>
                                <Row gutter='5' align='right' justify='right'>
                                    <Image src={this.state.selectedBookDetails.image_url} width = '150px' alt={null} fallback={fallbackImg} style={{height:'30vh'}}/>
                                </Row>
                                <Row gutter='5' align='mid' justify='mid'>
                                    <span disabled><Rate disabled allowHalf value={this.state.selectedBookDetails.average_rating}/><span className="ant-rate-text">{(Math.round(this.state.selectedBookDetails.average_rating*100)/100).toFixed(2)}</span></span>
                                </Row>
                            </Col>
                            </Row>
                        </CardBody>
                    </Card>
                    <p><h3>About This Book</h3></p>
                    <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                        <CardBody>
                        <Row gutter='5' align='left' justify='left'>
                            <p><b>Description: </b>{this.state.selectedBookDetails.description}</p>
                        </Row>
                        </CardBody>
                    </Card>
                    <p><h3>Reviews</h3></p>
                    <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                        <CardBody>
                        <Divider />
                        <Table dataSource={this.state.selectedBookReviews} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }} style={{wordWrap: 'break-word', wordBreak: 'break-word'}}>
                            <Column title="Rating" dataIndex="rating" key="rating" sorter= {(a, b) => a.rating-b.rating} width='10%'/>
                            <Column title="Reviews" dataIndex="review_text" key="review_text"/>
                            <Column title="Date" dataIndex="date_added" key="date_added" width='15%'/>
                        </Table>
                        <Divider />
                        </CardBody>
                    </Card>
                    <p><h3>Similar Books</h3></p>
                    <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                        <CardBody>
                        <Divider />
                        <Table onRow={(record, rowIndex) => {
                            return {
                                onClick: event => {this.goToBook(record.book_id)},
                            };
                        }} dataSource={this.state.similarBooks} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                            <Column title="Image" dataIndex="image_url" key="image_url" render= {(text, record, index) => { return(<Image src={record.image_url} alt={null} fallback={fallbackImg}/>)}}/>
                            <Column title="Title" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
                            <Column title="Author" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.name)}/>
                            <Column title="Rating" dataIndex="average_rating" key="average_rating" sorter= {(a, b) => a.average_rating-b.average_rating}/>
                        </Table>
                        <Divider />
                        </CardBody>
                    </Card>
                </div> : null}
            </div>
        )
    }
}
export default BookPage

