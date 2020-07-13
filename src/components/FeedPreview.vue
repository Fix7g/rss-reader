<template>
    <div class="feed-wrapper">
        <h1>
            RSS READER
        </h1>

        <div v-if="error">
            No results
            <button @click="fetchNews">Try again</button>
        </div>

        <div v-else class="container">
            <div class="top-bar">
                <div class="channel">
                    <b>Channel: </b>{{channel}}
                </div>
                <div class="search">
                    <input type="text" v-model="search" placeholder="Search title.."/>
                </div>
            </div>

            <div class="news-list">
                <News v-for="news in filteredList" :news="news" :key="news.guid"
                      @click.native="handleNewsDetail(news)"/>
            </div>
            <div class="spinner" v-if="loading">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>

            <p v-show="filteredList.length === 0 && !loading" class="no-results">
                No results
            </p>

            <NewsDetail v-if="showDetail" :news="singleNews" @closeDetail="showDetail = false"/>
        </div>
    </div>

</template>
<script>
    import { getNews } from "@/api/news"
    import News from "@/components/News";
    import NewsDetail from "@/components/NewsDetail";

    export default {
        name: 'feed-preview',
        components: {
            News,
            NewsDetail
        },
        props: {
            url: String
        },
        data() {
            return {
                newsList: [],
                search: '',
                showDetail: false,
                singleNews: null,
                channel: '',
                error: false,
                loading: false
            }
        },
        methods: {
            fetchNews() {
                this.loading = true;
                getNews(this.$props.url).then(data => {
                    this.newsList = data.items
                    this.channel = data.title
                    this.loading = false;
                }).catch(e => {
                    this.error = e
                    console.log(e);
                })
            },
            handleNewsDetail(news) {
                this.showDetail = true;
                this.singleNews = news;
            },
        },
        created: function () {
            this.fetchNews()
        },
        computed: {
            filteredList() {
                return this.newsList.filter(news => {
                    return news.title.toLowerCase().includes(this.search.toLowerCase())
                })
            }
        },
    }
</script>
<style lang="scss" scoped>
    .feed-wrapper {
        h1 {
            font-size: 34px;
        }

        .channel {
            font-size: 18px;
        }

        min-height: 100vh;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @media (min-width: 768px) {
            padding: 30px;
        }
    }

    .news-list {
        margin-top: 50px;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 25px;
        @media (min-width: 480px) {
            grid-template-columns: 1fr 1fr;
        }
        @media (min-width: 768px) {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }

    .container {
        min-width: 80%;
    }

    .top-bar {
        @media (min-width: 768px) {
            display: flex;
            .channel {
                flex: 1;
            }
        }
    }

    .search {
        width: 50%;
        text-align: right;

        input {
            width: 200px;
            font-size: 18px;
            font-weight: 300;
            height: 20px;
            border: 0;
            background: none;
            border-bottom: 1px solid black;
            transition: box-shadow .3s ease-out;
            @media (min-width: 1024px) {
                font-weight: 400;
            }
        }

        input:focus {
            outline: none;
            box-shadow: 0 10px 20px -8px rgba(255, 255, 255, .5);
        }

        @media (max-width: 765px) {
            margin-top: 15px;
            width: 100%;
            input {
                width: 100%;
            }
        }
    }

    .no-results {
        text-align: center;
        font-size: 24px;
        font-weight: 600;
    }

    .spinner {
        margin: auto;
        position: relative;
        width: 80px;
        height: 80px;
    }

    .spinner div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 64px;
        height: 64px;
        margin: 8px;
        border: 8px solid black;
        border-radius: 50%;
        animation: spinner 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: black transparent transparent transparent;
    }

    .spinner div:nth-child(1) {
        animation-delay: -0.45s;
    }

    .spinner div:nth-child(2) {
        animation-delay: -0.3s;
    }

    .spinner div:nth-child(3) {
        animation-delay: -0.15s;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>