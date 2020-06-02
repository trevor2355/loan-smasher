import React from 'react';
import ReoccurringLoanInfo from './ReoccurringLoanInfo.jsx'
import { render } from 'react-dom';

class Loan extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      moreInfoDisplayed: false
    }
    this.toggleMoreInfo = this.toggleMoreInfo.bind(this);
  }
  
  toggleMoreInfo() {
    var isDisplayed = this.state.moreInfoDisplayed;
    this.setState({
      moreInfoDisplayed: !isDisplayed
    })
  }

  render() {
    var toggleElement;
    var addReoccurringButton;
    if (this.state.moreInfoDisplayed) {
      toggleElement = <div className='info-toggle' onClick={this.toggleMoreInfo}>Less info △</div>;
      addReoccurringButton = <button>Add a reoccurring increase to Loan +</button>
    } else {
      toggleElement = <div className='info-toggle' onClick={this.toggleMoreInfo}>More info ▽</div>
    }
    var reoccurringLoanInfo;
    if (this.props.loan.reoccurringLoanInfo && this.state.moreInfoDisplayed) {
      reoccurringLoanInfo = this.props.loan.reoccurringLoanInfo.map(info => {
        return (
          <ReoccurringLoanInfo key={info.id} info={info} handleLoanInput={this.props.handleLoanInput}/>
        )
      })
    }
    return (
      <div className='loan' className='loan-container' id={this.props.loan.id}>
        <div className='loan-card'> 
          <h4>Loan {this.props.loan.description}</h4>
          <div>
            <span>Loan {this.props.loan.id}: </span>
            <input type='text' onChange={this.props.handleLoanInput} className='amount' value={this.props.loan.amount} placeholder='Ex: 250'></input>
          </div>
          <div>
            <span>Description: </span>
            <input type='text' onChange={this.props.handleLoanInput} className='description' value={this.props.loan.description} placeholder='optional...' ></input>
          </div>
          <div>
            <span>Interest Rate: </span>
            <input type='text' onChange={this.props.handleLoanInput} className='interestRate' value={this.props.loan.interestRate} placeholder='Ex: .075'></input>
          </div>
          {toggleElement}
          {reoccurringLoanInfo}
          {addReoccurringButton}
        </div>
      </div>
    )
  }
}

export default Loan