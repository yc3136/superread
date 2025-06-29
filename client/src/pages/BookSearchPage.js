import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import fallbackImg from "./image/fallback.png"

import {
    Table,
    Pagination,
    Select,
    Row,
    Col,
    Divider,
    Slider,
    Rate,
    Image,
    Layout,
} from 'antd'



import MenuBar from '../components/MenuBar';
import { getBooksByKeyword } from '../fetcher'

    
const { Column, ColumnGroup } = Table;
const marks = {0: '0', 5: '5'};
class BookSearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            languageQuery: '',
            authorQuery: '',
            ratingHighQuery: 5,
            ratingLowQuery: 0,
            allBooks: [],
            bookKeyword: window.location.search ? window.location.search.substring(1).split('=')[1] : '',
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleLanguageQueryChange = this.handleLanguageQueryChange.bind(this)
        this.handleAuthorQueryChange = this.handleLanguageQueryChange.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.goToBook = this.goToBook.bind(this)
    }

    handleLanguageQueryChange(event) {
        this.setState({ languageQuery: event.target.value })
    }

    handleAuthorQueryChange(event) {
        this.setState({ authorQuery: event.target.value })
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    goToBook(book_id) {
        window.location = `/books?id=${book_id}`
    }

    updateSearchResults() {
        getBooksByKeyword(this.state.bookKeyword, this.state.languageQuery, this.state.authorQuery, this.state.ratingLowQuery, this.state.ratingHighQuery).then(res => {
            this.setState({ allBooks: res.results })
        })
    }

    componentDidMount() {
        const queryString = window.location.search;
        console.log(queryString);
        getBooksByKeyword(this.state.bookKeyword, this.state.languageQuery, this.state.authorQuery, this.state.ratingLowQuery, this.state.ratingHighQuery).then(res => {
            this.setState({ allBooks: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Row gutter={[16]}>
                    <Col span = {5} offset = {1}>
                        <div style={{ margin: '0 auto', marginTop: '2vh' }}>
                            <Card>
                                <CardBody>
                                <Form style={{ width: '20vw', margin: '1vh'}}>
                                    <Row flex={2}> <FormGroup style={{ width: '10vw'}}>
                                        <label>Language</label>
                                        <FormInput placeholder="Language" value={this.state.languageQuery} onChange={this.handleLanguageQueryChange} />
                                    </FormGroup></Row>
                                    <Row flex={2}> <FormGroup style={{ width: '10vw'}}>
                                        <label>Author</label>
                                        <FormInput placeholder="Author" value={this.state.authorQuery} onChange={this.handleAuthorQueryChange} />
                                    </FormGroup></Row>
                                    <Row flex={2}> <FormGroup style={{ width: '10vw' }}>
                                    <label>Rating</label>
                                        <Slider range max="5" step="0.5" defaultValue={[0, 5]} marks={marks} onChange={this.handleRatingChange} />
                                    </FormGroup></Row>
                                    <Row flex={2}><FormGroup style={{ width: '10vw' }}>
                                        <Button style={{ marginTop: '4vh' }} onClick={this.updateSearchResults}>Search</Button>
                                    </FormGroup></Row>
                                </Form>
                                </CardBody>
                            </Card>
                        </div>
                    </Col>
                    <Col span = {18}>
                        {this.state.allBooks ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                            <Card>
                                <CardBody>
                                <Table onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => {this.goToBook(record.book_id)},
                                    };
                                }} dataSource={this.state.allBooks} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                                    <Column title="Image" dataIndex="image_url" key="image_url" width={150} render= {(text, record, index) => { return(<Image src={record.image_url} width = '120px' height = '150px' alt={null} fallback={fallbackImg}/>)}}/>
                                    <Column title="Title" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
                                    <Column title="Author" dataIndex="name" key="name" width={150} sorter= {(a, b) => a.name.localeCompare(b.name)}/>
                                    <Column title="Rating" dataIndex="average_rating" key="average_rating" width={220} render={(text, record, index) => {return (<span disabled><Rate disabled allowHalf value={record.average_rating}/><span className="ant-rate-text">{(Math.round(record.average_rating*100)/100).toFixed(2)}</span></span>)}} sorter= {(a, b) => a.average_rating - b.average_rating}/>
                                </Table>
                                </CardBody>
                            </Card>
                        </div> : null}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default BookSearchPage