// Project: K-D tree
// Author: Yun-Chen Lee yclee@arch.nycu.edu.tw
// Date: 2024/04/15
// Description:
// 1. Build K-D Tree
// 2. Draw K-D Tree
// 3. Search the Closet Point in K-D Tree
// 4. Find All Sample within Specific Distance

//  --------------------------------------------------
let node_list = []; // save the list of points
let MAX_SIZE = 20; // ths count of points
let tree; // save the K-D tree


//  --------------------------------------------------
//  /* 1 - Build KD Tree */
let k = 2 // (x,y)

// sorting key: compare with x coordinate
function compareX(a, b) {
    if (a.p.x > b.p.x) return 1;
    if (a.p.x < b.p.x) return -1;
    return 0
}

// sorting key: compare with y coordinate
function compareY(a, b) {
    if (a.p.y > b.p.y) return 1;
    if (a.p.y < b.p.y) return -1;
    return 0
}

// build the K-D tree
function build_kdtree(nodes, depth = 0) {

    let N = nodes.length;
    // console.log(N)

    if (N <= 0) return null

    let axis = depth % k;

    let sorted_points;
    if (axis == 0) sorted_points = nodes.sort(compareX)
    else sorted_points = nodes.sort(compareY)

    let n = int(N / 2);

    return {
        'point': sorted_points[n],
        'left': build_kdtree(sorted_points.slice(0, n), depth + 1),
        'right': build_kdtree(sorted_points.slice(n + 1, sorted_points.length), depth + 1)
    }
}


//  --------------------------------------------------
//  /* 2 - Draw K-D Tree */
function draw_kdtree(tree, depth = 0, x0 = 0, x1 = width, y0 = 0, y1 = height) {
    // console.log(tree);

    if (tree != null) {
        let axis = depth % k;
        push();
        if (axis == 0) {
            stroke(255, 160, 20);
            line(tree.point.p.x, y0, tree.point.p.x, y1);
            draw_kdtree(tree.left, depth + 1, x0, tree.point.p.x, y0, y1);
            draw_kdtree(tree.right, depth + 1, tree.point.p.x, x1, y0, y1);
        } else {
            stroke(90, 180, 255);
            line(x0, tree.point.p.y, x1, tree.point.p.y);
            draw_kdtree(tree.left, depth + 1, x0, x1, y0, tree.point.p.y);
            draw_kdtree(tree.right, depth + 1, x0, x1, tree.point.p.y, y1);
        }
        pop();
    }

}


//  --------------------------------------------------
//  /* 3 - Search the Closet Point in K-D Tree */

// // find the closer point
// function closer_distance(pivot, p1, p2) {
//     if (p1 == null) return p2;
//     if (p2 == null) return p1;

//     let d1 = dist(pivot.p.x, pivot.p.y, p1.p.x, p1.p.y);
//     let d2 = dist(pivot.p.x, pivot.p.y, p2.p.x, p2.p.y);

//     if (d1 < d2) {
//         return p1;
//     } else return p2;

// }

// function kdtree_closest_point(root, point, depth = 0) {

//     if (root == null) return null;

//     let axis = depth % k;

//     let next_branch = null;
//     let opposite_branch = null;

//     let pt, rt;
//     if (axis == 0) {
//         pt = point.p.x;
//         rt = root.point.p.x;
//     } else {
//         pt = point.p.y;
//         rt = root.point.p.y;
//     }

//     if (pt < rt) {
//         next_branch = root.left;
//         opposite_branch = root.right;
//     } else {
//         next_branch = root.right;
//         opposite_branch = root.left;
//     }

//     let best = closer_distance(point, kdtree_closest_point(next_branch, point, depth + 1), root.point);

//     if (dist(point.p.x, point.p.y, best.p.x, best.p.y) > abs(pt - rt)) {
//         best = closer_distance(point, kdtree_closest_point(opposite_branch, point, depth + 1), best)
//     }

//     // console.log(best)
//     return best
// }


//  --------------------------------------------------
//  /* 4 - Find all sample within specific distance */
function kdtree_points_within_distance(root, point, r, depth = 0, result = []) {
    if (root == null) return null;

    let axis = depth % k;

    let next_branch = null;
    let opposite_branch = null;

    let pt, rt;
    if (axis == 0) {
        pt = point.p.x;
        rt = root.point.p.x;
    } else {
        pt = point.p.y;
        rt = root.point.p.y;
    }

    if (pt < rt) {
        next_branch = root.left;
        opposite_branch = root.right;
    } else {
        next_branch = root.right;
        opposite_branch = root.left;
    }


    if (r > dist(point.p.x, point.p.y, root.point.p.x, root.point.p.y)) {
        result.push(root.point);
    }
    kdtree_points_within_distance(next_branch, point, r, depth + 1, result);
    // console.log('next: ', root.point.p);

    if (r > abs(pt - rt)) {
        kdtree_points_within_distance(opposite_branch, point, r, depth + 1, result);
        // console.log('oppo: ', root.point.p)
    }

    return result;

}



//  --------------------------------------------------

function setup() {
    createCanvas(600, 600);

    randomSeed(12);

    // create the list of points
    for (let i = 0; i < MAX_SIZE; i++) {
        let n = new Node({});
        node_list.push(n);
    }

    // build K-D tree
    tree = build_kdtree(node_list);
}

function draw() {

    background(40, 45, 50);

    // draw K-D tree
    // -------------------------------
    draw_kdtree(tree);

    // reset points' color
    // -------------------------------
    node_list.forEach(n => {
        n.color_reset();
        // n.draw();
    })


    // draw mouse
    // -------------------------------
    push();
    translate(mouseX, mouseY);
    fill(255);
    noStroke();
    circle(0, 0, 10);
    textSize(11);
    textAlign(CENTER)
    text("(" + mouseX + "," + mouseY + ")", 0, -8);
    pop();


    // find the closest point in K-D tree
    // -------------------------------
    // let piv = new Node({
    //     p: createVector(mouseX, mouseY)
    // })

    // let best = kdtree_closest_point(tree, piv);

    // // draw the line from cloest point to mouse
    // push();
    // translate(best.p.x, best.p.y);
    // fill(255);
    // noStroke();
    // circle(0, 0, 7);
    // pop();

    // push();
    // noFill();
    // stroke(255);
    // strokeWeight(2)
    // line(mouseX, mouseY, best.p.x, best.p.y);
    // pop();



    // find within distance
    // -------------------------------
    let piv = new Node({
        p: createVector(mouseX, mouseY)
    })
    push();
    translate(piv.p.x, piv.p.y);
    let r = 100;
    noFill();
    stroke(255);
    circle(0, 0, 2 * r);
    pop();

    let samples = kdtree_points_within_distance(tree, piv, r);

    if (samples) {
        samples.forEach(s => {
            s.clr = color(249, 117, 131); // pink
        })
    }


    // draw points
    // -------------------------------
    node_list.forEach(n => {
        n.draw();
    })

    // noLoop();
}