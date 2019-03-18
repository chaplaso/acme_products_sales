import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Link, Route} from 'react-router-dom'
import axios  from 'axios'




class App extends React.Component{
    constructor(){
        super()
        this.state = {
            navBar: ["HOME", "PRODUCT", "SALE", "CREATE"],
            product: []
        }
    }

    componentDidMount(){
        //const {navBar, product} =
        axios.get('/product').then((Alldata)=>{
            console.log(Alldata.data)
            const result = Alldata.data.map((elem)=> (elem))
            console.log( result)
            this.setState({product: result})
        })
    }


    render(){
        const {match} = this.props
        const {navBar, product} = this.state
        if (navBar.length || product.length > 0) {
            //console.log(product)
        
        return (
            //console.log(product)
            <HashRouter>
                <React.Fragment>
                    <Nav navBar={navBar}/>
                    <Route exact path= {["/product", "/sale"]} render={({match})=> <Product product={product} match={match}/>} />
                    <Route exact path="/create" render={()=> <CreateForm />} />
                    
                </React.Fragment>
            </HashRouter>

        )
        } else { return null}
    }
}

const Nav = (props) => {
    console.log(props)
    console.log(props.navBar)
    return (
        <ul className="nav nav-tabs"> {props.navBar.map((elem, i)=> <li key={i} className="nav-item"> <a className="nav-link" href={'#/' + elem}> {elem} </a> </li>)}</ul>
    )
}

const Product = ({product, match}) => {
    console.log(typeof match.path)
    
    return (
   
        <ul className="list-group"> 
            

            { product.map((elem, i)=> { 
                if(elem.discount > 0 && match.path === "/sale" ){
                    return <ElementItem key = {i} elem={elem}/>
                }
                else if (match.path === "/product"){
                    return <ElementItem key ={i} elem={elem}/>
                }
                })
            
            }
        </ul>
    
       
    )
}

const ElementItem = ({elem}) => {

    return (
        <li className="list-group-item">{elem.name} <br/>
            <span> ${elem.price} </span> <br/>
            
            { elem.discount > 0 ?
                
                <div>
                    <span className=" badge badge-success"> { elem.discount}%</span>
                </div> : null
                
            }  
            <span className=" badge badge-success"> {elem.availability}</span> <br/>
            <button className="btn btn-danger btn-sm">Delete</button> 
        </li>

    )
}

class CreateForm extends React.Component{
    constructor(){
        super()
        this.state = {
            name: "",
            price: "",
            discount:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    

    handleChange (ev){ 

        this.setState({[ev.name]: ev.target.value})
        console.log(ev.target.value)
    }

    handleSubmit(){
        this.handleChange()
        const data = this.state
        console.log(data)
        axios.put("/create", data)
        .then((success)=>{
            this.setState({...success})
            componentDidMount()

        })
    }

    render(){
        //console.log("rendered")
        const {name, price, discount} = this.state
        return (
            
            <form>
                <div>
                <label htmlFor="Name"> Name</label><br/>
                <input type="text" name="Name" className="form-control" onChange={this.handleChange}></input>
                </div>

                <div>
                <label htmlFor="Price">Price</label><br/>
                <input type="text" name="Price" className="form-control" onChange={this.handleChange}></input>
                </div>
                <div>
                <label htmlFor="Discount"> Discoun Percentage</label><br/>
                <input type="text" name="Discount" className="form-control" onChange={this.handleChange}></input>
                </div>
                <br/>
                <button className="btn btn-primary" onClick={this.handleSubmit}>Create</button>

            </form>

        )
    }

}

export default App