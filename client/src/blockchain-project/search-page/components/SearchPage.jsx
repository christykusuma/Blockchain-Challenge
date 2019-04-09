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
    mainHash: {
        fontWeight: 'bold'
    },
    individualTransactions: {
        border: 'solid 2px pink',
        margin: '10px auto',
        width: '100%'
    },
    individualTransaction: {
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
    arrow: {
        width: '50px',
        textAlign: 'center'
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

    renderIndividualTransactions = (transaction) => {
        const { classes } = this.props;
        let addr_tag = transaction.addr_tag ? (<a href={transaction.addr_tag_link}>{`(${transaction.addr_tag})`}</a>) : '';
        let isOut = transaction.type === 'out' ? true : false;
        let arrow = isOut ? redArrow : greenArrow;
        return (<div className={classes.individualTransaction}>
            <table className={classes.individualTable}>
                <tr>
                    <td className={classes.mainHash} colspan='3'>{transaction.hash}</td>
                    <td>{transaction.tx_index}</td>
                </tr>
                <tr>
                    <td>{isOut ? transaction.hash : transaction.addr} {isOut ? '' : addr_tag}</td>
                    <td className={classes.arrow}><img src={arrow}/></td>
                    <td>{isOut ? transaction.addr : transaction.hash} {isOut ? addr_tag : ''}</td>
                    <td>{(transaction.value * 0.00000001).toFixed(8)}</td>
                </tr>
            </table>
        </div>);   
    }

    parseTransaction = (hash, data, type) => {
        const object = {};
        if(type === 'out') {
            object['hash'] = hash;
            object['type'] = 'out';
            object['addr'] = data.addr
            object['addr_tag'] = data.addr_tag || null
            object['addr_tag_link'] = data.addr_tag_link || null
            object['tx_index'] = data.tx_index
            object['value'] = data.value
        } else {
            object['hash'] = hash;
            object['type'] = 'input';
            object['addr'] = data.prev_out.addr
            object['addr_tag'] = data.prev_out.addr_tag || null
            object['addr_tag_link'] = data.prev_out.addr_tag_link || null
            object['tx_index'] = data.prev_out.tx_index
            object['value'] = data.prev_out.value  
        }
        return object;
    }

    mergeTransactions = (transactions) => {
        let transactionsArray = [];

        // go through each transaction
        transactions.map(transaction => {
           let hash = transaction['hash'];
           transaction.inputs.length && transaction.inputs.map(input => {
                transactionsArray.push(this.parseTransaction(hash, input, 'input'))
            })
            transaction.out.length && transaction.out.map(out => {
                transactionsArray.push(this.parseTransaction(hash, out, 'out'))
            })
        })

        console.log('transactionsArray', transactionsArray);
        transactionsArray.sort((a, b) => {
            return b.tx_index - a.tx_index
        })
        return transactionsArray;
    }

    renderTransactions = (transactions) => {
        const { classes } = this.props;
        let mergedTransactions = this.mergeTransactions(transactions);

        return(<div className={classes.individualTransactions}>
            {mergedTransactions.map(transaction => this.renderIndividualTransactions(transaction))}
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
                            <td>{search.results.total_received * 0.00000001} BTC</td>
                        </tr>
                        <tr>
                            <td>Final Balance</td>
                            <td>{search.results.final_balance * 0.00000001} BTC</td>
                        </tr>
                    </table>
                </div>}
                {search.results && <div className={classes.transactions}>
                    <h3>Transactions</h3>
                    <div className={classes.transactionData}>
                        {this.renderTransactions(search.results.txs)}
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