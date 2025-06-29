import { List } from 'antd';
import React, { Component } from 'react';
import background from "./image/Background.png"
import { Form,FormGroup, Button, Card} from "shards-react";
import {
    Row,
    Typography
} from 'antd'
const { Title, Paragraph, Text} = Typography;


class LandingPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
          topBooksResults: [],
          topAuthorResults: [],
          randomBook:null,
          randomAuthor:null,
        }
        this.goToMain = this.goToMain.bind(this)
        this.goToBookSearch = this.goToBookSearch.bind(this)
        this.goToAuthorSearch = this.goToAuthorSearch.bind(this)
        this.feelingLucky = this.feelingLucky.bind(this)
    }

    goToMain() {
        window.location = `/home`
    }

    goToBookSearch() {
        window.location = `/search/books`
    }

    goToAuthorSearch() {
        window.location = `/search/authors`
    }

    feelingLucky() {
        var popularAuthors = [3389,1221698,150038,3617,569,3440476,2546,566,346732,4684322];
        var popularBooks = [36209435,31699823,30636374,30255400,31253248,30355336,31171925,28868998,32820742,29601896];
        let surpriseBook = Math.random() < 0.8;
        let index = Math.floor(Math.random() * 10);
        
        if(surpriseBook){
            let book_id = popularBooks[index];
            window.location = `/books?id=${book_id}`;
        }else{
            let author_id = popularAuthors[index];
            window.location = `/authors?id=${author_id}`;
            
        }
    }
    
    render() {
        return (
            <div style = {{backgroundImage:`url(${background})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",height:'100vh',width:'100vw'}}>
                <div>
                    <Row flex={2}> 
                            <Typography>
                                <Title style={{ marginLeft:'20vw', marginTop: '15vh',justifyContent: 'center',strong:'true'}}>Super Read</Title>
                            </Typography>
                    </Row>

                    <Row flex={2}> 
                        <FormGroup style={{ width: '40vw'}}>
                            <Button theme="light" style={{ marginLeft:'20vw', marginTop: '7vh',width: '15vw' }} onClick={this.goToMain}> Home </Button>
                        </FormGroup>
                    </Row>

                    <Row flex={2} > 
                        <FormGroup style={{ width: '40vw'}} >
                            <Button theme="light" style={{ marginLeft:'20vw', marginTop: '4vh',width: '15vw'}} onClick={this.goToBookSearch}> Search Books </Button>
                        </FormGroup>
                    </Row>

                    <Row flex={2} > 
                        <FormGroup style={{ width: '40vw'}}>
                            <Button theme="light" style={{ marginLeft:'20vw' ,marginTop: '4vh',width: '15vw' }} onClick={this.goToAuthorSearch}> Search Authors </Button>
                        </FormGroup>
                    </Row>

                    <Row flex={2} > 
                        <FormGroup style={{ width: '40vw'}}>
                            <Button theme="light" style={{marginLeft:'20vw', marginTop: '4vh',width: '15vw' }} onClick={this.feelingLucky}> Feeling Lucky </Button>
                        </FormGroup>
                    </Row>
                </div>
            </div>
        )
        }
}
    
 export default LandingPage;
