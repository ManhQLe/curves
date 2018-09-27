class Curve {
    constructor(agr) {        
        this._agr = {...agr}
        this.D = [null,null,null,null];

        Object.defineProperties(this, {
            "P1": {
                get: function () {
                    return this.D[0];
                },
                set: function (v) {
                    this.D[0] = v;
                    this.refresh();
                }
            },
            "P2": {
                get: function () {
                    return this.D[1];
                },
                set: function (v) {
                    this.D[1] = v;
                    this.refresh();
                }
            },
            "T1": {
                get: function () {
                    return this.D[2];
                },
                set: function (v) {
                    this.D[2] = v;
                    this.refresh();
                }
            },
            "T2": {
                get: function () {
                    return this.D[3];
                },
                set: function (v) {
                    this.D[3] = v;
                    this.refresh();
                }
            }
        })
        
        this.present(this._agr.reality);        
    }
    present(canvas){
        let g = this.vessel = d3.select(canvas).append("g");
        g.append("path")
        .datum(this)
        .attr("stroke","#16a085")
        .attr("stroke-width",2)
    }

    refresh(){

        let g = this.vessel;
        g.select("path")
        .attr("d",d=>{
            let {P1,T1,P2,T2} = d;
            if(P2 && P1 && T1){
                T2 || vec2.sub(T2,P2,P1)
                let b = Hermite2Bezier(P1,T1,P2,T2);
                return optimizePathFromData(b);
            }
          
        })
    }
}

class Vec{
    constructor(agr){    
        this._agr = {...agr};
        this.P = [this._agr.P1,this._agr.P2];
        Object.defineProperties(this,{
            "P1":{
                get:function(){return this.D[0]},
                set:function(v){this.D[0] = v}
            },
            "P2":{
                get:function(){return this.D[1]},
                set:function(v){this.D[1] = v}
            }
        }) 
        this.present(this._agr.reality);
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


