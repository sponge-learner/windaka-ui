!function (t) {
  "function" == typeof define && define.amd ? define(t) : t()
}(function () {
  "use strict";
  function t(t, i) {
    this._tmpRender = i;
    this._canvas = t = "string" == typeof t ? document.getElementById(t) : t,
      this._ctx = t.getContext("2d"),
      this._width = t.width,
      this._height = t.height,
      this._weight = 5,
      this._outlineWidth = 1,
      this._outlineColor = "black",
      this._min = 0,
      this._max = 1,
      this._data = [],
      this._tmpImage = {},
      this.gradient({
        0: "green",
        .5: "yellow",
        1: "red"
      })
  }
  var l = {
    clipSegment: function (t, i, e, n, o) {
      var h, s, r, a = n ? this._lastCode : BM.LineUtil._getBitCode(t, e), l = BM.LineUtil._getBitCode(i, e);
      for (this._lastCode = l; ;) {
        if (!(a | l))
          return [t, i];
        if (a & l)
          return !1;
        h = a || l,
          s = BM.LineUtil._getEdgeIntersection(t, i, h, e, o),
          r = BM.LineUtil._getBitCode(s, e),
          h === a ? (s.z = t.z,
            t = s,
            a = r) : (s.z = i.z,
              i = s,
              l = r)
      }
    }
  };
  t.prototype = {
    width: function (t) {
      return this._width = t,
        this
    },
    url: function (t) {
      return this._url = t,
        this
    },
    offset: function (t) {
      return this._offset = t,
        this
    },
    height: function (t) {
      return this._height = t,
        this
    },
    weight: function (t) {
      return this._weight = t,
        this
    },
    outlineWidth: function (t) {
      return this._outlineWidth = t,
        this
    },
    outlineColor: function (t) {
      return this._outlineColor = t,
        this
    },
    gradient: function (t) {
      var i, e = document.createElement("canvas"), n = e.getContext("2d"), o = n.createLinearGradient(0, 0, 0, 256);
      for (i in e.width = 1,
        e.height = 256,
        t)
        o.addColorStop(i, t[i]);
      return n.fillStyle = o,
        n.fillRect(0, 0, 1, 256),
        this._palette = n.getImageData(0, 0, 1, 256).data,
        this
    },
    min: function (t) {
      return this._min = t,
        this
    },
    max: function (t) {
      return this._max = t,
        this
    },
    data: function (t) {
      return this._data = t,
        this
    },
    add: function (t) {
      return this._data.push(t),
        this
    },
    draw: function () {
      var t = this._ctx;
      return t.globalCompositeOperation = "source-over",
        t.lineCap = "round",
        this._drawOutline(t),
        this._drawHotline(t),
        this
    },
    getRGBForValue: function (t) {
      t = Math.min(Math.max((t - this._min) / (this._max - this._min), 0), .999),
        t = 4 * Math.floor(256 * t);
      return [this._palette[t], this._palette[1 + t], this._palette[2 + t]]
    },
    _drawOutline: function (t) {
      var i, e, n, o, h, s, r;
      if (this._outlineWidth)
        for (i = 0,
          n = this._data.length; i < n; i++)
          for (o = this._data[i],
            t.lineWidth = this._weight + 2 * this._outlineWidth,
            e = 1,
            h = o.length; e < h; e++)
            s = o[e - 1],
              r = o[e],
              t.strokeStyle = this._outlineColor,
              t.beginPath(),
              t.moveTo(s.x, s.y),
              t.lineTo(r.x, r.y),
              t.stroke()
    },
    _calcImagePath(i, e, t, n) {
      let o = [];
      n = n || 0;
      var h = Math.sqrt(Math.pow(i.x - e.x, 2) + Math.pow(i.y - e.y, 2))
        , s = this._offset || 60
        , r = Math.floor(h / s);
      for (let t = n = 0; t <= r; t++)
        o.push([i.x + t / r * (e.x - i.x), i.y + t / r * (e.y - i.y)]);
      return n = h % s,
      {
        path: o,
        offset: n
      }
    },
    _drawHotline: function (e) {
      var t, n, i, o, h, s, r, a, l, u, _ = 0;
      e.lineWidth = this._weight;
      let d = this._url;
      if (d && !this._tmpImage[d]) {
        let t = new Image;
        t.src = d,
          this._tmpImage[d] = [t, !1, []],
          t.onload = () => {
            this._tmpImage[d][1] = !0,
              this._tmpRender._update()
          }
      }
      for (t = 0,
        i = this._data.length; t < i; t++)
        for (n = 1,
          h = (o = this._data[t]).length; n < h; n++) {
          s = o[n - 1],
            r = o[n],
            a = e.createLinearGradient(s.x, s.y, r.x, r.y),
            l = this.getRGBForValue(s.z),
            u = this.getRGBForValue(r.z),
            a.addColorStop(0, "rgb(" + l.join(",") + ")"),
            a.addColorStop(1, "rgb(" + u.join(",") + ")"),
            e.strokeStyle = a,
            e.beginPath(),
            e.moveTo(s.x, s.y),
            e.lineTo(r.x, r.y),
            e.stroke();
          let i = Math.atan((r.y - s.y) / (r.x - s.x));
          if (r.x - s.x < 0 && (i += Math.PI),
            this._tmpImage[d][1]) {
            let t = this._calcImagePath(s, r, i, _);
            _ = t.offset,
              t.path.map(t => {
                e.save(),
                  e.translate(t[0], t[1]),
                  e.rotate(i),
                  e.drawImage(this._tmpImage[d][0], -this._weight / 2, -this._weight / 2, this._weight, this._weight),
                  e.restore()
              }
              )
          }
        }
    }
  };
  function i(t) {
    return BM.Browser.canvas ? new e(t) : null
  }
  var e = BM.Canvas.extend({
    _initContainer: function () {
      BM.Canvas.prototype._initContainer.call(this),
        this._hotline = new t(this._container, this)
    },
    _update: function () {
      BM.Canvas.prototype._update.call(this),
        this._hotline.width(this._container.width),
        this._hotline.height(this._container.height)
    },
    _updatePoly: function (t) {
      var i;
      !this._drawing || (i = t._parts).length && (this._updateOptions(t),
        this._hotline.data(i).draw())
    },
    _updateOptions: function (t) {
      null != t.options.min && this._hotline.min(t.options.min),
        null != t.options.max && this._hotline.max(t.options.max),
        null != t.options.url && this._hotline.url(t.options.url),
        null != t.options.weight && this._hotline.weight(t.options.weight),
        null != t.options.outlineWidth && this._hotline.outlineWidth(t.options.outlineWidth),
        null != t.options.outlineColor && this._hotline.outlineColor(t.options.outlineColor),
        t.options.gradient && this._hotline.gradient(t.options.gradient),
        t.options.offset && this._hotline.offset(t.options.offset)
    }
  });
  BM.Hotline = BM.Polyline.extend({
    statics: {
      Renderer: e,
      renderer: i
    },
    options: {
      renderer: i(),
      min: 0,
      max: 1,
      gradient: {
        0: "green",
        .5: "yellow",
        1: "red"
      },
      weight: 5,
      outlineColor: "black",
      outlineWidth: 1
    },
    _projectLatlngs: function (t, i, e) {
      var n, o, h = t[0] instanceof BM.LatLng, s = t.length;
      if (h) {
        for (o = [],
          n = 0; n < s; n++)
          o[n] = this._map.latLngToLayerPoint(t[n]),
            o[n].z = t[n].alt || n,
            e.extend(o[n]);
        i.push(o)
      } else
        for (n = 0; n < s; n++)
          this._projectLatlngs(t[n], i, e)
    },
    _clipPoints: function () {
      if (this.options.noClip)
        this._parts = this._rings;
      else {
        this._parts = [];
        for (var t, i, e, n, o = this._parts, h = this._renderer._bounds, s = 0, r = 0, a = this._rings.length; s < a; s++)
          for (t = 0,
            i = (n = this._rings[s]).length; t < i - 1; t++)
            (e = l.clipSegment(n[t], n[t + 1], h, t, !0)) && (o[r] = o[r] || [],
              o[r].push(e[0]),
              e[1] === n[t + 1] && t !== i - 2 || (o[r].push(e[1]),
                r++))
      }
    },
    _clickTolerance: function () {
      return this.options.weight / 2 + this.options.outlineWidth + (BM.Browser.touch ? 10 : 0)
    }
  }),
    BM.hotline = function (t, i) {
      return new BM.Hotline(t, i)
    }
});
