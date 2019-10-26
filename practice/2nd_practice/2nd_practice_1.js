// 동기 vs 비동기

function task1(){
    // 외부 API를 실행한 후 Callback Queue에 push하기 때문에 
    // task2(), task3()보다 늦게 실행됨
    setTimeout(function(){
        console.log('task1');
    }, 0 );
}

function task2(){
    console.log('task2');
}

function task3(){
    console.log('task3');
}

task1();
task2();
task3();