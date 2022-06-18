sci
======
### science library 

science library similar to scipy library of python including matrix, solver, interpolate.

Install
------

```bash
$ npm install sci
```

Usage
------

### matrix
------

#### `matrix.mulScalarVec(a, u)`

returns `array`

scalar multipulation of vector, a*u
* a : type of float , scalar 
* v : type of array , vector

#### `matrix.normailizeVec(v)`

returns `array`

normalize vectors whose length is 1
* v : type of array , vector 

#### `matrix.addVec(...v)`

returns `array`

add some vectors,  v1 + v2 + ... + vn
* v1 : type of array , vector 
* v2 : type of array , vector
* vn : type of array , vector


#### `matrix.subVec(u, v)`

returns `array`

subtractions of two vectors, u - v
* u : type of array , vector 
* v : type of array , vector

#### `matrix.absVec(u)`

returns `float`

absolution of vector, |u|
* u : type of array , vector 

#### `matrix.innerProductVec(u, v)`

returns `float`

inner product of two vectors, (u,v)
* u : type of array , vector 
* v : type of array , vector 

#### `matrix.vectorProduct(u, v)`

returns `array`

vector product of two 3D vectors, (u,v)
* u : type of array , vector 
* v : type of array , vector 


#### `matrix.transpose(A)`

returns `double array`

transpose matrix, AT
* A : type of double array , matrix 

#### `matrix.unitMat(n)`

returns `double array`

make unit matrix, E
* n : type of integer , length of unit matrix 

#### `matrix.mulScalarMat(a, A)`

returns `double array`

slacar multipulation of matrix, a*A
* a : type of float , scalar 
* A : type of double array , matrix 

#### `matrix.addMatMat(A, B)`

returns `double array`

addtion of tow matrix, A + B
* A : type of double array , matrix 
* B : type of double array , matrix 

#### `matrix.subMatMat(A, B)`

returns `double array`

subtraction of tow matrix, A - B
* A : type of double array , matrix 
* B : type of double array , matrix 

#### `matrix.mulMatMat(A, B)`

returns `double array`

multipulation of tow matrix, AB
* A : type of double array , matrix 
* B : type of double array , matrix 

#### `matrix.directSum(matrixList)`

returns `double array`

make direct sum matrix from a list of matrixes, 
* matrixList : type of array of double array , matrix list 


#### `matrix.invMat(A)`

returns `double array`

inverse matrix, invA
* A : type of double array , matrix 

#### `matrix.mulMatVec(A, u)`

returns `array`

multipulation of matrix and column vector, Av
* A : type of double array , matrix 
* v : type of double array , column vector 


### quaternion
------

#### `quaternion.makeQuaternion(v, theta)`

return `array` // [v[0]*sin(theta/2), v[1]*sin(theta/2), v[2]*sin(theta/2), cos(theta/2)]

makes quaternion from 3D vector and rotational angle [rad]
* v: type of array , [x, y, z]
* theta: type of float // radian

#### `quaternion.makeQuaternion(v, theta)`

return `array` // [v[0]*sin(theta/2), v[1]*sin(theta/2), v[2]*sin(theta/2), cos(theta/2)]

makes quaternion from 3D vector and rotational angle [rad]
* v: type of array , [x, y, z]
* theta: type of float // radian

#### `quaternion.invQuaternion(q)`

return `array` // [-q[0], -q[1], -v[2], q[3]]

makes inverse of quaternion 
* q: type of array , quaternion

#### `quaternion.mulQQ(...qList)`

return `array` // quaternion

multiplies quaternions in order  
* qlist: type of array , list of quaternion


### geometry
------

#### `geometry.checkCross(a1, a2, b1, b2)`

returns `boolean`

check cross of segement a1-a2 and segment b1 -b2
* a1 : type of array , [x, y] 
* a2 : type of array , [x, y]
* b1 : type of array , [x, y] 
* b2 : type of array , [x, y]

#### `geometry.getCrossPoint(a1, a2, b1, b2)`

returns `array` //[x, y]

calculate cross point of line a1 -a2 and b1 - b2
* a1 : type of array , [x, y] 
* a2 : type of array , [x, y]
* b1 : type of array , [x, y] 
* b2 : type of array , [x, y]

#### `geometry.offset(l, normalizedCubicspline)`

returns `function`

make offset curve function
* l : type of float ,  // offset length 
* normalizedCubicspline: type of function , // equal to return of interpolate.normalizedCubicspline

return function is (t) => array of float [x, y] // 0 <= t <= 1

#### `geometry.getCrossPointOfCurves(t0, t1, s0, s1, curveFuncT, curveFuncS [, maxIteration=10, tolerance=1E-5])`

returns `array` // [t, s]

get cross point of curveFuncT between t0 and t1 , and curveFuncS between s0 and s1
* t0 : type of float ,  // 0 <= t0 < t1 <=1 
* t1 : type of float ,  // 0 <= t0 < t1 <=1 
* s0 : type of float ,  // 0 <= s0 < s1 <=1 
* s1 : type of float ,  // 0 <= s0 < s1 <=1 

* curveFuncT: type of function , // (t) => [x(t), y[t]]
* curveFuncS: type of function , // (s) => [x(s), y[s]]

#### `geometry.getStrictSelfCrossPoints(curveFunc, [, N=100, tolerance=1E-5])`

returns `double array` // [[t0, s0], [t1, s1], ... , [tn, sn]]

get cross points of self curve
* curveFunc : type of function ,  // 0 <= t <=1 , (t)=> [x(t), y(t)] 
* N : type of integer ,        // devisions of curve
* tolerance : type of float ,  // iteration tolerance

### `geometry.getPointObject(p, normalizedSpline)`

