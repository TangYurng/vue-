export default {
    name: "MyTableHeader1",
    props: {
        header: {
            type: Array,
            default: () => {
                return [{ showfilter: false, showsort: false }];
            },
        }
    },
    render() {
        return (
            <div class="my-table-header">
                <table>
                    <colgroup class="headercg">
                        {
                            this.header.map((col, colIndex) => (<col {...{style:{width:col.width}}}></col>))
                        }
                    </colgroup>
                    <thead>
                        <tr>
                            {
                                this.header.map((col, colIndex) => (
                                    <th>
                                        <span>{col.value}</span>
                                    </th>
                                ))
                            }
                        </tr>
                    </thead>
                </table>
            </div>
        )
    }
    // scopeSlots: self.$scopedSlots,
}



