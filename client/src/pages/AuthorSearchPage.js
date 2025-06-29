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
import { getAuthorsByKeyword } from '../fetcher'

    
const { Column, ColumnGroup } = Table;
const marks = {0: '0', 5: '5'};

class AuthorSearchPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            ratingHighQuery: 5,
            ratingLowQuery: 0,
            allAuthors: [],
            authorKeyword: window.location.search ? window.location.search.substring(1).split('=')[1] : '',
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.handleRatingChange = this.handleRatingChange.bind(this)
        this.goToAuthor = this.goToAuthor.bind(this)
    }

    handleRatingChange(value) {
        this.setState({ ratingLowQuery: value[0] })
        this.setState({ ratingHighQuery: value[1] })
    }

    goToAuthor(author_id) {
        window.location = `/authors?id=${author_id}`
    }

    updateSearchResults() {
        getAuthorsByKeyword(this.state.authorKeyword, this.state.ratingLowQuery, this.state.ratingHighQuery).then(res => {
            this.setState({ allAuthors: res.results })
        })
    }

    componentDidMount() {
        getAuthorsByKeyword(this.state.authorKeyword, this.state.ratingLowQuery, this.state.ratingHighQuery).then(res => {
            this.setState({ allAuthors: res.results })
        })
    }

    render() {
        return (
            <div>
                <MenuBar />
                <Row gutter={[16]}>
                    <Col span = {5} offset = {1}>
                        <div style={{ margin: '0 auto', marginTop: '2vh'}}>
                            <Card>
                                <CardBody>
                                <Form style={{ width: '20vw', margin: '2vh'}}>
                                    <Row flex={2}> <FormGroup style={{ width: '10vw'}}>
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
                        {this.state.allAuthors ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                            <Card>
                                <CardBody>
                                <Table onRow={(record, rowIndex) => {
                                    return {
                                        onClick: event => {this.goToAuthor(record.authorId)},
                                    };
                                }} dataSource={this.state.allAuthors} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                                    <Column title="Image" dataIndex="image_url" key="image_url" width={150} render= {(text, record, index) => { return(<Image src={record.image_url} width = '120px' height = '150px' alt={null} fallback={fallbackImg}/>)}}/>
                                    <Column title="Name" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.name)}/>
                                    <Column title="Rating" dataIndex="average_rate" key="average_rate" width={220} render={(text, record, index) => {return (<span disabled><Rate allowHalf disabled value={record.average_rate}/><span className="ant-rate-text">{(Math.round(record.average_rate*100)/100).toFixed(2)}</span></span>)}} sorter= {(a, b) => a.average_rate - b.average_rate}/>
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

export default AuthorSearchPage
