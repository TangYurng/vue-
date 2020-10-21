
<template>
  <div class="text">
     <lists :listDate="listDate" :renderfun="renderfun"></lists>
  </div> 
</template>
<script>
import lists from '../components/test/list.vue' 
export default {
  name: 'text',
  components: { lists },
  data() {
    return {
      listDate: [ 'list item 1', 'list item 2', 'list item 3', 'list item 4', 'list item 5' ],
      renderfun: (h, ctx) => {
        return h('div', {
          style: {display: 'inline-block', float: 'right'}
        }, [
          h('button', {
            class: ['btn-primary'],
            on: {
              click: () => {
                this.listDate.splice(ctx.index, 1)
              }
            }
          }, '删除')
        ])
      }
    }
  }
}
</script>