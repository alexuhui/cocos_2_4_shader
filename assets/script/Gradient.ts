// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Gradient extends cc.Component {

    private mySprite: cc.Sprite = null;
    private material: cc.MaterialVariant = null;
    // 创建一个新的颜色
    private readonly greenColor = new cc.Color(0, 255, 0, 255); // green
    private readonly redColor = new cc.Color(255, 0, 0, 255); // red
    private readonly blueColor = new cc.Color(0, 0, 255, 255); // blue

    private coefficient: {value: number} = {value: 0.0}

    start () {
        // 获取 Sprite 组件
        this.mySprite = this.getComponent(cc.Sprite)
        if (!this.mySprite) {
            cc.error('Gradient: mySprite is null');
            return;
        }

        // 获取 MaterialVariant 组件
        this.material = this.mySprite.getMaterial(0);
        if (!this.material) {
            cc.error('Gradient: material is null');
            return;
        }

        this.doStartColorChange()
        this.doEndColorChange()

        cc.tween(this.coefficient)
            .to(3, {value: 1.0})
            .to(3, {value: 0.0})
            .repeatForever()

    }

    protected update(dt: number): void {
        this.material.setProperty('coefficient', this.coefficient.value)
    }

    private doStartColorChange(){
        const duration = Math.random() * 0.3
        this.scheduleOnce(() => {
                const rand = Math.random() * 3
                const startColor = rand > 2 ? this.greenColor : rand > 1 ? this.redColor : this.blueColor;
                // 使用 setProperty 来修改 uniform 的值
                // 第一个参数是你在 effect 文件中定义的 uniform 的名字
                // 第二个参数是你要设置的值
                this.material.setProperty('startColor', startColor)

                this.doStartColorChange()
            }, duration)

            
    }

    private doEndColorChange(){
        const duration = Math.random() * 0.3
        this.scheduleOnce(() => {
                const rand = Math.random() * 3
                const endColor = rand > 2 ? this.redColor : rand > 1 ? this.blueColor : this.greenColor;
                this.material.setProperty('endColor', endColor)
    
                this.doEndColorChange()
            }, duration)
    }
}
