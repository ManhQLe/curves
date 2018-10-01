


class BCurve {
    constructor(agr) {
        this._agr = { ...agr
        }
        this.D = [agr.P1, agr.P2, agr.T1, agr.T2];

        Object.defineProperties(this, {
            "P1": {
                get: function () {
                    return this.D[0];
                },
                set: function (v) {
                    this.D[0] = v;
                }
            },
            "P2": {
                get: function () {
                    return this.D[1];
                },
                set: function (v) {
                    this.D[1] = v;
                }
            },
            "T1": {
                get: function () {
                    return this.D[2];
                },
                set: function (v) {
                    this.D[2] = v;
                }
            },
            "T2": {
                get: function () {
                    return this.D[3];
                },
                set: function (v) {
                    this.D[3] = v;
                }
            }
        })

        this.present(this._agr.reality);
    }
    present(canvas) {
        let g = this.vessel = d3.select(canvas).append("g");
        g.append("path")
            .datum(this)
            .attr("stroke", "#e74c3c")
            .attr("stroke-width", 2)
            .attr("fill", "none")
    }

    refresh() {
        let {
            P1,
            P2,
            T1,
            T2
        } = this;
        if (P1 && P2 && T1 && T2) {
            let M1 = [0, 0],
                M2 = [0, 0]

            vec2.add(M1, P1, T1)
            vec2.add(M2, P2, T2)

            let g = this.vessel;
            g.select("path")
                .attr("d", d => {
                    return optimizePathFromData([P1, M1, M2, P2]);
                })
        }
    }
}

class Curve {
    constructor(agr) {
        this._agr = { ...agr
        }
        this.D = [agr.P1, agr.P2, agr.T1, agr.T2];

        Object.defineProperties(this, {
            "P1": {
                get: function () {
                    return this.D[0];
                },
                set: function (v) {
                    this.D[0] = v;
                }
            },
            "P2": {
                get: function () {
                    return this.D[1];
                },
                set: function (v) {
                    this.D[1] = v;
                }
            },
            "T1": {
                get: function () {
                    return this.D[2];
                },
                set: function (v) {
                    this.D[2] = v;
                }
            },
            "T2": {
                get: function () {
                    return this.D[3];
                },
                set: function (v) {
                    this.D[3] = v;
                }
            }
        })

        this.present(this._agr.reality);
    }
    present(canvas) {
        let g = this.vessel = d3.select(canvas).append("g");
        g.append("path")
            .datum(this)
            .attr("stroke", "#16a085")
            .attr("stroke-width", 2)
            .attr("fill", "none")
    }

    refresh() {

        let g = this.vessel;
        g.select("path")
            .attr("d", d => {
                let {
                    P1,
                    T1,
                    P2,
                    T2
                } = d;
                if (P2 && P1 && T1) {
                    T2 || vec2.sub(T2, P2, P1)
                    let b = Hermite2Bezier(P1, T1, P2, T2);
                    return optimizePathFromData(b);
                }

            })
    }
}

class Vec {
    constructor(agr) {
        this._agr = { ...agr
        };
        this.D = [this._agr.P1, this._agr.P2];
        Object.defineProperties(this, {
            "P1": {
                get: function () {
                    return this.D[0]
                },
                set: function (v) {
                    this.D[0] = v
                }
            },
            "P2": {
                get: function () {
                    return this.D[1]
                },
                set: function (v) {
                    this.D[1] = v
                }
            }
        })
        this.present(this._agr.reality);
    }
    refresh() {
        let g = this.vessel;
        g.select("line")
            .attr("x1", d => d.P1[0])
            .attr("y1", d => d.P1[1])
            .attr("x2", d => d.P2[0])
            .attr("y2", d => d.P2[1])

        g.selectAll("circle")
            .data(this.D)
            .attr("cx", d => d[0])
            .attr("cy", d => d[1])
    }
    present(canvas) {
        this.vessel = Vec.render(canvas, this);
    }

    static render(canvas, vec) {
        let g = d3.select(canvas).append("g");
        g.append("line")
            .datum(vec)
            .attr("stroke", "#f39c12")
            .attr("stroke-width", "2")
            .attr("x1", d => d.P1[0])
            .attr("y1", d => d.P1[1])
            .attr("x2", d => d.P2[0])
            .attr("y2", d => d.P2[1])

        g.selectAll("circle")
            .data(vec.D)
            .enter()
            .append("circle").attr("fill", (d, i) => i ? "#e74c3c" : "#2980b9")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .attr("cx", d => d[0])
            .attr("cy", d => d[1])
            .attr("r", 5)
        return g;
    }
}