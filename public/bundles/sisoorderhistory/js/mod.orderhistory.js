jQuery.extend(jQuery.fn.dataTableExt.oSort, {
  "numeric-comma-pre": function (a) {
    // we need special handling for DE and other languages
    // For DE currency formatting is like: 31.316,99 €
    // while in English for example it's: €31,316.99
    if ($('html').attr('lang') === 'de') {
      a = (a == "-") ? 0 : a.replace(/<.*?>|\./g, '').replace(',', '.');
    } else {
      a = (a === "-" || a === "") ? 0 : a.replace( /[^\d\-\.]/g, "" );
    }
    return parseFloat(a);
  },

  "numeric-comma-asc": function (a, b) {
    return ((a < b) ? -1 : ((a > b) ? 1 : 0));
  },

  "numeric-comma-desc": function (a, b) {
    return ((a < b) ? 1 : ((a > b) ? -1 : 0));
  },

  "datetime-pre": function (a) {
    var x = 0;
    var dateFormat = SSL.orderhistory.config.dateFormat;
    if (a != "-") {
      var formatParts = [];
      var parts = [];
      if (dateFormat.indexOf("-") > -1) {
        formatParts = dateFormat.split('-');
        parts = a.split('-');
      } else if (dateFormat.indexOf("/") > -1) {
        formatParts = dateFormat.split('/');
        parts = a.split('/');
      } else if (dateFormat.indexOf(".") > -1) {
        formatParts = dateFormat.split('.');
        parts = a.split('.');
      }
      var date = [];
      $.each(formatParts, function (i, j) {
        if (j == 'Y') {
          date[0] = parts[i];
        }
        if (j == 'm') {
          date[1] = parts[i];
        }
        if (j == 'd') {
          date[2] = parts[i];
        }
      });
      x = date.join('');
    }
    return parseFloat(x);
  }
});

