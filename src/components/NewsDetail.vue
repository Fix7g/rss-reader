<template>
    <div class="detailWrapper">
        <div class="innerWrapper">
            <div class="photo">
                <img :src="photo">
            </div>
            <div class="description">
                <h2 class="title">{{ title }}</h2>
                <p class="description">
                    {{ description }}
                </p>
                <a class="continue" :href="link" target="_blank">Continue reading</a>
            </div>
            <div class="close" @click="$emit('closeDetail')"/>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'NewsDetail',
        props: {
            news: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                photo: null,
                title: null,
                description: null,
                link: null
            };
        },
        mounted() {
            this.photo = this.news.mediaContent.$.url;
            this.title = this.news.title;
            this.description = this.news.contentSnippet;
            this.link = this.news.link;
        },
    };
</script>
<style lang="scss" scoped>
    .detailWrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, .7);
    }

    .close {
        position: absolute;
        width: 30px;
        height: 30px;
        padding: 30px;
        right: 0;
        top: 0;
        cursor: pointer;

        &::before,
        &::after {
            position: absolute;
            top: 30px;
            right: 20px;
            content: '';
            width: 20px;
            height: 2px;
            background: black;
            display: block;
        }

        &::before {
            transform: rotate(45deg);
        }

        &::after {
            transform: rotate(-45deg);
        }
    }

    .innerWrapper {
        position: relative;
        background-color: #fff;
        display: flex;
        width: 85vw;
        max-height: 80vh;
        padding: 55px 15px 15px;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        @media (min-width: 768px) {
            max-height: 480px;
            width: 65vw;
            padding: 40px;
        }
        @media (min-width: 1024px) {
            flex-direction: row;
            .photo {
                min-width: 40%;
                margin-right: 20px;
            }
        }

        .photo {
            width: 100%;
            height: auto;

            img {
                width: 100%;
            }
        }

        .description {
            @media (max-width: 765px) {
                overflow: overlay;
            }
            color: #2a2a2a;
        }
    }
</style>