import React, { Component } from "react";
import NewsItem from "./NewsItem";
import ImageForEmty from "../noImage.jpg";

export class News extends Component {
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: true,
            page: 1,
        };
    }

    async componentDidMount() {
        let url =
            "https://newsapi.org/v2/top-headlines?country=in&apiKey=4291e3bde00b4122b7c1670c5c8750e9&page=1&pageSize=20";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
        });
    }

    handlePreviousClick = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4291e3bde00b4122b7c1670c5c8750e9&page=${this.state.page - 1
            }&pageSize=20`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles,
        });
    };
    handleNextClick = async () => {
        if (this.state.page + 1 > Math.ceil(this.state.totalResults / 20)) {
        } else {
            let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=4291e3bde00b4122b7c1670c5c8750e9&page=${this.state.page + 1
                }&pageSize=20`;
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                page: this.state.page + 1,
                articles: parsedData.articles,
            });
        }
    };

    render() {
        return (
            <div className="container my-3">
                <h1>NewsMonkey - Top Headlines</h1>
                <div className="row">
                    {this.state.articles.map((element) => {
                        return (
                            <div className="col-md-4" key={element.url}>
                                <NewsItem
                                    title={
                                        element.title ? element.title : "Title is not available"
                                    }
                                    description={
                                        element.description
                                            ? element.description.slice(0, 88)
                                            : "Description is not available"
                                    }
                                    imageUrl={
                                        element.urlToImage ? element.urlToImage : ImageForEmty
                                    }
                                    newsUrl={element.url}
                                />
                            </div>
                        );
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button
                        disabled={this.state.page < 1}
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePreviousClick}
                    >
                        &larr; Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
