import React from 'react';
import LineItem from './lineitem.jsx';
var axios = require('axios');


export default class Invoice extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: "",
                email: "",
                date: "",
                total: 0,
                lineItemCount: 1,
                lineItemsArray: [{ id: 0, desc: "", amount: 0 }]
            };
            this._bind("onNameChange", "onEmailChange", "onDateChange", "addLineItem", "saveData")
        }

        render () {
            var style = {
                background: "#eee",
                padding: "20px"
            };
            let lineItemsUI = [];
            for (var i = 0; i < this.state.lineItemsArray.length; i += 1)
            {
              lineItemsUI.push( < LineItem handleAmountChange = { this.handleAmountChange.bind(this) } id = { i }/>);
            };
                return (
                  <div >
                    <div className = "form-group" >
                      <label className = "control-label col-sm-2" > Name:
                    < /label>
                    <input className = "form-control"
                    type = "text"
                    name = "name"
                    onChange = { this.onNameChange } value = { this.state.name } className = "inputFields" / >
                    <
                    /div> <
                    div className = "form-group" >
                    <label className = "control-label col-sm-2" > Email: < /label>
                    <input type = "email"
                    className = "form-control"
                    name = "email"
                    onChange = { this.onEmailChange } value = { this.state.email } className = "inputFields" / >
                    <
                    /div> <
                    div className = "form-group" >
                    <
                    label className = "control-label col-sm-2" > Due Date: < /label>
                    <input className = "form-control"
                    type = "date"
                    name = "date"
                    onChange = { this.onDateChange } value = { this.state.date } className = "inputFields" / >
                    <
                    /div> <
                    div className = "form-group" >
                    <
                    div className = "row" >
                    <
                    div className = "col-lg-6" >
                    <
                    label className = "control-label col-sm-2"> Description < /label> <
                    /div> <
                    div className = "col-lg-6" >
                    <
                    label className = "control-label col-sm-2"> Amount < /label> <
                    /div> <
                    /div> { lineItemsUI } <
                    /div> <
                    div >
                    <
                    img src = "/src/assets/Add.jpg"
                    width = "50"
                    height = "42"
                    className = "imgStyle"
                    onClick = { this.addLineItem.bind(this) }
                    /> <
                    /div>
                    <div>
                    <
                    label className = "font-weight-bold" >
                    TOTAL {'  '}   ${ this.state.total } <
                    /label> <
                    /div> <
                    div >
                    <
                    button type = "button" className = "btn btn-primary font-weight-bold"
                    onClick = { this.saveData } > SEND < /button> <
                    /div> <
                    /div>
                );
            }
            _bind(...methods) {
                methods.forEach(method => this[method] = this[method].bind(this));
            }

            onNameChange(event) {
                this.setState({
                    name: event.target.value
                });
            }

            onEmailChange(event) {
                this.setState({
                    email: event.target.value
                });
            }

            onDateChange(event) {
                this.setState({
                    date: event.target.value
                });
            }

            saveData() {
                axios.post('http://localhost:4000/invoice/create', { name: this.state.name, email: this.state.email, date: this.state.date, total: this.state.total })
                    .then(function(response) {
                        alert('Invoice created!')
                        window.location.reload();
                    });
            }

            handleAmountChange(id, desc, amt) {
                let totalAmt = 0;
                let tempArray = this.state.lineItemsArray;
                this.state.lineItemsArray.forEach(function(amountObj) {
                    if (id === amountObj.id) {
                        if (amt === "") {
                            amt = 0;
                        }
                        amountObj.amount = amt;
                        amountObj.desc = desc;
                    }
                    totalAmt += parseFloat(amountObj.amount);
                });
                this.setState({
                    total: totalAmt,
                    lineItemsArray: tempArray
                });
            }

            addLineItem() {
                this.setState({
                    lineItemCount: this.state.lineItemCount + 1
                });
                this.state.lineItemsArray.push({ id: this.state.lineItemCount, amount: 0 });
            }
        }
