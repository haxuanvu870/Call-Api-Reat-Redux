import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  actAddProductRequest,
  actGetProductRequest,
  actUpdateProductRequest,
} from "./../../actions/index";
import { connect } from "react-redux";

class ProductActionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      txtName: "",
      txtPrice: "",
      chkbStatus: true,
    };
  }
  componentDidMount() {
    var { match } = this.props;
    if (match) {
      var id = match.params.id;

      this.props.onEditProduct(id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.itemEditing) {
      var { itemEditing } = nextProps;

      this.setState({
        id: itemEditing.id,
        txtName: itemEditing.name,
        txtPrice: itemEditing.price,
        chkbStatus: itemEditing.status,
      });
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value,
    });
  };
  onSave = (e) => {
    e.preventDefault();
    var { id, txtName, txtPrice, chkbStatus } = this.state;
    var { history } = this.props;
    var product = {
      id: id,
      name: txtName,
      price: txtPrice,
      status: chkbStatus,
    };
    if (id) {
      this.props.onUpdateProduct(product);
    } else {
      this.props.onAddProduct(product);
    }
    history.goBack();
  };
  render() {
    var { txtName, txtPrice, chkbStatus } = this.state;

    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Tên sản phẩm</label>
            <input
              value={txtName}
              type="text"
              name="txtName"
              className="form-control"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Giá</label>
            <input
              value={txtPrice}
              type="number"
              name="txtPrice"
              className="form-control"
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Trạng thái</label>

            <div className="checkbox">
              <label>
                <input
                  value={chkbStatus}
                  type="checkbox"
                  name="chkbStatus"
                  //   defaultChecked
                  onChange={this.onChange}
                  checked={chkbStatus}
                />
                Còn hàng
              </label>
              {/* <label>
                         <input type="checkbox" name=""  value=""/>
                         Hết hàng
                     </label> */}
            </div>
          </div>
          <button type="submit" className="btn btn-primary mr-5">
            Thêm mới
          </button>
          <Link to="/product-list" className="btn btn-default">
            Trở lại
          </Link>
        </form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    itemEditing: state.itemEditing,
  };
};
const mapDispathToProps = (dispatch, props) => {
  return {
    onAddProduct: (product) => {
      dispatch(actAddProductRequest(product));
    },
    onEditProduct: (id) => {
      dispatch(actGetProductRequest(id));
    },
    onUpdateProduct: (product) => {
      dispatch(actUpdateProductRequest(product));
    },
  };
};
export default connect(mapStateToProps, mapDispathToProps)(ProductActionPage);
