/**
 * 世界循环
 */
import { render } from './world'
import { onPressKey } from "./world"
import { player } from './myself'
import { Enemy } from './enemy'
var onrun ={"c":true}//是否在运行
var fps = 100//帧率
var realTimefps = 0//实际fps
var lastCalledTime:number //上一帧时间
var fpsInterval = 1000 / fps
var last = new Date().getTime()
var rafId
var frame={c:1}
function animloop() {
    frame.c++
    frame.c = frame.c > fps ? 0 : frame.c
    rafId = requestAnimationFrame(animloop);
    var now = new Date().getTime()
    var elapsed = now - last;
    if (elapsed > fpsInterval) {
        last = now - (elapsed % fpsInterval);
        render();//world.js中的渲染函数

        if (!lastCalledTime) {//计算实时帧率
            lastCalledTime = Date.now();
            realTimefps = 0;
            return;
        }
        var delta = 1000 / (Date.now() - lastCalledTime);
        lastCalledTime = Date.now();
        realTimefps = Math.floor(delta);

        if (!onrun.c) {
            cancelAnimationFrame(rafId)
        }
    }
}
// animloop();//开始

function showDebug(ctx:CanvasRenderingContext2D) {
    var fontSize = 25
    ctx.font = fontSize + "px Arial";
    ctx.shadowColor = "black";
    ctx.fillStyle = "black";
    var eachmsg = [
        "FPS: " + realTimefps,
        "按键：" + Array.from(onPressKey).join(","),
        "玩家信息------------",
        "   名称: " + player.names,
        "   基础移速: " + player.baseSpeed,
        "   实时移速: " + player.moveSpeed,
        "   移速加成: " + player.speedAdd,
        "   体力消耗速度: " + player.staminaBurnRate + "点每30帧",
        "   体力恢复速度: " + player.staminaRecoveryRate + "点每30帧",
        "   最大弹幕数: " + player.Maxshot,
        "   显示弹幕数：" + player.shootingList.length,
        "   射击间隔: " + player.ShootInterval + " ms",
        "   弹幕初速度损失: " + player.ShootspeedLose,
        "   是否无敌: " + player.isInvincible,
        "世界信息------------",
        "   怪物数量: " + Enemy.list.length,
        "   怪物数量: " + Enemy.list.length,
    ]
    eachmsg.forEach((msg, index) => {
        ctx.fillText(msg, 10, 200 + fontSize * index + 5)
    });

}

export { onrun,animloop, showDebug, fps,frame}


