//返回[low,height]之间的整数
function randInt ( low, high ) {
    return low + Math.floor( Math.random() * ( high - low + 1 ) );
}