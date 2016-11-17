<template>
  <div id="app">
    <input type="date" name="name" value="" v-model="date" v-on:change="update">
    <p>{{count}}</p>
    <ul>
      <li v-for="(item, index) in processed_commit_list" v-on:click="fetch_one(item.sha)">
        {{index + 1}} - {{item.commit.message | beautify-msg}}
      </li>
    </ul>
    <ul>
      <li v-for="(item, index) in topic_list" v-on:click="go_to(item.link)">
        <p>{{index + 1}} - {{item.title}} - {{item.author}}</p>
        <div>
          {{item.description}}
        </div>
      </li>
    </ul>
</template>

<script>
exports.default = {
  name: 'app',
  data () {
    return {
      date: '2016-11-14',
      source_commit_list: [],
      count: 0,
      current_commit_sha: null,
      topic_list: [],
    };
  },
  methods: {
    update() {
      this.$http.get(`http://127.0.0.1:8082/commits/${this.date}`).then((response) => {
        var data = response.body;
        this.source_commit_list = data;
        this.count = data.length;
        console.log(`found ${data.length} items`);
      }, (response) => {
        // error callback
        console.log(response);
      });
    },
    fetch_one(sha) {
      console.log(sha);
      this.$http.get(`http://127.0.0.1:8082/commits/${this.date}/${sha}`).then((response) => {
        var data = response.body;
        this.topic_list = data;
      });
    },
    go_to(link) {
      console.log(link);
      window.location.href = link;
    },
  },
  computed: {
    even_topic_list() {
      return this.topic_list.filter((item, index) => {
        return index % 2;
      });
    },
    processed_commit_list() {
      return this.source_commit_list.filter((item) => {
        return item.commit.message.indexOf('new') >= 0;
      });
    }
  }
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
