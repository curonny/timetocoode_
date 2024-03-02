odoo.define("account_invoices_reports.OWLAccountMoveReports", function (require) {
  "use strict";

  const AbstractAction = require("web.AbstractAction");
  const core = require("web.core");
  const rpc = require("web.rpc");
  const {Component} = owl;
  const {ComponentWrapper, WidgetAdapterMixin} = require("web.OwlCompatibility");
  const {useState} = owl.hooks;
  const ajax = require("web.ajax");

  class OWLAccountMoveReports extends Component {

    constructor(...args) {
      super(...args);
      this.state = useState({
        report_name: "Invoices report",
        show: true,
        searchValue: "",
        allInvoicesData : []
      });
    }
    setup() {
      this.model = "account.move";
    }

    async willStart() {
      var self = this;
      self.getInvoices();
    }

    getInvoices() {
    var self = this;
         ajax
        .jsonRpc("/invoice_data", "call", {})
        .then(function (data) {
          self.parseData(data);
        });
    }

    validateInvoice(ev) {
        var self = this;
        ev.stopPropagation();
        if(ev.currentTarget.dataset.id) {
        var invoice_id  = ev.currentTarget.dataset.id;
           console.log(ev.currentTarget.dataset.id)
            rpc
        .query({
          model: self.model,
          method: "validate_invoice_from_report",
          args: [[parseInt(invoice_id, 10)]],
        })
        .then(function (result) {
          self.getInvoices();
        });
        }
    }

    toggleStateLineShow(ev) {
        var self = this;
        ev.stopPropagation();
        if(ev.currentTarget.dataset.id) {
          self.updateItem({show_on_report : !self.getLocationByIdFromArray(self.state.allInvoicesData, parseInt(ev.currentTarget.dataset.id, 10)).show_on_report}, parseInt(ev.currentTarget.dataset.id, 10));

        }
    }

    parseData(data) {
      var self = this;
      self.state.allInvoicesData = data.invoices;
      console.log(self.state.allInvoicesData);
    }

    _onSearchInput(ev) {
      var self = this;
      self.state.searchValue = ev.target.value.trim().toLowerCase();
      self.refreshItems(self.state.searchValue);
    }

    getLocationByIdFromArray(items, id) {
      return items.find((item) => item.id === parseInt(id, 10));
    }

    getInvovicesInfo(searchValue = "") {
      var self = this;
      rpc
        .query({
          model: self.model,
          method: "search_read",
        })
        .then(function (stockLocationData) {
        });
    }


    refreshItems(string = "") {
      this.getInvoices();
    }

    toggleStateGeneralShow() {
//     WHEN THE ICON IS CLICKED THE STATE CHANGE TO THE OPPOSITE VALUE
//AND THE REFRESH ITEMS FUNCTION IS CALLED
      this.state.show = !this.state.show;
      this.refreshItems(this.state.searchValue);
    }

    toggleShow(ev) {
      if (ev.currentTarget.dataset.id) {
        const selectedInvoice = this.getInvoiceByIdFromArray(
          this.state.invoices,
          parseInt(ev.currentTarget.dataset.id, 10)
        );
        this.updateLocation({snooze: !selectedInvoice.show}, selectedInvoice.id);
      }
    }
    updateItem(fields, item_id) {
      var self = this;
      rpc
        .query({
          model: self.model,
          method: "write",
          args: [[item_id], fields],
        })
        .then(function () {
        self.getInvoices();
        });
    }

  }
  OWLAccountMoveReports.template = "account_invoices_reports.OWLAccountMoveReports";
  const ClientAction = AbstractAction.extend(WidgetAdapterMixin, {
    start() {
      const component = new ComponentWrapper(this, OWLAccountMoveReports);
      return component.mount(this.el.querySelector(".o_content"));
    },
  });
  core.action_registry.add("owl.move_report", ClientAction);
});
