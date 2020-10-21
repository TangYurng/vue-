export default {
    name: 'render',
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        col: {
            type: Object,
            default: null
        }
    },
    render: (h, ctx) => {
        const params = {
            row: ctx.props.row,
            index: ctx.props.index
        };
        if (ctx.props.col) params.col = ctx.props.col; {
            console.log(params)
            console.log(ctx.props.render(h, params))
            return ctx.props.render(h, params);
        }


    }
};