returns `object` 

```
{
    point: "double array", // position vector at p on the spline curve
    tangent: "double array", // tangent vectorat p on the spline curve
    normal: "double array", // normal vectorat p on the spline curve
}
```
get position , tangent and normal vector at p on the normalized spline curve
* p : type of float ,  // 0 <= t <=1  
* normalizedSpline : type of object ,  // refer to interpolate.normalizedCubicspline

### `geometry.getDistance(P, dP, S)`

returns `float` // distance form the line represented as position vector P and direction vector dP to the point S 

get distance from the line to the point
* P : type of array ,  [x, y] // position vector on the line 
* dP : type of array , [dx, dy] // direction vector of the line
* S : type of array, [x, y] // the target point mesured distance from th line

### `geometry.checkCrossOfVectorAndCurve(P, dP, normalizedSpline)`

returns `boolean` // true or false 

check cross of vector and normalized spline curve
* P : type of array ,  [x, y] // position vector on the line 
* dP : type of array , [dx, dy] // direction vector of the line
* normalizedSpline :  type of object ,  // refer to interpolate.normalizedCubicspline

### `geometry.getCrossPointOfVectorAndCurve(P, dP, sSpline, sIni=0, maxIteration=30, tolerance=1E-5)`

returns `object` // true or false 

```
{
    crossFlag: "boolean", // cross or not 
    t: "float", //parameter of normalized spline at the cross point 
    P: P,  // is same as the input P
    dP: dP, // is same as the input P
    magVec: magVec // magnification of dP to the cross point
}
```

get cross point of vector and normalized spline curve
* P : type of array ,  [x, y] // position vector on the line 
* dP : type of array , [dx, dy] // direction vector of the line
* sSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* sIni :  type of float ,  // initial parameter of sSpline to find the cross point
* maxIteration: type of integer, // max iteration to find the cross point
* tolerance : type of float, // tolerance of coincidece of the cross point


### `geometry.getPerdendicularFootOfCurves(p, pSpline, sSpline, sIni=0, maxIteration=30, tolerance=1E-5)`

returns `boolean` // true or false 

```
{
    crossFlag: "boolean", // cross or not 
    t: "float", //parameter of sSpline at the cross point 
    P: "array of float",  // is same as the input P
    dP: "array of float", // is same as the input P
    magVec: "float" // magnification of dP to the cross point
}
```

get perdencular foot from the point represented as p on pSpline to the curve represented as pSpline
* p : type of flpat ,  // parameter of pSpline 
* pSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* sSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* sIni :  type of float ,  // initial parameter of sSpline to find the perdencular foot
* maxIteration: type of integer, // max iteration to find the perdencular foot
* tolerance : type of float, // tolerance of coincidece of the perdencular foot

### `geometry.getCrossPointOfVectors(P, dP, S, dS)`

returns `object` // cross point object 

```
{
    crossFlag: "boolean", // cross or not 
    C: "array of float", //cross point
    mag: "float" // magnifications of dP and dS 
}
```

get the cross point of two lines  
* P : type of array of float ,  [x, y]// position vector of line 1 
* dP :  type of array of float , [dx, dy]  //  direction vector of line 1
* S : type of array of float ,  [x, y]// position vector of line 2 
* dS :  type of array of float , [dx, dy]  //  direction vector of line 2

### `geometry.getCrossPointOfCurveNormals(p, pSpline, s, sSpline)`

returns `object` // cross point object 

```
{
    crossFlag: "boolean",
    Rp:"float", //distance from P to the cross point
    Rs:"float",//distance from P to the cross point
    C:"array of float", // the cross point
    S:"array of float", // the point on sSpline
    P:"array of float",// the point on pSpline
    dS:"array of float", // the normal vector on sSpline
    dP:"array of float",// the normal vector on pSpline
    mag:"array of float" // magnifications of dP and dS
}
```

get the cross point of normals of spline curves 
* P : type of array of float ,  [x, y]// position vector of line 1 
* dP :  type of array of float , [dx, dy]  //  direction vector of line 1
* S : type of array of float ,  [x, y]// position vector of line 2 
* dS :  type of array of float , [dx, dy]  //  direction vector of line 2

### `geometry.getContactCircle(P1, e1, P2, e2)`

returns `object` // contact circle on P1 and the lline dependent on P2 and e2 

```
{
    positive:{ // contact circle at the positive half side as e2 positively points 
      radius: "float" // radius
      center: "array of float", //center of circle
      P1: "array of float", // contact point on line1 that is equal to the argument of P1 
      P3: "array of float",// contact point on line2 dependent on P2 and e2

    },
    negative:{// contact circle at the negative half side as e2 negatively points
      radius: rd,
      center: "array of float", //center of circle
      P1: "array of float", // contact point on line1 that is equal to the argument of P1 
      P3: "array of float", // contact point on line2 dependent on P2 and e2
    } 
}
```

get the cross point of normals of spline curves 
* P1 : type of array of float ,  [x, y]// contact point of line2 
* e1 :  type of array of float , [dx, dy]  //  unit direction vector of line 1
* P2 : type of array of float ,  [x, y] // basic position vector of line 2 
* e2 :  type of array of float , [dx, dy]  //  unit direction vector of line 2

### `geometry.getContactCircleOfTwoSplinesAndOneLine(sp1, sp2, line, t1ini, t2ini)`

returns `object` // contact circle on P1 and the lline dependent on P2 and e2 

