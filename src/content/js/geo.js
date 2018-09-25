class ThreePointCurve {
    constructor(p1, p2) {
        this.P = [p1, null, null, p2]

        Object.defineProperties(this, {
            "P1": {
                get: function () {
                    return this.P[0];
                },
                set: function (v) {
                    this.P[0] = v;
                }
            },
            "P2": {
                get: function () {
                    return this.P[1];
                },
                set: function (v) {
                    this.P[1] = v;
                }
            }
        })
    }
}

class Vec{
    constructor(p1,p2){        
        this.P1 = p1;
        this.P2 = p2;
    }

    static render(canvas,vec){
        let g = cavas.append("g");
        let line = g.append("line")
        .attr("stroke","#f39c12")
        .attr("stroke-width","2")
        .attr("x1",vec.P1[0])
        .attr("y1",vec.P1[1])
        .attr("x2",vec.P2[0])
        .attr("y2",vec.P2[1])

        g.append("circle").attr("fill","#3498db")
        .attr("cx",vec.P1[0])
        .attr("cy",vec.P1[1])
        .attr("r","10")

        g.append("circle").attr("fill","#3498db")
        .attr("cx",vec.P2[0])
        .attr("cy",vec.P2[1])
        .attr("r","10")


        
        
    }
}