SSL = (typeof SSL == "undefined") ? {} : SSL;
SSL.orderhistory = {
  form: $(".js-order-history-form"),
  tableWrapper: $('.js-order-history-table-wrapper'),
  table: $(".js-order-history-table-list"),
  loader: $(".js-order-history-spinner"),
  invoiceWrapper: $(".js-order-history-details-wrapper"),
  listWrapper: $(".js-order-history-list-wrapper"),
  // default config
  config: {
    sort: [],
    sortColumn: [],
    dateFormat: "d.m.Y"
  },
  tableInit: function (table) {
    console.log('init');
    var sort = this.config.sort;
    var sortColumn = this.config.sortColumn;
    var columnDefs = [];
    var disabledColumns = [];

    $.each(sort, function (name, value) {
      if (value == false) {
        disabledColumns.push(name);
      } else {
        columnDefs.push({ "type": value, "targets": name});
      }
    });

    if (disabledColumns.length > 0) {
      columnDefs.push({ "bSortable": false, "targets": disabledColumns });
    }

    var t = table.dataTable({
      "order": sortColumn,
      "lengthChange": false,
      "pageLength": table.data("rows"),
      "language": {
        decimal: ",",
        url: '/bundles/sisoorderhistory/js/vendor/localization/' + $('html').attr('lang') + '.json'
      },
      "fnDrawCallback": function () {
        SSL.orderhistory.linkHandler();
      },
      "columnDefs": columnDefs,
      "dom": "t" +
      "<'row'<'large-4 columns'i><'large-8 columns'p>>"
    });

    // custom search field handling
    $('.js-order-history-custom-search').on('keyup', function () {
      var val = this.value;
      var clear = $('.js-order-history-clear-icon');
      t.api().search(val).draw();
      if (!val) {
        clear.addClass('hide');
      } else {
        clear.removeClass('hide');
      }
    });

    // custom clear button handling
    $('.js-order-history-clear-icon').on('click', function (e) {
      e.preventDefault();
      $(this).addClass('hide');
      $('.js-order-history-custom-search').val('');
      t.api().search('').draw();
    })
  },
  detailsTableInit: function () {
    $(".js-order-history-table-details").dataTable({
      paging: false,
      searching: false,
      ordering: false,
      dom: "t"
    });
  },
  init: function () {
    this.form.on("submit", function () {
      SSL.orderhistory.send();
      return false;
    });
    this.form.on("click", "button[type=submit]", function () {
      SSL.orderhistory.send();
      return false;
    });
    this.form.on("click", ".fdatepicker", function () {
      SSL.orderhistory.hideErrors($(this));
    });
    this.form.on("change", "select", function () {
      SSL.orderhistory.showHideDates();
      SSL.orderhistory.hideErrors(true);
    });

    this.tableInit(this.table);

    // this change triggers hashChange()
    $(document).on('click', '.js-order-history-back', function() {
      window.location.hash = 'list';
    });

    $(window).on("hashchange", function () {
      SSL.orderhistory.hashChange();
    });

    if (!window.location.hash.match(/(^#$)|(^$)/)) {
      var destination = window.location.hash.replace('#', '');
      this.showInvoice(destination);
    }

    // datepicker trigger
    if ($.fn.fdatepicker) {
      $('.js-order-history-trigger-datepicker').on('click', function () {
        $(this).next().find('input').focus();
      });
    }
  },
  send: function () {
    if (!this.validate()) {
      return false;
    }
    SSL.orderhistory.loader.fadeIn();
    var data = SSL.orderhistory.form.serialize();
    $.ajax({
      data: data,
      type: "POST",
      cache: true
    }).success(function (d) {
      SSL.orderhistory.loader.fadeOut();
      if (typeof d['errors'] != "undefined") {
        for (var prop in d['errors']) {
          if (d['errors'].hasOwnProperty(prop)) {
            for (var val in d['errors'][prop]) {
              if (d['errors'][prop].hasOwnProperty(val)) {
                SSL.orderhistory.form.find(".js-" + d['errors'][prop][val] + "-error").fadeIn();
                SSL.orderhistory.form.find("input[name=" + d['errors'][prop][val] + "]").addClass("error");
              }
            }
          }
        }
      } else {
        // on success re-init the table
        SSL.orderhistory.table.DataTable().destroy();
        SSL.orderhistory.tableWrapper.html(d.responseHTML);
        SSL.orderhistory.config.sort = d.listSort;
        SSL.orderhistory.config.sortColumn = d.listSortColumn;
        SSL.orderhistory.tableInit(SSL.orderhistory.tableWrapper.find('table'));
      }
    });
  },
  validate: function () {
    var
        dateFrom = this.form.find(".js-order-history-date-from")
        , dateTo = this.form.find(".js-order-history-date-to")
        , type = this.form.find(".js-order-history-document-type").find('option:selected').val()
        , regex = new RegExp("^(0[1-9]|1[0-9]|2[0-9]|3[01])[.](0[1-9]|1[012])[.][0-9]{4}$")
        , correct = true;

    if (type.indexOf('order') != -1 || dateFrom.val().match(regex)) {
      this.hideErrors(dateFrom);
    } else {
      this.showErrors(dateFrom);
      correct = false;
    }

    if (type.indexOf('order') != -1 || dateTo.val().match(regex)) {
      this.hideErrors(dateTo);
    } else {
      this.showErrors(dateTo);
      correct = false;
    }

    // date comparison
    // currently accepts only DD.MM.YYYY format
    var dFrom = dateFrom.val().split('.');
    var dTo = dateTo.val().split('.');
    var from = new Date(dFrom[2], dFrom[1], dFrom[0]);
    var to = new Date(dTo[2], dTo[1], dTo[0]);

    if (correct && ( from > to )) {
      this.form.find(".js-order-history-dates-invalid").fadeIn();
      correct = false;
    }

    return correct;

  },
  showErrors: function (element) {
    var elementName = element.attr("name");
    element.addClass("error");
    this.form.find(".js-" + elementName + "-error").fadeIn();
  },
  hideErrors: function (element) {
    if (element === true) {
      this.form.find('small.error').fadeOut();
      this.form.find('input.error').removeClass('error');
    } else {
      var elementName = element.attr("name");
      element.removeClass("error");
      this.form.find(".js-" + elementName + "-error").fadeOut();
      this.form.find(".js-order-history-dates-invalid").fadeOut();
    }
  },
  linkHandler: function () {
    $(document).on("click", '.js-order-history-link', function () {
      SSL.orderhistory.loader.fadeIn();
      window.location.hash = $(this).data("href");
      return false;
    });
  },
  showInvoice: function (destination) {
    var self = this;
    //,   formPath = this.form.attr("action");
    $.ajax({
      url: destination,
      dataType: "html"
    })
        .success(function (d) {
          self.invoiceWrapper.html(d);
          self.listWrapper.fadeOut().promise().done(function () {
            self.invoiceWrapper.fadeIn();
            self.detailsTableInit();

            // reinit Foundation
            if (typeof Foundation !== 'undefined') {
              $(document).foundation();
            }
          });
          SSL.orderhistory.loader.fadeOut();
        });
  },
  showList: function () {
    var self = this;
    self.invoiceWrapper.fadeOut().promise().done(function () {
      // re-calc table
      //$.fn.dataTable
      //    .tables( { visible: false, api: true } )
      //    .columns.adjust()
      //    .responsive.rebuild()
      //    .responsive.recalc();

      self.listWrapper.fadeIn();
      SSL.orderhistory.loader.fadeOut();
    });
  },
  hashChange: function () {
    SSL.orderhistory.loader.fadeIn();
    var self = this
        , hash = window.location.hash
        , destination;
    if (hash.match(/(^#$)|(^$)|(^#list)/)) {
      self.showList();
    } else {
      destination = hash.replace('#', '');
      self.showInvoice(destination);
    }
  },
  showHideDates: function () {
    var div = this.form.find('.fdatepicker').parent().parent('div')
        , opt = this.form.find('option:selected');
    if (opt.val() == "backgoog_order") {
      div.fadeOut();
    } else {
      div.fadeIn();
    }
  }
};
$(function () {
  SSL.orderhistory.init();
});
