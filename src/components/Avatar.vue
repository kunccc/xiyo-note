<template>
  <span :title="username">{{ slug }}</span>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import {mapActions, mapGetters} from 'vuex';

@Component({
  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  },
  methods: {
    ...mapActions([
      'checkLogin'
    ])
  }
})
export default class Avatar extends Vue {
  username!: string;
  slug!: string;
  checkLogin!: Function;

  created() {
    this.checkLogin().then();
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
span {
  display: inline-block;
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 33px;
  border-radius: 50%;
  background: $color-highlight;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>