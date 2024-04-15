# K-D Tree (find all samples with specific distance) 
* Project: K-D tree
* Author: Yun-Chen Lee yclee@arch.nycu.edu.tw
* Date: 2024/04/15
* Description:
  ```
  1. Build K-D Tree
  2. Draw K-D Tree
  3. Search the Closet Point in K-D Tree
  4. Find All Sample within Specific Distance
  ```

  ![image](https://github.com/yunchen-lee/2024_0415_p5_K-DTree_searchWithinDistance/blob/main/ref.gif)

---
## pseudocode
```
function kdtree_points_within_distance(root, point, r, depth = 0, result = [])
    if the root is empty -> end recursion
    check the axis of root (x or y)
    compare whether point is to the left or right of root, set the next branch and opposite branch to check
    if root within radius r -> add root to result
    check next branch
    if the distance from point th the axis of root is larger than radius, mean the searching range should cover oppisite branch:
      check opposite branch
```

```
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
```