```
{
    center: "array of float", //center of circle 
    P1: "array of float", // contact point on the curve of sp1 
    P2: "array of float",// contact point on the curve of sp2
    P3: "array of float",// contact point on the curve of the line
    theta1: "float" // [rad] degree of P1 
    theta2: "float" // [rad] degree of P2
    theta3: "float" // [rad] degree of P3
    radius:  "float" // radius
    t1: t1, // normalized parameter of the contact point of P1
    t2: t2,// normalized parameter of the contact point of P2
}
```

get the contact circle fo two cubic spline curves and one line 

* sp1 : type of function ,  normalized cubic spline function of curve 1 
* sp2 :  type of function ,  normalized cubic spline function of curve 1
* line : type of double array of float , ex. [ [Sx1, Sy1], [Sx2, Sy2] ]  
* t1ini :  type of float , //  normalized paramter from 0 to 1, initial parameter to search contact circle
* t2ini :  type of float , //  normalized paramter from 0 to 1, initial parameter to search contact circle

### `geometry.minDistanceFromPointToCurve(P, sSpline, N=10,　maxIteration=30, tolerance=1E-5)`

returns `object` // minimum distance point 

```
{
    converged: true,
    distance: distance,
    S: S,
    s: s,
}
```

get minimum distance from the point P to spline curve 
* P : type of array of float ,  [x, y]// position vector of line 1 
* sSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* N : type of array of integer ,  // division number of sSpline to find the candidate of minimum distance before iteration 
* maxIteration: type of integer, // max iteration to find the miminum distance
* tolerance : type of float, // tolerance of iteration to find the miminum distance

### `geometry.getFittingCircle(p, pSpline, sSpline,N, maxIteration, tolerance)`

returns `object` // fitting circle 

```
{
    converged:"boolean", // iteration converged or not
    P: "array of float", // the poin at p on pSpline
    S: "array of float", // the poin at s on sSpline
    center: "array of float", the center of fitting circle
    radius: "float", // radius of the fitting circle
    p: p, // parameter of pSpline at contact point
    s: s // parameter of sSpline at contact point
}
```

get the fitting circle of two spline curves. one of contact points is the point P .  
* p : type of flpat ,  // parameter of pSpline 
* pSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* sSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* N : type of array of integer ,  // division number of sSpline to find the candidate of the fitting circle 
* maxIteration: type of integer, // max iteration to find the fitting circle
* tolerance : type of float, // tolerance of iteration to find the fitting circle

### `geometry.getFittingCircles(pSpline, sSpline,divisions, N, maxIteration, tolerance)`

returns `array of object` // fitting circles , fitting circle object is the same as return of getFittingCircle


get the fitting circles of two spline curves.  calculate a fitting circle by a parameter of pSpline (0 <= p <=1)  
* pSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* sSpline :  type of object ,  // normalizedSpline, refer to interpolate.normalizedCubicspline
* divisions: type of integer, // division number of the section [0, 1] of the parameter of pSpline
* N : type of array of integer ,  // division number of sSpline to find the candidate of the fitting circle 
* maxIteration: type of integer, // max iteration to find the fitting circle
* tolerance : type of float, // tolerance of iteration to find the fitting circle

### `geometry.getMinMaxOfList(list, minmax, maxIteration, tolerance)`

returns `object` // minimum or maximum value object

```
{
    converged: "boolean", 
    value: "float", // minimum or maximum valaue
    t: "float", // normalized parameter of minimum or maximum value position in 0 <= t <= 1 
}
```

get the mimimum or maximum value on the spline curve made from list points
* list :  type of array of float ,  // list of values
* minmax :  type of string ,  // "min" or "max". if "min"/"max" , then function returns minimum/maximum value.
* maxIteration: type of integer, // max iteration to find the minimum or maximum value
* tolerance : type of float, // tolerance of iteration to find the minimum or maximum value


### `geometry.bspline(points, degree=3, knots)`

returns `function` // b-spline curve function

```
// 0 <= t <= 1
// k means k th derivative
(t, k) => { 
  // returns x and y coordinates
  return [x, y]
} 
```

get bspline curve from control points , degree of spline and knots
* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]
* degree :  type of interger ,  // degree of b-spline
* knots : type of array of integer// ex. [0, 0, 0, 1, 2, 3,3,3]. it is not necessarily. it will be set as open uniform vector in default

Schoenberg-Whitney conditions
```
 m = n + degree + 1
```
* m : number of knots
* n : number of points
* degree: degree of b-spline

### `geometry.bezier(points)`

returns `function` // bezier curve function

```
// 0 <= t <= 1
(t) => { 
  // returns x and y coordinates
  return [x, y]
} 
```

get bezier curve from control points
* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]

### `geometry.bsplineBasis(knots, degree, normalizedFlag=true)`

returns "function" // whose length is equal to knots' length - degree -1

return's function returns b-spline basis derivative matrix.

* knots: knots vector // ex. [0, 0, 0, 1, 2, 3, 3, 3]
* degree: degeree of bspline // ex. 2 
* normalizedFlag : if true, then argument of bspline basis is normalized from 0 to 1

### `geometry.nurbs(points, degree=3, weights, knots)`

returns "function" // whose argument is normalized from 0 to 1

* points: through points // ex. [ [0,0], [1,3], [3, 4], ...]
* degree: degree of bspline // ex. 3
* weights: weight vector // ex. [1, 1, 1, ...] the length is equal to of points
* knots: knots vector // ex. [0, 0, 0, 1, 2, 3, 3, 3]

needs to satisfy Schoenberg-Whitney conditions

```
 knots.length = points.length + degree + 1
```

### `geometry.getNurbsParameters(points, parameterType="chord", knotType="average")`

returns "object"  // get parameters from through points, degree and so on

