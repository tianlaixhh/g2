const expect = require('chai').expect;
const Chart = require('../../../src/chart/chart');

const div = document.createElement('div');
div.id = 'ccharti';
document.body.appendChild(div);

describe('interval', function() {
  const data = [
    { genre: 'Sports', sold: 475 },
    { genre: 'Strategy', sold: 115 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 }
  ];

  const chart = new Chart({
    container: div,
    height: 300,
    width: 500

  });

  it('init', function() {
    chart.interval().position('genre*sold').color('genre');
    chart.source(data);
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 100.4, 240 ]);
  });

  it('transpose', function() {
    chart.coord().transpose();
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 80, 226.8 ]);
  });

  it('polar', function() {

    chart.coord('polar');
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 250, 130 ]);
  });

  it('polar transpose', function() {
    chart.coord('polar').transpose();
    chart.repaint();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(data.length);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 250, 130 ]);
  });

  it('stack', function() {
    const newData = [
      { genre: 'Sports', sold: 475, type: '1' },
      { genre: 'Strategy', sold: 115, type: '1' },
      { genre: 'Action', sold: 120, type: '1' },
      { genre: 'Shooter', sold: 350, type: '1' },
      { genre: 'Other', sold: 150, type: '1' },

      { genre: 'Sports', sold: 145, type: '2' },
      { genre: 'Strategy', sold: 415, type: '2' },
      { genre: 'Action', sold: 180, type: '2' },
      { genre: 'Shooter', sold: 50, type: '2' },
      { genre: 'Other', sold: 120, type: '2' }
    ];
    chart.clear();
    chart.coord();
    chart.source(newData);
    chart.interval().position('genre*sold', 'stack').color('type');
    chart.render();

    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(newData.length);
    const firstPath = group.getFirst().attr('path');
    const nextPath = group.get('children')[5].attr('path');
    expect(nextPath[1][1]).eqls(firstPath[0][1]);
    expect(nextPath[1][2]).eqls(firstPath[0][2]);
  });

  it('dodge', function() {
    chart.clear();
    chart.interval().position('genre*sold', 'dodge').color('type');
    chart.render();
    const group = chart.get('viewContainer').getFirst();
    expect(group.getCount()).equal(10);
    const first = group.getFirst();
    expect(first.attr('path')[0]).eqls([ 'M', 94.45, 240 ]);
  });

  it('stack and dodge', function() {

  });

});