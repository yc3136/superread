import React, { Component } from 'react';
import { Form, FormInput, FormGroup, Button, Card, CardBody, CardTitle } from "shards-react";
import {
  Table,
  Pagination,
  Select,
  Row,
  Col,
  Slider,
  Image
} from 'antd'
import fallbackImg from "./image/fallback.png"
import background from "./image/Background_light.jpg"

import MenuBar from '../components/MenuBar';
import { getTop5Books, getTop5Authors} from '../fetcher'
const { Column, ColumnGroup } = Table;
const { Option } = Select;

class HomePage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      booksResults: [],
      authorsResults: [],
    }

    this.goToBook = this.goToBook.bind(this)
    this.goToAuthor = this.goToAuthor.bind(this)
  }

  goToBook(book_id) {
    window.location = `/books?id=${book_id}`
  }

  goToAuthor(author_id) {
    window.location = `/authors?id=${author_id}`
  }

  componentDidMount() {
    getTop5Books(5).then(
      response => {
          console.log(response);
          this.setState({ booksResults: response.results });
      }
    );

    getTop5Authors(5).then(
      response => {
          this.setState({ authorsResults: response.results });
      }
    );
  }

  render() {
    return (
    <div className = "App" >
      <div >
        <MenuBar />
        <Card>
        <Row gutter={[16]}>
          <Col span={12}>
            {this.state.booksResults ? <div style={{margin: '0 auto', marginTop: '2vh' }}>
              <Card>
                <CardBody>
                <CardTitle> Top 5 Books </CardTitle>
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {this.goToBook(record.book_id)},
                    };
                }} dataSource={this.state.booksResults}>
                    <Column title="Image" dataIndex="image_url" key="image_url" render= {(text, record, index) => { return(<Image src={record.image_url} width = '120px' height = '150px' alt={null} fallback={fallbackImg}/>)}}/>
                    <Column title="Title" dataIndex="title" key="title" sorter= {(a, b) => a.title.localeCompare(b.title)}/>
                    <Column title="Rating" dataIndex="average_rating" key="average_rating" sorter= {(a, b) => a.average_rating.localeCompare(b.name)}/>
                </Table>
                </CardBody>
              </Card>
            </div> : null}
          </Col>
          <Col span={12}>
            {this.state.authorsResults ? <div style={{margin: '0 auto', marginTop: '2vh' }}>
              <Card>
                <CardBody>
                <CardTitle> Top 5 Authors </CardTitle>
                <Table onRow={(record, rowIndex) => {
                    return {
                        onClick: event => {this.goToAuthor(record.authorId)},
                    };
                }} dataSource={this.state.authorsResults}>
                    <Column title="Image" dataIndex="image_url" key="image_url" render= {(text, record, index) => { return(<Image src={record.image_url} width = '120px' height = '150px' alt={null} fallback={fallbackImg}/>)}}/>
                    <Column title="Name" dataIndex="name" key="name" sorter= {(a, b) => a.name.localeCompare(b.title)}/>
                    <Column title="Rating" dataIndex="average_rate" key="average_rate" sorter= {(a, b) => a.average_rate.localeCompare(b.name)}/>
                </Table>
                </CardBody>
              </Card>
            </div> : null}
          </Col>
        </Row>
        </Card>
      </div>
    </div>
    )
  }
}

export default HomePage;