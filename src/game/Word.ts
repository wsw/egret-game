// TypeScript file
class Word extends eui.Component {
    private lb_text: eui.Label;
    public constructor() {
        super();
        // this.skinName = 'WordSkin';
    }
    protected childrenCreated(): void {
        this.lb_text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick_tap, this);
    }

    protected onclick_tap () {
        console.log(this.lb_text.text);
        SceneGame.Shared().onclick_word(this);
    }
    public setWordText(value: string) {
        this.lb_text.text = value;
    }
    public getWordText(): string {
        return this.lb_text.text;
    }
}