```
{
    points: same as the argurmet,
    controlPoints: control points of NURBS curve,
    weights: array filled with 1,
    knots: bepends on knotType,
    bsplineFunctionMatrix: bspline basis function matrix whose column is k th derivative,
    parameters: sampling parameters,
    nurbs : f(t, k=0) NURBS curve function whose argument is normalized from 0 o 1, k means k th derivative
}
```

* points: through points // ex. [ [0,0], [1,3], [3, 4], ...] arbitary dimension points
* parameterTyp: sampling parameter's type // "chord" , "sqrt" or "uniform"
* knotType: knotType // "uniform" , "average" or "natural"

degree of bpline is 3 (user cannot change)

```
 knots.length = points.length + degree + 1
```

### `geometry.getBoundaryConstrainedNurbsParameters(points, e1, e2, parameterType="chord", knotType="average", unitVectorFlag=true)`

returns "object"  // get parameters from through points, degree and so on

```
{
    points: same as the argurmet,
    controlPoints: control points of NURBS curve,
    weights: array filled with 1,
    knots: bepends on knotType,
    bsplineFunctionMatrix: bspline basis function matrix whose column is k th derivative,
    parameters: sampling parameters,
    nurbs : f(t, k=0) NURBS curve function whose argument is normalized from 0 o 1, k means k th derivative
}
```

* points: through points // ex. [ [0,0], [1,3], [3, 4], ...] arbitary dimension points
* e1: start point tangential vector,
* e2: end point tangential vector,
* parameterTyp: sampling parameter's type // "chord" , "sqrt" or "uniform"
* knotType: knotType // "uniform" , "average" or "natural"
* unitVectorFlag: true or false // start and end point tangential vector is unit vector or not

degree of bpline is 3 (user cannot change)

```
 knots.length = points.length + degree + 1
```

### `geometry.calcAreaOfPolygon(points)`

returns `float` // area of polygon

calcuate area of polygon as  points placed counter-clockwise has positive area value and clockwise has negative area value
* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]

### `geometry.calcMomentOfInteriaOfArea(points)`

returns `Object` // moment of interaia of area on center of figure of polygon

```javascript
{
    Ix: "float",
    Ix: "float",
    Ixy: "float",
}
```

calcuate Ix, Iy, Ixy as moment of interia of area for X axis and Y asxis , and product of inertia of area on center of figure 
* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]

### `geometry.calcPrincipalMomentOfInteriaOfArea(points)`

return `Object` // principal moment of interia of area and angle of principal axis

```javascript
{
    Ipx: "float",
    Ipx: "float",
    alpha: "float",
}
```
calcuate Ipx, Ipy, alpha, as principal moment of interia of area for X axis and Y asxis ,and angle of principal axis for X-Y coordinate 

* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]


### `geometry.calcSpecOfPolygon(points)`

return `Object` // area, , center of figure, principal moment of interia of area ...

```javascript
{
    area: "float", // area of polygon. polygon whose points are placed counter-clockwise has positive area value, and clockwise has negative area value
    centroid: "array", // centroid of polygon. [x, y]
    Ix: Ix,  // moment of interia of area for X axis on center of polygon
    Iy: Iy,  //moment of interia of area for X axis on center of polygon
    Ixy: Ixy, //product of interia of area on center of polygon
    Imx: Imx, //moment of interia of area for X axis on origin of x-y coordinate
    Imy: Imy, //moment of interia of area for Y axis on origin of x-y coordinate
    Imxy: Imxy,  //product of interia of area on origin of x-y coordinate
    Ipx: Ipx, / principal moment of interia of area for X axis
    Ipy: Ipy, //principal moment of interia of area for X axis
    alpha: alpha, // angle of principal axis for X -Y coordinate against x-y coordinate
    Xaxis: Xaxis, // unit vector of X axis
    Yaxis: Yaxis, // unit vector of Y axis
}
```

calcuate specification of polygon 

* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]

### `geometry.calcPolyhedronSpecFromSurfaces(surfaceVertices)`

return `Object` // volume, , centroid

```javascript
{
    volume: "float", // volume of polyhedron
    centroid: "array", // centroid of polygon. [x, y, y]
}
```

* surfaceVertices :  type of triple array of float , //array of counter-clockwisely listed surface vertices looked from outside 

input sample: regular cube(10 x 10 x 10)
```
 [
  [ [0, 0, 0], [10,0, 0], [10,0, 10], [0, 0, 10] ],      // surface1
  [ [10, 0, 0], [10, 10, 0], [10,10, 10], [10, 0, 10] ], // surface2
  [ [10, 10, 0], [0,10, 0], [0,10, 10], [10, 10, 10] ],  // surface3
  [ [0, 10, 0], [0,0, 0], [0,0, 10], [0, 10, 10] ],      // surface4
  [ [0, 0, 10], [10,0, 10], [10,10, 10], [0, 10, 10] ],  // surface5
  [ [0, 0, 0], [0,10, 0], [10,10, 0], [10, 0, 0] ],      // surface6
]
```

### `geometry.calcTetrahedronSpecFromVertices(vertices)`

return `Object` // volume, , centroid

```javascript
{
    volume: "float", // volume of tetrahedron
    centroid: "array", // centroid of polygon. [x, y, y]
}
```

* vertices :  type of double array of float , //array of vertices of tetrahedron 

input sample: regular tetrahedron

```javascript
 [
  [0, 10, 0],
  [-5*Math.sqrt(3), -5, 0],
  [5*Math.sqrt(3), -5, 0],
  [0, 0, 10*Math.sqrt(2)],
 ]
```

### `geometry.calcHexahedronSpecFromVertices(vertices)`

return `Object` // volume, , centroid

```javascript
{
    volume: "float", // volume of hexahedron
    centroid: "array", // centroid of polygon. [x, y, y]
}
```

