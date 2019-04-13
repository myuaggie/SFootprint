
import React from 'react';

class News extends React.Component {
    constructor(props)
    {
        super(props);
        this.state = {
           news:[]
        };
    }
    componentWillMount(){
        fetch('http://localhost:5000/news',{
            credentials: 'include',
            method:'GET',
            mode:'cors',
        })
            .then(response=>{
                console.log('Request successful',response);
                return response.json()
                    .then(result=>{
                            this.setState({news:result[0]});

            });
        });
    }
    render() {

        return (
          <div>
              {this.state.news}
          </div>
        );
    }
}


export default News;
