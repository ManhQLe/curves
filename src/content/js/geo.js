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
        this.P = [p1,p2];
        Object.defineProperties(this,{
            "P1":{
                get:function(){return this.P[0]},
                set:function(v){this.P[0] = v}
            },
            "P2":{
                get:function(){return this.P[1]},
                set:function(v){this.P[1] = v}
            }
        })        
    }
    refresh(){
        let g = this.vessel;
        g.select("line")
        .attr("x1",d=>d.P1[0])
        .attr("y1",d=>d.P1[1])
        .attr("x2",d=>d.P2[0])
        .attr("y2",d=>d.P2[1])

        g.selectAll("circle")  
        .data(this.P)      
        .attr("cx",d=>d[0])
        .attr("cy",d=>d[1])
    }
    present(canvas){
        this.vessel = Vec.render(canvas, this);
    }

    static render(canvas,vec){
        let g = d3.select(canvas).append("g");
        g.append("line")
        .datum(vec)
        .attr("stroke","#f39c12")
        .attr("stroke-width","2")
        .attr("x1",d=>d.P1[0])
        .attr("y1",d=>d.P1[1])
        .attr("x2",d=>d.P2[0])
        .attr("y2",d=>d.P2[1])

        g.selectAll("circle")
        .data(vec.P)
        .enter()
        .append("circle").attr("fill",(d,i)=>i?"#e74c3c":"#2980b9")
        .attr("stroke","white")
        .attr("stroke-width",2)
        .attr("cx",d=>d[0])
        .attr("cy",d=>d[1])
        .attr("r",5)
        return g;        
    }
}