* vertices :  type of double array of float , //array of vertices of hexahedron 

input sample: regular tetrahedron

```javascript
 [
  [0, 0, 10],
  [10, 0, 10],
  [10, 10, 10],
  [0, 10, 10],
  [0, 0, 0],
  [10, 0, 0],
  [10, 10, 0],
  [0, 10, 0],
 ]
```

### `geometry.innerTriangle(triangle, point)`

return `boolean` // point is included in inner of triangle or not

check that  point is included in inner of triangle or not

* triangle :  type of double array of float ,  // [ [x0, y0], [x1, y1], [x2, y2] ]
* point : type of array, // [x, y]


### `geometry.delaunayTriangulation(points)`

return `double array` // array of triangles's points

calcuate triangles of delaunay triangulation 

* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]

### `geometry.DelaunayTriangulation(points)`

return `class` 

calcuate triangles of delaunay triangulation 

#### concstuctor(points)

* points :  type of double array of float ,  // [[x0, y0], [x1, y1], ... ]

#### attributions

* points :  is iqual to argument of points
* numberOfPoints : length of points
* triangles: type of double array of integer involving indices of points// [ [v1, v2, v3],  [v4, v5, v6], ...]
* neighbors: type of double array of integer involving indices of triangles// [[t1, t2, t3], [t4, t5, t6], ...]
* allEdges: type of double array of integer involving indices of edges // [[v1, v2], [v3, v4], ...]
* convexHull: type of array of integer involving indices of counter-clockwise convex hull // [v1, v2, v3,...] 
* neighborPoints: type of array of integer involving indices of neighboring points// [[v1, v2,...], [v5, v6,...],...] 

#### method

* getCoord(list) : returns coordinates corresponding with list of indices
* findTriangle(point) : returns index of triangle including the point
* getBarycentricCoord(triangleId, point): returns barycentric coordinates of point  determined from the given the triangleId


### `geometry.cutLoftByConeAndMakeFillet(sections, path, fillet, config)`

return `triple array` // format is equal to sections

makes a loft along sections,  cuts it by path and makes fillet

* sections :  type of triple array of float ,  // [ [ [x0, y0], [x1, y1], [x2, y2] ],[ [x0, y0], [x1, y1], [x2, y2] ], ...] 
* path : type of object, // {bottom: [[x0,y0], [x1,y1]], top: [[x2,y2], [x3,y3]]}
* fillet: type of object // {bottom: 5, top:5 }
* config: type of object // {bottomFilletDivisions: 5, mainDivisions: 5, topDivisions: 5}




### interpolate
------

#### `interpolate.polyline(x, y)`

returns `object`
```javascript
{
  F:  "function",// (x0, x1) => I,  integrate from x0 to x1
  f:  "function", // (x0) => y,  interpolate at x0 
  df:  "function", // (x0) => dy/dx,  return first derivative at x0 
}
```

interpolates coordinate of y0 from coordinate of x0 by polyline interpolation
* x : type of array , coordinate of x 
* y : type of array , coordinate of y

#### `interpolate.stepLine(x, y)`

returns `function(x0, str="left")`
```javascript
  x0: float,
  str: string // "left" or "right" , default valuse is "left"
```
interpolates coordinate of y0 from coordinate of x0 by step linear interpolation

str means side of step. Ex. left means left side of step and right means right side of step

* x : type of array , coordinate of x 
* y : type of array , coordinate of y

#### `interpolate.cubicspline(x, y [,a0=0, an=0, method="M")`

returns `object of functions`

```javascript
{
  F:  "function",// (x0, x1) => I,  integrate from x0 to x1
  f:  "function", // (x0) => y,  interpolate from x0 to y0
  df:  "function", // (x0) => dy/dx,  return first derivative from x0 
  d2f:  "function", // (x0) => d2y/dx2,  return second derivative from 
  d3f:  "function", // (x0) => d3y/dx3,  return third derivative from x0 
  M: "array of float", // spline parameter,
  h: "array of float", // x directive distance of each points,
}
```

interpolates coordinate of y0 from coordinate of x0 by cubic spline

a0=0, an=0, method="M" is natural cubic spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y
* a0 : type of float , start edge condition, default = 0
* an : type of float ,  end edge condition, default=0
* method: type of string , edge condition option , "M" or "m" , default = "M"
  + "m" : specify first-order differentiation at the start and end points
  + "M" : specify second-order differentiation at the start and end points


#### `interpolate.cubicsplineLinear(x, y [,a0=0, an=0, method="M"])`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by cubic spline and linear interpolate

using spline in range of x and using linear interpolate out range of x (first differentiation is continuous)

a0=0, an=0, method="M" is natural cubic spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y
* a0 : type of float , start edge condition, default = 0
* an : type of float ,  end edge condition, default=0
* method: type of string , edge condition option , "M" or "m" , default = "M"
  + "m" : specify first-order differentiation at the start and end points
  + "M" : specify second-order differentiation at the start and end points

#### `interpolate.cyclicCubicspline(x, y)`

returns `object of functions`

```javascript
{
  F:  "function",// (x0, x1) => I,  integrate from x0 to x1
  f:  "function", // (x0) => y,  interpolate from x0 to y0
  df:  "function", // (x0) => dy/dx,  return first derivative from x0 
  d2f:  "function", // (x0) => d2y/dx2,  return second derivative from 
  d3f:  "function", // (x0) => d3y/dx3,  return third derivative from x0 
  M: "array of float", // spline parameter,
  h: "array of float", // x directive distance of each points,
}
```

interpolates coordinate of y0 from coordinate of x0 by cyclic cubic spline

a0=0, an=0, method="M" is natural cubic spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y


