import React, { Component } from 'react';
import sortList from 'common/sortable';
import { getRandomString } from '../multi-input/part';

export default class List extends Component {
  constructor(props) {
    super(props);
    this.listId = getRandomString();
    this.$list = null;
    this.$item = null;
  }

   componentDidMount() {
    let sortId = `#${this.listId}`;
    this.$list = $(sortId);
    if (this.props.sortable) {
      sortList({
        element: sortId,
        itemSelector: "li",
        ajax: false,
      }, (data) => {
        //@TODO需优化成React的组件
        $(sortId).children().remove();
        $(sortId).append(this.$item);
        this.context.sortItem(data);
      });
      this.onChange(sortId);
    }
  }

  onChange(sortId) {
    //sortList操作了真实的DOM需要还原；
    this.$list.on('mousedown', 'li', () => {
      this.$item = $(sortId).children('.list-group-item');
    })
  }

  render() {
    const { dataSourceUi } = this.props;
    let name = '';
    if( dataSourceUi.length > 0 ) {
      name = 'list-group';
    }
    return (
      <ul id={this.listId} className={`multi-list sortable-list ${name} ${this.props.listClassName}`}>
      {
        dataSourceUi.map( (item,i) => {
          return (
            <li className="list-group-item" id={item.itemId} key={i} data-seq={item.seq}>
              { this.props.sortable && <i className="es-icon es-icon-yidong mrl color-gray inline-block vertical-middle"></i> }
              <img className="avatar-sm avatar-sm-square mrm" src ={item.avatar}/> 
              <span className="label-name text-overflow inline-block vertical-middle">{ item.nickname }</span>
              <label className = { this.props.showCheckbox ? '' :'hidden' }><input type="checkbox" checked={item.isVisible} onChange= {event=>this.context.onChecked(event)} value={item.itemId}/>显示</label>
              <a className={this.props.showDeleteBtn ? 'pull-right link-gray mtm' :'hidden' } onClick={event=>this.context.removeItem(event)} data-item-id={item.itemId}>
                <i className = "es-icon es-icon-close01 text-12"></i>
              </a>
              <input type="hidden" name="ids[]" value={ item.id }/>   
            </li>
          )
        })
      }
      </ul>
    )
  }
};

List.contextTypes = {
  removeItem: React.PropTypes.func,
  sortItem: React.PropTypes.func,
  onChecked:React.PropTypes.func,
};