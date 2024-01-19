import React, { Component } from 'react'

export class NewsItem extends Component {
 
 
  render() {
    let {title , description,imageUrl,newsUrl,author,date,Source} = this.props;
    return (
      <div className=''>
        <div className="card mt-3" style={{}}>
        <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger start-50 z-1 " >
    {Source}
  </span>
  <img src={!imageUrl?"https://media.wired.com/photos/659f246783a7239c87585c11/191:100/w_1280,c_limit/CSAM-report-sec-GettyImages-885630762.jpg":imageUrl} className="card-img-top" alt="..."/>
  <div className="card-body">
    <h5 className="card-title">{title}... <p>  </p></h5>
    <p className="card-text">{description}...</p>
    <p className="card-text"><small className="text-danger">By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
    <a href={newsUrl} rel="noreferrer" target="_blank" className="btn  btn-sm btn-dark">Read More</a>
  </div>
</div>
      </div>
    )
  }
}

export default NewsItem