#### `interpolate.areaOfClosedCurve(points, coincidentFlag=true)`

returns `float`

calculate are in closed curve by using cyclic cubic spline 

* points : type of double array , coordinate of [...[x, y]] 
* coincidentFlag : boolean // true supposes that points include the last cylclic point as same as the initial point. 

#### `interpolate.normalizedCubicspline(list, [,cyclicFlag=false])`

returns `object`
```javascript
{
    X: "function", // (t) => x coordinate            //0<= t <=1
    Y: "function", // (t) => y coordinate            //0<= t <=1
    DX: "function", //(t) => x component of tangent  //0<= t <=1
    DY: "function", //(t) => y component of tangent  //0<= t <=1
}
```

interpolates coordinate of y0 from coordinate of x0 by cyclic cubic spline

* list : type of double array ,  [[x0, y0], [x1,y1], ..., [xn, yn]]
* cyclicFlag: type of boolean , if true: cyclic spline , if flase: non-cyclic spline

#### `interpolate.normalize(X, Y)`

returns `function`

normalize parametric X and Y function to (t) => [X(t), Y(t)]

* X : type of function ,  // (t) => X(t)
* Y : type of function ,  // (t) => Y(t)

#### `interpolate.renormalize(t0, t1, normalizedFunc)`

returns `function`

renormalize function 0 <= t <= 1   =>   function t0 <= t <= t1

* t0 : type of float ,  // initial of t   
* t1 : type of float ,  // end of t
* normalizedFunc: type of function , // (t) => [X(t), Y(t)]

#### `interpolate.bspline(x, y [,degree=3, k])`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by b-spline

* x : type of array , coordinate of x 
* y : type of array , coordinate of y
* degree : type of float , degree of spline curve, default = 3
* k : type of array ,  knot vector

if k is empty, uniform knot vector will be set automatically

k.length must be equal to sum of x.length + degree +1

format of return function is (x, k=0) => y // k means k th deferential 

#### `interpolate.bicubicspline(x, y z)`

returns `function`

interpolates coordinate of y0 from coordinate of x0 by bicubic spline

* x : type of array , coordinate of x = x[i] 
* y : type of array , coordinate of y = y[j]
* z : type of double array , z = z[i][j]

When the length of x is m and the length of y is n, z must be double array of m * n

returned function(x0, y0, cx=0, cy=0)
* x0: type of double, x coordinate of interpolate point
* y0: type of double, y coordinate of interpolate point
* cx: type of integer, order of derivative of x (x= 0, 1, 2, 3)
* cy: type of integer, order of derivative of y (y= 0, 1, 2, 3)

#### `interpolate.nongridLinear(points)`

returns `function`

interpolates coordinate of z from coordinates of x and y by linear method

* points : type of double array , //[ [x0, y0, z0], [x1, y1, z1], ... ]


returnes function(P)

  returns z // interpolated value

* P: type of array // [x, y] 

#### `interpolate.cloughTocher2DInterpolator(points)`

returns `function`

interpolates coordinate of z from coordinates of x and y by Clough-Tocher method

* points : type of double array , //[ [x0, y0, z0], [x1, y1, z1], ... ]


returnes function(P)

  returns z // interpolated value

* P: type of array // [x, y] 


### solve
------

#### `solve.linEqGauss(A, v)`

returns `array`

solve simultaneous linear equations by Gauss elimination method 
* A : type of double array , coefficient matrix 
* v : type of array , constant term column vector

#### `solve.LUDecomposition(A, [pivotFlag=true])`

returns `object`
```javascript
{
    L: "double array", //lower triangular matrix
    U: "double array", //upper triangular matrix
    P: "array", //pivoting list
}
```

LU decomposition by Gauss elimination method 
* A : type of double array ,  matrix 
* pivotFlag: type of boolean, if true pivoting is allowed 

#### `solve.LUSolve(L, U, P, Va)`

returns `array`

solve simultanious linear equation of LUx = PVa and returns x
* L : type of double array ,  lower triangular matrix 
* U : type of double array ,  upper triangular matrix 
* P : type of array ,  pivoting list 
* Va : type of array ,  constant term column vector

#### `solve.modifiedCholeskyDecomposition(A, method="skyline")`

returns `object`
```javascript
{
    L: "double array", //lower triangular matrix
    D: "array", //diagonal component of diagonal matrix
    nonZeroListI: "double array",//non-zero row elements in L that
    nonZeroListJ: "double array",//non-zero column elements in L that
}
```

modified Choleskey decomposition
* A : type of double array ,  lower triangular matrix 
* type : type of string ,  "simple", "generalSkyline","skyline"   
  - "simple": is the most simple method and it's for a dense matrix
  - "generalSkyline": is the fast method for a sparse and discrete matrix
  - "skyline": is the fast method for a sparse and continuous matrix

(caution) A must be a symmetric matrix

#### `solve.modifiedCholeskySolve(LDobj, V)`

returns `array`

solve simultanious linear equation of LDLTx = Va and returns x
* LDobj : type of object , return value of modifiedCholeskyDecomposition 
* V: type of array ,  constant term column vector


#### `solve.lineSplitMethod(x0, f, dfdx0, maxIteration, tolerance)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear equation by line split method 
* x0 : type of float , initial value
* f : type of function , nonlinear simultaneous equation
* dfdx0: type of float, first differentiation at x0
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares


#### `solve.asyncLineSplitMethod(x0, f, dfdx0, maxIteration, tolerance)`
returns `object of Promise`

use this function instead of solve.lineSplitMethod when f retuens `promise`

#### `solve.newtonMethod1D(x0, f, df, maxIteration, tolerance)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear equation by 1D netwonMethod
* x0 : type of float , initial value
* f : type of function , target function to solve
* df: type of function, first differentiation of f
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares

