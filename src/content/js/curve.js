function hermiteCurve(n, P1, P2, T1, T2) {
    let ds = 1 / (n - 1)
    let t, s = 0;
    let p = [];
    for (let i = 0; i < n; i++) {
        t = hermite(s)
        p.push([
            t[0] * P1[0] + t[1] * P2[0] + t[2] * T1[0] + t[3] * T2[0],
            t[0] * P1[1] + t[1] * P2[1] + t[2] * T1[1] + t[3] * T2[1]
        ])
        s += ds;
    }
    return p;
}
//Tagent
/* 
    h1(t) =  6t^2 - 6t 
    h2(t) = -6t^2 + 6t
    h3(t) =  3t^2 - 4t + 1
    h4(t) =  3t^2 - 2t
*/
function optimizePathFromData(b) {
    let d = [];
    let b1 = b[0];
    d.push(`M ${b1[0]} ${b1[1]}`)
    for (let i = 1; i < b.length; i += 3) {
        let b1 = b[i];
        let b2 = b[i + 1];
        let b3 = b[i + 2];
        d.push(`C${b1[0]} ${b1[1]}, ${b2[0]} ${b2[1]}, ${b3[0]} ${b3[1]}`)
    }
    return d.join("")
}

function hermite(t) {
    return [
        2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1,
        -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2),
        Math.pow(t, 3) - 2 * Math.pow(t, 2) + t,
        Math.pow(t, 3) - Math.pow(t, 2)
    ]
}


function Hermite2Bezier(P0, T0, P1, T1) {
    let onethird = 1/3;
    return [
        [P0[0], P0[1]],
        [P0[0] + onethird * T0[0], P0[1] + onethird * T0[1]],
        [P1[0] - onethird * T1[0], P1[1] - onethird * T1[1]],
        [P1[0], P1[1]]
    ];
}


function ToBezier(points, c) {
    let len = points.length;
    let b = [];
    for (let i = 0; i < len-1; i++) {
        let p = points[i];
        let i1 = i+1;
        let i2 = i+2;
        i1 = i1<len?i1:(len-1);
        i2 = i2<len?i2:(len-1);

        let pprev = points[i ? i - 1 : i];
        let pnext = points[i1]
        let t1 = [c * (pnext[0] - pprev[0]), c * (pnext[1] - pprev[1])]
        let pnnext = points[i2]
        let t2 = [c * (pnnext[0] - p[0]), c * (pnnext[1] - p[1])]

        b.push(...Hermite2Bezier(p,t1,pnext,t2));

    }
    return b;
}

function ToBezierOptimize(points, c) {
    let len = points.length;
    let b = [];
    for (let i = 0; i < len-1; i++) {
        let p = points[i];
        let i1 = i+1;
        let i2 = i+2;
        i1 = i1<len?i1:(len-1);
        i2 = i2<len?i2:(len-1);

        let pprev = points[i ? i - 1 : i];
        let pnext = points[i1]
        let t1 = [c * (pnext[0] - pprev[0]), c * (pnext[1] - pprev[1])]
        let pnnext = points[i2]
        let t2 = [c * (pnnext[0] - p[0]), c * (pnnext[1] - p[1])]

        let o = Hermite2Bezier(p,t1,pnext,t2)
        b.push(o[0],o[1],o[2])        
        if(i===len-2)
            b.push(o[3])
    }
    return b;
}