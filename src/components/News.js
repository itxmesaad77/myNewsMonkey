import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps={
      country:'us',
      pageSize:5,
      category:'general'
    }
    static propTypes={
      country:PropTypes.string,
      pageSize:PropTypes.number,
      category:PropTypes.string
    }
       constructor(props){
        super(props);
        this.state={
            articles: [],
            loading: true,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalizeString(this.props.category)}-NewsMonkey`;
    }
    capitalizeString=(string)=>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    async updatenews(){
      this.setState({loading:true}) 
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25b1b00d4b5c44278e0bfaeb3e22d26e&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData= await data.json()
this.setState({
    articles:parsedData.articles,
    totalResults:parsedData.totalResults
  });
    }     
  async componentDidMount(){
      this.updatenews();
    }
  
    fetchMoreData = async () => {
     this.setState({page:this.state.page+1,
    })
    const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=25b1b00d4b5c44278e0bfaeb3e22d26e&pageSize=${this.props.pageSize}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData= await data.json()
this.setState({
    articles:this.state.articles.concat(parsedData.articles),
    totalResults:parsedData.totalResults,
loading:false})
    };
  render() 
  { 
    return (
        < >
      <h1 className="text-center m-2 mb-4  "style={{fontSize:'30px'}}> NewsMonkey - Top {this.capitalizeString(this.props.category)} Headlines </h1>
     {this.state.loading && <Spinner />}
     <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
      <div className="row" >
      {  this.state.articles.map((element)=>{
return <div className="col-md-4" key={element.url }>
    <NewsItem title={element.title} author={element.author} Source={element.source.name} date={element.publishedAt} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url}/>
    </div>
  })}
      </div>  
      </div>
      </InfiniteScroll>
      </>    )
  }
}
export default News