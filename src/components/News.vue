<template>
    <div class="single-news">
        <img :src=photo>
        <p>
            {{title}}
        </p>
    </div>
</template>
<script>
    export default {
        name: 'News',
        props: {
            news: {
                type: Object,
                required: true,
            },
        },
        data() {
            return {
                title: this.news.title,
                photo: this.news.mediaContent.$.url,
            };
        },
    };
</script>
<style lang="scss" scoped>
    .single-news {
        width: 75vw;
        margin: auto;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 50%;
        @media (min-width: 480px) {
            width: 45vw;
        }
        @media (min-width: 768px) {
            width: 25vw;
        }

        img {
            width: 100%;
        }

        p {
            min-height: 40px;
            font-size: 18px;
            font-weight: 600;
            margin-top: 10px;
        }

        &:hover {
            opacity: .8;
            cursor: pointer;
        }

    }
</style>

