<template>
    <div id="app">
        <feed-preview url="https://www.gamespot.com/feeds/mashup/"/>
    </div>
</template>

<script>
    import FeedPreview from './components/FeedPreview'

    export default {
        name: 'App',
        components: {
            FeedPreview
        }
    }
</script>

<style>
    @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap');

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Lato', sans-serif;
        margin: 0;
        padding: 0;
    }
</style>
