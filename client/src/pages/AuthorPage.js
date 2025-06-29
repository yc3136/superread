import React from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle, Progress } from "shards-react";
import fallbackImg from "./image/fallback.png"

import {
    Table,
    Row,
    Col,
    Divider,
    Image,
    Rate 
} from 'antd'

import { format } from 'd3-format';
import { getAuthorPageInfo,getAuthorTopBooks} from '../fetcher'
import MenuBar from '../components/MenuBar';
const wideFormat = format('.3r');
const { Column, ColumnGroup } = Table;

class AuthorPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedAuthorId: window.location.search ? window.location.search.substring(1).split('=')[1] : 0,
            selectedAuthorDetails: null,
            selectedAuthorTopBooks: []
        }

        this.updateSearchResults = this.updateSearchResults.bind(this)
        this.goToBook = this.goToBook.bind(this)

    }

    goToBook(book_id) {
        window.location = `/books?id=${book_id}`
    }

    updateSearchResults() {
        getAuthorPageInfo(this.state.selectedAuthorId).then(res => {
            this.setState({ selectedAuthorDetails: res.results[0] })
        })
    }

    componentDidMount() {
        getAuthorPageInfo(this.state.selectedAuthorId).then(res => {
            this.setState({ selectedAuthorDetails: res.results[0] })
        })
        getAuthorTopBooks(this.state.selectedAuthorId).then(res => {
            this.setState({ selectedAuthorTopBooks: res.results })
        })
    }
    

    render() {
        return (

            <div>
                <MenuBar />
                    {this.state.selectedAuthorDetails ? <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh',marginBottom:'2vh'}}>
                <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                    <CardBody>
                        <Row gutter='5' align='middle' justify='center'>
                            <h3>{this.state.selectedAuthorDetails.title}</h3>
                        </Row>
                        <Row>
                        <Col flex={2} span={18} style={{ textAlign: 'left' }}>
                            <Row gutter='5' align='left' justify='left'>
                                <p><b>Name: </b>{this.state.selectedAuthorDetails.name}</p>
                            </Row>
                            <Row gutter='5' align='left' justify='left'>
                                <p><b>Born: </b>{this.state.selectedAuthorDetails.born}</p>
                            </Row>
                            <Row gutter='5' align='left' justify='left'>
                                <p><b>Country: </b>{this.state.selectedAuthorDetails.country}</p>
                            </Row>
                            <Row gutter='5' align='left' justify='left'>
                                <p><b>Original Hometown: </b>{this.state.selectedAuthorDetails.original_hometown}</p>
                            </Row>
                            <Row gutter='5' align='left' justify='left'>
                                <p><b>Genre: </b>{this.state.selectedAuthorDetails.genre}</p>
                            </Row>
                        </Col>
                        <Col flex={2} span={8} style={{ textAlign: 'right' }}>
                            <Row gutter='5' align='right' justify='right'>
                                <Image src={this.state.selectedAuthorDetails.image_url} alt={null} fallback={fallbackImg} style={{height:'30vh'}}/>
                            </Row>
                            <Row gutter='5' align='right' justify='right'>
                            <span disabled><Rate disabled allowHalf value={this.state.selectedAuthorDetails.average_rate}/><span className="ant-rate-text">{(Math.round(this.state.selectedAuthorDetails.average_rate*100)/100).toFixed(2)}</span></span>
                            </Row>
                        </Col>
                        </Row>
                    </CardBody>
                </Card>
                <p><h3>About {this.state.selectedAuthorDetails.name}</h3></p>
                <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                    <CardBody>
                        <Row gutter='5' align='left' justify='left'>
                                <p><b>About: </b>{this.state.selectedAuthorDetails.about}</p>
                        </Row>
                    </CardBody>
                </Card>
                <p><h3>{this.state.selectedAuthorDetails.name}'s Top Books</h3> </p>
                <Card style={{marginTop: '2vh',marginBottom:'2vh'}}>
                    <CardBody>
                    <Divider />
                    <Table onRow={(record, rowIndex) => {
                        return {
                            onClick: event => {this.goToBook(record.book_id)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter  
                        };
                    }} dataSource={this.state.selectedAuthorTopBooks} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}>
                        <Column title="Image" dataIndex="image_url" key="image_url" render= {(text, record, index) => { return(<Image src={record.image_url} alt={null} fallback={fallbackImg}/>)}}/>
                        <Column title="Title" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
                        <Column title="Read Count" dataIndex="peopleRead" key="peopleRead" sorter= {(a, b) => a.peopleRead-b.peopleRead}/>
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

export default AuthorPage