#### `solve.asyncNewtontMethod(x0, f, dfdx0, maxIteration, tolerance)`
returns `object of Promise`

use this function instead of solve.newtonMethod when f retuens `promise`


#### `solve.newtonMethod(x0, f, invJ, maxIteration, tolerance)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear simultaneous equation by Newton method 
* x0 : type of array , initial value vector 
* f : type of function , nonlinear simultaneous equation
* invJ: type of function, inverse function of Jacob matrix
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares

#### `solve.broydenMethod(x0, f, invB0, maxIteration, tolerance,relaxation)`

returns `objcct`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    error: "float", // the last error of convergence iteration
    count: "integer", // the last iteration count
    value: "array", //a result of comvergence method
}
```

solve nonlinear simultaneous equation by Broyden method 
* x0 : type of array , initial value vector 
* f : type of function , nonlinear simultaneous equation
* invB0: type of double array, initial inverse of Broyden matrix
* maxIteration: type of integer, max number of iteration
* tolerance: type of float, solver torelance of residual sum of squares
* relaxation: type of function(dx, count, x, y)

initial inverse of Broyden matrix must be suggegested in some way

you have to know general behavior of equation or calculate inverse of Jacob matrix initally

`relaxation(dx, count ,x, y)`
* dx: delta x from current x to  next x in the iteration 
* count: current count of the iteration 
* x: current x in the iteration
* y: current y in the iteration


### optimize
------

#### `optimize.gradientDescent(x0, f, dfdx0, alpha, tolerance, maxIteration)`

returns `object`
```javascript
{
    converged: "boolean", // true means converged and false means diverged
    history: "double array", // [[x0,f(x0)], [x1,f(x1)], ..., [xn, f(xn)]]
    value: "float", //the result of convergence method
}
```

solve simultaneous linear equations by Gauss elimination method 
* A : type of double array , coefficient matrix 
* v : type of array , constant term column vector

### `optimize.Pareto(data)`

return `class` 

calcuate pareto front 

#### concstuctor(data)

* data :  type of  array of float ,  // [[x0, y0], [x1, y1], ... ]

#### attributions

* data :  is injected data
* dataMap : is Map of data, where the key is id and value is data
* paretoMap: is Map of pareto front data
* currentId: current maximum id number

#### method

* setData(data) : set initial data
* solveOne(dId, dValue) : judge that dValue is allowed to be counted as pareto front
* solve(): make pareto front from data
* addOneDataAndSolve(dValue): add dValue and juddge it adoptable as pareto front or not
* addDataListAndSolve(dList):: add dValue list and juddge them adoptable as pareto front or not
* getParetoData(): return pareto data
* getParetoDataIds(): return Ids of pareto data
* getParetoMap(): return pareto Map
* getData(): return data
* getDataMap(): return data Map

```
//sample code
const makeList = (l) => {
  const list = [...Array(l)].map(v=>Math.random()*1E2) 
  return list
}

 const Pareto = sci.optimize.Pareto 

 const L = 2
 const N =500
 const data = [...Array(N)].map(v=>makeList(2))
 const data2 = [...Array(N)].map(v=>makeList(2))
  
 const pareto = new Pareto(data) 
 pareto.solve()
  
 pareto.addDataListAndSolve(data2)
 const paretoData = pareto.getParetoData()
 
```

### `optimize.NonDominatedSorting(data)`

return `class` 

calcuate pareto front 

#### concstuctor(data)

* data :  type of  array of float ,  // [[x0, y0], [x1, y1], ... ]

#### attributions

* data :  is injected data
* dataMap : is Map of data, where the key is id and value is data
* paretoMapList: is Map of pareto front data
* currentId: current maximum id number

#### method

* setData(data) : set initial data
* discriminateOne(dId, dValue, paretoMap) : descriminate that dValue is allowed to be counted as paerto solution
* append(dId, dValue) : append a new data to pareto ranking
* solve(): sort data by non-dominated sorting (as the way to append data one by one)
* addOneDataAndSolve(dValue): add dValue and solve the non-dominated sorting problem
* addDataListAndSolve(dList):: add dValue list and solve the non-dominated sorting problem
* getParetoMapList(): return pareto Map list (key is data id, value: data)
* getParetoRankMap(): return pareto Rank Map (key : data id, value: pareto rank)
* getParetoDataList(): return pareto rank data
* getParetoDataIdList(): return Ids of pareto rank data
* getParetoMap(): return pareto Map
* getData(): return data
* getDataMap(): return data Map

```
//sample code
const makeList = (l) => {
  const list = [...Array(l)].map(v=>Math.random()*1E2) 
  return list
}

 const NS = sci.optimize.NonDominatedSorting

 const L = 2
 const N =500
 const data = [...Array(N)].map(v=>makeList(2))
 const data2 = [...Array(N)].map(v=>makeList(2))
  
 const ns = new NS(data) 
 ns.solve()
  
 ns.addDataListAndSolve(data2)
 const paretoDataList = ns.getParetoDataList()
 
