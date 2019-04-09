import React, { PureComponent } from 'react'
import injectSheet from 'react-jss'
import compose from 'recompose/compose'
import pure from 'recompose/pure'
import SearchIcon from './search_icon.png'
import BlockchainLogo from './Blockchain-Logo.png'
import redArrow from './arrow_right_red.png'
import greenArrow from './arrow_right_green.png'

const styleSheet = theme => ({
    container: {
        margin: 0,
        backgroundColor: '#ffffff'
    },
    header: {
        height: '50px',
        padding: '20px',
    },
    searchBar: {
        backgroundColor: '#004a7c',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        height: '90px',
        '& input': {
            width: '80%',
            height: '30px',
            fontSize: '14px',
        },
    },
    searchButton: {
        height: '50px',
        background: 'none',
        border: 'none',
        '&:focus': {
            outline: 'none'
        }
    },
    logo: {
        width: '40%',
        maxWidth: '300px'
    },
    results: {
        margin: '20px 70px',
        '& table': {
            marginBottom: '20px',
        },
        '& th': {
            textAlign: 'left'
        },
        '& td:first-child': {
            width: '150px'
        }
    },
    transactions: {
        margin: '20px 70px',
    },
    transactionData: {
        fontSize: '12px'
    },
    hash: {
        fontSize: '11px'
    },
    individualTransactions: {
        border: 'solid 2px pink',
        margin: '10px auto',
        width: '100%'
    },
    input: {
        display: 'inline-block',
        '& table': {
            margin: '10px 0px',
            tableLayout: 'fixed',
            width: '100%'
        },
        '& td': {
            wordWrap: 'break-word',
        },
    },
    out: {
        display: 'inline-block',
        '& table': {
            margin: '10px 0px',
            tableLayout: 'fixed',
            width: '100%'
        },
        '& td': {
            wordWrap: 'break-word',
        }
    },
    inArrow: {
        width: '50px',
    },
    outArrow: {
        width: '50px',
    },
})

const style = injectSheet(styleSheet)

class SearchPage extends PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            address: '1LuckyR1fFHEsXYyx5QK4UFzv3PEAepPMK'
        }
    }

    updateAddress = (value) => {
        this.setState({ address: value })
    }

    renderInputs = (hash, inputs) => {
        const { classes } = this.props;
        return (<div className={classes.input}>
            {inputs.map((input) => {
                let addr_tag = (<a href={input.prev_out.addr_tag_link}>{`(${input.prev_out.addr_tag})`}</a>)
                return (
                <table className={classes.inputTable}>
                    <tr>
                        <td>{input.prev_out.addr} {input.prev_out.addr_tag ? addr_tag : ''}</td>
                        <td className={classes.inArrow}><img src={greenArrow}/></td>
                        <td>{hash}</td>
                        <td>{(input.prev_out.value * 0.00000001).toFixed(8)}</td>
                    </tr>
                </table>)
            })}
        </div>)
    }

    renderOuts = (hash, outs) => {
        const { classes } = this.props;
        return (<div className={classes.out}>
            {outs.map((out) => {
                let addr_tag = (<a href={out.addr_tag_link}>{`(${out.addr_tag})`}</a>)
                return(
                <table className={classes.outTable}>
                    <tr>
                        <td>{hash}</td>
                        <td className={classes.outArrow}><img src={redArrow}/></td>
                        <td>{out.addr} {out.addr_tag ? addr_tag : ''}</td>
                        <td>{(out.value * 0.00000001).toFixed(8)}</td>
                    </tr>
                </table>)
            })}
        </div>);
    }

    renderTransactions = (transaction) => {
        const { classes } = this.props;
        let inputs;
        let outputs;

        if(transaction.inputs.length) {
            inputs = this.renderInputs(transaction.hash, transaction.inputs)
        }

        if(transaction.out.length) {
            outputs = this.renderOuts(transaction.hash, transaction.out)
        }

        return(<div className={classes.individualTransactions}>
            <h3>HASH: {transaction.hash}</h3>
            <h3>INPUTS</h3>
            {inputs}
            <h3>OUTPUTS</h3>
            {outputs}
        </div>)
    }

    render() {
        const { searchAddress, classes, search } = this.props;
        const { address } = this.state;

        console.log('final result from reducers', search)
        //1LuckyR1fFHEsXYyx5QK4UFzv3PEAepPMK

        return(
            <div className={classes.container}>
                <div className={classes.header}>
                    <img className={classes.logo} src={BlockchainLogo} />
                </div>
                <div className={classes.searchBar}>
                    <input type="text" placeholder="Lookup bitcoin addresses..." onChange={({target: {value}})=>this.updateAddress(value)}/>
                    <button className={classes.searchButton} onClick={() => searchAddress(address)}><img src={SearchIcon} /></button>
                </div>
                {search.results && <div className={classes.results}>
                    <table>
                        <tr>
                            <th>Summary</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>Address</td>
                            <td>{search.results.address}</td>
                        </tr>
                        <tr>
                            <td>Hash 160</td>
                            <td>{search.results.hash160}</td>
                        </tr>
                    </table>
                    <table>
                        <tr>
                            <th>Transactions</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>No. Transactions</td>
                            <td>{search.results.n_tx}</td>
                        </tr>
                        <tr>
                            <td>Total Received</td>
                            <td>{search.results.total_received}</td>
                        </tr>
                        <tr>
                            <td>Final Balance</td>
                            <td>{search.results.final_balance * 0.00000001}</td>
                        </tr>
                    </table>
                </div>}
                {search.results && <div className={classes.transactions}>
                    <h3>Transactions</h3>
                    <div className={classes.transactionData}>
                        {search.results.txs.map((transaction) => this.renderTransactions(transaction))}
                    </div>
                </div>}
            </div>
        )
    }
}

SearchPage.propTypes = {
}

SearchPage.defaultProps = {
}

export default compose(
    style,
    pure
)(SearchPage)