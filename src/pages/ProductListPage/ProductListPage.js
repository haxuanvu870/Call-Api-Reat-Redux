import React, { Component } from "react";
import { connect } from "react-redux";
import ProductList from "./../../components/ProductList/ProductList";
import ProductItem from "./../../components/ProductItem/ProductItem";
import { Link } from "react-router-dom";
import {actFetchProductsRequest, actDeleteProductsRequest} from "./../../actions/index";

class ProductListPage extends Component {
  
  componentDidMount() {
    
      this.props.fetchAllProducts()
  }
  onDelete = (id) => {
    this.props.onDeleteProduct(id);
    
  };
  
  render() {

    var {products} = this.props;

    return (
      <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <Link to="/product/add" className="btn btn-info mb-10">
          Thêm sản phẩm
        </Link>

        <ProductList>{this.showProducts(products)}</ProductList>
      </div>
    );
  }
  showProducts = (products) => {
    var result = <tr></tr>;
    if (products.length > 0) {
      result = products.map((product, index) => {
        return (
          <ProductItem
            onDelete={this.onDelete}
            key={index}
            product={product}
            index={index}
          />
        );
      });
    }
    return result;
  };
}
const mapStateToProps = (state) => {
  return {
    products: state.products,
  };
};
const mapDispatchToState = (dispatch, props) => {
  return {
    fetchAllProducts: () => {
      dispatch(actFetchProductsRequest());
    },
    onDeleteProduct: (id) => {
      dispatch(actDeleteProductsRequest(id));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToState)(ProductListPage);