```

### `optimize.FastNonDominatedSorting(data)`

return `class` 

calcuate pareto front 

#### concstuctor(data)

* data :  type of  array of float ,  // [[x0, y0], [x1, y1], ... ]

#### properties

* data :  is injected data
* myDominatingIds: is dominating ids of i th data 
* dominatingMeIds : is ids dominating ith data 
* paretoDataIdList : pareto rank id list 
* currentId : the last data id


#### method

* setData(data) : set initial data
* solve(): sort data by non-dominated sorting (as the way to append data one by one)
* addOneDataAndSolve(dValue): add dValue and solve the non-dominated sorting problem
* addDataListAndSolve(dList):: add dValue list and solve the non-dominated sorting problem
* getParetoDataList(): return pareto rank data
* getParetoDataIdList(): return Ids of pareto rank data
* getParetoMap(): return pareto Map

```
//sample code
const makeList = (l) => {
  const list = [...Array(l)].map(v=>Math.random()*1E2) 
  return list
}

 const NS = sci.optimize.FastNonDominatedSorting

 const L = 2
 const N =500
 const data = [...Array(N)].map(v=>makeList(2))
 const data2 = [...Array(N)].map(v=>makeList(2))
  
 const ns = new NS(data) 
 ns.solve()
  
 ns.addDataListAndSolve(data2)
 const paretoDataList = ns.getParetoDataList()
 
```

### regression
------

#### `regression.singleRegression(x, y)`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        weight: "array", // linear weight 1, x
    }
}
```

solve single regression 
* x : type of array  
* y : type of array


#### `regression.singleRegressionLoad(parameters)`

returns `function`

makes and returns single regression function
* parameters : type of object, parameters are equal to parameters of sigleRegression  


#### `regression.multipleRegression(x, y)`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        weight: "array", // linear weight 1, x1, x2, x3,...
    }
}
```

solve linear regression 
* x : type of double array  
* y : type of array


#### `regression.multipleRegressionLoad(parameters)`

returns `function`

makes and returns linear regression function
* parameters : type of object, parameters are equal to parameters of linearRegression  

#### `regression.polynominalRegression(x, y, degree)`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        degree: "integer"
        weight: "array", // linear weight 1, x, x**2, x**3, ..., x**degree
    }
}
```

solve polynominal regression 
* x : type of array  
* y : type of array


#### `regression.polynominalRegressionLoad(parameters)`

returns `function`

makes and returns polynominal regression function
* parameters : type of object, parameters are equal to parameters of polynominalRegression  



#### `regression.gaussKernelRegression(x, y, [beta=0.1, C=100])`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        alpha: "array", // kernel weight 
        beta: "array", // kernel parameter 
        x: "double array", // explanatory variables 
        y: "array", // objective variables
    }
}
```

solve gauss kernel regression 
* x : type of double array, explanatory variables  
* y : type of array, objective variables
* beta: type of float, kernel parameter
* C: regularization parameter, if C is null, regularization is invalid 

#### `regression.gaussKernelRegressionLoad(parameters)`

returns `function`

makes and returns gauss kernel regression function 
* parameters : type of object, parameters are equal to parameters of gaussKernelRegression  

#### `regression.SVR(x, y, [beta=0.1, C=100, epsilon=0.01,tolerance=1E-3])`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        alpha: "array", // kernel weight 
        b: "float", // threshold parameter
        beta: "array", // kernel parameter 
        x: "double array", //support vector variables 
        y: "array", // support vector variables
    }
}
```

solve support vector regression 
* x : type of double array, explanatory variables  
* y : type of array, objective variables
* beta: type of float, kernel parameter
* C: regularization parameter
* epsilon: insensive parameter
* tolerance: allowed error of KKT condition

#### `regression.SVRLoad(parameters)`

returns `function`

makes and returns support vector regression function 
* parameters : type of object, parameters are equal to parameters of SVR




### classification
------

#### `classification.SVM(x, y,[beta=0.1, C=100,tolerance=1E-3])`

returns `object`
```javascript
{
    predict: "function", // function of prediction 
    parameters: {
        alpha: "array", // kernel weight 
        b: "float", // threshold parameter
        beta: "array", // kernel parameter 
        x: "double array", // support vector x 
        y: "array", // support vector y
    }
}
```

solve single regression 
* x : type of double array, explanatory variables  
* y : type of array, objective variables
* beta: type of float, kernel parameter
* C: regularization parameter
* tolerance: allowed error of KKT condition
 
### statistics
------

#### `statistics.variance(data)`

returns `float`

calculate variance 
* data : type of array

#### `statistics.standard(data)`

returns `float`

calculate standard
* data : type of array

#### `statistics.normalize(data, [min, max])`

returns `array`

calculate normalized data
* data : type of array
* min: type of float, if not supplied, calculate min automatically
* max: type of float, if not supplied, calculate max automatically

#### `statistics.standardize(data, [average, standard])`

returns `array`

calculate standardized data
* data : type of array
* average : type of float, if not supplied, calculate average automatically
* standard: type of float, if not supplied, calculate standard automatically

#### `statistics.reNormalize(data, min, max)`

returns `array`

calculate renormalized data
* data : type of array
* min: type of float
* max: type of float

#### `statistics.reStandardize(data, ave, std)`

returns `array`

calculate restandardized data
* data : type of array
* ave: type of float, average of data
* std: type of float, standard of data

#### `statistics.R2(x, y, f)`

returns `float`

calculate coefficient of determination R2
* data : type of array
* ave: type of float, average of data
* std: type of float, standard of data

### funcs
------

#### `funcs.sumList(a)`

returns `array`

get array of sum list , Sn = a0 + a1 + ... + an
* a : type of array


#### `funcs.getRandomInt(max)`

returns `integer`

get random integer n, 0 <= n < max 
* max : type of integer

#### `funcs.makeGaussKernel(beta)`

returns `function`

get gauss kernel function  
* beta : type of float

return function is
f = exp(-beta*|x1-x2|**2)
* x1: type of array
* x2: type of array

#### `funcs.zukofsky(x0, y0, c)`

returns `function`

zukofsky wing   
* x0 : type of float
* y0 : type of float
* c : type of float

return function is
function(p)
* p: type of float, 0<= p <= 2pi
