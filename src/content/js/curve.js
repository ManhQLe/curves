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

function hermite(t) {
    return [
        2 * Math.pow(t, 3) - 3 * Math.pow(t, 2) + 1,
        -2 * Math.pow(t, 3) + 3 * Math.pow(t, 2),
        Math.pow(t, 3) - 2 * Math.pow(t, 2) + t,
        Math.pow(t, 3) - Math.pow(t, 2)
    ]
}


function Hermite2Bezier(P0,T0, P1,T1){
    return [
        [P0[0], P0[1]],
        [P0[0] + (1 / 3) * T0[0], P0[1] + (1 / 3) * T0[1]],
        [P1[0] - (1 / 3) * T1[0], P1[1] - (1 / 3) * T1[1]],
        [P1[0], P1[1]]
];
}
