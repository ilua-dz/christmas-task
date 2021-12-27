const _0x2f6ca4 = _0x59dd;
function _0x19a1() {
  const _0x3a56e0 = [
    'color',
    'multicolor',
    '7cRCzHU',
    'target',
    'height',
    'width',
    '.garland-btns',
    'className',
    'style',
    'deg)\x20translate(',
    '1521894KLEeqb',
    'dataset',
    'classList',
    '140wBvFZJ',
    'append',
    'lightrope',
    'rotate(',
    'click',
    'createElement',
    '2674920gypwoN',
    'log',
    'checked',
    'addEventListener',
    '10DnWFQx',
    '1192691bCUFwO',
    '680eHmaca',
    '1267698MGoueg',
    'querySelector',
    '110571cXNJFa',
    '.garland-tree-container',
    '2480QGgWNT',
    'transform',
    '.onoffswitch-checkbox',
    'deg)',
    '4925421OHpzGs',
    'innerHTML',
  ];
  _0x19a1 = function () {
    return _0x3a56e0;
  };
  return _0x19a1();
}
(function (_0x4be0af, _0x61813d) {
  const _0x165809 = _0x59dd,
    _0x277bc4 = _0x4be0af();
  while (!![]) {
    try {
      const _0x560a41 =
        parseInt(_0x165809(0x1eb)) / 0x1 +
        (parseInt(_0x165809(0x1ea)) / 0x2) *
          (parseInt(_0x165809(0x1ef)) / 0x3) +
        (-parseInt(_0x165809(0x1f1)) / 0x4) *
          (-parseInt(_0x165809(0x1ec)) / 0x5) +
        (parseInt(_0x165809(0x1ed)) / 0x6) *
          (parseInt(_0x165809(0x1f9)) / 0x7) +
        parseInt(_0x165809(0x1e6)) / 0x8 +
        parseInt(_0x165809(0x1f5)) / 0x9 +
        (-parseInt(_0x165809(0x204)) / 0xa) *
          (parseInt(_0x165809(0x201)) / 0xb);
      if (_0x560a41 === _0x61813d) break;
      else _0x277bc4['push'](_0x277bc4['shift']());
    } catch (_0x149466) {
      _0x277bc4['push'](_0x277bc4['shift']());
    }
  }
})(_0x19a1, 0x96b29);
const treeContainer = document[_0x2f6ca4(0x1ee)](_0x2f6ca4(0x1f0)),
  switchGarlandСheckbox = document[_0x2f6ca4(0x1ee)](_0x2f6ca4(0x1f3)),
  garlandBtns = document[_0x2f6ca4(0x1ee)](_0x2f6ca4(0x1fd));
let isLight = ![],
  garlandColor = _0x2f6ca4(0x1f8);
function createGarland(_0x5cea2a, _0x77ee34, _0x244e46, _0x5ed552) {
  const _0x13ad7b = _0x2f6ca4,
    _0x36a1f3 = document['createElement']('ul');
  _0x36a1f3[_0x13ad7b(0x203)]['add'](_0x13ad7b(0x1e2)),
    (_0x36a1f3[_0x13ad7b(0x1ff)][_0x13ad7b(0x1fc)] = _0x5cea2a + 'px'),
    (_0x36a1f3['style'][_0x13ad7b(0x1fb)] = _0x5cea2a + 'px');
  const _0x17ee6e = (_0x244e46 - _0x77ee34) / _0x5ed552;
  for (let _0x5b85da = 0x0; _0x5b85da <= _0x17ee6e; _0x5b85da++) {
    const _0x5cf296 = document[_0x13ad7b(0x1e5)]('li');
    (_0x5cf296[_0x13ad7b(0x1fe)] = ''),
      (_0x5cf296['className'] = garlandColor || _0x13ad7b(0x1f8)),
      (_0x5cf296[_0x13ad7b(0x1ff)][_0x13ad7b(0x1f2)] =
        _0x13ad7b(0x1e3) +
        (_0x77ee34 + _0x5ed552 * _0x5b85da) +
        _0x13ad7b(0x200) +
        _0x5cea2a / 0x2 +
        'px)\x20rotate(-' +
        (_0x77ee34 + _0x5ed552 * _0x5b85da) +
        _0x13ad7b(0x1f4)),
      _0x36a1f3[_0x13ad7b(0x1e1)](_0x5cf296);
  }
  treeContainer[_0x13ad7b(0x1e1)](_0x36a1f3);
}
function createGarlands() {
  const _0xa5044e = _0x2f6ca4;
  createGarland(0x78, 0x41, 0x73, 0xc),
    createGarland(0xaa, 0x3c, 0x78, 0xa),
    createGarland(0xe6, 0x3c, 0x78, 0x8),
    createGarland(0x12c, 0x3c, 0x78, 0x6),
    createGarland(0x17c, 0x37, 0x7d, 0x4),
    createGarland(0x1d1, 0x37, 0x7d, 3.5),
    createGarland(0x22b, 0x3a, 0x80, 0x3),
    createGarland(0x28a, 0x3a, 0x80, 2.5),
    (isLight = !![]),
    (switchGarlandСheckbox[_0xa5044e(0x1e8)] = ![]);
}
function clearGarlands() {
  const _0x2af7ee = _0x2f6ca4;
  (treeContainer[_0x2af7ee(0x1f6)] = ''),
    (isLight = ![]),
    (switchGarlandСheckbox[_0x2af7ee(0x1e8)] = !![]);
}
function switchGarland() {
  isLight ? clearGarlands() : createGarlands();
}
function _0x59dd(_0x14103d, _0xd2c24c) {
  const _0x19a111 = _0x19a1();
  return (
    (_0x59dd = function (_0x59dd81, _0x4c0392) {
      _0x59dd81 = _0x59dd81 - 0x1e1;
      let _0x2b9c2a = _0x19a111[_0x59dd81];
      return _0x2b9c2a;
    }),
    _0x59dd(_0x14103d, _0xd2c24c)
  );
}
switchGarlandСheckbox[_0x2f6ca4(0x1e9)]('change', switchGarland);
function switchGarlandColor(_0x226db8) {
  const _0x29f7b2 = _0x2f6ca4;
  (garlandColor =
    _0x226db8[_0x29f7b2(0x1fa)][_0x29f7b2(0x202)][_0x29f7b2(0x1f7)] ||
    'multicolor'),
    clearGarlands(),
    createGarlands(),
    console[_0x29f7b2(0x1e7)](garlandColor);
}
garlandBtns[_0x2f6ca4(0x1e9)](_0x2f6ca4(0x1e4), switchGarlandColor);
