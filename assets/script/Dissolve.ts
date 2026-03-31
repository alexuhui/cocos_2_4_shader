// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class Dissolve extends cc.Component {

    private material: cc.MaterialVariant = null;

    protected start(): void {
        // 获取 MaterialVariant 组件
        this.material = this.getComponent(cc.Sprite).getMaterial(0);
        if (!this.material) {
            cc.error('Gradient: material is null');
            return;
        }
        this.doDissolveChange()
    }

    private dissolveThreshold: {value: number} = {value: 0.0}
    private disappears: boolean = true
    private doDissolveChange(){

        if(this.disappears){
            cc.tween(this.dissolveThreshold)
                .to(3, {value: 1.0},{progress: (start, end, current, t) => {
                        this.material.setProperty('dissolveThreshold', current)
                        return start + (end - start) * t
                    }})
                .call(() => {
                    this.disappears = false
                    this.doDissolveChange()
                })
                .start()
        }else
        {
            cc.tween(this.dissolveThreshold)
                .to(3, {value: 0.0},{progress: (start, end, current, t) => {
                        this.material.setProperty('dissolveThreshold', current)
                        return start + (end - start) * t
                    }})
                .call(() => {
                    this.disappears = true
                    this.doDissolveChange()
                })
                .start()
        }
    }
}
