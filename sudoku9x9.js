var sdk = // blank template
[[0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0]];
 
var sdk = // fill in as needed
[[1,0,3,0,5,0,7,0,9],
 [0,0,4,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,9,0,0,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,8,0,0,0,0],
 [0,0,0,0,0,0,0,0,0],
 [0,0,0,0,0,0,4,0,0],
 [0,0,0,0,0,0,0,0,0]];

var passed;
// function that checkes cell for conditions
checkcell = function(r,c,n){
    var i,j,k,l;
    for (i=0;i<9;i++){if (sdk[r][i]==n) {passed=false; return;}}
    for (i=0;i<9;i++){if (sdk[i][c]==n) {passed=false; return;}}
    k=parseInt(r/3)*3; l=parseInt(c/3)*3;
    for (i=0;i<3;i++) {
        for (j=0;j<3;j++) {
            if (sdk[k+i][l+j]==n) {passed=false; return;}
        }
    }
    passed=true;
};

solve = function(){
  // check if sudoku is correct
    var nt;
    for (var i=0;i<9;i++) {
        for (var j=0;j<9;j++) {
            if (sdk[i][j]>0) { 
                nt=sdk[i][j]; sdk[i][j]=0;
                checkcell(i,j,nt); 
                sdk[i][j]=nt;
                if (!passed) return "Sorry, incorrect setup near row "+ (i+1)+", col "+(j+1)+", value "+sdk[i][j];
            }
        }
    }
  // try to solve sudoku
    var hs=[], r=0, c=0, n=1, s=0;
    passed=true;
    while (r<9){
        while (c<9){ // console.log("Curr:",r,",",c, "; n=",n, s);
          if (sdk[r][c]==0) {
            while (n<10){
                s++; if (s==200e6) /*after lim num of steps*/ return "Sorry, no solution found in steps lim: "+s;
                checkcell(r,c,n); 
                if (passed) {
                    sdk[r][c]=n;
                    hs.push([r,c]); // console.log("Entered num at:",r,",",c, "; n=",n);
                    break;
                } else {n++;}
            }
            if (!passed) {
                if (hs.length==0) return "Sorry, no solution found. Steps: "+s;
                r=hs[hs.length-1][0];
                c=hs[hs.length-1][1];
                n=sdk[r][c]+1;
                sdk[r][c]=0;
                hs.pop(); // if (n<10) console.log("Backtracking to ",r,",",c,";",n);
            }
          }
        if (passed) {c++; n=1;}
        }
    if (passed) {r++; c=0;}
    }
    console.log("Solved in",s,"steps.\n",sdk); 
};
