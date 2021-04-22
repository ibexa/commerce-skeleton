jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "numeric-comma-pre": function (a) {
        var x = (a == "-") ? 0 : a.replace(/<.*?>|\./g, '').replace(',', '.');
        return parseFloat(x);
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
    form: $("form#form"),
    tableWrapper: $('.js-order-history-wrapper'),
    table: $("#order_table_list"),
    loader: $("#order_history_loader"),
    invoiceWrapper: $("#invoice_wrapper"),
    listWrapper: $("#list_wrapper"),
    // default config
    config: {
        sort: [],
        sortColumn: [],
        dateFormat: "d.m.Y"
    },
    tableInit: function (table) {
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

        table.dataTable({
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
            "columnDefs": columnDefs
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
        this.form.on("click", ".datepicker", function () {
            SSL.orderhistory.hideErrors($(this));
        });
        this.form.on("change", "select", function () {
            SSL.orderhistory.showHideDates();
            SSL.orderhistory.hideErrors(true);
        });

        this.tableInit(this.table);

        $(window).on("hashchange", function () {
            SSL.orderhistory.hashChange();
        });
        if (!window.location.hash.match(/(^#$)|(^$)/)) {
            var destination = window.location.hash.replace('#', '');
            this.showInvoice(destination);
        }
    },
    send: function () {
//        if(!this.validate()) {
//            return false;
//        }
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
                    for (var val in d['errors'][prop]) {
                        SSL.orderhistory.form.find("span#" + d['errors'][prop][val] + "_error").fadeIn();
                        SSL.orderhistory.form.find("input[name=" + d['errors'][prop][val] + "]").addClass("error");
                    }
                }
            } else {

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
            dateFrom = this.form.find("#orders_from")
            , dateTo = this.form.find("#orders_to")
            , type = this.form.find("#orders_type").find('option:selected').val()
            , regex = new RegExp("^(19|20)([0-9]{2})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$")
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

        if (correct && (dateFrom.val().replace('-', '') > dateTo.val().replace('-', ''))) {
            this.form.find("#orders_generic_error").fadeIn();
            correct = false;
        }

        return correct;

    },
    showErrors: function (element) {
        var elementName = element.attr("name");
        element.addClass("error");
        this.form.find("span#" + elementName + "_error").fadeIn();
    },
    hideErrors: function (element) {
        if (element === true) {
            this.form.find('span.error').fadeOut();
            this.form.find('input.error').removeClass('error');
        } else {
            var elementName = element.attr("name");
            element.removeClass("error");
            this.form.find("span#" + elementName + "_error").fadeOut();
            this.form.find("#order_generic_error").fadeOut();
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
        var self = this
            , formPath = this.form.attr("action");
        $.ajax({
            url: destination,
            dataType: "html"
        })
            .success(function (d) {
                self.invoiceWrapper.html(d);
                self.listWrapper.fadeOut().promise().done(function () {
                    self.invoiceWrapper.fadeIn();
                });
                SSL.orderhistory.loader.fadeOut();
                //phalanxInit.objHoplite['basket'] = new hopliteBasket({path: formPath});
            });
    },
    showList: function () {
        var self = this;
        self.invoiceWrapper.fadeOut().promise().done(function () {
            self.listWrapper.fadeIn();
        });
    },
    hashChange: function () {
        var self = this
            , hash = window.location.hash
            , destination;
        if (hash.match(/(^#$)|(^$)/)) {
            self.showList();
        } else {
            destination = hash.replace('#', '');
            self.showInvoice(destination);
        }
    },
    showHideDates: function () {
        var self = this
            , div = this.form.find('.datepicker').parent().parent('div')
            , opt = this.form.find('option:selected');
        if (opt.val() == "back_order") {
            div.fadeOut();
        } else {
            div.fadeIn();
        }
    }
};
$(function () {
    SSL.orderhistory.init();
});