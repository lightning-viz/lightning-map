'use strict';
var LightningVisualization = require('lightning-visualization');
var Datamaps = require('datamaps-all-browserify');
var $ = require('jquery');
var _ = require('lodash');
var colorbrewer = require('colorbrewer');
var utils = require('lightning-client-utils');
var d3 = require('d3');


var Visualization = LightningVisualization.extend({

    defaultColormap: 'Purples',

    init: function() {
        this.$el = $(this.selector).first();
        this.$el.append('<div id="map-container"></div>');
        this.render();
    },

    render: function() {
        var width = this.width
        var height = this.height
        var data = this.data
        var selector = this.selector

        var regions = data.regions
        var values = data.values

        var self = this

        var dataObj = {};
        var fills = {
            defaultFill: '#ddd'
        };

        // if the data keys are of length 3, this
        // should be treated as a world map
        var isWorld = _.every(regions, function(v) {
            return v.length === 3;
        });

        var z = self.scaleColors(values, 8, data.colormap)

        _.each(regions, function(reg, i) {
            var c = z(values[i]);
            fills[c] = c;
            dataObj[reg] = {
                fillKey: c,
                value: values[i]
            };
        });

        var map = new Datamap({
            element: self.$el.find('#map-container')[0],
            height: height,
            width: width,
            scope: (isWorld) ? 'world' : 'usa',
            fills: fills,
            data: dataObj,
            geographyConfig: {

                popupTemplate: function(geography, data) { //this function should just return a string
                    //if(data) {
                    //    return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong><br/>' + data.value + '</div>';
                    //}
                    //return '<div class="hoverinfo"><strong>' + geography.properties.name + '</strong></div>';
                },
                highlightBorderColor: '#fff',
                highlightFillColor: 'rgb(150,150,150)',
            }

        });

        this.map = map

    },

    scaleColors: function(values, n, colormap) {
        var min = d3.min(values)
        var max = d3.max(values)
        var distinct = _.uniq(values).length
        if (distinct > 8) {
            distinct = 8
        }
        var cmap
        if (colormap == "Lightning") {
            cmap = utils.getColors(distinct)
        } else {
            cmap = colorbrewer[colormap][distinct]
        }
        var zdomain = d3.range(n).map(function(d) {return d * (max - min) / (distinct - 1) + min})
        var z = d3.scale.linear().domain(zdomain).range(cmap);
        return z
    },

    formatData: function(data) {
        data.colormap = data.colormap ? data.colormap : this.defaultColormap
        return data
    }

    // updateData: function(formattedData) {
    //     this.data = formattedData;
    //     // TODO: re-render the visualization
    // },

    // appendData: function(formattedData) {
    //     // TODO: update this.data to include the newly
    //     //       added formattedData

    //     // TODO: re-render the visualization
    // }

});


module.exports = Visualization;
