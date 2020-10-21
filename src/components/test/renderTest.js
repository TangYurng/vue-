export default {
  name: 'renderTest',
  functional: true,
  props: {
    render: Function,
    item: String,
    index: Number
  },
  render: (h, ctx) => {
    const params = {
      item: ctx.props.item,
      index: ctx.props.index
    }
    console.log(ctx.props.render)
    return ctx.props.render(h, params)
  }
}