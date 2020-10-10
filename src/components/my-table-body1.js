export default {
    name: "MyTableBody1",
    data() {
        return {
            setwidth: "auto",
            leftsetwidth: "auto",
            rightsetwidth: "auto",
            filters: false,
            fixedheader: [],
            fixedbody: [],
            rfixedheader: [],
            rfixedbody: [],
            showgroup: false,
            primary: [],
            secondary: [],
            CheckedALL: false,
            CheckedItem: false,
            filteritems: [],
        };
    },
    props: {
        header: {
            type: Array,
            default: () => {
                return [{ showfilter: false, showsort: false }];
            },
        },
        body: {
            type: Array,
            default: () => {
                return [];
            },
        },
        isgroup: {
            type: Array,
            default: () => {
                return [false];
            },
        },
        HeaderHeight: {
            type: Number,
            default: 44,
        },
        BodyHeight: {
            type: Number,
            default: 42,
        },
        ShowCheckbox: {
            type: Boolean,
            default: false,
        },
        ShowOperation: {
            type: Boolean,
            default: false,
        },
        // 斑马纹,长宽
        stripe: {
            type: Boolean,
            default: false,
        },
        resize: {
            type: Boolean,
            default: false,
        },
        width: [String, Number],
        height: [String, Number],
    },
    render() {
        return (
            <div class="my-table-body">
                <table
                    cellspacing="0"
                    cellpadding="0"
                    border="0"
                    class="{ isstripe: stripe }"
                    style="{ width: setwidth }"
                    ref="tabbody"
                >
                      <colgroup class="bodycg">
                        {
                            this.header.map((col, colIndex) => (<col {...{style:{width:col.width}}}></col>))
                        }

                    </colgroup>
                    <tbody>
                        {
                            this.body.map((row, rowIndex) => (
                                <tr>
                                    {
                                        this.header.map((col, colIndex) => (
                                            <td>
                                                <div>
                                                    <span>{row[col.key]}</span>
                                                </div>
                                            </td>
                                        ))
                                    }
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
            </div>
        )
    },

    // scopeSlots: self.$scopedSlots,
}



